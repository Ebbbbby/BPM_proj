import React from "react";
import Modal from "../../../Components/Modals/modal.module.css";
import DashboardStyle from "../../../Styles/Dashboard.module.css";
// import { AppModalTemplate } from "./Modals";
import Action from "../../../Images/actions.svg";
// import { FormTemplate, FormTextArea } from "../Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
// import {
//   ActionButtons,
//   SupportButtons,
// } from "../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  FormTemplate,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import { useSearchParams } from "react-router-dom";
import { ApproveModals } from "../../../Components/Modals/ApproveDeclineModals";
import {
  ApproveVendorAction,
  DeclineVendorAction,
  SuspendVendorAction,
} from "../../../../../utils/redux/Vendor/VendorSlice";
// import {
//   addComment,
//   approvalAndDecline,
// } from "../../../../utils/redux/Global/GlobalSlice";

export function VendorModals({
  declineAction,
  approvalAction,
  isOpen,
  closeModal,
}) {
  const [params, setParams] = useSearchParams();
  const modalType = params.get("action");

  let modalContent = "";

  switch (modalType) {
    case "approve":
      modalContent = <ApproveVendor closeModal={closeModal} />;
      break;

    case "suspend":
      modalContent = <SuspendVendor closeModal={closeModal} />;
      break;

    case "decline":
      modalContent = <DeclineVendor closeModal={closeModal} />;
      break;

    case "blacklist":
      modalContent = <BlackListVendor closeModal={closeModal} />;
      break;

    default:
      modalContent = "";
      break;
  }

  return (
    <>
      <AppModalTemplate
        padding={"1.75rem"}
        isOpen={true}
        width={"340px"}
        closeFunction={() => closeModal()}
      >
        {modalContent}
      </AppModalTemplate>
      {/* )} */}
    </>
  );
}

function SuspendVendor({ declineAction, approvalAction, isOpen, closeModal }) {
  const formMethods = useForm({
    mode: "all",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const { isLoading } = useSelector((x) => x?.vendor);
  const dispatch = useDispatch();
  // console.log({ data });

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const submit = ({ comments }) => {
    dispatch(
      SuspendVendorAction({
        comment: comments,
        requestId: params.get("identity"),
        emailTrigger: true,
      })
    )?.then((res) => res?.payload?.successful === true && closeModal());
  };

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>Suspend Account?</h3>
        <hr className={Modal?.modal_action_hr} />
        <FormProvider {...formMethods}>
          <FormTemplate handleSubmit={handleSubmit(submit)}>
            <FormTextArea
              title={"Comment"}
              camelCase={"comments"}
              placeholder={"Please enter comment"}
              type="textbox"
              className={Modal.input_modal}
              rowsLines={"5"}
            />
            <div className={Modal.button_cage}>
              <ActionButtons
                disabled={!isValid}
                className={DashboardStyle?.button_cage_weight}
                bg="#E61B00"
              >
                {isLoading === true ? "Please, wait..." : "Yes, Suspend"}
              </ActionButtons>
              <SupportButtons
                onClick={() => closeModal()}
                className={Modal?.button_cage_weight_without_border}
              >
                No, Cancel
              </SupportButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      </div>
    </>
  );
}

function ApproveVendor({ declineAction, approvalAction, isOpen, closeModal }) {
  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const { isLoading } = useSelector((x) => x?.vendor);
  const dispatch = useDispatch();
  // console.log({ data });

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const submit = ({ comments }) => {
    dispatch(
      ApproveVendorAction({
        comment: comments,
        requestId: params.get("identity"),
        emailTrigger: true,
      })
    )?.then((res) => res?.payload?.successful === true && closeModal());
  };

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>Approve Account?</h3>
        <hr className={Modal?.modal_action_hr} />
        <FormProvider {...formMethods}>
          <FormTemplate handleSubmit={handleSubmit(submit)}>
            <FormTextArea
              title={"Comment"}
              camelCase={"comments"}
              placeholder={"Please enter comment"}
              type="textbox"
              className={Modal.input_modal}
              rowsLines={"5"}
            />
            <div className={Modal.button_cage}>
              <ActionButtons
                disabled={!isValid}
                className={DashboardStyle?.button_cage_weight}
                bg=""
              >
                {isLoading === true ? "Please wait..." : "Yes, Approve"}
              </ActionButtons>
              <SupportButtons
                onClick={() => closeModal()}
                className={Modal?.button_cage_weight_without_border}
              >
                No, Cancel
              </SupportButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      </div>
    </>
  );
}

function DeclineVendor({ closeModal }) {
  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = formMethods;

  const { isLoading } = useSelector((x) => x?.vendor);
  const dispatch = useDispatch();
  // console.log({ data });

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const submit = ({ comments }) => {
    dispatch(
      DeclineVendorAction({
        comment: comments,
        requestId: params.get("identity"),
        emailTrigger: true,
      })
    )?.then((res) => res?.payload?.successful === true && closeModal());
  };

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>Decline Account?</h3>
        <hr className={Modal?.modal_action_hr} />
        <FormProvider {...formMethods}>
          <FormTemplate handleSubmit={handleSubmit(submit)}>
            <FormTextArea
              title={"Comment"}
              camelCase={"comments"}
              placeholder={"Please enter comment"}
              type="textbox"
              className={Modal.input_modal}
              rowsLines={"5"}
            />
            <div className={Modal.button_cage}>
              <ActionButtons
                disabled={!isValid}
                className={DashboardStyle?.button_cage_weight}
                bg="#E61B00"
              >
                {isLoading === true ? "Please, wait" : "Yes, Decline"}
              </ActionButtons>
              <SupportButtons
                onClick={() => closeModal()}
                className={Modal?.button_cage_weight_without_border}
              >
                No, Cancel
              </SupportButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      </div>
    </>
  );
}

function BlackListVendor({ closeModal }) {
  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const { isLoading } = useSelector((x) => x?.vendor);
  const dispatch = useDispatch();
  // console.log({ data });

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const submit = ({ comments }) => {
    dispatch(
      SuspendVendorAction({
        comment: comments,
        requestId: params.get("identity"),
        emailTrigger: true,
      })
    )?.then((res) => res?.payload?.successful === true && closeModal());
  };

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>Blacklist Account?</h3>
        <hr className={Modal?.modal_action_hr} />
        <FormProvider {...formMethods}>
          <FormTemplate handleSubmit={handleSubmit(submit)}>
            <FormTextArea
              title={"Comment"}
              camelCase={"comments"}
              placeholder={"Please enter comment"}
              type="textbox"
              className={Modal.input_modal}
              rowsLines={"5"}
            />
            <div className={Modal.button_cage}>
              <ActionButtons
                disabled={!isValid}
                className={DashboardStyle?.button_cage_weight}
                bg="#E61B00"
              >
                Yes, Blacklist
              </ActionButtons>
              <SupportButtons
                onClick={() => closeModal()}
                className={Modal?.button_cage_weight_without_border}
              >
                No, Cancel
              </SupportButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      </div>
    </>
  );
}
