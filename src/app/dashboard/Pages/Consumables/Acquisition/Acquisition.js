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
import { GetConsummableAcquisition } from "../../../../../utils/redux/Consumables/ConsumablesSlice";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import PermissionCheck from "../../../../../utils/PermissionCheck";
import {DEFINED_PERMISSIONS} from "../../../../../utils/const";

function Acquisition() {
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  const { acquisition } = useSelector((state) => state?.consumable);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetConsummableAcquisition({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        searchText: searchText,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, find]);
  const actionButton = (
    <>
      <PermissionCheck permission={DEFINED_PERMISSIONS.ConsumableAdd}>
        <CTAButtons onClick={() => navigate("add")}>Add Acquisition</CTAButtons>
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
      title={"Consumable Acquisition Management"}
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
              <th>Item Name</th>
              {/* <th>Item Specification</th> */}
              <th>Amount</th>
              <th>Threshold</th>
              <th>Created By</th>
              <th>Date Created</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {acquisition?.result?.map((acq, index) => (
              <AcqTable
                acq={acq}
                key={index}
                // isLoadingAssets={isLoadingAssets}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={acquisition?.totalPages}
        present_page={acquisition?.currentPage}
        totalRows={acquisition?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default Acquisition;

function AcqTable({ isLoadingAssets, acq, index }) {
  if (isLoadingAssets === true) {
    return <p>Loading...</p>;
  }
  return (
    <tr key={index}>
      <td>{acq?.id}</td>
      <td>{acq?.consumable}</td>
      {/* <td>{FormatDateTime(acq?.acquisitionDate, "ll")}</td> */}
      <td>{FormatCurrency(acq?.amount)}</td>
      <td>{acq.threshold}</td>
      {/* <td>{acq?.assetDescription}</td> */}
      <td>{FormatDateTime(acq?.purchasedDate, "ll")}</td>
      <td>
        {FormatDateTime(acq?.lastModified, "ll")}, <br />{" "}
        {FormatDateTime(acq?.lastModified, "LT")}
      </td>
      <td style={{ textAlign: "center" }}>
        <span
          style={{
            textAlign: "center",
            padding: "0.5rem",
            borderRadius: "1rem",
            fontSize: "0.875rem",
            backgroundColor:
              acq?.registrationStatee === "Initiated"
                ? "#FFF1CF"
                : acq?.registrationState === "Approved"
                ? "#DCFFC9"
                : acq?.registrationState === "Declined"
                ? "#FBE6E7"
                : "",
            color:
              acq?.registrationState === "Initiated"
                ? "#815103"
                : acq?.registrationState === "Approved"
                ? "#0F6308"
                : acq?.registrationState === "Declined"
                ? "#8A002B"
                : "",
          }}
        >
          {" "}
          {acq?.registrationState}
        </span>
      </td>
      <td>
        <PermissionCheck permission={DEFINED_PERMISSIONS.ConsumableView}>
          <TableActions url={`${acq?.id}/view`}>
          {/* {[
            {
              name: "Edit Acquisition",
              action: () => {
                // setIsOpen(!isOpen);
                // navigate(`?modal_type=class&category=${id}`);
              },
            },
            {
              name: "Delete Acquisition",
              action: () => {
                // setIsOpen(!isOpen);
                // navigate(`?modal_type=sub_class&category=${id}`);
              },
            },
            {
              name: "Approve Acquisition",
              action: () => {
                // setIsOpen(!isOpen);
                // navigate(`?modal_type=sub_class&category=${id}`);
              },
            },
            {
              name: "Decline Acquisition",
              action: () => {
                // setIsOpen(!isOpen);
                // navigate(`?modal_type=sub_class&category=${id}`);
              },
            },
          ]} */}
        </TableActions>
        </PermissionCheck>
      </td>
    </tr>
  );
}
