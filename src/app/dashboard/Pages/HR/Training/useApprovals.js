import React, { useContext, useState } from "react";
import Modal from "../../../Components/Modals/modal.module.css";
import DashboardStyle from "../../../Styles/Dashboard.module.css";
import Action from "../../../Images/actions.svg";
import { FormProvider, useForm } from "react-hook-form";
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
import { ModalContext } from "../../../../../utils/contexts/Modals/ModalContext";
import { useSelector } from "react-redux";

export function ModalOps(props) {
  // const { isOpen, isLoading, details, setDetails, setIsOpen } = props;
  const { isOpen, closeModal, details, setDetails } = useContext(ModalContext);

  return (
    <>
      <AppModalTemplate
        padding={"1.75rem"}
        isOpen={isOpen}
        width={"340px"}
        closeFunction={() => closeModal()}
        zIndex={999}
      >
        <ReportApprovalModal
          closeModal={() => closeModal()}
          details={details}
          setDetails={setDetails}
        />
      </AppModalTemplate>
      {/* )} */}
    </>
  );
}

export function useApprovals() {
  const [isOpen, setIsOpen] = useState(false);

  const { openModal, closeModal } = useContext(ModalContext);

  return {
    Modal,
    isOpen,
    setIsOpen,
    openModal,
    closeModal,
  };
}

function ReportApprovalModal({ closeModal, details }) {
  const { global, fleet } = useSelector((state) => state);
  

  const isLoading =
    global?.isLoading ||
    fleet.isLoading;
  const formMethods = useForm({
    mode: "all",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const { submitData, button, title } = details;

  const submit = ({ send, comments }) => {
    submitData({
      comments,
      // send,
    });
  };

  console.log(submitData)

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>{title}</h3>
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
                bg={button.color === "red" ? "#E61B00" : ""}
              >
                {isLoading === true ? "Please, wait..." : `${button.name}`}
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