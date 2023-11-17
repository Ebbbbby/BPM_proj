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
import { GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { ApproveModals } from "../../../Components/Modals/ApproveDeclineModals";
import {
  ApproveProcRequsition,
  ApproveProcRequsitionBulk,
  DeclineProcRequsition,
  DeclineProcRequsitionBulk,
  GetProcRequisitions,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import { TableActions } from "../../../Components/Misc/Actions";
import {
  CheckBox,
  FormTemplate,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchFilter } from "../../../../../utils/functions/useDate";
import PermissionCheck from "../../../../../utils/PermissionCheck";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";

function ProcRequisition() {
  const formMethods = useForm({
    mode: "all",
  });

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
    // setDate,
    find,
    findSearch,
    sort,
    setSort,
  } = useSearchFilter({
    initialFilter: 1,
    initialSort: 0,
  });
  const { openModal, closeModal } = useApprovals({});
  const { isLoadingVendors } = useSelector((state) => state?.vendor);
  const { all_proc_requisitions } = useSelector((state) => state?.procurement);
  const { comments, requestId } = useSelector((state) => state?.global);
  const [actions, setActions] = useState("");
  const [bulkValues, setBukValues] = useState({});
  const modelledBulk = Object.entries(bulkValues)
    ?.filter(([key, value]) => value === true)
    .filter(([key, value]) => key !== "all")
    ?.map(([key, value]) => +key);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiData = {
    filter: filter,
    pageSize: pageSize,
    currentPage: currentPage,
    searchText: searchText,
    stateDate: date?.from,
    endDate: date?.to,
    sort,
  };

  useEffect(() => {
    dispatch(GetProcRequisitions(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [find, pageSize, currentPage]);


  const actionButton = (
    <>
      <PermissionCheck
        permission={DEFINED_PERMISSIONS.ProcurementRequisitionAdd}
      >
        <CTAButtons onClick={() => navigate("add")}>Add Requisition</CTAButtons>
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

  const approveBulk = () =>
    openModal({
      type: "",
      details: {
        button: {
          name: "Yes, Approve",
          color: "",
        },
        commentIsOptional: false,
        title: "Approve Requisitions",
        submitData: (data) => {
          dispatch(
            ApproveProcRequsitionBulk({
              comment: data?.comments,
              procurementRequsitionId: modelledBulk,
              emailTrigger: data?.send,
            })
          )?.then((res) => {
            closeModal();
            setActions({});
            formMethods?.reset();
            dispatch(GetProcRequisitions(apiData));
          });
        },
      },
    });

  const declineBulk = () =>
    openModal({
      type: "",
      details: {
        button: {
          name: "Yes, Decline",
          color: "red",
        },
        commentIsOptional: false,
        title: "Decline Requisitions",
        submitData: (data) => {
          dispatch(
            DeclineProcRequsitionBulk({
              comment: data?.comments,
              procurementRequsitionId: modelledBulk,
              emailTrigger: data?.send,
            })
          )?.then((res) => {
            closeModal();
            setActions({});
            formMethods?.reset();
            dispatch(GetProcRequisitions(apiData));
          });
        },
      },
    });

  const filterAction = [
    {
      name: "Approve All",
      filter: 1,
    },
    {
      name: "Decline All",
      filter: 2,
    },
  ];

  const sortBy = [
    {
      name: "Asset",
      filter: 0,
    },
    {
      name: "Consummable",
      filter: 1,
    },
  ];

  return (
    <PageStyle
      title={"Requisition Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <PermissionCheck permission={DEFINED_PERMISSIONS.ProcurementRequisitionApproval}>
          <ProDropFilter
            filter={actions}
            setFilter={setActions}
            name={"Actions"}
            filterBy={filterAction}
            onChange={(e) => {
              const value = e?.target.value;
              if (value === "1") {
                approveBulk();
              }

              if (value === "2") {
                declineBulk();
              }
            }}
          />
        </PermissionCheck>
        <SearchFilter
          value={searchText}
          text={(searchText) => setSearchText(searchText)}
        />
        {/* <div className={DashboardStyle.dashboard_filters}> */}
        <ProDropFilter
          filter={sort}
          setFilter={setSort}
          name={"Requisition Type"}
          filterBy={sortBy}
        />
        <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Status"}
          filterBy={filterBy}
        />
        {/* <CalendarFilter
          date={(date) => setDate(date)}
          name="Select Date Range"
        /> */}
        <FilterButton onClick={() => findSearch()} name="" />
        {/* </div> */}
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <AcqTable
          data={all_proc_requisitions}
          isLoadingVendors={isLoadingVendors}
          bulkValues={(e) => setBukValues(e)}
          formMethods={formMethods}
        />
      </div>
      <Pagination
        last_page={all_proc_requisitions?.totalPages}
        present_page={all_proc_requisitions?.currentPage}
        totalRows={all_proc_requisitions?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
      <ApproveModals
        declineAction={() =>
          dispatch(
            DeclineProcRequsition({
              requestId: requestId,
              comment: comments,
            })
          ).then((res) => {
            if (res?.payload?.successful === true) {
              dispatch(GetVendors(apiData));
            }
          })
        }
        approvalAction={() =>
          dispatch(
            ApproveProcRequsition({
              requestId: requestId,
              comment: comments,
            })
          ).then((res) => {
            if (res?.payload?.successful === true) {
              dispatch(GetVendors(apiData));
            }
          })
        }
      />
    </PageStyle>
  );
}

export default ProcRequisition;

function AcqTable({ data, isLoadingVendors, bulkValues, formMethods }) {
  const { watch, handleSubmit, setValue, reset } = formMethods;

  const handleSelectAll = (type) => {
    const rowIds = data?.result?.map((x) => x.id);

    if (watch("all") === true) {
      rowIds?.map((x) => setValue(`${x}`, true));
    } else rowIds?.map((x) => reset());

    bulkValues(watch());
  };

  const handleSelectOne = () => {
    setValue("all", false);
    bulkValues(watch());
  };

  if (isLoadingVendors === true) {
    return <p>Loading...</p>;
  }

  return (
    <FormProvider {...formMethods}>
      <FormTemplate handleSubmit={handleSubmit(() => console.log("p"))}>
        <Table>
          <thead>
            <tr>
              <PermissionCheck permission={DEFINED_PERMISSIONS.ProcurementRequisitionApproval}>
                <th>
                  <CheckBox
                    camelCase={"all"}
                    value={true}
                    moreRegister={{
                      onChange: (e) => {
                        handleSelectAll();
                      },
                    }}
                  />
                </th>
              </PermissionCheck>
              <th>Id</th>
              <th>Type</th>
              <th>Name</th>
              <th>Beneficiaries</th>
              <th>Specification</th>
              <th>Quantity</th>
              <th>Vendor Notified</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.map?.((vendor) => (
              <tr key={vendor?.id}>
                <td>
                  <CheckBox
                    camelCase={vendor.id}
                    value={vendor.id}
                    moreRegister={{
                      onChange: (e) => {
                        console.log(e.target.value);
                        handleSelectOne();
                      },
                    }}
                  />
                </td>
                <td>{vendor?.id}</td>
                <td>{vendor?.procurementType}</td>
                <td>{vendor?.assetName}</td>
                <td>{vendor?.beneficiaries}</td>
                <td>{vendor?.specification}</td>
                <td>{vendor?.quantity}</td>
                <td>{vendor?.vendors}</td>
                <td>{FormatDateTime(vendor?.dateCreated, "ll")}</td>
                <td style={{ textAlign: "center" }}>
                  <span
                    style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      borderRadius: "1rem",
                      fontSize: "0.875rem",
                      backgroundColor:
                        vendor?.registrationStatus === "Initiated"
                          ? "#FFF1CF"
                          : vendor?.registrationStatus === "Approved"
                          ? "#DCFFC9"
                          : vendor?.registrationStatus === "Declined" ||
                            "Canceled"
                          ? "#FBE6E7"
                          : "",
                      color:
                        vendor?.registrationStatus === "Initiated"
                          ? "#815103"
                          : vendor?.registrationStatus === "Approved"
                          ? "#0F6308"
                          : vendor?.registrationStatus === "Declined" ||
                            "Canceled"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {" "}
                    {vendor?.registrationStatus}
                  </span>
                </td>
                <td>
                  <TableActions url={`${vendor?.id}/view`} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </FormTemplate>
    </FormProvider>
  );
}
