import React, { useEffect } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";
import { ApproveTrainingRequest, DeclineTrainingRequest, GetEmployeeTrainingRequisition } from "../../../../../utils/redux/HR/HRSlice";

function ViewTrainingRequisition() {
  const navigate = useNavigate();

  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };

  const dispatch = useDispatch();

  const emp_req = useSelector((state) => state?.hr);
  const requisition = emp_req?.emp_req;

  console.log(requisition)

  const { id } = useParams();

  useEffect(() => {
    // dispatch(GetSingleVendor(id));
    dispatch(GetEmployeeTrainingRequisition(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({});

  const isApproved = requisition?.approvalStatus === "Approved" ? true : false
  const isDeclined = requisition?.approvalStatus === "Declined" ? true : false

  return (
    <PageLayout title={"Requisition Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
      {((isApproved || isDeclined)) ?
        (<></>)
        : 
        (<PageActions>
          {[
            {
              name: "Approve Requisition",
              action: () => {
                openModal({
                  type: "suspend",
                  details: {
                    button: {
                      name: "Yes, Approve",
                      color: "",
                    },
                    title: "Approve Requisition",
                    submitData: (data) => {
                      dispatch(
                        ApproveTrainingRequest({
                          comment: data?.comments,
                          procurementRequsitionId: id,
                          emailTrigger: data?.send,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetEmployeeTrainingRequisition(id));
                      });
                    },
                  },
                });
              },
            //   permissions: !DEFINED_PERMISSIONS.ProcurementRequisitionApproval
            },
            {
              name: "Decline Requisition",
              action: () => {
                openModal({
                  type: "suspend",
                  details: {
                    button: {
                      name: "Yes, Suspend",
                      color: "red",
                    },
                    title: "Suspend Account",
                    submitData: (data) => {
                      dispatch(
                        DeclineTrainingRequest({
                          comment: data?.comments,
                          procurementRequsitionId: id,
                          emailTrigger: data?.send,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetEmployeeTrainingRequisition(id));
                      });
                    },
                  },
                });
              },
            //   permissions: !DEFINED_PERMISSIONS.ProcurementRequisitionApproval
            },
          ]}
        </PageActions>)}
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
                    <h4>{FormatDateTime(requisition?.createdDate, "ll")}</h4>
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
                    <h4>{FormatDateTime(requisition?.createdDate, "ll")}</h4>
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
                      {FormatDateTime(requisition?.updatedDate)}
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
                        requisition?.approvalStatus === "Pending"
                          ? "#815103"
                          : requisition?.approvalStatus === "Approved"
                          ? "#0F6308"
                          : requisition?.approvalStatus === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {requisition?.approvalStatus}
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
          <section
            style={{
              borderTop: "unset",
            }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}>
              Requisition <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Training Name</p>
                  <h4>{requisition?.trainingTypeName}</h4>
                </div>
                <div>
                  <p>Start Date</p>
                  <h4>{FormatDateTime(requisition?.startDate)}</h4>
                </div>
                <div>
                  <p>End Date</p>
                  <h4>{FormatDateTime(requisition?.endDate)}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Unit Price</p>
                  <h4>{requisition?.unitCost}</h4>
                </div>
                <div>
                  <p>Quantity</p>
                  <h4>{requisition?.trainingBeneficiaries?.length}</h4>
                </div>
                <div>
                  <p>Total Price</p>
                  <h4>{requisition?.totalCost}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Beneficiary <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
                {requisition?.trainingBeneficiaries?.map((x) => (
                   (x?.beneficiaryType === 0) ?
                    <div>
                        <div>
                            <p>Beneficiary Type</p>
                            <h4>Individual</h4>
                        </div>
                        <div>
                            <p>Beneficiary Name</p>
                            <h4>{x?.employeeName}</h4>
                        </div>
                        <div>
                            <p>Department</p>
                            <h4>
                            {x?.departmentName}
                            </h4>
                        </div>                    
                        <div>
                            <p>Branch</p>
                            <h4>{x?.branchName}</h4>
                        </div>
                    </div> :                 
                    (x?.beneficiaryType === 1) ?
                    <div>
                        <div>
                            <p>Beneficiary Type</p>
                            <h4>Department</h4>
                        </div>
                        <div>
                            <p>Department Name</p>
                            <h4>
                            {x?.departmentName}
                            </h4>
                        </div> 
                    </div>                    
                    : 
                    <div>
                        <div>
                            <p>Beneficiary Type</p>
                            <h4>Branch</h4>
                        </div>
                        <div>
                            <p>Branch Name</p>
                            <h4>
                            {x?.branchName}
                            </h4>
                        </div> 
                    </div>
                ))}
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Location <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>                   
                <div>
                    <div>
                        <p>Suite Number</p>
                        <h4>{requisition?.suiteNumber}</h4>
                    </div>
                    <div>
                        <p>Street Address 1</p>
                        <h4>{requisition?.streetAddress1}</h4>
                    </div>
                    <div>
                        <p>Street Address 2</p>
                        <h4>{requisition?.streetAddress2}</h4>
                    </div>
                    <div>
                        <p>City</p>
                        <h4>{requisition?.city}</h4>
                    </div>
                    <div>
                        <p>State</p>
                        <h4>{requisition?.state}</h4>
                    </div>                    
                </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div
                    style={{
                      width: "210px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <GoPrimitiveDot color="var(--primary-color)" />
                    <h4>{requisition?.vendorName}</h4>
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
                  {requisition?.documents?.map((x, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{x?.fileName}</td>
                      <td>{x?.fileType}</td>
                      <td>{FormatDateTime(x?.dateUploaded)}</td>
                      <td>
                        <TableActionsDownload url={x?.fileUrl} />
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

export default ViewTrainingRequisition;