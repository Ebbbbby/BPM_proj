import React from "react";
import { useParams } from "react-router";
import ViewVendorAppraisal from "./ViewVendorAppraisal";
import CreateVendorAppraisal from "./CreateVendorAppraisal";

function AddVendor() {
  const { type } = useParams();

  if (type === "view") {
    return <ViewVendorAppraisal />;
  }
  return <CreateVendorAppraisal />;
}

export default AddVendor;
