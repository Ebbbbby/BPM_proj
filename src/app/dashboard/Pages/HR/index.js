import React from "react";
import RouteLayout from "../../Components/Layout/RouteLayout";
import { Outlet } from "react-router";

function HR() {
  return (
    <RouteLayout title={"HR Services / HR Dashboard"}>
      <Outlet />
    </RouteLayout>
  );
}

export default HR;