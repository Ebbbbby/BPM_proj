import React from "react";
import input from "../components/styles/input.module.css";
import Mail from "../../dashboard/Images/86372-addland-thanks-you.gif";
import { ActionButtons } from "../../global/components/Buttons/buttons";
import { useNavigate } from "react-router";
import { URL } from "../../../utils/routes";

function ResetPasswordSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{ minWidth: "30rem" }}
        className={`${input.auth_form} ${input.auth_form_success}`}
      >
        <img className={input.password_reset_success_img} src={Mail} alt="Opened Mail" />
        <h2 className={input.auth_h2}>Password update completed.</h2>
        <div>
          <div className={input.small_announcer}>
            <p>Your password has been update, continue login.</p>
            <ActionButtons
              onClick={() => navigate(URL.Login)}
              className={input.auth_button}
            >
              Login to Continue
            </ActionButtons>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordSuccess;
