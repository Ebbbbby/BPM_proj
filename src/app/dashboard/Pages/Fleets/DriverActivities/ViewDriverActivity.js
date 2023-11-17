import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleDriverActivity } from "../../../../../utils/redux/Fleet/FleetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { PageActions } from "../../../Components/Misc/Actions";

const ViewDriverActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;
  const { get_act, isLoadingActivity } = useSelector((state) => state?.fleet);
  const request = get_act?.responseObject;
  //console.log(request)

  const submit = (e) => {};
  useEffect(() => {
    dispatch(GetSingleDriverActivity(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({ isLoading: true });
  return (
    <PageLayout title={"Driver Activity Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Edit Details",
              action: () => navigate(`../${id}/edit`, { state: request }),
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
              Process Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Initiated By:</p>
                  <h4>{request?.driverName}</h4>
                </div>
                <div>
                  <p>Process Type:</p>
                  <h4>View Activity</h4>
                </div>
                <div>
                  <p>Date Initiated:</p>
                  <h4>{FormatDateTime(request?.dateOfAssignment, "ll")}</h4>
                </div>
              </div>
              <div>
              <div>
                  <p>Review By:</p>
                  <h4>{request?.driverName}</h4>
                </div>
                <div>
                  <p>Review Date:</p>
                  <h4>{FormatDateTime(request?.dateOfAssignment, "ll")}</h4>
                </div>

              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vehicle <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Vehicle Name:</p>
                  <h4> {request?.vehicleName}</h4>
                </div>

                <div>
                  <p>Driver Name:</p>
                  <h4> {request?.driverName}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Activity
              <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Source:</p>
                  <h4>{request?.source}</h4>
                </div>
                <div>
                  <p>Destination:</p>
                  <h4>{request?.destination || "-"}</h4>
                </div>
                <div>
                  <p>Assignment:</p>
                  <h4>{request?.assignment || "-"}</h4>
                </div>

                <div>
                  <p>Date of Assignment</p>
                  <h4> {FormatDateTime(request?.dateOfAssignment, "ll")}</h4>
                </div>
              </div>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
};

export default ViewDriverActivity;
