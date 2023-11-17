import React, { useContext, useState } from "react";
import Modal from '../../../../Components/Modals/modal.module.css'
import DashboardStyle from '../../../../Styles/Dashboard.module.css'
import Action from "../../../../Images/actions.svg"
import { FormProvider, useForm } from "react-hook-form";
import { ActionButtons, SupportButtons } from "../../../../../global/components/Buttons/buttons";
import {AppModalTemplate} from '../../../../Components/Modals/Modals'
import { FormTemplate } from "../../../../Components/Forms/InputTemplate";
import { FormTextArea } from "../../../../Components/Forms/InputTemplate";
import { useSearchParams } from "react-router-dom";
import {ModalContext} from '../../../../../../utils/contexts/Modals/ModalContext'

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
       
      </AppModalTemplate>
     
    </>
  );
}

export function useApprovals({ declineAction, approvalAction, isLoading }) {
  const [modalType, setModalType] = useState("approve");
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState({});

  const { openModal, closeModal } = useContext(ModalContext);

  // const openModal = ({ type, details }) => {
  //   setModalType(type);
  //   setIsOpen(true);
  //   setDetails(details);
  // };

  // const Modal = () => <ModalOps />;

  return {
    modalType,
    Modal,
    isOpen,
    setIsOpen,
    openModal,
    closeModal,
  };
}


