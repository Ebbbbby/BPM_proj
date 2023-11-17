import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveAsset_Acqusition,
  DeclineAsset_Acqusition,
  GetAquisitionSingle_Asset,
} from "../../../../../utils/redux/Assets/AssetSlice";
import { URL } from "../../../../../utils/routes";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
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

  const { single_asset_acquisition } = useSelector((state) => state?.assets);
  const acq = single_asset_acquisition?.responseObject;

  const submit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    dispatch(GetAquisitionSingle_Asset(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });
  return (
    <PageLayout title={"Asset Acquisition Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Edit Details",
              action: () =>
                navigate(`../${URL.Add_Acquitions}`, { state: acq }),
              permissions: DEFINED_PERMISSIONS.AssetAcquisitionAdd,
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
                        ApproveAsset_Acqusition({
                          assetAcquisitionId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetAquisitionSingle_Asset(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.AssetAcquisitionApprove,
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
                    title: "Decline Account",
                    submitData: (data) => {
                      dispatch(
                        DeclineAsset_Acqusition({
                          assetAcquisitionId: id,
                          comment: data?.comments,
                        })
                      ).then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          dispatch(GetAquisitionSingle_Asset(id));
                        }
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.AssetAcquisitionApprove,
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
              Asset Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Asset Name:</p>
                  <h4>{acq?.assetName}</h4>
                </div>
                <div>
                  <p>Description:</p>
                  <h4>{acq?.assetDescription}</h4>
                </div>
                <div>
                  <p>Asset Type:</p>
                  <h4>{acq?.assetSubClass}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Asset Class:</p>
                  <h4>{acq?.assetClass}</h4>
                </div>
                <div>
                  <p>Acquistion Date:</p>
                  <h4>{FormatDateTime(acq?.acquisitionDate, "ll")}</h4>
                </div>
                <div>
                  <p>Depreciation Value:</p>
                  <h4>{acq?.depreciationValue}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Depreciation Starting Date :</p>
                  <h4>{FormatDateTime(acq?.depreciationStartDate, "ll")}</h4>
                </div>
                <div>
                  <p>Depreciation Ending Date:</p>
                  <h4>{FormatDateTime(acq?.depreciationEndDate, "ll")}</h4>
                </div>
                <div>
                  <p>State:</p>
                  <h4>{acq?.state}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>NVB:</p>
                  <h4>{acq?.nvb}</h4>
                </div>
                <div>
                  <p>Asset Status:</p>
                  <h4>{acq?.assetStatus}</h4>
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
              Insurance Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Insurance Company:</p>
                  <h4>{acq?.insuranceCompany}</h4>
                </div>
                <div>
                  <p>Insurance Type:</p>
                  <h4>{acq?.insuranceType}</h4>
                </div>
                <div>
                  <p>Insurance Address:</p>
                  <h4>{acq?.insuranceAddress}</h4>
                </div>
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional Comments
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Comment:</p>
                  <h4>{acq?.comment || "Nil"}</h4>
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

export default ViewAcquisition;
