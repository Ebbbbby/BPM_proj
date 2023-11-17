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
import { PageActions } from "../../../Components/Misc/Actions";
import {
  ApproveConsummableRequisition,
  DeclineConsummableRequisition,
  GetSingleConsummableRequisition,
} from "../../../../../utils/redux/Consumables/ConsumablesSlice";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewConsumableRequisition() {
  const { id } = useParams();
  const { requisition } = useSelector((state) => state?.consumable);
  const dispatch = useDispatch();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;
  const acq = requisition?.responseObject;

  const submit = (e) => {};
  useEffect(() => {
    dispatch(GetSingleConsummableRequisition(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });

  return (
    <PageLayout title={"Consumables Requisition Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Approve Requisition",
              action: () => {
                openModal({
                  type: "",
                  details: {
                    button: {
                      name: "Yes, Approve",
                      color: "",
                    },
                    title: "Approve Requisition",
                    submitData: (data) => {
                      dispatch(
                        ApproveConsummableRequisition({
                          consumableRequistionId: +id,
                          comment: data?.comments,
                          emailTrigger: data?.send,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetSingleConsummableRequisition(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.ConsumableRequisitionApprove,
            },

            {
              name: "Decline Requisition",
              action: () => {
                openModal({
                  type: "Requisition",
                  details: {
                    button: {
                      name: "Yes, Decline",
                      color: "red",
                    },
                    title: "Decline Account",
                    submitData: (data) => {
                      dispatch(
                        DeclineConsummableRequisition({
                          consumableRequistionId: +id,
                          comment: data?.comments,
                          emailTrigger: data?.send,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetSingleConsummableRequisition(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.ConsumableRequisitionApprove,
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
                  <p>Process Status</p>
                  <h4
                    style={{
                      color:
                        acq?.status === "Initiated"
                          ? "#815103"
                          : acq?.status === "Approved"
                          ? "#0F6308"
                          : acq?.status === "Declined"
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
              Consumable Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Consumable Name:</p>
                  <h4>{acq?.consumableName}</h4>
                </div>
                <div>
                  <p>Quantity:</p>
                  <h4>{acq?.quantity}</h4>
                </div>
                <div>
                  <p>Description:</p>
                  <h4>{acq?.description}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Requisition Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Initiator:</p>
                  <h4>{acq?.initiatorName}</h4>
                </div>
                <div>
                  <p>Requestor:</p>
                  <h4>{acq?.requestor}</h4>
                </div>
                <div>
                  <p>Requested For:</p>
                  <h4>{acq?.requestedFor}</h4>
                </div>
              </div>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewConsumableRequisition;
