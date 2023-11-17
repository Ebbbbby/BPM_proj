import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
  FormTextArea,
  SlideCheckBox,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";

import { GetQuerySetup } from "../../../../../utils/redux/HR/HRSlice";
import { InitiationType } from "../../../../../utils/const/QueryConst";
import {
  GetContainer,
  GetSingleContainer,
  CreateQuery,
  UpdateQuery,
  GetDepartment
} from "../../../../../utils/redux/Employee/EmployeeSlice";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";

const AddQuery = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [offenceDate, setOffenceDate] = useState("");


const user = GetLocalStorage()
console.log(user)
const isHOD = user?.isHOD;
const userId = user?.staffId


  const { get_singlecontainer, get_container,get_department } = useSelector(
    (state) => state?.employee
  );
  const { get_querysetup } = useSelector((state) => state?.hr);
  console.log(get_container)
  let contId = get_singlecontainer?.responseObject?.containerId;
  ;


  console.log(get_container)

  const location = useLocation()?.state;
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedDate(getTodayDate())
    setOffenceDate(getTodayDate())
    dispatch(GetSingleContainer());
    if (isHOD) {
      dispatch(GetDepartment({ departmentId: +user?.departmentId, pageNumber: 1, pageSize: 10 }));
    } 
    if(contId !== undefined)
    {
      dispatch(GetContainer({ containerId: contId, pageNumber: 1, pageSize: 10 }));
    }

    dispatch(GetQuerySetup({ pageNumber: 1, pageSize: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contId, isHOD, user.departmentId]);

  
  const filterCurrentUser = (employee) => employee.id !== userId;
  const employeesForHOD = get_department?.result
  ?.filter(filterCurrentUser)
  .map((employee, index) => (
    <option key={index} value={+employee?.id}>
      {employee?.surname + " " + employee?.firstName + " " + employee?.otherName}
    </option>
  ));

  const employeesForHOC = get_container?.result
  ?.filter(filterCurrentUser)
  .map((employee, index) => (
    <option key={index} value= {+employee?.id}>
      {employee?.surname + " " + employee?.firstName + " " + employee?.otherName}
    </option>
  ));

  

  const employeesDropdown = isHOD ? employeesForHOD : employeesForHOC;

  const defaultData = {};

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const navigate = useNavigate();

  function getTodayDate() {
    const today = new Date();
    console.log(today, "today");
    return today.toISOString().substr(0, 10);
  }
  
  const submit = (data) => {
    // if (data?.queryDate== undefined || data?.queryDate== '') {
    //   getTodayDate();
    // }

    const payload = {
      initiationType: InitiationType.InitiatedByHOU,
      title: data?.title,
      employeeId: data?.employeeId * 1,
      queryTypeId: data?.queryTypeId * 1,
      queryDate: data?.queryDate === ""|| data?.queryDate === undefined? getTodayDate(): '',
      offenceCommittedDate: data?.offenceCommittedDate === ""|| data?.offenceCommittedDate === undefined? getTodayDate(): '',
      queryContent: data?.queryContent,
      notifyHOD: Boolean(data?.notifyHOD),
    };
  
   //return;

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
            navigate(`../${res?.payload?.responseObject}/view`);
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
                <FormSelect
                  title={"Employee"}
                  camelCase={"employeeId"}
                  placeholder={"select"}
                  array={employeesDropdown}
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
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = get_querysetup?.data?.find(
                        (x) => +e.target.value === x?.Id
                      );
                      console.log(isFound);
                    },
                  }}
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
              <div style={{ gridTemplateColumns: "1fr" }}>
                <SlideCheckBox
                  name={"Send notification"}
                  camelCase={"notifyHOD"}
                  value={true}
                  isOptional={false}
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

export default AddQuery;
