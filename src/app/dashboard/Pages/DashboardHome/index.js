import React, { useEffect } from "react";
import RouteLayout from "../../Components/Layout/RouteLayout";
import DashboardHome from "./Dashboard_Home";
import DBStyle from "./Dashboard_Home/Style/DBHome.module.css";
import { GetLocalStorage } from "../../../../utils/functions/GetLocalStorage";
import { useNavigate } from "react-router";
import { URL } from "../../../../utils/routes";

function Dashboard() {
  const data = GetLocalStorage?.();
  const navigate = useNavigate();


  useEffect(() => {
    if (data?.isOnboarded === false) {
      navigate(`../${URL.Onboarding}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.isOnboarded]);

  if (data?.isOnboarded === false) {
    return <>Redirecting...</>;
  }
  return (
    <RouteLayout
      style={{ backgroundColor: "#fff", padding: "1rem" }}
      className={DBStyle.DBHome}
    >
      <DashboardHome />
    </RouteLayout>
  );
}

export default Dashboard;
