import React from "react";
import RouteLayout from "../../Components/Layout/RouteLayout";
import { Outlet } from "react-router";

function Employee() {
  return (
    <RouteLayout title={"Employee Management / Employee Dashboard"}>
      <Outlet />
    </RouteLayout>
  );
}

export default Employee;