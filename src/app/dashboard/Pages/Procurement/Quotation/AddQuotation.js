import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
  SlideCheckBox,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  CreateProcQuotation,
  GetSingleProcRequisitions,
  UpdateProcQuotation,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import {
  FormatDateTime,
  GetSearchParams,
  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
import { GetSingleVendor } from "../../../../../utils/redux/Vendor/VendorSlice";
import { USER_CATEGORY } from "../../../../../utils/Enums";

function AddQuotation() {
  const { id, kind } = useParams();
  const { fullName, category, emailAddress } = GetLocalStorage();
  const [recommend, setRecommend] = useState(false);
  useEffect(() => {
    // dispatch(GetSingleVendor(id));
    !location?.procurementRequisitionId &&
      dispatch(GetSingleProcRequisitions(id));
    category === 1 &&
      dispatch(
        GetSingleVendor({
          emailAddress: emailAddress,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();

  const location = useLocation()?.state;

  const { vendor } = useSelector((x) => x);

  const { isSubmitting, proc_req_data } = useSelector(
    (state) => state?.procurement
  );

  const proc_req = proc_req_data?.responseObject || location;

  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.supportingDocument || []
  );

  console.log({ location });

  const defaultData = {
    Brand_auto: 1,
    RecommendedAsset: location?.recommendedAsset,
    RecommendedAssetDescription: location?.recommendedAssetDescription,
    RecommendationStatus: location?.recommendationStatus,
    Brand: location?.brand || proc_req?.assetBrand || proc_req?.assetName,
    Specification: location?.procurementRequisition,
    UnitPrice: location?.unitPrice,
    Quantity: proc_req?.quantity,
    DeliveryCost: location?.deliveryCost,
    Waranty: location?.waranty?.toLowerCase(),
    TotalPrice: location?.totalPrice,
    SupportIncluded: location?.supportIncludedId,
    DeliverySchedule: FormatDateTime(location?.deliverySchedule, "yyyy-MM-DD"),
    vendorName: fullName,
    VendorId:
      category !== 1
        ? GetSearchParams("vendor") || location?.initiator?.toString() || ""
        : vendor?.all_vendors?.responseObject?.id || "",
  };
  const navigate = useNavigate();

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    const dataValue = {
      ...data,
      ProcurementRequisitionId: location?.procurementRequisitionId
        ? location?.procurementRequisitionId
        : id,
      QuotationId: id,
      quantity: data?.quantity || location?.quantity,
      vendorName: data?.vendorName || "",
      VendorId:
        data?.VendorId || vendor?.all_vendors?.responseObject?.id || 88499,
    };
    const fileData = new FormData();
    const key = Object.keys(dataValue);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, dataValue[key]);
    });

    const removedVendorDocument = vendorDocument
      ?.map((x) => x)
      ?.filter((x) => "file" in x);

    removedVendorDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });

    location?.procurementRequisitionId
      ? dispatch(UpdateProcQuotation(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${id}/view`);
          }
        })
      : dispatch(CreateProcQuotation(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
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

  const watchUnitPrice = watch("UnitPrice");
  const watchQuantity = proc_req?.quantity;
  const watchDelivery = watch("DeliveryCost");

  const calculateTotalPrice = () => {
    const valueWithQuantity = +watchUnitPrice * +watchQuantity + +watchDelivery;
    const valueWithOutQuantity = +watchUnitPrice + +watchDelivery;

    if (+watchQuantity === 0) {
      return setValue("TotalPrice", valueWithOutQuantity);
    }

    return setValue("TotalPrice", valueWithQuantity);
  };

  useEffect(() => {
    calculateTotalPrice();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchUnitPrice, watchQuantity, watchDelivery]);

  useEffect(() => {
    if (location?.recommendationStatus === true) {
      setRecommend(true);
    }
  }, [location?.recommendationStatus]);

  const pageHeading = () => {
    if (kind) {
      return "Submit Quotation";
    }

    return location ? "Edit Quotation" : "Add Quotation";
  };

  if (!proc_req) {
    return <p>Loading...</p>;
  }

  return (
    <PageLayout title={pageHeading()} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Requisition <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Requisition Type:</p>
                  <h4>
                    {proc_req?.procurementType || proc_req?.requisitionType}
                  </h4>
                </div>
                <div>
                  <p>Asset Type:</p>
                  <h4>
                    {proc_req?.procurementType || proc_req?.requisitionType}
                  </h4>
                </div>
                <div>
                  <p>Asset Name:</p>
                  <h4>{proc_req?.assetName}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Description:</p>
                  <h4>{proc_req?.description}</h4>
                </div>
                <div>
                  <p>Quantity:</p>
                  <h4>{proc_req?.quantity}</h4>
                </div>
                <div>
                  <p>Deadline:</p>
                  <h4>{FormatDateTime(proc_req?.deadline)}</h4>
                </div>
                <div></div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Your Quotation
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Asset Name"}
                  camelCase={"Brand"}
                  placeholder={"Enter Brand"}
                  defaultValue={proc_req?.assetName || ""}
                  isOptional={true}
                  disabled={true}
                />
                <FormInput
                  title={"Specification"}
                  camelCase={"Specification"}
                  placeholder={"Enter Specification"}
                  disabled={true}
                  isOptional={true}
                  defaultValue={
                    proc_req?.assetSpecification || proc_req?.description || ""
                  }
                  // isOptional={true}
                />
              </div>
              <div style={{ gridTemplateColumns: "1fr" }}>
                <SlideCheckBox
                  name={"Make Recommendation"}
                  camelCase={"RecommendationStatus"}
                  value={true}
                  isOptional={false}
                  moreRegister={{
                    onChange: (e) => {
                      setRecommend(!recommend);

                      console.log(e.target.value);
                    },
                  }}
                />
              </div>

              {recommend && (
                <div>
                  <FormInput
                    title={"Recommended Brand"}
                    camelCase={"RecommendedAsset"}
                    placeholder={"Enter Recommended Brand"}
                    // defaultValue={proc_req?.assetName || ""}
                    // isOptional={true}
                    // disabled={true}
                  />
                  <FormInput
                    title={"Recommended Specification"}
                    camelCase={"RecommendedAssetDescription"}
                    placeholder={"Enter Recommended Specification"}
                    // disabled={true}
                    // defaultValue={
                    //   proc_req?.assetSpecification ||
                    //   proc_req?.description ||
                    //   ""
                    // }
                    // isOptional={true}
                  />
                </div>
              )}

              <div>
                <FormInput
                  title={"Unit Price"}
                  camelCase={"UnitPrice"}
                  placeholder={"Enter Unit Price"}
                />
                <FormInput
                  title={"Quantity"}
                  camelCase={"Quantity"}
                  disabled={true}
                  isOptional={true}
                  // placeholder={"Enter City"}
                  defaultValue={proc_req?.quantity}
                />
              </div>
              <div>
                <FormInput
                  title={"Delivery Cost"}
                  camelCase={"DeliveryCost"}
                  placeholder={"Enter Delivery Cost"}
                />
                <FormSelect
                  title={"Warranty"}
                  camelCase={"Waranty"}
                  placeholder={"Enter Waranty"}
                  array={
                    <>
                      <option value="quarterly">Quarterly</option>
                    </>
                  }
                />
              </div>
              <div>
                <FormInput
                  title={"Total Quote"}
                  camelCase={"TotalPrice"}
                  placeholder={"Enter Total Price"}
                  disabled={true}
                />
                <FormSelect
                  title={"Support Included"}
                  camelCase={"SupportIncluded"}
                  placeholder={"Enter City"}
                  array={
                    <>
                      <option value={1}>Yes</option>
                      <option value={2}>No</option>
                    </>
                  }
                />
              </div>
              <div>
                <FormInput
                  title={"Delivery Schedule"}
                  camelCase={"DeliverySchedule"}
                  placeholder={"Enter Delivery Schedule"}
                  type={"date"}
                  isOptional={true}
                />
                {category === USER_CATEGORY.VENDOR ? (
                  <FormInput
                    title={"Vendor"}
                    camelCase={"vendorName"}
                    // defaultValue={fullName}
                    disabled={true}
                    isOptional={true}
                  />
                ) : (
                  <FormSelect
                    title={"Vendor"}
                    camelCase={"VendorId"}
                    placeholder={"Vendor"}
                    array={
                      <>
                        {proc_req?.vendors?.map((x) => (
                          <option
                            value={x?.id}
                            // selected={
                            //   GetSearchParams("vendor") === x?.id?.toString() &&
                            //   true
                            // }
                          >
                            {x?.name}
                          </option>
                        ))}
                      </>
                    }
                  />
                )}
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
                          <td>
                            <TableActionsDownload
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
              className={DashboardStyle?.button_cage_weight}
            >
              Cancel
            </SupportButtons>
            <ActionButtons
              disabled={!isValid}
              width={"auto"}
              className={DashboardStyle?.button_cage_weight}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default AddQuotation;
