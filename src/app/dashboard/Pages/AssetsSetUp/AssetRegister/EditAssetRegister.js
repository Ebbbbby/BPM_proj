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
import { useDispatch, useSelector } from "react-redux";
import {
  EditAssetRegisterSingle,
  GetAssetClass,
  GetAssetSubClass,
  GetCategories,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { useLocation, useNavigate, useParams } from "react-router";

function EditAssetRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [isFoundData, setIsFouncData] = useState();
  const location = useLocation()?.state;

  const defaultData = {
    classId: location?.classInformation?.id,
    classSubClassId: location?.subClassInformation?.id,
    assetCategory: location?.categoryId,
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

  const dispatch = useDispatch();
  const { category, asset_class, isLoading, asset_sub_class } = useSelector(
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

    dispatch(
      GetAssetClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
        CategoryId: location?.categoryId,
      })
    );

    dispatch(
      GetAssetSubClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
        CategoryId: location?.categoryId,
        AssetClassId: location?.classInformation?.id,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data) => {
    const p = {
      assetId: id,
      assetCategory: +data?.assetCategory,
      assetName: data?.assetName,
      assetDescription: data?.assetDescription,
      assetClassId: +data?.classId,
      assetSubClassId: +data?.classSubClassId,
      assetBrand: data?.assetBrand,
    };
    // const v = {
    //   assetCategory: +data?.assetCategory,
    //   assetSetups: data?.assetSetups?.map((x) => {
    //     return {
    //       assetDescription: x?.assetDescription,
    //       assetName: x?.assetName,
    //       classId: +x?.classId,
    //       classSubClassId: +x?.classSubClassId,
    //     };
    //   }),
    // };

    dispatch(EditAssetRegisterSingle(p))?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../${id}/view`);
      }
    });
  };



  if(!asset_class){
    return <p>Loading...</p>
  }

  return (
    <PageLayout title={"Edit Asset Register"} hasBack={true}>
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
                    title={"Category"}
                    camelCase={"assetCategory"}
                    placeholder={"select"}
                    // isOptional={true}
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
                  <FormSelect
                    title={"Class"}
                    camelCase={`classId`}
                    placeholder={"select"}
                    // defaultId={location?.classInformation?.id}
                    // defaultValue={location?.classInformation?.name}
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

                        dispatch(
                          GetAssetSubClass({
                            pageSize: 100000,
                            currentPage: 1,
                            sort: 0,
                            filter: 0,
                            CategoryId: isFound?.categoryId,
                            AssetClassId: e.target.value,
                          })
                        );

                        // console.log({ isFound });

                        return;
                      },
                      // return console.log({ data });
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
                    // defaultId={location?.subClassInformation?.id}
                    // defaultValue={location?.subClassInformation?.name}
                    array={asset_sub_class?.responseObject?.map?.(
                      (x, index) => (
                        <option key={index} value={+x?.id}>
                          {x?.name}
                        </option>
                      )
                    )}
                  />

                  <FormInput
                    defaultValue={location?.assetName}
                    title={"Asset Name"}
                    camelCase={`assetName`}
                    placeholder={"select"}
                    type="text"
                  />
                </div>
                <div>
                  <FormTextArea
                    title={"Asset Description"}
                    camelCase={`assetDescription`}
                    placeholder={"select"}
                    type="textbox"
                    rowsLines={4}
                    defaultValue={location?.description}
                  />
                  {/* <FormInput
                    defaultValue={location?.assetBrand}
                    title={"Asset Brand"}
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

export default EditAssetRegister;
