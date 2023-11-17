import React, { useEffect, useState } from "react";
import { GetSearchParams } from "chukwuka-node";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { GetConsummableRequisition } from "../../../../../utils/redux/Consumables/ConsumablesSlice";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import { useNavigate } from "react-router";
import PermissionCheck from "../../../../../utils/PermissionCheck";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function Auctioning() {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(0);
  const [find, setFind] = useState(false);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { requisition, isLoading } = useSelector((x) => x?.consumable);

  const dispatch = useDispatch();

  console.log(GetSearchParams("p"));

  useEffect(() => {
    dispatch(
      GetConsummableRequisition({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        searchText: searchText,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [find, pageSize, currentPage]);

  const navigate = useNavigate();
  const actionButton = (
    <>
      <PermissionCheck
        permission={DEFINED_PERMISSIONS.ConsumableRequisitionAdd}
      >
        <CTAButtons onClick={() => navigate("add")}>Requisition</CTAButtons>
      </PermissionCheck>
    </>
  );

  const filterBy = [
    {
      name: "All",
      filter: "",
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
      filter: 2,
    },
  ];

  const sortBy = [
    {
      name: "Oldest to Newest",
      filter: "",
    },
    {
      name: "Newest to Oldest",
      filter: 0,
    },
    {
      name: "Ascending Order (A - Z)",
      filter: 1,
    },
    {
      name: "Descending Order (Z- A)",
      filter: 2,
    },
  ];
  return (
    <PageStyle
      title={"Consumables Requisition"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={(searchText) => setSearchText(searchText)} />
        <ProDropFilter
          filter={sort}
          setFilter={setSort}
          name={"Sort"}
          filterBy={sortBy}
        />
        <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Filter"}
          filterBy={filterBy}
        />
        <FilterButton onClick={() => setFind(!find)} name="" />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Requestor Name</th>
              <th>Requested For</th>
              <th>Consumable</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Requested Date</th>
              <th>Approval Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requisition?.result?.map((acq) => (
              <AcqTable {...acq} isLoading={isLoading} />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={requisition?.totalPages}
        present_page={requisition?.currentPage}
        totalRows={requisition?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default Auctioning;

function AcqTable({
  id,
  requestor,
  requestedFor,
  consumable,
  quantity,
  requestedDate,
  description,
  isLoading,
  approvalStatus,
}) {
  if (isLoading === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{requestor}</td>
        <td>{requestedFor}</td>
        <td>{consumable}</td>
        <td>{quantity}</td>
        <td>{description}</td>
        <td>{FormatDateTime(requestedDate, "ll")}</td>
        <td style={{ textAlign: "center" }}>
          <span
            style={{
              textAlign: "center",
              padding: "0.5rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              backgroundColor:
                approvalStatus === "Initiated"
                  ? "#FFF1CF"
                  : approvalStatus === "Approved"
                  ? "#DCFFC9"
                  : approvalStatus === "Declined"
                  ? "#FBE6E7"
                  : "",
              color:
                approvalStatus === "Initiated"
                  ? "#815103"
                  : approvalStatus === "Approved"
                  ? "#0F6308"
                  : approvalStatus === "Declined"
                  ? "#8A002B"
                  : "",
            }}
          >
            {" "}
            {approvalStatus}
          </span>
        </td>
        <td>
          <PermissionCheck
            permission={DEFINED_PERMISSIONS.ConsumableRequisitionView}
          >
            <TableActions url={`${id}/view`} />
          </PermissionCheck>
        </td>
      </tr>
    </>
  );
}
