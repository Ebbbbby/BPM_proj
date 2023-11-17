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
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import {
  GetRequisitionSingle_Asset,
  ApproveAsset_Requisition,
  DeclineAsset_Requisition,
} from "../../../../../utils/redux/Assets/AssetSlice";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewRequisition() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const { asset_requisition } = useSelector((state) => state?.assets);
  const acq = asset_requisition?.responseObject;

  const submit = (e) => {
    console.log(e);
  };
  useEffect(() => {
    dispatch(GetRequisitionSingle_Asset(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });
  return (
    <PageLayout title={"Asset Requisition Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            // {
            //   name: "Setup Account",
            //   action: () => navigate("/"),
            // },
            // {
            //   name: "Edit Details",
            //   action: () => navigate(`../add`, { state: acq }),
            // },
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
                        ApproveAsset_Requisition({
                          assetRequisitionId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetRequisitionSingle_Asset(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.AssetRequisitionApprove,
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
                    title: "Decline Requisition",
                    submitData: (data) => {
                      dispatch(
                        DeclineAsset_Requisition({
                          assetRequisitionId: +id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetRequisitionSingle_Asset(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.AssetRequisitionApprove,
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
                  <p>Quantity:</p>
                  <h4>{acq?.quantity}</h4>
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
                  <p>Requested For:</p>
                  <h4>{acq?.requestedFor}</h4>
                </div>
                <div>
                  <p>Purpose:</p>
                  <h4>{acq?.purpose}</h4>
                </div>
                <div>
                  <p>Requisition Details:</p>
                  <h4>{acq?.details}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents <br /> Uploads
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
                  {acq?.documents?.map((x, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{x?.fileName}</td>
                      <td>{x?.fileType}</td>
                      <td>{FormatDateTime(x?.dateUploaded)}</td>
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

export default ViewRequisition;
