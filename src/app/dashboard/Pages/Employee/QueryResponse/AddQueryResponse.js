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
import { FormProvider, get, useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";

import { GetQuerySetup } from "../../../../../utils/redux/HR/HRSlice";
import { InitiationType } from "../../../../../utils/const/QueryConst";
import {
  CreateQueryResponse,
  UpdateQuery,
} from "../../../../../utils/redux/Employee/EmployeeSlice";
import { URL } from "../../../../../utils/routes";

const AddQueryResponse = () => {


  const location = useLocation()?.state;
  const dispatch = useDispatch();

  const defaultData = {};

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isValid },
  } = formMethods;

  const { id } = useParams();
  const navigate = useNavigate();
  const submit = (data) => {
   

    const payload = {
      queryId:location?.id,
      response: data?.response,
  
    };
  
    console.log(payload)

    // return;
   dispatch(CreateQueryResponse(payload))?.then((res) => {
          console.log(res);
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../../${URL.My_Query}`);
          }
        });
  };

  return (
    <PageLayout title={`${location ? "Add" : "Update"}   Reply`} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Query <br /> Response
            </h4>

         
           
              <div>
                <FormTextArea
                  title={"Query Reply"}
                  camelCase={"response"}
                  placeholder={"Enter "}
                  isOptional={true}
                />
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

export default AddQueryResponse;
