import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveAuction_Single_Bidding,
  DeclineAuction_Single_Bidding,
  GetAuction_Single_Bidding,
} from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { PageActions } from "../../../Components/Misc/Actions";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewAuctioningBidding() {
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
    dispatch(GetAuction_Single_Bidding(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });

  return (
    <PageLayout title={"Auctioning (Bidding) Details"} hasBack={true}>
      {/* {<Modal />} */}
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
              name: "Approve Auctioning (Bidding)",
              action: () => {
                openModal({
                  type: "",
                  details: {
                    button: {
                      name: "Yes, Approve",
                      color: "",
                    },
                    title: "Approve Auctioning (Bidding)",
                    submitData: (data) => {
                      dispatch(
                        ApproveAuction_Single_Bidding({
                          assetAuctionId: +id,
                          comment: data?.comments,
                          emailTrigger: data?.send,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetAuction_Single_Bidding(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.AssetBidApprove,
            },

            {
              name: "Decline Auctioning (Bidding)",
              action: () => {
                openModal({
                  type: "Auctioning",
                  details: {
                    button: {
                      name: "Yes, Decline",
                      color: "red",
                    },
                    title: "Decline Auctioning (Bidding)",
                    submitData: (data) => {
                      dispatch(
                        DeclineAuction_Single_Bidding({
                          assetAuctionId: +id,
                          comment: data?.comments,
                          emailTrigger: data?.send,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetAuction_Single_Bidding(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.AssetBidApprove,
            },
          ]}
        </PageActions>
      </div>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Process Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Initiated By:</p>
                  <h4>{acq?.createdBy}</h4>
                </div>
                <div>
                  <p>Process Type:</p>
                  <h4>Asset Auctioning</h4>
                </div>
                <div>
                  <p>Date Initiated:</p>
                  <h4>{FormatDateTime(acq?.createdDate, "ll")}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>3</h4>
                </div>
                <div>
                  <p>Process Status:</p>
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
                  <p>Asset ID:</p>
                  <h4>{acq?.assetId}</h4>
                </div>
                <div>
                  <p>Asset Description:</p>
                  <h4>{acq?.assetDescription}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Asset Class:</p>
                  <h4>{acq?.assetClass}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Actioning Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Initiator:</p>
                  <h4>{acq?.createdBy}</h4>
                </div>
                <div>
                  <p>Bid Value:</p>
                  <h4>{FormatCurrency(acq?.bidValue)}</h4>
                </div>
              </div>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewAuctioningBidding;
