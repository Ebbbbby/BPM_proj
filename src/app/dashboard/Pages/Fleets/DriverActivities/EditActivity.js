import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import {
  FormInput,
  FormTemplate,
  FormsSelect,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";

import { useDispatch, useSelector } from "react-redux";
import {
  UpdateDriverActivity,
  GetAllFleets,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { useLocation } from "react-router";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
function AddActivity({ isOpen, setIsOpen, apiData }) {
  const [driverItems, setDriverItems] = useState({});
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const location = useLocation()?.state;
  const { all_fleets, isLoadingActivity } = useSelector(
    (state) => state?.fleet
  );

  const data = GetLocalStorage()
  const filteredNames = all_fleets?.pageItems?.filter(item => item?.driverName?.toLowerCase() === data?.fullName);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(GetAllFleets({ currentPage: 1, pageSize: 100000 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const defaultData = {
    vehicleName: location?.vehicleName,
    hour: location?.hour,
    minute: location?.minute,
    second: location?.second,
    dateOfAssignment: FormatDateTime(location?.dateOfAssignment, "YYYY-MM-DD"),
    source: location?.source,
    destination: location?.destination,
    assignment: location?.assignment,
    assetId: location?.assetId,
    driverId:location?.driverId
  };


  const InitSetup = () => {
    let defaultDriver = all_fleets?.pageItems?.filter(
      (_) => _.initiatorId === location?.driverId
    )[0];
 
    setDriverItems(defaultDriver);
  };

  useEffect(() => {
    InitSetup();
  });


  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    setValue,
    // watch,
    formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    const dataValue = {
      ...data,
      driverName: driverItems?.driverName,
      vehicleName: driverItems?.fleetName,
      driverId: driverItems?.driverId,
    };
    const fileData = new FormData();

    const key = Object.keys(dataValue);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, dataValue[key]);
    });
    fileData.append("id", id);

    //return
    dispatch(UpdateDriverActivity(fileData))?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../${location?.id}/view`);
      }
    });
  };

  return (
    <PageLayout title={"Edit Driver Activity"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Fuel Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormsSelect
                  title={"Driver Name"}
                  camelCase={"driverId"}
                  placeholder={"select driver's name"}
                  array={filteredNames?.map(
                    (requestor, index) => (
                      <option 
                      selected={location?.driverId === requestor?.initiatorId}
                      key={index} value={requestor?.driverId} 
                      
                      >
                        {requestor?.driverName}
                      </option>
                    )
                  )}
                  moreRegister={{
                    onChange: (e) => {
                      const driver = filteredNames?.find(
                        (x) => +e.target.value === x?.id
                      );
                      setDriverItems(driver);
                      return driver && setValue("assetId", driver?.assetId);
                    },
                  }}
                />
                <FormInput
                  title={"Asset Id"}
                  camelCase={"assetId"}
                  placeholder={"auto generated"}
                  isOptional={true}
                  disabled={true}
                  value={driverItems?.assetId}


                />
              </div>
              <div>
                <FormInput
                  title={"Vehicle Name"}
                  camelCase={"vehicleName"}
                  placeholder={"auto generated"}
                  isOptional={true}
                  value={driverItems?.fleetName}
                  defaultValue={location?.vehicleName}

                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Assignment <br /> Information
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"assignment"}
                  camelCase={"assignment"}
                  placeholder={"Enter assigned duty"}
                />
                <FormInput
                  title={"source"}
                  camelCase={"source"}
                  placeholder={"enter starting point"}
                />
              </div>
              <div>
                <FormInput
                  title={"Destination"}
                  camelCase={"destination"}
                  placeholder={"enter destination"}
                />
                <FormInput
                  title={"Hour"}
                  camelCase={"hour"}
                  placeholder={"enter hour used"}
                  type={"number"}
                  value={hours}
                  //   disabled={Number(hours) >= 24}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Hour must include only numbers",
                    },
                    onChange: (e) => {
                      const value = e.target.value;
                      if (Number(value >= 0) && Number(value > 24)) {
                        return;
                        //  setDisabled(!disabled)
                      }
                      setHours(value);
                    },
                  }}
                />
              </div>

              <div>
                <FormInput
                  title={"Minute"}
                  camelCase={"minute"}
                  placeholder={"enter minutes"}
                  type={"number"}
                  value={minutes}
                  //   disabled={Number(minutes) >= 60}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Minutes must include only numbers",
                    },

                    onChange: (e) => {
                      const value = e.target.value;
                      if (Number(value >= 0) && Number(value > 60)) {
                        return;
                        //  setDisabled(!disabled)
                      }
                      setMinutes(value);
                    },
                  }}
                />

                <FormInput
                  title={"Seconds"}
                  camelCase={"second"}
                  placeholder={"enter seconds"}
                  type={"number"}
                  value={seconds}
                  //   disabled={Number(seconds) >= 60}
                  registerOptions={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Seconds must include only numbers",
                    },

                    onChange: (e) => {
                      const value = e.target.value;
                      if (Number(value >= 0) && Number(value > 60)) {
                        return;
                        //  setDisabled(!disabled)
                      }
                      setSeconds(value);
                    },
                  }}
                />
              </div>

              <div>
                <FormInput
                  title={"Assignment Date"}
                  camelCase={"dateOfAssignment"}
                  placeholder={"enter date of assignment"}
                  type={"date"}
                />
              </div>
            </div>
          </section>

          <div className={DashboardStyle.button_cage}>
            <SupportButtons width={"auto"}>Save as Draft</SupportButtons>
            <ActionButtons
              disabled={!isValid}
              isLoading={isLoadingActivity}
              className={DashboardStyle?.button_cage_weight}
            >
              {isLoadingActivity ? "Submitting" : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}
export default AddActivity;
