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
  ApproveMaintenanceRequest,
  CancelMaintenanceRequest,
  DeclineMaintenanceRequest,
  GetCentralRepositoryDocuments,
  GetVehicleMaintenance,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { MaintenanceStatus } from "../../../../../utils/const/VehicleMaintenanceConst";
import { useApprovals } from "./useApprovals";

function ViewMaintenanceRequisition() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { repo_document, maintenance_req } = useSelector(
    (state) => state?.fleet
  );
  const req = maintenance_req?.responseObject;

  const submit = (e) => {};

  useEffect(() => {
    dispatch(GetVehicleMaintenance(id));
    dispatch(
      GetCentralRepositoryDocuments({
        recordId: id || "",
        category: 2,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });
  const isApproved = req?.maintenanceStatus === 1 ? true : false;
  const isDeclined = req?.maintenanceStatus === 3 ? true : false;
  const isCanceled = req?.maintenanceStatus === 4 ? true : false;
  return (
    <PageLayout title={"Maintenance Request Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        {isDeclined ? (
          <PageActions>
            {[
              {
                name: "Edit Maintenance Requisition",
                action: () => navigate(`../${id}/edit`, { state: req }),
              },
            ]}
          </PageActions>
        ) : isApproved || isCanceled ? (
          <></>
        ) : (
          <PageActions>
            {[
              {
                name: "Edit Maintenance Requisition",
                action: () => navigate(`../${id}/edit`, { state: req }),
              },
              {
                name: "Approve Maintenance Requisition",
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
                          ApproveMaintenanceRequest({
                            uuId: id,
                            comment: data?.comments,
                          })
                        ).then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            dispatch(GetVehicleMaintenance(id));
                          }
                        });
                      },
                    },
                  });
                },
              },
              {
                name: "Decline Maintenance Requisition",
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
                          DeclineMaintenanceRequest({
                            uuId: id,
                            comment: data?.comments,
                          })
                        ).then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            dispatch(GetVehicleMaintenance(id));
                          }
                        });
                      },
                    },
                  });
                },
              },
              {
                name: "Cancel aintenance Requisition",
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
                          CancelMaintenanceRequest({
                            uuId: id,
                            comment: data?.comments,
                          })
                        ).then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            dispatch(GetVehicleMaintenance(id));
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
                    <h4>{req?.initiatorName}</h4>
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
                    <h4>{FormatDateTime(req?.createdDate, "ll")}</h4>
                  </div>
                </div>
                <div>
                  <div>
                    <p>Process Type:</p>
                    <h4>Maintenance Requisition</h4>
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
                    <h4>{req?.lastReveiwed?.lastReviewedBy}</h4>
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
                      {FormatDateTime(req?.lastReveiwed?.lastReveiwedByDate)}
                    </h4>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{req?.levelsOfApproval}</h4>
                </div>
                <div>
                  <p>Process Status</p>
                  <h4
                    style={{
                      color:
                        Object.keys(MaintenanceStatus).find(
                          (key) =>
                            MaintenanceStatus[key] === req?.maintenanceStatus
                        ) === "Initiated"
                          ? "#815103"
                          : Object.keys(MaintenanceStatus).find(
                              (key) =>
                                MaintenanceStatus[key] ===
                                req?.maintenanceStatus
                            ) === "Approved"
                          ? "#0F6308"
                          : Object.keys(MaintenanceStatus).find(
                              (key) =>
                                MaintenanceStatus[key] ===
                                req?.maintenanceStatus
                            ) === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {Object.keys(MaintenanceStatus).find(
                      (key) => MaintenanceStatus[key] === req?.maintenanceStatus
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
              Maintenance Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Maintenance Type:</p>
                  <h4>{req?.maintenanceType}</h4>
                </div>
                <div>
                  <p>Component:</p>
                  <h4>{req?.componentName}</h4>
                </div>
                <div>
                  <p>Vehicle Name:</p>
                  <h4>{req?.assetName}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Other <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Vendor Name:</p>
                  <h4>{req?.vendorName}</h4>
                </div>
                <div>
                  <p>Requestor:</p>
                  <h4>{req?.requestorName}</h4>
                </div>
                <div>
                  <p>Maintenance Date:</p>
                  <h4>{FormatDateTime(req?.maintenanceDate, "ll")}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Purpose:</p>
                  <h4>{req?.purpose}</h4>
                </div>
                <div>
                  <p>Amount:</p>
                  <h4>{req?.amount}</h4>
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
                  <h4>{req?.other || "Nil"}</h4>
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

export default ViewMaintenanceRequisition;
