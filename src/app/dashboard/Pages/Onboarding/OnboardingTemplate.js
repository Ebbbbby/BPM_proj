import React, { useContext, useEffect, useState } from "react";
import on from "./Style/onboarding.module.css";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineArrowSmLeft, HiOutlineCheck } from "react-icons/hi";
import { FormProvider, useForm } from "react-hook-form";
import { FormTemplate } from "../../Components/Forms/InputTemplate";
import OnboardingStepTwo from "./OnboardingStepTwo";
import OnboardingStepThree from "./OnboardingStepThree";
import OnboardingStepFour from "./OnboardingStepFour";
import OnboardingStepOne from "./OnboardingStepOne";
import { OnboardingContext } from "../../../../utils/contexts/Onboarding/OnboardingContext";
import OnboardingStepFive from "./OnboardingStepFive";
import OnboardingStepSix from "./OnboardingStepSiz";
import { useDispatch, useSelector } from "react-redux";
import DashboardStyle from "../../../dashboard/Styles/Dashboard.module.css";
import {
  GetCompanyType,
  GetNigerianStates,
  GetServiceType,
  GetVendorType,
} from "../../../../utils/redux/Global/GlobalSlice";
import { CompleteCreateVendor } from "../../../../utils/redux/Vendor/VendorSlice";
import { SupportButtons } from "../../../global/components/Buttons/buttons";
import { GetAssetSubClass } from "../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { GetConsummableSubClass } from "../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
import { FormatDateTime } from "../../../../utils/functions/ResourceFunctions";
import { toast } from "react-toastify";

