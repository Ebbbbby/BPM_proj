import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { ApprovePanelReport, RejectPanelReport,GetSingleQueryManagement } from "../../../../../utils/redux/HR/HRSlice";

import { PageActions } from "../../../Components/Misc/Actions";

function ViewAllQueryManagement() {
  const { id } = useParams();
  const location = useLocation()?.state;
  const { single_query_management } = useSelector((state) => state?.hr);
  console.log(location)

  const dispatch = useDispatch();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;
  const acq = single_query_management?.responseObject;
  console.log(acq)

  const submit = (e) => {};
  useEffect(() => {
    dispatch(GetSingleQueryManagement(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });

  return (
    // ToDo--- show button based on permission .Ed should see button
    <PageLayout title={"All Query Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        { <PageActions>
          {[
            

            {
              name: "Approve Panel Report",
              action: () => {
                openModal({
                  type: "Requisition",
                  details: {
                    button: {
                      name: "Yes, Approve",
                      color: "",
                    },
                    title: "Approve  Panel Report",
                    sendIsOptional: true,
                    submitData: (data) => {
                     
                      dispatch(ApprovePanelReport({
                        queryManagementId: +id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetSingleQueryManagement(id));
                        }
                      });
                    },
                  },
                });
              },
            },
            {
              name: "Reject Panel Report",
              action: () => {
                openModal({
                  type: "Requisition",
                  details: {
                    button: {
                      name: "Yes, Decline",
                      color: "red",
                    },
                    title: "Reject Panel Report",
                    sendIsOptional: true,
                    submitData: (data) => {
                        // console.log(data)
                        // return
                      dispatch(RejectPanelReport ({
                        queryManagementId: +id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetSingleQueryManagement(id));
                        }
                      });
                    },
                  },
                });
              },
            },
          ]}
        </PageActions> }
      </div>
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
                    <h4>{FormatDateTime(acq?.createdDate, "ll")}</h4>
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
                    <h4>{FormatDateTime(acq?.createdDate, "ll")}</h4>
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
                    <h4>{acq?.lastReveiwed?.lastReviewedBy}</h4>
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
                      {FormatDateTime(acq?.lastReveiwed?.lastReveiwedByDate)}
                    </h4>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{acq?.levelsOfApproval}</h4>
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
              Query Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p> Subject:</p>
                  <h4>{acq?.query?.title}</h4>
                </div>
                <div>
                  <p>Body:</p>
                  <h4>{acq?.query?.queryContent}</h4>
                </div>
                <div>
                  <p>Query Date:</p>
                  <h4>{FormatDateTime(acq?.query?.queryDate)}</h4>
                </div>
              </div>
            </div>
          </section>
   
        
            <section className={DashboardStyle.form_section}>
              <h4 className={DashboardStyle.form_section_title}>Decision</h4>
              <div className={DashboardStyle.labels_group}>
                <div>
                  <div>
                    <p>Query Panel:</p>
                    {acq?.hrComment === null ? (
                      acq?.queryPanels?.map((item) => (
                        <li style={{listStyle:'none'}}>
                          {item?.employee?.firstName +
                            " " +
                            item?.employee?.otherName +
                            " " +
                            item?.employee?.surname}
                        </li>
                      ))
                    ) : (
                      <h4>{acq?.hrComment }</h4>
                    )}
                  </div>
                  <div>
                  <p> Recommendation:</p>
                  <h4>{acq?.recommendation}</h4>
                </div>
                <div>
                  <p> Employee Name:</p>
                  <h4>{acq?.query?.initiationType}</h4>
                </div>
                </div>
              </div>
            </section>
            {console.log(acq?.hrComment)} *

              {/* To Do: Hide button based on permission */}
          
        
            {/* <div className={DashboardStyle.button_cage}>
            <SupportButtons
              width={"auto"}
              onClick={() => navigate(`../${acq?.id}/${'add-comment'}`)}
              className={DashboardStyle?.button_cage_weight}
            >
              Comment/Close
            </SupportButtons>
            <ActionButtons
              width={"auto"}
              onClick={() => navigate(`../${acq?.id}/${URL.Add_Panel}`)}
              className={DashboardStyle?.button_cage_weight}
            >
              Setup Query Panel
            </ActionButtons>
          </div>  */}
 
          
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewAllQueryManagement;
