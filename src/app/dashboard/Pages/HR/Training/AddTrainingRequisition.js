import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FormSelect,
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
import {
  GetAlLEmployees,
  GetAllBranches,
  GetVendors,
} from "../../../../../utils/redux/Vendor/VendorSlice";
import {
    GetNigerianStates,
  GetVendorType,
} from "../../../../../utils/redux/Global/GlobalSlice";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  GetProcBeneficiaries,
  GetProcDepartment,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import { FiPlus } from "react-icons/fi";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { BsDash } from "react-icons/bs";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import { removeListData } from "../../../../../utils/functions/ResourceFunctions";
import { CreateTrainingBeneficiary, CreateTrainingRequisition, GetAllTrainingType } from "../../../../../utils/redux/HR/HRSlice";

function AddProcRequisition() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;
  const { departments, isSubmitting } = useSelector((x) => x?.procurement);
  const [trainingTypeItems, setTrainingTypeItems] = useState({});
  const [vendorItems, setVendorItems] = useState({});
  const { all_vendors, employees, all_branches } = useSelector((state) => state?.vendor);
  const { all_training_type } = useSelector((x) => x?.hr);
  const { states } = useSelector((state) => state?.global);
  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(location?.documents || []);
  const vendors = all_vendors?.result.filter(row => row.businessNature === "Automobile Dealership")

  useEffect(() => {
    dispatch(
      GetAlLEmployees({
        pageSize: 100000,
        pageNumber: 1,
      })
    );
    dispatch(GetNigerianStates());
    dispatch(GetVendorType());
    dispatch(GetProcBeneficiaries());
    dispatch(GetProcDepartment());
    dispatch(GetAllBranches());
    dispatch(
        GetVendors({
            filter: 0,
            pageSize: 10000,
            currentPage: 1,
            sort: 1,
            SubClass: 8,
        })
    );

    dispatch(
        GetAllTrainingType({
            pageSize: 10000,
            currentPage: 1
        })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {
    startDate: location?.startDate,
    endDate: location?.endDate,
    unitCost: location?.unitCost,
    suiteNumber: location?.suiteNumber,
    city: location?.city,
    streetAddress1: location?.streetAddress1,
    streetAddress2: location?.streetAddress2,
    state: location?.state,
    beneficiaries: location?.beneficiaryEl || [
      {
        branchName: "",
        departmentName: "",
        branchId: "",
        departmentId: "",
        employeeName: "",
        employeeId: "",
        beneficiaryType: "",
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
    setValue,
    getValues,
    reset,
    watch,
    formState: { isValid },
  } = formMethods;

  const { id } = useParams();

  const navigate = useNavigate();

  const submit = (data) => {
    const totalData = {
      ...data,
      VendorId: vendorItems?.id,
      VendorName: vendorItems?.businessName,
      TotalCost: data?.beneficiaries?.length * data.unitCost
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
      fileData.append(`departmentName`, key?.departmentName || "");
      fileData.append(`departmentId`, key?.departmentId || "");
    //   fileData.append(`Beneficiaries[${index}].quantity`, key?.quantity || "");
      fileData.append(`branchName`, key?.branch || "");
      fileData.append(`branchId`, key?.branchId || "");
      fileData.append(`employeeName`, key?.employeeName || "");
      fileData.append(`employeeId`, key?.employeeId || "");
      fileData.append(`beneficiaryType`, +key?.beneficiaryType
      );
    });

    const removedVendorDocument = vendorDocument
      ?.map((x) => x)
      ?.filter((x) => "file" in x);

    removedVendorDocument.forEach((element, index) => {
      fileData.append(
        `documentUri[${index}].file`,
        element?.file,
        element?.file?.name
      );
      fileData.append(`documentUri[${index}].fileName`, element?.fileName);
    });

    // console.log(totalData?.beneficiaries)

    

    dispatch(CreateTrainingRequisition(fileData))?.then((res) => {
        if (res?.payload?.successful === true) {
            if(totalData?.beneficiaries?.length > 0){
                const trainingBeneficiary = {
                    trainingBeneficiaries: [],
                    trainingRequisitionId: "",
                };
                trainingBeneficiary.trainingBeneficiaries = totalData?.beneficiaries;
                trainingBeneficiary.trainingRequisitionId = res?.payload?.responseObject?.uuId;
                dispatch(CreateTrainingBeneficiary(trainingBeneficiary))?.then((res2) => {
                    if(res2?.payload?.successful === true){
                        reset();
                        navigate(`../${res?.payload?.responseObject?.uuId}/view`);
                    }
                });
            }
            reset();
            navigate(`../${res?.payload?.responseObject?.uuId}/view`);
        }
    });    
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
  ];

  if (
    !employees ||
    !departments ||
    !all_branches
  ) {
    return <p>Loading...</p>;
  }

  return (
    <PageLayout
      title={location ? "Update Requisition" : "Add Requisition"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Requisition <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div style={{ gridTemplateColumns: "1fr" }}>
                <FormSelect
                  title={"Training Type"}
                  camelCase={"TrainingType"}
                  placeholder={"Select Training Type"}
                  disabled={true}
                    array={all_training_type?.data?.map?.((x, index) => (
                      <option key={index} value={x?.uuId}>
                        {x?.title}
                      </option>
                    ))}
                    moreRegister={{
                      onChange: (e) => {
                        const isFound = all_training_type?.data?.find(
                          (x) => e.target.value === x?.uuId
                        );
                        setValue("TrainingTypeName", isFound?.title);
                        setValue("TrainingTypeId", isFound?.uuId);
                        dispatch(
                          GetVendors({
                            filter: 2,
                            pageSize: 10000,
                            currentPage: 1,
                            sort: 1,
                            SubClass: isFound?.subCLassId,
                          })
                        );
                        setTrainingTypeItems(isFound);
                        return;
                      },
                    }}
                    
                  // isOptional={true}
                />
              </div>
              <div>
              <FormInput
                  title={"Start Date"}
                  camelCase={"startDate"}
                  placeholder={"select start date"}
                  type={"date"}
                />
                <FormInput
                  title={"End Date"}
                  camelCase={"endDate"}
                  placeholder={"select end date"}
                  type={"date"}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Beneficiary <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              {/* {!location && ( */}
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
                      beneficiaries={employees}
                      departments={departments}
                      branches={all_branches}
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
                    <FormInput
                      title={"Unit Cost"}
                      camelCase={"unitCost"}
                      placeholder={"auto generated"}
                    />
                  </div>

                </>
              )}

            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Training <br /> Location
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
                  title={"Street Address1"}
                  camelCase={"streetAddress1"}
                  placeholder={"Enter Street Address 1"}
                  // isOptional={true}
                />
                <FormInput
                  title={"Street Address2"}
                  camelCase={"streetAddress2"}
                  placeholder={"Enter Street Address 2"}
                  isOptional={true}
                />
              </div>
              <div>
                <FormInput
                  title={"City"}
                  camelCase={"city"}
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
              Supporting <br /> Documents
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
            <SupportButtons
              width={"auto"}
              onClick={() => navigate(-1)}
              className={DashboardStyle?.button_cage_weight}
            >
              Cancel
            </SupportButtons>
            <ActionButtons
              width={"auto"}
              isLoading={isSubmitting}
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

export default AddProcRequisition;

function FieldInputs({
  fieldName,
  beneficiaries,
  departments,
  remove,
  index,
  append,
  branches,
}) {
  const { setValue, getValues, watch } = useFormContext();
  const [flip, setFlip] = useState(
    getValues(`${fieldName}.beneficiaryType`)?.toString() || ""
  );

  useEffect(() => {
    setValue(
      `${fieldName}.branchName`,
      branches?.responseObject?.find(
        (x) => x?.id === +watch(`${fieldName}.branchId`)
      )?.txtName
    );

    setValue(
      `${fieldName}.departmentName`,
      departments?.responseObject?.pageItems?.find(
        (x) => x?.id === +watch(`${fieldName}.departmentId`)
      )?.name
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch(`${fieldName}.departmentId`), watch(`${fieldName}.branchId`)]);

  return (
    <>
      <div>
        <FormSelect
          title={"Beneficiary Type"}
          camelCase={`${fieldName}.beneficiaryType`}
          placeholder={"select"}
          array={
            <>
              <option value="0">Individual</option>
              <option value="1">Department</option>
              <option value="2">Branch</option>
            </>
          }
          moreRegister={{
            onChange: (e) => {
              setValue(`${fieldName}.departmentName`, "");
              setValue(`${fieldName}.branchName`, "");
              return setFlip(e.target.value);
            },
          }}
        />
        {flip === "0" && (
          <FormSelect
            title={"Beneficiary Name"}
            camelCase={`${fieldName}.employeeName`}
            placeholder={"select"}
            // array={beneficiaries?.responseObject?.map?.((x, index) => (
            //   <option key={index} value={x?.name}>
            //     {x?.name}
            //   </option>
            // ))}
            array={beneficiaries?.result.map?.((x, index) => (
              <option key={index} value={`${x?.firstName} ${x?.surname}`}>
                {x?.firstName} {x?.surname}
              </option>
            ))}
            moreRegister={{
              onChange: (e) => {
                const isFound = beneficiaries?.result.find(
                  (x) => e.target.value === `${x?.firstName} ${x?.surname}`
                );
                return (
                    setValue(`${fieldName}.employeeId`, isFound?.id),
                  setValue(`${fieldName}.departmentId`, isFound?.departmentId),
                  setValue(`${fieldName}.branchId`, isFound?.branchId)
                );
              },
            }}
          />
        )}
        {flip === "1" && (
          <FormSelect
            title={"Department"}
            camelCase={`${fieldName}.departmentId`}
            placeholder={"select"}
            array={departments?.responseObject?.pageItems?.map?.((x, index) => (
              <option key={index} value={x?.id}>
                {x?.name}
              </option>
            ))}
            moreRegister={{
              onChange: (e) => {
                const isFound = departments?.responseObject?.pageItems?.find(
                  (x) => +e.target.value === x?.name
                );
                // return (
                //   setValue(`${fieldName}.departmentId`, isFound?.departmentId),
                //   setValue(`${fieldName}.branchId`, isFound?.branchId)
                // );
              },
            }}
          />
        )}
        {flip === "0" && (
          <FormSelect
            title={"Department"}
            camelCase={`${fieldName}.departmentId`}
            placeholder={"select"}
            array={departments?.responseObject?.pageItems?.map?.((x, index) => (
              <option key={index} value={x?.id}>
                {x?.name}
              </option>
            ))}
            moreRegister={{
              onChange: (e) => {
                const isFound = departments?.responseObject.pageItems?.find(
                  (x) => +e.target.value === x?.name
                );
                // return (
                //   // setValue(`${fieldName}.department`, isFound?.department),
                //   // setValue(`${fieldName}.branch`, isFound?.branch)
                // );
              },
            }}
          />
        )}
        {flip === "2" && (
          <FormSelect
            title={"Branch"}
            camelCase={`${fieldName}.branchId`}
            placeholder={"select"}
            // isOptional={true}
            // disabled={true}
            array={branches?.responseObject?.map((x) => (
              <option value={x?.id}>{x?.txtName}</option>
            ))}
          />
        )}
        {/* {flip !== "2" && (
          <FormSelect
            title={"Branch"}
            camelCase={`${fieldName}.branchId`}
            placeholder={"select"}
            // isOptional={true}
            // disabled={true}
            array={branches?.responseObject?.map((x) => (
              <option value={x?.id}>{x?.txtName}</option>
            ))}
          />
        )} */}

        {/* <FormInput
          title={`Quantity`}
          camelCase={`${fieldName}.quantity`}
          placeholder={"Enter Quantity"}
        /> */}
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