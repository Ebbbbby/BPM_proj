import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
  CalendarFilter,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import { FiChevronRight, FiX } from "react-icons/fi";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";
import PermissionCheck from "../../../../../utils/PermissionCheck";
import { useSearchFilter } from "../../../../../utils/functions/useDate";

function VendorManagement() {
  const {
    searchText,
    filter,
    pageSize,
    currentPage,
    setSearchText,
    setFilter,
    setPageSize,
    setCurrentPage,
    date,
    setDate,
    find,
    findSearch,
  } = useSearchFilter({
    initialFilter: 1,
  });

  const [openModal, setOpenModal] = useState(false);
  const { all_vendors, isLoadingVendors } = useSelector(
    (state) => state?.vendor
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetVendors({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        searchText: searchText,
        startDate: FormatDateTime(date?.from, "yy-MM-DD"),
        endDate: FormatDateTime(date?.to, "yy-MM-DD"),
        sort: 1,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, find]);

  const actionButton = (
    <>
      <PermissionCheck permission={DEFINED_PERMISSIONS.VendorCreate}>
        <CTAButtons onClick={() => setOpenModal(!openModal)}>
          Onboard Vendor
        </CTAButtons>
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

  return (
    <PageStyle
      title={"Vendor Management"}
      support={"Manage onboarding of vendor here."}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <form className={DashboardStyle.dashboard_filter}>
        <SearchFilter
          value={searchText}
          text={(searchText) => setSearchText(searchText)}
        />
        <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Status"}
          filterBy={filterBy}
        />
        <CalendarFilter
          date={(date) => setDate(date)}
          name="Select Date Range"
          startDate={date?.from}
          endDate={date?.to}
        />
        <FilterButton onClick={() => findSearch()} name="" />
      </form>
      <div className={DashboardStyle.dashboard_table_holder}>
        <AcqTable
          // action={action}
          data={all_vendors}
          isLoadingVendors={isLoadingVendors}
        />
      </div>
      <Pagination
        last_page={all_vendors?.totalPages}
        present_page={all_vendors?.currentPage}
        totalRows={all_vendors?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
      <AppModalTemplate
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        <div className={DashboardStyle.dash_board_home_nav}>
          <div className={DashboardStyle.dash_board_home_nav_header}>
            <h4>Onboard New Vendor</h4>
            <FiX
              style={{ cursor: "pointer" }}
              size={"1.5rem"}
              onClick={() => setOpenModal(!openModal)}
            />
          </div>
          <div className={DashboardStyle.dash_board_home_nav_body}>
            <p>Select an option</p>
            <div>
              <button
                onClick={() => navigate(URL.Create_Vendor)}
                className={DashboardStyle.auth_action_nav}
              >
                <div>
                  <h5>Self Onboarding</h5>
                  <p>Initiate Onboarding Requesting</p>
                </div>
                <FiChevronRight
                  size={"1.5rem"}
                  className={DashboardStyle.auth_action_icons}
                />
              </button>
              <button
                onClick={() => navigate(URL.Add_Vendor)}
                className={DashboardStyle.auth_action_nav}
              >
                <div>
                  <h5>Admin Assisted</h5>
                  <p>Onboard New Vendor from portal</p>
                </div>
                <FiChevronRight
                  size={"1.5rem"}
                  className={DashboardStyle.auth_action_icons}
                />
              </button>
            </div>
          </div>
        </div>
      </AppModalTemplate>
    </PageStyle>
  );
}

export default VendorManagement;

function AcqTable({ data, isLoadingVendors, action }) {
  const navigate = useNavigate();

  if (isLoadingVendors === true) {
    return <p>Loading...</p>;
  }

  const actions = ({ id, vendorData, re }) => [
    {
      name: "Performance Appraisal",
      action: () => navigate(`./${id}/appraise`, { state: vendorData }),
    },
    {
      name: "Edit Details",
      action: () => navigate(`./${id}/edit`, { state: vendorData }),
    },
    {
      name: "Approve Account",
      action: () =>
        action({
          state: "true",
          action: "approve",
          pushto: "o",
          identity: re,
        }),
    },
    {
      name: "Suspend Account",
      action: () =>
        action({
          state: "true",
          action: "suspend",
          pushto: "o",
          identity: re,
        }),
    },
    {
      name: "Decline Account",
      action: () =>
        action({
          state: "true",
          action: "decline",
          pushto: "o",
          identity: re,
        }),
    },
    {
      name: "Blacklist Account",
      action: () =>
        action({
          state: "true",
          action: "blacklist",
          pushto: "o",
          identity: re,
        }),
    },
  ];
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Business Name</th>
          <th>Business Nature</th>
          <th>Vendor Type</th>
          <th>Date Created</th>
          <th>Onboarding Status</th>
          <th>Vendor Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.result?.map?.((vendor, index) => (
          <tr key={vendor?.id}>
            <td>{index + 1}</td>
            <td>{vendor?.businessName || vendor?.companyName}</td>
            <td>{vendor?.businessNature}</td>
            <td>{vendor?.vendorType}</td>
            {/* <td>{vendor?.managingDepts}</td> */}
            <td>{FormatDateTime(vendor?.dateCreated, "ll")}</td>
            <td style={{ textAlign: "center" }}>
              <span
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.875rem",
                  backgroundColor:
                    vendor?.completeStatus === false
                      ? "#FFF1CF"
                      : vendor?.completeStatus === true
                      ? "#DCFFC9"
                      : vendor?.completeStatus === "Declined"
                      ? "#FBE6E7"
                      : "pink",
                  color:
                    vendor?.completeStatus === false
                      ? "#815103"
                      : vendor?.completeStatus === true
                      ? "#0F6308"
                      : vendor?.completeStatus === "Declined"
                      ? "#8A002B"
                      : "",
                }}
              >
                {" "}
                {vendor?.completeStatus === false
                  ? "Incomplete"
                  : vendor?.completeStatus === true
                  ? "Complete"
                  : vendor?.completeStatus === "Declined"
                  ? "#8A002B"
                  : ""}
              </span>
            </td>
            <td style={{ textAlign: "center" }}>
              <span
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.875rem",
                  backgroundColor:
                    vendor?.registrationState === "Initiated"
                      ? "#FFF1CF"
                      : vendor?.registrationState === "Approved"
                      ? "#DCFFC9"
                      : vendor?.registrationState === "Declined"
                      ? "#FBE6E7"
                      : "pink",
                  color:
                    vendor?.registrationState === "Initiated"
                      ? "#815103"
                      : vendor?.registrationState === "Approved"
                      ? "#0F6308"
                      : vendor?.registrationState === "Declined"
                      ? "#8A002B"
                      : "",
                }}
              >
                {" "}
                {vendor?.registrationState}
              </span>
            </td>
            <td>
              <TableActions
                actions={actions({
                  id: vendor?.id,
                  vendorData: vendor,
                  re: vendor?.requestId,
                })}
                url={`${vendor?.id}/${URL.View_Vendor}`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
