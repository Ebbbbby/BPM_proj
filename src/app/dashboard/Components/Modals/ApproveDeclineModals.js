import React from "react";
import Modal from "./modal.module.css";
import DashboardStyle from "../../../dashboard/Styles/Dashboard.module.css";
import { AppModalTemplate } from "./Modals";
import Action from "../../Images/actions.svg";
import { FormTemplate, FormTextArea } from "../Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  approvalAndDecline,
} from "../../../../utils/redux/Global/GlobalSlice";

export function ApproveModals({ declineAction, approvalAction }) {
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit, watch, reset } = formMethods;

  const dispatch = useDispatch();

  const { state, topic, kind } = useSelector((x) => x?.global);
  // console.log({ data });

  const submit = (data) => {
    kind === "approval"
      ? approvalAction().then((res) => {
          console.log({ res });
          if (res?.payload?.successful === true) {
            dispatch(
              approvalAndDecline({
                state: false,
              })
            );
            reset();
          }
        })
      : declineAction()?.then((res) => {
          console.log(res);
          if (res?.payload?.successful === true) {
            dispatch(
              approvalAndDecline({
                state: false,
              })
            );
            reset();
          }
        });
  };

  return (
    <>
      {state === true && (
        <AppModalTemplate
          padding={"1.75rem"}
          isOpen={state}
          closeFunction={() => {
            dispatch(
              approvalAndDecline({
                state: false,
                comments: "",
              })
            );
            reset();
          }}
        >
          <div>
            <img
              className={Modal?.modal_action_img}
              src={Action}
              alt="action"
            />
            <h3 className={Modal?.modal_action_h3}>{topic}</h3>
            <FormProvider {...formMethods}>
              <FormTemplate handleSubmit={handleSubmit(submit)}>
                <FormTextArea
                  title={"Please add comment"}
                  camelCase={"comments"}
                  placeholder={"enter reason"}
                  type="textbox"
                  className={Modal.input_modal}
                  rowsLines={"5"}
                  moreRegister={{
                    onChange: (e) => dispatch(addComment(e.target.value)),
                  }}
                />
                <div className={Modal.button_cage}>
                  <ActionButtons
                    disabled={watch("comments") === null ? true : false}
                    className={DashboardStyle?.button_cage_weight}
                  >
                    Yes, {kind === "approval" ? "Approve" : "Decline"}
                  </ActionButtons>
                  <SupportButtons
                    onClick={() => {
                      dispatch(
                        approvalAndDecline({
                          state: false,
                        })
                      );
                      reset();
                    }}
                    className={Modal?.button_cage_weight_without_border}
                  >
                    No, Cancel
                  </SupportButtons>
                </div>
              </FormTemplate>
            </FormProvider>
          </div>
        </AppModalTemplate>
      )}
    </>
  );
}

export function ExperiApproveModals({ declineAction, approvalAction, isOpen }) {
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit, watch, reset } = formMethods;

  const dispatch = useDispatch();

  const { state, topic, kind } = useSelector((x) => x?.global);
  // console.log({ data });

  const submit = (data) => {
    console.log("clicked");
  };

  return (
    <>
      {/* {state === true && ( */}
      <AppModalTemplate
        padding={"1.75rem"}
        isOpen={isOpen}
        closeFunction={() => {
          dispatch(
            approvalAndDecline({
              state: false,
              comments: "",
            })
          );
          reset();
        }}
      >
        <div>
          <img className={Modal?.modal_action_img} src={Action} alt="action" />
          <h3 className={Modal?.modal_action_h3}>{topic}</h3>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <FormTextArea
                title={"Please add comment"}
                camelCase={"comments"}
                placeholder={"enter reason"}
                type="textbox"
                className={Modal.input_modal}
                rowsLines={"5"}
                moreRegister={{
                  onChange: (e) => dispatch(addComment(e.target.value)),
                }}
              />
              <div className={Modal.button_cage}>
                <ActionButtons
                  disabled={watch("comments") === null ? true : false}
                  className={DashboardStyle?.button_cage_weight}
                >
                  Yes, {kind === "approval" ? "Approve" : "Decline"}
                </ActionButtons>
                <SupportButtons
                  onClick={() => {
                    dispatch(
                      approvalAndDecline({
                        state: false,
                      })
                    );
                    reset();
                  }}
                  className={Modal?.button_cage_weight_without_border}
                >
                  No, Cancel
                </SupportButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </AppModalTemplate>
      {/* )} */}
    </>
  );
}
