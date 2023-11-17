// import React from "react";
import Modal from "../../../../Components/Modals/modal.module.css";
import DashboardStyle from "../../../../Styles/Dashboard.module.css";
import Action from "../../../../Images/actions.svg";
import { useParams, useSearchParams } from "react-router-dom";
import { AppModalTemplate } from "../../../../Components/Modals/Modals";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormTemplate,
  FormTextArea,
} from "../../../../Components/Forms/InputTemplate";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
// import {
//   ApproveProcRequsition,
//   DeclineProcRequsition,
//   GetSingleProcDeliverys,
// } from "../../../../../../utils/redux/Procurement/ProcurementSlice";

export function DeliveryModals({
  declineAction,
  approvalAction,
  isOpen,
  closeModal,
  type,
}) {
  let modalContent = "";

  switch (type) {
    case "approve":
      modalContent = <ApproveDelivery closeModal={closeModal} />;
      break;

    case "decline":
      modalContent = <DeclineDelivery closeModal={closeModal} />;
      break;

    case "confirm":
      modalContent = <ConfirmDelivery closeModal={closeModal} />;
      break;

    default:
      modalContent = "";
      break;
  }

  return (
    <>
      {isOpen && (
        <AppModalTemplate
          padding={"1.75rem"}
          isOpen={true}
          width={"340px"}
          closeFunction={() => closeModal()}
        >
          {modalContent}
        </AppModalTemplate>
      )}
      {/* )} */}
    </>
  );
}

function ApproveDelivery({
  declineAction,
  approvalAction,
  isOpen,
  closeModal,
}) {
  const { id } = useParams();
  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const { isLoading } = useSelector((x) => x?.procurement);
  const dispatch = useDispatch();
  // console.log({ data });

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const submit = ({ comments }) => {
    // dispatch(
    //   ApproveProcRequsition({
    //     comment: comments,
    //     procurementRequsitionId: +id,
    //     emailTrigger: true,
    //   })
    // )?.then((res) => {
    //   if (res?.payload?.successful === true) {
    //     closeModal();
    //     // dispatch(GetSingleProcDeliverys(id));
    //   }
    // });
  };

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>Approve Delivery?</h3>
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

function DeclineDelivery({ closeModal }) {
  const { id } = useParams();
  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const { isLoading } = useSelector((x) => x?.procurement);
  const dispatch = useDispatch();
  // console.log({ data });

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const submit = ({ comments }) => {
    // dispatch(
    //   DeclineProcRequsition({
    //     comment: comments,
    //     procurementRequsitionId: +id,
    //     emailTrigger: true,
    //   })
    // )?.then((res) => {
    //   if (res?.payload?.successful === true) {
    //     closeModal();
    //     dispatch(GetSingleProcDeliverys(id));
    //   }
    // });
  };

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>Decline Delivery?</h3>
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

function ConfirmDelivery({ closeModal }) {
  const { id } = useParams();
  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const { isLoading } = useSelector((x) => x?.procurement);
  const dispatch = useDispatch();
  // console.log({ data });

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const submit = ({ comments }) => {
    // dispatch(
    //   DeclineProcRequsition({
    //     comment: comments,
    //     procurementRequsitionId: +id,
    //     emailTrigger: true,
    //   })
    // )?.then((res) => {
    //   if (res?.payload?.successful === true) {
    //     closeModal();
    //     dispatch(GetSingleProcDeliverys(id));
    //   }
    // });
  };

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>Confirm Delivery?</h3>
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
              >
                {isLoading === true ? "Please, wait" : "Yes, Confirm"}
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
