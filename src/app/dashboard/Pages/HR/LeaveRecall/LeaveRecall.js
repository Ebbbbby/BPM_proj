import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllDepartments,
  CreateLeaveRecall,
  GetSingleDepartment,
} from "../../../../../utils/redux/HR/HRSlice";
import { GetAllEmployees } from "../../../../../utils/redux/HR/HRSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";

const LeaveRecall = () => {
  const location = useLocation()?.state;
  const { get_dept } =
    useSelector((state) => state?.hr);

   console.log(location);
  // console.log(get_dept, 'department');
  //  console.log(location)
  const start = location?.startDate;
  const startSlice = start.split("T")[0];

  const end = location?.endDate;
  const endSlice = end.split("T")[0];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultData = {
    employeeId: location?.employeeId,
    requisitionId: location?.id,
    leaveTypeId:location?.leaveTypeId,
    startDate: FormatDateTime(location?.startDate),
    endDate: FormatDateTime(location?.endDate),
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });


  useEffect(() => {
    dispatch(GetAllDepartments({ pageSize: 10000, currentPage: 1 }));
    dispatch(GetAllEmployees({ pageSize: 10000, currentPage: 1 }));
    dispatch(GetSingleDepartment(location?.departmentId))
          // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.departmentId]);
  const {
    handleSubmit,
  
    reset,
    formState: { isValid },
  } = formMethods;

  const submit = (data, e) => {
    const dataValue = {
      ...data,
      requesterId: get_dept?.responseObject?.hodId,
      recallStartDate:data?.recallStartDate,
      recallEndDate:data?.recallEndDate
    };

     console.log(dataValue);
    // return

    const fileData = new FormData();
    const key = Object.keys(dataValue);
    key?.forEach((key, index) => {
      fileData.append(`${key}`, dataValue[key]);
    });

    dispatch(CreateLeaveRecall(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${dataValue?.requisitionId}/view`);
      }
    });
  };

  return (
    <PageLayout title={"Add New Leave Recall"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Leave Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Full Name"}
                  camelCase={"employeeName"}
                  placeholder={""}
                  value={location?.employeeName}
                />

                <FormInput
                  title={"Department HOD"}
                  camelCase={"requesterId"}
                  placeholder={"Select Dept HOD"}
                  value={get_dept?.responseObject?.hodName}
                  // array={all_departments?.responseObject?.pageItems?.map(
              
                />
              </div>
              <div>
                <FormInput
                  title={"Leave Type"}
                  camelCase={"leaveType"}
                  placeholder={""}
                  value={location?.leaveTypeName}
                />
              </div>

              <div>
                <FormInput
                  title={"Leave Start Date"}
                  camelCase={"startDate"}
                  placeholder={""}
                  value={startSlice}
                />
                <FormInput
                  title={"Leave End Date"}
                  camelCase={"endDate"}
                  placeholder={""}
                  value={endSlice}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Recall <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Recall Start Date"}
                  camelCase={"recallStartDate"}
                  placeholder={""}
                  type={"date"}
                />

                <FormInput
                  title={"Recall End Date"}
                  camelCase={"recallEndDate"}
                  placeholder={""}
                  type={"date"}
                />
              </div>
              <div>
                <FormTextArea
                  title={"Recall Reason"}
                  camelCase={"reason"}
                  placeholder={"enter recall reason"}
                  type="textbox"
                />
              </div>
            </div>
          </section>

          <div className={DashboardStyle.button_cage}>
            <SupportButtons width={"auto"}>No,Cancel</SupportButtons>
            <ActionButtons className={DashboardStyle?.button_cage_weight} disabled={!isValid}
>
              Submit
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
};

export default LeaveRecall;
