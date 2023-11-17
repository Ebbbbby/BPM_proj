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
import { useDispatch, useSelector } from "react-redux";
import {
  GetFuelPayment,
  ApproveFuelPayment,
  DeclineFuelPayment,
  CancelFuelPayment,
  ApproveOrDeclinePayment,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";

import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { format } from "date-fns";

function Payment() {
  const [sort, setSort] = useState(0);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [action, setAction] = useState();
  const [filter, setFilter] = useState();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const getpayment = useSelector((state) => state?.fleet);
  const { get_payment, isLoadingPayment } = getpayment;

  //console.log({get_payment})
  let start =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let end =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let requisition = get_payment?.result;
  // requisition = requisition?.filter((row) => {
  //   if (!startDate || !endDate) {
  //     return true;
  //   }
  //   const rowDate = new Date(row.createdDate);
  //   return rowDate ===startDate && rowDate === endDate;
  // });

  // requisition = requisition?.filter((item) => item.status !== "Cancelled");

  const apiData = {
    pageSize,
    pageNumber,
    sort,
    startDate: start,
    endDate: end,
    search,
  };

  requisition = requisition?.filter((row) =>
    row.payeeName.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    if (status !== null) {
      apiData["status"] = status;
    }
    if (search !== null && search !== "" && search !== " ") {
      apiData["search"] = search;
    }
    dispatch(GetFuelPayment(apiData));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, pageNumber, pageSize, sort, search, startDate, endDate]);

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
        ?.filter((item) => item.status === "Initiated")
        .map((item) => item.id);
      setSelectedItems(pendingItemIds);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate("add")}>Fuel Payment</CTAButtons>
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
  ];

  const sortBy = [
    {
      name: "Oldest to Newest",
      filter: 0,
    },
    {
      name: "Newest to Oldest",
      filter: 1,
    },
    {
      name: "Ascending Order (A - Z)",
      filter: 2,
    },
    {
      name: "Descending Order (Z- A)",
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
      title={"Fuel Payment Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearch} />

        <ProDropFilter
          filter={status}
          setFilter={setStatus}
          name={"Status"}
          filterBy={filterBy}
        />
        <CalendarFilter2
          name="Select Date Range"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
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
                  ApproveOrDeclinePayment({
                    requisitionIds: selectedItems,
                    status: Number(action),
                  })
                ).then((res) => {
                  if (res?.payload?.successful === true) {
                    dispatch(GetFuelPayment(apiData));
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
                          (item) => item.status === "Initiated"
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
              <th>Asset ID</th>
              <th>Payee Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <RequestTable
              isLoading={isLoadingPayment}
              apiData={apiData}
              getpayment={requisition}
              HandleSelectedItems={HandleSelectedItems}
              selectedItems={selectedItems}
            />
            {isLoadingPayment
              ? "loading.."
              : get_payment?.result?.map((item) => (
                  <RequestTable
                    {...item}
                    key={item.id}
                    isLoading={isLoadingPayment}
                    apiData={apiData}
                  />
                ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_payment?.totalPages}
        present_page={get_payment?.currentPage}
        totalRows={get_payment?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default Payment;

function RequestTable({
  apiData,
  getpayment,
  HandleSelectedItems,
  selectedItems,
}) {
  const { openModal, closeModal } = useApprovals({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {getpayment?.map((item) => (
        <tr key={item.id}>
          <td>
            {item.status === "Initiated" && (
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => HandleSelectedItems(item.id, e.target.checked)}
                style={{ height: "20px", width: "20px" }}
              />
            )}
          </td>
          <td>{item.assetId}</td>
          <td>{item.payeeName}</td>
          <td>{FormatDateTime(item.fuelStartDate)}</td>
          <td>{FormatDateTime(item.fuelEndDate)}</td>
          <td>{FormatCurrency(item.amount)}</td>

          <td style={{ textAlign: "center" }}>
            <span
              style={{
                textAlign: "center",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                backgroundColor:
                  item.status === "Initiated"
                    ? "#FFF1CF"
                    : item.status === "Approved"
                    ? "#DCFFC9"
                    : item.status === "Cancelled"
                    ? "#FFF1e4"
                    : item.status === "Declined"
                    ? "#FBE6E7"
                    : "",
                color:
                  item.status === "Initiated"
                    ? "#815103"
                    : item.status === "Approved"
                    ? "#0F6308"
                    : item.status === "Cancelled"
                    ? "815123"
                    : item.status === "Declined"
                    ? "#8A002B"
                    : "",
              }}
            >
              {item.status}
            </span>
          </td>
          <td>
            {item.status === "Declined" ? (
              <TableActions hasChildren={true} url={`${item.id}/view`}>
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
            ) : item.status === "Approved" || item?.status === "Cancelled" ? (
              <TableActions
                hasChildren={true}
                url={`${item.id}/view`}
              ></TableActions>
            ) : (
              <TableActions hasChildren={true} url={`${item.id}/view`}>
                {[
                  {
                    name: "Edit Requisition",
                    action: () =>
                      navigate(`${item.id}/edit`, {
                        state: item,
                      }),
                  },

                  {
                    name: "Approve Payment",
                    action: () => {
                      openModal({
                        type: "",
                        details: {
                          button: {
                            name: "Yes, Approve",
                            color: "",
                          },
                          sendIsOptional: true,

                          title: "Approve Payment",
                          submitData: (data) => {
                            dispatch(
                              ApproveFuelPayment({
                                comment: data?.comments,
                                id: item.id,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetFuelPayment(apiData));
                            });
                          },
                        },
                      });
                    },
                  },
                  {
                    name: "Decline Payment",
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
                              DeclineFuelPayment({
                                comment: data?.comments,
                                id: item.id,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetFuelPayment(apiData));
                            });
                          },
                        },
                      });
                    },
                  },

                  {
                    name: "Cancel Payment",
                    action: () => {
                      openModal({
                        type: "",
                        details: {
                          button: {
                            name: "Yes, Cancel",
                            color: "",
                          },
                          sendIsOptional: true,
                          title: "Cancel Payment",
                          submitData: (data) => {
                            dispatch(
                              CancelFuelPayment({
                                comment: data?.comments,
                                id: item.id,
                              })
                            )?.then((res) => {
                              closeModal();
                              dispatch(GetFuelPayment(apiData));
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
