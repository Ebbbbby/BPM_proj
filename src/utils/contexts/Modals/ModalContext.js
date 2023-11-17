import React, { createContext, useState } from "react";

const initialState = {
  step: 1,
};

export const ModalContext = createContext(initialState);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [modalType, setModalType] = useState("");
  const openModal = ({ type, details }) => {
    setIsOpen(true);
    setDetails(details);
    setModalType(type);
  };

  const closeModal = () => {
    setIsOpen(false);

    setDetails({});
    setModalType("");
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        isOpen,
        closeModal,
        details,
        type: modalType,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
