import React, {useState } from "react";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormInput,
  FormSelect,
  FormTemplate,
  SlideCheckBox,
} from "../../../Components/Forms/InputTemplate";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";
import { Severity } from "../../../../../utils/const/QueryConst";
import { useLocation, useNavigate } from "react-router";
import { CreateQuerySetup } from "../../../../../utils/redux/HR/HRSlice";
import { useDispatch } from "react-redux";
import { ProbablePunishments } from "../../../../../utils/const/QueryConst";
import { toast } from "react-toastify";

const AddQuerySetup = () => {
  const location = useLocation()?.state;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [threshHold, setthreshHold] = useState()
  const [days, setDays]= useState()

 

  const defaultData = {
    title: location?.title,
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  

  const {
    handleSubmit,
    watch,
    // formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    if(data?.probablePunishments?.punishmentTypeEnum.length <= 0){
      return toast.error(
        "You must select atleast one item in Probable Punishment"
      );
    }
    let payload = {
      title:data?.title,
      severity:data?.severity * 1,
      threshold:data?.threshold*1,
      daysToReport:data?.daysToReport*1,
      escalate:Boolean(data?.escalate),
      probablePunishments: data?.probablePunishments?.punishmentTypeEnum.map((x, index)=>{
        return {punishmentTypeEnum:x * 1}
      })
    }
    // console.log(payload)
    // return;
   
    dispatch(CreateQuerySetup(payload))?.then(
      (res)=>
        {
          if (res?.payload?.successful === true) {
            navigate(`../`);
          }
        }
    );
  };
  return (
    <PageLayout title={"Create New Query Setup"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Query Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Title"}
                  camelCase={"title"}
                  placeholder={"Enter"}
                />
                <FormSelect
                  title={"Severity"}
                  camelCase={"severity"}
                  placeholder={"select"}
                  array={Severity?.map((x, index) => 
                    //console.log(x)
                    (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                 )
                  )}
            
                />

              </div>
              <div>
                <FormInput
                  title={"threshold"}
                  camelCase={"threshold"}
                  placeholder={"enter threshold "}
                  type={'number'}
                  value={threshHold}   
            
                //   disabled={Number(minutes) >= 60}  
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Threshold must include only numbers",
                    },

                    onChange:(e)=>{
                        const value = (e.target.value)
                        if(Number(value >= 0) &&  Number(value >60)  ){
                          return
                        //  setDisabled(!disabled)
                        }
                        setthreshHold(value)
                    }
                }
            }
                />

                <FormInput
                  title={"days to report"}
                  camelCase={"daysToReport"}
                  placeholder={"enter days to Report"}
                  type={'number'}
                  value={days}   
            
                //   disabled={Number(seconds) >= 60}  
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Days must include only numbers",
                    },

                      onChange:(e)=>{
                        const value = (e.target.value)
                        if(Number(value >= 0) &&  Number(value >20)  ){
                          return
                        //  setDisabled(!disabled)
                        }
                        setDays(value)
                    }
                }
            }
                />
              </div>
              <div style={{ gridTemplateColumns: "1fr" }}>
                <SlideCheckBox
                  name={"Send notification"}
                  camelCase={"escalate"}
                  value={true}
                  isOptional={true}
                  
                />
              </div>

              <div style={{ gridTemplateColumns: "1fr" }}>
                <MultiSelect
                  data={ProbablePunishments?.map((x) => {
                    return {
                      name: x.name,
                      checkBoxName: x?.name,
                      id: x?.id,
                      ...x,
                    };
                  })}
                  dataValues={watch()?.probablePunishments?.punishmentTypeEnum}
                  name={"probablePunishments.punishmentTypeEnum"}
                  title={"Probable Punishments"}
                  isOptional={
                    watch()?.ProbablePunishments?.length !== 0 ? true : false
                  }
                />
              </div>
            </div>
          </section>
    
          <div className={DashboardStyle.button_cage}>
            <SupportButtons
              width={"auto"}
              className={DashboardStyle?.button_cage_weight}
            >
              Save as Draft
            </SupportButtons>
            <ActionButtons
              width={"auto"}
              // isLoading={isLoading}
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

export default AddQuerySetup;
