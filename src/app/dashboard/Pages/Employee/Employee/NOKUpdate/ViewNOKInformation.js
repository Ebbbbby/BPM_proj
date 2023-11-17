import React, { useEffect } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import {  useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
import { GetSingleNOK } from "../../../../../../utils/redux/Employee/EmployeeSlice";


function ViewNOKInformation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { single_NOK } = useSelector((state) => state?.employee);

  const acq = single_NOK?.responseObject;
  
 
  const submit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    dispatch(GetSingleNOK(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout title={"Medical Requisition Details"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section
            style={{
              backgroundColor: "#F8FBF8",
              border: "1px solid #D9E9DA",
              borderRadius: "8px",
            }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}>
              Process <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Initiated By:</p>
                    <h4>{acq?.initiatorName}</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Date:</p>
                    <h4>{FormatDateTime(acq?.overtimeDate, "ll")}</h4>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Created By:</p>
                    <h4>{acq?.initialName}</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Date:</p>
                    <h4>{FormatDateTime(acq?.overtimeDate, "ll")}</h4>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Last Reviewed:</p>
                    <h4>{acq?.lastReveiwed?.lastReviewedBy || "-"}</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Date:</p>
                    <h4>
                      {FormatDateTime(acq?.lastReveiwed?.lastReveiwedByDate, 'll')}
                    </h4>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{acq?.levelsOfApproval || "-"}</h4>
                </div>
                <div>
                  <p>Process Status</p>
                  <h4
                    style={{
                      color:
                        acq?.approvalStatus === "Pending"
                          ? "#815103"
                          : acq?.approvalStatus === "Approved"
                          ? "#0F6308"
                          : acq?.approvalStatus === "Cancelled"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {acq?.approvalStatus}
                  </h4>
                </div>
                <div>
                  <button className={DashboardStyle.view_more_action_button}>
                    <span>Preview Stage</span>{" "}
                    <FiExternalLink
                      className={DashboardStyle.view_more_action_button_icon}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Beneficiary <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p> First Name:</p>
                  <h4>{acq?.firstName}</h4>
                </div>
                <div>
                  <p>Last Name:</p>
                  <h4>{acq?.surname}</h4>
                </div>
                <div>
                  <p>Other Name:</p>
                  <h4>{acq?.othernames}</h4>
                </div>
              </div>

              <div>
                <div>
                  <p>Email:</p>
                  <h4>{acq?.email}</h4>
                </div>
                <div>
                  <p>Phone Number:</p>
                  <h4>{acq?.phoneNumber}</h4>
                </div>
                <div>
                  <p>Date of Birthj:</p>
                  <h4>{FormatDateTime(acq?.dateOfBirth)}</h4>
                </div>
              
              </div>

            </div>
          </section>
        
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewNOKInformation;
