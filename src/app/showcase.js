import React from "react";
import {
  ActionButtons,
  BackButtons,
  CTAButtons,
  SupportButtons,
} from "./global/components/Buttons/buttons";
import {
  FormInput,
  FormInputPassword,
} from "./global/components/FormComponents/input";
import { SearchFilter } from "./dashboard/Components/Search/Search";

function Showcase() {
  return (
    <div style={{ padding: "1.5rem" }}>
      Component Showcase Buttons
      <FormInput />
      <FormInput />
      <FormInputPassword />
      <ActionButtons>Continue</ActionButtons>
      <SupportButtons>Save as Draft</SupportButtons>
      <CTAButtons>Add Feature</CTAButtons>
      <BackButtons />
      <SearchFilter />
    </div>
  );
}

export default Showcase;
