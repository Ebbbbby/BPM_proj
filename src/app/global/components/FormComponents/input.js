import React, { useState } from "react";
import input from "./style/input.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function FormInput({ width, fontSize }) {
  return (
    <div className={input.input_container}>
      <label className={input.input_title} htmlFor="">
        Select Nature Of Business
      </label>
      <input className={input.input_field} type="text" placeholder={"Form"} />
    </div>
  );
}

export function FormInputPassword({ width, fontSize }) {
  const [appSwitch, setAppSwitch] = useState(false);
  return (
    <div className={input.input_container}>
      <label className={input.input_title} htmlFor="">
        Select Nature Of Business
      </label>
      <div className={input.input_password_cage}>
        <input
          className={input.input_field}
          type={!appSwitch ? "password" : "text"}
          placeholder={"Form"}
        />
        <span onClick={() => setAppSwitch(!appSwitch)}>
          {appSwitch ? <FiEye /> : <FiEyeOff />}
        </span>
      </div>
    </div>
  );
}
