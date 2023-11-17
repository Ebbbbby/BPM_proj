import React from "react";
import input from "../components/styles/input.module.css";
import Mail from "../components/img/Mail-opened.svg";
import { useDispatch, useSelector } from "react-redux";

function SignUpSuccess({ savedData, setSavedData, success, setSuccess }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.auth);
  return (
    <>
      <div className={`${input.auth_form} ${input.auth_form_success}`}>
        <img src={Mail} alt="Opened Mail" />
        <h2 className={input.auth_h2}>Check your email</h2>
        <div>
          <div className={input.small_announcer}>
            <p>
              A confirmation email has been sent to your email address. Check
              your inbox and follow the instructions to get started.
            </p>
            <p>
              Didn't get our mail, <span>Resend email</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpSuccess;
