
import React, { useEffect } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormSelect,
  FormTemplate,
} from "../../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../../global/components/Buttons/buttons";
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Gender, Title } from "../../../../../../utils/const/EmployeeConst";
import { CreateEmployeeBeneficiary } from "../../../../../../utils/redux/HR/HRSlice";
import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
import { URL } from "../../../../../../utils/routes";

function EditMyNOKInformation() {
  const location = useLocation()?.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.employee);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {
    surname: location?.surname,
    dateOfBirth: FormatDateTime(location?.dateOfBirth, "YYYY-MM-DD"),
    phoneNumber: location?.phoneNumber,
    firstName: location?.firstName,
    othernames: location?.othernames,
    gender: location?.gender,
    beneficiaryTitle: location?.beneficiaryTitle,
    address: location?.address,
    passportUri: location?.passportUri,
    location: location?.location,
    beneficiaryPercentage: location?.beneficiaryPercentage,
    email: location?.email,
    isMedicalBeneficiary: location?.isMedicalBeneficiary,
  };
  // console.log(all_departments)

  console.log(location);
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
 
    reset,
    formState: { isValid },
  } = formMethods;

  const submit = (data, e) => {

    const fileData = new FormData();
    const key = Object.keys(data);
    key?.forEach((key, index) => {
      fileData.append(`${key}`, data[key]);
    });
    fileData.append("passportUri", data.passportUri[0]);
    //  fileData.append("employeeId", user?.staffId);
    console.log(data, "data");
    console.log(defaultData, "default");

    // return;

    dispatch(CreateEmployeeBeneficiary(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${URL.My_NOK_Information}`);
      }
    });
  };

  return (
    <PageLayout
      title={location ? "Edit Beneficiary" : "Add Beneficiary"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Beneficiary Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"FirstName"}
                  camelCase={"firstName"}
                  placeholder={"Enter"}
                />
                <FormInput
                  title={"OtherName"}
                  camelCase={"othernames"}
                  placeholder={"Enter"}
                />
              </div>
              <div>
                <FormInput
                  title={"Surname"}
                  camelCase={"surname"}
                  placeholder={"Enter vendor location"}
                />

                <FormSelect
                  title={"Beneficiary Title"}
                  camelCase={"beneficiaryTitle"}
                  placeholder={"Select"}
                  array={Title?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.name}
                    </option>
                  ))}
                />
              </div>

              <div>
                <FormSelect
                  title={"Gender"}
                  camelCase={"gender"}
                  placeholder={"enter"}
                  array={Gender?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.name}
                    </option>
                  ))}
                />

                <FormInput
                  title={"Date of Birth"}
                  camelCase={"dateOfBirth"}
                  placeholder={"select"}
                  type={"date"}
                />
              </div>

              <div>
                <FormInput
                  title={"phone Number"}
                  camelCase={"phoneNumber"}
                  placeholder={"enter"}
                />

                <FormInput
                  title={"Beneficiary Email"}
                  camelCase={"email"}
                  placeholder={"enter"}
                />
              </div>

              <div>
                <FormInput
                  title={"Residential Address"}
                  camelCase={"address"}
                  placeholder={"enter"}
                />

                <FormInput
                  title={"Relationship"}
                  camelCase={"relationship"}
                  placeholder={"enter"}
                />
              </div>
              <div>
                <FormInput
                  title={"Location"}
                  camelCase={"location"}
                  placeholder={"enter"}
                />
                <FormSelect
                  title={"Country"}
                  camelCase={"countryId"}
                  placeholder={"enter"}
                  array={Gender?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.name}
                    </option>
                  ))}
                />
             
              </div>
               


              <div>

              <FormSelect
                  title={"LGA"}
                  camelCase={"lgaId"}
                  placeholder={"enter"}
                  array={Gender?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.name}
                    </option>
                  ))}
                />
                <FormInput
                  title={"Beneficiary Percentage"}
                  camelCase={"beneficiaryPercentage"}
                  placeholder={"enter"}
                />

             
              </div>

              <div>

           
                <FormSelect
                  title={"Medical Beneficiary"}
                  camelCase={"isMedicalBeneficiary"}
                  placeholder={"enter"}
                  array={
                    <>
                      <option value={"True"}>Yes</option>

                      <option value={"False"}>No</option>
                    </>
                  }
                />

                <FormInput
                  title={"Passport Upload"}
                  camelCase={"passportUri"}
                  placeholder={"choose"}
                  type={"file"}
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
              isLoading={isLoading}
              className={DashboardStyle?.button_cage_weight}
            >
              {isLoading ? "Submitting" : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default EditMyNOKInformation;
