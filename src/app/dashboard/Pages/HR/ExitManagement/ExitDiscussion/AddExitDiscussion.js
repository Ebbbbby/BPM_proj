import React, { useState } from "react";
import {

  FormTemplate,
} from "../../../../Components/Forms/InputTemplate";
import PageLayout from "../../../../Components/Layout/PageLayout";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../../global/components/Buttons/buttons";
import { FormProvider, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { CreateExitDiscussionQuestions } from "../../../../../../utils/redux/HR/HRSlice";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { UpdateExitDiscussionQuestions } from "../../../../../../utils/redux/HR/HRSlice";
import QuestionTypeSelection from "./QuestionTypeSelection";

const AddExitDiscussion = () => {
  const location = useLocation()?.state;
  const [questionType, setQuestionType] = useState(null);
  const [inputFields, setInputFields] = useState([{ id: 1, value: "" }]);
  const [showInputField, setShowInputField] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [questionAndTypes, setQuestionAndTypes] = useState([]);
  const [questionAndType, setQuestionAndType] = useState({});

  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleQuestionTypeChange = (newQuestionType) => {
    setQuestionType(newQuestionType);
  };

  const handleAddField = () => {
    setCounter(counter + 1);
    setInputFields((prev) => [...prev, { id: counter + 1, value: "" }]);
    setShowInputField(!showInputField);
  };

  const handleShowOptions = () => {
    if (!showOptions) {
      setShowOptions(showOptions);
      handleAddField();
    }
    setShowOptions(!showOptions);
    setQuestionAndTypes((prev) => [
      ...prev.filter(function (item) {
        return item.id !== questionAndType.id;
      }),
      questionAndType,
    ]);
  };

  const defaultData = {};
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const setCurrentQuestionValue = (currentQuestionType) => {
    setQuestionAndType(currentQuestionType);

    setQuestionAndTypes((prev) => [
      ...prev.filter(function (item) {
        return item.id !== currentQuestionType.id;
      }),
      currentQuestionType,
    ]);
  };

  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    const withoutId = JSON.stringify(questionAndTypes);
    const newArray = JSON.parse(withoutId);

    const removedIdKey = newArray.map(function (item) {
      delete item["id"];
      return item;
    });

    const payload = {
      "questions":removedIdKey
    }
    console.log(payload)
    // return;

    location? dispatch(UpdateExitDiscussionQuestions(payload))?.then((res) => {
      if (res?.payload?.successful === true) {
        navigate(`../${location?.id}/view`);
      }
    })
    :
    dispatch(CreateExitDiscussionQuestions(payload))?.then((res) => {
      //console.log( res );
      if (res?.payload?.successful === true) {
        navigate(`../`);
      }
    });
  };
  return (
    <PageLayout hasBack={true}>
      {
        <FormProvider {...formMethods}>
          <FormTemplate
            handleSubmit={handleSubmit(submit)}
            className={DashboardStyle.view_app_comonents}
          >
            {inputFields.map((item, index) => {
              return (
                <QuestionTypeSelection
                  key={index}
                  id={index}
                  questionType={questionType}
                  onChangeQuestionType={handleQuestionTypeChange}
                  onChangeQuestionValue={setCurrentQuestionValue}
                />
              );
            })}
            <div
              style={{
                color: "var(--primary-color)",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: "5px",
                marginTop: "1rem",
              }}
              onClick={handleShowOptions}
            >
              <FiPlus />
              <p>Add</p>
            </div>
            <div className={DashboardStyle.button_cage}>
              <SupportButtons
                width={"auto"}
                //   onClick={() => setIsOpen(!isOpen)}
                className={DashboardStyle?.button_cage_weight_without_border}
              >
                No, Cancel
              </SupportButtons>
              <ActionButtons
                type={"button"}
                width={"auto"}
                disabled={!isValid}
                className={DashboardStyle?.button_cage_weight}
                bg="var(--primary-color)"
                onClick={submit}
              >
                Submit
              </ActionButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      }
    </PageLayout>
  );
};

export default AddExitDiscussion;
