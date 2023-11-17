import React, { useEffect, useState } from "react";
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
import {
  GetCountries,
  GetLGA,
  GetStates,
} from "../../../../../../utils/redux/Employee/EmployeeSlice";
import { Regrex } from "../../../../../../utils/functions/Regex";

function AddMyNOK() {
  const location = useLocation()?.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stateCode, setStateCode] = useState("AU");
  const { isLoading, states, lgas, countries } = useSelector((state) => state?.employee);

  useEffect(() => {
    dispatch(GetStates());
    dispatch(GetCountries())
    dispatch(GetLGA({ stateCode: stateCode }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateCode]);


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

 
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isValid },
  } = formMethods;
  const [flipData, setFlipData] = useState(getValues("countryId") || 0);

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
        navigate(`../${res?.payload?.responseObject?.id}/view`);
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
                  title={"Beneficiary Email"}
                  camelCase={"email"}
                  placeholder={"enter"}
                />
                 <FormInput
                  title={"Residential Address"}
                  camelCase={"address"}
                  placeholder={"enter"}
                />
              </div>

              <div>
               

                <FormInput
                  title={"Relationship"}
                  camelCase={"relationship"}
                  placeholder={"enter"}
                />

<FormSelect
                  title={"Country"}
                  camelCase={"CountryId"}
                  placeholder={"enter"}
                  isOptional={false}
                  array={countries?.responseObject?.map?.((x, index) => (
                    <option key={index} value={+x?.id}>
                      {x?.txtcountryName}
                    </option>
                      ))}
                      moreRegister={{
                     onChange:(e)=>{
                      setFlipData(+e.target.value)
                      const isFound = countries?.responseObject?.find((x)=> +e.target.value === x?.id )
                      setValue("phoneNumber",`${isFound?.phoneCode}`)
                      // console.log(isFound)
                     }
                      }}
                  
                />
              </div>
              <div>
              
         
              </div>

              {flipData === 2 ? (<>  <div>
               
                <FormSelect
                  title={"State"}
                  camelCase={"countryId"}
                  placeholder={"enter"}
                  array={states?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.stateId}>
                      {x?.stateName}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = states?.responseObject?.find(
                        (x) => +e.target.value === x?.stateId
                      );
                      //console.log(isFound)
                      //console.log(isFound?.stateCode)
                      setStateCode(isFound?.stateCode);
                    },
                  }}
                />
                   <FormSelect
                  title={"LGA"}
                  camelCase={"lgaId"}
                  placeholder={"select"}
                  array={lgas?.responseObject?.map?.((x, index) => (
                    <option key={index} value={+x?.lgaId}>
                      {x?.lgaName}
                    </option>
                  ))}
                />
              </div>

              <div>
             
              
              </div></>): (<>
                <div>
             
                  <FormInput
                  title={"Postal Code"}
                  camelCase={"postalCode"}
                  placeholder={"enter"}
               
                />
                 <FormInput
                  title={"Location"}
                  camelCase={"location"}
                  placeholder={"enter"}
                />

                </div>

              </>)}

            
            

              <div>

           

              <FormInput
                  title={"phone Number"}
                  camelCase={"phoneNumber"}
                  placeholder={"enter"}
                  registerOptions={{
                    pattern: {
                      value: Regrex.phone,
                      message: "Enter a valid Phone Number",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone Number must not be more than 15 digits",
                    },
                    minLength: {
                      value: 11,
                      message: "Phone Number must be of atleast 11 digits",
                    },
                  }}
                />
              <FormInput
                  title={"Beneficiary Percentage"}
                  camelCase={"beneficiaryPercentage"}
                  placeholder={"enter"}
                />
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

export default AddMyNOK;
