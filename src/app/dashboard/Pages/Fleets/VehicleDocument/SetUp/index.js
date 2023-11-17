import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../../Components/Layout/PageLayout";
import {
  ActionButtons,
  CTAButtons,
  SupportButtons,
} from "../../../../../global/components/Buttons/buttons";
import Table from "../../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
} from "../../../../Components/Search/Search";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../../Components/Misc/Actions";
import {
  CreateDocumentType,
  DeleteDocumentType,
  GetAllVehicleDocumentType,
  UpdateDocumentType,
} from "../../../../../../utils/redux/Fleet/FleetSlice";
import { GetSearchParams } from "../../../../../../utils/functions/ResourceFunctions";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
} from "../../../../Components/Forms/InputTemplate";
import { FiX } from "react-icons/fi";
import { AppModalTemplate } from "../../../../Components/Modals/Modals";
import { useApprovals } from "../../../Vendors/VendorApprovals/useApprovals";

function DocumentSetUp() {
  const [openModal, setOpenModal] = useState(false);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { all_document_type, isLoading } = useSelector((state) => state?.fleet);
  const [searchQuery, setSearchQuery] = useState("");
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let documents = all_document_type?.data;
  documents = documents?.filter((row) =>
    row.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(
      GetAllVehicleDocumentType({
        pageSize: pageSize,
        currentPage: currentPage,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, sort]);
  const actionButton = (
    <>
      <CTAButtons
        onClick={() => {
          navigate("?modal_type=setup");
          setOpenModal(!openModal);
        }}
      >
        Create New
      </CTAButtons>
    </>
  );

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
      title={"Fleet Document SetUp"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearchQuery} />
        <ProDropFilter
          filter={sort}
          setFilter={setSort}
          name={"Sort"}
          filterBy={sortBy}
        />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DocumentTitle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents?.map((acq, index) => (
              <AcqTable
                {...acq}
                data={documents}
                index={index}
                isLoading={isLoading}
                isOpen={openModal}
                setIsOpen={setOpenModal}
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
        {getURLData("modal_type") === "setup" && (
          <CreateSetUpActions
            isOpen={openModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
      </AppModalTemplate>
      <Pagination
        last_page={all_document_type?.metaData?.totalPages}
        present_page={all_document_type?.metaData?.page}
        totalRows={all_document_type?.metaData?.perPage}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
    </PageStyle>
  );
}

export default DocumentSetUp;

function AcqTable({ id, title, description, uuId, index, isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, closeModal } = useApprovals({});
  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>
          <TableActions hasChildren={true} /*url={`${id}/view`}*/>
            {[
              {
                name: "Edit Vehicle Document Type",
                action: () => {
                  setIsOpen(!isOpen);
                  navigate(
                    `?modal_type=setup&isEdit=true&title=${title}&des=${description}&id=${uuId}`
                  );
                },
              },
              {
                name: "Delete Vehicle Document Type",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Delete",
                        color: "red",
                      },
                      isDelete: true,
                      isDeleteHero: "",
                      isDeleteSupport:
                        "Are you sure you want to delete this document type? This action cannot be undone.",
                      title: "Delete Document Type",
                      submitData: (data) => {
                        dispatch(
                          DeleteDocumentType({
                            uuId: uuId,
                          })
                        )?.then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            navigate("./");
                          }
                        });
                      },
                    },
                  });
                },
              },
            ]}
          </TableActions>
        </td>
      </tr>
    </>
  );
}

export function CreateSetUpActions({ isOpen, setIsOpen, category, isLoading }) {
  const dispatch = useDispatch();

  const defaultData = {
    title: GetSearchParams("title"),
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
          UpdateDocumentType({
            ...data,
            typeId: GetSearchParams("id"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            window.location.reload();
          }
        })
      : dispatch(CreateDocumentType(data))?.then((res) => {
          if (res?.payload?.successful === true) {
            setIsOpen(!isOpen);
            dispatch(
              GetAllVehicleDocumentType({
                pageSize: 100000,
                currentPage: 1,
                sort: 0,
              })
            );
          }
        });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>
          {GetSearchParams("isEdit") === "true" ? "Edit" : "Create"} Document
          Type
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
                title={"Document Title"}
                camelCase={"title"}
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
