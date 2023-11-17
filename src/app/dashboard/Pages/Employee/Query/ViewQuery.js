import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { CreateQueryComment, GetSingleQuery,GetSingleQueryResponse } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { PageActions } from "../../../Components/Misc/Actions";

function ViewQuery() {
  const { id } = useParams()
  const { get_singlequery} = useSelector((state) => state?.employee);

  const dispatch = useDispatch();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;
  const acq = get_singlequery?.responseObject;
  console.log(acq)

  const queryReplyId = acq?.queryReply?.id
 
  console.log(acq)



  const submit = (e) => {};
  useEffect(() => {
    if(id !== undefined){
      dispatch(GetSingleQuery(id));
    }

    if(queryReplyId !== undefined){
      dispatch(GetSingleQueryResponse(queryReplyId))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, queryReplyId]);

  const { openModal, closeModal } = useApprovals({ isLoading: true });

  return (

  //TO DO: show action button based on who is logged in
    <PageLayout title={"Query Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        
        {  acq?.queryReply !== null ? ( <PageActions>
          {[
            {
              name: "Add comment",
              action: () => {
                openModal({              
                  details: {
                    button: {
                      name: "Submit",
                      color: "",
                    },
                    commentIsOptional: false,
                      sendIsOptional: true,
                    submitData: (data) => {
                      const payload = {
                        queryReplyId:+queryReplyId,
                        comment: data?.comments
                      }
                     
                      dispatch(
                        CreateQueryComment(payload)
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetSingleQueryResponse(id));
                        }
                      });
                    },
                  },
                });
              },
            },


            // {
            //   name: "Decline Requisition",
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
            //             DeclineConsummableRequisition({
            //               consumableRequistionId: +id,
            //               comment: data?.comments,
            //               emailTrigger: data?.send,
            //             })
            //           ).then((res) => {
            //             if (res?.payload?.successful === true) {
            //               closeModal();
            //               dispatch(GetSingleConsummableRequisition(id));
            //             }
            //           });
            //         },
            //       },
            //     });
            //   },
            //   permissions: DEFINED_PERMISSIONS.ConsumableRequisitionApprove,
            // },
          ]}
        </PageActions>):('')
        }
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

              <div>
                <div>
                  <p> Offence Date:</p>
                  <h4>{FormatDateTime(acq?.offenceCommittedDate)}</h4>
                </div>
                <div>
                  <p>Employee Name:</p>
                  <h4>{acq?.initiationType}</h4>
                </div>
                <div>
                  <p>Query Type:</p>
                  <h4>{acq?.queryType?.title}</h4>
                </div>
              </div>
            </div>
          </section>

      
          {acq?.queryReply !== null? (
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
          {/* To do--- use permision to hide button  */}
          
          <div className={DashboardStyle.button_cage}>
            {/* <SupportButtons
              width={"auto"}
              onClick={() => navigate(`../../../${URL.HR}/${URL.Query_Management}/${acq?.id}/${'add-comment'}`)}
              className={DashboardStyle?.button_cage_weight}
            >
              Input Comment
            </SupportButtons> */}
            </div>
          </div>
          

          // Query-Management/15/add-comment
          
          
          
          ) : ( '')}

          {/* {queryResponse !== null?(

          ):('') } */}
         
       
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewQuery;

