import React, { useEffect } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../../Components/Layout/PageLayout";
import { GetExitDiscussion } from "../../../../../../utils/redux/HR/HRSlice";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "../ExitRequisition/Accordion";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../../../Components/Layout/PageLayout";
import { FormProvider, useForm } from "react-hook-form";
import { FormTemplate, FormTextArea } from "../../../../Components/Forms/InputTemplate";
import { ActionButtons, SupportButtons } from "../../../../../global/components/Buttons/buttons";
import { AddRemarks } from "../../../../../../utils/redux/HR/HRSlice";

const ViewExitDiscussion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { get_discussion } = useSelector((state) => state?.hr);
  const getDiscussion = get_discussion?.responseObject?.exitDiscussions;
  console.log(get_discussion)

  const dispatch = useDispatch();
  useEffect(() => {
  if (id !== undefined) {
      dispatch(GetExitDiscussion({ ExitRequestId: id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const defaultData = {
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

  const submit = (data) =>{
    const payload = {
      exitRequestId: Number(id),
      remark: data?.remark
    }
    // console.log(payload)
    // return
    dispatch(AddRemarks(payload))?.then((res) => {
      console.log(res)
        if (res?.payload?.successful === true) {
          reset();
          navigate(`../`);
        }
      });

  }

  return (
    <PageStyle title={"View Exit Discussions"} hasBack={true} isMain={true}>
      <div className={DashboardStyle.dashboard_table_holder}>
        {<Accordion items={getDiscussion} />}
      </div>
      <PageLayout>
      {
        <FormProvider {...formMethods}>
          <FormTemplate
            handleSubmit={handleSubmit(submit)}
            className={DashboardStyle.view_app_comonents}
          >
          <FormTextArea
                  title={"Remark"}
                  camelCase={"remark"}
                  type="textbox"
                  isOptional={true}
                />
      
            <div className={DashboardStyle.button_cage}>
              <SupportButtons
                width={"auto"}
                onClick={() => navigate(-1)}
                //   onClick={() => setIsOpen(!isOpen)}
                className={DashboardStyle?.button_cage_weight_without_border}
              >
                No, Cancel
              </SupportButtons>
              <ActionButtons
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
              >
                Submit
              </ActionButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      }
    </PageLayout>
    </PageStyle>

  );
};

export default ViewExitDiscussion;
