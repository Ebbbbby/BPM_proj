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
  FormInput,
  FormTemplate,
  FormTextArea,
  SlideCheckBox,
} from "../../../Components/Forms/InputTemplate";
import { useSearchParams } from "react-router-dom";
import { ModalContext } from "../../../../../utils/contexts/Modals/ModalContext";
import { useSelector } from "react-redux";
import { Regrex } from "../../../../../utils/functions/Regex";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import Style from "../../../Components/Modals/Style/modalStyle.module.css";

export function ModalOps(props) {
  const { isOpen, closeModal, details, setDetails, type } =
    useContext(ModalContext);

  return (
    <>
      <AppModalTemplate
        padding={"1.75rem"}
        isOpen={isOpen}
        width={"340px"}
        closeFunction={() => closeModal()}
        zIndex={999}
      >
        <SuspendVendorTest
          closeModal={() => closeModal()}
          details={details}
          setDetails={setDetails}
          type={type}
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

function SuspendVendorTest({ closeModal, details, type }) {
  const {
    global,
    assets,
    vendor,
    procurement,
    assetSetUp,
    consumable,
    consummableSetUp,
    fleet,
    fluelRequest,
    report,
  } = useSelector((state) => state);

  const isLoading =
    assets?.isLoading ||
    assets?.isLoading ||
    vendor?.isLoading ||
    global?.isLoading ||
    procurement.isLoading ||
    assetSetUp?.isLoading ||
    consumable?.isLoading ||
    fleet?.isLoading ||
    consummableSetUp?.isLoading ||
    fluelRequest?.isLoading ||
    report?.isLoading;

  const formMethods = useForm({
    mode: "all",
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = formMethods;

  const view_date = () => {
    const today = new Date();
    if (watch("numOfDays")) {
      const date = FormatDateTime(
        new Date(today.setDate(today.getDate() + +watch("numOfDays")))
      );
      return `Suspend Till: ${date}`;
    }

    return "";
  };

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const {
    submitData,
    button,
    title,
    isDelete,
    isDeleteSupport,
    isOther,
    isOtherSupport,
    sendIsOptional,
    commentIsOptional,
    isRating,
    isRatingSupport,
    isProcessingStages,
  } = details;

  const submit = (data) => {
    submitData(data);
  };

  if (isProcessingStages === true) {
    return (
      <div className={Style.processing_stages}>
        <h3 className={Modal?.modal_action_h3}>Processing Stages</h3>
        <div>
          <p>
            Status: <span>Processing</span>
          </p>
          <p>
            Levels of Approval: <span>3</span>
          </p>
        </div>

        <div>
          <div>
            <p>Request Approval: (Approved)</p>
            <p>
              Approver: <span>Azeez Akeem</span>
            </p>
          </div>

          <div>
            <p>Request Approval: (Approved)</p>
            <p>
              Approver: <span>Azeez Akeem</span>
            </p>
          </div>

          <div>
            <p>Request Approval: (Approved)</p>
            <p>
              Approver: <span>Azeez Akeem</span>
            </p>
          </div>
        </div>

        <SupportButtons
          onClick={() => closeModal()}
          className={Modal?.button_cage_weight}
        >
          Close
        </SupportButtons>
      </div>
    );
  }

  if (isOther === true) {
    return (
      <>
        <div>
          <img className={Modal?.modal_action_img} src={Action} alt="action" />
          <h3 className={Modal?.modal_action_h3}>{title}</h3>
          <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
            {isOtherSupport}
          </p>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <div className={Modal.button_cage}>
                <SupportButtons
                  onClick={() => closeModal()}
                  className={Modal?.button_cage_weight_without_border}
                >
                  No, Close
                </SupportButtons>
                <ActionButtons
                  isLoading={isLoading}
                  disabled={!isValid}
                  className={DashboardStyle?.button_cage_weight}
                  bg={button.color === "red" ? "#E61B00" : ""}
                >
                  {button.name}
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </>
    );
  }

  if (isDelete === true) {
    return (
      <>
        <div>
          <img className={Modal?.modal_action_img} src={Action} alt="action" />
          <h3 className={Modal?.modal_action_h3}>{title}</h3>
          <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
            {isDeleteSupport}
          </p>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <div className={Modal.button_cage}>
                <SupportButtons
                  onClick={() => closeModal()}
                  className={Modal?.button_cage_weight_without_border}
                >
                  No, Close
                </SupportButtons>
                <ActionButtons
                  isLoading={isLoading}
                  disabled={!isValid}
                  className={DashboardStyle?.button_cage_weight}
                  bg={button.color === "red" ? "#E61B00" : ""}
                >
                  {button.name}
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </>
    );
  }

  if (isRating === true) {
    return (
      <>
        <div>
          <img className={Modal?.modal_action_img} src={Action} alt="action" />
          <h3 className={Modal?.modal_action_h3}>{title}</h3>

          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              {isRatingSupport}
              <div className={Modal.button_cage}>
                <SupportButtons
                  onClick={() => closeModal()}
                  className={Modal?.button_cage_weight_without_border}
                >
                  No, Cancel
                </SupportButtons>
                <ActionButtons
                  isLoading={isLoading}
                  disabled={!isValid}
                  className={DashboardStyle?.button_cage_weight}
                  bg={button.color === "red" ? "#E61B00" : ""}
                >
                  {button.name}
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>{title}</h3>
        <hr className={Modal?.modal_action_hr} />
        <FormProvider {...formMethods}>
          <FormTemplate handleSubmit={handleSubmit(submit)}>
            {type === "vendor_suspend" && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "0.8rem",
                    justifyContent: "center",
                  }}
                >
                  <FormInput
                    style={{ width: "100%" }}
                    title={"Number of Days"}
                    camelCase={"numOfDays"}
                    placeholder={"Enter Number of Days"}
                    // isOptional={true}
                    registerOptions={{
                      pattern: {
                        value: Regrex.numbers,
                        message: "Enter a Duration",
                      },
                    }}
                  />
                </div>
                <small>{`${view_date()}`}</small>
                <hr
                  style={{ marginTop: "0.35rem" }}
                  className={Modal?.modal_action_hr}
                />
              </>
            )}
            <FormTextArea
              title={"Comment"}
              camelCase={"comments"}
              placeholder={"Please enter comment"}
              type="textbox"
              className={Modal.input_modal}
              rowsLines={"5"}
              isOptional={commentIsOptional}
            />
            {sendIsOptional !== true && (
              <SendMail name={"Send notification to vendor"} />
            )}

            <div className={Modal.button_cage}>
              <ActionButtons
                isLoading={isLoading}
                disabled={!isValid}
                className={DashboardStyle?.button_cage_weight}
                bg={button.color === "red" ? "#E61B00" : ""}
              >
                {button.name}
              </ActionButtons>
              <SupportButtons
                onClick={() => closeModal()}
                className={Modal?.button_cage_weight_without_border}
              >
                No, Close
              </SupportButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      </div>
    </>
  );
}

export function SendMail({ name }) {
  return (
    <SlideCheckBox
      style={{
        margin: "1rem 0 0.75rem 0",
      }}
      isOptional={false}
      camelCase={"send"}
      name={name}
    />
  );
}
