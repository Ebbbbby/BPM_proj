import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FormsSelect,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  CreateFuelPayment,
  GetBanks,
  GetAllEmployees,
  GetCadrePosition,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { GetAssets } from "../../../../../utils/redux/Global/GlobalSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";

function AddNewFuelPayment() {
  const [bankId, setBankId] = useState({});
  const [userItems, setUserItems] = useState({});
  const location = useLocation()?.state;
  const { get_bank } = useSelector((state) => state?.fleet);
  const { all_employees, isLoadingPayment,all_cadre } = useSelector(
    (state) => state?.fleet
  );
  console.log(all_employees)
  //console.log(location)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCadrePosition({pageNumber:1, perPage:1000}))
    dispatch(GetAssets());
    if  (userItems !== null || userItems.length !== 0) {
      dispatch(GetAllEmployees({ pageSize: 10, pageNumber: 1 }));
    }
    
  }, [bankId]);

  const defaultData = {
    fuelStartDate: FormatDateTime(location?.fuelStartDate),
    fuelEndDate: FormatDateTime(location?.fuelEndDate),
    payeeName: location?.payeeName,
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = formMethods;

const filterEmployees = all_employees?.result?.filter((employee) => ((employee?.cadreGradeId === 2)) && employee.firstName !== null)


  const submit = (data, e) => {
    const dataValue = {
      ...data,
      payeeId: userItems?.id,
      payeeName: userItems?.firstName + ' '+ userItems?.surname,
      accountNumber: userItems?.accountNumber,
      assetId: userItems?.assetID,
      bank: get_bank?.responseObject?.bankName,
      bankId: get_bank?.responseObject?.id,
    };
    const fileData = new FormData();
    const key = Object.keys(dataValue);
    key?.forEach((key, index) => {
      fileData.append(`${key}`, dataValue[key]);
    });
    // console.log(dataValue)
    //  return

    dispatch(CreateFuelPayment(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {

        reset();
        navigate(`../${res?.payload?.responseObject}/view`);
      }
    });
  };
  return (
    <PageLayout
      title={location ? "Edit Payment" : "Add Payment"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Fuel Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormsSelect
                  title={"Payee Name"}
                  camelCase={"payeeId"}
                  placeholder={"select employee"}
                  array={filterEmployees?.map?.((employee, index) => (
                    <option key={index} value={employee?.id}>
                      {
                      employee?.cadreGradeId === 2
                        ? employee?.firstName + ' '+ employee?.surname
                        : ''}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = all_employees?.result?.find(
                        (x) => +e.target.value === x?.id
                      );
                      setUserItems(isFound);
                      // setUserItems(isFound);

                      const bnkId = all_employees?.result?.find(
                        (x) => +e.target.value === x?.id
                      )?.bankID;
                      dispatch(GetBanks(bnkId));
                    },
                  }}
                />
                <FormInput
                  title={"AssetID"}
                  camelCase={"assetId"}
                  placeholder={"select asset ID"}
                  disabled={true}
                  isOptional={true}
                  value={userItems?.assetID}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Account <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Amount"}
                  camelCase={"amount"}
                  placeholder={"enter amount"}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Amount must include only numbers",
                    },
                  }}
                />
                <FormInput
                  title={"Account Number"}
                  camelCase={"accountNumber"}
                  placeholder={"auto generated number"}
                  isOptional={true}
                  disabled={true}
                  value={userItems?.accountNumber}
                />

                <div>
                  <FormInput
                    title={"Bank"}
                    camelCase={"bank"}
                    placeholder={"add bank"}
                    disabled={true}
                    value={get_bank?.responseObject?.bankName}
                    isOptional={true}
                  />
                </div>
              </div>

              <div>
                <FormInput
                  title={"Fuel Start Date"}
                  camelCase={"fuelStartDate"}
                  placeholder={"select date"}
                  type={"date"}
                />
                <FormInput
                  title={"Fuel End Date"}
                  camelCase={"fuelEndDate"}
                  placeholder={"select date"}
                  type={"date"}
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
                  title={"Other(Optional)"}
                  camelCase={"additionalInformation"}
                  placeholder={"enter other information"}
                  type="textbox"
                  isOptional={false}
                />
              </div>
            </div>
          </section>

          <div className={DashboardStyle.button_cage}>
          <SupportButtons width={"auto"} onClick={()=>navigate('../')} >No,Cancel</SupportButtons>
            <ActionButtons
              // isLoading={isLoading}
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
            >
              {isLoadingPayment ? "Submitting.." : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default AddNewFuelPayment;
