// import React, { useEffect, useState } from "react";
// import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
// import Table from "../../../../Components/Table/Table";
// import PageStyle from "../../../../Components/Layout/PageLayout";
// import { useNavigate } from "react-router";
// import {
//   ActionButtons,
//   CTAButtons,
//   SupportButtons,
// } from "../../../../../global/components/Buttons/buttons";
// import {
//   FormInput,
//   FormTemplate,
//   FormTextArea,
// } from "../../../../Components/Forms/InputTemplate";
// import {
//   CreateExitRequisition,
//   UpdateExitRequisition,
//   GetExitRequisition,
//   ApproveExit,
//   DeclineExit,
// } from "../../../../../../utils/redux/HR/HRSlice";
// import { FormProvider, get, useForm } from "react-hook-form";
// import { FiX } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { AppModalTemplate } from "../../../../Components/Modals/Modals";
// import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
// import Pagination from "../../../../Components/Pagination/Pagination";
// import { TableActions } from "../../../../Components/Misc/Actions";
// import {
//   CalendarFilter2,
//   FilterButton,
//   ProDropFilter,
//   SearchFilter,
// } from "../../../../Components/Search/Search";
// import { format } from "date-fns";
// import { useApprovals } from "../../../Vendors/VendorApprovals/useApprovals";

// const ExitManagement = () => {
//   const [openModal, setOpenModal] = useState(false);


//   const [search, setSearch] = useState("");
//   const [pageSize, setPageSize] = useState(10);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [exitStatus, setExitStatus] = useState(null);
//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();

//   const { get_exit, isLoading } = useSelector((state) => state?.hr);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const exit = exitStatus === null ? "" : exitStatus;
//   let start =
//     startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
//   let end =
//     endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");

//   const apiData = {
//     pageSize: pageSize,
//     pageNumber: pageNumber,
//     search: search,
//     exitStatus: exit,
//     startDate: start,
//     endDate: end,
//   };

//   useEffect(() => {
//     dispatch(GetExitRequisition(apiData));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pageSize, pageNumber]);

//   const handleFilterButton = () => {
//     dispatch(GetExitRequisition(apiData));
//   };

//   const actionButton = (
//     <>
//       <CTAButtons
//         onClick={() => {
//           navigate("?modal_type=exit");
//           setOpenModal(!openModal);
//         }}
//       >
//         Add Exit
//       </CTAButtons>
//     </>
//   );

//   const filterBy = [
//     {
//       name: "Pending",
//       filter: 2,
//     },
//     {
//       name: "Approved",
//       filter: 1,
//     },
//     {
//       name: "Declined",
//       filter: 3,
//     },
//     {
//       name: "Cancel",
//       filter: 4,
//     },
//   ];

//   const appURL = new URLSearchParams(window.location.search);
//   const getURLData = (e) => appURL.get(e);
//   return (
//     <PageStyle
//       title={"Exit Management"}
//       hasBack={false}
//       action={actionButton}
//       isMain={true}
//     >
//       <div className={DashboardStyle.dashboard_filter}>
//         <SearchFilter text={setSearch} />
//         {/* <div className={DashboardStyle.dashboard_filters}> */}
//         <ProDropFilter
//           filter={exitStatus}
//           setExitStatus={setExitStatus}
//           name={"Status"}
//           filterBy={filterBy}
//         />

//         <CalendarFilter2
//           name="Select Date Range"
//           setStartDate={setStartDate}
//           setEndDate={setEndDate}
//         />
//         <FilterButton onClick={() => handleFilterButton()} name="" />
//       </div>
//       <div className={DashboardStyle.dashboard_table_holder}>
//         <Table>
//           <thead>
//             <tr>
//               <th>Employee Name</th>
//               <th>Exit Date</th>
//               <th>Exit Reason</th>
//               <th>Exit Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <ExitTable
//               isLoading={isLoading}
//               getExit={get_exit}
//               isOpen={openModal}
//               setIsOpen={setOpenModal}
//             />
//             {get_exit?.result?.map((exit) => (
//               <ExitTable
//                 {...exit}
//                 key={exit?.id}
//                 isLoading={isLoading}
//                 setIsOpen={setOpenModal}
//                 isOpen={openModal}
//                 apiData={apiData}
//               />
//             ))}
//           </tbody>
//         </Table>
//       </div>
//       <AppModalTemplate
//         padding={"0px"}
//         isOpen={openModal}
//         setIsOpen={setOpenModal}
//       >
//         {getURLData("modal_type") === "exit" && (
//           <CreateExitActions
//             isOpen={openModal}
//             setIsOpen={setOpenModal}
//             // isLoading={isLoading}
//           />
//         )}
//       </AppModalTemplate>
//       <Pagination
//         last_page={get_exit?.totalPages}
//         present_page={get_exit?.currentPage}
//         totalRows={get_exit?.totalRows}
//         pageSize={pageSize}
//         setPageSize={(page) => setPageSize(page)}
//         click={(page) => setPageNumber(page)}
//       />
//     </PageStyle>
//   );
// };

