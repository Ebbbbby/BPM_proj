import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FormSelect,
  SlideCheckBox,
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
  // GetAlLEmployees,
  GetVendors,
} from "../../../../../utils/redux/Vendor/VendorSlice";
import {
  GetAssetType,
  GetVendorType,
} from "../../../../../utils/redux/Global/GlobalSlice";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  CreateProcRequsition,
  GetProcBeneficiaries,
  GetProcDepartment,
  UpdateProcRequsition,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import { FiPlus } from "react-icons/fi";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";
import { BsDash } from "react-icons/bs";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import {
  FormatDateTime,
  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import { GetAssetRegister } from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { GetConsummableRegister } from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";

function AddProcRequisition() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;
  const [assetItems, setAssetItems] = useState({});
  const { Consummable_register } = useSelector((x) => x?.consummableSetUp);
  const { asset_register } = useSelector((state) => state?.assetSetUp);
  const { departments, isSubmitting } = useSelector((x) => x?.procurement);

  const { all_vendors, employees, all_branches } = useSelector(
    (state) => state?.vendor
  );

  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );

  useEffect(() => {
    dispatch(
      GetAlLEmployees({
        pageSize: 100000,
        pageNumber: 1,
      })
    );
    dispatch(
      GetAssetType({
        filter: 2,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );
    dispatch(
      GetAssetRegister({
        filter: 2,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );

    dispatch(
      GetConsummableRegister({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 2,
      })
    );
    dispatch(GetVendorType());
    dispatch(GetProcBeneficiaries());
    dispatch(GetProcDepartment());
    dispatch(GetAllBranches());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {
    AssetBrand: location?.assetBrand || "",
    VendorType: location?.vendorType || "",
    RequisitionType: location?.procurementTypeId,
    Description: location?.description,
    beneficiaries: location?.beneficiaryEl || [
      {
        branch: "",
        department: "",
        branchId: "",
        departmentId: "",
        beneficiaryName: "",
        Quantity: "",
        beneficiaryType: "",
      },
    ],
    AssetId: location?.assetId,
    Deadline: FormatDateTime(location?.deadline, "yyyy-MM-DD"),
    vendors: location?.vendors?.map((x) => x?.id?.toString()),
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

  const [flipData, setFlipData] = useState(getValues("RequisitionType") || 0);

  const isFound = location?.isFound;

  const submit = (data) => {
    const totalData = {
      ...data,
      id: id || "",
      Status: 1,
      // AssetType: 1,
      AssetName:
        assetItems?.name ||
        isFound?.assetName ||
        isFound?.itemName ||
        data?.AssetName,
      AssetSpecification: data?.Description,

      AssetBrand: data?.AssetBrand || assetItems?.brand || "Greatness",
      AssetId: +data?.AssetId,
      AssetType: data?.AssetType || isFound?.categoryId,
      AssetTypeName: data?.AssetTypeName || isFound?.category,
      RequisitionType: +data?.RequisitionType,
      SendNotification: data?.SendNotification ? true : false,
    };

    const vendors =
      all_vendors?.result?.length === 1
        ? all_vendors?.result
            ?.filter?.((elem) => +data?.vendors === elem?.id)
            ?.map((x) => {
              return {
                vendorId: x?.id,
                vendorEmail: x?.email,
                vendorName: x?.businessName,
              };
            })
        : all_vendors?.result
            ?.filter?.((elem) => {
              return data?.vendors?.some?.((ele) => {
                return +ele === elem?.id;
              });
            })
            ?.map((x) => {
              return {
                vendorId: x?.id,
                vendorEmail: x?.email,
                vendorName: x?.businessName,
              };
            });
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
      fileData.append(
        `Beneficiaries[${index}].department`,
        key?.department || ""
      );
      fileData.append(
        `Beneficiaries[${index}].departmentId`,
        key?.departmentId || ""
      );
      fileData.append(`Beneficiaries[${index}].quantity`, key?.quantity || 0);
      fileData.append(`Beneficiaries[${index}].branch`, key?.branch || "");
      fileData.append(`Beneficiaries[${index}].branchId`, key?.branchId || "");
      fileData.append(
        `Beneficiaries[${index}].beneficiaryName`,
        key?.beneficiaryName || ""
      );
      fileData.append(
        `Beneficiaries[${index}].beneficiaryType`,
        +key?.beneficiaryType
      );
    });

    vendors?.forEach((key, index) => {
      fileData.append(`Vendors[${index}].id`, key?.vendorId || "");
      fileData.append(`Vendors[${index}].email`, key?.vendorEmail || "");
      fileData.append(`Vendors[${index}].companyName`, key?.vendorName || "");
    });

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

    location
      ? dispatch(UpdateProcRequsition(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${id}/view`);
          }
        })
      : dispatch(CreateProcRequsition(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.id}/view`);
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

  useEffect(() => {
    location?.isFound &&
      dispatch(
        GetVendors({
          filter: 2,
          pageSize: 10000,
          currentPage: 1,
          sort: 1,
          SubClass: isFound?.subCLassId || isFound?.subClassInformation?.id,
        })
      );
    // if (isFound && location) {
    setValue("Description", isFound?.description || isFound?.specification);
    setValue("AssetType", isFound?.categoryId);
    setValue("AssetTypeName", isFound?.category);
    // }
    setAssetItems(isFound);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  console.log(
    asset_register?.result,
    employees,
    departments,
    all_branches,
    Consummable_register?.result
  );

  if (
    !asset_register?.result ||
    !employees ||
    !departments ||
    !all_branches ||
    !Consummable_register?.result
  ) {
    return <p>Loading...</p>;
  }

  // if (!location && !isFound) {
  //   return <p>Still Loading...</p>;
  // }

  return (
    <PageLayout
      title={location ? "Edit Requisition" : "Add Requisition"}
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
              <div>
                <FormSelect
                  title={"Requisition Type"}
                  camelCase={"RequisitionType"}
                  placeholder={"Auto Generated"}
                  disabled={true}
                  array={
                    <>
                      <option value={0}>Asset</option>
                      <option value={1}>Consumable</option>
                    </>
                  }
                  moreRegister={{
                    onChange: (e) => {
                      setFlipData(+e.target.value);
                    },
                  }}
                  // isOptional={true}
                />
                {flipData === 1 && (
                  <FormSelect
                    title={"Consumable Name"}
                    camelCase={"AssetId"}
                    placeholder={"select"}
                    array={Consummable_register?.result?.map?.((x, index) => (
                      <option key={index} value={x?.id}>
                        {x?.itemName}
                      </option>
                    ))}
                    moreRegister={{
                      onChange: (e) => {
                        const isFound = Consummable_register?.result?.find(
                          (x) => +e.target.value === x?.id
                        );
                        setValue(
                          "Description",
                          isFound?.specification ? isFound?.specification : null
                        );
                        setValue("AssetName", isFound?.itemName);
                        setValue("AssetType", isFound?.categoryId);
                        setValue("AssetTypeName", isFound?.category);
                        setValue("AssetBrand", isFound?.assetBrand);
                        dispatch(
                          GetVendors({
                            filter: 2,
                            pageSize: 10000,
                            currentPage: 1,
                            sort: 1,
                            SubClass: isFound?.subCLassId,
                          })
                        );
                        setAssetItems(isFound);
                        return;
                      },
                    }}
                  />
                )}

                {flipData === 0 && (
                  <FormSelect
                    title={"Asset Name"}
                    camelCase={"AssetId"}
                    placeholder={"select"}
                    array={asset_register?.result?.map?.((x, index) => (
                      <option key={index} value={x?.id}>
                        {x?.name}
                      </option>
                    ))}
                    moreRegister={{
                      onChange: (e) => {
                        const isFound = asset_register?.result?.find(
                          (x) => +e.target.value === x?.id
                        );
                        dispatch(
                          GetVendors({
                            filter: 2,
                            pageSize: 10000,
                            currentPage: 1,
                            sort: 1,
                            SubClass: isFound?.assetSubClassId,
                          })
                        );
                        setValue("Description", isFound?.description);
                        setValue("AssetType", isFound?.categoryId);
                        setValue("AssetTypeName", isFound?.category);
                        setValue("AssetBrand", isFound?.assetBrand);
                        setAssetItems(isFound);
                        return;
                      },
                    }}
                  />
                )}
              </div>
              <div>
                <FormTextArea
                  title={"Asset Specification"}
                  camelCase={"Description"}
                  // placeholder={"Asset Description"}
                  type="textbox"
                  isOptional={false}
                  disabled={"disabled"}
                />
                {
                  flipData === 0 && ""
                  // <FormInput
                  //   title={`${
                  //     flipData === 1 ? "Consumable Brand" : "Asset Brand"
                  //   }`}
                  //   camelCase={"AssetBrand"}
                  //   placeholder={"Enter Brand"}
                  // />
                }{" "}
                {/* {flipData === 1 && (
                  <FormInput
                    title={"Quantity"}
                    camelCase={"quantity"}
                    placeholder={"Enter Quantity"}
                  />
                )} */}
                <FormInput
                  title={"Deadline"}
                  camelCase={"Deadline"}
                  placeholder={"Enter Deadline"}
                  type={"date"}
                  // isOptional={true}
                />
              </div>
              {/* <div>
                {" "}
                <FormInput
                  title={"Deadline"}
                  camelCase={"Deadline"}
                  placeholder={"Enter Deadline"}
                  type={"date"}
                  isOptional={true}
                />
              </div> */}
            </div>
          </section>
          {flipData !== 1 && (
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
          )}
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              {/* <div style={{ gridTemplateColumns: "1fr" }}>
                <FormSelect
                  title={"Vendor Type"}
                  camelCase={"VendorType"}
                  placeholder={"select"}
                  array={vendorsTypes?.responseObject?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      dispatch(
                        GetVendors({
                          filter: 2,
                          pageSize: 10000,
                          currentPage: 1,
                          sort: 1,
                          VendorTypeId: e.target.value,
                        })
                      );
                      const isFound = vendorsTypes?.responseObject?.find(
                        (x) => +e.target.value === x?.id
                      );

                      setValue("vendorTypeName", isFound?.name);
                    },
                  }}
                />
              </div> */}
              <div style={{ gridTemplateColumns: "1fr" }}>
                <MultiSelect
                  data={all_vendors?.result?.map((x) => {
                    return {
                      name: x?.businessName,
                      checkBoxName: x?.businessName,
                      id: x?.id,
                      ...x,
                    };
                  })}
                  dataValues={
                    all_vendors?.result?.length === 1
                      ? [watch()?.vendors]
                      : watch()?.vendors || [
                          location?.vendors?.map((x) => x?.id),
                        ]
                  }
                  name={"vendors"}
                  title={"Vendors"}
                />
              </div>
              {/* <div style={{ gridTemplateColumns: "1fr" }}>
                <SlideCheckBox
                  name={"Send notification to vendors"}
                  camelCase={"SendNotification"}
                  value={true}
                  isOptional={false}
                />
              </div> */}
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
      `${fieldName}.branch`,
      branches?.responseObject?.find(
        (x) => x?.id === +watch(`${fieldName}.branchId`)
      )?.txtName
    );

    setValue(
      `${fieldName}.department`,
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
              <option value="0">Individaul</option>
              <option value="1">Department</option>
              <option value="2">Branch</option>
            </>
          }
          moreRegister={{
            onChange: (e) => {
              setValue(`${fieldName}.department`, "");
              setValue(`${fieldName}.branch`, "");
              return setFlip(e.target.value);
            },
          }}
        />
        {flip === "0" && (
          <FormSelect
            title={"Beneficiary Name"}
            camelCase={`${fieldName}.beneficiaryName`}
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
                // const isFound = departments?.responseObject?.pageItems?.find(
                //   (x) => +e.target.value === x?.id
                // );
                // return (
                //   setValue(`${fieldName}.department`, isFound?.department)
                //   // setValue(`${fieldName}.branchId`, isFound?.branchId)
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
            isOptional={true}
            array={departments?.responseObject?.pageItems?.map?.((x, index) => (
              <option key={index} value={x?.id}>
                {x?.name}
              </option>
            ))}
            moreRegister={{
              onChange: (e) => {
                // const isFound = departments?.responseObject.pageItems?.find(
                //   (x) => e.target.value === x?.name
                // );
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
        {flip !== "2" && (
          <FormSelect
            title={"Branch"}
            camelCase={`${fieldName}.branchId`}
            placeholder={"select"}
            isOptional={true}
            // disabled={true}
            array={branches?.responseObject?.map((x) => (
              <option value={x?.id}>{x?.txtName}</option>
            ))}
          />
        )}

        <FormInput
          title={`Quantity`}
          camelCase={`${fieldName}.quantity`}
          placeholder={"Enter Quantity"}
        />
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
