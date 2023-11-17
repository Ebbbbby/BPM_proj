import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { GetSingleRecallRequest } from "../../../../../utils/redux/HR/HRSlice";

const ViewLeave = () => {

  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;
  const submit = (e) => {};

  const dispatch = useDispatch();
  const getRequest = useSelector((state) => state?.hr);
  const { get_recall } = getRequest;
  const request = get_recall?.responseObject;
  console.log(request)

  const {id} = useParams() 
  useEffect(()=>{
  dispatch(GetSingleRecallRequest(id))
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])
 

  
  return (
    <PageLayout title={"View Recall Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}></div>
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
                    <h4>{request?.initiatorName}</h4>
                  </div>
                </div>
               
                <div
                  style={{
                    display: "flex",
                    marginBottom: "0.8rem",
                    gap: "0.6rem",
                    alignItems: "center",
                  }}
                >
                  <p style={{ marginBottom: "0px" }}>Date Created:</p>
                  <h4>{FormatDateTime(request?.createdDate)}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>3</h4>
                </div>
                <div>
                  <p>Process Status</p>
                  <h4
                  style={{
                    color:
                      request?.approvalStatus
                      === "Pending"
                        ? "#815103"
                        : request?.approvalStatus
                        === "Approved"
                        ? "#0F6308"
                        : request?.approvalStatus
                        === "Declined"
                        ? "#8A002B"
                        : "",
                  }}
                  >{request?.approvalStatus}
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
          {/* <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Personal
              <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Full Name:</p>
                  <h4>Ayodeji Bolanle</h4>
                </div>
                <div>
                  <p>Department:</p>
                  <h4>IT</h4>
                </div>
                <div>
                  <p>Position</p>
                  <h4>Software Developer</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Employment Date</p>
                  <h4>23-02-2012</h4>
                </div>
                <div>
                  <p>Confirmation Date</p>
                  <h4>23-08-2012</h4>
                </div>
              </div>
            </div>
          </section> */}
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Leave
              <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Leave Type:</p>
                  <h4>{request?.leaveTypeName}</h4>
                </div>
                <div>
                  <p>Start Date</p>
                  <h4>{FormatDateTime(request?.startDate)}</h4>
                </div>
                <div>
                  <p>End Date:</p>
                  <h4>{FormatDateTime(request?.endDate)}</h4>
                </div>
              </div>
              <div>
              <div>
                  <p>Duration Value:</p>
                  <h4>{request?.durationValue > 1
                        ? `${request?.durationValue} Days`
                        : `${request?.durationValue} Day`}
                    </h4>
                </div>
                <div>
                  <p>Leave Reason:</p>
                  <h4>{request?.reason}</h4>
                </div>
                <div>
                  <p>Department:</p>
                  <h4>{request?.deparmentName}</h4>
                </div>
              </div>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
 };

export default ViewLeave;
