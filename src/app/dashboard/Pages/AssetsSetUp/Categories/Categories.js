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
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FormatDateTime,
  GetSearchParams,
  Refresh,
} from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import {
  CreateAssetCategories,
  CreateAssetClass,
  CreateAssetComponent,
  CreateAssetSubClass,
  GetAssetClass,
  GetAssetSubClass,
  GetCategories,
  UpdateAssetCategories,
  UpdateAssetClass,
  UpdateAssetComponent,
  UpdateAssetSubClass,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  FormInput,
  FormSelect,
  FormTemplate,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useSearchFilter } from "../../../../../utils/functions/useDate";
import PermissionCheck from "../../../../../utils/PermissionCheck";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";
function Categories() {
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
  const { isLoading, category } = useSelector((state) => state?.assetSetUp);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetCategories({
        filter: filter,
        pageSize: 10000,
        currentPage: 1,
        sort: 0,
        Name: searchText,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [find, pageSize, currentPage]);
  const actionButton = () => {
    return (
      <PermissionCheck permission={DEFINED_PERMISSIONS.AssetCategoryAdd}>
        <CTAButtons
          onClick={() => {
            navigate("?modal_type=categories");
            setOpenModal(!openModal);
          }}
        >
          Add New Setup
        </CTAButtons>
      </PermissionCheck>
    );
  };

  // const sortBy = [
  //   {
  //     name: "Oldest to Newest",
  //     filter: "",
  //   },
  //   {
  //     name: "Newest to Oldest",
  //     filter: 0,
  //   },
  //   {
  //     name: "Ascending Order (A - Z)",
  //     filter: 1,
  //   },
  //   {
  //     name: "Descending Order (Z- A)",
  //     filter: 2,
  //   },
  // ];

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

  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);
  return (
    <PageStyle
      title={"Asset Category"}
      hasBack={false}
      action={actionButton()}
      isMain={true}
      permission={DEFINED_PERMISSIONS.AssetCategoryView}
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
        {/* <CalendarFilter
          date={(date) => setDate(date)}
          name="Select Date Range"
          startDate={date?.from}
          endDate={date?.to}
        /> */}
        <FilterButton onClick={() => findSearch()} name="" />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Class</th>
              <th>Sub Class</th>
              <th>Component</th>
              <th>Date</th>
              <th style={{ textAlign: "center" }}>RegistrationStatus</th>
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

        {getURLData("modal_type") === "component" && (
          <CreateComponentActions
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
  dateCreated,
  registrationStatus,
  assetClass,
  assetComponent,
  assetSubClass,
  description,
  name,
  isOpen,
  setIsOpen,
  isLoading,
}) {
  const navigate = useNavigate();
  // if (isLoading === true) {
  //   return <p>Loading...</p>;
  // }
  return (
    <tr key={id * Math.random()}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{assetClass}</td>
      <td>{assetSubClass}</td>
      <td>{assetComponent}</td>
      <td>{FormatDateTime(dateCreated, "ll")}</td>
      <td style={{ textAlign: "center" }}>
        <span
          style={{
            textAlign: "center",
            padding: "0.5rem",
            borderRadius: "1rem",
            fontSize: "0.875rem",
            backgroundColor:
              registrationStatus === "Initiated"
                ? "#FFF1CF"
                : registrationStatus === "Approved"
                ? "#DCFFC9"
                : registrationStatus === "Declined"
                ? "#FBE6E7"
                : "pink",
            color:
              registrationStatus === "Initiated"
                ? "#815103"
                : registrationStatus === "Approved"
                ? "#0F6308"
                : registrationStatus === "Declined"
                ? "#8A002B"
                : "",
          }}
        >
          {registrationStatus}
        </span>
      </td>
      <td>
        <TableActions url={`${id}/view?name=${name}`} />
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
    // shortCode: getURLData("shortCode"),
    usefulLife: getURLData("usefulLife"),
    residual: getURLData("residual"),
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

  const submit = ({
    categoryId,
    name,
    // shortCode,
    usefulLife,
    residual,
    vat,
    withHoldingTax,
  }) => {
    getURLData("isEdit") === "true"
      ? dispatch(
          UpdateAssetClass({
            categoryId,
            name,
            // shortCode,
            usefulLife,
            residual: +residual,
            vat: +vat,
            withHoldingTax: +withHoldingTax,
            description: name,
            assetClassId: getURLData("classId"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            Refresh(1000);
          }
        })
      : dispatch(
          CreateAssetClass({
            categoryId,
            name,
            // shortCode,
            usefulLife,
            residual: +residual,
            vat: +vat,
            withHoldingTax: +withHoldingTax,
            description: name,
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
                  filter: 5,
                })
              );
          }
        });
  };

  // useEffect(() => {
  //   setValue
  // }, [])

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
                title={"Category"}
                camelCase={"categoryId"}
                placeholder={"select"}
                array={category?.result?.map?.((x, index) => (
                  <option key={index} value={+x?.id}>
                    {x?.name}
                  </option>
                ))}
              />
              <FormInput title={"Class"} camelCase={"name"} />
              <FormInput
                type="number"
                title={"Useful Life"}
                camelCase={"usefulLife"}
              />
              <FormInput
                type="number"
                title={"Residual"}
                camelCase={"residual"}
              />
              <FormInput type="number" title={"VAT"} camelCase={"vat"} />
              <FormInput
                type="number"
                title={"WithHolding Tax"}
                camelCase={"withHoldingTax"}
              />
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
  const { assetSetUp } = useSelector((state) => state);
  // console.log(dv);
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
      GetAssetClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 1,
        filter: 1,
        CategoryId: getURLData("category"),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = ({ categoryId, name, assetClassId }) => {
    getURLData("isEdit") === "true"
      ? dispatch(
          UpdateAssetSubClass({
            categoryId,
            name,
            description: name,
            assetClassId,
            assetSubClassId: getURLData("subClassId"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            Refresh(1000);
          }
        })
      : dispatch(
          CreateAssetSubClass({
            categoryId,
            name,
            description: name,
            assetClassId,
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
                  sort: 5,
                  filter: 0,
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
                array={category?.result?.map?.((x, index) => (
                  <option key={index} value={+x?.id}>
                    {x?.name}
                  </option>
                ))}
                moreRegister={{
                  onChange: (e) => {
                    dispatch(
                      GetAssetClass({
                        pageSize: 100000,
                        currentPage: 1,
                        sort: 1,
                        filter: 1,
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
                array={assetSetUp?.asset_class?.responseObject?.map?.(
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

                    dispatch(
                      GetAssetSubClass({
                        pageSize: 100000,
                        currentPage: 1,
                        sort: 1,
                        filter: 1,
                        CategoryId: isFound?.categoryId,
                        AssetClassId: e.target.value,
                      })
                    );

                    return isFound;
                  },
                  // return console.log({ data });
                }}
              />
              <FormInput title={"Sub Class"} camelCase={"name"} />
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

  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);
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
          UpdateAssetCategories({
            ...data,
            categoryId: +GetSearchParams("id"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            Refresh(1000);
          }
        })
      : dispatch(CreateAssetCategories(data))?.then((res) => {
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
                  filter: 5,
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
                title={"Categories"}
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

export function CreateComponentActions({
  isOpen,
  setIsOpen,
  category,
  isLoading,
}) {
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);
  // const [subClassess, setSubClassess] = useState({});
  // console.log(dv);

  const defaultData = {
    categoryId: getURLData("category"),
    assetClassId: getURLData("class"),
    assetSubClassId: getURLData("subClass"),
    name: getURLData("name"),
  };
  const dispatch = useDispatch();
  const { assetSetUp } = useSelector((state) => state);

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = formMethods;

  useEffect(() => {
    dispatch(
      GetAssetClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 1,
        filter: 1,
        CategoryId: getURLData("category"),
      })
    );

    dispatch(
      GetAssetSubClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 1,
        filter: 1,
        CategoryId: getURLData("category"),
        AssetClassId: getURLData("class"),
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const submit = ({ categoryId, name, assetClassId, assetSubClassId }) => {
    getURLData("isEdit") === "true"
      ? dispatch(
          UpdateAssetComponent({
            categoryId: +categoryId,
            name,
            description: name,
            assetClassId: +assetClassId,
            assetSubClassId: +assetSubClassId,
            assetComponentId: +getURLData("name_id"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            Refresh(1000);
          }
        })
      : dispatch(
          CreateAssetComponent({
            categoryId: +categoryId,
            name,
            description: name,
            assetClassId: +assetClassId,
            assetSubClassId: +assetSubClassId,
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
                  filter: 5,
                  Name: "",
                })
              );
          }
        });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>{getURLData("isEdit") === "true" ? "Edit" : "Create"} Component</h4>
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
                array={category?.result?.map?.((x, index) => (
                  <option key={index} value={+x?.id}>
                    {x?.name}
                  </option>
                ))}
                moreRegister={{
                  onChange: (e) => {
                    dispatch(
                      GetAssetClass({
                        pageSize: 100000,
                        currentPage: 1,
                        sort: 1,
                        filter: 1,
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
                array={assetSetUp?.asset_class?.responseObject?.map?.(
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

                    dispatch(
                      GetAssetSubClass({
                        pageSize: 100000,
                        currentPage: 1,
                        sort: 1,
                        filter: 1,
                        CategoryId: watch("categoryId"),
                        AssetClassId: e.target.value,
                      })
                    );

                    return isFound;
                  },
                }}
              />

              <FormSelect
                title={"Sub Class"}
                camelCase={`assetSubClassId`}
                placeholder={"select"}
                array={assetSetUp?.asset_sub_class?.responseObject.map?.(
                  (x, index) => (
                    <option key={index} value={+x?.id}>
                      {x?.name}
                    </option>
                  )
                )}
              />
              <FormInput title={"Component"} camelCase={"name"} />
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
                  isLoading={assetSetUp?.loading}
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
