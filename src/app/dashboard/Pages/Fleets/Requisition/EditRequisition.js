import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FormsSelect,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  UpdateFuelRequest,
  GetBranch,
  GetAllFleets,
  GetSingleFuelRequest
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { GetFuelVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import {
  FormatDateTime,
  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { FuelTypes } from "../Requisition/FuelData/FuelTypes";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";

function EditRequisition() {
  const location = useLocation()?.state;
  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState([]);
  const [amount, setAmount] = useState(null);
  const [vendorItems, setVendorItems] = useState({});
  const [userItems, setUserItems] = useState({});
  const [branchItems, setBranchItems] = useState({});
  const [enableVendorDropdown, setVendorDropdown] = useState("disabled");
  const [rate, setRate] = useState(0);
  const [litres, setLitres] = useState(0);
  const [isRateFilled, setIsRateFilled] = useState(false);
  const vendor = useSelector((state) => state?.vendor);
  const { fuel_vendors } = vendor;
  const { all_fleets, get_branch, isLoading, get_single } = useSelector(
    (state) => state?.fleet
  );

  console.log(location)

  const filteredVendors = fuel_vendors?.result?.filter(
    (x) => x?.businessNature === "Filling Station"
  );

  const handleAmount = (r, l) => {
    return r * l;
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllFleets({ pageSize: 10, pageNumber: 1 }));

    dispatch(GetFuelVendors({ pageSize: 10000, currentPage: 1 }));
    if (location?.vendorId !== undefined) {
      dispatch(GetBranch({ vendorId: location?.vendorId }));
    }
  }, []);

  const GetId = (stringValue) => {
    return FuelTypes.filter((_) => _.name === stringValue)[0].id;
  };

  const GetRequestorAsset = (requestorId) => {
    return all_fleets?.pageItems?.filter(
      (_) => _.fleetOwnerId === requestorId
    )[0].assetId;
  };

  const InitSetup = () => {
    let defaultBranch = get_branch?.responseObject?.filter(
      (_) => _.id === location?.vendorBranchId
    )[0];
    setBranchItems(defaultBranch);
    let defaultVendor = filteredVendors?.filter(
      (_) => _.id === location.vendorId
    )[0];
    setVendorItems(defaultVendor);
    let defaultUserItem = all_fleets?.pageItems?.filter(
      (_) => _.fleetOwnerId === location.requestorId
    )[0];
    setUserItems(defaultUserItem);
  };

  const defaultData = {
    fuelType: GetId(location?.fuelType),
    rate: location?.rate,
    litres: location?.litres,
    amount: location?.amount,
    requestorId: location?.requestorId,
    currentOdometerReading: location?.currentOdometerReading,
    additionalInformation: location?.additionalInformation,
    requisitionDate: FormatDateTime(location?.requisitionDate, "YYYY-MM-DD"),
    vendorId: location?.vendorId,
    vendorBranchId: location?.vendorBranchId,
    assetId: GetRequestorAsset(location?.requestorId),
    vehicleName: location?.vehicleName,
  };

  useEffect(() => {
    InitSetup();
  });
  //console.log(defaultData)
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

  const GetVendorBranchId = (id) => {
    // console.log(id)
    if (typeof id === "undefined" || id === "0") {
      setVendorDropdown("disabled");
      return;
    }
    dispatch(GetBranch({ vendorId: id }));
    setVendorDropdown("");
  };

  const submit = (data, e) => {
    const dataValues = {
      ...data,
      vendorId: vendorItems?.id,
      vendorName: vendorItems?.businessName,
      requestorId: userItems?.fleetOwnerId,
      requestedBy: userItems?.fleetOwnerName,
      vehicleName: userItems?.fleetName,
      vendorBranch: branchItems?.address + ", " + branchItems?.city,
      vendorBranchId: branchItems?.id,
      litres: data.litres,
      rate: data.rate,
      //documents: vendorDocument,
    };
  
    const fileData = new FormData();
    const keys = Object.keys(dataValues);
    keys?.forEach((key, index) => {
      fileData.append(`${key}`, dataValues[key]);
    });

    vendorDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });
    fileData.append("id", id);

    dispatch(UpdateFuelRequest(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${location?.id}/view`);
      }
    });
  };

  const documentList = [
    {
      name: "Petrol Receipt",
      value: 2,
    },

    {
      name: "Diesel Receipt",
      value: 1,
    },
  ];
  return (
    <PageLayout
      title={location ? "Edit Requisition" : "Add Requisition"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Fuel Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormsSelect
                  title={"Fuel Type"}
                  camelCase={"fuelType"}
                  placeholder={"select fuel type"}
                  array={FuelTypes?.map((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                />
                <FormsSelect
                  title={"Vendor Name"}
                  camelCase={"vendorId"}
                  placeholder={"select vendor name"}
                  array={filteredVendors?.map?.((x, index) => (
                    <option
                      selected={location.vendorId === x?.id}
                      key={index}
                      value={x?.id}
                    >
                      {x?.businessName}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = fuel_vendors?.result?.find(
                        (x) => +e.target.value === x?.id
                      );
                      //console.log(isFound)
                      GetVendorBranchId(isFound?.id);
                      setVendorItems(isFound);
                      return;
                    },
                  }}
                />
              </div>
              <div>
                <FormsSelect
                  title={"Location"}
                  camelCase={"vendorBranchId"}
                  placeholder={"select vendor location"}
                  array={get_branch?.responseObject?.map?.((x, index) => (
                    <option
                      selected={location.vendorBranchId === x?.id}
                      key={index}
                      value={x?.id}
                    >
                      {x?.city}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = get_branch?.responseObject?.find(
                        (x) => +e.target.value === x?.id
                      );
                      setBranchItems(isFound);
                      return;
                    },
                  }}
                  disabled={enableVendorDropdown}
                />

                <FormInput
                  title={"Rate"}
                  camelCase={"rate"}
                  placeholder={0.0}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Rate must include only numbers",
                    },
                    onChange: (ev) => {
                      setValue("litres", undefined);
                      setValue("amount", undefined);
                      if (ev.target.value !== undefined) {
                        setIsRateFilled(true);
                      }
                    },
                  }}
                />
              </div>

              <div>
                <FormInput
                  title={"Litres"}
                  camelCase={"litres"}
                  placeholder={"enter litre"}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Litres must be in numbers",
                    },
                    onChange: (e) => {
                      setLitres(e.target.value);
                      const amount = handleAmount(
                        e.target.value,
                        getValues("rate")
                      );
                      setValue("amount", amount);
                    },
                  }}
                  disabled={!isRateFilled}
                />
                <FormInput
                  title={"Amount"}
                  camelCase={"amount"}
                  disabled={true}
                  value={amount}
                  isOptional={true}
                />
              </div>
              <div>
                <FormInput
                  title={"Current Odometer"}
                  camelCase={"currentOdometerReading"}
                  placeholder={"enter currrent odometer"}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Distance must include only numbers",
                    },
                  }}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Requisition <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormsSelect
                  title={"Requestor"}
                  camelCase={"requestorId"}
                  placeholder={"select fleet owner"}
                  array={all_fleets?.pageItems?.map?.((requestor, index) => (
                    <option
                      selected={
                        location.requestorId === requestor?.fleetOwnerId
                      }
                      key={index}
                      value={+requestor?.fleetOwnerId}
                    >
                      {requestor?.fleetOwnerName}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = all_fleets?.pageItems?.find(
                        (x) => +e.target.value === x?.fleetOwnerId
                      );
                      setUserItems(isFound);
                      return;
                    },
                  }}
                />

                <FormInput
                  title={"Asset Name"}
                  camelCase={"vehicleName"}
                  placeholder={"vehicle name"}
                  disabled={true}
                  isOptional={true}
                  value={userItems?.fleetName}
                />
              </div>
              <div>
                <FormInput
                  title={"Requisition Date"}
                  camelCase={"requisitionDate"}
                  placeholder={"select date"}
                  type={"date"}
                />
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Uploads supporting <br /> document
            </h4>

            <FormUploadComponent
              documentList={documentList}
              uploadFile={uploadFile}
              setUploadFile={setUploadFile}
              setVendorDocument={setVendorDocument}
              vendorDocument={vendorDocument}
              isOptional={false}
            />
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents <br /> Uploads
            </h4>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
            >
              {location?.documents?.length === 0 ? (
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
                    {location?.documents?.map?.((x, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.file?.name || x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.value || x?.fileName}
                          </td>
                          <td>{FormatDateTime(new Date())}</td>
                          <td>
                            <TableActionsDownload
                              file={x?.file || null}
                              url={x?.fileUrl || null}
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
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormTextArea
                  title={"Other(Optional)"}
                  camelCase={"additionalInformation"}
                  placeholder={"enter other information"}
                  type="textbox"
                  isOptional={false}
                />
              </div>
            </div>
          </section>
          <div className={DashboardStyle.button_cage}>
            <SupportButtons width={"auto"} onClick={() => navigate("../")}>
              No,Cancel
            </SupportButtons>

            <ActionButtons
              disabled={!isValid}
              isLoading={isLoading}
              className={DashboardStyle?.button_cage_weight}
            >
              {isLoading ? "Submitting" : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default EditRequisition;
