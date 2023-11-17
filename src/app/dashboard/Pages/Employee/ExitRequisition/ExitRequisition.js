import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../Components/Table/Table";
import PageStyle from "../../../Components/Layout/PageLayout";
import { useNavigate } from "react-router";

import { CTAButtons } from "../../../../global/components/Buttons/buttons";

import {
  GetMyExitRequisition,
  CancelExit,
 
} from "../../../../../utils/redux/HR/HRSlice";
import { FormProvider,  useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import Pagination from "../../../Components/Pagination/Pagination";
import { TableActions } from "../../../Components/Misc/Actions";
import {
  CalendarFilter2,
  FilterButton,
  ProDropFilter,
  SearchFilter,
} from "../../../Components/Search/Search";
import { format } from "date-fns";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";

const ExitManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [exitStatus, setExitStatus] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { get_my_exit, isLoading } = useSelector((state) => state?.hr);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exit = exitStatus === null ? "" : exitStatus;
  let start =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let end =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");
  //console.log(get_my_exit)
  const apiData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    search: search,
    exitStatus: exit,
    startDate: start,
    endDate: end,
  };

  useEffect(() => {
    dispatch(GetMyExitRequisition(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, pageNumber]);

  const handleFilterButton = () => {
    dispatch(GetMyExitRequisition());
  };

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate("add")}>
        Add Exit Requisition
      </CTAButtons>
    </>
  );

  const filterBy = [
    {
      name: "Pending",
      filter: 1,
    },
    {
      name: "Approved",
      filter: 0,
    },
    {
      name: "Declined",
      filter: 2,
    },
    {
      name: "Cancel",
      filter: 3,
    },
  ];

  // const appURL = new URLSearchParams(window.location.search);
  // const getURLData = (e) => appURL.get(e);
  return (
    <PageStyle
      title={"Exit Requisition"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearch} />
        {/* <div className={DashboardStyle.dashboard_filters}> */}
        <ProDropFilter
          filter={exitStatus}
          setFilter={setExitStatus}
          name={"Status"}
          filterBy={filterBy}
        />

        <CalendarFilter2
          name="Select Date Range"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <FilterButton onClick={() => handleFilterButton()} name="" />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Exit Date</th>
              <th>Exit Reason</th>
              <th>Exit Status</th>
              <th>Discussion Status</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <ExitTable
              isLoading={isLoading}
              getExit={get_my_exit}
              isOpen={openModal}
              setIsOpen={setOpenModal}
            />
            {get_my_exit?.responseObject?.map((exit) => (
              <ExitTable
                {...exit}
                key={exit?.id}
                isLoading={isLoading}
                setIsOpen={setOpenModal}
                isOpen={openModal}
                apiData={apiData}
              />
            ))}
          </tbody>
        </Table>
      </div>
      {/* <AppModalTemplate
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        {getURLData("modal_type") === "exit" && (
          <CreateExitActions
            isOpen={openModal}
            setIsOpen={setOpenModal}
            // isLoading={isLoading}
          />
        )}
      </AppModalTemplate> */}
      <Pagination
        last_page={get_my_exit?.totalPages}
        present_page={get_my_exit?.currentPage}
        totalRows={get_my_exit?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default ExitManagement;

function ExitTable({ getExit, isOpen, setIsOpen, apiData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = GetLocalStorage();

  const { openModal, closeModal } = useApprovals({ isLoading: true });

  return (
    <>
      {getExit?.result?.map((item, index) => (
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{data?.fullName}</td>
          <td>{FormatDateTime(item?.exitDate)}</td>
          <td>{item?.exitReason}</td>
          <td>{item?.exitStatus}</td>
          <td>{item?.discussionStatus}</td>

          <td>
            {item?.exitStatus === "Pending" ||
            item?.exitStatus === "Declined" ? (
              <TableActions
                hasChildren={true}
                url={`${item?.id}/view?reason=${item?.exitReason}`}
              >
                {[
                  {
                    name: "Edit Exit",
                    action: () => {
                      navigate(`./${item.id}/edit`, { state: item });
                    },
                  },

                  {
                    name: "Cancel Exit Requisition",
                    action: () => {
                      openModal({
                        type: "suspend",
                        details: {
                          button: {
                            name: "Yes, Cancel",
                            color: "red",
                          },
                          commentIsOptional: true,
                          sendIsOptional: true,
                          title: "Cancel Exit",
                          submitData: (data) => {
                            dispatch(
                              CancelExit({
                                comment: data?.comments,
                                requisitionId: item?.id,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetMyExitRequisition(apiData));
                            });
                          },
                        },
                      });
                      //  setIsOpen(!isOpen);
                    },
                  },
                ]}
              </TableActions>
            ) : item?.exitStatus === "cancelled" ||
              item?.discussionStatus === "Done" ? (
              <TableActions
                hasChildren={true}
                url={`../exit-requisition/${item.id}/view`}
              ></TableActions>
            ) : (
              <TableActions hasChildren={true} url={`${item?.id}/view`}>
                {[
                  {
                    name: "Discussion Questions",
                    action: () => {
                      setIsOpen(!isOpen);
                      navigate(`../exit-discussion/add`);
                    },
                  },
                ]}
              </TableActions>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}

// export function CreateExitActions({ isOpen, setIsOpen, isLoading }) {
//   const location = useLocation()?.state;
//   const [selectedDate, setSelectedDate] = useState("");
//   const [uploadFile, setUploadFile] = useState(null);
//   const [vendorDocument, setVendorDocument] = useState(
//     location?.documents || []
//   );

//   useEffect(() => {
//     setSelectedDate(getTodayDate());
//   }, []);

//   function getTodayDate() {
//     const today = new Date();
//     return today.toISOString().substr(0, 10);
//   }
//   // console.log(dv);
//   const defaultData = {
//     exitReason: GetSearchParams("reason"),
//     exitDate: GetSearchParams("date"),

//     // exitReason: getURLData("reason"),
//     // exitDate: getURLData("date"),
//   };
//   //console.log(defaultData)
//   const dispatch = useDispatch();
//  console.log(location)

//   const formMethods = useForm({
//     defaultValues: defaultData,
//     mode: "all",
//   });
//   const {
//     handleSubmit,
//     formState: { isValid },
//   } = formMethods;

//   const submit = (data) => {
//     if (data["exitDate"] === undefined || data["exitDate"] == null) {
//       data["exitDate"] = getTodayDate();
//     }

//     const fileData = new FormData();
//     const key = Object.keys(data);
//     key?.forEach((key, index) => {
//       fileData.append(`${key}`, data[key]);
//     });
//     vendorDocument.forEach((element, index) => {

//       fileData.append(
//         `Documents[${index}].file`,
//         element?.file,
//         element?.file?.name
//       );
//       fileData?.append(`Documents[${index}].fileName`, element?.fileName);
//     });

//     // console.log(GetSearchParams())
//     //  return

//     GetSearchParams("isEdit") === "true"
//       ? dispatch(
//           UpdateExitRequisition({
//             ...data,
//             id: +GetSearchParams('id'),
//           })
//         )?.then((res) => {
//           console.log(res)
//           if (res?.payload?.successful === true) {

//             window.location.reload();
//           }
//         })
//       : dispatch(CreateExitRequisition(fileData))?.then((res) => {
//           if (res?.payload?.successful === true) {
//             setIsOpen(!isOpen);
//             dispatch(
//               GetMyExitRequisition({
//                 pageSize: 100000,
//                 pageNumber: 1,
//               })
//             );
//           }
//         });
//     setIsOpen(!isOpen);
//   };
//   const documentList = [
//     {
//       name: "Receipt",
//       value: 8,
//     },
//   ];
//   // const dateTimeString = "2023-07-20T00:00:00";
//   // const dateString = dateTimeString.substring(0, 10);
//   // console.log(dateString)

//   return (
//     <div className={DashboardStyle.dash_board_home_nav}>
//       <div className={DashboardStyle.dash_board_home_nav_header}>
//         <h4>
//           {GetSearchParams("isEdit") === "true" ? "Edit" : "Create"} Exit
//           Requisition
//         </h4>
//         <FiX
//           style={{ cursor: "pointer" }}
//           size={"1.5rem"}
//           onClick={() => setIsOpen(!isOpen)}
//         />
//       </div>
//       <div className={DashboardStyle.dash_board_home_nav_body}>
//         {isLoading && <small>Loading...</small>}
//         <div>
//           <FormProvider {...formMethods}>
//             <FormTemplate handleSubmit={handleSubmit(submit)}>
//               <FormInput
//                 title={"Exit Date"}
//                 camelCase={"exitDate"}
//                 placeholder={"enter exit date"}
//                 type={"date"}
//                 isOptional={true}
//                 value={selectedDate}
//                 registerOptions={{
//                   onChange: (e) => {
//                     if (e.target.value !== null) {
//                       setSelectedDate(e.target.value);
//                     }
//                   },
//                 }}
//               />

//               <FormTextArea
//                 title={"Exit reason"}
//                 camelCase={"exitReason"}
//                 isOptional={true}
//               />

//               {/* <section className={DashboardStyle.form_section}> */}
//               {/* <h4 className={DashboardStyle.form_section_title}>
//            Document Upload
//             </h4> */}
//               <FormUploadComponent
//                 documentList={documentList}
//                 uploadFile={uploadFile}
//                 setUploadFile={setUploadFile}
//                 setVendorDocument={setVendorDocument}
//                 vendorDocument={vendorDocument}
//                 isOptional={false}
//               />
//               {/* </section> */}
//               {/* <section className={DashboardStyle.form_section}>
//             <h4 className={DashboardStyle.form_section_title}>
//               Documents <br /> Uploads
//             </h4> */}
//               <div
//                 className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
//               >
//                 {vendorDocument?.length === 0 ? (
//                   <p>No Record Available</p>
//                 ) : (
//                   <Table>
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>File Name</th>
//                         <th>File Type</th>
//                         <th>Date Uploaded</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {vendorDocument?.map?.((x, index) => {
//                         // console.log(x);
//                         return (
//                           <tr>
//                             <td>{index + 1}</td>
//                             <td>{x?.file?.name || x?.fileName}</td>
//                             <td style={{ textTransform: "uppercase" }}>
//                               {x?.value || x?.fileName}
//                             </td>
//                             <td>{FormatDateTime(new Date())}</td>
//                             <td>
//                               <TableActionsDownload
//                                 file={x?.file || null}
//                                 url={x?.fileUrl || null}
//                                 actions={() =>
//                                   removeListData({
//                                     value: index,
//                                     list: vendorDocument,
//                                     setList: setVendorDocument,
//                                   })
//                                 }
//                               />
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </Table>
//                 )}
//               </div>
//               {/* </section> */}

//               <div
//                 style={{ marginTop: "1rem" }}
//                 className={DashboardStyle.button_cage}
//               >
//                 <SupportButtons
//                   width={"auto"}
//                   onClick={() => setIsOpen(!isOpen)}
//                   className={DashboardStyle?.button_cage_weight_without_border}
//                 >
//                   No, Cancel
//                 </SupportButtons>
//                 <ActionButtons
//                   width={"auto"}
//                   isLoading={isLoading}
//                   disabled={!isValid}
//                   className={DashboardStyle?.button_cage_weight}
//                   bg="var(--primary-color)"
//                 >
//                   Submit
//                 </ActionButtons>
//               </div>
//             </FormTemplate>
//           </FormProvider>
//         </div>
//       </div>
//     </div>
//   );
// }
