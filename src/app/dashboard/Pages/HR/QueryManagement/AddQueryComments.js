import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import {  useNavigate, useParams } from "react-router";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormSelect,
  FormTemplate,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import {
  CreateQueryPanel,
  GetAllEmployees,
} from "../../../../../utils/redux/HR/HRSlice";
import { ProbablePunishments } from "../../../../../utils/const/QueryConst";
import { URL } from "../../../../../utils/routes";

const AddQueryComments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetAllEmployees({ pageNumber: 1, pageSize: 10 }));
          // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultData = {};
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const {
    handleSubmit,
    // formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    let payload = {
      ...data,
      queryId: id * 1,
      recommendation: data?.recommendation * 1,
      hrComment: data?.hrComment,
    };
    //   console.log(payload,'payload')
    //   console.log(data,'data')
    //   return;

    dispatch(CreateQueryPanel(payload))?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../${URL.All_Query_Management}`);
      }
    });
  };
  return (
    <PageLayout title={"Add Comment"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>Add Comment</h4>
            <div className={DashboardStyle.inputs_group}>
                <div>
                <FormSelect
                title={"Recomendation"}
                camelCase={"recommendation"}
                placeholder={"select"}
                array={ProbablePunishments?.map((x, index) => (
                  //console.log(x)
                  <option key={index} value={x?.id}>
                    {x?.name}
                  </option>
                ))}
              />

              <FormTextArea
                title={"Comment"}
                camelCase={"hrComment"}
                placeholder={"select"}
                isOptional={true}
                rowsLines={4}
              />
                </div>
         

             
            </div>
          </section>

          <div className={DashboardStyle.button_cage}>
            <SupportButtons
              width={"auto"}
              className={DashboardStyle?.button_cage_weight}
            >
              Cancel
            </SupportButtons>
            <ActionButtons
              width={"auto"}
              // isLoading={isLoading}
              className={DashboardStyle?.button_cage_weight}
            >
              Submit
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
};

export default AddQueryComments;
