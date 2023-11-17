import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  GetSingleFuelRequest,
  ApproveFuelRequest,
  DeclineFuelRequest,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
function ViewRequisition() {
  const navigate = useNavigate();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };
  const dispatch = useDispatch();
  const getRequest = useSelector((state) => state?.fleet);
  const { get_request, isLoading } = getRequest;
  const request = get_request?.responseObject;

  //console.log(request)

  const { id } = useParams();
  useEffect(() => {
    dispatch(GetSingleFuelRequest(id));
  }, [id]);

  const { openModal, closeModal } = useApprovals({});
  return (
    <PageLayout title={"Fuel Requisition Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        {request?.requisitionStatus === "Approved" ||
        request?.requisitionStatus === "Cancelled" ? (
          ""
        ) : request?.requisitionStatus === "Declined" ? (
          <PageActions>
            {[
              {
                name: "Edit Requisition",
                action: () => navigate(`../${id}/edit`, { state: request }),
              },
            ]}
          </PageActions>
        ) : (
          <PageActions>
            {[
              {
                name: "Edit Requisition",
                action: () => navigate(`../${id}/edit`, { state: request }),
              },
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
                      sendIsOptional: true,
                      title: "Approve Requisition",
                      submitData: (data) => {
                        dispatch(
                          ApproveFuelRequest({
                            id: +id,
                            comment: data?.comments,
                            emailTrigger: true,
                          })
                        )?.then((res) => {
                          if (res?.payload?.successful === true) {
                            closeModal();
                            dispatch(GetSingleFuelRequest(id));
                          }
                        });
                      },
                    },
                  });
                },
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
            commentIsOptional: true,
            sendIsOptional:true,
            title: "Decline Requisition",
            submitData: (data) => {

              dispatch(
                DeclineFuelRequest({
                  id: +id,
                  comment: data?.comments,
                  emailTrigger: true,
                  isLoading:isLoading
                })
              ).then((res) => {
                if(res?.payload?.successful === true){
                  closeModal()
                  dispatch(GetSingleFuelRequest(id));
                }
              
                
              });
            },
          },
        });
      },
    },

              // {
              //   name: "Cancel Requisition",
              //   action: () => {
              //     openModal({
              //       type: "Requisition",
              //       details: {
              //         button: {
              //           name: "Yes, Cancel",
              //           color: "red",
              //         },
              //         title: "Cancel Requisition",
              //         submitData: (data) => {
              //           //console.log({ data });

              //           dispatch(
              //             CancelFuelRequest({
              //               id: +id,
              //               comment: data?.comments,
              //               emailTrigger: true,
              //               isLoading:isLoading
              //             })
              //           ).then((res) => {
              //             if(res?.payload?.successful === true){
              //               closeModal()
              //               dispatch(GetSingleFuelRequest(id));
              //             }

              //           });
              //         },
              //       },
              //     });
              //   },
              // },
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
                  <h4>Fuel Requisition</h4>
                </div>
                <div>
                  <p>Date Initiated:</p>
                  <h4>{FormatDateTime(request?.requisitionDate, "ll")}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Reviewed By:</p>
                  <h4>{request?.initiatedBy}</h4>
                </div>
                <div>
                  <p>Reviewed Date:</p>
                  <h4>{FormatDateTime(request?.requisitionDate, "ll")}</h4>
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
                        request?.requisitionStatus === "Pending"
                          ? "#815103"
                          : request?.requisitionStatus === "Approved"
                          ? "#0F6308"
                          : request?.requisitionStatus === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {request?.requisitionStatus}
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
              Fuel Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Fuel Type:</p>
                  <h4>{request?.fuelType}</h4>
                </div>
                <div>
                  <p>Vendor Name:</p>
                  <h4>{request?.vendorName}</h4>
                </div>
                <div>
                  <p>Rate</p>
                  <h4>{FormatCurrency(request?.rate)}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Litres:</p>
                  <h4>{request?.litres}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Requisition
              <br />
              Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Requestor</p>
                  <h4>{request?.requestedBy}</h4>
                </div>
                <div>
                  <p>Vehicle Name:</p>
                  <h4>{request?.vehicleName}</h4>
                </div>
                <div>
                  <p>Amount:</p>
                  <h4>{FormatCurrency(request?.amount)}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Distance:</p>
                  <h4>{request?.currentOdometerReading}</h4>
                </div>
                {/* <div>
                  <p>State:</p>
                  <h4>{request?.state}</h4>
                </div> */}
                <div>
                  <p>Location</p>
                  <h4>{request?.vendorBranch}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Requisition Date:</p>
                  <h4>{FormatDateTime(request?.requisitionDate, "ll")}</h4>
                </div>
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional <br />
              Comment
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
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Document
              <br />
              Uploads
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
                  {request?.documents?.map((x, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{x?.fileName}</td>
                      <td>{x?.fileType}</td>
                      <td>{FormatDateTime(x?.createdDate)}</td>
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

export default ViewRequisition;
