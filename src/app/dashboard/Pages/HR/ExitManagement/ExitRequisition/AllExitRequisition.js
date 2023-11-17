
import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../../Components/Table/Table";
import PageStyle from "../../../../Components/Layout/PageLayout";
import {

  GetExitRequisition,
  ApproveExit,
  DeclineExit,
} from "../../../../../../utils/redux/HR/HRSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppModalTemplate } from "../../../../Components/Modals/Modals";
import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
import Pagination from "../../../../Components/Pagination/Pagination";
import { TableActions } from "../../../../Components/Misc/Actions";
import { CalendarFilter2, FilterButton, ProDropFilter, SearchFilter } from "../../../../Components/Search/Search";
import { format } from "date-fns";
import { useApprovals } from "../../../Vendors/VendorApprovals/useApprovals";

const AllExitRequisition = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [exitStatus, setExitStatus] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  const { get_exit, isLoading } = useSelector((state) => state?.hr);
  const dispatch = useDispatch();
 
  // const exit = exitStatus===null? '': exitStatus
  let start = startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
let end = endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");
 console.log(get_exit)
  const apiData={
        pageSize: pageSize,
        pageNumber: pageNumber,
        search: search,
        exitStatus:exitStatus,
        startDate:start,
        endDate:end,
  }

  useEffect(() => {
    if (exitStatus !== null) {
      apiData["exitStatus"] = exitStatus;
     }
    dispatch(
      GetExitRequisition(apiData)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, pageNumber]);

  const handleFilterButton = ()=>{
    dispatch(GetExitRequisition(apiData))

  }

  const actionButton = (
    <>
      {/* <CTAButtons
        onClick={() => {
          navigate("?modal_type=exit");
          setOpenModal(!openModal);
        }}
      >
        Add Exit
      </CTAButtons> */}
    </>


  );


  const filterBy= [
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
  ]

  return (
    <PageStyle
      title={"Exit Management"}
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
          name={"Exit Status"}
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
              <th>Employee Name</th>
              <th>Exit Date</th>         
              <th>Exit Status</th>
              <th> Discussion Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <ExitTable isLoading={isLoading} getExit={get_exit} isOpen={openModal} setIsOpen={setOpenModal}  />
            {get_exit?.result?.map((exit) => (
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
      <AppModalTemplate
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
      </AppModalTemplate>
      <Pagination
        last_page={get_exit?.totalPages}
        present_page={get_exit?.currentPage}
        totalRows={get_exit?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default AllExitRequisition;

function ExitTable({ getExit, isOpen, setIsOpen,apiData }) {
  console.log(apiData)
  const dispatch = useDispatch();
  const { openModal, closeModal } = useApprovals({ isLoading: true });


  return (
    <>
      {getExit?.result?.map((item) => (
        <tr key={item?.id}>
          <td>{item?.initiatedBy}</td>
          <td>{FormatDateTime(item?.exitDate)}</td>
          <td>{item?.exitStatus}</td>
          <td>{item?.discussionStatus}</td>
        
          <td>
            {item?.exitStatus === "Approved" || item?.exitStatus=== "Declined"? (   <TableActions hasChildren={true} url={`${item.id}/view`}>{""}
            </TableActions>): (<TableActions hasChildren={true} url={`${item?.id}/view?reason=${item?.exitReason}`}>
              {[
               
               {
                name: "Approve Requisition",
                action: () => {
                  openModal({
                    type: "suspend",
                    details: {
                      button: {
                        name: "Yes, Approve",
                        color: "",
                      },
                      sendIsOptional: true,
                      title: "Approve Requisition",
                      submitData: (data) => {
                        dispatch(
                          ApproveExit({
                            id: item?.id,
                            comment: data.comment,
                            approvalDate: item?.approvalDate,
                          })
                        )?.then((res) => {
                            closeModal();
                            dispatch(GetExitRequisition(apiData));
                          
                        });
                      },
                    },
                  });
                },
              },
  
              {
                name: "Decline Requisition",
                action: () => {
                  openModal({
                    type: "Requisition",
                    details: {
                      button: {
                        name: "Yes, Decline",
                        color: "red",
                      },
                      commentIsOptional: true,
                      sendIsOptional: true,
                      title: "Decline Requisition",
                      submitData: (data) => {
                        console.log(data);
                        dispatch(
                          DeclineExit({
                            comment: data?.comments,
                            id: item?.id,
                          })
                        ).then((res) => {           
                          closeModal();
                            dispatch(GetExitRequisition(apiData));
                          
                        });
                        closeModal();
                      },
                    },
                  });
                },
              },


                
              ]}
            </TableActions>)}
       
         
          </td>
        </tr>
      ))}
    </>
  );
}

