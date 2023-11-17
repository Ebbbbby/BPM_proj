import React, { useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FileUpload,
  FormSelect,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";

function Acquisition() {
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    // watch,
    // formState: { isValid },
  } = formMethods;

  const [file, setFile] = useState(null);

  const submit = (e) => {
    alert("clicked");
  };
  return (
    <PageLayout title={"Add Asset Acquisition Management"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Vendor Name"}
                  camelCase={"vendorName"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"Legal Business Name"}
                  camelCase={"legalBusName"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormInput
                  title={"Apartment Suite Number"}
                  camelCase={"ApSuNu"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"Street Address"}
                  camelCase={"StrAddress"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormInput
                  title={"City"}
                  camelCase={"city"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"State"}
                  camelCase={"state"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormInput
                  title={"Email"}
                  camelCase={"emailAddress"}
                  placeholder={"select"}
                  type={"email"}
                />
                <FormInput
                  title={"Phone Number"}
                  camelCase={"phoneNumber"}
                  placeholder={"select"}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Acquisition Date"}
                  camelCase={"acqDate"}
                  placeholder={"select"}
                  type="date"
                />
              </div>
              <div>
                <FormSelect
                  title={"Depreciation Class"}
                  camelCase={"depClass"}
                  placeholder={"select"}
                />
                <FormSelect
                  title={"Depreciation Value"}
                  camelCase={"depVal"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormSelect
                  title={"Depreciation Start Date"}
                  camelCase={"depStart"}
                  placeholder={"select"}
                  type="date"
                />
                <FormInput
                  title={"Depreciation End Date"}
                  camelCase={"depEnd"}
                  placeholder={"select"}
                  type="date"
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Insurance Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Insurance Company"}
                  camelCase={"insComp"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"Rc. No."}
                  camelCase={"RCNo"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormTextArea
                  title={"Insurance Address"}
                  camelCase={"insAdd"}
                  placeholder={"select"}
                  type="textbox"
                />
                <FormInput
                  title={"Insurance Email"}
                  camelCase={"insEmail"}
                  placeholder={"select"}
                  type="email"
                />
              </div>
              <div>
                <FormInput
                  title={"Insurance Phone Number"}
                  camelCase={"insPhone"}
                  placeholder={"select"}
                />
                <FormSelect
                  title={"Insurance Type"}
                  camelCase={"insType"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormInput
                  title={"Certificate Number"}
                  camelCase={"certNo"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"Policy Number"}
                  camelCase={"polNo"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormInput
                  title={"Commencement Date of insurance"}
                  camelCase={"commDate"}
                  placeholder={"select"}
                  type="date"
                />
                <FormInput
                  title={"Expiry Date of insurance"}
                  camelCase={"expiryDate"}
                  placeholder={"select"}
                  type="date"
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional Comments
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormTextArea
                  title={"Comments (Optional)"}
                  camelCase={"comments"}
                  placeholder={"select"}
                  type="textbox"
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Supporting Documents
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FileUpload
                  file={file}
                  setFile={setFile}
                  title={"Attachment"}
                />
              </div>
            </div>
          </section>
          <div className={DashboardStyle.button_cage}>
            <SupportButtons className={DashboardStyle?.button_cage_weight}>
              Save as Draft
            </SupportButtons>
            <ActionButtons className={DashboardStyle?.button_cage_weight}>
              Submit
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default Acquisition;
