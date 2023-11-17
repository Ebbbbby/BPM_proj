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
import { PageActions, TableActions } from "../../../Components/Misc/Actions";
import {
  ApproveAccidentReport,
  ApproveOrDeclineBatchAccidentReportRequest,
  CancelAccidentReport,
  DeclineAccidentReport,
  GetAllAccidentReport,
  GetAllMyAccidentReports,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import {
  AccidentType,
  ApprovalStatus,
} from "../../../../../utils/const/AccidentReportConst";
import { useApprovals } from "./useApprovals";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { format } from "date-fns";
import { ApproveModals } from "../../../Components/Modals/ApproveDeclineModals";
import { getMyPermissions } from "../../../../../utils/functions/GetMyPermissions";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";
import Header from "../../../Components/Header";

function Reports() {
  const [filter, setFilter] = useState("all");
  const [action, setAction] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { all_report, all_my_report, isLoadingReports } = useSelector(
    (state) => state?.fleet
  );
  const { comments, reportId } = useSelector((state) => state?.global);
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxState, setCheckboxState] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setCheckboxState({ ...checkboxState, [id]: !checkboxState[id] });
    } else {
      const newCheckboxState = { ...checkboxState };
      delete newCheckboxState[id];
      setCheckboxState(newCheckboxState);
      setSelectAll(false);
    }
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    const newCheckboxState = {};
    let filteredItems = all_accident_report.filter(
      (item) => item.approvalStatus === 1
    );
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

  const userPermissions = getMyPermissions();

  let statusfilter = filter === "all" ? "" : filter;

  let dateFrom =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let dateTo =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");

  let all_accident_report = all_report?.data;
  let all_my_accident_report = all_my_report?.data;

  //#region realtime data filter
  /*
    all_accident_report = all_accident_report?.filter(row => row.driverName.toLowerCase().includes(searchQuery.toLowerCase()) || row.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) );
    all_accident_report = all_accident_report?.filter(row => filter === 'all' || row.approvalStatus === parseInt(filter));
    all_accident_report = all_accident_report?.filter(row => {
      if (!startDate || !endDate) {
        return true;
      }
      const rowDate = new Date(row.accidentDate);
      return rowDate >= startDate && rowDate <= endDate;
    });
    */
  //#endregion

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
    dispatch(GetAllMyAccidentReports(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage]);

  const handleFilterButton = () => {
    dispatch(GetAllAccidentReport(apiData));
  };

  const handleFilterButton2 = () => {
    dispatch(GetAllMyAccidentReports(apiData));
  };

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate("add")}>Accident Report</CTAButtons>
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
    {
      name: "Cancelled",
      filter: 3,
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
    <div>
      <PageStyle
        title={"ACCCIDENT REPORTS MANAGEMENT"}
        hasBack={false}
        action={actionButton}
        isHeadLiner={true}
      />
      {userPermissions.includes(
        DEFINED_PERMISSIONS.SecondaryFleetManager,
        DEFINED_PERMISSIONS.PrimaryFleetManager
      ) && (
        <PageStyle title={"All Accident Reports"} hasBack={false} isMain={true}>
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
                      ApproveOrDeclineBatchAccidentReportRequest(
                        batchApprovalData
                      )
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

            <CalendarFilter2
              name="Select Date Range"
              setStartDate={setStartDate}
              setEndDate={setEndDate}
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
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  <th>Driver Name</th>
                  <th>Vehicle Name</th>
                  <th>Accident Type</th>
                  <th>Insurance</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <RepTable
                  isLoadingReports={isLoadingReports}
                  handleCheckboxChange={handleCheckboxChange}
                  checkboxState={checkboxState}
                  data={all_accident_report}
                  apiData={apiData}
                />

                {all_accident_report?.map((x) => (
                  <RepTable {...x} isLoadingReports={isLoadingReports} />
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination
            last_page={all_report?.metaData?.totalPages}
            present_page={all_report?.metaData?.page}
            totalRows={all_report?.metaData?.total}
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
      )}

      <PageStyle title={"My Accident Reports"} hasBack={false} isMain={true}>
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
                    ApproveOrDeclineBatchAccidentReportRequest(
                      batchApprovalData
                    )
                  ).then((res) => {
                    if (res?.payload?.successful === true) {
                      dispatch(GetAllMyAccidentReports(apiData));
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

          <CalendarFilter2
            name="Select Date Range"
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

          <FilterButton name="" onClick={handleFilterButton2} />
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
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th>Driver Name</th>
                <th>Vehicle Name</th>
                <th>Accident Type</th>
                <th>Insurance</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <RepTable
                isLoadingReports={isLoadingReports}
                handleCheckboxChange={handleCheckboxChange}
                checkboxState={checkboxState}
                data={all_my_accident_report}
                apiData={apiData}
              />

              {all_my_accident_report?.map((x) => (
                <RepTable {...x} isLoadingReports={isLoadingReports} />
              ))}
            </tbody>
          </Table>
        </div>
        <Pagination
          last_page={all_my_report?.metaData?.totalPages}
          present_page={all_my_report?.metaData?.page}
          totalRows={all_my_report?.metaData?.total}
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
                dispatch(GetAllMyAccidentReports(apiData));
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
                dispatch(GetAllMyAccidentReports(apiData));
              }
            })
          }
        />
      </PageStyle>
    </div>
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
        const isApproved = item?.approvalStatus === 0 ? true : false;
        const isDeclined = item?.approvalStatus === 2 ? true : false;
        const isCanceled = item?.approvalStatus === 3 ? true : false;
        return (
          <tr key={item?.uuId}>
            <td>
              {isApproved || isDeclined || isCanceled ? (
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
              {isCanceled ? (
                <TableActions
                  hasChildren={true}
                  url={`${item?.uuId}/view`}
                ></TableActions>
              ) : isDeclined ? (
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
                      name: "Approve Accident Report",
                      action: () => {
                        openModal({
                          type: "suspend",
                          details: {
                            button: {
                              name: "Yes, Approve",
                              color: "",
                            },
                            commentIsOptional: false,
                            sendIsOptional: true,
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
                      name: "Decline Accident Report",
                      action: () => {
                        openModal({
                          type: "suspend",
                          details: {
                            button: {
                              name: "Yes, Decline",
                              color: "red",
                            },
                            commentIsOptional: true,
                            sendIsOptional: true,
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
                    {
                      name: "Cancel Accident Report",
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
                            title: "Cancel Report",
                            submitData: (data) => {
                              dispatch(
                                CancelAccidentReport({
                                  comment: data?.comments,
                                  uuId: item.uuId,
                                })
                              )?.then((res) => {
                                closeModal();
                                dispatch(GetAllAccidentReport(apiData));
                              });
                            },
                          },
                        });
                        setIsOpen(!isOpen);
                        setModalValue("cancel");
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
