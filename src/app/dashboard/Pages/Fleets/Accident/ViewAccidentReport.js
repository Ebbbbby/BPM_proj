import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import {
  ApproveAccidentReport,
  CancelAccidentReport,
  DeclineAccidentReport,
  GetAccidentReport,
  GetCentralRepositoryDocuments,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { ApprovalStatus } from "../../../../../utils/const/AccidentReportConst";
import { useApprovals } from "./useApprovals";

function ViewAccidentReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { repo_document, accident_report } = useSelector(
    (state) => state?.fleet
  );
  const report = accident_report?.responseObject;

  const submit = (e) => {};

  useEffect(() => {
    dispatch(GetAccidentReport(id));
    dispatch(
      GetCentralRepositoryDocuments({
        recordId: id || "",
        category: 1,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });
  const isApproved = report?.approvalStatus === 0 ? true : false;
  const isDeclined = report?.approvalStatus === 2 ? true : false;
  const isCanceled = report?.approvalStatus === 3 ? true : false;
  return (
    <PageLayout title={"Accident Report Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        {isDeclined ? (
          <PageActions>
            {[
              {
                name: "Edit Accident Report",
                action: () => navigate(`../${id}/edit`, { state: report }),
              },
            ]}
          </PageActions>
        ) : isApproved || isCanceled ? (
          <></>
        ) : (
          <PageActions>
            {[
              {
                name: "Edit Accident Report",
                action: () => navigate(`../${id}/edit`, { state: report }),
              },
              {
                name: "Approve Accident Report",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Yes, Approve",
                        color: "",
                      },
                      commentIsOptional: false,
                      sendIsOptional: true,
                      title: "Approve",
                      submitData: (data) => {
                        dispatch(
                          ApproveAccidentReport({
                            uuId: id,
                            comment: data?.comments,
                          })
                        ).then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            dispatch(GetAccidentReport(id));
                          }
                        });
                      },
                    },
                  });
                },
              },
              {
                name: "Decline Accident Report",
                action: () => {
                  openModal({
                    type: "Acquisition",
                    details: {
                      button: {
                        name: "Yes, Decline",
                        color: "red",
                      },
                      commentIsOptional: true,
                      sendIsOptional: true,
                      title: "Decline",
                      submitData: (data) => {
                        dispatch(
                          DeclineAccidentReport({
                            uuId: id,
                            comment: data?.comments,
                          })
                        ).then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            dispatch(GetAccidentReport(id));
                          }
                        });
                      },
                    },
                  });
                },
              },
              {
                name: "Cancel Accident Report",
                action: () => {
                  openModal({
                    type: "Acquisition",
                    details: {
                      button: {
                        name: "Yes, Cancel",
                        color: "red",
                      },
                      commentIsOptional: true,
                      sendIsOptional: true,
                      title: "Cancel",
                      submitData: (data) => {
                        dispatch(
                          CancelAccidentReport({
                            uuId: id,
                            comment: data?.comments,
                          })
                        ).then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            dispatch(GetAccidentReport(id));
                          }
                        });
                      },
                    },
                  });
                },
              },
            ]}
          </PageActions>
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
                    <h4>{report?.initiatorName}</h4>
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
                    <h4>{FormatDateTime(report?.createdDate, "ll")}</h4>
                  </div>
                </div>
                <div>
                  <div>
                    <p>Process Type:</p>
                    <h4>Accident Report</h4>
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
                    <h4>{report?.lastReveiwed?.lastReviewedBy}</h4>
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
                    <h4>{FormatDateTime(report?.lastReveiwed?.updatedDate)}</h4>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{report?.levelsOfApproval}</h4>
                </div>
                <div>
                  <p>Process Status</p>
                  <h4
                    style={{
                      color:
                        Object.keys(ApprovalStatus).find(
                          (key) =>
                            ApprovalStatus[key] === report?.approvalStatus
                        ) === "Initiated"
                          ? "#815103"
                          : Object.keys(ApprovalStatus).find(
                              (key) =>
                                ApprovalStatus[key] === report?.approvalStatus
                            ) === "Approved"
                          ? "#0F6308"
                          : Object.keys(ApprovalStatus).find(
                              (key) =>
                                ApprovalStatus[key] === report?.approvalStatus
                            ) === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {Object.keys(ApprovalStatus).find(
                      (key) => ApprovalStatus[key] === report?.approvalStatus
                    )}
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
              Vehicle Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Driver Name:</p>
                  <h4>{report?.driverName}</h4>
                </div>
                <div>
                  <p>Vehicle Name:</p>
                  <h4>{report?.vehicleName}</h4>
                </div>
                <div>
                  <p>Address:</p>
                  <h4>{report?.address}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Insurance:</p>
                  <h4>{report?.insuranceName}</h4>
                </div>
                <div>
                  <p>Date:</p>
                  <h4>{FormatDateTime(report?.accidentDate, "ll")}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Third Party <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Registered Owner Name:</p>
                  <h4>{report?.thirdPartyName}</h4>
                </div>
                <div>
                  <p>Vehicle Name:</p>
                  <h4>{report?.thirdPartyVehicle}</h4>
                </div>
                <div>
                  <p>Plate Number:</p>
                  <h4>{report?.thirdPartyPlateNumber}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Contact Number:</p>
                  <h4>{report?.thirdPartyContact}</h4>
                </div>
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Other:</p>
                  <h4>{report?.other || "N/A"}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Supporting <br /> Documents
            </h4>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
            >
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>File Type</th>
                    <th>Date Uploaded</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {repo_document?.responseObject?.map((x, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{x?.fileName}</td>
                      <td>{x?.fileType}</td>
                      <td>{FormatDateTime(x?.createdDate)}</td>
                      <td>
                        <TableActionsDownload url={x?.fileURL} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewAccidentReport;
