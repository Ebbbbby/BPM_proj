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
import { URL } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { GetAquisition_Asset } from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import PermissionCheck from "../../../../../utils/PermissionCheck";
import {DEFINED_PERMISSIONS} from "../../../../../utils/const";

function Acquisition() {
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  const { asset_acquisitions, isLoadingAssets } = useSelector(
    (state) => state?.assets
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetAquisition_Asset({
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
      <PermissionCheck permission={DEFINED_PERMISSIONS.AssetAcquisitionAdd}>
        <CTAButtons onClick={() => navigate(URL.Add_Acquitions)}>
          Add Acquisition
        </CTAButtons>
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
      title={"Asset Acquisition Management"}
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
              <th>ID</th>
              <th>Created By</th>
              <th>Vendor</th>
              <th>Asset Type</th>
              <th>Asset Description</th>
              <th>Date Added</th>
              <th>Date Last Updated</th>
              <th>Asset Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AcqTable
              data={asset_acquisitions}
              isLoadingAssets={isLoadingAssets}
            />
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

function AcqTable({ data, isLoadingAssets }) {
  if (isLoadingAssets === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {data?.result?.map((acq, index) => (
        <tr key={index}>
          <td>{acq?.id}</td>
          <td>{FormatDateTime(acq?.acquisitionDate, "ll")}</td>
          <td>{acq?.vendorName}</td>
          <td>{acq.assetType}</td>
          <td>{acq?.assetDescription}</td>
          <td>{FormatDateTime(acq?.acquisitionDate, "ll")}</td>
          <td>
            {FormatDateTime(acq?.dateLastUpdated, "ll")}, <br />{" "}
            {FormatDateTime(acq?.dateLastUpdated, "LT")}
          </td>
          <td style={{ textAlign: "center" }}>
            <span
              style={{
                textAlign: "center",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                backgroundColor:
                  acq?.state === "Initiated"
                    ? "#FFF1CF"
                    : acq?.state === "Good"
                    ? "#DCFFC9"
                    : acq?.state === "Bad"
                    ? "#FBE6E7"
                    : "",
                color:
                  acq?.state === "Initiated"
                    ? "#815103"
                    : acq?.state === "Good"
                    ? "#0F6308"
                    : acq?.state === "Bad"
                    ? "#8A002B"
                    : "",
              }}
            >
              {" "}
              {acq?.state}
            </span>
          </td>
          <td>
            <TableActions url={`${acq?.id}/${URL.View_Acquisition}`} />
          </td>
        </tr>
      ))}
    </>
  );
}
