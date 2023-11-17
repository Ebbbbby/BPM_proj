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
import {
  GetSingleVendor,
  UpdateVendor,
} from "../../../../../utils/redux/Vendor/VendorSlice";
import {
  GetCompanyType,
  GetNigerianStates,
  GetServiceType,
  GetVendorType,
} from "../../../../../utils/redux/Global/GlobalSlice";
import { useLocation, useNavigate, useParams } from "react-router";
import { URL } from "../../../../../utils/routes";
import { Regrex } from "../../../../../utils/functions/Regex";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import {
  FormatDateTime,
  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import Table from "../../../Components/Table/Table";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import { GetConsummableSubClass } from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
import { GetAssetSubClass } from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { toast } from "react-toastify";

function AddVendor() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;

  const { isLoadingAction } = useSelector((state) => state?.vendor);
  const { states, companyTypes, vendorsTypes } = useSelector(
    (state) => state?.global
  );

  const { id } = useParams();

  const { assetSetUp, consummableSetUp } = useSelector((x) => x);

  useEffect(() => {
    dispatch(GetSingleVendor({ id: id }));
    dispatch(GetNigerianStates());
    dispatch(GetCompanyType());
    dispatch(GetVendorType());
    dispatch(GetServiceType());
    dispatch(
      GetConsummableSubClass({
        filter: 2,
        pageSize: 10000,
        currentPage: 1,
        searchText: "",
        sort: 1,
      })
    );
    dispatch(
      GetAssetSubClass({
        filter: 2,
        pageSize: 10000,
        currentPage: 1,
        searchText: "",
        sort: 1,
        CategoryId: 0,
        AssetClassId: 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {
    companyName: location?.businessName,
    companyType: location?.companyTypeId,
    businessName: location?.businessName || location?.companyName,
    serviceProvides_assets: location?.serviceProvideAsset?.map((x) =>
      x?.id?.toString()
    ),
    serviceProvides_consumable: location?.serviceProvideConsumable?.map((x) =>
      x?.id?.toString()
    ),
    TaxIdentificationNumber: location?.taxIdentificationNumber,
    ValueAddedTax: location?.valueAddedTax,
    rcNumber: location?.rcNumber,
    vendorType: location?.vendorTypeId,
    businessNature: location?.businessNatureId,
    suiteNumber: location?.suiteNumber,
    address: location?.address,
    City: location?.city,
    state: location?.stateId,
    Email: location?.email,
    PhoneNumber: location?.phoneNumber,
    comment: location?.comment || "",
    AppraisalDate: FormatDateTime(
      location?.appraisal?.appraisalDate,
      "YYYY-MM-DD"
    ),
    SlaDate: FormatDateTime(location?.appraisal?.slaDate, "YYYY-MM-DD"),
    NotificationDate: FormatDateTime(
      location?.appraisal?.notificationDate,
      "YYYY-MM-DD"
    ),
    AppraisalDuration: location?.appraisal?.appraisalDurationId,
  };

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = formMethods;

  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );

  const navigate = useNavigate();

  // console.log(getValues());

  const submit = (data) => {
    const NamesOfServiceProvidesAsset =
      assetSetUp?.asset_sub_class?.responseObject?.filter?.((x) => {
        if (data?.serviceProvides_assets?.includes?.(x?.id?.toString())) {
          return true;
        }
        return false;
      });

    const NamesOfServiceProvidesConsumable =
      consummableSetUp?.Consummable_sub_class?.responseObject?.filter?.((x) => {
        if (data?.serviceProvides_consumable?.includes?.(x?.id?.toString())) {
          // console.log( /x);
          return true;
        }
        return false;
      });
    const fileData = new FormData();
    const key = Object.keys(data);

    const removedServiceProvides = key
      ?.map((x) => x)
      ?.filter((x) => x !== "serviceProvide");

    removedServiceProvides?.forEach((key, index) => {
      fileData.append(`${key}`, data[key]);
    });

    NamesOfServiceProvidesAsset?.forEach((element, index) => {
      fileData.append(`ServiceProvides.Asset[${index}].id`, +element?.id);
      fileData.append(`ServiceProvides.Asset[${index}].name`, element?.name);
    });

    NamesOfServiceProvidesConsumable.forEach((element, index) => {
      fileData.append(`ServiceProvides.Consumable[${index}].id`, +element?.id);
      fileData.append(
        `ServiceProvides.Consumable[${index}].name`,
        element?.name
      );
    });

    fileData.append(`Appraisal.AppraisalDate`, data?.AppraisalDate);
    fileData.append(`Appraisal.NotificationDate`, data?.NotificationDate);
    fileData.append(`Appraisal.SlaDate`, data?.SlaDate);
    fileData.append(`Appraisal.AppraisalDuration`, data?.AppraisalDuration);

    const removedVendorDocument = vendorDocument
      ?.map((x) => x)
      ?.filter((x) => "file" in x);

    removedVendorDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.file?.name
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });

    fileData.append("id", id);

    fileData.append("CertificateOfRegistration", data?.rcNumber);

    if (
      !NamesOfServiceProvidesAsset?.length &&
      !NamesOfServiceProvidesConsumable?.length
    ) {
      return toast.error(
        "You must select atleast one item in either Service Providing (Asset) or Service Providing (Consummable)"
      );
    }

    dispatch(UpdateVendor(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../${location?.id}/${URL.View_Vendor}`);
      }
    });
    // : dispatch(CreateVendor(dataValue));
  };

  const documentList = [
    {
      name: "CAC Certificate",
      value: 2,
    },

    {
      name: "TIN Certificate",
      value: 1,
    },

    {
      name: "SLA Document",
      value: 5,
    },
  ];

  if (!companyTypes || !vendorsTypes || !assetSetUp || !consummableSetUp) {
    return <p>Loading...</p>;
  }

  if (!location) {
    return <p>Page Not Found</p>;
  }
  return (
    <PageLayout title={"Edit Vendor Info"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor Basic <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Business Name"}
                  camelCase={"businessName"}
                  placeholder={"Enter Business Name"}
                />
                <FormSelect
                  title={"Business Nature"}
                  camelCase={"businessNature"}
                  placeholder={"select"}
                  array={companyTypes?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                />
              </div>
              <div>
                <FormSelect
                  title={"Vendor Type"}
                  camelCase={"vendorType"}
                  placeholder={"select"}
                  array={vendorsTypes?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                />
                <FormInput
                  title={"Tax Identification (TIN)"}
                  camelCase={"TaxIdentificationNumber"}
                  placeholder={"Enter Tax Identification"}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Tax Identification must include only numbers",
                    },
                  }}
                />
              </div>
              <div>
                <FormInput
                  title={"Certificate Of Registration"}
                  camelCase={"rcNumber"}
                  placeholder={"Enter Certificate of Registration"}
                />
                <FormInput
                  title={"Website"}
                  camelCase={"ValueAddedTax"}
                  placeholder={"Enter Website"}
                  isOptional={true}
                  registerOptions={{
                    pattern: {
                      value:
                        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/,
                      message: "Enter a valid URL starting with 'https'",
                    },
                  }}
                />
              </div>
              <div style={{ gridTemplateColumns: "1fr" }}>
                <MultiSelect
                  data={assetSetUp?.asset_sub_class?.responseObject?.map(
                    (x) => {
                      return {
                        name: x?.name,
                        checkBoxName: x?.name,
                        id: x?.id,
                        ...x,
                      };
                    }
                  )}
                  dataValues={watch()?.serviceProvides_assets}
                  name={"serviceProvides_assets"}
                  title={"Service Providing (Assets)"}
                  isOptional={
                    watch()?.serviceProvides_consumable?.length >= 1
                      ? true
                      : false
                  }
                />
              </div>
              <div style={{ gridTemplateColumns: "1fr" }}>
                <MultiSelect
                  data={consummableSetUp?.Consummable_sub_class?.responseObject?.map(
                    (x) => {
                      return {
                        name: x?.name,
                        checkBoxName: x?.name,
                        id: x?.id,
                        ...x,
                      };
                    }
                  )}
                  dataValues={watch()?.serviceProvides_consumable}
                  name={"serviceProvides_consumable"}
                  title={"Service Providing (Consumables)"}
                  isOptional={
                    watch()?.serviceProvides_assets?.length >= 1 ? true : false
                  }
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Contact Details
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Apartment Suite Number"}
                  camelCase={"suiteNumber"}
                  placeholder={"Enter Apartment Suite Number"}
                  // isOptional={true}
                />
                <FormInput
                  title={"Street Address"}
                  camelCase={"address"}
                  placeholder={"Enter Street Address"}
                  // isOptional={true}
                />
              </div>
              <div>
                <FormInput
                  title={"City"}
                  camelCase={"City"}
                  placeholder={"Enter City"}
                  // isOptional={true}
                />
                <FormSelect
                  title={"State"}
                  camelCase={"state"}
                  placeholder={"select"}
                  // isOptional={true}
                  array={states?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                />
              </div>
              <div>
                <FormInput
                  title={"Email"}
                  camelCase={"Email"}
                  placeholder={"Enter Email"}
                  type={"email"}
                  disabled={true}
                  isOptional={true}
                  registerOptions={{
                    pattern: {
                      value: Regrex.email,
                      message: "Enter a valid Email Address",
                    },
                  }}
                />
                <FormInput
                  title={"Phone Number"}
                  camelCase={"PhoneNumber"}
                  placeholder={"Enter Phone"}
                  // isOptional={true}
                  registerOptions={{
                    pattern: {
                      value: Regrex.phone,
                      message: "Enter a valid Phone Number",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone Number must not be more than 15 digits",
                    },
                    minLength: {
                      value: 11,
                      message: "Phone Number must be of atleast 11 digits",
                    },
                  }}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional Comments
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormTextArea
                  title={"Comment"}
                  camelCase={"comment"}
                  placeholder={"select"}
                  type="textbox"
                  isOptional={false}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents Upload
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
              Appraisal Setup
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Appraisal Duration"}
                  camelCase={"AppraisalDuration"}
                  placeholder={"Enter Apartment Suite Number"}
                  array={
                    <>
                      <option value="2">Quarterly</option>
                      <option value="4">Bi-Annually</option>
                      <option value="5">Annually</option>
                    </>
                  }
                />
                <FormInput
                  title={"Notification Date"}
                  camelCase={"NotificationDate"}
                  placeholder={"Enter Street Address"}
                  type={"date"}
                />
              </div>
              <div>
                <FormInput
                  title={"Appraisal Date"}
                  camelCase={"AppraisalDate"}
                  placeholder={"Enter Email"}
                  type={"date"}
                />
                <FormInput
                  title={"SLA Date"}
                  camelCase={"SlaDate"}
                  placeholder={"Enter Phone"}
                  type={"date"}
                />
              </div>
            </div>
          </section>

          {/* <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              User and Managing Department Setup
            </h4>
            <div
              style={{ padding: "1rem 0" }}
              className={DashboardStyle.inputs_group_no_grid}
            >
              <div className={DashboardStyle.inputs_checkbox_groups}>
                <div>
                  {" "}
                  <CheckBox name="User Department" isHeading={true} />
                  <CheckBox name="" />
                  <CheckBox name="" />
                  <CheckBox name="" />
                  <CheckBox name="" />
                  <CheckBox name="" />
                </div>
                <div>
                  {" "}
                  <CheckBox name="Managing Department" isHeading={true} />
                  <CheckBox name="" />
                  <CheckBox name="" />
                  <CheckBox name="" />
                  <CheckBox name="" />
                  <CheckBox name="" />
                </div>
              </div>
            </div>
          </section> */}
          <div className={DashboardStyle.button_cage}>
            <SupportButtons
              onClick={() => navigate(-1)}
              className={DashboardStyle?.button_cage_weight}
            >
              Cancel
            </SupportButtons>
            <ActionButtons
              disabled={
                !isValid
                // ||
                // !watch()?.serviceProvides_assets ||
                // !watch()?.serviceProvides_consumable
              }
              className={DashboardStyle?.button_cage_weight}
            >
              {isLoadingAction ? "Submitting..." : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default AddVendor;

// export function CheckBox({ name, isHeading, camelCase }) {
//   return (
//     <div className={DashboardStyle.checkbox_style}>
//       <label
//         style={{
//           fontWeight: isHeading === true && "500",
//           marginBottom: isHeading === true ? "40px" : "0.8rem",
//         }}
//         htmlFor=""
//       >
//         {" "}
//         <input
//           // id={camelCase}
//           // name={camelCase}
//           // {...register(camelCase, {
//           //   required: false,
//           //   message: "",
//           // })}
//           type="checkbox"
//         />
//         {name || "Department One"}
//       </label>
//     </div>
//   );
// }
