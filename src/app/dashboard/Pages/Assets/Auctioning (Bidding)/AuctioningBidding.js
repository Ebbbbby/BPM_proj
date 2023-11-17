import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { GetAuction_Asset_Bidding } from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
// import {DEFINED_PERMISSIONS} from "../../../../../utils/const";
// import PermissionCheck from "../../../../../utils/PermissionCheck";

function Auctioning() {
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  const { isLoadingAssets, asset_allocation } = useSelector(
    (state) => state?.assets
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetAuction_Asset_Bidding({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        searchText: searchText,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [find, pageSize, currentPage]);
  // const actionButton = (
  //   <>
  //     <PermissionCheck permission={DEFINED_PERMISSIONS.AssetBidAdd}>
  //       <CTAButtons onClick={() => navigate(URL.Add_Acquitions)}>
  //         Add Auction
  //       </CTAButtons>
  //     </PermissionCheck>
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
      title={"Asset Auctioning (Bidding)"}
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
              <th>#</th>
              <th>Asset Name</th>
              <th>No. of Bidder</th>
              <th>Bid Amount</th>
              <th>Date Created</th>
              <th>Date Updated</th>
              <th>Created At</th>
              <th>Bidding Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {asset_allocation?.result?.map((acq, index) => (
              <AcqTable
                {...acq}
                data={asset_allocation}
                isLoadingAssets={isLoadingAssets}
                index={index}
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

export default Auctioning;

function AcqTable({
  isLoadingAssets,
  assetName,
  createdBy,
  dateCreated,
  id,
  index,
  bidAmount,
  numberOfBidders,
  dateUpdated,
  biddingStatus,
}) {
  if (isLoadingAssets === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{assetName}</td>
        <td>{numberOfBidders}</td>
        <td>{FormatCurrency(bidAmount)}</td>
        <td>{FormatDateTime(dateCreated, "ll")}</td>
        <td>{FormatDateTime(dateUpdated, "ll")}</td>
        <td>{createdBy}</td>
        <td style={{ textAlign: "center" }}>
          <span
            style={{
              textAlign: "center",
              padding: "0.5rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              backgroundColor:
                biddingStatus === "Ongoing"
                  ? "#FFF1CF"
                  : biddingStatus === "Done"
                  ? "#DCFFC9"
                  : biddingStatus === "Declined"
                  ? "#FBE6E7"
                  : "",
              color:
                biddingStatus === "Ongoing"
                  ? "#815103"
                  : biddingStatus === "Done"
                  ? "#0F6308"
                  : biddingStatus === "Declined"
                  ? "#8A002B"
                  : "",
            }}
          >
            {" "}
            {biddingStatus}
          </span>
        </td>
        <td>
          <TableActions url={`${id}/view`} />
        </td>
      </tr>
    </>
  );
}
