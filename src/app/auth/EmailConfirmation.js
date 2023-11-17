import React from "react";
import input from "./components/styles/input.module.css";
import Mail from "./components/img/Readed-mail.svg";
import AuthLayout from "./components/layout/AuthLayout";
import { ActionButtons } from "../global/components/Buttons/buttons";
import { useNavigate } from "react-router";

function EmailConfirmation() {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <>
        <div className={`${input.auth_form} ${input.auth_form_success}`}>
          <img src={Mail} alt="Opened Mail" />
          <h2 className={input.auth_h2}>Email verified</h2>
          <div>
            <div className={input.small_announcer}>
              <p>
                Your email has been verified, please log in to start your
                account registration process.
              </p>
              <ActionButtons onClick={() => navigate()} className={input.auth_button}>
                Continue
              </ActionButtons>
            </div>
          </div>
        </div>
      </>
    </AuthLayout>
  );
}

export default EmailConfirmation;
