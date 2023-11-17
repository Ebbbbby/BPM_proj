import React from "react";
import input from "../components/styles/input.module.css";
import { ActionButtons } from "../../global/components/Buttons/buttons";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../utils/routes";
import { HiArrowLeft } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../../../utils/redux/Auth/AuthSlice";

function ForgotPasswordForm({ success, setSuccess, setEmail }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state?.auth);
  const submit = (data) => {
    setEmail(data);
    dispatch(ForgotPassword(data))?.then(
      (res) => res?.payload?.statusCode === "00" && setSuccess(!success)
    );
  };

  
  return (
    <>
      <p className={input.auth_cta}>
        Don’t have an account?{" "}
        <b onClick={() => navigate(URL.SignUp)}>Sign Up</b>
      </p>
      <div className={input.auth_form}>
        <span
          onClick={() => navigate(URL.Login)}
          className={input.auth_go_back}
        >
          <HiArrowLeft />
          <p>Back</p>
        </span>

        <h2 className={input.auth_h2}>Forget Password!</h2>
        <p className={input.auth_support_text}>
          Enter credentials below to recall password.
        </p>
        <form onSubmit={handleSubmit(submit)}>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="email">
              Email Address
            </label>
            <input
              id="emailAddress"
              className={input.input_field}
              type="text"
              placeholder={"Enter Email Address"}
              {...register("emailAddress", {
                required: {
                  value: true,
                  message: "Email Address is Required",
                },
              })}
            />
            {errors.emailAddress && (
              <small className={input.form__error__message}>
                {errors.emailAddress.message}
              </small>
            )}
          </div>
          {/* <div className={input.input_container}>
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
          </div> */}
          <div className={input.auth_action_buttons}>
            <ActionButtons className={input.auth_button}>
              {" "}
              {isLoading ? "Loading..." : "Submit"}
            </ActionButtons>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPasswordForm;
