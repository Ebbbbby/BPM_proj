import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import {
  FormSelect,
  FormTemplate,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { AppModalTemplate } from "../../../Components/Modals/Modals";
import { AssignDriver, GetAllEmployees } from "../../../../../utils/redux/Fleet/FleetSlice";
import { useNavigate, useParams } from "react-router";
import { ActionButtons } from "../../../../global/components/Buttons/buttons";

function AssignFleetDriver(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [driverItems, setDriverItems] = useState({});
  const { openModal, setOpenModal, fleet } = props;
  const { all_employees } = useSelector((state) => state?.fleet);

  const defaultData = {};

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;  

  useEffect(() => {
    dispatch(GetAllEmployees({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
      }        
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data) => {
    const formData = {
        ...data,
        fleetId: id,
        driverId: driverItems?.id,
        driverName: driverItems?.firstName + " " + driverItems?.surname
    };

    dispatch(AssignDriver(formData))?.then((res) => {
        if (res?.payload?.successful === true) {
          reset();
          navigate(`../${fleet?.uuId}/view`);
        }
    });

  };

  return (
    <AppModalTemplate
      padding={"0px"}
      width={"500px"}
      isOpen={openModal}
      setIsOpen={setOpenModal}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>      
        <section className={DashboardStyle.form_section}>
            <div className={DashboardStyle.textbox_lg}>
              <div style={{width: '400px'}}>

                <FormSelect
                  title={
                    <>
                      Assign Driver <sup style={{ color: "red" }}>*</sup>
                    </>
                  }
                  camelCase={"driverName"}
                  placeholder={"select"}
                  isOptional={true}
                  array={all_employees?.result?.filter(x => x.designationId === 2).map?.((x, index) => (
                    <option key={index} value={x?.uuId}>
                      {x?.firstName + " " + x?.surname}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = all_employees?.result?.find(
                        (x) => e.target.value === x?.uuId
                      );
                      setDriverItems(isFound);
                      return;
                    },
                  }}
                />
              </div>
            </div>
        </section>
          <div className={DashboardStyle.button_cage}>
            <ActionButtons
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
            >
              Submit
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </AppModalTemplate>
  );
}

export default AssignFleetDriver;