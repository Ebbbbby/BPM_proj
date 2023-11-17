import React, { useEffect, useState } from "react";

import {
  FormInput,
  FormInputHidden,
  FormSelect,
  FormTemplate,
} from "../../../../Components/Forms/InputTemplate";
import { GiChoice } from "react-icons/gi";
import { BiText } from "react-icons/bi";

const QuestionTypeSelection = ({
  id = "",
  questionType,
  onChangeQuestionType,
  onChangeQuestionValue
}) => {
  const [showChoice, setShowChoice] = useState(true);
  const [showText, setShowText] = useState(true);
  const [questionTypeState, setQuestionTypeState] = useState(0);
  const [inputOptions, setInputOptions] = useState(false);

  const addChoiceOption = () => {
    onChangeQuestionType(1);
    setInputOptions(!inputOptions);
    setShowChoice(true);
    setShowText(false);
    setQuestionTypeState(1);
  };

 
  const addTextOption = () => {
    onChangeQuestionType(0);
    setInputOptions(!inputOptions);
    setShowChoice(false);
    setShowText(true);
    setQuestionTypeState(0);
  };

  useEffect(() => {
  }, []);

  const handleQuestionType = (questionValue, id) => {
    let questionType = {
      type: questionTypeState,
      question: questionValue,
      id: id,
    };
    onChangeQuestionValue(questionType)
  };

 

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "200px",
          borderRadius: ".3rem",
        }}
      >
        {showChoice && (
          <div
            style={{
              margin: "10px",
              alignItems: "center",
              display: "flex",
              padding: ".3rem .7rem",
              backgroundColor: "#fff",
              color: "var(--greenStep_Two)",
              borderRadius: ".3rem",
              cursor: "pointer",
              background: "var(--greenStep_Two)",
              color: "#fff",
            }}
            onClick={addChoiceOption}
          >
            <GiChoice />
            <div>Choice</div>
          </div>
        )}
        {showText && (
          <div
            style={{
              margin: "10px",
              alignItems: "center",
              border: "1px solid red",
              display: "flex",
              padding: ".3rem .7rem",
              border: "1px solid var(--greenStep_Two)",
              backgroundColor: "#fff",
              color: "var(--greenStep_Two)",
              borderRadius: ".3rem",
              cursor: "pointer",
            }}
            onClick={addTextOption}
          >
            <BiText />
            <div>Text</div>
          </div>
        )}
      </div>
      <div>
        {inputOptions && (
          <>
            <FormInput
              camelCase={`question${id}`}
              type="text"
              title={`Question`}
              registerOptions={{
                onChange: (e) => {
                  handleQuestionType(e.target.value, id);
                  //setLeaveItems(isFound);
                },
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default QuestionTypeSelection;
