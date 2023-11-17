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
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CreateConsummableRequisition } from "../../../../../utils/redux/Consumables/ConsumablesSlice";
import { GetConsummableRegister } from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
import { GetAlLEmployees } from "../../../../../utils/redux/Vendor/VendorSlice";

function AddAuctioning() {
  const defaultData = {};
  const [requestor, setRequestor] = useState({})
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    // watch,
    // formState: { isValid },
  } = formMethods;

  const dispatch = useDispatch();

  const { vendor } = useSelector((state) => state);
  const { Consummable_register } = useSelector(
    (state) => state?.consummableSetUp
  );
  const { isLoading } = useSelector((state) => state?.assets);

  console.log(vendor);

  useEffect(() => {
    dispatch(
      GetAlLEmployees({
        pageSize: 100000,
        pageNumber: 1,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const submit = (data) => {
    dispatch(
      CreateConsummableRequisition({
        consumableId: +data?.consumableId,
        quantity: +data?.quantity,
        description: data?.description,
        requistor: +data?.requistor,
        requistorName: requestor?.accountName,
        requestFor: +data?.requestFor,
      })
    )?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../${res?.payload?.responseObject?.id}/view`);
      }
    });
  };

  return (
    <PageLayout title={"Create New Consumables Requisition"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Consummable Name"}
                  camelCase={"consumableId"}
                  placeholder={"select"}
                  array={Consummable_register?.result?.map?.((x, index) => (
                    <option key={index} value={+x?.id}>
                      {x?.itemName}
                    </option>
                  ))}
                />
                <FormInput
                  title={"Quantity"}
                  camelCase={"quantity"}
                  placeholder={"select"}
                />
              </div>
              <div>
                <FormTextArea
                  title={"Description"}
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
              Actioning Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormSelect
                  title={"Requestor"}
                  camelCase={"requistor"}
                  placeholder={"select"}
                  // isOptional={true}
                  array={
                    <>
                      {vendor?.employees?.responseObject?.pageItems?.map(
                        (staff) => (
                          <option value={staff?.id}>
                            {staff?.accountName}
                          </option>
                        )
                      )}
                    </>
                  }
                  moreRegister={{
                    onChange: (e) => {
                      const isFound =
                        vendor?.employees?.responseObject?.pageItems?.find(
                          (x) => +e.target.value === x?.id
                        );
                      setRequestor(isFound);
                      return;
                    },
                  }}
                />
                <FormSelect
                  title={"Requested For"}
                  camelCase={"requestFor"}
                  placeholder={"Vendor Type"}
                  // isOptional={true}
                  array={
                    <>
                      <option value={1}>Self</option>
                      <option value={2}>Department</option>
                    </>
                  }
                />
              </div>
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

export default AddAuctioning;
