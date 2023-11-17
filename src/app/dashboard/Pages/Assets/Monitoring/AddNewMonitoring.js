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
import {
  CreateAsset_Maintenance,
  UpdateAsset_Maintenance,
} from "../../../../../utils/redux/Assets/AssetSlice";
import {
  GetAssetClass,
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
  const { asset_register } = useSelector((x) => x?.assetSetUp);
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );

  const defaultData = {
    AssetId: location?.assetId,
    id: location?.assetId,
    description: location?.assetDescription,
    assetClassId: location?.assetClassId,
    HealthStatus: location?.healthStatusId,
    SetupDate: FormatDateTime(location?.setupDate, "YYYY-MM-DD"),
    Comment: location?.otherInfo,
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit, setValue } = formMethods;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadFile, setUploadFile] = useState(null);
  const { assets } = useSelector((state) => state);

  const { isLoadingAssetsActions } = assets;

  console.log({ assets });

  console.log(assets?.isLoadingAssetsActions);

  useEffect(() => {
    dispatch(GetInsuranceCompanies());
    dispatch(GetNigerianStates());
    dispatch(
      GetAssetRegister({
        filter: 2,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );
    dispatch(GetAssetClass());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data) => {
    const dv = {
      ...data,
      AssetMonitorId: location?.id,
    };
    const fileData = new FormData();
    const key = Object.keys(dv);
    key?.forEach((key, index) => {
      fileData.append(`${key}`, dv[key]);
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
      ? dispatch(UpdateAsset_Maintenance(fileData))?.then((res) => {
          if (res?.payload?.data?.successful === true) {
            navigate(`../${location?.id}/view`);
          }
        })
      : dispatch(CreateAsset_Maintenance(fileData))?.then((res) => {
          if (res?.payload?.data?.successful === true) {
            navigate(`../${res?.payload?.data?.responseObject?.id}/view`);
          }
        });
  };

  const { assetClass } = useSelector((state) => state?.global);

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

  if (!asset_register || !assetClass) {
    return <p>Loading...</p>;
  }

  return (
    <PageLayout
      title={`${location ? "Edit" : "Add"} Asset Acquisition Management`}
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
                    <option key={index} value={+x?.id}>
                      {x?.name}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = asset_register?.result?.find(
                        (x) => +e.target.value === x?.id
                      );
                      setValue("description", isFound?.description);
                      setValue("id", isFound?.id);
                    },
                  }}
                />
                <FormInput
                  title={"Asset ID"}
                  camelCase={"id"}
                  placeholder={"select"}
                  isOptional={true}
                />
              </div>
              <div>
                <FormTextArea
                  title={" Asset Description"}
                  camelCase={"description"}
                  placeholder={"select"}
                  rowsLines={4}
                  isOptional={true}
                  disabled={true}
                />
                <FormSelect
                  title={"Asset Class"}
                  camelCase={"assetClassId"}
                  placeholder={"select"}
                  // isOptional={true}
                  array={assetClass?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Monitoring Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Asset Health Status (Set-up)"}
                  camelCase={"HealthStatus"}
                  placeholder={"select"}
                  array={
                    <>
                      <option value={0}>Faulty</option>
                      <option value={1}>Good</option>
                      <option value={2}>Very Bad</option>
                    </>
                  }
                  // isOptional={true}
                />
                <FormInput
                  title={"Setup Date"}
                  camelCase={"SetupDate"}
                  placeholder={"Vendor Type"}
                  type={"date"}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional Information
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormTextArea
                  title={"Comments (Optional)"}
                  camelCase={"Comment"}
                  placeholder={"select"}
                  type="textbox"
                  isOptional={true}
                />
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Supporting Documents
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
              onClick={() => navigate(-1)}
              className={DashboardStyle?.button_cage_weight}
            >
              Cancel
            </SupportButtons>
            <ActionButtons
              width={"auto"}
              isLoading={isLoadingAssetsActions}
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
