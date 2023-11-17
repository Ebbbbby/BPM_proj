import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import {
  ActionButtons,
  CTAButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
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
import { ApproveModals } from "../../../Components/Modals/ApproveDeclineModals";
import {
  ApproveProcQuotation,
  DeclineProQuotation,
  GetProcQuotations,
  GetProcRequisitions,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormInput,
  FormSelect,
  FormTemplate,
} from "../../../Components/Forms/InputTemplate";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { TableActions } from "../../../Components/Misc/Actions";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";
import PermissionCheck from "../../../../../utils/PermissionCheck";
import { useSearchFilter } from "../../../../../utils/functions/useDate";

function Quotation() {
  const {
    searchText,
    filter,
    pageSize,
    currentPage,
    setSearchText,
    setFilter,
    setPageSize,
    setCurrentPage,
    // date,
    // setDate,
    find,
    findSearch,
    sort,
    setSort,
  } = useSearchFilter({
    initialFilter: 0,
    initialSort: 1,
  });
  const [openModal, setOpenModal] = useState(false);
  const { comments, requestId } = useSelector((state) => state?.global);
  const { all_proc_quotations, isLoading } = useSelector(
    (state) => state?.procurement
  );
  const dispatch = useDispatch();
  const all_quotations = all_proc_quotations;

  const apiData = {
    filter: filter,
    pageSize: pageSize,
    currentPage: currentPage,
    sort,
    searchText,
  };

  useEffect(() => {
    dispatch(GetProcQuotations(apiData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, find]);

  const actionButton = (
    <PermissionCheck permission={DEFINED_PERMISSIONS.ProcurementRequisitionAdd}>
      <CTAButtons onClick={() => setOpenModal(!openModal)}>
        New Quotation
      </CTAButtons>
    </PermissionCheck>
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
      filter: 0,
    },
    {
      name: "Newest to Oldest",
      filter: 1,
    },
    {
      name: "Ascending Order (A - Z)",
      filter: 2,
    },
    {
      name: "Descending Order (Z- A)",
      filter: 3,
    },
  ];
  return (
    <PageStyle
      title={"Quotations"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter
          value={searchText}
          text={(searchText) => setSearchText(searchText)}
        />
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
        <FilterButton onClick={() => findSearch()} name="" />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <AcqTable data={all_quotations} isLoading={isLoading} />
      </div>
      <Pagination
        last_page={all_quotations?.totalPages}
        present_page={all_quotations?.currentPage}
        totalRows={all_quotations?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
      <ApproveModals
        declineAction={() =>
          dispatch(
            DeclineProQuotation({
              requestId: requestId,
              comment: comments,
            })
          ).then((res) => {
            if (res?.payload?.successful === true) {
              // dispatch(Getquotations(apiData));
            }
          })
        }
        approvalAction={() =>
          dispatch(
            ApproveProcQuotation({
              requestId: requestId,
              comment: comments,
            })
          ).then((res) => {
            if (res?.payload?.successful === true) {
              // dispatch(Getquotations(apiData));
            }
          })
        }
      />
      <AppModalTemplate
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        <QuotationAssign isOpen={openModal} setIsOpen={setOpenModal} />
      </AppModalTemplate>
    </PageStyle>
  );
}

export default Quotation;

function AcqTable({ data, isLoading }) {
  if (isLoading === true) {
    return <p>Loading...</p>;
  }

  if (data?.length === 0) {
    return <p>No Record</p>;
  }
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Requisition ID</th>
          <th>Vendor Name</th>
          <th>Specification</th>
          <th>Description</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Date Submitted</th>
          <th style={{ textAlign: "center" }}>State</th>
          <PermissionCheck permission={DEFINED_PERMISSIONS.QuotationView}>
            <th>Action</th>
          </PermissionCheck>
        </tr>
      </thead>
      <tbody>
        {data?.result?.map?.((quotation) => (
          <tr key={quotation?.procurementRequisitionId}>
            <td></td>
            <td>{quotation?.id}</td>
            <td>{quotation?.procurementRequisitionId}</td>
            <td>{quotation?.vendorName}</td>
            <td>{quotation?.description}</td>
            <td>{quotation?.description}</td>
            <td>{quotation?.quantity}</td>
            <td>{FormatCurrency(quotation?.unitPrice)}</td>
            <td>{FormatDateTime(quotation?.dateSubmitted, "ll")}</td>
            <td style={{ textAlign: "center" }}>
              <span
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.875rem",
                  backgroundColor:
                    quotation?.registrationState === "Initiated"
                      ? "#FFF1CF"
                      : quotation?.registrationState === "Approved" ||
                        quotation?.registrationState === "Delivered"
                      ? "#DCFFC9"
                      : quotation?.registrationState === "Declined"
                      ? "#FBE6E7"
                      : "",
                  color:
                    quotation?.registrationState === "Initiated"
                      ? "#815103"
                      : quotation?.registrationState === "Approved" ||
                        quotation?.registrationState === "Delivered"
                      ? "#0F6308"
                      : quotation?.registrationState === "Declined"
                      ? "#8A002B"
                      : "",
                }}
              >
                {quotation?.registrationState}
              </span>
            </td>
            <PermissionCheck permission={DEFINED_PERMISSIONS.QuotationView}>
              <td>
                {" "}
                <TableActions url={`${quotation?.id}/view`} />
              </td>
            </PermissionCheck>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function QuotationAssign({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [listVendors, setListVendors] = useState();
  const { isLoading, all_proc_requisitions } = useSelector(
    (state) => state?.procurement
  );
  // console.log(dv);
  const formMethods = useForm({
    // defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    // watch,
    formState: { isValid },
  } = formMethods;

  const submit = ({ pi_id, vendor_id }) => {
    navigate(`./${pi_id}/recommend/add?vendor=${vendor_id}&isAdmin=true`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetProcRequisitions({
        filter: 2,
        pageSize: 300000,
        currentPage: 1,
        sort: 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { fullName, category } = GetLocalStorage();
  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>Add Quotation</h4>
        <FiX
          style={{ cursor: "pointer" }}
          size={"1.5rem"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className={DashboardStyle.dash_board_home_nav_body}>
        {isLoading && <small>Loading...</small>}
        <div>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <FormSelect
                title={"Procurement Id"}
                camelCase={"pi_id"}
                placeholder={"Enter City"}
                array={
                  <>
                    {all_proc_requisitions?.result?.map((x) => (
                      <option value={x?.id}>{x?.id}</option>
                    ))}
                  </>
                }
                moreRegister={{
                  onChange: (e) => {
                    const isFound = all_proc_requisitions?.result.find(
                      (x) => +e.target.value === x?.id
                    );

                    return setListVendors(isFound);
                  },
                }}
              />
              {category === 1 && (
                <FormInput
                  title={"Vendor"}
                  camelCase={"vendorName"}
                  defaultValue={fullName}
                  disabled={true}
                  isOptional={true}
                />
              )}
              {category !== 1 && (
                <FormSelect
                  title={"Vendor"}
                  camelCase={"vendor_id"}
                  array={
                    <>
                      {listVendors?.vendorList?.map((x) => (
                        <option value={x?.id}>{x?.name}</option>
                      ))}
                    </>
                  }
                />
              )}
              <div
                style={{ marginTop: "1rem" }}
                className={DashboardStyle.button_cage}
              >
                <SupportButtons
                  width={"auto"}
                  onClick={() => setIsOpen(!isOpen)}
                  className={DashboardStyle?.button_cage_weight_without_border}
                >
                  No, Cancel
                </SupportButtons>
                <ActionButtons
                  disabled={!isValid}
                  className={DashboardStyle?.button_cage_weight}
                  bg="var(--primary-color)"
                >
                  Search
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
