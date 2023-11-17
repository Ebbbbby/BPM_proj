import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAuction_Asset,
} from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";

function Budget() {
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { asset_acquisitions, isLoadingAssets, asset_allocation } = useSelector(
    (state) => state?.assets
  );

  const dispatch = useDispatch();

  console.log({ asset_acquisitions });

  useEffect(() => {
    dispatch(
      GetAuction_Asset({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pageSize, currentPage, sort]);
  // const actionButton = (
  //   <>
  //     <CTAButtons onClick={() => navigate(URL.Add_Acquitions)}>
  //       Add Auction
  //     </CTAButtons>
  //   </>
  // );

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
      title={"Asset Auctioning Management"}
      hasBack={false}
      // action={actionButton}
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
              <th>Asset Name</th>
              <th>Bid Opening Date</th>
              <th>Bid Closing Date</th>
              <th>Opening value</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Date Last Updated</th>
              <th>Approval Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {asset_allocation?.result?.map((acq) => (
              <AcqTable
                {...acq}
                data={asset_acquisitions}
                isLoadingAssets={isLoadingAssets}
              />
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

export default Budget;

function AcqTable({
  isLoadingAssets,
  acq,
  assetName,
  bidClosingDate,
  bidOpeningDate,
  openingValue,
  createdBy,
  createdDate,
  status,
  id,
}) {

  if (isLoadingAssets === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <tr>
        <td>{assetName}</td>
        <td>{FormatDateTime(bidOpeningDate, "ll")}</td>
        <td>{FormatDateTime(bidClosingDate, "ll")}</td>
        <td>{openingValue}</td>
        <td>{createdBy}</td>
        <td>{FormatDateTime(createdDate, "l")}</td>
        <td>{FormatDateTime(acq?.dateLastUpdated, "ll")}</td>
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
