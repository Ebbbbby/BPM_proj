import React, { useState } from "react";
import "./styles/styles.css";
const Questions = () => {
  const [question, setQuestion] = useState("");

  const handleMouseEnter = (event) => {
    event.target.style.borderBottom = "1px solid var(--greenStep_Two)";
  };

  const handleMouseLeave = (event) => {
    event.target.style.borderBottom = "none";
  };
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };



  return (
    <div className="form">
      <div className="input_container">
        <div className="input_labels">
          <input
            type="text"
            value={question}
            className="input_field"
            onChange={handleQuestionChange}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            placeholder="Question"
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
