import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import {
  CheckBox,
  FormSelect,
  FormTemplate,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  AddVendorDepartments,
  GetAllDepartments,
  GetSingleVendor,
} from "../../../../../utils/redux/Vendor/VendorSlice";

import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
// import { CheckMarks } from "./ViewVendors";
import { useParams } from "react-router";
import { toast } from "react-toastify";

function SetUpVendor(props) {
  const { openModal, setOpenModal, vendor } = props;

  const dispatch = useDispatch();

  const { all_departments, isLoadingAction } = useSelector(
    (state) => state?.vendor
  );

  useEffect(() => {
    dispatch(GetAllDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppModalTemplate
      padding={"0px"}
      width={"500px"}
      isOpen={openModal}
      setIsOpen={setOpenModal}
    >
      <NewCreateCategoryActions
        vendor={vendor}
        all_departments={all_departments}
        // category={consummableSetUp}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        isLoadingAction={isLoadingAction}
      />
    </AppModalTemplate>
  );
}

export default SetUpVendor;

export function NewCreateCategoryActions({
  isOpen,
  setIsOpen,
  category,
  isLoadingAction,
  all_departments,
  vendor,
}) {
  const prefilledManaging = vendor?.managingDepartment?.map((x) => x);

  const prefilledUsers = vendor?.userDepartment?.reduce(
    (lookup, value) => ({
      ...lookup,
      [value?.name]: value?.name,
    }),
    {}
  );

  const defaultData = {
    userDepartments: prefilledUsers,
    managingDepartmentId: prefilledManaging?.[0]?.id,
    managingDepartmentUnit: prefilledManaging?.[0]?.departmentUnit?.id,
  };

  const getManagingUnits = all_departments?.responseObject?.pageItems?.find(
    (x) => defaultData?.managingDepartmentId === x?.id
  );

  const [units, setUnits] = useState(getManagingUnits || {});
  const [departmentDetails, setDepartmentDetails] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const { handleSubmit } = formMethods;
  const submit = (data) => {
    console.log({ data });
    const appData = {
      vendorId: +id,
      userDepartments: Object?.keys(data?.userDepartments)
        ?.filter((x) => data?.userDepartments[x] !== false)
        ?.map((x) => {
          return {
            name: x,
            id: all_departments?.responseObject?.pageItems?.find(
              (y) => y?.name === x
            )?.id,
          };
        }),
      managingDepartments: [
        {
          id: +data?.managingDepartmentId,
          name:
            departmentDetails?.managingDepartments?.name ||
            prefilledManaging?.[0]?.name,
          departmentUnit: {
            id: +data?.managingDepartmentUnit,
            name:
              departmentDetails?.departmentUnit?.name ||
              prefilledManaging?.[0]?.departmentUnit?.name,
          },
        },
      ],
    };

    if (appData?.userDepartments?.length === 0) {
      return toast.error("Please select atleast one User department");
    }

    return dispatch(AddVendorDepartments(appData))?.then((res) => {
      if (res?.payload?.successful === true) {
        dispatch(GetSingleVendor({ id }));
        setIsOpen(!isOpen);
      }
    });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>Setup Account</h4>
        <FiX
          style={{ cursor: "pointer" }}
          size={"1.5rem"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className={DashboardStyle.dash_board_home_nav_body}>
        <div>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <section
                style={{ gridTemplateColumns: "1fr", padding: "0.5rem" }}
                className={DashboardStyle.form_section}
              >
                <div
                  style={{ padding: "1rem", gridTemplateColumns: "1fr" }}
                  className={DashboardStyle.inputs_group_no_grid}
                >
                  <div style={{ gridTemplateColumns: "1fr" }}>
                    <FormSelect
                      title={"Managing Department"}
                      camelCase={"managingDepartmentId"}
                      placeholder={"select"}
                      array={all_departments?.responseObject?.pageItems?.map?.(
                        (x, index) => (
                          <option key={index} value={x?.id}>
                            {x?.name}
                          </option>
                        )
                      )}
                      moreRegister={{
                        onChange: (e) => {
                          const isFound =
                            all_departments?.responseObject?.pageItems?.find(
                              (x) => +e.target.value === x?.id
                            );

                          setUnits(isFound);
                          setDepartmentDetails({
                            ...departmentDetails,
                            managingDepartments: isFound,
                          });
                        },
                      }}
                    />
                  </div>
                  <div style={{ gridTemplateColumns: "1fr" }}>
                    <FormSelect
                      title={"Unit"}
                      camelCase={"managingDepartmentUnit"}
                      placeholder={"select"}
                      arrayLenghtNotice={
                        "No Available Units, Select A Managing Department with Units"
                      }
                      array={units?.containers?.map?.((x, index) => (
                        <option key={index} value={x?.id}>
                          {x?.name}
                        </option>
                      ))}
                      moreRegister={{
                        onChange: (e) => {
                          const isFound = units?.containers?.find(
                            (x) => +e.target.value === x?.id
                          );
                          setDepartmentDetails({
                            ...departmentDetails,
                            departmentUnit: isFound,
                          });
                        },
                      }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        marginTop: "0.65rem",
                        color: "var(--form_title)",
                        fontWeight: "400",
                      }}
                    >
                      User Departments <sup style={{ color: "red" }}>*</sup>
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {all_departments?.responseObject?.pageItems?.map(
                        (state) => {
                          return (
                            <CheckBox
                              isRequired={false}
                              camelCase={`userDepartments.${state?.name}`}
                              name={`${state?.name}`}
                              value={`${state?.name}`}
                              group={`managingDepartments.${state?.name}`}
                              style={{ flex: "1 1 auto" }}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </section>
              <div
                style={{ marginTop: "1rem" }}
                className={DashboardStyle.button_cage}
              >
                <SupportButtons
                  width={"auto"}
                  onClick={() => setIsOpen(!isOpen)}
                  className={DashboardStyle?.button_cage_weight_without_border}
                >
                  No, Cancel
                </SupportButtons>
                <ActionButtons
                  isLoading={isLoadingAction}
                  // disabled={!isValid}
                  width={"auto"}
                  className={DashboardStyle?.button_cage_weight}
                  bg="var(--primary-color)"
                >
                  Submit
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
