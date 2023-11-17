import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetAllocation_Asset } from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import {DEFINED_PERMISSIONS} from "../../../../../utils/const";
import PermissionCheck from "../../../../../utils/PermissionCheck";

function Allocation() {
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  const { isLoadingAssets, asset_allocation } = useSelector(
    (state) => state?.assets
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetAllocation_Asset({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        searchText: searchText,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [find, pageSize, currentPage]);
  const actionButton = (
    <>
      <PermissionCheck permission={DEFINED_PERMISSIONS.AssetAllocationAdd}>
        <CTAButtons onClick={() => navigate("add")}>Allocation</CTAButtons>
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
      title={"Asset Allocation Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={(searchText) => setSearchText(searchText)} />
        {/* <div className={DashboardStyle.dashboard_filters}> */}
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
        {/* </div> */}
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Requisition Details</th>
              <th>Qty</th>
              <th>Assignee</th>
              <th>Purpose</th>
              <th>Initiated By</th>
              <th>Last Modified</th>
              <th>Approval Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {asset_allocation?.result?.map((acq) => (
              <AcqTable {...acq} isLoadingAssets={isLoadingAssets} />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={asset_allocation?.totalPages}
        present_page={asset_allocation?.currentPage}
        totalRows={asset_allocation?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default Allocation;

function AcqTable({
  isApprove,
  setIsApprove,
  isDecline,
  setIsDecline,
  data,
  isLoadingAssets,
  acq,
  id,
  requisitionDetails,
  quantity,
  assignee,
  purpose,
  initiatedBy,
  lastModified,
  status,
}) {
  if (isLoadingAssets === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{requisitionDetails}</td>
        <td>{quantity}</td>
        <td>{assignee}</td>
        <td>{purpose}</td>
        <td>{initiatedBy}</td>
        <td>{FormatDateTime(lastModified, "ll")}</td>
        <td style={{ textAlign: "center" }}>
          <span
            style={{
              textAlign: "center",
              padding: "0.5rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              backgroundColor:
                status === "Initiated"
                  ? "#FFF1CF"
                  : status === "Approved"
                  ? "#DCFFC9"
                  : status === "Declined"
                  ? "#FBE6E7"
                  : "",
              color:
                status === "Initiated"
                  ? "#815103"
                  : status === "Approved"
                  ? "#0F6308"
                  : status === "Declined"
                  ? "#8A002B"
                  : "",
            }}
          >
            {" "}
            {status}
          </span>
        </td>
        <td>
          <TableActions url={`${id}/view`} />
        </td>
      </tr>
    </>
  );
}
