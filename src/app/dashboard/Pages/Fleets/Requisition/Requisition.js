import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  CalendarFilter2,
  ActionButton,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  GetFuelRequest,
  ApproveFuelRequest,
  DeclineFuelRequest,
  CancelFuelRequest,
  ApproveOrDeclineRequisition,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { FilterButton } from "../../../Components/Search/Search";
import { format } from "date-fns";
import "./style.css";
function Requisition() {
  const [requisitionStatus, setRequisitionStatus] = useState(null);
  const [find, setFind] = useState(false);
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [action, setAction] = useState();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const getRequest = useSelector((state) => state?.fleet);
  const { get_request, isLoading } = getRequest;
  //console.log(get_request)
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let start =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let end =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");

  let requisition = get_request?.result;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    startDate: start,
    endDate: end,
    action: action,
    search: search,
  };
  useEffect(() => {
    if (requisitionStatus !== null) {
      apiData["requisitionStatus"] = requisitionStatus;
    }
    if (search !== null && search !== "" && search !== " ") {
      apiData["search"] = search;
    }

    dispatch(GetFuelRequest(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    requisitionStatus,
    pageNumber,
    pageSize,
    search,
    startDate,
    endDate,
    action,
  ]);

  requisition = requisition?.filter(
    (row) =>
      row.requestedBy.toLowerCase().includes(search.toLowerCase()) ||
      row.vehicleName.toLowerCase().includes(search.toLowerCase())
  );

  const HandleSelectedItems = (itemId, checked) => {
    setSelectedItems((prevSelectedItems) => {
      if (checked) {
        return [...prevSelectedItems, itemId];
      } else {
        return prevSelectedItems.filter((id) => id !== itemId);
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const pendingItemIds = requisition
        ?.filter((item) => item.requisitionStatus === "Initiated")
        .map((item) => item.id);
      setSelectedItems(pendingItemIds);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate(URL.Add_Requisitions)}>
        Fuel Requisition
      </CTAButtons>
    </>
  );

  const filterBy = [
    {
      name: "Approved",
      filter: 0,
    },
    {
      name: "Initiated",
      filter: 1,
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

  const actionTaken = [
    {
      name: "Approved",
      filter: 0,
    },
    {
      name: "Declined",
      filter: 2,
    },
  ];

  return (
    <PageStyle
      title={"Fuel Requisition Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearch} />

        <ProDropFilter
          filter={requisitionStatus}
          setFilter={setRequisitionStatus}
          name={"Status"}
          filterBy={filterBy}
        />
        <CalendarFilter2
          name="Select Date Range"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <FilterButton onClick={() => setFind(!find)} name="" />

        <ActionButton
          filter={filter}
          setFilter={setAction}
          name={"Action"}
          placeholder={"Action"}
          filterBy={actionTaken}
          onChange={() => {
            setAction((action) => {
              console.log("Action", Number(action));
              if (selectedItems.length > 0) {
                dispatch(
                  ApproveOrDeclineRequisition({
                    requisitionIds: selectedItems,
                    status: Number(action),
                  })
                ).then((res) => {
                  if (res?.payload?.successful === true) {
                    dispatch(GetFuelRequest(apiData));
                  }
                });
              }
            });
          }}
        />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={DashboardStyle.dashboard_table_check_input}
                  checked={
                    selectAll === true ||
                    (selectedItems.length > 0 &&
                      selectedItems.length ===
                        requisition?.filter(
                          (item) => item.requisitionStatus === "Initiated"
                        ).length)
                  }
                  onChange={handleSelectAllChange}
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: "green",
                  }}
                />
              </th>
              <th>Requested For</th>
              <th>Litres</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Vehicle Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <RequestTable
              isLoading={isLoading}
              apiData={apiData}
              getRequest={get_request}
              HandleSelectedItems={HandleSelectedItems}
              selectedItems={selectedItems}
            />
            {get_request?.result?.map?.((item) => (
              <RequestTable
                {...item}
                key={item.id}
                isLoading={isLoading}
                apiData={apiData}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_request?.totalPages}
        present_page={get_request?.currentPage}
        totalRows={get_request?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default Requisition;

function RequestTable({
  apiData,
  getRequest,
  HandleSelectedItems,
  selectedItems,
}) {
  const { openModal, closeModal } = useApprovals({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {getRequest?.result?.map((item) => (
        <tr key={item.id}>
          <td>
            {item.requisitionStatus === "Initiated" && (
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => HandleSelectedItems(item.id, e.target.checked)}
                style={{ height: "20px", width: "20px" }}
              />
            )}
          </td>
          <td>{item.requestedBy}</td>
          <td>{item.litres}</td>
          <td>{FormatCurrency(item.rate)}</td>
          <td>{FormatCurrency(item.amount)}</td>
          <td>{item.vehicleName}</td>
          <td>{FormatDateTime(item.requisitionDate)}</td>
          <td style={{ textAlign: "center" }}>
            <span
              style={{
                textAlign: "center",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                backgroundColor:
                  item.requisitionStatus === "Initiated"
                    ? "#FFF1CF"
                    : item.requisitionStatus === "Approved"
                    ? "#DCFFC9"
                    : item.requisitionStatus === "Cancelled"
                    ? "#FFF1e4"
                    : item.requisitionStatus === "Declined"
                    ? "#FBE6E7"
                    : "",
                color:
                  item.requisitionStatus === "Initiated"
                    ? "#815103"
                    : item.requisitionStatus === "Approved"
                    ? "#0F6308"
                    : item.requisitionStatus === "Cancelled"
                    ? "815123"
                    : item.requisitionStatus === "Declined"
                    ? "#8A002B"
                    : "",
              }}
            >
              {item.requisitionStatus}
            </span>
          </td>
          <td>
            {item.requisitionStatus === "Declined" ? (
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
            ) : item?.requisitionStatus === "Approved" ||
              item?.requisitionStatus === "Cancelled" ? (
              <TableActions
                hasChildren={true}
                url={`${item?.id}/view`}
              ></TableActions>
            ) : (
              <TableActions hasChildren={true} url={`${item?.id}/view`}>
                {[
                  {
                    name: "Edit Requisition",
                    action: () =>
                      navigate(`${item?.id}/edit`, {
                        state: item,
                      }),
                  },

                  {
                    name: "Approve Requisition",
                    action: () => {
                      openModal({
                        type: "",
                        details: {
                          button: {
                            name: "Yes, Approve",
                            color: "",
                          },
                          sendIsOptional: true,

                          title: "Approve Requisition",
                          submitData: (data) => {
                            dispatch(
                              ApproveFuelRequest({
                                comment: data?.comments,
                                id: item.id,
                                emailTrigger: true,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetFuelRequest(apiData));
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
                        type: "",
                        details: {
                          button: {
                            name: "Yes, Decline",
                            color: "",
                          },
                          sendIsOptional: true,

                          title: "Decline Requisition",
                          submitData: (data) => {
                            dispatch(
                              DeclineFuelRequest({
                                comment: data?.comments,
                                id: item.id,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetFuelRequest(apiData));
                            });
                          },
                        },
                      });
                    },
                  },
                  {
                    name: "Cancel Requisition",
                    action: () => {
                      openModal({
                        type: "",
                        details: {
                          button: {
                            name: "Yes, Cancel",
                            color: "",
                          },
                          sendIsOptional: true,
                          title: "Cancel Requisition",
                          submitData: (data) => {
                            dispatch(
                              CancelFuelRequest({
                                comment: data?.comments,
                                id: item.id,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetFuelRequest(apiData));
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
