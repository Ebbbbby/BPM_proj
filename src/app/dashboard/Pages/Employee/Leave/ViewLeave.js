import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { PageActions } from "../../../Components/Misc/Actions";
import { useNavigate } from "react-router";
import { GetSingleLeaveRequest } from "../../../../../utils/redux/HR/HRSlice";

const ViewLeave = () => {
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;
  const submit = (e) => {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { get_request } = useSelector((state) => state?.hr);
  const request = get_request?.responseObject;

  //console.log(request);

  const { id } = useParams();

  useEffect(() => {
    dispatch(GetSingleLeaveRequest(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PageLayout title={"View Leave Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        {request?.leaveStatus === "Awaiting" ||
        request?.approvalStatus === "Pending" ? (
          <PageActions>
            {[
              {
                name: "Edit Requisition",
                action: () => navigate(`../${id}/edit`, { state: request }),
              },
            ]}
          </PageActions>
        ) : (
          ""
        )}
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
                        request?.approvalStatus === "Pending"
                          ? "#815103"
                          : request?.approvalStatus === "ApprovedByHOD"
                          ? "#0F6308"
                          : request?.approvalStatus === "RejectedByHOD"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {request?.approvalStatus}
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
                  <h4>
                    {request?.durationValue > 1
                      ? `${request?.durationValue} Days`
                      : `${request?.durationValue} Day`}
                  </h4>
                </div>
                <div>
                  <p>Leave Reason:</p>
                  <h4>{request?.reason}</h4>
                </div>
                <div>
                  <p>Leave Status:</p>
                  <span
                    style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      borderRadius: "1rem",
                      fontSize: "0.875rem",
                      backgroundColor:
                        request?.leaveStatus === "Awaiting"
                          ? "#8DE9FF"
                          : request?.leaveStatus === "OnLeave"
                          ? "#DCFFC9"
                          : request?.leaveStatus === "Back"
                          ? "#005BD4"
                          : request?.leaveStatus === "Recalled"
                          ? "#FFFF"
                          : "",
                      color:
                        request?.leaveStatus === "Awaiting"
                          ? "#FFFFf"
                          : request?.leaveStatus === "OnLeave"
                          ? "#0F6308"
                          : request?.leaveStatus === "Back"
                          ? "#FFFF"
                          : request?.leaveStatus === "Recalled"
                          ? "#FF8D8D"
                          : "",
                    }}
                  >
                    {" "}
                    {request?.leaveStatus}
                  </span>
                </div>
              </div>
            </div>
          </section>
          {request?.leaveRecalls?.length !== 0 ? (
            <section className={DashboardStyle.form_section}>
              <h4 className={DashboardStyle.form_section_title}>
                Recall
                <br /> Information
              </h4>
              <div className={DashboardStyle.labels_group}>
                {request &&
                  request?.leaveRecalls?.map((recall) => (
                    <div>
                      <div>
                        <p>Approval Status:</p>
                        <h4>{request?.approvalStatus}</h4>
                      </div>

                      <div>
                        <p>Recall Duraton Value:</p>
                        <h4>
                          {" "}
                          {recall?.durationValue > 1
                            ? `${recall?.durationValue} Days`
                            : `${recall?.durationValue} Day`}
                        </h4>
                      </div>
                      <div>
                        <p>Start Date</p>
                        <h4>{FormatDateTime(recall?.startDate)}</h4>
                      </div>
                      <div>
                        <p>End Date:</p>
                        <h4>{FormatDateTime(recall?.endDate)}</h4>
                      </div>
                      <div>
                        <p>Recall Reason:</p>
                        <h4>{recall?.reason}</h4>
                      </div>
                      <div>
                        <p>Approval Status:</p>

                        <h4>
                          <span
                            style={{
                              textAlign: "center",
                              padding: "0.5rem",
                              borderRadius: "1rem",
                              fontSize: "0.875rem",
                              backgroundColor:
                                recall.approvalStatus === "Pending"
                                  ? "#FFF1CF"
                                  : recall.approvalStatus === "Approved"
                                  ? "#DCFFC9"
                                  : recall.approvalStatus === "ApprovedByHR"
                                  ? "#DCFFC9"
                                  : recall?.approvalStatus === "RejectedByHR"
                                  ? "#FBE6E7"
                                  : recall.approvalStatus === "Cancelled"
                                  ? "#FFF1e4"
                                  : recall.approvalStatus === "Declined"
                                  ? "#FBE6E7"
                                  : "",
                              color:
                                recall.approvalStatus === "Pending"
                                  ? "#815103"
                                  : recall.approvalStatus === "Approved"
                                  ? "#0F6308"
                                  : recall.approvalStatus === "ApprovedByHR"
                                  ? "#0F6308"
                                  : recall.approvalStatus === "RejectedByHR"
                                  ? "#815103"
                                  : recall.approvalStatus === "Cancelled"
                                  ? "815123"
                                  : recall.approvalStatus === "Declined"
                                  ? "#8A002B"
                                  : "",
                            }}
                          >
                            {recall?.approvalStatus}{" "}
                          </span>
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ) : (
            ""
          )}
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
};

export default ViewLeave;
