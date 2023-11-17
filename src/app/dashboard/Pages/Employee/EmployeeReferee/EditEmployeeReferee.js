import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
import { Gender } from "../../../../../utils/const/EmployeeConst";
import {
  CreateEmployeeReferee,
  GetCountries,
  UpdateEmployeeReferee,
} from "../../../../../utils/redux/Employee/EmployeeSlice";
const AddEmployeeReferee = () => {
  const user = GetLocalStorage();
  

  const { countries } = useSelector((state) => state?.employee);

  const location = useLocation()?.state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCountries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {};
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

  const submit = (data) => {
    const payload = {
      employeeId: +user?.staffId,
      refCountryId: data?.id,
      refFirstName: data?.refFirstName,
      refLastName: data?.refLastName,
      refEmail: data?.refEmail,
      refPhoneNumber: data?.refPhoneNumber,
      refAddress1: data?.refAddress1,
      refAddress2: data?.refAddress2,
      refCity: data?.refCity,
      refZipCode: data?.refZipCode,
      gender: data?.id,
      relationship: data?.relationship,
    };

  

    //  return;

    location
      ? dispatch(UpdateEmployeeReferee(payload))?.then((res) => {
        console.log(res)
      
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${location?.id}/view`);
          }
        })
      : dispatch(CreateEmployeeReferee(payload))?.then((res) => {
          console.log(res);
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject}/view`);
          }
        });
  };

  return (
    <PageLayout
      title={`${location ? "Update" : "Add"}   Referee`}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Refereee Personal <br /> Information
            </h4>

            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"First Name"}
                  camelCase={"refFirstName"}
                  placeholder={"enter"}
                  value={location?.refFirstName}
                />

                <FormInput
                  title={"Last Name"}
                  camelCase={"refLastName"}
                  placeholder={"enter"}
                  value={location?.refLastName}
                />
              </div>

              <div>
                <FormSelect
                  title={"Gender"}
                  camelCase={"gender"}
                  placeholder={"select"}
                  array={Gender?.map((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                />

                <FormInput
                  title={"Email"}
                  camelCase={"refEmail"}
                  placeholder={"Enter "}
                  type={"email"}
                  value={location?.refEmail}
                />
              </div>

              <div>
                <FormInput
                  title={"Phone Number"}
                  camelCase={"refPhoneNumber"}
                  placeholder={"Enter"}
                  value={location?.refPhoneNumber}
                />
              
              <div>
                <FormInput
                  title={"Relationship"}
                  camelCase={"relationship"}
                  placeholder={"Enter"}
                  value={location?.relationship}
                />
              </div>
              </div>
              </div>
             </section>
          


              <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Refereee Address <br /> Information
            </h4>

            <div className={DashboardStyle.inputs_group}>
            <div>

            <FormInput
                  title={"Address 1"}
                  camelCase={"refAddress1"}
                  placeholder={"Enter "}
                  value={location?.refAddress1}
                />
                <FormInput
                  title={"Address 2"}
                  camelCase={"refAddress2"}
                  placeholder={"Enter"}
                  value={location?.refAddress2}
                />
              
              </div>
              <div>
                  <FormInput
                  title={"City"}
                  camelCase={"refCity"}
                  placeholder={"Enter "}
                  value={location?.refCity}
                />
                <FormInput
                  title={"Zip Code"}
                  camelCase={"refZipCode"}
                  placeholder={"Enter"}
                  value={location?.refZipCode}
                />
                <FormSelect
                  title={"Country"}
                  camelCase={"refCountryId"}
                  placeholder={"select"}
                  array={countries?.responseObject?.map((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.txtcountryName}
                    </option>
                  ))}
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

export default AddEmployeeReferee;
