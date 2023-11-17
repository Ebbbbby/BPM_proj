import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FormSelect,
  PerfectFileUpload,
} from "../../../Components/Forms/InputTemplate";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import {
  GetAssetType,
  GetAssets,
  GetNigerianStates,
} from "../../../../../utils/redux/Global/GlobalSlice";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  CreateProcRequsition,
  GetProcBeneficiaries,
  GetProcDepartment,
  UpdateProcRequsition,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";
import {
  MaintenanceType,
  MaintenanceTypeEnum,
} from "../../../../../utils/const/VehicleMaintenanceConst";
import {
  CreateMaintenanceRequisition,
  GetAllFleets,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import {
  GetAssetComponent,
  GetAssetSingleRegister,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";

function AddFleet() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;
  const [assetItems, setAssetItems] = useState({});
  const [flip, setFlip] = useState("");
  const [fleetItems, setFleetItems] = useState({});
  const { fleet } = useSelector((state) => state);
  const { asset_register, asset_component } = useSelector(
    (state) => state?.assetSetUp
  );
  const [vendorItems, setVendorItems] = useState({});
  const [userItems, setUserItems] = useState({});
  const [componentItems, setComponentItems] = useState({});
  const [maintenanceTypes, setMaintenanceTypes] = useState({});
  const { isLoadingAction, all_vendors } = useSelector(
    (state) => state?.vendor
  );

  const { isLoading, assets, states } = useSelector((state) => state?.global);

  const [uploadFile, setUploadFile] = useState(null);
  const [maintenanceDocument, setMaintenanceDocument] = useState(
    location?.documents || []
  );

  const acq = asset_register?.responseObject;

  useEffect(() => {
    dispatch(GetNigerianStates());
    dispatch(
      GetAllFleets({
        pageSize: 100000,
        currentPage: 1,
        sort: 1,
      })
    );
    dispatch(
      GetVendors({
        filter: 0,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );
    dispatch(
      GetAssetComponent({
        CategoryId: acq?.categoryId || 0,
        AssetClassId: acq?.classInformation?.id || 0,
        AssetSubClassId: acq?.subClassInformation?.id || 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acq]);

  const vendors = all_vendors?.result.filter(
    (row) => row.vendorType === "Repair"
  );
  // const component =

  // console.log(acq)
  console.log(acq);
  console.log(asset_component);

  const users = [
    { id: 1, name: "John Doe", assignedVehicle: "Toyota Camry" },
    { id: 2, name: "Jane Doe", assignedVehicle: "Mitsubishi Pajero" },
    { id: 3, name: "Jack Doe", assignedVehicle: "Nissan Almeria" },
    { id: 4, name: "Joe Doe", assignedVehicle: "Lexus E550" },
  ];

  const defaultData = {
    MaintenanceType: location?.MaintenanceType,
    ComponentId: location?.ComponentId,
    AssetId: location?.assetId,
    MaintenanceDate: location?.MaintenanceDate,
    Amount: location?.Amount,
    Purpose: location?.Purpose,
    Comment: location?.Comment,
  };

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  // const feildArray = useFieldArray({
  //   control: formMethods.control,
  //   name: "beneficiaries",
  // });
  // const { fields, append } = feildArray;

  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { isValid },
  } = formMethods;

  // console.log(watch());
  // console.log({ location });

  const { id } = useParams();

  const navigate = useNavigate();

  const submit = (data) => {
    console.log({ data });

    const fileData = new FormData();
    const key = Object.keys(data);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, data[key]);
    });

    maintenanceDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });

    const formData = {
      ...data,
      id: id,
      status: 1,
      // assetName: assetItems?.name,
      RequestorId: userItems?.fleetOwnerId,
      RequestorName: userItems?.fleetOwnerName,
      AssetName: fleetItems?.fleetName,
      VendorId: vendorItems?.id,
      VendorName: vendorItems?.name,
      ComponentName: componentItems?.name,
      UploadDocuments: maintenanceDocument,
    };

    console.log(formData);

    location
      ? dispatch(UpdateProcRequsition(formData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.uuId}/view`);
          }
        })
      : dispatch(CreateMaintenanceRequisition(formData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.uuId}/view`);
          }
        });
  };

  // if (!assets || !all_vendors) {
  //   return <p>Loading...</p>;
  // }
  return (
    <PageLayout
      title={location ? "Edit Requisition" : "Add Requisition"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Maintenance <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              {!location && (
                <>
                  <div>
                    <FormSelect
                      title={"Maintenance Type"}
                      camelCase={"MaintenanceType"}
                      placeholder={"Auto Generated"}
                      disabled={true}
                      array={Object.entries(MaintenanceType)?.map?.(
                        ([key, value]) => (
                          <option key={key} value={value}>
                            {key}
                          </option>
                        )
                      )}
                      moreRegister={{
                        onChange: (e) => {
                          const isFound = e.target.value;
                          setMaintenanceTypes(isFound);
                          return;
                        },
                      }}
                    />
                    <FormSelect
                      title={"Component"}
                      camelCase={"ComponentId"}
                      placeholder={"select"}
                      isOptional={true}
                      array={asset_component?.responseObject?.map?.(
                        (x, index) => (
                          <option key={index} value={x?.id}>
                            {x?.name}
                          </option>
                        )
                      )}
                      moreRegister={{
                        onChange: (e) => {
                          const isFound = asset_component?.responseObject?.find(
                            (x) => +e.target.value === x?.id
                          );
                          // console.log(isFound);
                          setComponentItems(isFound);
                          return;
                        },
                      }}
                    />
                  </div>

                  <div>
                    <FormSelect
                      title={"Vehicle Name"}
                      camelCase={"AssetId"}
                      placeholder={"select"}
                      isOptional={true}
                      array={fleet?.all_fleets?.pageItems?.map?.((x, index) => (
                        <option key={index} value={x?.id}>
                          {x?.fleetName}
                        </option>
                      ))}
                      moreRegister={{
                        onChange: (e) => {
                          const isFound = fleet?.all_fleets?.pageItems?.find(
                            (x) => +e.target.value === x?.id
                          );
                          // setValue("Description", isFound?.description);
                          // console.log(isFound);
                          dispatch(GetAssetSingleRegister(isFound.assetId));
                          setFleetItems(isFound);
                          return;
                        },
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Other <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              {!location && (
                <>
                  <div>
                    <FormSelect
                      title={"Vendor Name"}
                      camelCase={"VendorId"}
                      placeholder={"select vendor"}
                      array={vendors?.map?.((x, index) => (
                        <option key={index} value={x?.id}>
                          {x?.businessName}
                        </option>
                      ))}
                      moreRegister={{
                        onChange: (e) => {
                          const isFound = vendors?.find(
                            (x) => +e.target.value === x?.id
                          );
                          setVendorItems(isFound);
                          return;
                        },
                      }}
                    />
                    <FormSelect
                      title={"Requested By"}
                      camelCase={"RequestorId"}
                      placeholder={"select requestor"}
                      array={fleet?.all_fleets?.pageItems?.map?.((x, index) => (
                        <option key={index} value={x?.id}>
                          {x?.fleetOwnerName}
                        </option>
                      ))}
                      moreRegister={{
                        onChange: (e) => {
                          const isFound = fleet?.all_fleets?.pageItems?.find(
                            (x) => +e.target.value === x?.id
                          );
                          // setValue("Description", isFound?.description);
                          console.log(isFound);
                          setUserItems(isFound);
                          return;
                        },
                      }}
                    />
                    <FormInput
                      title={"Maintenance Date"}
                      camelCase={"MaintenanceDate"}
                      placeholder={"maintenance date"}
                      type="date"
                    />
                    <FormInput
                      title={"Amount"}
                      camelCase={"Amount"}
                      placeholder={"enter amount"}
                      // registerOptions={{
                      //   onChange: (e) => console.log(e.target.value),
                      // }}
                    />
                  </div>
                  <div className={DashboardStyle.textbox_lg}>
                    <FormTextArea
                      title={"Purpose (Optional)"}
                      isOptional={false}
                      camelCase={"Purpose"}
                      placeholder={"enter description of the vehicle"}
                      type="textbox"
                    />
                  </div>
                </>
              )}
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormTextArea
                  title={"Other (Optional)"}
                  isOptional={false}
                  camelCase={"Comment"}
                  placeholder={"enter other information"}
                  type="textbox"
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Uploads supporting <br /> document
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
                      setMaintenanceDocument([
                        ...maintenanceDocument,
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
            <h4 className={DashboardStyle.form_section_title}>Uploaded</h4>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
            >
              {maintenanceDocument?.length === 0 ? (
                <p>No Record Available</p>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>File Name</th>
                      <th>File Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceDocument?.map?.((x, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.file?.type?.split("/")[1]}
                          </td>
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
              className={DashboardStyle?.button_cage_weight}
            >
              Save as Draft
            </SupportButtons>
            <ActionButtons
              isLoading={isLoadingAction}
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
            >
              Submit
              {/* {isLoadingAction ? "Submitting..." : "Submit"} */}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default AddFleet;
