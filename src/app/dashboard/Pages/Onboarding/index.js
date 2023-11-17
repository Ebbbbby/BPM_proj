import React, { useEffect, useState } from "react";
import on from "./Style/onboarding.module.css";
import OnboardingTemplate from "./OnboardingTemplate";
import Continue from "./continue";
import { GetLocalStorage } from "../../../../utils/functions/GetLocalStorage";
import { useDispatch } from "react-redux";
import { GetSingleVendor } from "../../../../utils/redux/Vendor/VendorSlice";

function Onboarding() {
  const [continueSteps, setContinue] = useState(true);
  const { emailAddress } = GetLocalStorage();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSingleVendor({ emailAddress }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={on.onboardingx}>
      {continueSteps ? (
        <Continue changeSteps={(e) => setContinue(e)} />
      ) : (
        <OnboardingTemplate />
      )}
    </div>
  );
}

export default Onboarding;
