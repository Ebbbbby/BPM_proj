import React from "react";
import input from "../components/styles/input.module.css";
import Mail from "../components/img/Mail-opened.svg";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../../../utils/redux/Auth/AuthSlice";
import { toast } from "react-toastify";

function ForgotPasswordSuccess({ email }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.auth);
  return (
    <>
      <div className={`${input.auth_form} ${input.auth_form_success}`}>
        <img src={Mail} alt="Opened Mail" />
        <h2 className={input.auth_h2}>
          Check your inbox and confirm your email address
        </h2>
        <div>
          <div className={input.small_announcer}>
            <p>Check your inbox and confirm your email address</p>
            <p>
              If you can't find the email in your inbox or spam folder, please
              click below and we will send you a new one,{" "}
              <span
                onClick={() =>
                  dispatch(ForgotPassword(email)).then(
                    (res) =>
                      res.payload.statusCode === "00" &&
                      toast.success(res.payload.statusMessage)
                  )
                }
              >
                {isLoading === true ? "Resending Mail" : "Resend email"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordSuccess;
