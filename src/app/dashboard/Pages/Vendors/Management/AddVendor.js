import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { CreateVendor } from "../../../../../utils/redux/Vendor/VendorSlice";
import { GetNigerianStates } from "../../../../../utils/redux/Global/GlobalSlice";
import { useNavigate } from "react-router";
import { Regrex } from "../../../../../utils/functions/Regex";

function AddVendor() {
  const dispatch = useDispatch();
  const { isLoadingAction } = useSelector((state) => state?.vendor);

  const { states } = useSelector((state) => state?.global);

  useEffect(() => {
    dispatch(GetNigerianStates());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const navigate = useNavigate();
  const submit = (data) => {
    console.log(data)
    const dataValue = {
      ...data,
    };

    dispatch(CreateVendor(dataValue))?.then((res) => {
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${res?.payload?.responseObject?.id}/view-vendor`);
      }
    });
  };


  return (
    <PageLayout title={"Onboard New Vendor"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Basic <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Vendor Company Name"}
                  camelCase={"companyName"}
                  placeholder={"Enter Vendor Company Name"}
                />
                <FormInput
                  title={"Contact Person Name"}
                  camelCase={"contactPerson"}
                  placeholder={"Enter Contact Person"}
                />
              </div>
              <div>
                <FormInput
                  title={"Email"}
                  camelCase={"email"}
                  placeholder={"Enter Email"}
                  type={"email"}
                  registerOptions={{
                    pattern: {
                      value: Regrex.email,
                      message: "Enter a valid Email Address",
                    },
                  }}
                />
                <FormInput
                  title={"Phone Number"}
                  camelCase={"phoneNumber"}
                  placeholder={"Enter Phone"}
                  registerOptions={{
                    pattern: {
                      value: Regrex.phone,
                      message: "Enter a valid Phone Number",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone Number must not be more than 15 digits.",
                    },
                    minLength: {
                      value: 11,
                      message: "Phone Number must be of atleast 11 digits",
                    },
                  }}
                />
              </div>
              <div>
                <FormSelect
                  title={"State"}
                  camelCase={"state"}
                  placeholder={"select"}
                  // isOptional={true}
                  array={states?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                />
              </div>
            </div>
          </section>

          <div className={DashboardStyle.button_cage}>
            <SupportButtons
              onClick={() => navigate(-1)}
              className={DashboardStyle?.button_cage_weight}
            >
              Cancel
            </SupportButtons>
            <ActionButtons
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
            >
              {isLoadingAction ? "Submitting..." : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default AddVendor;
