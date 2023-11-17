import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  RadioBox,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSingleVendor,
  PerformanceReview,
} from "../../../../../utils/redux/Vendor/VendorSlice";
import { useLocation, useNavigate, useParams } from "react-router";
import { PostPerformanceReview } from "../../../../../utils/redux/Vendor/VendorSlice";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

function CreateVendorAppraisal() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;
  // console.log({ location });
  const { isLoadingAction, all_vendors, performance_review } = useSelector(
    (state) => state?.vendor
  );

  const vendor = all_vendors?.responseObject;

  const { id } = useParams();



  useEffect(() => {
    dispatch(GetSingleVendor({ id }));
    dispatch(PerformanceReview());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(performance_review);

  const defaultData = {
    companyName: location?.companyName,
    companyType: location?.companyTypeId,
    businessName: location?.businessName,
    serviceProviding: location?.serviceProvidingId,
    TaxIdentificationNumber: location?.taxIdentificationNumber,
    ValueAddedTax: location?.valueAddedTax,
    RCNumber: location?.rcNumber,
    vendorType: location?.vendorTypeId,
    suiteNumber: location?.suiteNumber,
    address: location?.address,
    City: location?.city,
    state: location?.stateId,
    Email: location?.email,
    PhoneNumber: location?.phoneNumber,
    comments: location?.comments,
  };

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const navigate = useNavigate();
  const submit = (data) => {
    const entries = Object?.keys(data).map((key) => {
      return {
        questionId: +key,
        optionId: +data[key] || "",
        comment: key === "12" ? data?.comment : "",
      };
    });

    const dataValue = {
      vendorId: +id,
      projectStartDate: data?.projectStartDate,
      projectEndDate: data?.projectEndDate,
      projectSummary: data?.projectSummary,
      ratings: entries?.slice(0, 13),
    };

    dispatch(PostPerformanceReview(dataValue))?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../${id}/appraise/view`);
      }
    });
    //;
  };

  const [apps, setApps] = useState(false);

  return (
    <PageLayout title={"Performance Evaluation"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <div
            style={{ top: "-4rem" }}
            className={`${DashboardStyle.button_cage} ${DashboardStyle.app_view_controls}`}
          >
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
          <section
            style={{
              borderTop: "unset",
            }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}>
              Vendor <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Business Name</p>
                  <h4>{vendor?.businessName}</h4>
                </div>
                <div>
                  <p>Nature of Business</p>
                  <h4>{vendor?.businessNature}</h4>
                </div>
                <div>
                  <p>Vendor Type</p>
                  <h4>{vendor?.vendorType}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Certificate of Registration</p>
                  <h4>{vendor?.rcNumber}</h4>
                </div>
                <div>
                  <p>Tax Identification</p>
                  <h4>{vendor?.taxIdentificationNumber}</h4>
                </div>
                {/* <div>
                  <p>RC Number</p>
                  <h4>{vendor?.rcNumber}</h4>
                </div> */}
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Project Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Project Start Date"}
                  camelCase={"projectStartDate"}
                  type={"date"}
                />
                <FormInput
                  title={"Project End Date"}
                  camelCase={"projectEndDate"}
                  type={"date"}
                />
              </div>
              <div style={{ gridTemplateColumns: "1fr" }}>
                <FormTextArea
                  title={"Project Summary"}
                  camelCase={"projectSummary"}
                  placeholder={"Project Summary"}
                  type="textbox"
                  isOptional={true}
                />
              </div>
            </div>
          </section>
          <section
            onClick={() => setApps(!apps)}
            style={{
              padding: "1rem",
              border: "1px solid #D9E9DA",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}>
              Performance Rating
            </h4>
            <>
              {apps ? (
                <HiOutlineChevronUp />
              ) : (
                <HiOutlineChevronDown
                  className={DashboardStyle.form_section_title}
                />
              )}
            </>
            {/* <div className={DashboardStyle.inputs_group}></div> */}
          </section>
          {apps && (
            <section
              style={{ display: "block" }}
              className={DashboardStyle.form_section}
            >
              <div className={DashboardStyle.inputs_group_no_grid}>
                <div
                  style={{ padding: "0rem 1rem" }}
                  className={DashboardStyle.inputs_checkbox_groups_appraisal}
                >
                  {performance_review?.responseObject
                    ?.slice(0, -1)
                    ?.map((x, index) => (
                      <div key={index + 1}>
                        <h4>{x?.question}</h4>
                        <>
                          {x?.options?.map((y) => (
                            <RadioBox
                              name={y?.option}
                              camelCase={x?.questionId}
                              group={x?.questionId}
                              value={y?.id}
                            />
                          ))}
                        </>
                        {x?.hasComment === true && (
                          <FormTextArea
                            title={"Explain"}
                            camelCase={"comment"}
                            placeholder={"select"}
                            type="textbox"
                            isOptional={true}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div
                style={{ padding: "1rem 0" }}
                className={DashboardStyle.inputs_group_no_grid}
              >
                <div
                  className={
                    DashboardStyle.inputs_checkbox_groups_appraisal_finals
                  }
                >
                  {performance_review?.responseObject?.slice(-1)?.map((x) => (
                    <div>
                      <h4>{x?.question}</h4>
                      <div
                        className={
                          DashboardStyle.checkbox_style_final_appraisal
                        }
                      >
                        {x?.options?.map((y) => (
                          <RadioBox
                            name={y?.option}
                            camelCase={x?.questionId}
                            group={x?.questionId}
                            value={y?.id}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default CreateVendorAppraisal;
