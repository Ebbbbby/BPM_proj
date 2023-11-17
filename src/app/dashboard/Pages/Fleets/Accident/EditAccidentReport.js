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
} from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import {GetAllFleets, GetAllVehicleDocumentType, GetCentralRepositoryDocuments, UpdateAccidentReport} from "../../../../../utils/redux/Fleet/FleetSlice";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { AccidentType } from "../../../../../utils/const/AccidentReportConst";
import { FormatDateTime, removeListData } from "../../../../../utils/functions/ResourceFunctions";
import { GetAquisitionSingle_Asset } from "../../../../../utils/redux/Assets/AssetSlice";
import FleetFormUploadComponent from "../../../Components/Forms/FleetFormUploadComponent";

function AddAccidentReport() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;
  const {fleet, isLoading} = useSelector((state) => state);
  const {single_asset_acquisition} = useSelector((state) => state?.assets);
  const {all_document_type, repo_document} = useSelector((state) => state?.fleet);
  const [driverItems, setDriverItems] = useState([{}]);
  const [insurance, setInsurance] = useState('');
  const [accidentTypes, setAccidentTypes] = useState({});
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadDocument, setUploadDocument] = useState(location?.documents || []);
  const [documentList, setDocumentList] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState({ id: '', name: '' });
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const handleDriverChange = (e) => {
    setSelectedVehicle('');
    setDriverItems([]);
    setInsurance('');
    
    const selectedValue = e.target.value;
    const isDriver = selectedValue.startsWith('driver_');
    const id = selectedValue.substring(selectedValue.indexOf('_') + 1);


    let filteredFleet;
    if (isDriver) {
      filteredFleet = fleet?.all_fleets?.pageItems?.filter(
        (x) => +x?.driverId === +id
      );
      setSelectedDriver({ id: filteredFleet[0]?.driverId, name: filteredFleet[0]?.driverName });
    } else {
      filteredFleet = fleet?.all_fleets?.pageItems?.filter(
        (x) => +x?.fleetOwnerId === +id
      );
      setSelectedDriver({ id: filteredFleet[0]?.fleetOwnerId, name: filteredFleet[0]?.fleetOwnerName });
    }

    setDriverItems(filteredFleet);
  };

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
    
    const isFound = fleet?.all_fleets?.pageItems?.find(
      (x) => +e.target.value === x?.id
    );

    setSelectedVehicle(isFound?.fleetName)

    findFleetInsurance(isFound?.acquisitionId)   
  }; 

  const { id } = useParams();

  useEffect(() => {
    // dispatch(GetAccidentReport(id))
    dispatch(GetAllFleets({
      pageSize: 100000,
      currentPage: 1,
      sort: 1,
    }));

    dispatch(GetAllVehicleDocumentType({
      pageSize: 100000,
      currentPage: 1,
      sort: 0,
    }));

    dispatch(GetCentralRepositoryDocuments({
      recordId: id || "",
      category: 1
    }));

    const vehicleInsurance = single_asset_acquisition?.responseObject?.insuranceCompany;
    setInsurance(vehicleInsurance);

    const vehicleDocuments = all_document_type?.data?.map(x => ({name: x?.title, value: x?.uuId}));
    if (!isEqual(vehicleDocuments, documentList)) {
      setDocumentList(vehicleDocuments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [single_asset_acquisition, documentList]);

  const findFleetInsurance = (assetId = driverItems?.assetId) => {
    dispatch(GetAquisitionSingle_Asset(assetId))
  }

  const defaultData = {
    DriverId: location?.driverId,
    DriverName: location?.driverName,
    VehicleName: location?.VehicleName,
    Address: location?.address,
    AccidentDate: FormatDateTime(location?.accidentDate, "YYYY-MM-DD"),
    Description: location?.description,
    NoOfCasualities: location?.noOfCasualities,
    ThirdPartyName: location?.thirdPartyName,
    ThirdPartyVehicle: location?.thirdPartyVehicle,
    ThirdPartyPlateNumber: location?.thirdPartyPlateNumber,
    ThirdPartyContact: location?.thirdPartyContact,
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

  const submit = (data) => {    
    const formData = {
      ...data,
      uuid: id,
      DriverId: selectedDriver?.id !== undefined ? selectedDriver?.id : location?.driverId,
      DriverName: selectedDriver.name !== undefined ? selectedDriver?.name : location?.driverName,
      VehicleName: selectedVehicle.length !== 0 ? selectedVehicle : location?.vehicleName,
      AccidentType: Object.keys(accidentTypes).length > 0 ? accidentTypes : location?.accidentType,
      InsuranceName: insurance|| location?.insuranceName,
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

    dispatch(UpdateAccidentReport(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${location?.uuId}/view`);
      }
    });
  };

  if (isLoading === true) {
    return <p>Loading...</p>;
  }

  if (!location) {
    return <p>Page Not Found</p>;
  }

  return (
    <PageLayout title={location ? "Edit Report" : "Add Report"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          handleSubmit={handleSubmit(submit)}
          className={DashboardStyle.view_app_components}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vehicle <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Driver Name"}
                  camelCase={"DriverName"}
                  placeholder={"Select driver name"}
                  defaultValue={location?.driverName}
                  defaultId={location?.driverId}
                  array={fleet?.all_fleets?.pageItems?.flatMap((x, index) => {
                    const options = [];
                
                    if (x?.driverName && x?.driverName.trim() !== '') {
                      options.push(
                        <option key={`driver_${index}`} value={`driver_${x?.driverId}`}>
                          {x?.driverName}
                        </option>
                      );
                    }
                
                    options.push(
                      <option key={`fleet_${index}`} value={`fleet_${x?.fleetOwnerId}`}>
                        {x?.fleetOwnerName}
                      </option>
                    );
                
                    return options;
                  })}
                  moreRegister={{
                    onChange: handleDriverChange,
                  }}
                />

                <FormSelect
                  title={"Vehicle"}
                  camelCase={"VehicleName"}
                  placeholder={"Select vehicle"}
                  defaultValue={location?.vehicleName}
                  isOptional={false}
                  disabled={true}
                  value={selectedVehicle} // Set the selected vehicle value
                  array={driverItems?.map((x, index) => {
                    return (
                      <option key={index} value={x?.id}>
                        {x?.fleetName}
                      </option>
                    );
                  })}
                  moreRegister={{
                    onChange: handleVehicleChange,
                  }}
                />
              </div>
              <div className={DashboardStyle.textbox_lg}>
                <FormTextArea
                  title={"Address"}
                  isOptional={true}
                  camelCase={"Address"}
                  placeholder={"enter address"}
                  type="textbox"
                />
              </div>
              <div>
                <FormInput
                  title={"Insurance"}
                  camelCase={"InsuranceName"}
                  placeholder={"Auto generate"}
                  value={
                    single_asset_acquisition?.responseObject
                      ?.insuranceCompany || location?.insuranceName
                  }
                  type="text"
                  isOptional={true}
                  disabled={true}
                />
                <FormInput
                  title={"Date"}
                  camelCase={"AccidentDate"}
                  placeholder={"Select date"}
                  type="date"
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Accident <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              {/* {!location && (
                <> */}
              <div>
                <FormSelect
                  title={"Accident Type"}
                  camelCase={"AccidentType"}
                  placeholder={"select vendor"}
                  defaultId={location?.accidentType}
                  defaultValue={Object.keys(AccidentType).find(
                    (key) => AccidentType[key] === location?.accidentType
                  )}
                  array={Object.entries(AccidentType)?.map?.(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = +e.target.value;
                      setAccidentTypes(isFound);
                      return;
                    },
                  }}
                />
                <FormInput
                  title={"Number of Casualties"}
                  camelCase={"NoOfCasualities"}
                  placeholder={"Number of casualties"}
                  type="number"
                />
              </div>
              <div className={DashboardStyle.textbox_lg}>
                <FormTextArea
                  title={"Description"}
                  isOptional={false}
                  camelCase={"Description"}
                  placeholder={"Enter description"}
                  type="textbox"
                />
              </div>
              {/* </>
              )} */}
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Third Party <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Registered Owner Name"}
                  camelCase={"ThirdPartyName"}
                  placeholder={"Enter owner name"}
                  type="text"
                />
                <FormInput
                  title={"Vehicle Name"}
                  camelCase={"ThirdPartyVehicle"}
                  placeholder={"Enter vehicle name"}
                  type="text"
                />
              </div>
              <div>
                <FormInput
                  title={"Plate Number"}
                  camelCase={"ThirdPartyPlateNumber"}
                  placeholder={"Enter plate number"}
                  type="text"
                />
                <FormInput
                  title={"Contact Number"}
                  camelCase={"ThirdPartyContact"}
                  placeholder={"Enter contact number"}
                  type="text"
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
                  camelCase={"Other"}
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repo_document?.responseObject?.map?.((x, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.file?.type?.split("/")[1]}
                          </td>
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
              //   isLoading={isLoadingAction}
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

export default AddAccidentReport;
