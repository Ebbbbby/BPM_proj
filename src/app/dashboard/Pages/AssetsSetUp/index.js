import React from "react";
import RouteLayout from "../../Components/Layout/RouteLayout";
import { Outlet } from "react-router";

function Assets() {
  return (
    <RouteLayout title={"Assets Management / Asset Acquisition"}>
      <Outlet />
    </RouteLayout>
  );
}

export default Assets;
