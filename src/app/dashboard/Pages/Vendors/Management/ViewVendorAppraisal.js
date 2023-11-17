import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSingleVendor,
  ViewPerformanceReview,
} from "../../../../../utils/redux/Vendor/VendorSlice";
import { useParams } from "react-router";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { CheckMarks } from "./ViewVendors";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";

function ViewVendorAppraisal() {
  const dispatch = useDispatch();
  const { all_vendors, performance_review_result } = useSelector(
    (state) => state?.vendor
  );

  const vendor = all_vendors?.responseObject;

  const { id, report, reporter, reporter_department, report_date } = useParams();

  useEffect(() => {
    dispatch(GetSingleVendor({ id }));
    dispatch(ViewPerformanceReview(report));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const submit = (data) => {
    console.log(data);
  };

  const [apps, setApps] = useState(false);

  return (
    <PageLayout
      title={"Performance Evaluation - View"}
      hasBack={true}
      backURL={`../${id}/view-vendor`}
    >
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section
            style={{
              borderTop: "unset",
            }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}>
              Appraiser <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Appraiser</p>
                  <h4>{reporter}</h4>
                </div>
                <div>
                  <p>Department</p>
                  <h4>{reporter_department}</h4>
                </div>
                <div>
                  <p>Report Appraised</p>
                  <h4>{report_date}</h4>
                </div>
              </div>
            </div>
          </section>
          <section
            // style={{
            //   borderTop: "unset",
            // }}
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

            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Project Start Date</p>
                  <h4>
                    {FormatDateTime(vendor?.performance?.projectStartDate)}
                  </h4>
                </div>
                <div>
                  <p>Project End Date</p>
                  <h4>{FormatDateTime(vendor?.performance?.projectEndDate)}</h4>
                </div>
              </div>
              <div style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <p>Project Summary</p>
                  <h4>{vendor?.performance?.projectSummary}</h4>
                </div>
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
                  {performance_review_result?.responseObject
                    ?.slice(0, -1)
                    ?.map((x, index) => (
                      <div key={index + 1}>
                        <h4>{x?.question}</h4>
                        <>
                          <CheckMarks name={x?.answer} />
                        </>
                        {x?.comment && (
                          <p>
                            {" "}
                            <b>Comment:</b> {x?.comment}
                          </p>
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
                  {performance_review_result?.responseObject
                    ?.slice(-1)
                    ?.map((x) => (
                      <div>
                        <h4>{x?.question}</h4>
                        <div
                          className={
                            DashboardStyle.checkbox_style_final_appraisal
                          }
                        >
                          <>
                            <CheckMarks name={x?.answer} />
                          </>
                          {x?.comment && (
                            <p>
                              {" "}
                              <b>Comment:</b> {x?.comment}
                            </p>
                          )}
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

export default ViewVendorAppraisal;
