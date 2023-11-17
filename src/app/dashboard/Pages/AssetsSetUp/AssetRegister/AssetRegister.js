import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter, FilterButton } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import {
  GetAssetRegister,
  GetCategories,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";

function AssetRegister() {
  const [filter, setFilter] = useState(1);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  const { isLoadingAssets } = useSelector((state) => state?.assets);

  const { asset_register } = useSelector((state) => state?.assetSetUp);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetCategories({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        searchText: searchText,
        sort,
      })
    );
    dispatch(
      GetAssetRegister({
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
      <CTAButtons onClick={() => navigate("add")}>Create New</CTAButtons>
    </>
  );

  const filterBy = [
    {
      name: "All",
      filter: 0,
    },
    {
      name: "Initiated",
      filter: 1,
    },
    {
      name: "Approved",
      filter: 2,
    },

    {
      name: "Declined",
      filter: 3,
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
      title={"Asset Register Setup"}
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
              <th>Name</th>
              <th>Specification</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {asset_register?.result?.map((acq, index) => (
              <AcqTable
                {...acq}
                data={asset_register}
                index={index}
                isLoadingAssets={isLoadingAssets}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={asset_register?.totalPages}
        present_page={asset_register?.currentPage}
        totalRows={asset_register?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default AssetRegister;

function AcqTable({
  assetStatus,
  dateCreated,
  description,
  id,
  name,
  specification,
  index,
}) {
  return (
    <>
      <tr key={index}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{FormatDateTime(dateCreated, "ll")}</td>
        <td style={{ textAlign: "left" }}>
          <span
            style={{
              textAlign: "center",
              padding: "0.5rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              backgroundColor:
                assetStatus === "Initiated"
                  ? "#FFF1CF"
                  : assetStatus === "Approved"
                  ? "#DCFFC9"
                  : assetStatus === "Declined"
                  ? "#FBE6E7"
                  : "",
              color:
                assetStatus === "Initiated"
                  ? "#815103"
                  : assetStatus === "Approved"
                  ? "#0F6308"
                  : assetStatus === "Declined"
                  ? "#8A002B"
                  : "",
            }}
          >
            {" "}
            {assetStatus}
          </span>
        </td>
        <td>
          <TableActions url={`${id}/view`} />
        </td>
      </tr>
    </>
  );
}
