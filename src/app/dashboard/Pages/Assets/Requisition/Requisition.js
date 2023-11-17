import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter, FilterButton } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetRequisition_Asset } from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import {DEFINED_PERMISSIONS} from "../../../../../utils/const";
import PermissionCheck from "../../../../../utils/PermissionCheck";

function Acquisition() {
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  const { asset_acquisitions, isLoadingAssets, asset_requisition } =
    useSelector((state) => state?.assets);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetRequisition_Asset({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        searchText: searchText,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pageSize, currentPage, sort]);
  const actionButton = (
    <>
      <PermissionCheck permission={DEFINED_PERMISSIONS.AssetRequisitionAdd}>
        <CTAButtons onClick={() => navigate("add")}>Add Requisition</CTAButtons>
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
      title={"Asset Requisition Management"}
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
              <th>ID</th>
              <th>Requisition Details</th>
              <th>Qty</th>
              <th>Requested For</th>
              <th>Initiated By</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {asset_requisition?.result?.map((req) => (
              <AcqTable {...req} isLoadingAssets={isLoadingAssets} />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={asset_acquisitions?.totalPages}
        present_page={asset_acquisitions?.currentPage}
        totalRows={asset_acquisitions?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default Acquisition;

function AcqTable({
  isLoadingAssets,
  id,
  details,
  requestedFor,
  createdDate,
  initiatedBy,
  status,
  quantity,
}) {
  if (isLoadingAssets === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{FormatDateTime(createdDate, "ll")}</td>
        <td>{details}</td>
        <td>{quantity}</td>
        <td>{requestedFor}</td>
        <td>{initiatedBy}</td>
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
