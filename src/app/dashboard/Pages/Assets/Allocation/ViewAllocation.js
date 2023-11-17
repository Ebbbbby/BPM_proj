import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveAsset_Allocation,
  DeclineAsset_Allocation,
  GetAllocationSingle_Asset,
} from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { PageActions } from "../../../Components/Misc/Actions";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewAcquisition() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { asset_allocation } = useSelector((state) => state?.assets);
  const acq = asset_allocation?.responseObject;

  const submit = (e) => {};
  useEffect(() => {
    dispatch(GetAllocationSingle_Asset(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });
  return (
    <PageLayout title={"Asset Allocation Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            // {
            //   name: "Setup Account",
            //   action: () => navigate("/"),
            // },
            {
              name: "Edit Details",
              action: () => navigate(`../add`, { state: acq }),
              permissions: DEFINED_PERMISSIONS.AssetAllocationAdd,
            },
            {
              name: "Approve Allocation",
              action: () => {
                openModal({
                  type: "",
                  details: {
                    button: {
                      name: "Yes, Approve",
                      color: "",
                    },
                    title: "Approve Allocation",
                    submitData: (data) => {
                      console.log({ data });
                      dispatch(
                        ApproveAsset_Allocation({
                          assetAllocateId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          dispatch(GetAllocationSingle_Asset(id));
                          closeModal();
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.AssetAllocationApprove,
            },

            {
              name: "Decline Allocation",
              action: () => {
                openModal({
                  type: "Allocation",
                  details: {
                    button: {
                      name: "Yes, Decline",
                      color: "red",
                    },
                    title: "Decline Allocation",
                    submitData: (data) => {
                      dispatch(
                        DeclineAsset_Allocation({
                          assetAllocateId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          dispatch(GetAllocationSingle_Asset(id));
                          closeModal();
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.AssetAllocationApprove,
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
                    <h4>{acq?.initiatedBy}</h4>
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
                    <h4>{acq?.initiatedBy}</h4>
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
                    <h4>{FormatDateTime(acq?.lastModified)}</h4>
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
              Asset Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Asset Name:</p>
                  <h4>{acq?.assetName}</h4>
                </div>
                <div>
                  <p>Requisition Details:</p>
                  <h4>{acq?.requisitionDetails}</h4>
                </div>
                <div>
                  <p>Requisition Date:</p>
                  <h4>{FormatDateTime(acq?.requisitionDate, "ll")}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Start time of asset usage:</p>
                  <h4>{FormatDateTime(acq?.startTimeOfAssetUsage, "ll")}</h4>
                </div>
                <div>
                  <p>Lapse time for asset usage:</p>
                  <h4>{FormatDateTime(acq?.lapseTimeOfAssetUsage, "ll")}</h4>
                </div>
                <div>
                  <p>Source Location of Asset:</p>
                  <h4>{acq?.assetLocationSource}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Depreciations:</p>
                  <h4>{acq?.depreciation || "N/A"}</h4>
                </div>
                <div>
                  <p>Warranty:</p>
                  <h4>{acq?.warranty}</h4>
                </div>
                <div>
                  <p>NVB:</p>
                  <h4>{acq?.nvb}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Assigned Status:</p>
                  <h4>{acq?.assignStatus || "N/A"}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Allocation Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Quantity:</p>
                  <h4>{acq?.quantity}</h4>
                </div>
                <div>
                  <p>Purpose:</p>
                  <h4>{acq?.purpose}</h4>
                </div>
                <div>
                  <p>Destination Location of Asset:</p>
                  <h4>{acq?.assetLocationDestination}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Initiated By:</p>
                  <h4>{acq?.initiatedBy}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Monitoring <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Recurring Reminder Date:</p>
                  <h4>{FormatDateTime(acq?.reminderDate, "ll")}</h4>
                </div>
                <div>
                  <p>Duration:</p>
                  <h4>{acq?.duration}</h4>
                </div>
              </div>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewAcquisition;
