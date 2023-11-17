import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { GetAllocation_Asset } from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  FormSelect,
  FormTemplate,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { GetConsummableRegister } from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";
import {
  ApproveConsummableAllocation,
  DeclineConsummableAllocation,
  GetConsummableAllocation,
} from "../../../../../utils/redux/Consumables/ConsumablesSlice";
import {
  SendMail,
  useApprovals,
} from "../../Vendors/VendorApprovals/useApprovals";
import { useNavigate } from "react-router";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";
import PermissionCheck from "../../../../../utils/PermissionCheck";

function Allocation() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { isLoadingAssets, asset_allocation } = useSelector(
    (state) => state?.assets
  );

  const { consummableSetUp, consumable } = useSelector((s) => s);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetConsummableAllocation({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        searchText: searchText,
        sort: sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, find]);
  const actionButton = (
    <>
      <PermissionCheck permission={DEFINED_PERMISSIONS.ConsumableAllocationAdd}>
        <CTAButtons onClick={() => navigate("add")}>Allocation</CTAButtons>
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
      title={"Consumable Allocation Management"}
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
              <th>Consumables</th>
              <th>Quantity</th>
              <th>Quantity Left</th>
              <th>Amount</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Date Purchased</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {consumable?.allocations?.result?.map((acq) => (
              <AcqTable {...acq} isLoadingAssets={isLoadingAssets} />
            ))}
          </tbody>
        </Table>
      </div>
      <AppModalTemplate
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        <CreateCategoryActions
          category={consummableSetUp}
          isOpen={openModal}
          setIsOpen={setOpenModal}
          // isLoading={isLoading}
        />
      </AppModalTemplate>
      <Pagination
        last_page={consumable?.allocations?.totalPages}
        present_page={consumable?.allocations?.currentPage}
        totalRows={consumable?.allocations?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default Allocation;

function AcqTable({
  isApprove,
  setIsApprove,
  isDecline,
  setIsDecline,
  data,
  isLoadingAssets,
  acq,
  id,
  requisitionDetails,
  quantity,
  assignee,
  purpose,
  initiatedBy,
  lastModified,
  status,
  consumable,
  quantityLeft,
  amount,
  allocationSource,
  allocationDestination,
  assignedStatus,
  purchasedDate,
}) {
  const dispatch = useDispatch();
  const { openModal, closeModal } = useApprovals({});
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{consumable}</td>
        <td>{quantity}</td>
        <td>{quantityLeft}</td>
        <td>{FormatCurrency(amount)}</td>
        <td>{allocationSource}</td>
        <td>{allocationDestination}</td>

        <td>{FormatDateTime(purchasedDate, "ll")}</td>
        <td>{assignedStatus}</td>
        <td>
          <PermissionCheck
            permission={DEFINED_PERMISSIONS.ConsumableAllocationApprove}
          >
            <TableActions>
              {[
                {
                  name: "Approve",
                  action: () => {
                    openModal({
                      type: "",
                      details: {
                        button: {
                          name: "Yes, Approve",
                          color: "",
                        },
                        title: "Approve Allocation",
                        submitData: (data) => {
                          dispatch(
                            ApproveConsummableAllocation({
                              comment: data?.comments,
                              consumableAllocationId: id,
                              emailTrigger: true,
                            })
                          )?.then((res) => {
                            closeModal();
                            // dispatch(GetProcAllocation());
                          });
                        },
                      },
                    });
                  },
                  permissions: DEFINED_PERMISSIONS.ConsumableAllocationApprove,
                },
                {
                  name: "Decline",
                  action: () => {
                    openModal({
                      type: "",
                      details: {
                        button: {
                          name: "Yes, Decline",
                          color: "",
                        },
                        title: "Decline Allocation",
                        submitData: (data) => {
                          dispatch(
                            DeclineConsummableAllocation({
                              comment: data?.comments,
                              consumableAllocationId: id,
                              emailTrigger: true,
                            })
                          )?.then((res) => {
                            closeModal();
                            // dispatch(GetProcAllocation());
                          });
                        },
                      },
                    });
                  },
                  permissions: DEFINED_PERMISSIONS.ConsumableAllocationApprove,
                },
              ]}
            </TableActions>
          </PermissionCheck>
        </td>
      </tr>
    </>
  );
}

export function CreateCategoryActions({
  isOpen,
  setIsOpen,
  category,
  isLoading,
}) {
  console.log(category);

  const formMethods = useForm({
    // defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = formMethods;
  const submit = (data) => {
    console.log({ data });
    // dispatch(CreateConsummableAllocation())
  };

  const watchData = watch()?.consumableList;

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>Allocate Consumables to User by group name</h4>
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
                title={"Group"}
                camelCase={"name"}
                placeholder={"select"}
                array={
                  <>
                    <option value={"1"}>Junior Staff</option>
                    <option value={"2"}>Senior Staff</option>
                    <option value={"3"}>Management Staff</option>
                  </>
                }
              />
              <MultiSelect
                data={category?.Consummable_register?.result?.map((x) => {
                  return {
                    name: x?.itemName,
                    checkBoxName: x?.itemName,
                    id: x?.id,
                    ...x,
                  };
                })}
                dataValues={watchData}
                name={"consumableList"}
                title={"Consumables"}
              />
              <SendMail name="Send notification to group" />
              {/* <FormInput title={"Quantity"} camelCase={"quantity"} m//> */}
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
                  isLoading={isLoading}
                  disabled={!isValid}
                  width={"auto"}
                  className={DashboardStyle?.button_cage_weight}
                  bg="var(--primary-color)"
                >
                  Submit
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
