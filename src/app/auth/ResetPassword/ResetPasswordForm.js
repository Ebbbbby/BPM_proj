import React, { useRef, useState } from "react";
import input from "../components/styles/input.module.css";
import { ActionButtons } from "../../global/components/Buttons/buttons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { URL } from "../../../utils/routes";
import { HiArrowLeft } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { CompleteForgotPassword } from "../../../utils/redux/Auth/AuthSlice";
import { useForm } from "react-hook-form";
import { strongPasswordRegex } from "../../../utils/functions/ResourceFunctions";

function ResetPasswordForm({ success, setSuccess }) {
  const [appSwitch, setAppSwitch] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useSearchParams({});

  const token = search.get("code");
  const email = search.get("email");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state?.auth);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const password = useRef({});
  password.current = watch("newPassword", "");

  const submit = (data) => {
    dispatch(
      CompleteForgotPassword({
        ...data,
        code: token,
        email: email,
      })
    ).then((res) => res?.payload?.statusCode === "00" && setSuccess(!success));
  };

  return (
    <>
      {/* <button>
      L
    </button> */}
      {/* <p className={input.auth_cta}>
        Don’t have an account?{" "}
        <b onClick={() => navigate(URL.SignUp)}>Sign Up</b>
      </p> */}
      <div className={input.auth_form}>
        <span
          onClick={() => navigate(URL.Login)}
          className={input.auth_go_back}
        >
          <HiArrowLeft />
          <p>Back</p>
        </span>

        <h2 className={input.auth_h2}>Reset Password</h2>
        <p className={input.auth_support_text}>Enter new login password</p>
        <form onSubmit={handleSubmit(submit)}>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="newPassword">
              Password
            </label>
            <div className={input.input_password_cage}>
              <input
                id={"newPassword"}
                className={input.input_field}
                type={!appSwitch ? "password" : "text"}
                placeholder={"Enter Password"}
                {...register("newPassword", {
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
            {errors.newPassword && (
              <small className={input.form__error__message}>
                {errors.newPassword.message}
              </small>
            )}
          </div>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className={input.input_password_cage}>
              <input
                id={"confirmPassword"}
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
            {errors.confirmPassword && (
              <small className="form__error__message password__error">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>
          <div className={input.auth_action_buttons}>
            <ActionButtons className={input.auth_button}>
              {isLoading ? "Loading..." : "Submit"}
            </ActionButtons>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPasswordForm;
