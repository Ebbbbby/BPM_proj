import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
  FormTextArea,
  ReactSelects,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";

import {
  GetAllEmployees,
  GetQuerySetup,
} from "../../../../../utils/redux/HR/HRSlice";

import { InitiationType } from "../../../../../utils/const/QueryConst";
import {
  GetSingleContainer,
  CreateQuery,
  UpdateQuery,
} from "../../../../../utils/redux/Employee/EmployeeSlice";

const AddQueryManagement = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [offenceDate, setOffenceDate] = useState("");
  const { get_querysetup, all_employees } = useSelector((state) => state?.hr);
  const [employee, setEmployee] = useState(null);

  const location = useLocation()?.state;
  const dispatch = useDispatch();
  console.log(get_querysetup);
  function getTodayDate() {
    const today = new Date();
    console.log(today, "today");
    return today.toISOString().substr(0, 10);
  }

  useEffect(() => {
    setOffenceDate(getTodayDate());
    setSelectedDate(getTodayDate());
    dispatch(GetSingleContainer());
    dispatch(GetAllEmployees({ pageNumber: 1, pageSize: 10 }));

    dispatch(GetQuerySetup({ pageNumber: 1, pageSize: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectChange = (option) => {
    setEmployee(option); // Update the state with the selected option
  };

  const defaultData = {};

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const options = all_employees?.result?.map((employee) => ({
    value: +employee.id,
    label: `${employee.surname} ${employee.firstName} ${employee.otherName}`,
  }));
  //console.log(options)
  console.log(employee);
  const {
    handleSubmit,

    reset,
    formState: { isValid },
  } = formMethods;

  const navigate = useNavigate();
  const submit = (data) => {
    const payload = {
      initiationType: InitiationType.InitiatedByHOU,
      title: data?.title,
      employeeId: employee?.value,
      queryTypeId: data?.queryTypeId * 1,
      queryDate:
        data?.queryDate === "" || data?.queryDate === undefined
          ? getTodayDate()
          : "",
      offenceCommittedDate:
        data?.offenceCommittedDate === "" ||
        data?.offenceCommittedDate === undefined
          ? getTodayDate()
          : "",
      queryContent: data?.queryContent,
      notifyHOD: Boolean(data?.notifyHOD),
    };

    //   console.log(payload, "Payload")
      console.log(location, 'location')
    // return

    location
      ? dispatch(UpdateQuery(payload))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${location?.id}/view`);
          }
        })
      : dispatch(CreateQuery(payload))?.then((res) => {
          console.log(res);
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../`);
          }
        });
  };

  return (
    <PageLayout title={`${location ? "Update" : "Add"}   Query`} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Query <br /> Information
            </h4>

            <div className={DashboardStyle.inputs_group}>
              <div>
                <ReactSelects
                  title={"Employee"}
                  camelCase={"employeeId"}
                  placeholder={"select"}
                  options={options}
                  selectedOptions={employee}
                  onChange={handleSelectChange}
                />
                <FormSelect
                  title={"Query Type"}
                  camelCase={"queryTypeId"}
                  placeholder={"select"}
                  array={get_querysetup?.result?.map((requestor, index) => (
                    <option key={index} value={+requestor?.Id}>
                      {requestor?.title}
                    </option>
                  ))}
                />
              </div>
              <div>
                <FormInput
                  title={"Subject"}
                  camelCase={"title"}
                  placeholder={"enter"}

                  //    value={get_fleet?.responseObject?.fleetName}
                />

                <FormInput
                  title={"Query Date"}
                  camelCase={"queryDate"}
                  placeholder={"select date"}
                  type={"date"}
                  isOptional={true}
                  value={selectedDate}
                  registerOptions={{
                    onChange: (e) => {
                      if (e.target.value !== null) {
                        setSelectedDate(e.target.value);
                      }
                    },
                  }}
                />
              </div>
              <div>
                <FormTextArea
                  title={"Body"}
                  camelCase={"queryContent"}
                  placeholder={"Enter "}
                />

                <FormInput
                  title={"Offence Date"}
                  camelCase={"offenceCommittedDate"}
                  placeholder={"select date"}
                  type={"date"}
                  isOptional={true}
                  value={offenceDate}
                  registerOptions={{
                    onChange: (e) => {
                      if (e.target.value !== null) {
                        setOffenceDate(e.target.value);
                      }
                    },
                  }}
                />
              </div>
            </div>
          </section>

          <div className={DashboardStyle.button_cage}>
            <SupportButtons width={"auto"} onClick={() => navigate("../")}>
              No,Cancel
            </SupportButtons>
            <ActionButtons
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
            >
              Submit
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
};

export default AddQueryManagement;
