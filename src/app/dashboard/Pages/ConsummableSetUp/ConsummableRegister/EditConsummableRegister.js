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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  EditConsummableRegisterSingle,
  GetCategories,
  GetConsummableClass,
} from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";

function EditAssetRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFoundData, setIsFoundData] = useState({});
  const location = useLocation()?.state;

  const thres = location?.threshold?.replace(/[%]/g, "");

  const defaultData = {
    classId: location?.classId,
    classSubClassId: location?.subCLassId,
    assetCategory: location?.categoryId,
    assetName: location?.itemName,
    assetDescription: location?.specification,
    threshold: thres,
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

  const dispatch = useDispatch();
  const { category, isLoading, consummable_class } = useSelector(
    (state) => state?.consummableSetUp
  );

  useEffect(() => {
    dispatch(
      GetCategories({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
      })
    );

    dispatch(
      GetConsummableClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
        CategoryId: location?.categoryId,
      })
    )?.then(() => setValue("classSubClassId", location?.subCLassId || ""));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isFound = consummable_class?.responseObject?.find(
      (x) => location?.classId === +x?.id
    );
    setIsFoundData(isFound);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const submit = (data) => {
    const p = {
      consumableId: id,
      consumableCategoryId: +data?.assetCategory,
      name: data?.assetName,
      specification: data?.assetDescription,
      consumableClassId: +data?.classId,
      consumableSubClassId: +data?.classSubClassId,
      threshold: +data?.threshold,
      assetBrand: data?.assetBrand,
    };

    dispatch(EditConsummableRegisterSingle(p))?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../${id}/view`);
      }
    });
  };

  if (!category) {
    if (!consummable_class) {
      return <p>Loading Classes...</p>;
    }
    return <p>Loading...</p>;
  }

  return (
    <PageLayout title={"Edit Consumable Register"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>Asset Setup</h4>
            <div className={DashboardStyle.inputs_group}>
              <>
                <div>
                  <FormSelect
                    title={"Categories"}
                    camelCase={"assetCategory"}
                    placeholder={"select"}
                    isOptional={true}
                    isLoading={isLoading}
                    array={category?.result?.map?.((x, index) => (
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
                            CategoryId: e.target.value,
                          })
                        );
                        return null;
                      },
                    }}
                  />
                  <FormSelect
                    title={"Class"}
                    camelCase={`classId`}
                    placeholder={"select"}
                    isLoading={isLoading}
                    // defaultId={location?.classInformation?.id}
                    // defaultValue={location?.classInformation?.name}
                    array={consummable_class?.responseObject?.map?.(
                      (x, index) => (
                        <option key={index} value={+x?.id}>
                          {x?.name}
                        </option>
                      )
                    )}
                    moreRegister={{
                      onChange: (e) => {
                        const isFound = consummable_class?.responseObject?.find(
                          (x) => +e.target.value === +x?.id
                        );

                        setIsFoundData(isFound);
                        return;
                      },
                    }}
                  />
                </div>
                <div>
                  <FormSelect
                    title={"Sub Class"}
                    camelCase={`classSubClassId`}
                    placeholder={"select"}
                    arrayLenghtNotice={
                      "Select a Class with Available Subclasses"
                    }
                    array={isFoundData?.categorySubClass?.map?.((x, index) => (
                      <option key={index} value={+x?.id}>
                        {x?.name}
                      </option>
                    ))}
                  />

                  <FormInput
                    defaultValue={location?.assetName}
                    title={"Consumable Name"}
                    camelCase={`assetName`}
                    placeholder={"select"}
                    type="text"
                  />
                </div>
                <div>
                  <FormTextArea
                    title={"Consummable Description"}
                    camelCase={`assetDescription`}
                    placeholder={"select"}
                    type="textbox"
                    rowsLines={4}
                    defaultValue={location?.description}
                  />
                  <FormInput
                    // defaultValue={location?.assetName}
                    title={"Threshold"}
                    camelCase={`threshold`}
                    placeholder={"select"}
                    type="text"
                  />
                  {/* <FormInput
                    title={"Consummable Brand"}
                    camelCase={`assetBrand`}
                    placeholder={"select"}
                    type="text"
                  /> */}
                </div>
              </>
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
              // disabled={!isValid}
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

export default EditAssetRegister;
