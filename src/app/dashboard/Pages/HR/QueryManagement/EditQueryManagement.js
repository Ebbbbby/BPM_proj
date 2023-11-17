import React, {useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation, } from "react-router";
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
import { GetSingleContainer,CreateQuery, UpdateQuery } from "../../../../../utils/redux/Employee/EmployeeSlice";

const EditQueryManagement = () => {
  const { get_querysetup, all_employees} = useSelector((state)=> state?.hr)



  const location = useLocation()?.state;
  const dispatch = useDispatch();
  console.log(all_employees)

  useEffect(() => {
    dispatch(GetSingleContainer())

      dispatch(GetAllEmployees({pageNumber:1, pageSize:10}))
    
    dispatch(GetQuerySetup({ pageNumber: 1, perPage: 10 }))
          // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {
  };

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
  const submit = (data) => {

    const payload = {
      initiationType:InitiationType.InitiatedByHOU,
      title:data?.title,
      employeeId: data?.employeeId * 1,
      queryTypeId: data?.queryTypeId * 1,
      queryDate : data?.queryDate,
      queryContent:data?.queryContent,
      notifyHOD:Boolean(data?.notifyHOD),
    }
    
      
    // return

    location
      ? dispatch(UpdateQuery(payload))?.then((res) => {
   
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${location?.id}/view`);
          }
        })
      : dispatch(CreateQuery(payload))?.then((res) => {
        console.log(res)
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject.id}/view`);
          }
        });
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
                  array={all_employees?.result?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.surname + ' ' + requestor?.firstName + ' '+ requestor?.otherName}
                    </option>
                  ))}
             
              
                />
                   <FormSelect
                  title={"Query Type"}
                  camelCase={"queryTypeId"}
                  placeholder={"select"}
                     array={get_querysetup?.data?.map((requestor, index) => (
                    <option key={index} value={+requestor?.Id}>
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

                  //    value={get_fleet?.responseObject?.fleetName}
                />

                  <FormInput
                  title={"Query Date"}
                  camelCase={"queryDate"}
                  placeholder={"select date"}
                  type={"date"}
                />
              </div>
              <div>

              <FormTextArea
                  title={"Query Content"}
                  camelCase={"queryContent"}
                  placeholder={"Enter "}
                />
               

              </div>
              {/* <div style={{ gridTemplateColumns: "1fr" }}>
                <SlideCheckBox
                  name={"Send notification"}
                  camelCase={"notifyHOD"}
                  value={true}
                  isOptional={false}
                />
              </div> */}
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

export default EditQueryManagement;
