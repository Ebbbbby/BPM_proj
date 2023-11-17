import React, { useRef, useState } from "react";
import input from "../components/styles/input.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ActionButtons } from "../../global/components/Buttons/buttons";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../utils/routes";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SignUp } from "../../../utils/redux/Auth/AuthSlice";
import { strongPasswordRegex } from "../../../utils/functions/ResourceFunctions";

function SignUpForm({ success, setSuccess, savedData, setSavedData }) {
  const [appSwitch, setAppSwitch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state?.auth);

  console.log({ user, error });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const password = useRef({});
  password.current = watch("password", "");

  const submit = (data) => {
    dispatch(SignUp({ ...data, userCategory: 1 })).then(
      (res) => (res?.payload?.statusCode === "00") & setSuccess(!success)
    );
    setSavedData({ ...data, userCategory: 1 });
    // dispatch(AppLogin(data));
  };
  return (
    <>
      <p className={input.auth_cta}>
        Already have an account?{" "}
        <b onClick={() => navigate(URL.Login)}>Sign In</b>
      </p>
      <div className={input.auth_form}>
        <h2 className={input.auth_h2}>Get Started 👋</h2>
        <p className={input.auth_support_text}>
          It’ll only take a few minutes.
        </p>
        <form onSubmit={handleSubmit(submit)}>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              className={input.input_field}
              type="email"
              placeholder={"enter email address"}
              {...register("emailAddress", {
                required: {
                  value: true,
                  message: "Email is Required",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a Valid Email",
                },
              })}
            />
            {errors.emailAddress && (
              <small className={input.form__error__message}>
                {errors.emailAddress.message}
              </small>
            )}
          </div>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="password">
              Password
            </label>
            <div className={input.input_password_cage}>
              <input
                id={"password"}
                className={input.input_field}
                type={!appSwitch ? "password" : "text"}
                placeholder={"enter password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  pattern: {
                    value: strongPasswordRegex,
                    message:
                      "Password must be 8 characters including an upper case alphabet, numbers and special character.",
                  },
                })}
              />
              <span onClick={() => setAppSwitch(!appSwitch)}>
                {appSwitch ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {errors.password && (
              <small className={input.form__error__message}>
                {errors.password.message}
              </small>
            )}
          </div>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="confirm_password">
              Confirm Password
            </label>
            <div className={input.input_password_cage}>
              <input
                id={"confirm_password"}
                className={input.input_field}
                type={!appSwitch ? "password" : "text"}
                placeholder={"enter password"}
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is Required",
                  },
                  validate: (value) =>
                    value === password.current || "Correctly confirm password",
                })}
              />
              <span onClick={() => setAppSwitch(!appSwitch)}>
                {appSwitch ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
          </div>
          <div className={input.small_announcer}>
            <p>
              By clicking on the continue button below, you agree to our{" "}
              <span>Terms & Conditions</span> and <span>Privacy Policy</span>
            </p>
          </div>
          <div className={input.auth_action_buttons}>
            <ActionButtons className={input.auth_button}>
              Continue
            </ActionButtons>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
