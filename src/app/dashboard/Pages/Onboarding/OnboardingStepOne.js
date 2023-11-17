import React from "react";
import on from "./Style/onboarding.module.css";
import DashboardStyle from "../../../dashboard/Styles/Dashboard.module.css";
import { ActionButtons } from "../../../global/components/Buttons/buttons";
import {
  FormInput,
  FormSelect,
  FormTextArea,
} from "../../Components/Forms/InputTemplate";
import MultiSelect from "../../Components/MultiSelect/MultiSelect";
import { useSelector } from "react-redux";
import { CancelButton } from "./OnboardingTemplate";

function OnboardingStepOne({
  vendorsTypes,
  companyTypes,
  serviceTypes,
  watch,
}) {
  const { all_vendors } = useSelector((state) => state?.vendor);
  const { assetSetUp, consummableSetUp } = useSelector((x) => x);

  // const data = all_vendors?.responseObject;

  return (
    <>
      <section className={`${DashboardStyle.form_section} ${on.form_section}`}>
        {/* <h4 className={DashboardStyle.form_section_title}></h4> */}

        <div className={DashboardStyle.inputs_group}>
          <div>
            <FormInput
              title={"Business Name"}
              camelCase={"companyName"}
              placeholder={"Business Name"}
              // isOptional={true}
            />
            {/* <div>
              <MultiSelect
                data={companyTypes?.responseObject?.map((x) => {
                  return {
                    name: x?.name,
                    checkBoxName: x?.name,
                    id: x?.id,
                    ...x,
                  };
                })}
                dataValues={watch()?.businessNature}
                name={"businessNature"}
                title={"Select Nature Of Business"}
              />
            </div> */}
            <FormSelect
              title={"Business Nature"}
              camelCase={"businessNature"}
              placeholder={"Select Nature Of Business"}
              // isOptional={true}
              // defaultId={data?.businessNatureId}
              array={companyTypes?.responseObject?.map?.((x, index) => (
                <option key={index} value={x?.id}>
                  {x?.name}
                </option>
              ))}
            />
          </div>
          <div>
            <div>
              <MultiSelect
                data={assetSetUp?.asset_sub_class?.responseObject?.map((x) => {
                  return {
                    name: x?.name,
                    checkBoxName: x?.name,
                    id: x?.id,
                    ...x,
                  };
                })}
                dataValues={watch()?.serviceProvides_assets}
                name={"serviceProvides_assets"}
                title={"Service Providing (Assets)"}
                isOptional={
                  watch()?.serviceProvides_consumable?.length >= 1
                    ? true
                    : false
                }
              />
            </div>
            <div>
              <MultiSelect
                data={consummableSetUp?.Consummable_sub_class?.responseObject?.map(
                  (x) => {
                    return {
                      name: x?.name,
                      checkBoxName: x?.name,
                      id: x?.id,
                      ...x,
                    };
                  }
                )}
                dataValues={watch()?.serviceProvides_consumable}
                name={"serviceProvides_consumable"}
                title={"Service Providing (Consumable)"}
                isOptional={
                  watch()?.serviceProvides_assets?.length >= 1 ? true : false
                }
              />
            </div>
            {/* <FormSelect
              title={"Select Service Providing"}
              camelCase={"serviceProvides"}
              placeholder={"Service Providing"}
              isOptional={true}
              array={serviceTypes?.responseObject?.map?.((x, index) => (
                <option key={index} value={x?.id}>
                  {x?.name}
                </option>
              ))}
            /> */}
          </div>
          <div>
            <FormInput
              title={"Your Legal Business Name"}
              camelCase={"businessName"}
              placeholder={"Enter Legal Business Name"}
              // defaultValue={data?.businessName}
            />
            <FormInput
              title={"Tax Identification Number (TIN)"}
              camelCase={"TaxIdentificationNumber"}
              placeholder={"Enter Tax Identification Number (TIN)"}
              isOptional={true}
              // defaultValue={data?.taxIdentificationNumber}
            />
          </div>
          <div>
            <FormInput
              title={"Certificate of Registration"}
              camelCase={"rcNumber"}
              placeholder={"Enter Certificate of Registration Number"}
              // defaultValue={data?.rcNumber}
              // isOptional={true}
            />
            <FormInput
              title={"Website"}
              camelCase={"ValueAddedTax"}
              placeholder={"Enter Website"}
              isOptional={true}
              registerOptions={{
                pattern: {
                  value:
                    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/,
                  message: "Enter a valid URL starting with 'https'",
                },
              }}
            />
            <FormSelect
              title={"Vendor Type"}
              camelCase={"VendorType"}
              placeholder={"Vendor Type"}
              // isOptional={true}
              // defaultId={}
              // defaultValue={data?.vendorTypeId}
              array={vendorsTypes?.responseObject?.map?.((x, index) => (
                <option key={index} value={x?.id}>
                  {x?.name}
                </option>
              ))}
            />
            <FormTextArea
              title={"Comment"}
              camelCase={"comment"}
              placeholder={"select"}
              type="textbox"
              isOptional={false}
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

export default OnboardingStepOne;
