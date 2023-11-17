import React from "react";
import RouteLayout from "../../Components/Layout/RouteLayout";
import { Outlet } from "react-router";

function Procurement() {
  return (
    <RouteLayout title={"Procurement/"}>
      <Outlet />
    </RouteLayout>
  );
}

export default Procurement;
