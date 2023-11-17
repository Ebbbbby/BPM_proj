import React from "react";
import Modal from "./modal.module.css";
import DashboardStyle from "../../../dashboard/Styles/Dashboard.module.css";
import { AppModalTemplate } from "./Modals";
import Action from "../../Images/actions.svg";
import { ActionButtons } from "../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  approvalAndDecline,
  successAlertOff,
} from "../../../../utils/redux/Global/GlobalSlice";

export function AppAlert({ declineAction, approvalAction }) {
  const dispatch = useDispatch();

  const { success, message, close } = useSelector((x) => x?.global);

  return (
    <>
      {success === true && (
        <AppModalTemplate
          padding={"1.75rem"}
          isOpen={true}
          closeFunction={() => {
            dispatch(
              approvalAndDecline({
                state: false,
                comments: "",
              })
            );
          }}
        >
          <div>
            <img
              className={Modal?.modal_action_img}
              src={Action}
              alt="action"
            />
            <h3 className={Modal?.modal_action_h3}>Success</h3>
            <p className={Modal?.modal_action_p}>{message}</p>
            <ActionButtons
              // disabled={watch("comments") === null ? true : false}
              className={DashboardStyle?.button_cage_weight}
              style={{
                display: "block",
                width: "105px",
                margin: "1rem auto 0",
              }}
              onClick={() => {
                if (close === "refresh") {
                  dispatch?.(successAlertOff?.());
                  window.location.reload();
                } else dispatch?.(successAlertOff?.());
              }}
            >
              OK
            </ActionButtons>
          </div>
        </AppModalTemplate>
      )}
    </>
  );
}
