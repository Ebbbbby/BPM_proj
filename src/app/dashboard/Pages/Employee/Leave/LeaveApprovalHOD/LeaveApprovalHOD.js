import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";

import PageStyle from "../../../../Components/Layout/PageLayout";
import {
  GetByDepartment,
  ApproveLeave,
  DeclineLeave,
  GetConfirmAction
} from "../../../../../../utils/redux/HR/HRSlice";
import { useDispatch, useSelector } from "react-redux";
import { FilterButton, ProDropFilter, SearchFilter} from "../../../../Components/Search/Search";
import Table from "../../../../Components/Table/Table";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useNavigate} from "react-router";
import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../../Components/Misc/Actions";
import ApprovalData from "../../../HR/ApprovalConstants/data";
import { CalendarFilter2 } from "../../../../Components/Search/Search";
import { format } from "date-fns";
import { URL } from "../../../../../../utils/routes";
import { useApprovals } from "../../../Vendors/VendorApprovals/useApprovals";

const LeaveApprovalHOD = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [approvalStatus, setFilter] = useState("all");
  const [leaveStatusEnum, setLeaveStatus] = useState("all");
  const [search, setSearchText] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();



  const { get_department, isLoading } = useSelector((state) => state?.hr);
  console.log(get_department)

  let statusfilter = approvalStatus === "all" ? " " : approvalStatus;
  let leaveFilter = leaveStatusEnum === "all" ? "" : leaveStatusEnum;

  let start = startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let end = endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");
  const apiData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    approvalStatus: statusfilter,
    search: search,
    leaveStatusEnum: leaveFilter,
    startDate: start,
    endDate: end,
  };

  


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetByDepartment(apiData));
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  const handleFilterButton = () => {
    dispatch(GetByDepartment(apiData));
  };

  const filterBy = [
    {
      name: "Pending",
      filter: 0,
    },
    {
      name: "ApprovedByHOD",
      filter: 50,
    },
    {
      name: "ApprovedByHR",
      filter: 20,
    },
    {
      name: "RejectedByHOD",
      filter: 243,
    },
    {
      name: "RejectedByHR",
      filter: 243,
    },
  ];

  const leaveStatus = [
    {
      name: "Awaiting",
      filter: 0,
    },
    {
      name: "OnLeave",
      filter: 1,
    },
    {
      name: "Back",
      filter: 2,
    },

    {
      name: "Recalled",
      filter: 3,
    },
  ];

  return (
    <PageStyle
      title={"Leave Approval Management(H.O.D)"}
      hasBack={false}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearchText} />

        <ProDropFilter
          filter={approvalStatus}
          setFilter={setFilter}
          name={"Approval Status"}
          filterBy={filterBy}
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
        <FilterButton name="" onClick={() => handleFilterButton()} />
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
            <LeaveAppTable
              data={get_department}
              isLoading={isLoading}
              apiData={apiData}
            />

            {get_department?.result?.map((item) => (
              // console.log(item)
              <LeaveAppTable {...item} isLoading={isLoading} />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_department?.totalPages}
        present_page={get_department?.currentPage}
        totalRows={get_department?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default LeaveApprovalHOD;

const LeaveAppTable = ({ data, apiData }) => {
  const { openModal, closeModal } = useApprovals({});



  const navigate = useNavigate();
  const dispatch = useDispatch();
 
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
            {item?.durationValue > 1 ?
              `${item?.durationValue} Day`
              :  `${item?.durationValue} Days`}
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
                    ? "#FCEBEC"
                    : item?.approvalStatus === "RejectedByHOD"
                    ? "#9E0038"
                    : "",
                color:
                  item?.approvalStatus === "Pending"
                    ? "#815103"
                    : item?.approvalStatus === "ApprovedByHOD"
                    ? "#0F6308"
                    : item?.approvalStatus === "ApprovedByHR"
                    ? "#0F6308"
                    : item?.approvalStatus === "RejectedByHOD"
                    ? "#FCEBEC"
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
              
              :
            item?.approvalStatus === "ApprovedByHR" && item?.leaveStatus === "OnLeave" ? (
              <TableActions
                hasChildren={true}
                url={`../../${URL?.Employee}/Leave-Request/${item.id}/view`}
              >
                {[
                  {
                    name: "Recall Leave",
                    action: () =>
                      navigate(`../../${URL?.Employee}/Leave-Request/${item?.id}/recall`, {
                        state: item,
                      }),
                  },

                  {
                    name: "Confirm Leave Return",
                    action: () => {
                      dispatch(
                        GetConfirmAction({
                          LeaveId: item?.id,
                          isBack: true,
                        })
                      )?.then((res) => {
                        console.log(res)
                        closeModal();
                        dispatch(GetByDepartment(apiData));
                      });
                    },
                  },
                ]}
              </TableActions>
            ) : item?.approvalStatus === "ApprovedByHR" || item?.approvalStatus === "RejectedByHR"? (  <TableActions
              hasChildren={true}
              url={`../../${URL?.Employee}/Leave-Request/${item.id}/view`}
            ></TableActions>
            ):item.approvalStatus === "RejectedByHR"  || item?.approvalStatus === "RejectedByHOD" ? (
              <TableActions
                hasChildren={true}
                url={`../../${URL?.Employee}/Leave-Request/${item?.id}/view`}
              ></TableActions>
            ) : item?.approvalStatus === "ApprovedByHOD" ? (
              <TableActions
                hasChildren={true}
                url={`../../${URL?.Employee}/Leave-Request/${item.id}/view`}
              ></TableActions>
            ) : (
              <TableActions
                hasChildren={true}
                url={`../../${URL?.Employee}/Leave-Request/${item.id}/view`}
              >
                {[
                  {
                    name: "Edit Requisition",
                    action: () =>
                      navigate(`../../${URL?.Employee}/Leave-Request/${item.id}/edit`, {
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
                          title: "Approve Requisition",
                          sendIsOptional:true,
                          submitData: (data) => {
                            dispatch(
                              ApproveLeave({
                                comment: data?.comments,
                                requisitionId: item?.id,
                                approvalType: ApprovalData.ApprovedByHOD,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetByDepartment(apiData));
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
                          title: "Decline Requisition",
                          sendIsOptional:true,
                          submitData: (data) => {
                            console.log(data);
                            dispatch(
                              DeclineLeave({
                                comment: data?.comments,
                                requisitionId: item?.id,
                                rejectionType: ApprovalData.RejectedByHOD,
                              })
                            )?.then((res) => {
                              console.log(data);
                              closeModal();
                              dispatch(GetByDepartment(apiData));
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
};
