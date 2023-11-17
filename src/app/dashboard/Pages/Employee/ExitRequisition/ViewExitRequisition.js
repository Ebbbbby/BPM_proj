import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PageLayout from "../../../Components/Layout/PageLayout";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { FiExternalLink } from "react-icons/fi";
import {
  GetSingleExitRequisition,
} from "../../../../../utils/redux/HR/HRSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import {  } from "../../Vendors/VendorApprovals/useApprovals";
import {  TableActionsDownload } from "../../../Components/Misc/Actions";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import Table from "../../../Components/Table/Table";

const ViewExitRequisition = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };
  const { get_single_exit } = useSelector((state) => state?.hr);
  const request = get_single_exit?.responseObject;
  console.log(get_single_exit)
  useEffect(() => {
    dispatch(GetSingleExitRequisition(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <PageLayout title={"Exit Requisition Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        {/* <PageActions>
          {[
            {
              name: "Edit Exit Requisition",
              action: () => {
                navigate(
                  `?modal_type=exit&isEdit=true&date=${
                    request?.exitDate
                  }&reason=${request?.exitReason || ""}&id=${id}`
                );
                setOpenModal(!openAppModal);
              },
            },

            // {
            //   name: "Approve Requisition",
            //   action: () => {
            //     openModal({
            //       type: "suspend",
            //       details: {
            //         button: {
            //           name: "Yes, Approve",
            //           color: "",
            //         },
            //         sendIsOptional: true,
            //         title: "Approve Requisition",
            //         submitData: (data) => {
            //           dispatch(
            //             ApproveExit({
            //               id: request?.id,
            //               comment: data.comment,
            //               approvalDate: request?.approvalDate,
            //             })
            //           )?.then((res) => {
            //             if (res?.payload?.successful === true) {
            //               closeModal();
            //               dispatch(GetSingleExitRequisition(id));
            //             }
            //           });
            //         },
            //       },
            //     });
            //   },
            // },

            // {
            //   name: "Decline Requisition",
            //   action: () => {
            //     openModal({
            //       type: "Requisition",
            //       details: {
            //         button: {
            //           name: "Yes, Decline",
            //           color: "red",
            //         },
            //         commentIsOptional: true,
            //         sendIsOptional: true,
            //         title: "Decline Requisition",
            //         submitData: (data) => {
            //           console.log(data);
            //           dispatch(
            //             DeclineExit({
            //               comment: data?.comment,
            //               id: request?.id,
            //             })
            //           ).then((res) => {
            //             if (res?.payload?.successful === true) {
            //               closeModal();
            //               dispatch(GetSingleExitRequisition(id));
            //             }
            //           });
            //         },
            //       },
            //     });
            //   },
            // },
          ]}
        </PageActions> */}
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
                  <h4>Exit Requisition</h4>
                </div>
                <div>
                  <p>Date Initiated:</p>
                  <h4>{FormatDateTime(request?.createdDate)}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Reviewed By:</p>
                  <h4>Bolanle Ayodeji</h4>
                </div>
                <div>
                  <p>Approved Date:</p>
                  <h4>{FormatDateTime(request?.approvalDate)}</h4>
                </div>
                <div>
                  <p>Approval Levels</p>
                  <h4>3</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Process Status:</p>
                  <h4>{request?.exitStatus}</h4>
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
              Exit
              <br />
              Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Requestor</p>
                  <h4>{request?.initiatedBy}</h4>
                </div>
                <div>
                  <p>Exit Date:</p>
                  <h4>{FormatDateTime(request?.exitDate)}</h4>
                </div>
                <div>
                  <p>Exit Reason:</p>
                  <h4>{request?.exitReason}</h4>
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
                  {request?.exitDocumentResponses?.map((x, index) => (
                    <tr key={x?.exitRequestId}>
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
      {/* <AppModalTemplate
        padding={"0px"}
        isOpen={openAppModal}
        setIsOpen={setOpenModal}
      >
        {getURLData("modal_type") === "exit" && (
          <CreateExitActions isOpen={openAppModal} setIsOpen={setOpenModal} />
        )}
      </AppModalTemplate> */}
    </PageLayout>
  );
};

export default ViewExitRequisition;
