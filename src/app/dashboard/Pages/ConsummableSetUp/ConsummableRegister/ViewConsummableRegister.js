import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { PageActions } from "../../../Components/Misc/Actions";

// import { GetConsumableSubClass } from "../../../../../utils/redux/ConsumableSetUp/ConsumableSetUpSlice";
import {
  ApproveConsummableSingleRegister,
  DeclineConsummableSingleRegister,
  DeleteConsummableSingleRegister,
  GetConsummableSingleRegister,
} from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewConsumableRegister() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { Consummable_register } = useSelector((x) => x?.consummableSetUp);

  const acq = Consummable_register?.responseObject;

  const submit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    dispatch(GetConsummableSingleRegister(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cat_status = acq?.status;
  const { openModal, closeModal } = useApprovals({ isLoading: true });
  return (
    <PageLayout title={"Consumable Register Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Edit Consummable Details",
              action: () => navigate(`../${id}/edit`, { state: acq }),
              condition: cat_status === "Approved" ? false : true,
              permissions: DEFINED_PERMISSIONS.ConsumableAdd,
            },
            {
              name: "Approve Consumable",
              condition:
                cat_status === "Approved" || cat_status === "Declined"
                  ? false
                  : true,
              permissions: DEFINED_PERMISSIONS?.ConsumableApprove,
              action: () => {
                openModal({
                  type: "",
                  details: {
                    button: {
                      name: "Yes, Approve",
                      color: "",
                    },
                    sendIsOptional: true,
                    commentIsOptional: false,
                    title: "Approve Consumable",
                    submitData: (data) => {
                      dispatch(
                        ApproveConsummableSingleRegister({
                          ConsumableId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetConsummableSingleRegister(id));
                        }
                      });
                    },
                  },
                });
              },
            },

            {
              name: "Decline Consumable",
              condition:
                cat_status === "Approved" || cat_status === "Declined"
                  ? false
                  : true,
              permissions: DEFINED_PERMISSIONS?.ConsumableApprove,
              action: () => {
                openModal({
                  type: "Consumable",
                  details: {
                    button: {
                      name: "Yes, Decline",
                      color: "red",
                    },
                    sendIsOptional: true,
                    commentIsOptional: true,
                    title: "Decline Consumable",
                    submitData: (data) => {
                      dispatch(
                        DeclineConsummableSingleRegister({
                          ConsumableId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetConsummableSingleRegister(id));
                        }
                      });
                    },
                  },
                });
              },
            },

            {
              name: "Delete Consumable Register",
              permissions: DEFINED_PERMISSIONS?.ConsumableApprove,
              condition:
                cat_status === "Initiated" || cat_status === "Declined"
                  ? true
                  : false,
              action: () => {
                openModal({
                  type: "Consumable",
                  details: {
                    button: {
                      name: "Delete",
                      color: "red",
                    },
                    isDelete: true,
                    isDeleteHero: "",
                    isDeleteSupport:
                      "Are you sure you want to delete this Consumable register? This action cannot be undone.",
                    title: "Delete Consumable Register",
                    submitData: (data) => {
                      dispatch(
                        DeleteConsummableSingleRegister({
                          ConsumableId: +id,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetConsummableSingleRegister(id));
                        }
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
                    <h4>{acq?.lastReviewed?.lastReviewedBy}</h4>
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
                      {FormatDateTime(acq?.lastReviewed?.lastReveiwedByDate)}
                    </h4>
                  </div>
                </div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{acq?.levelsOfApproval}</h4>
                </div>
              </div>
              <div>
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
              Register Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Name:</p>
                  <h4>{acq?.itemName}</h4>
                </div>
                <div>
                  <p>Specification:</p>
                  <h4>{acq?.specification || "-"}</h4>
                </div>
                <div>
                  <p>Threshold:</p>
                  <h4>{acq?.threshold || "-"}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Category Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Category Name:</p>
                  <h4>{acq?.category}</h4>
                </div>
                <div>
                  <p>Category Description:</p>
                  <h4>{acq?.specification}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Class Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Class Name:</p>
                  <h4>{acq?.class}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Sub Class Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Sub Class Name:</p>
                  <h4>{acq?.consumableSubClass}</h4>
                </div>
              </div>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewConsumableRegister;
