import React from "react";
import RouteLayout from "../../Components/Layout/RouteLayout";
import { Outlet } from "react-router";

function Fleet() {
  return (
    <RouteLayout title={"Fleets Management / Fleet Dashboard"}>
      <Outlet />
    </RouteLayout>
  );
}

export default Fleet;