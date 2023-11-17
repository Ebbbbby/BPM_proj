import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  ActionButton,
  FilterButton,
  CalendarFilter2,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ApproveModals } from "../../../Components/Modals/ApproveDeclineModals";
import { TableActions } from "../../../Components/Misc/Actions";
import {
  ApproveMaintenanceRequest,
  ApproveOrDeclineBatchMaintenanceRequest,
  CancelMaintenanceRequest,
  DeclineMaintenanceRequest,
  GetAllMyVehicleMaintenanceRequests,
  GetAllVehicleMaintenance,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { MaintenanceStatus } from "../../../../../utils/const/VehicleMaintenanceConst";
import { useApprovals } from "./useApprovals";
import { format } from "date-fns";

function MaintenanceRequisitions() {
  const [filter, setFilter] = useState("all");
  const [action, setAction] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { all_requisitions, all_my_requisitions, isLoading } = useSelector(
    (state) => state?.fleet
  );
  const { comments, requestId } = useSelector((state) => state?.global);
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
    let filteredItems = all_maintenance_requisitions.filter(
      (item) => item.maintenanceStatus === 0
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

  let statusfilter = filter === "all" ? "" : filter;

  let dateFrom =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let dateTo =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");

  let all_maintenance_requisitions = all_requisitions?.pageItems;
  let all_my_maintenance_requisitions = all_my_requisitions?.pageItems;

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
    maintenanceIds: Object.keys(checkboxState),
    maintenanceStatusEnum: parseInt(action),
  };

  useEffect(() => {
    dispatch(GetAllVehicleMaintenance(apiData));
    dispatch(GetAllMyVehicleMaintenanceRequests(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, action]);

  const handleFilterButton = () => {
    dispatch(GetAllVehicleMaintenance(apiData));
  };

  const handleFilterButton2 = () => {
    dispatch(GetAllMyVehicleMaintenanceRequests(apiData));
  };

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate("add")}>
        Maintenance Requisition
      </CTAButtons>
    </>
  );

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
      name: "Approved",
      filter: 1,
    },
    {
      name: "Declined",
      filter: 3,
    },
    {
      name: "Cancelled",
      filter: 4,
    },
  ];

  const actionTaken = [
    {
      name: "Approve",
      filter: 1,
    },
    {
      name: "Decline",
      filter: 3,
    },
  ];

  return (
    <div>
      <PageStyle
        title={"VEHICLE MAINTENANCE MANAGEMENT"}
        hasBack={false}
        action={actionButton}
        isHeadLiner={true}
      />
      <PageStyle
        title={"All Maintenance Requisitions"}
        hasBack={false}
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
                batchApprovalData.maintenanceStatusEnum = parseInt(action);
                if (batchApprovalData.maintenanceIds.length > 0) {
                  dispatch(
                    ApproveOrDeclineBatchMaintenanceRequest(batchApprovalData)
                  ).then((res) => {
                    if (res?.payload?.successful === true) {
                      dispatch(GetAllVehicleMaintenance(apiData));
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
                <th>Maintenance Type</th>
                <th>Vehicle Name</th>
                <th>Maintenance Date</th>
                <th>Amount</th>
                <th>Requested By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <ReqTable
                data={all_maintenance_requisitions}
                isLoading={isLoading}
                handleCheckboxChange={handleCheckboxChange}
                checkboxState={checkboxState}
                apiData={apiData}
              />

              {all_maintenance_requisitions?.map((x) => (
                <ReqTable {...x} isLoading={isLoading} />
              ))}
            </tbody>
          </Table>
        </div>
        <Pagination
          last_page={all_requisitions?.totalNumberOfPages}
          present_page={all_requisitions?.currentPage}
          totalRows={all_requisitions?.pageSize}
          pageSize={pageSize}
          setPageSize={(page) => setPageSize(page)}
          click={(page) => setCurrentPage(page)}
        />
        <ApproveModals
          declineAction={() =>
            dispatch(
              DeclineMaintenanceRequest({
                requestId: requestId,
                comment: comments,
              })
            ).then((res) => {
              if (res?.payload?.successful === true) {
                dispatch(GetAllVehicleMaintenance(apiData));
              }
            })
          }
          approvalAction={() =>
            dispatch(
              ApproveMaintenanceRequest({
                requestId: requestId,
                comment: comments,
              })
            ).then((res) => {
              if (res?.payload?.successful === true) {
                dispatch(GetAllVehicleMaintenance(apiData));
              }
            })
          }
        />
      </PageStyle>

      <PageStyle
        title={"My Maintenance Requisitions"}
        hasBack={false}
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
                batchApprovalData.maintenanceStatusEnum = parseInt(action);
                if (batchApprovalData.maintenanceIds.length > 0) {
                  dispatch(
                    ApproveOrDeclineBatchMaintenanceRequest(batchApprovalData)
                  ).then((res) => {
                    if (res?.payload?.successful === true) {
                      dispatch(GetAllMyVehicleMaintenanceRequests(apiData));
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
                <th>Maintenance Type</th>
                <th>Vehicle Name</th>
                <th>Maintenance Date</th>
                <th>Amount</th>
                <th>Requested By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <ReqTable
                data={all_my_maintenance_requisitions}
                isLoading={isLoading}
                handleCheckboxChange={handleCheckboxChange}
                checkboxState={checkboxState}
                apiData={apiData}
              />

              {all_my_maintenance_requisitions?.map((x) => (
                <ReqTable {...x} isLoading={isLoading} />
              ))}
            </tbody>
          </Table>
        </div>
        <Pagination
          last_page={all_my_requisitions?.totalNumberOfPages}
          present_page={all_my_requisitions?.currentPage}
          totalRows={all_my_requisitions?.pageSize}
          pageSize={pageSize}
          setPageSize={(page) => setPageSize(page)}
          click={(page) => setCurrentPage(page)}
        />
        <ApproveModals
          declineAction={() =>
            dispatch(
              DeclineMaintenanceRequest({
                requestId: requestId,
                comment: comments,
              })
            ).then((res) => {
              if (res?.payload?.successful === true) {
                dispatch(GetAllMyVehicleMaintenanceRequests(apiData));
              }
            })
          }
          approvalAction={() =>
            dispatch(
              ApproveMaintenanceRequest({
                requestId: requestId,
                comment: comments,
              })
            ).then((res) => {
              if (res?.payload?.successful === true) {
                dispatch(GetAllMyVehicleMaintenanceRequests(apiData));
              }
            })
          }
        />
      </PageStyle>
    </div>
  );
}

function ReqTable({ apiData, data, checkboxState, handleCheckboxChange }) {
  const [setModalValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { openModal, closeModal } = useApprovals({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {data?.map?.((item) => {
        const isApproved = item?.maintenanceStatus === 1 ? true : false;
        const isDeclined = item?.maintenanceStatus === 3 ? true : false;
        const isCanceled = item?.maintenanceStatus === 4 ? true : false;
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
            <td>{item.maintenanceType}</td>
            <td>{item.assetName}</td>
            <td>{FormatDateTime(item.maintenanceDate, "ll")}</td>
            <td>{item.amount}</td>
            <td>{item.requestorName}</td>
            <td>
              <span
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.875rem",
                  backgroundColor:
                    Object.keys(MaintenanceStatus).find(
                      (key) => MaintenanceStatus[key] === item.maintenanceStatus
                    ) === "Initiated"
                      ? "#FFF1CF"
                      : Object.keys(MaintenanceStatus).find(
                          (key) =>
                            MaintenanceStatus[key] === item.maintenanceStatus
                        ) === "Approved"
                      ? "#DCFFC9"
                      : Object.keys(MaintenanceStatus).find(
                          (key) =>
                            MaintenanceStatus[key] === item.maintenanceStatus
                        ) === "Declined"
                      ? "#FBE6E7"
                      : "",
                  color:
                    Object.keys(MaintenanceStatus).find(
                      (key) => MaintenanceStatus[key] === item.maintenanceStatus
                    ) === "Initiated"
                      ? "#815103"
                      : Object.keys(MaintenanceStatus).find(
                          (key) =>
                            MaintenanceStatus[key] === item.maintenanceStatus
                        ) === "Approved"
                      ? "#0F6308"
                      : Object.keys(MaintenanceStatus).find(
                          (key) =>
                            MaintenanceStatus[key] === item.maintenanceStatus
                        ) === "Declined"
                      ? "#8A002B"
                      : "",
                }}
              >
                {" "}
                {Object.keys(MaintenanceStatus).find(
                  (key) => MaintenanceStatus[key] === item.maintenanceStatus
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
                      name: "Edit Maintenance Requisition",
                      action: () => {
                        navigate(`./${item?.uuId}/edit`, { state: item });
                      },
                    },
                  ]}
                </TableActions>
              ) : !isApproved ? (
                <TableActions hasChildren={true} url={`${item?.uuId}/view`}>
                  {[
                    {
                      name: "Edit Maintenance Requisition",
                      action: () => {
                        navigate(`./${item.uuId}/edit`, { state: item });
                      },
                    },
                    {
                      name: "Approve Maintenance Requisition",
                      action: () => {
                        openModal({
                          type: "",
                          details: {
                            button: {
                              name: "Yes, Approve",
                              color: "",
                            },
                            commentIsOptional: false,
                            sendIsOptional: true,
                            title: "Approve Request",
                            submitData: (data) => {
                              dispatch(
                                ApproveMaintenanceRequest({
                                  comment: data?.comments,
                                  uuId: item.uuId,
                                })
                              )?.then((res) => {
                                closeModal();
                                dispatch(GetAllVehicleMaintenance(apiData));
                              });
                            },
                          },
                        });
                        setIsOpen(!isOpen);
                        setModalValue("approve");
                      },
                    },
                    {
                      name: "Decline Maintenance Requisition",
                      action: () => {
                        openModal({
                          type: "",
                          details: {
                            button: {
                              name: "Yes, Decline",
                              color: "red",
                            },
                            commentIsOptional: true,
                            sendIsOptional: true,
                            title: "Decline Request",
                            submitData: (data) => {
                              dispatch(
                                DeclineMaintenanceRequest({
                                  comment: data?.comments,
                                  uuId: item.uuId,
                                })
                              )?.then((res) => {
                                closeModal();
                                dispatch(GetAllVehicleMaintenance(apiData));
                              });
                            },
                          },
                        });
                        setIsOpen(!isOpen);
                        setModalValue("decline");
                      },
                    },
                    {
                      name: "Cancel Maintenance Requisition",
                      action: () => {
                        openModal({
                          type: "",
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
                                CancelMaintenanceRequest({
                                  comment: data?.comments,
                                  uuId: item.uuId,
                                })
                              )?.then((res) => {
                                closeModal();
                                dispatch(GetAllVehicleMaintenance(apiData));
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

export default MaintenanceRequisitions;