// export default ExitManagement;

// function ExitTable({ getExit, isOpen, setIsOpen, apiData }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { openModal, closeModal } = useApprovals({ isLoading: true });

//   return (
//     <>
//       {getExit?.result?.map((item) => (
//         <tr key={item?.id}>
//           <td>{item?.initiatedBy}</td>
//           <td>{FormatDateTime(item?.exitDate)}</td>
//           <td>{item?.exitReason}</td>
//           <td>{item?.exitStatus}</td>
//           <td>
//             <TableActions
//               hasChildren={true}
//               url={`${item?.id}/view?reason=${item?.exitReason}`}
//             >
//               {[
//                 {
//                   name: "Edit Exit",
//                   action: () => {
//                     setIsOpen(!isOpen);
//                     navigate(
//                       `?modal_type=exit&isEdit=true&date=${item?.exitDate}&reason=${item?.exitReason}&id=${item?.id}`
//                     );
//                   },
//                 },
//                 {
//                   name: "Approve Requisition",
//                   action: () => {
//                     openModal({
//                       type: "suspend",
//                       details: {
//                         button: {
//                           name: "Yes, Approve",
//                           color: "",
//                         },
//                         sendIsOptional: true,
//                         title: "Approve Requisition",
//                         submitData: (data) => {
//                           dispatch(
//                             ApproveExit({
//                               id: item?.id,
//                               comment: data?.comments,
//                               approvalDate: item?.approvalDate,
//                             })
//                           )?.then((res) => {
//                             closeModal();
//                             dispatch(GetExitRequisition(apiData));
//                           });
//                         },
//                       },
//                     });
//                   },
//                 },

//                 {
//                   name: "Decline Requisition",
//                   action: () => {
//                     openModal({
//                       type: "suspend",
//                       details: {
//                         button: {
//                           name: "Yes, Decline",
//                           color: "red",
//                         },
//                         commentIsOptional: true,
//                         sendIsOptional: true,
//                         title: "Decline Requisition",
//                         submitData: (data) => {
//                           console.log(data);
//                           dispatch(
//                             DeclineExit({
//                               comment: data?.comments,
//                               id: item?.id,
//                             })
//                           ).then((res) => {
//                             closeModal();
//                             dispatch(GetExitRequisition(apiData));
//                           });
//                         },
//                       },
//                     });
//                   },
//                 },
//               ]}
//             </TableActions>
//           </td>
//         </tr>
//       ))}
//     </>
//   );
// }

// export function CreateExitActions({ isOpen, setIsOpen, isLoading }) {

 
//   const appURL = new URLSearchParams(window.location.search);
//   const getURLData = (e) => appURL.get(e);
//   console.log(getURLData);
//   const defaultData = {
//     exitReason: getURLData("reason"),
//     exitDate: getURLData("date"),
//   };
//   //console.log(defaultData)
//   const dispatch = useDispatch();

//   const formMethods = useForm({
//     defaultValues: defaultData,
//     mode: "all",
//   });
//   const {
//     handleSubmit,
//     formState: { isValid },
//   } = formMethods;

//   const submit = ({ exitDate, exitReason }) => {
//     console.log("exit reason", exitReason, "exit date", exitDate);
//     getURLData("isEdit") === "true"
//       ? dispatch(
//           UpdateExitRequisition({
//             exitDate: exitDate,
//             exitReason: exitReason,
//             id: getURLData("id"),
//           })
//         )?.then((res) => {
//           if (res?.payload?.successful === true) {
//             window.location.reload();
//           }
//         })
//       : dispatch(
//           CreateExitRequisition({
//             exitDate: exitDate,
//             exitReason: exitReason,
//           })
//         )?.then((res) => {
//           if (res?.payload?.successful === true) {
//             setIsOpen(!isOpen);
//             dispatch(
//               GetExitRequisition({
//                 pageSize: 100000,
//                 pageNumber: 1,
//               })
//             );
//           }
//         });
//   };

//   return (
//     <div className={DashboardStyle.dash_board_home_nav}>
//       <div className={DashboardStyle.dash_board_home_nav_header}>
//         <h4>
//           {getURLData("isEdit") === "true" ? "Edit" : "Create"} Exit Requisition
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
//                 value={selectedDate}
//                 registerOptions={{
//                   onChange: (e) => {
//                     setSelectedDate(e.target.value);
//                   },
//                 }}
                
//               />

//               <FormTextArea
//                 title={"Exit reason"}
//                 camelCase={"exitReason"}
//                 isOptional={true}
//               />
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
