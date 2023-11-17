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
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import {
  ApproveConsummableAcquisition,
  DeclineConsummableAcquisition,
  GetSingleConsummableAcquisition,
} from "../../../../../utils/redux/Consumables/ConsumablesSlice";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
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

  const { acquisition } = useSelector((state) => state?.consumable);
  const acq = acquisition?.responseObject;

  const submit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    dispatch(GetSingleConsummableAcquisition(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });
  return (
    <PageLayout title={"Consummable Acquisition Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Edit Details",
              action: () => navigate(`../add`, { state: acq }),
              permissions: DEFINED_PERMISSIONS.ConsumableAdd,
            },
            {
              name: "Approve Aquisition",
              action: () => {
                openModal({
                  type: "",
                  details: {
                    button: {
                      name: "Yes, Approve",
                      color: "",
                    },
                    title: "Approve Acquisition",
                    submitData: (data) => {
                      dispatch(
                        ApproveConsummableAcquisition({
                          consumableAcquisitionId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetSingleConsummableAcquisition(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.ConsumableApprove,
            },

            {
              name: "Decline Acquisition",
              action: () => {
                openModal({
                  type: "Acquisition",
                  details: {
                    button: {
                      name: "Yes, Decline",
                      color: "red",
                    },
                    title: "Decline Acquisition",
                    submitData: (data) => {
                      dispatch(
                        DeclineConsummableAcquisition({
                          consumableAcquisitionId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetSingleConsummableAcquisition(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.ConsumableApprove,
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
                        acq?.registrationState === "Initiated"
                          ? "#815103"
                          : acq?.registrationState === "Approved"
                          ? "#0F6308"
                          : acq?.registrationState === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {acq?.registrationState}
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
                  <h4>{acq?.consumable}</h4>
                </div>
                <div>
                  <p>Consummable Category:</p>
                  <h4>{acq?.consumableCategory}</h4>
                </div>
                <div>
                  <p>Threshold:</p>
                  <h4>{acq?.threshold}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Amount:</p>
                  <h4>{FormatCurrency(acq?.amount)}</h4>
                </div>
                <div>
                  <p>Status:</p>
                  <h4>{acq?.status}</h4>
                </div>
                <div>
                  <p>Quantity :</p>
                  <h4>{acq?.quantity}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Consummable Class:</p>
                  <h4>{acq?.consumableClass}</h4>
                </div>
                <div>
                  <p>Purchase Date:</p>
                  <h4>{FormatDateTime(acq?.purchasedDate, "ll")}</h4>
                </div>
                <div>
                  <p>Quantity Left:</p>
                  <h4>{acq?.quantityLeft}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Vendor Name:</p>
                  <h4>{acq?.vendorName}</h4>
                </div>
                <div>
                  <p>Vendor Type:</p>
                  <h4>{acq?.vendorType}</h4>
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
                    <tr>
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

export default ViewAcquisition;
