import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormSelect,
  FormTemplate,
  FormTextArea,
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
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { GetMyBeneficiaryInfo, UpdateEmployeeClaims } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { GetFuelVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import { removeListData } from "../../../../../utils/functions/ResourceFunctions";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { GetAllHospitals } from "../../../../../utils/redux/Employee/EmployeeSlice";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";
import { CreateEmployeeClaims } from "../../../../../utils/redux/Employee/EmployeeSlice";
import { BsDash } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
function AddEmployeeExtentedClaim() {
  const location = useLocation()?.state;
  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hideHospital, setHideHospital] = useState();

  const { isLoading, get_beneficiary_info, get_hospitals } = useSelector(
    (state) => state?.employee

  );
  const { fuel_vendors } = useSelector((state) => state?.vendor);
  const [vendorItems, setVendorItems] = useState({})
  const [hospitalItems, setHospialItems] = useState({})



  useEffect(() => {
    dispatch(GetFuelVendors({ pageSize: 10000, currentPage: 1 }));
    dispatch(
      GetMyBeneficiaryInfo({
        pageNumber: 1,
        pageSize: 10000,
      }),
      dispatch(
        GetAllHospitals({
          pageNumber: 1,
          pageSize: 10000,
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {
hospitalAdress:location?.hospitalAddress,
phoneNumber:location?.PhoneNumber,
vendorCategory:location?.vendorCategory,
beneficiaryCategory:location?.beneficiaryCategory,
relationship:location?.relationship,
dateOfAppointment:location?.dateOfAppointment,
requestDescription:location?.requestDescription,
    beneficiaries: location?.beneficiary || [
      {
        employeeId: "",
        PatientName: "",
        employeeName:"",
        beneficiariesNames:[],
        
        
      },
    ],
  };

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const feildArray = useFieldArray({
    control: formMethods.control,
    name: "beneficiaries",
  });
  const { fields, append, remove } = feildArray;

  const {
    handleSubmit,
    reset,

    formState: { isValid },
  } = formMethods;

  const submit = (data, e) => {
    const totalData = {
      ...data,
      vendorName: vendorItems?.businessName,
      hospitalName:hospitalItems?.hospitalName,
    };
    const fileData = new FormData();
    const key = Object.keys(totalData);

    const removedKey = ["beneficiaries", "vendors"];

    const removedUnwantedKey = key
      ?.map((x) => x)
      ?.filter((x) => !removedKey.includes(x));

    removedUnwantedKey?.forEach((key, index) => {
      fileData.append(`${key}`, totalData[key]);
    });
  

    totalData?.beneficiaries?.forEach((key, index) => {
      console.log(key, '')
      fileData.append(
        `Beneficiaries[${index}].employeeId`,
        key?.accountName || ""
      );
      fileData.append(
        `Beneficiaries[${index}].beneficiaryName`,
        key?.beneficiaryName || ""
      );
      fileData.append(
        `Beneficiaries[${index}].beneficiaryId`,
        key?.beneficiaryId || ""
      );
    });

    key?.forEach((key, index) => {
      fileData.append(`${key}`, data[key]);
    });
    vendorDocument.forEach((element, index) => {
      fileData.append(
        `MedicalDocuments[${index}].file`,
        element?.file,
        element?.file?.name
      );
      fileData.append(`MedicalDocuments[${index}].fileName`, element?.fileName);
      fileData.append(`VendorName`, vendorItems?.businessName);
      fileData.append(`HospitalName`, hospitalItems?.hospitalName);


    });

  //  console.log(data, "data");
  //  console.log(totalData, "totaldata");

    // return;
    location
    ? dispatch(UpdateEmployeeClaims(fileData))?.then((res) => {
        if (res?.payload?.successful === true) {
          reset();
          navigate(`../${location?.id}/view`);
        }
      }):
    dispatch(CreateEmployeeClaims(fileData))?.then((res) => {
      console.log(res);
      if (res?.payload?.successful === true) {
        reset();
        navigate(`../${res?.payload?.responseObject}/view`);
      }
    });
  };
  const documentList = [
    {
      name: "Supporting Document - I",
      value: 100,
    },

    {
      name: "Supporting Document - II",
      value: 101,
    },
  ];

  return (
    <PageLayout
      title={location ? "Edit Extended Claim" : "Add Extended Claims"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Beneficiary <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              {fields?.map((x, index) => {
                const fieldName = `beneficiaries.[${index}]`;
                return (
                  <fieldset
                    className={DashboardStyle.inputs_group}
                    name={fieldName}
                    key={fieldName}
                    style={{
                      border: "none",
                      borderTop: "1px solid #d9e9d9",
                      paddingTop: "1rem",
                    }}
                  >
                    <FieldInputs
                      append={() => append()}
                      remove={(index) => remove(index)}
                      index={index}
                      fieldName={fieldName}
                      beneficiaries={get_beneficiary_info}
                  
                    />
                  </fieldset>
                );
              })}
            </div>
      
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Vendor"}
                  camelCase={"vendorId"}
                  placeholder={"Select"}
                  array={fuel_vendors?.result?.map((requestor, index) => (
                    <option key={index} value={+requestor?.id}>
                      {requestor?.businessName}
                    </option>
                  ))}

                  moreRegister={{
                    onChange: (e) => {
                      const isFound =
                      fuel_vendors?.result?.find(
                          (x) => +e.target.value === x?.id
                        );
                        setVendorItems(isFound)
                    },
                  }}
                />

                   <FormInput
                    title={"Vendor Category"}
                    camelCase={"vendorCategory"}
                    placeholder={"Enter"}
                  />

                <FormSelect
                  title={"Hospital"}
                  camelCase={"hospitalId"}
                  placeholder={"Select"}
                  array={get_hospitals?.responseObject?.pageItems?.map(
                    (requestor, index) => (
                      <option key={index} value={+requestor?.id}>
                        {requestor?.hospitalName}
                      </option>
                    )
                  )}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound =
                        get_hospitals?.responseObject?.pageItems?.find(
                          (x) => +e.target.value === x?.id
                        );
                      setHideHospital(isFound);
                      setHospialItems(isFound)
                    },
                  }}
                />
              </div>
              {!hideHospital && (
                <div>
                  <FormInput
                    title={"Hospital Name"}
                    camelCase={"hospitaName"}
                    placeholder={"Enter"}
                  />
                  <FormInput
                    title={"Hospital Address"}
                    camelCase={"hospitalAdress"}
                    placeholder={"select"}
                  />
                </div>
              )}
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Requisiton <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Phone Number"}
                  camelCase={"phoneNumber"}
                  placeholder={"Enter"}
                />
                <FormInput
                  title={"Amount"}
                  camelCase={"amount"}
                  placeholder={"Enter vendor location"}
                  type={"double"}
                />
              </div>

              <div>
                <FormInput
                  title={"Appointmant Date"}
                  camelCase={"dateOfAppointment"}
                  placeholder={"select"}
                  type={"date"}
                />
                <FormInput
                  title={"Relationship"}
                  camelCase={"relationship"}
                  placeholder={"Enter"}
                />
              </div>

              <div>
                <FormTextArea
                  title={"Request Description"}
                  camelCase={"requestDescription"}
                  placeholder={"enter"}
                />
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents Upload
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorDocument?.map?.((x, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{x?.file?.name || x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.value || x?.fileName}
                          </td>
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

export default AddEmployeeExtentedClaim;

function FieldInputs({
  fieldName,
  beneficiaries,
  remove,
  index,
  append,
  location,

}) {
  const { getValues, watch } = useFormContext();
  const [flip, setFlip] = useState(
    getValues(`${fieldName}.beneficiaryCategory`)?.toString() || ""
  );
  const user = GetLocalStorage()

  return (
    <>
      <div>
        <FormSelect
          title={"Beneficiary Category"}
          camelCase={`${fieldName}.beneficiaryCategory`}
          placeholder={"select"}
          array={
            <>
              <option value="0">Self</option>
              <option value="1">Medical Beneficiary</option>
              <option value="2">Other</option>
            </>
          }
          moreRegister={{
            onChange: (e) => {
              return setFlip(e.target.value);
            },
          }}
        />
        {flip === "0" && (
          <FormInput
            title={"Employee Name"}
            camelCase={`${fieldName}.employeeName`}
            placeholder={"select"}
            value={user?.fullName}
          />
        )}

        {flip === "1" && (
          <div>
            <MultiSelect
              data={beneficiaries?.responseObject?.pageItems?.map(
                (item, index) => {
                  return {
                    name:
                      item?.firstName +
                      " " +
                      item?.othernames +
                      " " +
                      item?.surname,
                    checkBoxName: item?.firstName + " " + item?.surname,
                    id: item?.id,
                    ...item,
                  };
                }
              )}
              dataValues={
                beneficiaries?.responseObject?.pageItems===1
                  ? [watch()?.beneficiaryId]
                  : watch()?.beneficiaryId || [
                   location?.get_beneficiary_info?.map((x) => x?.id),
                    ]
              }
              name={"beneficiaryId"}
              title={"Beneficiaries"}
            />

            {/* <FormSelect
              title={"Beneficiary"}
              camelCase={`${fieldName}.beneficiaryId`}
              placeholder={"select"}
              array={get_beneficiary_info?.responseObject?.pageItems?.map?.(
                (x, index) => (
                  <option key={index} value={x?.id}>
                    {x?.name}
                  </option>
                )
              )}
              moreRegister={{
                onChange: (e) => {
                  const isFound =
                    get_beneficiary_info?.responseObject.pageItems?.find(
                      (x) => +e.target.value === x?.name
                    );
                },
              }}
            /> */}
          </div>
        )}

        {flip === "2" && (
          <FormInput
            title={"Beneficiary Name"}
            camelCase={`${fieldName}.beneficiaryName`}
            placeholder={"select"}
            // isOptional={true}
            // disabled={true}
          />
        )}
      </div>
      {index !== 0 ? (
        <div
          style={{
            color: "#E61B00",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "5px",
            marginTop: "1rem",
          }}
          onClick={() => remove?.(index)}
        >
          <BsDash />

          <p>Remove Setup</p>
        </div>
      ) : (
        <div
          style={{
            color: "var(--primary-color)",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "5px",
            marginTop: "1rem",
          }}
          onClick={() => append?.({})}
        >
          <FiPlus />
          <p>Add Another</p>
        </div>
      )}
    </>
  );
}
