import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { GetMaintenance_Asset } from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";

function Monitoring() {
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { asset_Monitorings, asset_maintainance, isLoadingAssets } =
    useSelector((state) => state?.assets);

  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(
      GetMaintenance_Asset({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pageSize, currentPage, sort]);
  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate("add")}>
        Add New
      </CTAButtons>
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
      title={"Asset Monitoring Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter />
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
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Asset Name</th>
              <th>Component</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Date Last Updated</th>
              <th>Last Modified By</th>
              <th>Health Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {asset_maintainance?.result?.map((acq) => (
              <AcqTable acq={acq} isLoadingAssets={isLoadingAssets} />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={asset_maintainance?.totalPages}
        present_page={asset_maintainance?.currentPage}
        totalRows={asset_maintainance?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default Monitoring;

function AcqTable({
  isLoadingAssets,
  acq,
}) {

  if (isLoadingAssets === true) {
    return <p>Loading...</p>;
  }
  return (
    <tr>
      <td>{acq?.id}</td>
      <td>{acq?.assetName}</td>
      <td>{acq?.component}</td>
      <td>{acq?.createdBy}</td>
      <td>{FormatDateTime(acq?.createdDate, "l")}</td>
      <td>{FormatDateTime(acq?.dateLastModified, "l")}</td>
      <td>{acq?.lastModifyBy}</td>
      <td style={{ textAlign: "center" }}>
        <span
          style={{
            textAlign: "center",
            padding: "0.5rem",
            borderRadius: "1rem",
            fontSize: "0.875rem",
            backgroundColor:
              acq?.healthStatus === "Faulty"
                ? "#FFF1CF"
                : acq?.healthStatus === "Good"
                ? "#DCFFC9"
                : acq?.healthStatus === "Bad"
                ? "#FBE6E7"
                : "",
            color:
              acq?.healthStatus === "Faulty"
                ? "#815103"
                : acq?.healthStatus === "Good"
                ? "#0F6308"
                : acq?.healthStatuse === "Bad"
                ? "#8A002B"
                : "",
          }}
        >
          {" "}
          {acq?.healthStatus}
        </span>
      </td>
      <td>
        <TableActions url={`${acq?.id}/view`} />
      </td>
    </tr>
  );
}
