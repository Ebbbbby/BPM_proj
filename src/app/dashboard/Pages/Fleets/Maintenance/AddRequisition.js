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
import { UpdateProcRequsition } from "../../../../../utils/redux/Procurement/ProcurementSlice";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { MaintenanceType } from "../../../../../utils/const/VehicleMaintenanceConst";
import {
  CreateMaintenanceRequisition,
  GetAllFleets,
  GetAllVehicleDocumentType,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import {
  GetAssetComponent,
  GetAssetSingleRegister,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import FleetFormUploadComponent from "../../../Components/Forms/FleetFormUploadComponent";
import { removeListData } from "../../../../../utils/functions/ResourceFunctions";

function AddMaintenanceRequisition() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;
  const [fleetItems, setFleetItems] = useState({});
  const { fleet } = useSelector((state) => state);
  const { asset_register, asset_component } = useSelector(
    (state) => state?.assetSetUp
  );
  const [vendorItems, setVendorItems] = useState({});
  const [userItems, setUserItems] = useState({});
  const [componentItems, setComponentItems] = useState({});
  const [setMaintenanceTypes] = useState({});
  const { isLoadingAction, all_vendors } = useSelector(
    (state) => state?.vendor
  );
  const { all_document_type } = useSelector((state) => state?.fleet);

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

    dispatch(
      GetAllVehicleDocumentType({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acq]);

  const vendors = all_vendors?.result.filter(
    (row) => row.businessNature === "Automobile Dealership"
  );

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

  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isValid },
  } = formMethods;

  const { id } = useParams();

  const navigate = useNavigate();

  const submit = (data) => {
    const formData = {
      ...data,
      id: id,
      RequestorId: userItems?.fleetOwnerId,
      RequestorName: userItems?.fleetOwnerName,
      AssetName: fleetItems?.fleetName,
      VendorId: vendorItems?.id,
      VendorName: vendorItems?.businessName,
      ComponentName: componentItems?.name,
    };

    const fileData = new FormData();
    const key = Object.keys(formData);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, formData[key]);
    });

    uploadDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });

    uploadDocument?.map((x) => x)?.filter((x) => "file" in x);

    location
      ? dispatch(UpdateProcRequsition(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.uuId}/view`);
          }
        })
      : dispatch(CreateMaintenanceRequisition(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.uuId}/view`);
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
              {!location && (
                <>
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
                          dispatch(GetAssetSingleRegister(isFound.assetId));
                          setFleetItems(isFound);

                          const vehicleDocuments = all_document_type?.data?.map(
                            (x) => ({ name: x?.title, value: x?.uuId })
                          );
                          setDocumentList(vehicleDocuments);
                          return;
                        },
                      }}
                    />
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
                  </div>

                  <div>
                    <FormSelect
                      title={"Component"}
                      camelCase={"ComponentId"}
                      placeholder={"select"}
                      isOptional={false}
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
                          setComponentItems(isFound);
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
            <FleetFormUploadComponent
              documentList={documentList}
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
              {uploadDocument?.length === 0 ? (
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
                    {uploadDocument?.map?.((x, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.file?.type?.split("/")[1]}
                          </td>
                          <td>
                            <TableActionsDownload
                            file={x?.file}
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

export default AddMaintenanceRequisition;
