import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
  PerfectFileUpload,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import { URL } from "../../../../../utils/routes";
import {
  GetConsummableClass,
  GetConsummableRegister,
} from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
import {
  CreateConsummableAcquisition,
  EditConsummableAcquisition,
} from "../../../../../utils/redux/Consumables/ConsumablesSlice";

function Acquisition() {
  const location = useLocation()?.state;
  console.log({ location });
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );
  const [assetItems, setAssetItems] = useState({});
  const [consumableDetails, setConsumabeDetails] = useState({});

  const defaultData = {
    consumableId: location?.consumableId,
    AcquisitionDate: FormatDateTime(location?.aquisitionDate, "YYYY-MM-DD"),
    State: location?.stateId,
    Status: location?.statusId,
    quantity: location?.quantity,
    amount: location?.amount,
    vendorId: location?.vendorId,
    vendorType: location?.vendorType,
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    setValue,
    getValues,
    // watch,
    formState: { isValid },
  } = formMethods;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadFile, setUploadFile] = useState(null);
  const { vendor } = useSelector((state) => state);
  const { isLoading } = useSelector((state) => state.assets);
  const { assets, assetClass, assetTypes } = useSelector(
    (state) => state?.global
  );

  const { consummableSetUp } = useSelector((x) => x);

  console.log({ assets, assetClass, assetTypes });

  useEffect(() => {
    dispatch(
      GetVendors({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 2,
      })
    );
    dispatch(
      GetConsummableRegister({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 2,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data) => {
    const combinedData = {
      ...data,
      ConsumableAcquisitionId: location?.id,
      State: +data?.State,
      Status: +data?.Status,
      consumableCategoryId:
        consumableDetails?.categoryId || location?.consumableCategoryId,
      consumableClassId:
        consumableDetails?.classId || location?.consumableClassId,
      VendorId: assetItems?.id || location?.vendorId,
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
      ? dispatch(EditConsummableAcquisition(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${location?.id}/view`);
          }
        })
      : dispatch(CreateConsummableAcquisition(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${res?.payload?.responseObject?.id}/view`);
          }
        });
  };

  return (
    <PageLayout
      title={`${location ? "Edit" : "Add"}  Consummable Acquisition Management`}
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
                  title={"Consummable Name"}
                  camelCase={"consumableId"}
                  isOptional={true}
                  array={consummableSetUp?.Consummable_register?.result?.map?.(
                    (x, index) => (
                      <option key={index} value={x?.id}>
                        {x?.itemName}
                      </option>
                    )
                  )}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound =
                        consummableSetUp?.Consummable_register?.result?.find(
                          (x) => +e.target.value === x?.id
                        );
                      setValue("Description", isFound?.description);
                      // console.log(isFound);
                      setConsumabeDetails(isFound);
                      return;
                    },
                  }}
                />
                <FormInput
                  title={"Acquisition Date"}
                  camelCase={"AcquisitionDate"}
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
              </div>
              <div>
                <FormInput
                  title={"Quantity"}
                  camelCase={"quantity"}
                  placeholder={"select"}
                  type="text"
                />
                <FormInput
                  title={"Amount"}
                  camelCase={"amount"}
                  placeholder={"select"}
                  type="text"
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
                {/* {JSON.stringify(assetItems, null, 2)} */}
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
              Supporting Documents
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
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
                            <TableActionsDownload />
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
