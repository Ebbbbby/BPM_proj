import React from "react";
import { Outlet, Route, useNavigate } from "react-router";
import RouteLayout from "../../../Components/Layout/RouteLayout";

function VendorMgt() {
  return (
    <RouteLayout>
      <Outlet />
    </RouteLayout>
  );
}

export default VendorMgt;
