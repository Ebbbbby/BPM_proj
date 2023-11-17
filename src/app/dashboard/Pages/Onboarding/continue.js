import React from "react";
import on from "./Style/onboarding.module.css";
import { ActionButtons } from "../../../global/components/Buttons/buttons";
import { useSelector } from "react-redux";

function Continue(props) {
  const { changeSteps } = props;
  const { isLoadingVendors } = useSelector((state) => state?.vendor);

  return (
    <div className={on.continue}>
      <h2>
        Great, <br /> let’s keep it going{" "}
      </h2>
      <p>
        Before we can open your account, we need to learn more about you and
        your company.
      </p>
      <div className={on.progress_track}>
        <div className={on.progress_bar}></div>
        <p className={on.progress_value}>21%</p>
      </div>
      <p className={on.cta}>Your progress is automatically saved!</p>
      <ActionButtons
        isLoading={isLoadingVendors}
        onClick={() => changeSteps(false)}
        className={on.button}
        disabled={isLoadingVendors}
      >
        Continue
      </ActionButtons>
    </div>
  );
}

export default Continue;
