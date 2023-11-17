import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import {  useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { ViewSingleEmployee } from "../../../../../utils/redux/Employee/EmployeeSlice";


function ViewEmployeeinformation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation()?.state
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { view_single_employee } = useSelector((state) => state?.employee);

  const acq = view_single_employee?.responseObject;
  console.log(location)
 
  const submit = (e) => {
    console.log(e);
  };
  

  useEffect(() => {
    dispatch(ViewSingleEmployee(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout title={"Employee Information"} hasBack={true}>
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
                    {acq?.status}
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
              Personal <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>First name:</p>
                  <h4>{acq?.firstName}</h4>
                </div>
                <div>
                  <p>Last name:</p>
                  <h4>{acq?.surname}</h4>
                </div>
                <div>
                  <p>Other Name:</p>
                  <h4>{acq?.otherName}</h4>
                </div>
              </div>

              <div>
                <div>
                  <p>Title:</p>
                  <h4>{acq?.title}</h4>
                </div>
                <div>
                  <p>Date of Birth:</p>
                  <h4>{FormatDateTime(acq?.dateOfBirth)}</h4>
                </div>
                <div>
                  <p>Phone number:</p>
                  <h4>{acq?.phoneNumber}</h4>
                </div>
              
              </div>
              <div>
                <div>
                  <p>Religion:</p>
                  <h4>{acq?.religion}</h4>
                </div>
                <div>
                  <p>Personal Email:</p>
                  <h4>{acq?.personalEmail}</h4>
                </div>
                <div>
                  <p>Blood Group:</p>
                  <h4>{acq?.bloodGroup}</h4>
                </div>
              
              </div>
              <div>
                <div>
                  <p>Gender:</p>
                  <h4>{acq?.gender}</h4>
                </div>
                <div>
                  <p>partners work Place:</p>
                  <h4>{acq?.partnerPlaceOfWork}</h4>
                </div>
                <div>
                  <p>State of Origin:</p>
                  <h4>{acq?.stateOfOrigin || '-'}</h4>
                </div>
              
              </div>

              <div>
                <div>
                  <p>LGA:</p>
                  <h4>{acq?.lgaOfOrigin|| '-'}</h4>
                </div>
                <div>
                  <p>Nationality:</p>
                  <h4>{acq?.nationality|| '-'}</h4>
                </div>
              
              
              </div>


            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Bank <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Account Name:</p>
                  <h4>{acq?.accountName}</h4>
                </div>
                <div>
                  <p>Account Number :</p>
                  <h4>{acq?.accountNumber}</h4>
                </div>
                <div>
                  <p>Bank :</p>
                  <h4>{acq?.bank || '-'}</h4>
                </div>

                
              
              </div>
              

            


            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Work <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Date of Employment:</p>
                  <h4>{FormatDateTime(acq?.dateOFEmployment)}</h4>
                </div>
                <div>
                  <p>Confirmation Date :</p>
                  <h4>{FormatDateTime(acq?.dateComfirmed)}</h4>
                </div>
                <div>
                  <p>Last promotion Date :</p>
                  <h4>{FormatDateTime(acq?.lastPromotionDate)}</h4>
                </div>
              
              </div>

              <div>
                <div>
                  <p>PIN:</p>
                  <h4>{acq?.pin}</h4>
                </div>
                <div>
                  <p>Level :</p>
                  <h4>{acq?.level}</h4>
                </div>
                <div>
                  <p>Departmet :</p>
                  <h4>{acq?.departmentName || '-'}</h4>
                </div>              
              
              </div>
              

            


            </div>
          </section>
        
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewEmployeeinformation;
