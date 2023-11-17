import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FormSelect,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import {
  CreateRequisition_Asset,
  UpdateRequisition_Asset,
} from "../../../../../utils/redux/Assets/AssetSlice";
import {
  GetInsuranceCompanies,
  GetNigerianStates,
} from "../../../../../utils/redux/Global/GlobalSlice";
import {
  FormatDateTime,
  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { GetAssetRegister } from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";

function Acquisition() {
  const location = useLocation()?.state;
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );

  const defaultData = {
    AssetId: location?.assetId,
    quantity: location?.quantity,
    requestFor: location?.requestedFor,
    purpose: location?.purpose,
    description: location?.details,
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const dispatch = useDispatch();
  const [uploadFile, setUploadFile] = useState(null);

  const { isLoading } = useSelector((state) => state?.assets);

  const { asset_register } = useSelector((x) => x?.assetSetUp);

  useEffect(() => {
    dispatch(GetInsuranceCompanies());
    dispatch(
      GetAssetRegister({
        filter: 2,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );
    dispatch(GetNigerianStates());
    dispatch(
      GetVendors({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const submit = (data) => {
    const dataValue = {
      ...data,
    };
    const fileData = new FormData();
    const key = Object.keys(dataValue);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, dataValue[key]);
    });

    const removedVendorDocument = vendorDocument
      ?.map((x) => x)
      ?.filter((x) => "file" in x);

    removedVendorDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });

    location
      ? dispatch(UpdateRequisition_Asset(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${location?.id}/view`);
          }
        })
      : dispatch(CreateRequisition_Asset(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${res?.payload?.responseObject?.id}/view`);
          }
        });
  };

  const documentList = [
    {
      name: "CAC Certificate",
      value: "CacCertificate",
    },

    {
      name: "TIN Certificate",
      value: "TinCertificate",
    },
  ];

  if (!asset_register) {
    return <p>Loading...</p>;
  }

  return (
    <PageLayout
      title={`${location ? "Edit" : "Add"} Asset Requisition`}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Asset Name"}
                  camelCase={"AssetId"}
                  placeholder={"select"}
                  array={asset_register?.result?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                />
                <FormInput
                  title={"Qty"}
                  camelCase={"quantity"}
                  placeholder={"select"}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Requsition Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Requested For"}
                  camelCase={"requestFor"}
                  placeholder={"select"}
                />
                <FormSelect
                  title={"Purpose"}
                  camelCase={"purpose"}
                  placeholder={"select"}
                  array={<option value={1}>Comprehensive Insurance</option>}
                />
              </div>
              <div>
                <FormTextArea
                  title={"Requisition Details"}
                  camelCase={"description"}
                  placeholder={"select"}
                  type="textbox"
                  rowsLines={4}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Upload Supporting <br /> Documents
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormUploadComponent
                  documentList={documentList}
                  uploadFile={uploadFile}
                  setUploadFile={setUploadFile}
                  setVendorDocument={setVendorDocument}
                  vendorDocument={vendorDocument}
                />
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
              {vendorDocument?.length === 0 ? (
                <p>No Record Available</p>
              ) : (
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
                    {vendorDocument?.map?.((x, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.file?.type?.split("/")[1]}
                          </td>
                          <td>{FormatDateTime()}</td>
                          <td>
                            <TableActionsDownload
                              actions={() =>
                                removeListData({
                                  value: index,
                                  list: vendorDocument,
                                  setList: setVendorDocument,
                                })
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </div>
          </section>
          <div className={DashboardStyle.button_cage}>
            <SupportButtons
              width={"auto"}
              className={DashboardStyle?.button_cage_weight}
            >
              Save as Draft
            </SupportButtons>
            <ActionButtons
              width={"auto"}
              isLoading={isLoading}
              className={DashboardStyle?.button_cage_weight}
            >
              Submit
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default Acquisition;
