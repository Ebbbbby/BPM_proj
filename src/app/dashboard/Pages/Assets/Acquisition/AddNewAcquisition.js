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
  CreateAcquisition_Asset,
  UpdateAsset_Acquisition,
} from "../../../../../utils/redux/Assets/AssetSlice";

import {
  FormatDateTime,
  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { URL } from "../../../../../utils/routes";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import {
  GetAssetClass,
  GetAssetRegister,
  GetAssetSubClass,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";

function Acquisition() {
  const location = useLocation()?.state;
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );
  const [assetItems, setAssetItems] = useState({});
  const [classSubs, setClassSubs] = useState({});

  const defaultData = {
    AssetId: location?.assetId,
    Description: location?.assetDescription,
    AssetTypeId: location?.assetTypeId,
    AssetClassId: location?.assetClassId,
    AcquisitionDate: FormatDateTime(location?.acquisitionDate, "YYYY-MM-DD"),
    DepreciationValue: location?.depreciationValue,
    DepreciationStartDate: FormatDateTime(
      location?.depreciationStartDate,
      "YYYY-MM-DD"
    ),
    DepreciationEndDate: FormatDateTime(
      location?.depreciationEndDate,
      "YYYY-MM-DD"
    ),
    State: location?.state,
    NVB: location?.nvb,
    Status: location?.assetStatusId,
    SerialNumber: location?.serialNumber,
    ChasisNumber: location?.chasisNumber,
    PlateNumber: location?.plateNumber,
    vendorId: location?.vendorId,
    vendorType: location?.vendorType,
    InsuranceCompany: location?.insuranceCompany,
    InsuranceType: location?.insuranceTypeId,
    InsuranceAddress: location?.insuranceAddress,
    InsuranceEmail: location?.insuranceEmailAddress,
    InsurancePhoneNumber: location?.insurancePhoneNumber,
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    setValue,
    formState: { isValid },
  } = formMethods;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadFile, setUploadFile] = useState(null);
  const { vendor } = useSelector((state) => state);
  const { isLoading } = useSelector((state) => state.assets);
  // const { assetClass, assetTypes } = useSelector((state) => state?.global);

  const { asset_register, asset_class } = useSelector((x) => x?.assetSetUp);

  useEffect(() => {
    dispatch(
      GetAssetRegister({
        filter: 2,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );
    dispatch(
      GetAssetSubClass({
        filter: 2,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );

    dispatch(
      GetVendors({
        pageSize: 100000,
        currentPage: 1,
        sort: 1,
        filter: 2,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data) => {
    const combinedData = {
      ...data,
      AssetAcquisitionId: location?.id,
      VendorName:
        assetItems?.name ||
        assetItems?.businessName ||
        assetItems?.companyName ||
        location?.vendorName,
    };
    const fileData = new FormData();
    const key = Object.keys(combinedData);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, combinedData[key]);
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
      ? dispatch(UpdateAsset_Acquisition(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${location?.id}/${URL.View_Acquisition}`);
          }
        })
      : dispatch(CreateAcquisition_Asset(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(
              `../${res?.payload?.responseObject?.assetAcquisitionId}/${URL.View_Acquisition}`
            );
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

  if (!asset_register || !vendor) {
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
                {/* <FormSelect
                  title={"Ref ID"}
                  camelCase={"DepreciationClass"}
                  placeholder={"select"}
                /> */}
                <FormSelect
                  title={"Asset Name"}
                  camelCase={"AssetId"}
                  placeholder={"select"}
                  isOptional={true}
                  array={asset_register?.result?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = asset_register?.result?.find(
                        (x) => +e.target.value === x?.id
                      );

                      dispatch(
                        GetAssetClass({
                          filter: 2,
                          pageSize: 10000,
                          currentPage: 1,
                          sort: 1,
                          CategoryId: isFound?.categoryId,
                        })
                      );
                      setValue("Description", isFound?.description);
                      // console.log(isFound);

                      return;
                    },
                  }}
                />
                <FormTextArea
                  title={"Description"}
                  camelCase={"Description"}
                  placeholder={"select"}
                  rowsLines={4}
                  isOptional={true}
                  disabled={true}
                />
              </div>
              <div>
                <FormSelect
                  title={"Asset Class"}
                  camelCase={"AssetClassId"}
                  placeholder={"select"}
                  isOptional={true}
                  array={asset_class?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = asset_class?.responseObject?.find(
                        (x) => +e.target.value === x?.id
                      );

                      setClassSubs(isFound);

                      return;
                    },
                  }}
                />
                <FormSelect
                  title={"Asset Type"}
                  camelCase={"AssetTypeId"}
                  placeholder={"select"}
                  isOptional={true}
                  array={classSubs?.subClasses?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                />
              </div>
              <div>
                <FormInput
                  title={"Acquisition Date"}
                  camelCase={"AcquisitionDate"}
                  placeholder={"select"}
                  type="date"
                />
                <FormInput
                  title={"Depreciation Value"}
                  camelCase={"DepreciationValue"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormInput
                  title={"Depreciation Start Date"}
                  camelCase={"DepreciationStartDate"}
                  placeholder={"select"}
                  type="date"
                />
                <FormInput
                  title={"Depreciation End Date"}
                  camelCase={"DepreciationEndDate"}
                  placeholder={"select"}
                  type="date"
                />
              </div>
              <div>
                <FormSelect
                  title={"State"}
                  camelCase={"State"}
                  placeholder={"State"}
                  array={
                    <>
                      <option value={2}>Bad</option>
                      <option value={1}>Good</option>
                    </>
                  }
                />
                <FormInput
                  title={"NVB"}
                  camelCase={"NVB"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormSelect
                  title={"Asset Status"}
                  camelCase={"Status"}
                  placeholder={"Status"}
                  array={
                    <>
                      <option value={1}>Acquired</option>
                      <option value={2}>Allocated</option>
                      <option value={3}>Disposed</option>
                      <option value={4}>Faulty</option>
                    </>
                  }
                />
                <FormInput
                  title={"Serial Number"}
                  camelCase={"SerialNumber"}
                  placeholder={"select"}
                  isOptional={true}
                />
              </div>
              <div>
                <FormInput
                  title={"Chasis Number"}
                  camelCase={"ChasisNumber"}
                  placeholder={"select"}
                  isOptional={true}
                />
                <FormInput
                  title={"Plate Number"}
                  camelCase={"PlateNumber"}
                  placeholder={"select"}
                  isOptional={true}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Vendor"}
                  camelCase={"vendorId"}
                  placeholder={"select"}
                  array={vendor?.all_vendors?.result?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.businessName}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = vendor?.all_vendors?.result?.find(
                        (x) => +e.target.value === +x?.id
                      );
                      setAssetItems(isFound);

                      return (
                        isFound && setValue("vendorType", isFound?.vendorType)
                      );
                    },
                    // return console.log({ data });
                  }}
                />
                <FormInput
                  title={"Vendor Type"}
                  camelCase={"vendorType"}
                  placeholder={"Vendor Type"}
                  disabled={true}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Insurance Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Insurance Company"}
                  camelCase={"InsuranceCompany"}
                  placeholder={"select"}
                  // array={global?.insurance?.responseObject?.map?.(
                  //   (x, index) => (
                  //     <option key={index} value={x?.id}>
                  //       {x?.name}
                  //     </option>
                  //   )
                  // )}
                  // moreRegister={{
                  //   onChange: (e) => {
                  //     const isFound = global?.insurance?.responseObject?.find(
                  //       (x) => +e.target.value === +x?.id
                  //     );

                  //     console.log({ isFound });
                  //     return (
                  //       isFound &&
                  //         setValue("RCNumber", isFound?.rcNumber || "0000"),
                  //       setValue(
                  //         "InsuranceAddress",
                  //         isFound?.address || "Address"
                  //       ),
                  //       setValue(
                  //         "InsuranceEmail",
                  //         isFound?.email || "insurancecompany@gmail.com"
                  //       ),
                  //       setValue(
                  //         "InsurancePhoneNumber",
                  //         isFound?.phoneNumber || "0909-Call-NPLC"
                  //       )
                  //     );
                  //   },
                  //   // return console.log({ data });
                  // }}
                />
                <FormSelect
                  title={"Insurance Type"}
                  camelCase={"InsuranceType"}
                  placeholder={"select"}
                  array={<option value={1}>Comprehensive Insurance</option>}
                />
              </div>
              <div>
                <FormTextArea
                  title={"Insurance Address"}
                  camelCase={"InsuranceAddress"}
                  placeholder={"select"}
                  type="textbox"
                  rowsLines={4}
                />

                <FormInput
                  title={"Insurance Email"}
                  camelCase={"InsuranceEmail"}
                  placeholder={"select"}
                  type="email"
                />
              </div>
              <div>
                <FormInput
                  title={"Insurance Phone Number"}
                  camelCase={"InsurancePhoneNumber"}
                  placeholder={"select"}
                />
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Supporting Documents
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              {/* <div>
                <FormSelect
                  title={
                    <>
                      File Name <sup style={{ color: "red" }}>*</sup>
                    </>
                  }
                  camelCase={"fileName"}
                  placeholder={"select"}
                  isOptional={true}
                  //  {uploadFile?.length > 1 ?  isOptional={false}}
                  array={
                    <>
                      <option value={"TinCertificate"}>TIN Certificate</option>
                      <option value={"CacCertificate"}>CAC Certificate</option>
                    </>
                  }
                />
                <PerfectFileUpload
                  setFile={setUploadFile}
                  file={uploadFile}
                  title={""}
                  isOptional={false}
                  camcelCase={"stuff"}
                  handleChange={(cac) => {
                    setUploadFile(cac);
                  }}
                />
                <div
                  style={{
                    color: "var(--primary-color)",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: "5px",
                  }}
                  onClick={() => {
                    if (uploadFile && getValues("fileName") !== "") {
                      setVendorDocument([
                        ...vendorDocument,
                        {
                          file: uploadFile,
                          fileName: getValues("fileName"),
                        },
                      ]);

                      setUploadFile(null);
                      setValue("fileName", "");
                    } else toast.error("File Name or File can not be empty");
                  }}
                >
                  <FiPlus />
                  <p>Add Another</p>
                </div>
              </div> */}

              <FormUploadComponent
                documentList={documentList}
                uploadFile={uploadFile}
                setUploadFile={setUploadFile}
                setVendorDocument={setVendorDocument}
                vendorDocument={vendorDocument}
              />
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
                          <td>
                            {x?.dateUploaded
                              ? FormatDateTime(x?.dateUploaded)
                              : FormatDateTime()}
                          </td>
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
              onClick={() => navigate(-1)}
              width={"auto"}
              className={DashboardStyle?.button_cage_weight}
            >
              Cancel
            </SupportButtons>
            <ActionButtons
              isLoading={isLoading}
              disabled={!isValid || !vendorDocument}
              width={"auto"}
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
