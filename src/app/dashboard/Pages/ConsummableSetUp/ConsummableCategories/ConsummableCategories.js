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
  FilterButton,
  ProDropFilter,
} from "../../../Components/Search/Search";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FormatDateTime,
  GetSearchParams,
  Refresh,
} from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  // CheckBox,
  FormInput,
  FormSelect,
  FormTemplate,
  FormTextArea,
  // RadioBox,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import {
  CreateConsummableCategories,
  CreateConsummableClass,
  CreateConsummableSubClass,
  GetCategories,
  GetConsummableClass,
  UpdateConsummableCategories,
  UpdateConsummableClass,
  UpdateConsummableSubClass,
} from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
import PermissionCheck from "../../../../../utils/PermissionCheck";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";
import { GenerateID } from "../../../../../utils/GenerateID";
import { clear } from "@testing-library/user-event/dist/clear";
import { useSearchFilter } from "../../../../../utils/functions/useDate";
function Categories() {
  const { category, isLoading } = useSelector((x) => x?.consummableSetUp);

  const [openModal, setOpenModal] = useState(false);
  const {
    searchText,
    filter,
    pageSize,
    currentPage,
    setSearchText,
    setFilter,
    find,
    findSearch,
  } = useSearchFilter({
    initialFilter: 1,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formMethods = useForm({
    defaultValues: "",
    mode: "all",
  });
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isValid },
  } = formMethods;

  useEffect(() => {
    dispatch(
      GetCategories({
        filter: filter,
        pageSize: 10000,
        currentPage: 1,
        searchText: searchText,
        sort: 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [find]);

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
  const actionButton = (
    <>
      <PermissionCheck permission={DEFINED_PERMISSIONS.ConsumableCategoryAdd}>
        <CTAButtons
          onClick={() => {
            navigate("?modal_type=categories");
            setOpenModal(!openModal);
          }}
        >
          Add New Setup
        </CTAButtons>
      </PermissionCheck>
    </>
  );

  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);
  return (
    <PageStyle
      title={"Consumable Category"}
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
          filter={filter}
          setFilter={setFilter}
          name={"Status"}
          filterBy={filterBy}
        />

        <FilterButton onClick={() => findSearch()} name="" />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <FormProvider {...formMethods}>
          <FormTemplate handleSubmit={handleSubmit((x) => console.log("x"))}>
            <Table>
              <thead>
                <tr>
                  {/* <th>
                    <CheckBox
                      camelCase={"all"}
                      value={true}
                      moreRegister={{
                        onChange: (e) => {
                          console.log(e.target.value);
                          handleSelectAll();
                          // if (watch("all") === false) {
                          //   handleSelectAll();
                          // } else handleSelectAll("reverse");
                        },
                      }}
                    />
                  </th> */}
                  <th>#</th>
                  <th>Category</th>
                  <th>Class</th>
                  <th>Sub Class</th>
                  {/* <th>Component</th> */}
                  <th>Date</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {category?.result?.map((acq, index) => (
                  <AcqTable
                    {...acq}
                    isLoading={isLoading}
                    isOpen={openModal}
                    setIsOpen={setOpenModal}
                    key={index * Math.random()}
                  />
                ))}
              </tbody>
            </Table>
          </FormTemplate>
        </FormProvider>
      </div>
      <AppModalTemplate
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        {getURLData("modal_type") === "class" && (
          <CreateClassActions
            category={category}
            isOpen={openModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
        {getURLData("modal_type") === "sub_class" && (
          <CreateSubClassActions
            category={category}
            isOpen={openModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
        {getURLData("modal_type") === "categories" && (
          <CreateCategoryActions
            category={category}
            isOpen={openModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
      </AppModalTemplate>
      {/* <Pagination
        last_page={asset_allocation?.totalPages}
        present_page={asset_allocation?.currentPage}
        totalRows={asset_allocation?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      /> */}
    </PageStyle>
  );
}

export default Categories;

function AcqTable({
  id,
  createdDate,
  status,
  categoryClass,
  assetComponent,
  categorySubClass,
  description,
  categoryName,
  isOpen,
  setIsOpen,
  isLoading,
  removeAll,
}) {
  const navigate = useNavigate();
  if (isLoading === true) {
    return <p>Loading...</p>;
  }
  return (
    <tr key={id * Math.random()}>
      {/* <td>
        <CheckBox
          camelCase={id}
          value={id}
          moreRegister={{
            onChange: (e) => {
              removeAll();
            },
          }}
        />
      </td> */}
      <td>{id}</td>
      <td>{categoryName}</td>
      <td>{categoryClass?.length}</td>
      <td>{categorySubClass?.length}</td>
      <td>{FormatDateTime(createdDate, "ll")}</td>
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
                : "pink",
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
          {status}
        </span>
      </td>

      <td>
        <PermissionCheck
          permission={DEFINED_PERMISSIONS?.ConsumableCategoryView}
        >
          <TableActions url={`${id}/view?name=${categoryName}`} />
        </PermissionCheck>
      </td>
    </tr>
  );
}

export function CreateClassActions({ isOpen, setIsOpen, category, isLoading }) {
  const appURL = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const getURLData = (e) => appURL.get(e);
  // const { isLoading } = useSelector((state) => state?.procurement);
  // console.log(dv);
  const defaultData = {
    categoryId: getURLData("category"),
    name: getURLData("class"),
    vat: getURLData("vat"),
    withHoldingTax: getURLData("withHoldingTax"),
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const submit = ({ categoryId, name, vat, withHoldingTax }) => {
    getURLData("isEdit") === "true"
      ? dispatch(
          UpdateConsummableClass({
            name,
            id: +getURLData("classId"),
            vat: +vat,
            withHoldingTax: +withHoldingTax,
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            Refresh(1000);
          }
        })
      : dispatch(
          CreateConsummableClass({
            consumableCategoryId: +categoryId,
            name,
            description: name,
            vat: +vat,
            withHoldingTax: +withHoldingTax,
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            setIsOpen(!isOpen);
            if (getURLData("from") === "view") {
              Refresh(1000);
            } else
              dispatch(
                GetCategories({
                  pageSize: 100000,
                  currentPage: 1,
                  sort: 0,
                  filter: 0,
                })
              );
          }
        });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>{getURLData("isEdit") === "true" ? "Edit" : "Create"} Class</h4>
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
                disabled={getURLData("isEdit") === "true" && "disabled"}
                title={"Categories"}
                camelCase={"categoryId"}
                placeholder={"select"}
                array={category?.result?.map?.((x, index) => (
                  <option key={index} value={+x?.id}>
                    {x?.categoryName}
                  </option>
                ))}
              />
              <FormInput title={"Class"} camelCase={"name"} />
              <FormInput type={"number"} title={"VAT"} camelCase={"vat"} />
              <FormInput
                type={"number"}
                title={"WithHolding Tax"}
                camelCase={"withHoldingTax"}
              />
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
                  width={"auto"}
                  isLoading={isLoading}
                  disabled={!isValid}
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

export function CreateSubClassActions({
  isOpen,
  setIsOpen,
  category,
  isLoading,
}) {
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);
  // console.log(dv);
  const defaultData = {
    categoryId: getURLData("category"),
    assetClassId: getURLData("class"),
    name: getURLData("subClass"),
  };
  const dispatch = useDispatch();
  const { assetSetUp, consummableSetUp } = useSelector((state) => state);

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  useEffect(() => {
    dispatch(
      GetConsummableClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
        CategoryId: getURLData("category"),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = ({ categoryId, name, assetClassId }) => {
    getURLData("isEdit") === "true"
      ? dispatch(
          UpdateConsummableSubClass({
            name: name,
            id: getURLData("subClassId"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            Refresh(1000);
          }
        })
      : dispatch(
          CreateConsummableSubClass({
            consumableCategoryId: +categoryId,
            name,
            consumableClassId: +assetClassId,
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            setIsOpen(!isOpen);
            if (getURLData("from") === "view") {
              Refresh(1000);
            } else
              dispatch(
                GetCategories({
                  pageSize: 100000,
                  currentPage: 1,
                  sort: 0,
                  filter: 0,
                  Name: "",
                })
              );
          }
        });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>{getURLData("isEdit") === "true" ? "Edit" : "Create"} Sub Class</h4>
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
                title={"Categories"}
                camelCase={"categoryId"}
                placeholder={"select"}
                disabled={getURLData("isEdit") === "true" && "disabled"}
                isLoading={consummableSetUp?.isLoadingCategories}
                array={category?.result?.map?.((x, index) => (
                  <option key={index} value={+x?.id}>
                    {x?.categoryName}
                  </option>
                ))}
                moreRegister={{
                  onChange: (e) => {
                    dispatch(
                      GetConsummableClass({
                        pageSize: 100000,
                        currentPage: 1,
                        sort: 0,
                        filter: 0,
                        CategoryId: e.target.value,
                      })
                    );
                    return null;
                  },
                }}
              />
              <FormSelect
                title={"Class"}
                camelCase={`assetClassId`}
                placeholder={"select"}
                disabled={getURLData("isEdit") === "true" && "disabled"}
                isLoading={consummableSetUp?.isLoadingClass}
                array={consummableSetUp?.consummable_class?.responseObject?.map?.(
                  (x, index) => (
                    <option key={index} value={+x?.id}>
                      {x?.name}
                    </option>
                  )
                )}
                moreRegister={{
                  onChange: (e) => {
                    const isFound =
                      assetSetUp?.asset_class?.responseObject?.find(
                        (x) => +e.target.value === +x?.id
                      );

                    return isFound;
                  },
                }}
              />
              <FormInput title={"Sub Class"} camelCase={"name"} />
              {/* <FormInput title={"Short Code"} camelCase={"shortCode"} /> */}
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
                  width={"auto"}
                  isLoading={isLoading}
                  disabled={!isValid}
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

export function CreateCategoryActions({
  isOpen,
  setIsOpen,
  category,
  isLoading,
}) {
  const dispatch = useDispatch();

  const defaultData = {
    name: GetSearchParams("name"),
    description: GetSearchParams("des"),
  };

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    GetSearchParams("isEdit") === "true"
      ? dispatch(
          UpdateConsummableCategories({
            ...data,
            id: +GetSearchParams("id"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            // Refresh(1000)
          }
        })
      : dispatch(CreateConsummableCategories(data))?.then((res) => {
          if (res?.payload?.successful === true) {
            setIsOpen(!isOpen);
            dispatch(
              GetCategories({
                pageSize: 100000,
                currentPage: 1,
                sort: 0,
                filter: 0,
              })
            );
          }
        });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>
          {GetSearchParams("isEdit") === "true" ? "Edit" : "Create"} Category
        </h4>
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
              <FormInput
                title={"Category"}
                camelCase={"name"}
                placeholder={"select"}
              />
              <FormTextArea title={"Description"} camelCase={"description"} />
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
