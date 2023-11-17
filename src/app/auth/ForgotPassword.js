import React from "react";
import AuthLayout from "./components/layout/AuthLayout";
import input from "./components/styles/input.module.css";
import { ActionButtons } from "../global/components/Buttons/buttons";
import { useNavigate } from "react-router-dom";
import { URL } from "../../utils/routes";
import { HiArrowLeft } from "react-icons/hi";

function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <AuthLayout isLogin={true}>
      <p className={input.auth_cta}>
        Don’t have an account?{" "}
        <b onClick={() => navigate(URL.SignUp)}>Sign Up</b>
      </p>
      <div onClick={URL.Login} className={input.auth_form}>
        <span>
          <HiArrowLeft />
          <p>Back</p>
        </span>

        <h2 className={input.auth_h2}>Forget Password!</h2>
        <p className={input.auth_support_text}>
          Enter credentials below to recall password.
        </p>
        <form>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="email">
              Username or Email Address
            </label>
            <input
              id="email"
              className={input.input_field}
              type="email"
              placeholder={"Enter Username or Email Address"}
            />
          </div>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="password">
              Mobile Number
            </label>
            <div className={input.input_password_cage}>
              <input
                id={"password"}
                className={input.input_field}
                type={"text"}
                placeholder={"enter password"}
              />
            </div>
          </div>
          <div className={input.auth_action_buttons}>
            <ActionButtons className={input.auth_button}>Submit</ActionButtons>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
