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
import { URL } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMyFuelRequest,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { FilterButton } from "../../../Components/Search/Search";
import './style.css'
import { format } from "date-fns";

const MyRequisitions = () => {
    const [requisitionStatus, setRequisitionStatus] = useState(null);
    const [find, setFind] = useState(false);
    const [filter, setFilter] = useState();
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const {my_request,isLoading} = useSelector((state) => state?.fleet);
    console.log(my_request)
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const navigate = useNavigate();
  const dispatch = useDispatch();
  let start =
  startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
let end =
  endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");
  let requisition = my_request?.result;
  const apiData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    startDate: start,
    endDate: end,
    search: search,
  };
  useEffect(() => {
    if (requisitionStatus !== null) {
      apiData["requisitionStatus"] = requisitionStatus;
    }
    if (search !== null && search !== "" && search !== " ") {
      apiData["search"] = search;
    }

    dispatch(GetMyFuelRequest(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requisitionStatus, pageNumber, pageSize, search, startDate, endDate]);

  requisition = requisition?.filter(
    (row) =>
      row.payeeName.toLowerCase().includes(search.toLowerCase())
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
  

  return (
    <PageStyle
    title={"My Fuel Requisition Management"}
    hasBack={false}
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

     
    </div>
    <div className={DashboardStyle.dashboard_table_holder}>
      <Table>
        <thead>
          <tr>
           
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
            getRequest={my_request}
         
          />
          {my_request?.result?.map?.((item) => (
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
      last_page={my_request?.totalPages}
      present_page={my_request?.currentPage}
      totalRows={my_request?.totalRows}
      pageSize={pageSize}
      setPageSize={(page) => setPageSize(page)}
      click={(page) => setPageNumber(page)}
    />
  </PageStyle>
  )
}

export default MyRequisitions

function RequestTable({
    apiData,
    getRequest,
   
  }) {
    const { openModal, closeModal } = useApprovals({});
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    return (
      <>
        {getRequest?.result?.map((item) => (
          <tr key={item.id}>
           
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
              {item.requisitionStatus === "Declined" || item.requisitionStatus === "Initiated" ? (
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
  
