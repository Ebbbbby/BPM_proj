import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FormSelect,
  PerfectFileUpload,
  ProFormSelect,
  CheckBox,
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
import { GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import {
  GetAssetType,
  GetAssets,
  GetNigerianStates,
} from "../../../../../utils/redux/Global/GlobalSlice";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  CreateProcRequsition,
  GetProcBeneficiaries,
  GetProcDepartment,
  UpdateProcRequsition,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import MultiSelect from "../../../Components/MultiSelect/MultiSelect";

function AddProcRequisition() {
  const dispatch = useDispatch();
  const location = useLocation()?.state;
  const [assetItems, setAssetItems] = useState({});
  const [flip, setFlip] = useState("");
  const { beneficiaries, departments } = useSelector((x) => x?.procurement);

  const { isLoadingAction, all_vendors } = useSelector(
    (state) => state?.vendor
  );

  const { isLoading, assets, states } = useSelector((state) => state?.global);

  console.log({ departments });

  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.documents || []
  );

  useEffect(() => {
    dispatch(GetNigerianStates());
    dispatch(GetAssetType());
    dispatch(GetAssets());
    dispatch(GetProcBeneficiaries());
    dispatch(GetProcDepartment());
    dispatch(
      GetVendors({
        filter: 0,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {
    RequisitionType: location?.procurementTypeId,
    Description: location?.description,
    beneficiaries: location?.beneficiaryEl,
    AssetId: location?.assetId,
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
  const { fields, append } = feildArray;

  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { isValid },
  } = formMethods;

  console.log(watch());
  console.log({ location });

  const { id } = useParams();

  const navigate = useNavigate();
  const submit = (data) => {
    console.log({ data });
    const formData = {
      ...data,
      id: id,
      beneficiaries: [
        ...data?.beneficiaries,
        {
          branch: data?.branch,
          department: data?.department,
          beneficiaryName: data?.beneficiaryName,
          quantity: data?.Quantity,
        },
      ],

      vendors: all_vendors?.result
        ?.filter?.((elem) => {
          return data?.vendors?.some?.((ele) => {
            return +ele === elem?.id;
          });
        })
        ?.map((x) => {
          return {
            vendorId: x?.id,
            vendorEmail: x?.email,
            vendorName: x?.companyName,
          };
        }),
      status: 1,
      assetType: 1,
      assetName: assetItems?.name,
      assetSpecification: assetItems?.specification || "specification",
      assetBrand: assetItems?.brand || "brand",
      AssetId: +data?.AssetId,
      RequisitionType: data?.RequisitionType,
      uploadDocuments: vendorDocument,
    };

    location
      ? dispatch(UpdateProcRequsition(formData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.id}/view`);
          }
        })
      : dispatch(CreateProcRequsition(formData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.id}/view`);
          }
        });
  };

  if (!assets || !all_vendors) {
    return <p>Loading...</p>;
  }
  return (
    <PageLayout
      title={location ? "Edit Requisition" : "Add Requisition"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
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

                  // isOptional={true}
                />
                <FormSelect
                  title={"Asset Name"}
                  camelCase={"AssetId"}
                  placeholder={"select"}
                  isOptional={true}
                  array={assets?.result?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.name}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = assets?.result?.find(
                        (x) => +e.target.value === x?.id
                      );
                      setValue("Description", isFound?.description);
                      setAssetItems(isFound);
                      return;
                    },
                  }}
                />
              </div>
              <div>
                <FormTextArea
                  title={"Deription"}
                  camelCase={"Description"}
                  placeholder={"Asset Description"}
                  type="textbox"
                  isOptional={true}
                  disabled={true}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Beneficiary <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              {!location && (
                <>
                  <div>
                    <FormSelect
                      title={"Beneficiary Type"}
                      camelCase={"beneficiaryType"}
                      placeholder={"select"}
                      array={
                        <>
                          <option value="individual">Individaul</option>
                          <option value="department">Department</option>
                          <option value="3">Branch</option>
                        </>
                      }
                      moreRegister={{
                        onChange: (e) => {
                          return setFlip(e.target.value);
                        },
                      }}
                    />
                    {flip === "department" && (
                      <FormSelect
                        title={"Department"}
                        camelCase={"beneficiaryName"}
                        placeholder={"select"}
                        array={departments?.responseObject?.map?.(
                          (x, index) => (
                            <option key={index} value={x?.name}>
                              {x?.name}
                            </option>
                          )
                        )}
                        moreRegister={{
                          onChange: (e) => {
                            const isFound = departments?.responseObject.find(
                              (x) => e.target.value === x?.name
                            );
                            return (
                              setValue("department", isFound?.department),
                              setValue("branch", isFound?.branch)
                            );
                          },
                        }}
                      />
                    )}
                    {flip === "individual" && (
                      <FormSelect
                        title={"Beneficiary Name"}
                        camelCase={"beneficiaryName"}
                        placeholder={"select"}
                        array={beneficiaries?.responseObject?.map?.(
                          (x, index) => (
                            <option key={index} value={x?.name}>
                              {x?.name}
                            </option>
                          )
                        )}
                        moreRegister={{
                          onChange: (e) => {
                            const isFound = beneficiaries?.responseObject.find(
                              (x) => e.target.value === x?.name
                            );
                            return (
                              setValue("department", isFound?.department),
                              setValue("branch", isFound?.branch)
                            );
                          },
                        }}
                      />
                    )}

                    {flip !== "department" && (
                      <FormInput
                        title={"Department"}
                        camelCase={"department"}
                        placeholder={"Auto Generated"}
                        disabled={true}
                        // disabled={true}
                      />
                    )}
                    <FormInput
                      title={"Branch"}
                      camelCase={"branch"}
                      placeholder={"Branch"}
                      isOptional={true}
                      disabled={true}
                    />
                    <FormInput
                      title={"Quantity"}
                      camelCase={"Quantity"}
                      placeholder={"Enter Quantity"}
                      registerOptions={{
                        onChange: (e) => console.log(e.target.value),
                      }}
                    />
                  </div>
                </>
              )}

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
            </div>
          </section>
          <section
            style={{ borderTop: "unset", margin: "0", padding: "0 1rem" }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}> </h4>
            <div className={DashboardStyle.inputs_group}>
              {fields?.map(({ x }, index) => {
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
                      fieldName={fieldName}
                      beneficiaries={beneficiaries}
                      departments={departments}
                    />
                    <div></div>
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
              <div style={{ gridTemplateColumns: "1fr" }}>
                <MultiSelect
                  data={all_vendors?.result}
                  dataValues={watch()?.vendors}
                  name={"vendors"}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents Upload
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormSelect
                  title={"File Name"}
                  camelCase={"fileName"}
                  placeholder={"select"}
                  isOptional={true}
                  array={
                    <>
                      <option value={"TinCertificate"}>TIN Certificate</option>
                      <option value={"CacCertificate"}>CAC Certificate</option>
                    </>
                  }
                />

                <PerfectFileUpload
                  setFile={setUploadFile}
                  file={uploadFile}
                  title={""}
                  isOptional={false}
                  camcelCase={"stuff"}
                  handleChange={(cac) => {
                    setUploadFile(cac);
                  }}
                />
                <div
                  style={{
                    color: "var(--primary-color)",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: "5px",
                  }}
                  onClick={() => {
                    if (uploadFile && getValues("fileName") !== "") {
                      setVendorDocument([
                        ...vendorDocument,
                        {
                          file: uploadFile,
                          fileName: getValues("fileName"),
                        },
                      ]);

                      setUploadFile(null);
                      setValue("fileName", "");
                    } else toast.error("File Name or File can not be empty");
                  }}
                >
                  <FiPlus />
                  <p>Add Another</p>
                </div>
              </div>
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
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.file?.type?.split("/")[1]}
                          </td>
                          <td>
                            <TableActionsDownload />
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
              className={DashboardStyle?.button_cage_weight}
            >
              Save as Draft
            </SupportButtons>
            <ActionButtons
              isLoading={isLoadingAction}
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

function FieldInputs({ fieldName, beneficiaries, departments }) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [flip, setFlip] = useState("");
  return (
    <div>
      <FormSelect
        title={"Beneficiary Type"}
        camelCase={`${fieldName}.beneficiaryType`}
        placeholder={"select"}
        array={
          <>
            <option value="individual">Individaul</option>
            <option value="department">Department</option>
            <option value="branch">Branch</option>
          </>
        }
        moreRegister={{
          onChange: (e) => {
            return setFlip(e.target.value);
          },
        }}
      />
      {flip === "individual" && (
        <FormSelect
          title={"Beneficiary Name"}
          camelCase={`${fieldName}.beneficiaryName`}
          placeholder={"select"}
          array={beneficiaries?.responseObject?.map?.((x, index) => (
            <option key={index} value={x?.name}>
              {x?.name}
            </option>
          ))}
          moreRegister={{
            onChange: (e) => {
              const isFound = beneficiaries?.responseObject.find(
                (x) => e.target.value === x?.name
              );
              return (
                setValue(`${fieldName}.department`, isFound?.department),
                setValue(`${fieldName}.branch`, isFound?.branch)
              );
            },
          }}
        />
      )}
      {flip === "department" && (
        <FormSelect
          title={"Department"}
          camelCase={`${fieldName}.beneficiaryName`}
          placeholder={"select"}
          array={departments?.responseObject?.map?.((x, index) => (
            <option key={index} value={x?.name}>
              {x?.name}
            </option>
          ))}
          moreRegister={{
            onChange: (e) => {
              const isFound = beneficiaries?.responseObject.find(
                (x) => e.target.value === x?.name
              );
              return (
                setValue(`${fieldName}.department`, isFound?.department),
                setValue(`${fieldName}.branch`, isFound?.branch)
              );
            },
          }}
        />
      )}
      {flip !== "department" && (
        <FormInput
          title={"Department"}
          camelCase={`${fieldName}.department`}
          placeholder={"Auto Generated"}
          disabled={true}
        />
      )}
      <FormInput
        title={"Branch"}
        camelCase={`${fieldName}.branch`}
        placeholder={"select"}
        isOptional={true}
        disabled={true}
        // array={<option value="aviation">Aviation</option>}
      />

      <FormInput
        title={`Quantity`}
        camelCase={`${fieldName}.quantity`}
        placeholder={"Enter Quantity"}
        registerOptions={{
          onChange: (e) => console.log(e.target.value),
        }}
      />
    </div>
  );
}
