import React, { useEffect } from "react";
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
import {
  CreateConsummableAllocation,
  GetConsummableAcquisition,
  GetConsummableRequisition,
} from "../../../../../utils/redux/Consumables/ConsumablesSlice";

function AddAllocation() {
  const location = useLocation()?.state;
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
  const { vendor, assets, consumable } = useSelector((state) => state);

  // const { assets } = global;
  const { asset_requisition } = assets;
  const { isLoading, acquisition } = consumable;

  useEffect(() => {
    dispatch(
      GetConsummableAcquisition({
        filter: 2,
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data) => {
    const dataValue = {
      ...data,
      duration: +data?.duration,
    };
    location
      ? dispatch(
          UpdateAllocation_Asset({
            ...dataValue,
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${location?.id}/view`);
          }
        })
      : dispatch(
          CreateConsummableAllocation({
            ...dataValue,
            consumableRequisitionId: +data?.consumableRequisitionId,
            quantity: +data?.quantity,
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../`);
          }
        });

    // alert("clicked");
  };

  return (
    <PageLayout title={"Add Consumable Allocation Management"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Consumable Search
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Consumable Acquisition"}
                  camelCase={"consumableAcquisitionId"}
                  placeholder={"select"}
                  array={acquisition?.result?.map?.((x, index) => (
                    <option key={index} value={x?.id}>
                      {x?.consumable}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = acquisition?.result?.find(
                        (x) => +e.target.value === x?.id
                      );
                      // setValue("description", isFound?.details);
                      // console.log(isFound);

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
              Consumable Information
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
                  title={"Source Location of Consumable"}
                  camelCase={"consumablelocationSource"}
                  placeholder={"select"}
                  type="text"
                />
              </div>
              <div>
                <FormInput
                  title={"Warranty"}
                  camelCase={"warranty"}
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
                  title={"Destination Location of Consumable"}
                  camelCase={"consumableAllocationDestination"}
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
          {/* <section className={DashboardStyle.form_section}>
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
          </section> */}
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
