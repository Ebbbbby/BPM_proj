import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import {
  ApproveProcQuotation,
  DeclineProQuotation,
  DeliveredProQuotation,
  GetSingleProcQuotations,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewQuotation() {
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state?.procurement);
  const requisition = data?.all_proc_requisitions?.responseObject;

  const { id } = useParams();

  useEffect(() => {
    dispatch(GetSingleProcQuotations(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({});
  const navigate = useNavigate();
  return (
    <PageLayout title={"Quotation Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Edit Details",
              action: () => navigate(`../${id}/edit`, { state: requisition }),
              permissions: DEFINED_PERMISSIONS.QuotationAdd,
            },
            {
              name: "Approve Quotation",
              action: () => {
                openModal({
                  type: "",
                  details: {
                    button: {
                      name: "Yes, Approve",
                      color: "",
                    },
                    sendIsOptional: true,
                    title: "Approve Quotation",
                    submitData: (data) => {
                      dispatch(
                        ApproveProcQuotation({
                          comment: data?.comments,
                          quotationId: id,
                          emailTrigger: true,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleProcQuotations(id));
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.QuotationApproval,
            },
            {
              name: "Decline Quotation",
              action: () => {
                openModal({
                  type: "",
                  details: {
                    button: {
                      name: "Yes, Decline",
                      color: "red",
                    },
                    sendIsOptional: true,
                    title: "Decline Quotation",
                    submitData: (data) => {
                      dispatch(
                        DeclineProQuotation({
                          comment: data?.comments,
                          quotationId: id,
                          emailTrigger: true,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleProcQuotations(id));
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.QuotationApproval,
            },
            {
              name: "Delivered",
              action: () => {
                openModal({
                  type: "",
                  details: {
                    button: {
                      name: "Yes, Delivered",
                      color: "",
                    },
                    title: "Delivered Quotation?",
                    submitData: (data) => {
                      dispatch(
                        DeliveredProQuotation({
                          comment: data?.comments,
                          quotationId: id,
                          sendNotification: true,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleProcQuotations(id));
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
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
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
                    <h4>{requisition?.initiatorName}</h4>
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
                    <h4>{FormatDateTime(requisition?.dateInitiated, "ll")}</h4>
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
                    <h4>{requisition?.initiatorName}</h4>
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
                    <h4>{FormatDateTime(requisition?.dateInitiated, "ll")}</h4>
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
                    <p style={{ marginBottom: "0px" }}>Last Reviewed By:</p>
                    <h4>{requisition?.lastReveiwed?.lastReviewedBy}</h4>
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
                      {FormatDateTime(
                        requisition?.lastReveiwed?.lastReveiwedByDate,
                        "ll"
                      )}
                    </h4>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{requisition?.levelsOfApproval}</h4>
                </div>
                <div>
                  <p>Process Status</p>
                  <h4
                    style={{
                      color:
                        requisition?.registrationState === "Initiated"
                          ? "#815103"
                          : requisition?.registrationState === "Approved"
                          ? "#0F6308"
                          : requisition?.registrationState === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {requisition?.registrationState}
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
              Requisition <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Requisition Type</p>
                  <h4>{requisition?.requisitionType}</h4>
                </div>

                <div>
                  <p>Asset Type</p>
                  <h4>{requisition?.assetType}</h4>
                </div>
                <div>
                  <p>Asset Name</p>
                  <h4>{requisition?.assetName}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Description</p>
                  <h4>{requisition?.description}</h4>
                </div>
                <div>
                  <p>Quantity</p>
                  <h4>{requisition?.quantity}</h4>
                </div>
                <div>
                  <p>Requisition Expiry Date</p>
                  <h4>
                    {FormatDateTime(requisition?.requisitionExpiryDate, "ll")}
                  </h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Quotation <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Asset Name</p>
                  <h4>{requisition?.brand}</h4>
                </div>

                <div>
                  <p>Specifications</p>
                  <h4>{requisition?.description}</h4>
                </div>
                <div>
                  <p>Unit Price</p>
                  <h4>{FormatCurrency(requisition?.unitPrice)}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Quantity</p>
                  <h4>{requisition?.quantity}</h4>
                </div>
                <div>
                  <p>Delivery Cost</p>
                  <h4>{FormatCurrency(requisition?.deliveryCost)}</h4>
                </div>
                <div>
                  <p>Warranty</p>
                  <h4>{requisition?.waranty}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Total Price</p>
                  <h4>{FormatCurrency(requisition?.totalPrice)}</h4>
                </div>
                <div>
                  <p>Support Included</p>
                  <h4>{requisition?.supportIncluded}</h4>
                </div>
                <div>
                  <p>Deliver Schedule</p>
                  <h4>{FormatDateTime(requisition?.deliverySchedule)}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Recommendation
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Recommended Asset Name</p>
                  <h4>{requisition?.recommendedAsset || "-"}</h4>
                </div>
                <div>
                  <p>Recommend Specifications</p>
                  <h4>{requisition?.recommendedAssetDescription || "-"}</h4>
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
                  {requisition?.supportingDocument?.map((x, index) => (
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

export default ViewQuotation;