function OnboardingTemplate() {
  const { assetSetUp, consummableSetUp } = useSelector((x) => x);
  const { step, changeStep, updateVendor, vendorData } =
    useContext(OnboardingContext);
  const [changePageStyle, setChangePageStyle] = useState(false);

  const { vendorsTypes, serviceTypes, states, companyTypes } = useSelector(
    (state) => state.global
  );

  const { all_vendors } = useSelector((state) => state?.vendor);

  const data = all_vendors?.responseObject;

  const dispatch = useDispatch();
  const [vendorDocument, setVendorDocument] = useState(data?.documents || []);

  useEffect(() => {
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

  useEffect(() => {
    step >= 5 && setChangePageStyle(!changePageStyle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const defaultData = {
    companyName: data?.businessName,
    companyType: data?.companyTypeId || "",
    businessName: data?.businessName || data?.companyName,
    serviceProvides_assets: data?.serviceProvideAsset?.map((x) =>
      x?.id?.toString()
    ),
    serviceProvides_consumable: data?.serviceProvideConsumable?.map((x) =>
      x?.id?.toString()
    ),
    TaxIdentificationNumber: data?.taxIdentificationNumber,
    ValueAddedTax: data?.valueAddedTax === "null" ? "" : data?.valueAddedTax,
    rcNumber: data?.rcNumber || data?.CertificateOfRegistration,
    CertificateOfRegistration:
      data?.rcNumber || data?.CertificateOfRegistration || "",
    VendorType: data?.vendorTypeId?.toString(),
    businessNature: data?.businessNatureId,
    SuiteNumber: data?.suiteNumber,
    Address: data?.address,
    City: data?.city,
    State: data?.stateId,
    Email: data?.email,
    PhoneNumber: data?.phoneNumber,
    comment: data?.comment || "",
    AppraisalDate: FormatDateTime(data?.appraisal?.appraisalDate, "YYYY-MM-DD"),
    SlaDate: FormatDateTime(data?.appraisal?.slaDate, "YYYY-MM-DD"),
    NotificationDate: FormatDateTime(
      data?.appraisal?.notificationDate,
      "YYYY-MM-DD"
    ),
    AppraisalDuration: data?.appraisal?.appraisalDuration,
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
    watch,
    // formState: { isValid },
  } = formMethods;

  let text = "";
  let title = "";
  let changeto = 1;

  switch (step) {
    default:
      text = "Not Found";
      break;

    case 6:
      changeto = 1;
      title = "";
      text = (
        <OnboardingStepSix
          change={() => setChangePageStyle(!changePageStyle)}
        />
      );
      break;

    case 5:
      changeto = 6;
      title = "Almost done!";
      text = (
        <OnboardingStepFive
          change={() => setChangePageStyle(!changePageStyle)}
        />
      );
      break;

    case 4:
      changeto = 5;
      title = "Almost done!";
      text = <OnboardingStepFour />;
      break;

    case 3:
      changeto = 4;
      title = "Your company compliance & incorporation documents";
      text = (
        <OnboardingStepThree
          setVendorDocument={setVendorDocument}
          vendorDocument={vendorDocument}
          getValues={getValues}
          setValue={setValue}
        />
      );
      break;
    case 2:
      changeto = 3;
      title = "Your company’s contact information";
      text = <OnboardingStepTwo states={states} />;
      break;
    case 1:
      changeto = 2;
      title = "Tell us a bit more about your company";
      text = (
        // <OnboardingStepThree
        //   setVendorDocument={setVendorDocument}
        //   vendorDocument={vendorDocument}
        //   getValues={getValues}
        //   setValue={setValue}
        // />
        <OnboardingStepOne
          vendorsTypes={vendorsTypes}
          serviceTypes={serviceTypes}
          companyTypes={companyTypes}
          watch={watch}
        />
      );
      break;
  }

  const NamesOfServiceProvidesAsset =
    assetSetUp?.asset_sub_class?.responseObject?.filter?.((x) => {
      if (watch()?.serviceProvides_assets?.includes?.(x?.id?.toString())) {
        return true;
      }
      return false;
    });

  const NamesOfServiceProvidesConsumable =
    consummableSetUp?.Consummable_sub_class?.responseObject?.filter?.((x) => {
      if (watch()?.serviceProvides_consumable?.includes?.(x?.id?.toString())) {
        // console.log( /x);
        return true;
      }
      return false;
    });

  const submit = (data) => {
    if (
      !NamesOfServiceProvidesAsset?.length &&
      !NamesOfServiceProvidesConsumable?.length
    ) {
      return toast.error(
        "You must select atleast one item in either Service Providing (Asset) or Service Providing (Consummable)"
      );
    }
    const vendorValues = {
      ...data,
      ...vendorData,
      uploadDocuments: vendorDocument,
      // rcNumber: vendorData?.vendorValues?.CertificateOfRegistration,
      serviceProvidesAssets: NamesOfServiceProvidesAsset?.map((x) => {
        return {
          id: +x?.id,
          service: x?.name,
        };
      }),
      serviceProvidesConsumable: NamesOfServiceProvidesConsumable?.map((x) => {
        return {
          id: +x?.id,
          service: x?.name,
        };
      }),
    };

    updateVendor({
      ...vendorData,
      vendorValues,
      CertificateOfRegistration: vendorValues?.rcNumber,
      NamesOfServiceProvidesAsset,
      NamesOfServiceProvidesConsumable,
    });

    const fileData = new FormData();
    const key = Object.keys(vendorValues);
    const removedServiceProvides = key
      ?.map((x) => x)
      ?.filter((x) => x !== "uploadDocuments");

    removedServiceProvides?.forEach((key, index) => {
      fileData.append(`${key}`, data?.[key]);
    });

    vendorValues?.serviceProvidesAssets?.forEach((element, index) => {
      fileData.append(`ServiceProvides.Asset[${index}].id`, +element?.id);
      fileData.append(`ServiceProvides.Asset[${index}].name`, element?.service);
    });

    vendorValues?.serviceProvidesConsumable.forEach((element, index) => {
      fileData.append(`ServiceProvides.Consumable[${index}].id`, +element?.id);
      fileData.append(
        `ServiceProvides.Consumable[${index}].name`,
        element?.service
      );
    });

    const removedVendorDocument = vendorValues?.uploadDocuments
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

    step !== 5 && changeStep(changeto);
    step === 5 &&
      dispatch(CompleteCreateVendor(fileData))?.then((res) => {
        if (res?.payload?.successful === true) {
          setChangePageStyle(!changePageStyle);
          changeStep(changeto);
          reset();
        }
      });
  };

  function Icons(prop) {
    const { stage } = prop;
    return (
      <div className={on.icons}>
        {/* <GoPrimitiveDot className={on.active_nav} /> */}
        {step < +stage && <GoPrimitiveDot />}
        {step === +stage && (
          <GoPrimitiveDot color={"red"} className={on.success_nav} />
        )}
        {step > +stage && <HiOutlineCheck className={on.success_nav} />}
      </div>
    );
  }

  if (!companyTypes || !vendorsTypes) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={on.onboarding_template}>
        <div className={on.temp_on}>
          {step <= 4 && (
            <div className={on.onboarding_side_bar}>
              <h2 className={on.onboarding_number}>0{step}</h2>
              <div>
                <div className={on.onboarding_navs}>
                  {/* <GoPrimitiveDot /> */}
                  <Icons stage={1} />
                  {/* <IconNav stage={1} /> */}
                  <small>Basic Information</small>
                </div>
                <div className={on.onboarding_navs}>
                  <Icons stage={2} />
                  <small>Contact details</small>
                </div>
                <div className={on.onboarding_navs}>
                  <Icons stage={3} />
                  <small>Business documents</small>
                </div>
                <div className={on.onboarding_navs}>
                  <Icons stage={4} />
                  <small>Review & submit</small>
                </div>
              </div>
            </div>
          )}
          <div
            className={`${
              changePageStyle === true ? on.onbd_form_elements_greater_than : ""
            } ${on.onbd_form_elements} `}
          >
            <div className={on.onbd_form_elements_header}>
              <div className={`${step >= 5 && on.header_greater_than}`}>
                {step === 5 && <p>One Last Thing...</p>}
                <h2>{title}</h2>
                {step === 4 && (
                  <p>Please go back and check the following sections</p>
                )}
              </div>
              {step !== 1 && step <= 4 && (
                <div>
                  <button onClick={() => changeStep(step - 1)}>
                    {" "}
                    <HiOutlineArrowSmLeft /> <span>Back</span>
                  </button>
                </div>
              )}
            </div>
            <FormProvider {...formMethods}>
              <FormTemplate handleSubmit={handleSubmit(submit)}>
                {text}
              </FormTemplate>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnboardingTemplate;

export function CancelButton() {
  return (
    <SupportButtons
      onClick={() => window.location.reload()}
      width={"auto"}
      className={`${DashboardStyle?.button_cage_weight} ${on?.button_cage_weight}`}
    >
      Cancel
    </SupportButtons>
  );
}
