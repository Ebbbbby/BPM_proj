import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveFuelPayment,
  DeclineFuelPayment,
  GetSingleFuelPayment,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { PageActions } from "../../../Components/Misc/Actions";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";

function ViewPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const getPayment = useSelector((state) => state?.fleet);
  const { get_payment } = getPayment;
  const request = get_payment?.responseObject;
  // console.log(request)

  const submit = (e) => {};
  useEffect(() => {
    dispatch(GetSingleFuelPayment(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });
  return (
    <PageLayout title={"Fuel Payment Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        {request?.status === "Approved" || request?.status === "Cancelled" ? (
          ""
        ) : request?.status === "Declined" ? (
          <PageActions>
            {[
              {
                name: "Edit Details",
                action: () => navigate(`../${id}/edit`, { state: request }),
              },
            ]}
          </PageActions>
        ) : (
          <PageActions>
            {[
              {
                name: "Edit Details",
                action: () => navigate(`../${id}/edit`, { state: request }),
              },
              {
                name: "Approve Payment",
                action: () => {
                  openModal({
                    type: "",
                    details: {
                      button: {
                        name: "Yes, Approve",
                        color: "",
                      },
                      title: "Approve Payment",
                      sendIsOptional: true,
                      submitData: (data) => {
                        dispatch(
                          ApproveFuelPayment({
                            id: id,
                            comment: data?.comments,
                          })
                        ).then((res) => {
                          if (res?.payload?.successful === true) {
                            dispatch(GetSingleFuelPayment(id));
                            closeModal();
                          }
                        });
                      },
                    },
                  });
                },
              },

              {
                name: "Decline Payment",
                action: () => {
                  openModal({
                    type: "Allocation",
                    details: {
                      button: {
                        name: "Yes, Decline",
                        color: "red",
                      },
                      commentIsOptional: true,
                      sendIsOptional: true,
                      title: "Decline Payment",
                      submitData: (data) => {
                        dispatch(
                          DeclineFuelPayment({
                            id: id,
                            comment: data?.comments,
                          })
                        ).then((res) => {
                          if (res?.payload?.successful === true) {
                            dispatch(GetSingleFuelPayment(id));
                            closeModal();
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
              Process Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Initiated By:</p>
                  <h4>{request?.initiatedBy}</h4>
                </div>
                <div>
                  <p>Process Type:</p>
                  <h4>Fuel Payment</h4>
                </div>
                <div>
                  <p>Date Initiated:</p>
                  <h4>{FormatDateTime(request?.createdDate, "ll")}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Approval Levels</p>
                  <h4>{request?.levelsOfApproval}</h4>
                </div>
                <div>
                  <p>Process Status:</p>
                  <h4
                    style={{
                      color:
                        request?.status === "Initiated"
                          ? "#815103"
                          : request?.status === "Approved"
                          ? "#0F6308"
                          : request?.status === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {request?.status}
                  </h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Fuel
              <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Start Date:</p>
                  <h4> {FormatDateTime(request?.fuelStartDate, "ll")}</h4>
                </div>

                <div>
                  <p>End Date:</p>
                  <h4> {FormatDateTime(request?.fuelEndDate, "ll")}</h4>
                </div>
                <div>
                  <p>Payee Name:</p>
                  <h4>{request?.payeeName}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Payment
              <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Amount:</p>
                  <h4>{FormatCurrency(request?.amount)}</h4>
                </div>
                <div>
                  <p>Account Number:</p>
                  <h4>{request?.accountNumber || "-"}</h4>
                </div>
                <div>
                  <p>Bank:</p>
                  <h4>{request?.bank || "-"}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional <br />
              Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Other:</p>
                  <h4>{request?.additionalInformation || "Nil"}</h4>
                </div>
              </div>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewPayment;
