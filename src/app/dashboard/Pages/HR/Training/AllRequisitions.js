import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
  ActionButton,
  CalendarFilter2,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ApproveModals } from "../../../Components/Modals/ApproveDeclineModals";
import { TableActions } from "../../../Components/Misc/Actions";
import {
  ApproveAccidentReport,
  ApproveOrDeclineBatchAccidentReportRequest,
  DeclineAccidentReport,
  GetAllAccidentReport,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import {
  AccidentType,
  ApprovalStatus,
} from "../../../../../utils/const/AccidentReportConst";
import { useApprovals } from "./useApprovals";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { format } from "date-fns";

function Reports() {
  const [filter, setFilter] = useState("all");
  const [action, setAction] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { all_emp_req, isLoading } = useSelector((state) => state?.HR);
  const { comments, reportId } = useSelector((state) => state?.global);
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxState, setCheckboxState] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(all_emp_req);

  /*

    const handleCheckboxChange = (id, checked) => {
      if(checked){
        setCheckboxState({ ...checkboxState, [id]: !checkboxState[id] });
      }
      else{
        const newCheckboxState = { ...checkboxState };
        delete newCheckboxState[id];
        setCheckboxState(newCheckboxState);
        setSelectAll(false);
      }
    };
    
    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        const newCheckboxState = {};
        let filteredItems =  all_emp_req.filter((item) => item.approvalStatus === 1);
        if (!selectAll) {
          // If "Select All" checkbox is unchecked, set checkbox state for all filtered items
          filteredItems.forEach((data) => {
            newCheckboxState[data.uuId] = true;
          });
          setCheckboxState(newCheckboxState);
          setSelectAll(true);
        } else {
          // If "Select All" checkbox is checked, clear checkbox state for all filtered items
          filteredItems.forEach((data) => {
            delete checkboxState[data.uuId];
          });
          setCheckboxState({ ...checkboxState });
          setSelectAll(false);
        }
    };

    */

  let statusfilter = filter === "all" ? "" : filter;

  let dateFrom =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let dateTo =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");

  // let all_accident_report = all_report?.data;

  const apiData = {
    searchQuery: searchQuery,
    action: action,
    filter: statusfilter,
    startDate: dateFrom,
    endDate: dateTo,
    pageSize: pageSize,
    currentPage: currentPage,
  };

  const batchApprovalData = {
    accidentReportIds: Object.keys(checkboxState),
    approvalStatus: parseInt(action),
  };

  useEffect(() => {
    dispatch(GetAllAccidentReport(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, searchQuery, pageSize, currentPage, startDate, endDate]);

  const handleFilterButton = () => {
    dispatch(GetAllAccidentReport(apiData));
  };

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate("add")}>Training</CTAButtons>
    </>
  );

  const filterBy = [
    {
      name: "All",
      filter: "all",
    },
    {
      name: "Approved",
      filter: 0,
    },
    {
      name: "Pending",
      filter: 1,
    },
    {
      name: "Declined",
      filter: 2,
    },
  ];

  const actionTaken = [
    {
      name: "Approve",
      filter: 0,
    },
    {
      name: "Decline",
      filter: 2,
    },
  ];

  return (
    <PageStyle
      title={"Training Requisition Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <ActionButton
          filter={filter}
          setFilter={setAction}
          name={"Action"}
          placeholder={"Action"}
          filterBy={actionTaken}
          onChange={() => {
            setAction((action) => {
              batchApprovalData.approvalStatus = parseInt(action);
              if (batchApprovalData.accidentReportIds.length > 0) {
                dispatch(
                  ApproveOrDeclineBatchAccidentReportRequest(batchApprovalData)
                ).then((res) => {
                  if (res?.payload?.successful === true) {
                    dispatch(GetAllAccidentReport(apiData));
                  }
                });
              }
            });
          }}
        />

        <SearchFilter text={setSearchQuery} />

        <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Select Status"}
          filterBy={filterBy}
          value={filter}
        />

        <FilterButton name="" onClick={handleFilterButton} />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={DashboardStyle.dashboard_table_check_input}
                  name="all"
                  checked={selectAll}
                  // onChange={handleSelectAllChange}
                />
              </th>
              <th>Beneficiary</th>
              <th>Department</th>
              <th>Training Type</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Service Type</th>
              <th>Reimbursement Status</th>
              <th>Training Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <RepTable
              isLoading={isLoading}
              // handleCheckboxChange = {handleCheckboxChange}
              checkboxState={checkboxState}
              data={all_emp_req}
              apiData={apiData}
            />

            {all_emp_req?.map((x) => (
              <RepTable {...x} isLoading={isLoading} />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={all_emp_req?.metaData?.totalPages}
        present_page={all_emp_req?.metaData?.page}
        totalRows={all_emp_req?.metaData?.total}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
      <ApproveModals
        declineAction={() =>
          dispatch(
            DeclineAccidentReport({
              requestId: reportId,
              comment: comments,
            })
          ).then((res) => {
            if (res?.payload?.successful === true) {
              dispatch(GetAllAccidentReport(apiData));
            }
          })
        }
        approvalAction={() =>
          dispatch(
            ApproveAccidentReport({
              requestId: reportId,
              comment: comments,
            })
          ).then((res) => {
            if (res?.payload?.successful === true) {
              dispatch(GetAllAccidentReport(apiData));
            }
          })
        }
      />
    </PageStyle>
  );
}

export default Reports;

function RepTable({
  apiData,
  data,
  isLoadingReports,
  checkboxState,
  handleCheckboxChange,
}) {
  const [setModalValue] = useState("");
  const { openModal, closeModal } = useApprovals({});
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoadingReports === true) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {data?.map?.((item) => {
        const isApproved = item.approvalStatus === 0 ? true : false;
        const isDeclined = item.approvalStatus === 2 ? true : false;
        return (
          <tr key={item?.uuId}>
            <td>
              {isApproved || isDeclined ? (
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(item.uuId)}
                  className={DashboardStyle.dashboard_table_check_input}
                  style={{ display: "none" }}
                />
              ) : (
                <input
                  type="checkbox"
                  checked={checkboxState[item.uuId] || false}
                  onChange={(e) =>
                    handleCheckboxChange(item.uuId, e.target.checked)
                  }
                  className={DashboardStyle.dashboard_table_check_input}
                />
              )}
            </td>
            <td>{item.driverName}</td>
            <td>{item.vehicleName}</td>
            <td>
              {Object.keys(AccidentType).find(
                (key) => AccidentType[key] === item.accidentType
              )}
            </td>
            <td>{item.insuranceName}</td>
            <td>{FormatDateTime(item.accidentDate, "ll")}</td>
            <td>
              <span
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.875rem",
                  backgroundColor:
                    Object.keys(ApprovalStatus).find(
                      (key) => ApprovalStatus[key] === item.approvalStatus
                    ) === "Initiated"
                      ? "#FFF1CF"
                      : Object.keys(ApprovalStatus).find(
                          (key) => ApprovalStatus[key] === item.approvalStatus
                        ) === "Approved"
                      ? "#DCFFC9"
                      : Object.keys(ApprovalStatus).find(
                          (key) => ApprovalStatus[key] === item.approvalStatus
                        ) === "Declined"
                      ? "#FBE6E7"
                      : "",
                  color:
                    Object.keys(ApprovalStatus).find(
                      (key) => ApprovalStatus[key] === item.approvalStatus
                    ) === "Initiated"
                      ? "#815103"
                      : Object.keys(ApprovalStatus).find(
                          (key) => ApprovalStatus[key] === item.approvalStatus
                        ) === "Approved"
                      ? "#0F6308"
                      : Object.keys(ApprovalStatus).find(
                          (key) => ApprovalStatus[key] === item.approvalStatus
                        ) === "Declined"
                      ? "#8A002B"
                      : "",
                }}
              >
                {" "}
                {Object.keys(ApprovalStatus).find(
                  (key) => ApprovalStatus[key] === item.approvalStatus
                )}
              </span>
            </td>
            <td>
              {isDeclined ? (
                <TableActions hasChildren={true} url={`${item?.uuId}/view`}>
                  {[
                    {
                      name: "Edit Accident Report",
                      action: () => {
                        navigate(`./${item.uuId}/edit`, { state: item });
                      },
                    },
                  ]}
                </TableActions>
              ) : !isApproved ? (
                <TableActions hasChildren={true} url={`${item?.uuId}/view`}>
                  {[
                    {
                      name: "Edit Accident Report",
                      action: () => {
                        navigate(`./${item.uuId}/edit`, { state: item });
                      },
                    },
                    {
                      name: "Approve",
                      action: () => {
                        openModal({
                          type: "",
                          details: {
                            button: {
                              name: "Yes, Approve",
                              color: "",
                            },
                            title: "Approve Report",
                            submitData: (data) => {
                              dispatch(
                                ApproveAccidentReport({
                                  comment: data?.comments,
                                  uuId: item.uuId,
                                  emailTrigger: false,
                                })
                              )?.then((res) => {
                                closeModal();
                                dispatch(GetAllAccidentReport(apiData));
                              });
                            },
                          },
                        });
                        setIsOpen(!isOpen);
                        setModalValue("approve");
                      },
                    },
                    {
                      name: "Decline",
                      action: () => {
                        openModal({
                          type: "",
                          details: {
                            button: {
                              name: "Yes, Decline",
                              color: "",
                            },
                            title: "Decline Report",
                            submitData: (data) => {
                              dispatch(
                                DeclineAccidentReport({
                                  comment: data?.comments,
                                  uuId: item.uuId,
                                  emailTrigger: false,
                                })
                              )?.then((res) => {
                                closeModal();
                                dispatch(GetAllAccidentReport(apiData));
                              });
                            },
                          },
                        });
                        setIsOpen(!isOpen);
                        setModalValue("decline");
                      },
                    },
                  ]}
                </TableActions>
              ) : (
                <TableActions url={`${item?.uuId}/view`}></TableActions>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}
