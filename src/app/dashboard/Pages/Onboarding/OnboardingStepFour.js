import React, { useContext } from "react";
import on from "./Style/onboarding.module.css";
import DashboardStyle from "../../../dashboard/Styles/Dashboard.module.css";
import {
  ActionButtons,
} from "../../../global/components/Buttons/buttons";
import { FiChevronRight } from "react-icons/fi";
import { OnboardingContext } from "../../../../utils/contexts/Onboarding/OnboardingContext";
import { CancelButton } from "./OnboardingTemplate";

const NamePlateButton = ({ number, name, clickNumber }) => {
  const { changeStep } = useContext(OnboardingContext);
  return (
    <section
      className={`${DashboardStyle.form_section} ${on.form_section_step_four}`}
    >
      {/* <h4 className={DashboardStyle.form_section_title}></h4> */}

      <div className={on.inputs_group}>
        <p>
          <span>{number}</span>/04
        </p>

        <p>{name}</p>
      </div>
      <div onClick={() => changeStep(clickNumber)}>
        <FiChevronRight />
      </div>
    </section>
  );
};

function OnboardingStepFour() {
  return (
    <>
      <NamePlateButton name={"Company info"} number={"01"} clickNumber={1} />
      <NamePlateButton name={"Contact details"} number={"02"} clickNumber={2} />
      <NamePlateButton
        name={"Business documents"}
        number={"03"}
        clickNumber={3}
      />
      <div className={DashboardStyle.button_cage}>
        <CancelButton />
        <ActionButtons
          width={"auto"}
          className={DashboardStyle?.button_cage_weight}
        >
          Review and Submit
        </ActionButtons>
      </div>
    </>
  );
}

export default OnboardingStepFour;
