import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import {  useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { GetSingleOvertime } from "../../../../../utils/redux/HR/HRSlice";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import {ApproveOvertimeRequest ,DeclineOvertimeRequest, GetAllOvertimeRequisition } from '../../../../../utils/redux/HR/HRSlice';
import { PageActions } from "../../../Components/Misc/Actions";
import ApprovalData from "../ApprovalConstants/data"



function ViewOvertimeManagement() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { get_single_overtime } = useSelector((state) => state?.hr);
 

  const acq = get_single_overtime?.responseObject;
  const submit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    dispatch(GetSingleOvertime(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { openModal, closeModal } = useApprovals({});
  return (
    <PageLayout title={"Overtime Details"} hasBack={true}>
   
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
               {
                name: "Approve Overtime ",
                action: () => {
                  openModal({
                    type: "suspend",
                    details: {
                      button: {
                        name: "Yes, Approve",
                        color: "",
                      },
                      commentIsOptional: false,
                      sendIsOptional: true,
                      title: "Approve Request",
                      submitData: (data) => {
                        dispatch(
                          ApproveOvertimeRequest({
                            comment: data?.comments,
                            requisitionId:id,
                            approvalType:ApprovalData?.ApprovedByHR,   
                          })
                        )?.then((res) => {
                            //console.log(res)
                          closeModal();
                          dispatch(GetSingleOvertime(id));
                        });
                      },
                    },
                  });
                 
                },
              },
              {
                name: "Decline Overtime",
                action: () => {
                  openModal({
                    type: "suspend",
                    details: {
                      button: {
                        name: "Yes, Decline",
                        color: "red",
                      },
                      commentIsOptional: true,
                      sendIsOptional: true,
                      title: "Decline Request",
                      submitData: (data) => {
                        dispatch(
                          DeclineOvertimeRequest({
                            comment: data?.comments,
                            requisitionId:id,
                            rejectionType:ApprovalData?.RejectedByHR

            
                          
                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetSingleOvertime(id));
                        });
                      },
                    },
                  });
                  // setIsOpen(!isOpen);
                  // setModalValue("decline");
                },
              },  
              
              {
                name: "Approve By Overtime Approver ",
                action: () => {
                  openModal({
                    type: "suspend",
                    details: {
                      button: {
                        name: "Yes, Approve",
                        color: "",
                      },
                      commentIsOptional: false,
                      sendIsOptional: true,
                      title: "Approve Request",
                      submitData: (data) => {
                        console.log(data)

                        dispatch(
                          ApproveOvertimeRequest({
                            comment: data?.comments,
                            requisitionId:id,
                            approvalType:ApprovalData?.Approved,   
                          })
                        )?.then((res) => {
                            console.log(res)
                          closeModal();
                          dispatch(GetSingleOvertime(id));
                        });
                      },
                    },
                  });
                 
                },
              },
              {
                name: "Decline By Overtime Approver",
                action: () => {
                  openModal({
                    type: "suspend",
                    details: {
                      button: {
                        name: "Yes, Decline",
                        color: "red",
                      },
                      commentIsOptional: true,
                      sendIsOptional: true,
                      title: "Decline Request",
                      submitData: (data) => {
                        console.log(data)

                        dispatch(
                          DeclineOvertimeRequest({
                            comment: data?.comments,
                            requisitionId:id,
                            rejectionType:ApprovalData?.Declined

            
                          
                          })
                        )?.then((res) => {
                          console.log(res)

                          closeModal();
                          dispatch(GetAllOvertimeRequisition(id));
                        });
                      },
                    },
                  });
               
                },
              }, 
          
          ]}
        </PageActions>
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
              Overtime <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Overtime Type:</p>
                  <h4>{acq?.overtimeType}</h4>
                </div>
                <div>
                  <p>Assignment:</p>
                  <h4>{acq?.assignment}</h4>
                </div>
                <div>
                  <p>Amount:</p>
                  <h4>{FormatCurrency(acq?.amount)}{}</h4>
                </div>
              </div>

              <div>
                <div>
                  <p>Number of hours:</p>
                  <h4>{acq?.numberOfHours}</h4>
                </div>
                <div>
                  <p>Overtime Date:</p>
                  <h4>{FormatDateTime(acq?.overtimeDate)}</h4>
                </div>
              
              </div>

            </div>
          </section>
        
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewOvertimeManagement;
