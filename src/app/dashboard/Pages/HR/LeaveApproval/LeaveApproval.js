import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../Components/Table/Table";
import Pagination from "../../../Components/Pagination/Pagination";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
  CalendarFilter2,
} from "../../../Components/Search/Search";
import { TableActions } from "../../../Components/Misc/Actions";
import PageStyle from "../../../Components/Layout/PageLayout";
import { useNavigate } from "react-router";
import {
  GetAllLeaveRequest,
  ApproveLeave,
  DeclineLeave,
} from "../../../../../utils/redux/HR/HRSlice";
import { useSelector, useDispatch } from "react-redux";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import ApprovalData from "../ApprovalConstants/data";
import { format } from "date-fns";
import { URL } from "../../../../../utils/routes";


const LeaveApproval = () => {
  const [leaveStatusEnum, setLeaveStatus] = useState("all");
  const [search, setSearchText] = useState("");
  const [approvalStatus, setFilter] = useState("all");
  const[PageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { all_request, isLoading, } = useSelector(
    (state) => state.hr
  );
  let statusfilter = approvalStatus === "all" ? "" : approvalStatus
  let leaveFilter = leaveStatusEnum === "all"? '': leaveStatusEnum;
  let start =
  startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
let end =
  endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");
  const dispatch = useDispatch();


  // console.log(ApprovalData)
  // console.log(all_request)
  const apiData = {
    pageSize: pageSize,
    PageNumber: PageNumber,
    approvalStatus: statusfilter,
    search: search,
    leaveStatusEnum: leaveFilter,
    startDate: start,
    endDate: end,

  };

  useEffect(() => {
    dispatch(GetAllLeaveRequest(apiData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PageNumber, pageSize]);

 
  const handleFilterButton = ()=>{
    dispatch(GetAllLeaveRequest(apiData))

  }
  const actionButton = <></>;
  const filterBy = [
    {
      name: "All",
      filter: "all",
    },
    {
      name: "Pending",
      filter: 0,
    },
    {
      name: "ApprovedByHR",
      filter: 20,
    },
    {
      name: "RejectedByHR",
      filter: 81,
    },
  ];

  const leaveStatus = [
    {
      name: "All",
      filter: "all",
    },
    {
      name: "Awaiting",
      filter: 0,
    },
    {
      name: "OnLeave",
      filter: 1,
    },
    {
      name: "Recalled",
      filter: 2,
    },

    {
      name: "Back",
      filter: 3,
    },
  ];

  return (
    <PageStyle
      title={"Leave Approval Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearchText} />
        {/* <div className={DashboardStyle.dashboard_filters}> */}
        <ProDropFilter
          filter={approvalStatus}
          setFilter={setFilter}
          name={"Approval Status"}
          filterBy={filterBy}
          value={approvalStatus}          
        />

        <ProDropFilter
          filter={leaveStatusEnum}
          setFilter={setLeaveStatus}
          name={"Leave Status"}
          filterBy={leaveStatus}
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
              <th>Department</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>No of Days</th>
              <th>Leave Status</th>
              <th>Approval Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <LeaveTable
              data={all_request}
              isLoading={isLoading}
              apiData={apiData}
            />

            {all_request?.result?.map((item) => (
              // console.log(item)
              <LeaveTable {...item} isLoading={isLoading} />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={all_request?.totalPages}
        present_page={all_request?.currentPage}
        totalRows={all_request?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default LeaveApproval;

function LeaveTable({ isLoading, data, apiData }) {
  const { openModal, closeModal } = useApprovals({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {data?.result?.map((item) => (
        <tr key={item?.id}>
          <td>{item?.employeeName}</td>
          <td>{item?.departmentName}</td>
          <td>{item?.leaveTypeName}</td>
          <td>{FormatDateTime(item?.startDate)}</td>
          <td>{FormatDateTime(item?.endDate)}</td>
          <td>
            {item?.durationValue > 1
             ? `${item?.durationValue} Days`
             : `${item?.durationValue} Day`
         }
          </td>
          <td style={{ textAlign: "center" }}>
            {" "}
            <span
              style={{
                textAlign: "center",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                backgroundColor:
                  item?.leaveStatus === "Awaiting"
                    ? "#8DE9FF"
                    : item?.leaveStatus === "OnLeave"
                    ? "#DCFFC9"
                    : item?.leaveStatus === "Back"
                    ? "#005BD4"
                    : item?.leaveStatus === "Recalled"
                    ? "#FFFF"
                    : "",
                color:
                  item?.leaveStatus === "Awaiting"
                    ? "#FFFFf"
                    : item?.leaveStatus === "OnLeave"
                    ? "#0F6308"
                    : item?.leaveStatus === "Back"
                    ? "#FFFF"
                    : item?.leaveStatus === "Recalled"
                    ? "#FF8D8D"
                    : "",
              }}
            >
              {" "}
              {item?.leaveStatus}
            </span>
          </td>
          <td style={{ textAlign: "center" }}>
            <span
              style={{
                textAlign: "center",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                backgroundColor:
                  item?.approvalStatus === "Pending"
                    ? "#FFF1CF"
                    : item?.approvalStatus === "ApprovedByHR"
                    ? "#DCFFC9"
                    : item?.approvalStatus === "ApprovedByHOD"
                    ? "#DCFFC9"
                    : item?.approvalStatus === "RejectedByHR"
                    ? "#FBE6E7"
                    : "",
                color:
                  item?.approvalStatus === "Pending"
                    ? "#815103"
                    : item?.approvalStatus === "ApprovedByHR"
                    ? "#0F6308"
                    : item?.approvalStatus === "RejectedByHR"
                    ? "#8A002B"
                    : "",
              }}
            >
              {" "}
              {item?.approvalStatus}
            </span>
          </td>

          <td>
            {item?.leaveStatus==="Back" && item?.approvalStatus === "ApprovedByHR" ? (  <TableActions
              hasChildren={true}
              url={`../../${URL?.Employee}/Leave-Request/${item.id}/view`}
            ></TableActions>)
            
            :item?.approvalStatus === "ApprovedByHR" &&  item?.leaveStatus==="Awaiting"? (
              <TableActions
                hasChildren={true}
                url={`../../${URL.Employee}/Leave-Request/${item.id}/view`}
              >
                  {[
                {
                  name: "Recall Leave",
                  action: () =>
                    navigate(`../../${URL.Employee}/Leave-Request/${item.id}/recall`, {
                      state: item,
                    }),
                },
              ]}
               
              </TableActions>
            ) : item?.approvalStatus === "ApprovedByHR" &&  item?.leaveStatus==="OnLeave"?(
              <TableActions
              hasChildren={true}
              url={`../../${URL.Employee}/Leave-Request/${item.id}/view`}
            >
              {[
                {
                  name: "Recall Leave",
                  action: () =>
                    navigate(`../../${URL.Employee}/Leave-Request/${item.id}/recall`, {
                      state: item,
                    }),
                },
              ]}
            </TableActions>)
            :item.approvalStatus === "RejectedByHR" ? (
              <TableActions
                hasChildren={true}
                url={`../../${URL.Employee}/Leave-Request/${item.id}/view`}
              ></TableActions>
            ) : (
              <TableActions
                hasChildren={true}
                url={`../../${URL.Employee}/Leave-Request/${item.id}/view`}
              >
                {[
                  {
                    name: "Edit Requisition",
                    action: () =>
                      navigate(`../../${URL.Employee}/Leave-Request/${item.id}/edit`, {
                        state: item,
                      }),

                  },

                  {
                    name: "Approve Leave",
                    action: () => {
                      openModal({
                        type: "suspend",
                        details: {
                          button: {
                            name: "Yes, Approve",
                            color: "",
                          },
                          sendIsOptional:true,
                          title: "Approve Requisition",
                          submitData: (data) => {
                            dispatch(
                              ApproveLeave({
                                comment: data?.comments,
                                requisitionId: item?.id,
                                approvalType: ApprovalData.ApprovedByHR,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetAllLeaveRequest(apiData));
                            });
                          },
                        },
                      });
                    },
                  },
                  {
                    name: "Decline Leave",
                    action: () => {
                      openModal({
                        type: "suspend",
                        details: {
                          button: {
                            name: "Yes, Decline",
                            color: "",
                          },
                          sendIsOptional:true,
                          title: "Decline Requisition",
                          submitData: (data) => {
                            console.log(data);
                            dispatch(
                              DeclineLeave({
                                comment: data?.comments,
                                requisitionId: item?.id,
                                rejectionType: ApprovalData.RejectedByHR,
                              })
                            )?.then((res) => {
                              console.log(data);
                              closeModal();
                              dispatch(GetAllLeaveRequest(apiData));
                            });
                          },
                        },
                      });
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
