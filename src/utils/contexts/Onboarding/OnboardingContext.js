import React, { createContext, useState } from "react";

const initialState = {
  step: 1,
};

export const OnboardingContext = createContext(initialState);

export const OnboardingProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [vendorDocument, setVendorDocument] = useState([]);
  const [vendorData, setVendorData] = useState({});

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  function changeStep(data) {
    scrollToTop();
    setStep(data);
  }

  function addVendorDocument(data) {
    setVendorDocument(data);
  }


  function updateVendor(data){
    setVendorData(data)
  }

  return (
    <OnboardingContext.Provider
      value={{
        step: step,
        changeStep,
        addVendorDocument,
        vendorDocument,
        updateVendor,
        vendorData
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
