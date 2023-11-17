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
import {
  CreateAssetRegister,
  GetAssetClass,
  GetCategories,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { BsDash } from "react-icons/bs";
import { useNavigate } from "react-router";

function AddAssetRegister() {
  const navigate = useNavigate();
  const defaultData = {
    assetSetups: [
      {
        assetDescription: "",
        assetName: "",
        classId: "",
        classSubClassId: "",
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
    name: "assetSetups",
  });
  const { fields, append, remove } = feildArray;
  const dispatch = useDispatch();
  const { category, asset_class, isLoading } = useSelector(
    (state) => state?.assetSetUp
  );

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
      assetCategory: +data?.assetCategory,
      assetSetups: data?.assetSetups?.map((x) => {
        return {
          ...x,
          classId: +x?.classId,
          classSubClassId: +x?.classSubClassId,
        };
      }),
    };

    dispatch(CreateAssetRegister(v))?.then((res) => {
      console.log({ res });
      if (res?.payload?.successful === true) {
        navigate(`../`);
      }
    });
  };

  return (
    <PageLayout title={"Create New Asset Register"} hasBack={true}>
      <FormProvider {...formMethods} {...feildArray}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Category
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormSelect
                  title={"Category"}
                  camelCase={"assetCategory"}
                  placeholder={"select"}
                  isOptional={true}
                  array={category?.result?.map?.((x, index) => (
                    <option key={index} value={+x?.id}>
                      {x?.name}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      dispatch(
                        GetAssetClass({
                          pageSize: 100000,
                          currentPage: 1,
                          sort: 0,
                          filter: 0,
                          CategoryId: e.target.value,
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
            <h4 className={DashboardStyle.form_section_title}>Asset Setup</h4>
            <div className={DashboardStyle.inputs_group}>
              {fields?.map(({ x }, index) => {
                const fieldName = `assetSetups.[${index}]`;
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
                      asset_class={asset_class}
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

export default AddAssetRegister;

function RegisterLineItem({ fieldName, asset_class, index, remove, append }) {
  const [isFoundData, setIsFouncData] = useState();
  return (
    <>
      <div style={{ gridTemplateColumns: "1fr" }}>
        <FormSelect
          title={"Class"}
          camelCase={`${fieldName}.classId`}
          placeholder={"select"}
          array={asset_class?.responseObject?.map?.((x, index) => (
            <option key={index} value={+x?.id}>
              {x?.name}
            </option>
          ))}
          moreRegister={{
            onChange: (e) => {
              const isFound = asset_class?.responseObject?.find(
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
          camelCase={`${fieldName}.classSubClassId`}
          placeholder={"select"}
          array={isFoundData?.subClasses?.map?.((x, index) => (
            <option key={index} value={+x?.id}>
              {x?.name}
            </option>
          ))}
        />

        <FormInput
          title={"Asset Name"}
          camelCase={`${fieldName}.assetName`}
          placeholder={"select"}
          type="text"
        />
      </div>
      <div>
        <FormTextArea
          title={"Asset Description"}
          camelCase={`${fieldName}.assetDescription`}
          placeholder={"select"}
          type="textbox"
          rowsLines={4}
        />
        {/* <FormInput
          title={"Asset Brand"}
          camelCase={`${fieldName}.assetBrand`}
          placeholder={"select"}
          type="text"
        /> */}
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
