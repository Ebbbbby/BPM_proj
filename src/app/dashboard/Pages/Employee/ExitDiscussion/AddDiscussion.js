import React, { useEffect, useState } from "react";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormProvider, useForm } from "react-hook-form";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";

import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import {  useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FormTemplate,TextArea } from "../../../Components/Forms/InputTemplate";
import { GetExitDiscussionQuestion,CreateExitDiscussion } from "../../../../../utils/redux/HR/HRSlice";

const AddDiscussion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { get_discussion_question,isLoading } = useSelector((state) => state.hr);
 
  // function handleAnswerChange(questionId, event) {
  //   const newAnswers = { ...answers, [questionId]: event.target.value };
  //   setAnswers(newAnswers);
  // }

  useEffect(() => {
    dispatch(GetExitDiscussionQuestion());
     // eslint-disable-next-line react-hooks/exhaustive-deps   
  }, []);

  const defaultData = {
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    const dataValue = {
      ...data,
    };
    let arrOfObj = []
    const key = Object.keys(dataValue);

    key?.forEach((key, index) => {
      arrOfObj.push({"discussionQuestionId":Number(key), "answer": dataValue[key]});
    });

  let json = {"exitDiscussions":arrOfObj};
//   console.log(json)
//  return

    dispatch(CreateExitDiscussion(json))?.then((res) => {
      console.log(res);
      if (res?.payload?.successful === true) {
        navigate(`../../Exit-Requisition`);
      }
    });
  };
  return (
    <PageLayout title={"Exit Discussion"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          {get_discussion_question?.responseObject?.map((question,index)=> (
            <div key={question?.id} className={DashboardStyle.border_style}
            >
              <TextArea
                style={{border: 'none'}}
                camelCase={`${question?.id}`}
                placeholder={`Question`}
                type="textbox"
                title = {`${index + 1}. ${question?.question}`}
                             
              />
            </div>
          ))}

          <div className={DashboardStyle.button_cage}>
            <SupportButtons
              width={"auto"}
              onClick={() => navigate(-1)}
              className={DashboardStyle?.button_cage_weight}
            >
              Cancel
            </SupportButtons>
            <ActionButtons
              width={"auto"}
              isLoading={isLoading}
              disabled={!isValid}
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

export default AddDiscussion;
