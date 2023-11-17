import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FormSelect,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { BsDash } from "react-icons/bs";
import { useNavigate } from "react-router";
import {
  CreateConsummableRegister,
  GetCategories,
  GetConsummableClass,
} from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";

function AddConsummableRegister() {
  const { category, isLoading, consummable_class } = useSelector(
    (x) => x?.consummableSetUp
  );
  const navigate = useNavigate();
  const defaultData = {
    consumableItems: [
      {
        name: "",
        specification: "",
        consumableClassId: "",
        consumableSubClassId: "",
        threshold: "",
      },
    ],
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const feildArray = useFieldArray({
    control: formMethods.control,
    name: "consumableItems",
  });
  const { fields, append, remove } = feildArray;
  const dispatch = useDispatch();
  // const d = useSelector((x) => x);

  // console.log({ d });

  useEffect(() => {
    dispatch(
      GetCategories({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 2,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data) => {
    const v = {
      consumableCategoryId: +data?.consumableCategoryId,
      consumableItems: data?.consumableItems?.map((x) => {
        return {
          ...x,
          name: x?.name,
          specification: x?.specification,
          consumableClassId: +x?.consumableClassId,
          consumableSubClassId: +x?.consumableSubClassId,
          threshold: +x?.threshold,
        };
      }),
    };

    dispatch(CreateConsummableRegister(v))?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../`);
      }
    });
  };

  return (
    <PageLayout title={"Create New Consummable Register"} hasBack={true}>
      <FormProvider {...formMethods} {...feildArray}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Consummable Category
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormSelect
                  title={"Category"}
                  camelCase={"consumableCategoryId"}
                  placeholder={"select"}
                  // isOptional={true}
                  array={category?.result.map?.((x, index) => (
                    <option key={index} value={+x?.id}>
                      {x?.categoryName}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      dispatch(
                        GetConsummableClass({
                          pageSize: 100000,
                          currentPage: 1,
                          sort: 0,
                          filter: 0,
                          CategoryId: +e.target.value,
                        })
                      );
                      return null;
                    },
                  }}
                />
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Consummable Setup
            </h4>
            <div className={DashboardStyle.inputs_group}>
              {fields?.map(({ x }, index) => {
                const fieldName = `consumableItems.[${index}]`;
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
                    <RegisterLineItem
                      fieldName={fieldName}
                      consummable_class={consummable_class}
                      // assetSetUp={assetSetUp}
                      index={index}
                      remove={remove}
                      append={append}
                    />
                  </fieldset>
                );
              })}
            </div>
          </section>

          <div className={DashboardStyle.button_cage}>
            <SupportButtons
              onClick={() => reset()}
              width={"auto"}
              className={DashboardStyle?.button_cage_weight}
            >
              Cancel
            </SupportButtons>
            <ActionButtons
              isLoading={isLoading}
              disabled={!isValid}
              width={"auto"}
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

export default AddConsummableRegister;

function RegisterLineItem({
  fieldName,
  consummable_class,
  index,
  remove,
  append,
}) {
  const [isFoundData, setIsFouncData] = useState();
  return (
    <>
      <div style={{ gridTemplateColumns: "1fr" }}>
        <FormSelect
          title={"Class"}
          camelCase={`${fieldName}.consumableClassId`}
          placeholder={"select"}
          array={consummable_class?.responseObject?.map?.((x, index) => (
            <option key={index} value={x?.id}>
              {x?.name}
            </option>
          ))}
          moreRegister={{
            onChange: (e) => {
              const isFound = consummable_class?.responseObject?.find(
                (x) => +e.target.value === +x?.id
              );

              // dispatch(
              //   GetAssetSubClass({
              //     pageSize: 100000,
              //     currentPage: 1,
              //     sort: 0,
              //     filter: 0,
              //     CategoryId: isFound?.categoryId,
              //     AssetClassId: e.target.value,
              //   })
              // );

              // console.log({ isFound });

              return setIsFouncData(isFound);
            },
            // return console.log({ data });
          }}
        />
      </div>
      <div>
        <FormSelect
          title={"Sub Class"}
          camelCase={`${fieldName}.consumableSubClassId`}
          placeholder={"select"}
          array={isFoundData?.categorySubClass?.map?.((x, index) => (
            <option key={index} value={x?.id}>
              {x?.name}
            </option>
          ))}
        />

        <FormInput
          title={"Consummable Name"}
          camelCase={`${fieldName}.name`}
          placeholder={"select"}
          type="text"
        />
      </div>
      <div>
        <FormTextArea
          title={"Consummable Specification"}
          camelCase={`${fieldName}.specification`}
          placeholder={"select"}
          type="textbox"
          rowsLines={4}
        />
        {/* <FormInput
          title={"Consummable Brand"}
          camelCase={`${fieldName}.assetBrand`}
          placeholder={"select"}
          type="text"
        /> */}
        <FormInput
          title={"Threshold (%)"}
          camelCase={`${fieldName}.threshold`}
          placeholder={"select"}
          type="text"
        />
      </div>
      {index !== 0 ? (
        <div
          style={{
            color: "#E61B00",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "5px",
            marginTop: "1rem",
          }}
          onClick={() => remove?.(index)}
        >
          <BsDash />

          <p>Remove Setup</p>
        </div>
      ) : (
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
      )}
    </>
  );
}
