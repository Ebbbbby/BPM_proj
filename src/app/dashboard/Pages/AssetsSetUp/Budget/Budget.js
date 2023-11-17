import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import Table from "../../../Components/Table/Table";
import { SearchFilter, ProDropFilter } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import {
  ActionButtons,
  CTAButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import {
  FormTemplate,
  PerfectFileUpload,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  GetAssetBudget,
  UploadAssetBudget,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";

function Budget() {
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { asset_budget } = useSelector((x) => x?.assetSetUp);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetAssetBudget({
        filter: filter,
        pageSize: pageSize,
        currentPage: currentPage,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pageSize, currentPage, sort]);
  const actionButton = (
    <>
      <CTAButtons onClick={() => setOpenModal(!openModal)}>
        New Budget
      </CTAButtons>
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
      title={"Budget Imports"}
      hasBack={false}
      action={actionButton}
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
              <th>Item Name</th>
              <th>Procurement Type</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {asset_budget?.result?.map((acq) => (
              <AcqTable {...acq} />
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        last_page={asset_budget?.totalPages}
        present_page={asset_budget?.currentPage}
        totalRows={asset_budget?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
      <AppModalTemplate
        width={"400px"}
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        <QuotationAssign isOpen={openModal} setIsOpen={setOpenModal} />
      </AppModalTemplate>
    </PageStyle>
  );
}

export default Budget;

function AcqTable({
  isLoadingAssets,
  createdDate,
  id,
  itemName,
  requistionType,
  description,
  quantity,
  amount,
}) {
  if (isLoadingAssets === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{itemName}</td>
        <td>{requistionType}</td>
        <td>{description}</td>
        <td>{quantity}</td>
        <td>{FormatCurrency(amount)}</td>
        <td>{FormatDateTime(createdDate, "ll")}</td>
        {/* <td>
          <TableActions url={`${id}/view`} />
        </td> */}
      </tr>
    </>
  );
}

function QuotationAssign({ isOpen, setIsOpen }) {
  const [uploadFile, setUploadFile] = useState();
  const { isLoading } = useSelector((state) => state?.assetSetUp);
  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const fileData = new FormData();
  const dispatch = useDispatch();

  const submit = () => {
    fileData?.append("UploadTemplate", uploadFile);
    dispatch(UploadAssetBudget(fileData))?.then((res) => {
      setIsOpen(!isOpen);
      dispatch(
        GetAssetBudget({
          filter: 0,
          pageSize: 10,
          currentPage: 1,
          sort: 0,
        })
      );
    });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header_pro}>
        <h4>Import Budget Data</h4>
        <p>Only items in the budget can be procured.</p>
      </div>
      <div className={DashboardStyle.dash_board_home_nav_body}>
        <div>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <PerfectFileUpload
                setFile={setUploadFile}
                file={uploadFile}
                title={"Budget Data"}
                isOptional={false}
                camcelCase={"stuff"}
                handleChange={(cac) => {
                  setUploadFile(cac);
                }}
                fileType={["XLSX"]}
              />
              <br />
              <a
                style={{
                  color: "var(--primary-color)",
                  textDecoration: "unset",
                  fontSize: "12px",
                  textAlign: "center",
                  display: "block",
                }}
                href={`/budget.xlsx`}
                download
              >
                Click to Download Budget Template
              </a>
              <br />
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
                  disabled={!isValid || !uploadFile}
                  className={DashboardStyle?.button_cage_weight}
                  bg="var(--primary-color)"
                >
                  Upload
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
