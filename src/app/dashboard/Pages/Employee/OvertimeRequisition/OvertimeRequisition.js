import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  ActionButtons,
  CTAButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormatDateTime,
  GetSearchParams,
} from "../../../../../utils/functions/ResourceFunctions";
import {
  FormInput,
  FormSelect,
  FormTemplate,
} from "../../../Components/Forms/InputTemplate";
import Pagination from "../../../Components/Pagination/Pagination";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { TableActions } from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { CalendarFilter2, FilterButton, ProDropFilter, SearchFilter } from "../../../Components/Search/Search";
import {
  GetOvertimeRequisition,
  UpdateOvertime,
  CreateOvertime,
  GetOvertimeType,
  CancelOvertime,
} from "../../../../../utils/redux/HR/HRSlice";
import { FiX } from "react-icons/fi";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { format } from "date-fns";

function OvertimeRequisition() {
  const [openModal, setOpenModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPerPage] = useState(10);
  const { get_overtime, isLoading, get_overtime_type } = useSelector(
    (state) => state?.hr
  );

  const [approvalStatus, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let overTime = get_overtime?.data;
  overTime = overTime?.filter((row) =>
    row.initiatorName.toLowerCase().includes(search.toLowerCase())
  );
  let dateFrom =
    startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
  let dateTo =
    endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");

  const apiData = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    search: search,
    approvalStatus: approvalStatus,
    startDate: dateFrom,
    endDate: dateTo,
  };

  //console.log(get_overtime_type)
  useEffect(() => {
    if (approvalStatus !== null) {
      apiData["approvalStatus"] = approvalStatus;
    }
    dispatch(GetOvertimeRequisition(apiData));
    dispatch(GetOvertimeType({ pageNumber: pageNumber, perPage: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  const handleFilterButton = () => {
    dispatch(GetOvertimeRequisition(apiData));
  };

  const filterBy = [
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
      filter: 7,
    },
    {
      name: "ApprovedByHR",
      filter: 20,
    },
    {
      name: "RejectedByHR",
      filter: 81,
    },
  ];
  const actionButton = (
    <>
      <CTAButtons
        onClick={() => {
          navigate("?modal_type=create");
          setOpenModal(!openModal);
        }}
      >
        Create New
      </CTAButtons>
    </>
  );

  return (
    <PageStyle
      title={"Overtime Requisition"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearch} />

        <ProDropFilter
          filter={approvalStatus}
          setFilter={setFilter}
          name={"Approval Status"}
          filterBy={filterBy}
        />

        <CalendarFilter2
          name="Select Date Range"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <FilterButton name="" onClick={() => handleFilterButton()} />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Overtime Type</th>
              <th>Assignment</th>
              <th>Overtime Date</th>
              <th>amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {overTime?.map((acq, index) => (
              //console.log(acq)

              <AcqTable
                key={acq?.id}
                {...acq}
                data={overTime}
                index={index}
                isLoading={isLoading}
                isOpen={openModal}
                setIsOpen={setOpenModal}
                pageSize={pageSize}
                pageNumber={pageNumber}
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
        {getURLData("modal_type") === "create" && (
          <CreateSetUpActions
            isOpen={openModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
            overtimeType={get_overtime_type}
            pageNumber={pageNumber}
            pageSize={pageSize}
          />
        )}
      </AppModalTemplate>
      <Pagination
        last_page={get_overtime?.metaData?.totalPages}
        present_page={get_overtime?.metaData?.page}
        totalRows={get_overtime?.metaData?.perPage}
        pageSize={pageSize}
        setPageSize={(page) => setPerPage(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
}

export default OvertimeRequisition;

function AcqTable({
  id,
  amount,
  assignment,
  initiatorId,
  initiatorName,
  uuId,
  overtimeTypeId,
  overtimeType,
  numberOfHours,
  approvalStatus,
  overtimeDate,
  isOpen,
  setIsOpen,
  index,

  pageNumber,
  pageSize
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, closeModal } = useApprovals({});
  return (
    <>
      <tr key={id}>
        <td>{index + 1}</td>
        <td>{initiatorName}</td>
        <td>{overtimeType}</td>
        <td>{assignment}</td>
        <td>{FormatDateTime(overtimeDate)}</td>
        <td>{FormatCurrency(amount)}</td>

        <td style={{ textAlign: "center" }}>
          <span
            style={{
              textAlign: "center",
              padding: "0.5rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              backgroundColor:
                approvalStatus === "Pending"
                  ? "#FFF1CF"
                  : approvalStatus === "Approved"
                  ? "#DCFFC9"
                  : approvalStatus === "Cancelled"
                  ? "#9E0038"
                  : "",
              color:
                approvalStatus === "Pending"
                  ? "#815103"
                  : approvalStatus === "Approved"
                  ? "#0F6308"
                  : approvalStatus === "Cancelled"
                  ? "#FCEBEC"
                  : "",
            }}
          >
            {" "}
            {approvalStatus}
          </span>
        </td>

        <td>
          {approvalStatus === "Pending" ? (
            <TableActions hasChildren={true} url={`${id}/view`}>
              {[
                {
                  name: "Edit Overtime Requisition",
                  action: () => {
                    setIsOpen(!isOpen);
                    navigate(
                      `?modal_type=create&isEdit=true&assignment=${assignment}&date=${overtimeDate}&initiator=${initiatorId*1}&id=${id}&overtimeTypeId=${overtimeTypeId*1}&overtimeType=${overtimeType}&hours=${numberOfHours}`
                    );
                  },
                },

                {
                  name: "Cancel Overtime Requisition",
                  action: () => {
                    openModal({
                      type: "suspend",
                      details: {
                        button: {
                          name: "Yes, Cancel",
                          color: "red",
                        },
                        commentIsOptional: true,
                        sendIsOptional: true,
                        title: "Cancel Overtime",
                        submitData: (data) => {
                          dispatch(
                            CancelOvertime({
                              comment: data?.comments,
                              requisitionId: id,
                            })
                          )?.then((res) => {
                            closeModal();
                            dispatch(
                              GetOvertimeRequisition({
                                pageSize: pageSize,
                                pageNumber: pageNumber,
                              })
                            );
                          });
                        },
                      },
                    });
                    //  setIsOpen(!isOpen);
                  },
                },
              ]}
            </TableActions>
          ) : (
            <TableActions hasChildren={true} url={`${id}/view`}></TableActions>
          )}
        </td>
      </tr>
    </>
  );
}

export function CreateSetUpActions({
  isOpen,
  setIsOpen,
  isLoading,
  overtimeType,
  pageSize,
  pageNumber,
}) {
  const dispatch = useDispatch();

  const defaultData = {
    overTimeTypeId: GetSearchParams("id"),
    numberOfHours: GetSearchParams("hours"),
    overtimeDate: GetSearchParams("date"),
    assignment: GetSearchParams("assignment"),
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
    // console.log(data)
    // return
    GetSearchParams("isEdit") === "true"
      ? dispatch(
          UpdateOvertime({
            ...data,
            requisitionId: GetSearchParams("id"),
            requestorId: GetSearchParams("initiator"),
          })
        )?.then((res) => {
          console.log(res)
          if (res?.payload?.successful === true) {
            console.log(res.payload)
           window.location.reload();
          }
        })
      : dispatch(CreateOvertime(data))?.then((res) => {
          if (res?.payload?.successful === true) {
            setIsOpen(!isOpen);
            dispatch(
              GetOvertimeRequisition({
                pageSize: pageSize,
                pageNumber: pageNumber,
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
          Requisition
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
              <FormSelect
                title={"Overtime"}
                camelCase={"overTimeTypeId"}
                placeholder={"select overtime"}
                array={overtimeType?.data?.map((types, index) => (
                  //   console.log(types)
                  <option key={index} value={+types?.id}>
                    {types?.title}
                  </option>
                ))}
              />
              <div>
                <FormInput
                  title={"Assignment"}
                  camelCase={"assignment"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"Hours"}
                  camelCase={"numberOfHours"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"Overtime Date"}
                  camelCase={"overtimeDate"}
                  placeholder={"select date"}
                  type={"date"}
                />
              </div>

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
