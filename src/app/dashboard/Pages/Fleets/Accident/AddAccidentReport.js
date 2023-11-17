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
import { ActionButtons } from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  CreateAccidentReport,
  GetAllFleets,
  GetAllVehicleDocumentType,
  UpdateAccidentReport,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { AccidentType } from "../../../../../utils/const/AccidentReportConst";
import { GetAquisitionSingle_Asset } from "../../../../../utils/redux/Assets/AssetSlice";
import { Regrex } from "../../../../../utils/functions/Regex";
import { removeListData } from "../../../../../utils/functions/ResourceFunctions";
import FleetFormUploadComponent from "../../../Components/Forms/FleetFormUploadComponent";
import {
  GetLocalStorage,
  GetUserId,
} from "../../../../../utils/functions/GetLocalStorage";
import { GetEmployees } from "../../../../../utils/redux/Global/GlobalSlice";

function AddAccidentReport() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;
  const { fleet } = useSelector((state) => state);
  const { single_asset_acquisition } = useSelector((state) => state?.assets);
  const { all_document_type } = useSelector((state) => state?.fleet);
  const { employees } = useSelector((state) => state?.global);
  const [driverItems, setDriverItems] = useState([]);
  const [insurance, setInsurance] = useState("");
  const [accidentTypes, setAccidentTypes] = useState({});
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadDocument, setUploadDocument] = useState(
    location?.documents || []
  );
  const [documentList, setDocumentList] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState({ id: "", name: "" });
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const userData = GetLocalStorage();

  const userId = GetUserId(userData?.userToken);

  const handleDriverChange = (e) => {
    setSelectedVehicle("");
    setDriverItems([]);
    setInsurance("");

    const selectedValue = e.target.value;
    console.log(e.target.selectedOptions[0]);
    const isDriver = selectedValue.startsWith("driver_");
    const id = selectedValue.substring(selectedValue.indexOf("_") + 1);

    let filteredFleet;
    if (isDriver) {
      filteredFleet = fleet?.all_fleets?.pageItems?.filter(
        (x) => +x?.driverId === +id
      );
      setSelectedDriver({
        id: filteredFleet[0]?.driverId,
        name: filteredFleet[0]?.driverName,
      });
    } else {
      filteredFleet = fleet?.all_fleets?.pageItems?.filter(
        (x) => +x?.fleetOwnerId === +id
      );
      setSelectedDriver({
        id: filteredFleet[0]?.fleetOwnerId,
        name: filteredFleet[0]?.fleetOwnerName,
      });
    }

    setDriverItems(filteredFleet);

    const vehicleDocuments = all_document_type?.data?.map((x) => ({
      name: x?.title,
      value: x?.uuId,
    }));
    setDocumentList(vehicleDocuments);
  };

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);

    const isFound = fleet?.all_fleets?.pageItems?.find(
      (x) => +e.target.value === x?.id
    );

    setSelectedVehicle(isFound?.fleetName);

    findFleetInsurance(isFound?.acquisitionId);
  };

  useEffect(() => {
    dispatch(
      GetAllFleets({
        pageSize: 100000,
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

    dispatch(
      GetEmployees({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
      })
    );

    const vehicleInsurance =
      single_asset_acquisition?.responseObject?.insuranceCompany;
    setInsurance(vehicleInsurance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [single_asset_acquisition]);

  const findFleetInsurance = (assetId) => {
    dispatch(GetAquisitionSingle_Asset(assetId));
  };

  // console.log(userData)
  // console.log(fleet?.all_fleets?.pageItems?.filter(x => x.employeeStaffEmail == userData.emailAddress))

  const defaultData = {
    DriverId: selectedDriver?.id,
    DriverName: selectedDriver?.name,
    Address: location?.Address,
    AccidentDate: location?.Date,
    Description: location?.Description,
    NoOfCasualties: location?.NoOfCasualties,
    ThirdPartyName: location?.ThirdPartyName,
    ThirdPartyVehicle: location?.VehicleName,
    ThirdPartyPlateNumber: location?.PlateNumber,
    ThirdPartyContact: location?.ContactNumber,
    Other: location?.Other,
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
      DriverId: selectedDriver?.id,
      DriverName: selectedDriver?.name,
      VehicleName: selectedVehicle,
      accidentTypes: accidentTypes,
      InsuranceName: insurance,
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
      ? dispatch(UpdateAccidentReport(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.uuid}/view`);
          }
        })
      : dispatch(CreateAccidentReport(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.uuId}/view`);
          }
        });
  };

  return (
    <PageLayout
      title={location ? "Update Report" : "Add Report"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vehicle <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Driver Name"}
                  camelCase={"DriverId"}
                  placeholder={"Select driver name"}
                  // defaultValue={userData.fullName}
                  // defaultValue={fleet?.all_fleets?.pageItems?.filter(x => x.employeeStaffEmail == userData.emailAddress)}
                  disabled={true}
                  array={fleet?.all_fleets?.pageItems?.flatMap((x, index) => {
                    const options = [];

                    if (x?.driverName && x?.driverName.trim() !== "") {
                      options.push(
                        <option
                          key={`driver_${index}`}
                          value={`driver_${x?.driverId}`}
                        >
                          {x?.driverName}
                        </option>
                      );
                    }

                    options.push(
                      <option
                        key={`fleet_${index}`}
                        value={`fleet_${x?.fleetOwnerId}`}
                      >
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
                  value={insurance}
                  type="text"
                  isOptional={true}
                  disabled={true}
                  moreRegister={{
                    onChange: (e) => {
                      setInsurance(e.target.value);
                    },
                  }}
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
              {!location && (
                <>
                  <div>
                    <FormSelect
                      title={"Accident Type"}
                      camelCase={"AccidentType"}
                      placeholder={"select vendor"}
                      array={Object.entries(AccidentType)?.map?.(
                        ([key, value]) => (
                          <option key={key} value={value}>
                            {key}
                          </option>
                        )
                      )}
                      moreRegister={{
                        onChange: (e) => {
                          const isFound = e.target.value;
                          setAccidentTypes(isFound);
                          return;
                        },
                      }}
                    />
                    <FormInput
                      title={"Number of Casualties"}
                      camelCase={"NoOfCasualties"}
                      placeholder={"Number of casualties"}
                      type="number"
                    />
                  </div>
                  <div className={DashboardStyle.textbox_lg}>
                    <FormTextArea
                      title={"Description"}
                      isOptional={true}
                      camelCase={"Description"}
                      placeholder={"Enter description"}
                      type="textbox"
                    />
                  </div>
                </>
              )}
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
                  registerOptions={{
                    pattern: {
                      value: Regrex.phone,
                      message: "Enter a valid Phone Number",
                    },
                  }}
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
                          <td>{x?.file.name}</td>
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

export default AddAccidentReport;
