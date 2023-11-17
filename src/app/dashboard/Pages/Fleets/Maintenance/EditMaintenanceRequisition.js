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
import { useDispatch, useSelector } from "react-redux";
import { GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import { useLocation, useNavigate, useParams } from "react-router";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { MaintenanceType } from "../../../../../utils/const/VehicleMaintenanceConst";
import {
  GetAllFleets,
  GetAllVehicleDocumentType,
  GetCentralRepositoryDocuments, UpdateMaintenanceRequisition,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { FormatDateTime, removeListData } from "../../../../../utils/functions/ResourceFunctions";
import {
  GetAssetComponent,
  GetAssetSingleRegister,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import FleetFormUploadComponent from "../../../Components/Forms/FleetFormUploadComponent";

function AddMaintenanceRequisition() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;
  const [fleetItems, setFleetItems] = useState({});
  const [vendorItems, setVendorItems] = useState({});
  const [userItems, setUserItems] = useState({});
  const [componentItems, setComponentItems] = useState({});
  const [maintenanceTypes, setMaintenanceTypes] = useState({});
  const { fleet } = useSelector((state) => state);
  const { isLoadingAction, all_vendors } = useSelector(
    (state) => state?.vendor
  );
  const { asset_register, asset_component } = useSelector(
    (state) => state?.assetSetUp
  );
  const { repo_document, all_document_type } = useSelector((state) => state?.fleet);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadDocument, setUploadDocument] = useState(
    location?.documents || []
  );
  const [documentList, setDocumentList] = useState([]);

  const acq = asset_register?.responseObject;

  useEffect(() => {
    dispatch(
      GetAllFleets({
        pageSize: 100000,
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
    dispatch(
      GetVendors({
        filter: 0,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );
    dispatch(
      GetAllVehicleDocumentType({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
      })
    );

 
    dispatch(GetCentralRepositoryDocuments({
      recordId: id || "",
      category: 2
    }));

    const vehicleDocuments = all_document_type?.data?.map(x => ({name: x?.title, value: x?.uuId}));
    if (!isEqual(vehicleDocuments, documentList)) {
      setDocumentList(vehicleDocuments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentList]);

  const vendors = all_vendors?.result.filter(
    (row) => row.vendorType === "Repair"
  );

  const defaultData = {
    MaintenanceType: Object.keys(MaintenanceType).find(
      (key) => MaintenanceType[key] === location?.maintenanceType
    ),
    ComponentId: location?.componentId,
    ComponentName: location?.componentName,
    AssetId: location?.assetId,
    AssetName: location?.assetName,
    VendorId: location?.vendorId,
    MaintenanceDate: FormatDateTime(location?.maintenanceDate, "YYYY-MM-DD"),
    Amount: location?.amount,
    Purpose: location?.purpose,
    Comment: location?.comment,
  };

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const navigate = useNavigate();

  const { id } = useParams();

  const submit = (data) => {
    const formData = {
      ...data,
      uuid: id,
      MaintenanceType:
        Object.keys(MaintenanceType).find(
          (key) => MaintenanceType[key] === maintenanceTypes
        ) || location?.maintenanceType,
      AssetName:
        Object.keys(fleetItems).length !== 0
          ? fleetItems?.fleetName
          : data?.AssetName,
      RequestorId:
        Object.keys(userItems).length !== 0
          ? userItems?.fleetOwnerId
          : location?.requestorId,
      RequestorName:
        Object.keys(userItems).length !== 0
          ? userItems?.fleetOwnerName
          : location?.requestorName,
      VendorName:
        Object.keys(vendorItems).length > 0
          ? vendorItems?.businessName
          : location?.vendorName,
      ComponentName:
        Object.keys(componentItems).length !== 0
          ? componentItems?.name
          : location?.componentName,
    };

    const fileData = new FormData();
    const key = Object.keys(formData);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, formData[key]);
    });
    
    uploadDocument?.map((x) => x)?.filter((x) => "file" in x);

    uploadDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });


    dispatch(UpdateMaintenanceRequisition(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${location?.uuId}/view`);
      }
    });
  };

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
              <div>
              <FormSelect
                    title={"Vehicle Name"}
                    camelCase={"AssetId"}
                    placeholder={"select Vehicle Name"}
                    defaultValue={location?.assetName}
                    defaultId={location?.assetId}
                    isOptional={false}
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
                        dispatch(GetAssetSingleRegister(isFound.assetId))
                        setFleetItems(isFound);
                        return;
                      },
                    }}
                />
                <FormSelect
                  title={"Maintenance Type"}
                  camelCase={"MaintenanceType"}
                  placeholder={"Auto Generated"}
                  defaultValue={location?.maintenanceType}
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
              </div>

              <div>
                <FormSelect
                  title={"Component"}
                  camelCase={"ComponentId"}
                  placeholder={"select"}
                  defaultValue={location?.componentName}
                  defaultId={location?.componentId}
                  isOptional={false}
                  array={asset_component?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = asset_component?.responseObject?.find(
                        (x) => +e.target.value === x?.id
                      );
                      setComponentItems(isFound);
                      return;
                    },
                  }}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Other <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Vendor Name"}
                  camelCase={"VendorId"}
                  placeholder={"select vendor"}
                  defaultValue={location?.vendorName}
                  defaultId={location?.vendorId}
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
                  defaultValue={location?.requestorName}
                  defaultId={location?.requestorId}
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
                />
              </div>
              <div className={DashboardStyle.textbox_lg}>
                <FormTextArea
                    title={"Purpose"}
                    isOptional={true}
                    camelCase={"Purpose"}
                    placeholder={"enter description of the vehicle"}
                    type="textbox"
                />
              </div>
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
            <FleetFormUploadComponent
              documentList={all_document_type?.data?.map(x => ({name: x?.title, value: x?.uuId}))}
              uploadFile={uploadFile}
              setUploadFile={setUploadFile}
              setUploadDocument={setUploadDocument}
              uploadDocument={uploadDocument}
              isOptional={false}
            />
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>Uploaded</h4>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
            >
              {repo_document?.responseObject?.length === 0 ? (
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
                    {repo_document?.responseObject?.map((x, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.fileName}</td>
                          <td>{x?.fileType}</td>
                          <td>{FormatDateTime(x?.createdDate)}</td>
                          <td>
                          <TableActionsDownload
                            file={x?.fileURL || null}
                            url={x?.fileURL || null}
                            actions={() =>
                              removeListData({
                                value: index,
                                list: uploadDocument,
                                setList: setUploadDocument,
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
            <ActionButtons
              isLoading={isLoadingAction}
              disabled={!isValid}
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

function isEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export default AddMaintenanceRequisition;
