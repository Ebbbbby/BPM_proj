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
import {
  ApproveAssetSingleRegister,
  DeclineAssetSingleRegister,
  DeleteAssetSingleRegister,
  GetAssetSingleRegister,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewAssetRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { asset_register } = useSelector((state) => state?.assetSetUp);

  const acq = asset_register?.responseObject;
  const submit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    dispatch(GetAssetSingleRegister(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cat_status = acq?.assetStatus;

  const { openModal, closeModal } = useApprovals({ isLoading: true });
  return (
    <PageLayout title={"Asset Register Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              condition: cat_status === "Approved" ? false : true,
              name: "Edit Details",
              permissions: DEFINED_PERMISSIONS?.AssetAdd,
              action: () => navigate(`../${id}/edit`, { state: acq }),
            },
            {
              condition:
                cat_status === "Approved" || cat_status === "Declined"
                  ? false
                  : true,
              permissions: DEFINED_PERMISSIONS?.AssetApproval,
              name: "Approve Asset",
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
                    title: "Approve Asset",
                    submitData: (data) => {
                      dispatch(
                        ApproveAssetSingleRegister({
                          assetId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetAssetSingleRegister(id));
                        }
                      });
                    },
                  },
                });
              },
            },

            {
              name: "Decline Asset",
              permissions: DEFINED_PERMISSIONS?.AssetApproval,
              condition:
                cat_status === "Approved" || cat_status === "Declined"
                  ? false
                  : true,
              action: () => {
                openModal({
                  type: "Asset",
                  details: {
                    button: {
                      name: "Yes, Decline",
                      color: "red",
                    },
                    commentIsOptional: true,
                    sendIsOptional: true,
                    title: "Decline Asset",
                    submitData: (data) => {
                      dispatch(
                        DeclineAssetSingleRegister({
                          assetId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetAssetSingleRegister(id));
                        }
                      });
                    },
                  },
                });
              },
            },

            {
              name: "Delete Asset Register",
              permissions: DEFINED_PERMISSIONS?.AssetApproval,
              condition:
                cat_status === "Initiated" || cat_status === "Declined"
                  ? true
                  : false,
              action: () => {
                openModal({
                  type: "Asset",
                  details: {
                    button: {
                      name: "Delete",
                      color: "red",
                    },
                    isDelete: true,
                    isDeleteHero: "",
                    isDeleteSupport: `Are you sure you want to delete ${acq?.assetName} from the Asset Register? This action cannot be undone.`,
                    title: "Delete Asset Register",
                    submitData: (data) => {
                      dispatch(
                        DeleteAssetSingleRegister({
                          assetId: +id,
                          assetCategory: +acq?.categoryId,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          navigate("../")
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
                        acq?.assetStatus === "Initiated"
                          ? "#815103"
                          : acq?.assetStatus === "Approved"
                          ? "#0F6308"
                          : acq?.assetStatus === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {acq?.assetStatus}
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
                  <h4>{acq?.assetName}</h4>
                </div>
                <div>
                  <p>Specification:</p>
                  <h4>{acq?.specification}</h4>
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
                  <h4>-</h4>
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
                  <h4>{acq?.classInformation?.name}</h4>
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
                  <h4>{acq?.subClassInformation?.name}</h4>
                </div>
              </div>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewAssetRegister;
