import React from "react";
import on from "./Style/onboarding.module.css";
import DashboardStyle from "../../../dashboard/Styles/Dashboard.module.css";
import { ActionButtons } from "../../../global/components/Buttons/buttons";
import { FormInput, FormSelect } from "../../Components/Forms/InputTemplate";
import { Regrex } from "../../../../utils/functions/Regex";
import { useSelector } from "react-redux";
import { CancelButton } from "./OnboardingTemplate";

function OnboardingStepTwo({ states }) {
  const { all_vendors } = useSelector((state) => state?.vendor);

  const data = all_vendors?.responseObject;
  return (
    <>
      <section className={`${DashboardStyle.form_section} ${on.form_section}`}>
        {/* <h4 className={DashboardStyle.form_section_title}></h4> */}

        <div className={DashboardStyle.inputs_group}>
          <div>
            <FormInput
              title={"Apartment Suite Number"}
              camelCase={"SuiteNumber"}
              placeholder={"Enter Apartment Suite Number"}
              // isOptional={true}
              defaultValue={data?.suiteNumber}
            />
            <FormInput
              title={"Street Address"}
              camelCase={"Address"}
              placeholder={"Enter Street Address"}
              // isOptional={true}
              defaultValue={data?.address}
            />
          </div>
          <div>
            <FormInput
              title={"City"}
              camelCase={"City"}
              placeholder={"Enter City"}
              // isOptional={true}
              defaultValue={data?.city}
            />
            <FormSelect
              title={"State"}
              camelCase={"State"}
              placeholder={"select"}
              // isOptional={true}
              // defaultId={data?.stateId}
              // defaultValue={data?.state}
              array={states?.responseObject?.map?.((x, index) => (
                <option key={index} value={x?.id}>
                  {x?.name}
                </option>
              ))}
            />
          </div>
          <div>
            <FormInput
              title={"Email"}
              camelCase={"Email"}
              placeholder={"select"}
              type={"email"}
              disabled={true}
              // isOptional={true}
              defaultValue={data?.email}
              registerOptions={{
                pattern: {
                  value: Regrex.email,
                  message: "Enter a valid Email Address",
                },
              }}
            />
            <FormInput
              title={"Phone Number"}
              camelCase={"Phone"}
              placeholder={"select"}
              // isOptional={true}
              defaultValue={data?.phoneNumber}
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
          </div>
        </div>
      </section>
      <div className={DashboardStyle.button_cage}>
        <CancelButton />
        <ActionButtons className={DashboardStyle?.button_cage_weight}>
          Next
        </ActionButtons>
      </div>
    </>
  );
}

export default OnboardingStepTwo;
