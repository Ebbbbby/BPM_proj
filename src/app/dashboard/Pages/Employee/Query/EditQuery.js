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
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";

import {
  GetQuerySetup,
} from "../../../../../utils/redux/HR/HRSlice";



import { GetContainer, GetSingleContainer, UpdateQuery } from "../../../../../utils/redux/Employee/EmployeeSlice";


const AddQuery = () => {

  const [selectedDate, setSelectedDate] = useState("");
  const [offenceDate, setOffenceDate] = useState("");
  const {get_singlecontainer , get_container} = useSelector((state)=> state?.employee)
  console.log(get_container)
  const { get_querysetup, } = useSelector((state)=> state?.hr)
 let contId = get_singlecontainer?.responseObject?.containerId
  const location = useLocation()?.state;

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedDate(getTodayDate())
    setOffenceDate(getTodayDate())
    dispatch(GetSingleContainer())

      dispatch(GetContainer({containerId:contId === undefined ? '': contId,pageNumber:1, pageSize:10}))
    
    dispatch(GetQuerySetup({ pageNumber: 1, pageSize: 10 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contId]);

  const defaultData = {
  
  };
 console.log(location)
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

    const payload = {
      queryId:location?.id,
      title: data?.title,
      employeeId: data?.employeeId * 1,
      queryTypeId: data?.queryTypeId * 1,
      queryDate: data?.queryDate === ""|| data?.queryDate === undefined? getTodayDate(): '',
      offenceCommittedDate: data?.offenceCommittedDate === ""|| data?.offenceCommittedDate === undefined? getTodayDate(): '',
      queryContent: data?.queryContent,
      notifyHRM: Boolean(data?.notifyHOD),
    }
    
    //   console.log(data, "DATA")
    //   console.log(payload, "PAYLOAD")
    // return


      dispatch(UpdateQuery(payload))?.then((res) => {
        //console.log(res)

          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${location?.id}/view`);
          }
        })
    
  };

  return (
    <PageLayout   title={`${
      location ? "Update" : "Add"
    }   Query`}
    hasBack={true}>
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
         
                  array={get_container?.result?.map((requestor, index) => (
                    <option   selected={
                        location.employeeId === requestor?.id
                      }  key={index} value={+requestor?.id} >
                      {requestor?.surname + ' ' + requestor?.firstName + ' '+ requestor?.otherName}
                    </option>
                  ))}
             
              
                />
                   <FormSelect
                  title={"Query Type"}
                  camelCase={"queryTypeId"}
                  placeholder={"select"}
                  defaultId={location?.queryTypeId}
                  array={get_querysetup?.result?.map((requestor, index) => (
                    <option   selected={ location.queryTypeId === requestor?.Id
                      } key={index} value={+requestor?.Id}>
                      {requestor?.title}
                    </option>
                  ))}
           
                />
              </div>
              <div>
                <FormInput
                  title={"Title"}
                  camelCase={"title"}
                  placeholder={"enter"}
                  value={location?.title}

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
                  title={"Query Content"}
                  camelCase={"queryContent"}
                  placeholder={"Enter "}
                  defaultValue={location?.queryContent}
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
                  name={"Send Notification"}
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
