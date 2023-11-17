import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  CalendarFilter2,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetMyFuelPayment } from "../../../../../utils/redux/Fleet/FleetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { FilterButton } from "../../../Components/Search/Search";
import { format } from "date-fns";
const MyPayment = () => {
  const [status, setStatus] = useState(null);
  const [find, setFind] = useState(false);
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const { my_payment, isLoading } = useSelector((state) => state?.fleet);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  console.log(my_payment)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let start =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let end =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");
  let requisition = my_payment?.result;
  const apiData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    startDate: start,
    endDate: end,
    search: search,
  };
  useEffect(() => {
    if (status !== null) {
      apiData["status"] = status;
    }
    if (search !== null && search !== "" && search !== " ") {
      apiData["search"] = search;
    }

    dispatch(GetMyFuelPayment(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, pageNumber, pageSize, search, startDate, endDate]);

  requisition = requisition?.filter(
    (row) =>
      row.requestedBy.toLowerCase().includes(search.toLowerCase()) ||
      row.vehicleName.toLowerCase().includes(search.toLowerCase())
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
  

  return(
    <PageStyle
    title={"My Fuel Payment Management"}
    hasBack={false}
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
      <FilterButton onClick={() => setFind(!find)} name="" />

     
    </div>
    <div className={DashboardStyle.dashboard_table_holder}>
      <Table>
        <thead>
          <tr>
           
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
            isLoading={isLoading}
            apiData={apiData}
            getRequest={my_payment}
         
          />
          {my_payment?.result?.map?.((item) => (
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
      last_page={my_payment?.totalPages}
      present_page={my_payment?.currentPage}
      totalRows={my_payment?.totalRows}
      pageSize={pageSize}
      setPageSize={(page) => setPageSize(page)}
      click={(page) => setPageNumber(page)}
    />
  </PageStyle>
  )
};

export default MyPayment;

function RequestTable({ apiData, getpayment,HandleSelectedItems,selectedItems }) {
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
              {item.status === "Declined" || item.status === "Pending" ? (
                <TableActions hasChildren={true} url={`../${item?.id}/view`}>
                </TableActions>
              ) : 
                <TableActions>{''}</TableActions>
              }
            </td>
          </tr>
        ))}
      </>
    );
  }
