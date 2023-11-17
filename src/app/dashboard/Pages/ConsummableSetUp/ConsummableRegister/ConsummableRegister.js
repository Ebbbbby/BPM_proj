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
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { GetCategories } from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { GetConsummableRegister } from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
import {DEFINED_PERMISSIONS} from "../../../../../utils/const";
import PermissionCheck from "../../../../../utils/PermissionCheck";

function AssetRegister() {
  const [filter, setFilter] = useState(1);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  const { isLoadingAssets } = useSelector((state) => state?.assets);
  const { Consummable_register } = useSelector((x) => x?.consummableSetUp);

  // console.log({ Consummable_register });
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
      GetConsummableRegister({
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
      <PermissionCheck permission={DEFINED_PERMISSIONS.ConsumableAdd}>
        <CTAButtons onClick={() => navigate("add")}>Create New</CTAButtons>
      </PermissionCheck>
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
      title={"Consummable Register Setup"}
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
              <th>Item Name</th>
              <th>Item Specification</th>
              <th>Consumable subclass</th>
              <th>Threshold</th>
              <th>Created By</th>
              <th>Date Created</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Consummable_register?.result?.map((acq, index) => (
              <AcqTable
                {...acq}
                data={Consummable_register}
                index={index}
                isLoadingAssets={isLoadingAssets}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={Consummable_register?.totalPages}
        present_page={Consummable_register?.currentPage}
        totalRows={Consummable_register?.totalRows}
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

  consumableSubClass,
  createdBy,
  createdDate,
  itemName,
  status,
  threshold,
}) {
  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{itemName}</td>
        <td>{specification}</td>
        <td>{consumableSubClass}</td>
        <td>{threshold}</td>
        <td>{createdBy}</td>
        <td>{FormatDateTime(createdDate, "ll")}</td>
        <td style={{ textAlign: "left" }}>
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
          <PermissionCheck permission={DEFINED_PERMISSIONS.ConsumableView}>
            <TableActions url={`${id}/view`} />
          </PermissionCheck>
        </td>
      </tr>
    </>
  );
}
