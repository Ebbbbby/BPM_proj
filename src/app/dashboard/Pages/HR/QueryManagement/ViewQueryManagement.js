import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { GetSingleQuery } from "../../../../../utils/redux/HR/HRSlice";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { URL } from "../../../../../utils/routes";
import { PageActions } from "../../../Components/Misc/Actions";

function ViewQueryManagement() {
  const { id } = useParams();
  const location = useLocation()?.state;
  console.log(location)
  const navigate = useNavigate();
  const { single_query } = useSelector((state) => state?.hr);

  const dispatch = useDispatch();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;
  const acq = single_query?.responseObject;
  console.log(location)
  
  console.log(acq,'acq')
  // console.log(location, 'location')
  const submit = (e) => {};
  useEffect(() => {
    dispatch(GetSingleQuery(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <PageLayout title={"Query Management Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        { <PageActions>
          {[
            // {
            //    name: "Edit",
            //   action: () => navigate(`../${id}/editpanel`, { state: acq }),
          
            // },

            // {
            //   name: "Approve Requisition",
            //   action: () => {
            //     openModal({
            //       type: "Requisition",
            //       details: {
            //         button: {
            //           name: "Yes, Decline",
            //           color: "red",
            //         },
            //         title: "Decline Account",
            //         submitData: (data) => {
            //           dispatch(
            //             ({
            //               consumableRequistionId: +id,
            //               comment: data?.comments,
            //               emailTrigger: data?.send,
            //             })
            //           ).then((res) => {
            //             if (res?.payload?.successful === true) {
            //               closeModal();
            //               dispatch(GetSingleQuery(id));
            //             }
            //           });
            //         },
            //       },
            //     });
            //   },
            // },
            // {
            //   name: "Approve Requisition",
            //   action: () => {
            //     openModal({
            //       type: "Requisition",
            //       details: {
            //         button: {
            //           name: "Yes, Decline",
            //           color: "red",
            //         },
            //         title: "Decline Account",
            //         submitData: (data) => {
            //           dispatch(
            //             ({
            //               consumableRequistionId: +id,
            //               comment: data?.comments,
            //               emailTrigger: data?.send,
            //             })
            //           ).then((res) => {
            //             if (res?.payload?.successful === true) {
            //               closeModal();
            //               dispatch(GetSingleQuery(id));
            //             }
            //           });
            //         },
            //       },
            //     });
            //   },
            // },
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
                    <h4>{FormatDateTime(acq?.dateCreated, "ll")}</h4>
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
                    <h4>{FormatDateTime(acq?.dateCreated, "ll")}</h4>
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
                  <h4>{acq?.title}</h4>
                </div>
                <div>
                  <p>Body:</p>
                  <h4>{acq?.queryContent}</h4>
                </div>
                <div>
                  <p>Query Date:</p>
                  <h4>{FormatDateTime(acq?.queryDate)}</h4>
                </div>
              </div>
            </div>
          </section>
   
        
            {/* <section className={DashboardStyle.form_section}>
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
                 
                </div>
              </div>
            </section>
            {console.log(acq?.hrComment)} */}

              {/* To Do: Check for when the hrComment is null */}
          
           {acq?.queryReply !== null ? ( 
            <div>
           <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Response<br/> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Response:</p>
                  <h4>{acq?.queryReply?.response}</h4>
                </div>
                <div>
                  <p>Response Date:</p>
                  <h4>{FormatDateTime(acq?.queryReply?.responseDate)}</h4>
                </div>
              </div>

            </div>
          </section>  
          <div>
<div className={DashboardStyle.button_cage}>
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
            
          </div> 
          </div>
            </div> 

           
           ):('') }
 
          
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewQueryManagement;
