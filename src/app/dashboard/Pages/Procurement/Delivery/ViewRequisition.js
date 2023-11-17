import React, { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { GetSingleProcRequisitions } from "../../../../../utils/redux/Procurement/ProcurementSlice";
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { RequisitionModals } from "./RequisitionApprovals";

function ViewProcRequisition() {
  const navigate = useNavigate();
  const location = useLocation();

  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };

  const dispatch = useDispatch();

  const data = useSelector((state) => state?.procurement);
  // const { all_vendors } = useSelector((state) => state?.vendor);
  const vendor = data?.all_proc_requisitions?.responseObject;

  console.log({ data });

  const { id } = useParams();
  console.log(vendor?.companyDocument?.split("\\").slice(-1));

  useEffect(() => {
    // dispatch(GetSingleVendor(id));
    dispatch(GetSingleProcRequisitions(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [modalValue, setModalValue] = useState(false);

  const actions = ({ id, re }) => [
    {
      name: "Approve Requisition",
      action: () => {
        setIsOpen(!isOpen);
        setModalValue("approve");
      },
      permissions: DEFINED_PERMISSIONS.ProcurementApproval,
    },
    {
      name: "Decline Requisition",
      action: () => {
        setIsOpen(!isOpen);
        setModalValue("decline");
      },
      permissions: DEFINED_PERMISSIONS.ProcurementApproval,
    },
    {
      name: "Edit Requisition",
      action: () => {
        navigate(`../${id}/edit`, { state: vendor });
      },
    },
    {
      name: "Submit Quotation",
      action: () => {
        navigate(`/dashboard/procurement/quotation/${id}/add`, {
          state: vendor,
        });
      },
    },
  ];

  return (
    <PageLayout title={"Requisition Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        <PageActions actions={actions({ id, re: vendor?.requestId })} />
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
                    <h4>{vendor?.initiatorName}</h4>
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
                    <h4>{FormatDateTime(vendor?.dateCreated, "ll")}</h4>
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
                    <h4>{vendor?.initiatorName}</h4>
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
                    <h4>{FormatDateTime(vendor?.dateCreated, "ll")}</h4>
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
                    <h4>{vendor?.lastReveiwed?.lastReviewedBy}</h4>
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
                      {FormatDateTime(vendor?.lastReveiwed?.lastReveiwedByDate)}
                    </h4>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{vendor?.levelsOfApproval}</h4>
                </div>
                <div>
                  <p>Process Status</p>
                  <h4
                    style={{
                      color:
                        vendor?.registrationStatus === "Initiated"
                          ? "#815103"
                          : vendor?.registrationStatus === "Approved"
                          ? "#0F6308"
                          : vendor?.registrationStatus === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {vendor?.registrationStatus}
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
                  <p>Procurement Type</p>
                  <h4>{vendor?.procurementType}</h4>
                </div>

                <div>
                  <p>Specification</p>
                  <h4>{vendor?.description}</h4>
                </div>
                <div>
                  <p>Description</p>
                  <h4>{vendor?.description}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Unit Price</p>
                  <h4>{vendor?.unitPrice}</h4>
                </div>
                <div>
                  <p>Quantity</p>
                  <h4>{vendor?.quantity}</h4>
                </div>
                <div>
                  <p>Total Price</p>
                  <h4>{vendor?.totalPrice}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Beneficiary <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              {vendor?.beneficiaryEl?.map((x) => (
                <div>
                  <div>
                    <p>Beneficiary Name</p>
                    <h4>{x?.beneficiaryName}</h4>
                  </div>

                  <div>
                    <p>Department</p>
                    <h4>{x?.department}</h4>
                  </div>
                  <div>
                    <p>Branch</p>
                    <h4>{x?.branch}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {vendor?.vendors?.map((x) => (
                  <div
                    style={{
                      width: "210px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <GoPrimitiveDot color="var(--primary-color)" />
                    <h4>{x?.name}</h4>
                  </div>
                ))}
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
                  {vendor?.documents?.map((x, index) => (
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
              {/* <div className={DashboardStyle.progress_bar}>
                <div>
                  <p>Tax registration cert.</p>
                  <div className={DashboardStyle.preview_doc}>
                    <img src={Doc} alt="Doc" />
                    <h4>{vendor?.tinCertificate?.split("\\")?.[5]}</h4>
                  </div>
                </div>
              </div>
              <div className={DashboardStyle.progress_bar}>
                <div>
                  <p>Tax Certificate</p>
                  <div className={DashboardStyle.preview_doc}>
                    <img src={Doc} alt="Doc" />
                    <h4>{vendor?.tinCertificate?.split("\\")?.[5]}</h4>
                  </div>
                </div>
              </div> */}
              {/* <div className={DashboardStyle.progress_bar}>
                <div>
                  <p>MEMART certificate</p>
                  <div className={DashboardStyle.preview_doc}>
                    <img src={Doc} alt="Doc" />
                    <h4>GalaxoSmilth_cac_cert.pdf</h4>
                  </div>
                </div>
              </div>
              <div className={DashboardStyle.progress_bar}>
                <div>
                  <p>TIN document</p>
                  <div className={DashboardStyle.preview_doc}>
                    <img src={Doc} alt="Doc" />
                    <h4>GalaxoSmilth_cac_cert.pdf</h4>
                  </div>
                </div>
              </div> */}
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
      {isOpen && (
        <RequisitionModals type={modalValue} closeModal={() => setIsOpen()} />
      )}
    </PageLayout>
  );
}

export default ViewProcRequisition;
