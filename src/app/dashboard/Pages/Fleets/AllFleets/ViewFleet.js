import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiCheck, FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
} from "../../../../../utils/redux/Vendor/VendorSlice";
import { useNavigate, useParams } from "react-router";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import Table from "../../../Components/Table/Table";
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import { GetAllVehicleDocumentType, GetFleetByParam, GetVehicleDocuments } from "../../../../../utils/redux/Fleet/FleetSlice";
import { useApprovals } from "../Maintenance/useApprovals";
import SetUpVendor from "../../Vendors/Management/SetUpVendors";
import { GetAquisitionSingle_Asset } from "../../../../../utils/redux/Assets/AssetSlice";
import SetUpDocumentRenewal from "./DocumentRenewal";
import AssignFleetDriver from "./AssignFleetDriver";

function ViewFleet(props) {
  const navigate = useNavigate();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const { result, all_document, all_document_type, isLoading } = useSelector((state) => state?.fleet);
  const { single_asset_acquisition } = useSelector((state) => state?.assets);

  const flt = result?.responseObject;
  const asset = single_asset_acquisition?.responseObject

  useEffect(() => {
    dispatch(GetFleetByParam({ id }));
    dispatch(GetAquisitionSingle_Asset(/*flt?.assetId ||*/ 0));
    dispatch(GetAllVehicleDocumentType())
    dispatch(GetVehicleDocuments({
      pageSize: 100000,
      currentPage: 1,
      vehicleId: flt?.assetId || 0
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flt?.assetId]);  

  const [openSetUpModal, setOpenSetUpModal] = useState(false);
  const [openSetUpModal2, setOpenSetUpModal2] = useState(false);

  return (
    <PageLayout title={"Fleet Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Renew Documents",
              action: () => setOpenSetUpModal(!openSetUpModal),
            },
            {
              name: "Assign Driver",
              action: () => setOpenSetUpModal2(!openSetUpModal2),
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
              Asset <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group_special}>
              <div>
                <div>
                  <p>Asset Name:</p>
                  <h4>{flt?.initiatedBy || "-"}</h4>
                </div>
                <div>
                  <p>Chasis Number:</p>
                  <h4>{flt?.initiatedBy || "-"}</h4>
                </div>

                <div>
                  <p>Date Procured:</p>
                  <h4>{FormatDateTime(flt?.dateCreated, "ll")}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Fleet Category:</p>
                  <h4>{flt?.fleetType || "-"}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              User <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Fleet Manager:</p>
                  <h4>{flt?.fleetOwnerName || "Nil"}</h4>
                </div>
                <div>
                  <p>Fleet Driver:</p>
                  <h4>{flt?.driverName || "Nil"}</h4>
                </div>
                <div>
                  <p>Managing Type:</p>
                  <h4>{flt?.ownerType || "Nil"}</h4>
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
                  {flt?.documents?.map((x, index) => (
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

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents <br /> Renewal
            </h4>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
            >
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>Renewal Date</th>
                    <th>Expiration Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {all_document?.data?.map((x, index) => (                    
                    // dispatch(GetVe)
                    <tr>
                      <td>{index + 1}</td>
                      <td>{all_document_type?.data?.filter((y) => y?.uuId == x?.documentTypeId).find((y) => y?.title == y?.title)?.title}</td>
                      <td>{FormatDateTime(x?.renewalDate)}</td>
                      <td>{FormatDateTime(x?.expirationDate)}</td>
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
      <SetUpDocumentRenewal
        openModal={openSetUpModal}
        setOpenModal={setOpenSetUpModal}
        fleet={flt}
      />
      <AssignFleetDriver
        openModal={openSetUpModal2}
        setOpenModal={setOpenSetUpModal2}
        fleet={flt}
      />
    </PageLayout>
  );
}

export default ViewFleet;

export function CheckMarks({ name, isHeading }) {
  return (
    <div className={DashboardStyle.checkbox_style}>
      <label
        style={{
          fontWeight: isHeading === true && "500",
          marginBottom: isHeading === true ? "40px" : "0.8rem",
        }}
        htmlFor=""
      >
        {isHeading !== true && (
          <span>
            <FiCheck />
          </span>
        )}
        {name || "Department One"}
      </label>
    </div>
  );
}