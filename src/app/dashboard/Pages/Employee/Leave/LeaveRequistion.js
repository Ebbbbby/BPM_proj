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
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import PageStyle from "../../../Components/Layout/PageLayout";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { GetMyLeaveRequest } from "../../../../../utils/redux/HR/HRSlice";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

const LeaveRequistion = () => {
  const [search, setSearchText] = useState("");

  const [approvalStatus, setFilter] = useState("all");
  const [leaveStatusEnum, setLeaveStatus] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  const { get_myrequest, isLoading } = useSelector((state) => state.hr);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let statusfilter = approvalStatus === "all" ? "" : approvalStatus
  let leaveFilter = leaveStatusEnum === "all"? '': leaveStatusEnum;
  let start =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let end =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");


  const apiData = {
    perPage: perPage,
    pageNumber: pageNumber,
    approvalStatus: statusfilter,
    search: search,
    leaveStatusEnum: leaveFilter,
    startDate: start,
    endDate: end,

  };
  useEffect(() => {
    dispatch(GetMyLeaveRequest(apiData));
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, perPage]);

  const handleFilterButton = () => {
    dispatch(GetMyLeaveRequest(apiData))
  }




  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate(`${URL.Add_Leave}`)}>
        Add Leave
      </CTAButtons>
    </>
  );
  const filterBy = [
    {
      name: "All",
      filter: 'all',
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
      filter: 'all',
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
      title={"Leave Requisition"}
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

        {/* </div> */}
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>Initiators Name</th>
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
              data={get_myrequest}
              isLoading={isLoading}
              apiData={apiData}
            />

            {get_myrequest?.result?.map((item) => (
              // console.log(item)
              <LeaveTable {...item} isLoading={isLoading} />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_myrequest?.totalPages}
        present_page={get_myrequest?.currentPage}
        totalRows={get_myrequest?.totalRows}
        pageSize={perPage}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default LeaveRequistion;

function LeaveTable({ isLoading, data, apiData }) {
  const navigate = useNavigate();
  // if (isLoading === true) {

  //   return <p>Loading...</p>;
  // }
  return (
    <>
      {data?.result?.map((item) => (
        <tr key={item?.id}>
          <td>{item?.initiatorName}</td>
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
            {item?.approvalStatus === "Pending" ||
            item?.approvalStatus === "RejectedByHR" ? (
              <TableActions hasChildren={true} url={`${item?.id}/view`}>
                {[
                  {
                    name: "Edit Requisition",
                    action: () =>
                      navigate(`${item?.id}/edit`, {
                        state: item,
                      }),
                  },
                ]}
              </TableActions>
            ) : (
              <TableActions
                hasChildren={true}
                url={`${item?.id}/view`}
              ></TableActions>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
