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
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import {
  CreateAAllocation_Asset,
  GetRequisition_Asset,
  UpdateAllocation_Asset,
} from "../../../../../utils/redux/Assets/AssetSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { GetAssetRegister } from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";

function AddAllocation() {
  const location = useLocation()?.state;
  const [req, setReq] = useState(null);
  const defaultData = {
    assetRequisitionId: location?.assetRequisitionId,
    warranty: location?.warranty,
    quantity: location?.quantity,
    purpose: location?.purpose,
    nvb: location?.nvb,
    depreciation: location?.depreciation,
    requisitionDate: FormatDateTime(location?.requisitionDate, "YYYY-MM-DD"),
    assetUsageStartTime: FormatDateTime(
      location?.startTimeOfAssetUsage,
      "YYYY-MM-DD"
    ),
    assetUsageEndTime: FormatDateTime(
      location?.lapseTimeOfAssetUsage,
      "YYYY-MM-DD"
    ),
    assignedStatus: location?.assignStatus,
    assetLocationSource: location?.assetLocationSource,
    assetAllocationDestination: location?.assetLocationDestination,
    recurringReminderDate: FormatDateTime(location?.reminderDate, "YYYY-MM-DD"),
    duration: location?.duration,
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit, setValue } = formMethods;

  // const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vendor, assets } = useSelector((state) => state);

  // const { assets } = global;
  const { asset_requisition, isLoading } = assets;

  useEffect(() => {
    dispatch(
      GetAssetRegister({
        filter: 2,
        pageSize: 10000,
        currentPage: 1,
        sort: 1,
      })
    );
    dispatch(
      GetRequisition_Asset({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 2,
      })
    );
    dispatch(
      GetVendors({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data) => {
    const dataValue = {
      ...data,
      duration: +data?.duration,
      assetAcquisitionId: +data?.assetAcquisitionId,
    };
    location
      ? dispatch(
          UpdateAllocation_Asset({
            ...dataValue,
            assetAllocationId: location?.id,
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${location?.id}/view`);
          }
        })
      : dispatch(CreateAAllocation_Asset(dataValue))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${res?.payload?.responseObject?.id}/view`);
          }
        });

    // alert("clicked");
  };

  // if (global?.isLoading === true || vendor?.isLoadingVendors === true) {
  //   return <p>Loading...</p>;
  // }

  return (
    <PageLayout title={"Add Asset Allocation Management"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>Asset Search</h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Asset Acquisition"}
                  camelCase={"assetAcquisitionId"}
                  placeholder={"select"}
                  array={asset_requisition?.result?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.assetName}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = asset_requisition?.result?.find(
                        (x) => +e.target.value === x?.id
                      );
                      setValue("description", isFound?.details);
                      // console.log(isFound);
                      setReq(isFound);

                      return;
                    },
                  }}
                />
                <FormTextArea
                  title={"Requisition Details"}
                  camelCase={"description"}
                  placeholder={"select"}
                  rowsLines={4}
                  isOptional={true}
                  disabled={true}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Requisition Date"}
                  camelCase={"requisitionDate"}
                  placeholder={"select"}
                  type={"date"}
                />
                <FormInput
                  title={"Start time of asset usage"}
                  camelCase={"assetUsageStartTime"}
                  placeholder={"select"}
                  type="date"
                />
              </div>
              <div>
                <FormInput
                  title={"Lapse time for asset usage"}
                  camelCase={"assetUsageEndTime"}
                  placeholder={"select"}
                  type={"date"}
                />
                <FormInput
                  title={"Source Location of Asset"}
                  camelCase={"assetLocationSource"}
                  placeholder={"select"}
                  type="text"
                />
              </div>
              <div>
                <FormInput
                  title={"Depreciation"}
                  camelCase={"depreciation"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"Warranty"}
                  camelCase={"warranty"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormInput
                  title={"NVB"}
                  camelCase={"nvb"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"Assigned Status"}
                  camelCase={"assignedStatus"}
                  placeholder={"select"}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Allocation Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Quantity"}
                  camelCase={"quantity"}
                  placeholder={"select"}
                />
                <FormInput
                  title={"Purpose"}
                  camelCase={"purpose"}
                  placeholder={"Purpose"}
                  // disabled={true}
                />
              </div>
              <div>
                <FormInput
                  title={"Destination Location of Asset"}
                  camelCase={"assetAllocationDestination"}
                  placeholder={"select"}
                  array={vendor?.all_vendors?.result?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.businessName}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = vendor?.all_vendors?.result?.find(
                        (x) => +e.target.value === +x?.id
                      );

                      return (
                        isFound && setValue("vendorType", isFound?.vendorType)
                      );
                    },
                    // return console.log({ data });
                  }}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Monitoring <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Recurring Reminder Date "}
                  camelCase={"recurringReminderDate"}
                  placeholder={"select"}
                  type={"date"}
                />
                <FormSelect
                  title={"Duration"}
                  camelCase={"duration"}
                  placeholder={"select"}
                  array={<option value={0}>Periodically</option>}
                />
              </div>
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
              isLoading={isLoading}
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

export default AddAllocation;
