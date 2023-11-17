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
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  CreateFuelRequest,
  GetAllFleets,
  GetBranch,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { GetFuelVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import {
  FormatDateTime,
  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import { FuelTypes } from "../Requisition/FuelData/FuelTypes";

import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";

function AddFuelRequisition() {
  const location = useLocation()?.state;
  const [amount, setAmount] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );
  const [loggedUser, setLoggedUser] = useState("");
  const [vendorItems, setVendorItems] = useState({});
  const [userItems, setUserItems] = useState({});
  const [branchItems, setBranchItems] = useState({});
  const [enableVendorDropdown, setVendorDropdown] = useState("disabled");
  const [litres, setLitres] = useState(0);
  const [isRateFilled, setIsRateFilled] = useState(false);
  const vendor = useSelector((state) => state?.vendor);
  const { fuel_vendors } = vendor;
  // console.log(fuel_vendors)
  const { all_fleets, get_branch, isLoading } = useSelector(
    (state) => state?.fleet
  );

  const filteredVendors = fuel_vendors?.result?.filter(
    (x) => x?.businessNature === "Filling Station"
  );

  // const GetVendorBranch =(vendorBranchId)=>{
  //   let defaultBranch = get_branch?.responseObject?.filter(
  //     (_) => _.id === vendorBranchId
  //   )[0];
  //   console.log(defaultBranch)
  // }

  const data = GetLocalStorage();

  const GetLoggInUser = () => {
    const filteredNames = all_fleets?.pageItems?.filter(
      (item) =>
        item?.fleetOwnerName?.toLowerCase() === data?.fullName &&
        item?.fleetOwnerName !== null
    )[0];
    setLoggedUser(filteredNames?.fleetOwnerName);
  };


  useEffect(() => {
    if (loggedUser == undefined) {
      setUserItems(loggedUser);
    }
  });
  useEffect(() => {
    GetLoggInUser();
  });
  //console.log()
  const handleAmount = (r, l) => {
    return r * l;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllFleets({ pageSize: 10, pageNumber: 1 }));
    dispatch(GetFuelVendors({ pageSize: 10000, currentPage: 1 }));
    dispatch(GetBranch());
  }, []);

  const defaultData = {
    fuelType: location?.fuelType,
    rate: location?.rate,
    litres: location?.litres,
    amount: location?.amount,
    currentOdometerReading: location?.currentOdometerReading,
    additionalInformation: location?.additionalInformation,
    requisitionDate: FormatDateTime(location?.requisitionDate),
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

  const GetVendorBranchId = (id) => {
    // console.log(id)
    if (typeof id === "undefined" || id === "0") {
      setVendorDropdown("disabled");
      return;
    }
    dispatch(GetBranch({ vendorId: id }));
    setVendorDropdown("");
  };

  //console.log(all_fleets)

  const usersFleet = all_fleets?.pageItems.find(
    (obj) => obj.fleetOwnerName === loggedUser
  );

  const submit = (data, e) => {
    const dataValues = {
      ...data,
      assetId: userItems?.assetId,
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
    const key = Object.keys(dataValues);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, dataValues[key]);
    });

    vendorDocument?.map((x) => x)?.filter((x) => "file" in x);

    vendorDocument.forEach((element, index) => {
      fileData.append(
        `Documents[${index}].file`,
        element?.file,
        element?.file?.name
      );
      fileData.append(`Documents[${index}].fileName`, element?.fileName);
    });

    dispatch(CreateFuelRequest(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${res?.payload?.responseObject}/view`);
      }
    });
  };

  const documentList = [
    {
      name: "Petrol Receipt",
      value: 6,
    },

    {
      name: "Diesel Receipt",
      value: 7,
    },
  ];

  return (
    <PageLayout
      title={location ? "Update Requisition" : "Add Requisition"}
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
                  array={filteredVendors?.map((x, index) => (
                    <option key={index} value={x?.id}>
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
                {/* <FormsSelect
                  title={"Vendor Type"}
                  camelCase={"vendorType"}
                  placeholder={"select vendor type"}
                  // array={fuelVendorTypes?.map?.(
                  //   (vendorType, index) => (
                  //     <option key={index} value={vendorType?.id}>
                  //       {vendorType?.name}
                  //     </option>
                  //   )
                  // )}
                  moreRegister={{
                    onChange: (e) => {
                      GetVendorByVendorType(+e.target.value);
                      return;
                    },
                  }}
                /> */}
              </div>
              <div>
                <FormsSelect
                  title={"Location"}
                  camelCase={"vendorBranchId"}
                  placeholder={"select vendor location"}
                  array={get_branch?.responseObject?.map((x, index) => (
                    <option key={index} value={x?.id}>
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
                  placeholder={"0.00"}
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
                <FormInput
                  title={"Requisition Date"}
                  camelCase={"requisitionDate"}
                  placeholder={"select date"}
                  type={"date"}
                />
                <FormsSelect
                  title={"Requestor"}
                  camelCase={"requestorId"}
                  placeholder={"select fleet owner"}
                  defaultValue={usersFleet?.fleetOwnerName}
                  defaultId={usersFleet?.fleetOwnerId}
                  array={all_fleets?.pageItems?.map((requestor, index) => (
                    <option
                      selected={true}
                      key={index}
                      value={requestor?.fleetOwnerId}
                    >
                      {requestor?.fleetOwnerName}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = all_fleets?.pageItems?.find(
                        (item) => +e.target.value === item?.fleetOwnerId
                      );
                      
                      setUserItems(isFound);
                      // setValue('vehicleName', isFound?.id)
                      return;
                    },
                  }}
                />

                {/* {console.log(loggedUser)} */}
              </div>
              <div>
                <FormInput
                  title={"Asset Name"}
                  camelCase={"vehicleName"}
                  placeholder={"vehicle name"}
                  disabled={true}
                  value={userItems?.fleetName || usersFleet?.fleetName}
                  isOptional={true}
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
                      // console.log(x);
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

export default AddFuelRequisition;
