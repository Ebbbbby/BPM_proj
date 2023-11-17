import React, { useEffect, useState } from "react";
import {
  ActionButtons,
  CTAButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { SearchFilter } from "../../../Components/Search/Search";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import Pagination from "../../../Components/Pagination/Pagination";
import {
  GetOvertimeType,
  DeleteOvertimeType,
  CreateOvertimeType,
  UpdateOvertimeType,
  GetEmployeeCadrePosition,
} from "../../../../../utils/redux/HR/HRSlice";
import PageStyle from "../../../Components/Layout/PageLayout";
import { useNavigate } from "react-router";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import {
  FormInput,
  FormSelect,
  FormTemplate,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import Table from "../../../Components/Table/Table";
import { GetSearchParams } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { TableActions } from "../../../Components/Misc/Actions";

function OvertimeSetup() {
  const [openModal, setOpenModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { get_overtime_type, isLoading, cadre_position } = useSelector(
    (state) => state?.hr
  );

  const [search, setSearchQuery] = useState("");
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let overTimeTypes = get_overtime_type?.data;

  overTimeTypes = overTimeTypes?.filter((row) =>
    row.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(
      GetOvertimeType({
        pageNumber: pageNumber,
        perPage: perPage,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, perPage]);

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

  return (
    <PageStyle
      title={"Overtime SetUp"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearchQuery} />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Overtime Name</th>
              <th>Maximum Hours</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {overTimeTypes?.map((acq, index) => (
              <AcqTable
                key={acq?.id}
                {...acq}
                data={overTimeTypes}
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
            cadrePosition={cadre_position}
            perPage={perPage}
            pageNumber={pageNumber}
          />
        )}
      </AppModalTemplate>
      <Pagination
        last_page={get_overtime_type?.metaData?.totalPages}
        present_page={get_overtime_type?.metaData?.page}
        totalRows={get_overtime_type?.metaData?.perPage}
        pageSize={perPage}
        setPageSize={(page) => setPerPage(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default OvertimeSetup;

function AcqTable({
  id,
  title,
  description,
  weight,
  maximumHours,
  monthlyApprovalDeadlineDay,
  uuId,
  index,
  isOpen,
  setIsOpen,
  cadreId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, closeModal } = useApprovals({});
  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{maximumHours} hours </td>
        <td>{weight}</td>
        <td>
          <TableActions hasChildren={true} /*url={`${id}/view`}*/>
            {[
              {
                name: "Edit Overtime Type",
                action: () => {
                  setIsOpen(!isOpen);
                  navigate(
                    `?modal_type=setup&isEdit=true&title=${title}&des=${description}&cadreId=${cadreId}weight=${weight}&hours=${maximumHours}&approval=${monthlyApprovalDeadlineDay}&id=${id}`
                  );
                },
              },
              {
                name: "Delete Overtime Type",
                action: () => {
                  openModal({
                    type: "suspend",
                    details: {
                      button: {
                        name: "Delete",
                        color: "red",
                      },
                      isDelete: true,
                      isDeleteHero: "",
                      isDeleteSupport:
                        "Are you sure you want to delete this overtime type? This action cannot be undone.",
                      title: "Delete Overtime Type",
                      submitData: (data) => {
                        dispatch(
                          DeleteOvertimeType({
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

export function CreateSetUpActions({
  isOpen,
  setIsOpen,
  isLoading,
  cadrePosition,
  pageNumber,
  pageSize,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetEmployeeCadrePosition({
        pageNumber: pageNumber,
        pageSize: 10000,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, pageNumber]);

  const defaultData = {
    title: GetSearchParams("title"),
    cadreId: GetSearchParams("cadre"),
    description: GetSearchParams("des"),
    weight: GetSearchParams("weight"),
    maximumHours: GetSearchParams("hours"),
    monthlyApprovalDeadlineDay: GetSearchParams("approval"),
  };

  const [maxHours, setMaxHours] = useState();
  const [weight, setWeight] = useState();
  const [deadline, setDeadline] = useState();

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    let payload = {
      ...data,
      cadreId: data?.cadreId * 1,
    };
    // console.log(payload, 'payload')
    // console.log(data, 'data')
    // return

    GetSearchParams("isEdit") === "true"
      ? dispatch(
          UpdateOvertimeType({
            ...data,
            typeId: GetSearchParams("id"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            window.location.reload();
          }
        })
      : dispatch(CreateOvertimeType(payload))?.then((res) => {
          if (res?.payload?.successful === true) {
            setIsOpen(!isOpen);
            dispatch(
              GetOvertimeType({
                perPage: 10000,
                pageNumber: 1,
              })
            );
          }
        });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>
          {GetSearchParams("isEdit") === "true" ? "Update" : "Create"} Overtime
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
                title={"Overtime Name"}
                camelCase={"title"}
                placeholder={"select"}
              />

              <FormSelect
                title={"Cardre Position"}
                camelCase={"cadreId"}
                placeholder={"select"}
                array={cadrePosition?.result?.map((position, index) => (
                  <option key={index} value={+position?.id}>
                    {position?.title}
                  </option>
                ))}
              />

              <FormTextArea
                title={"Description"}
                camelCase={"description"}
                rowsLines={3}
              />

              <div>
                <FormInput
                  title={"Weight"}
                  camelCase={"weight"}
                  placeholder={"select"}
                  value={weight}
                  type={"number"}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Seconds must include only numbers",
                    },

                    onChange: (e) => {
                      const value = e.target.value;
                      if (Number(value >= 0) && Number(value > 10)) {
                        return;
                        //  setDisabled(!disabled)
                      }
                      setWeight(value);
                    },
                  }}
                />
                <FormInput
                  title={"Maximum Hours spent"}
                  camelCase={"maximumHours"}
                  placeholder={"select"}
                  value={maxHours}
                  type={"number"}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Seconds must include only numbers",
                    },

                    onChange: (e) => {
                      const value = e.target.value;
                      if (Number(value >= 0) && Number(value > 24)) {
                        return;
                        //  setDisabled(!disabled)
                      }
                      setMaxHours(value);
                    },
                  }}
                />
              </div>

              <FormInput
                title={"Approval Deadline"}
                camelCase={"monthlyApprovalDeadlineDay"}
                placeholder={"select"}
                type={"number"}
                value={deadline}
                registerOptions={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Approval Deadline must include only numbers",
                  },

                  onChange: (e) => {
                    const value = e.target.value;
                    if (Number(value >= 0) && Number(value > 31)) {
                      return;
                      //  setDisabled(!disabled)
                    }
                    setDeadline(value);
                  },
                }}
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
