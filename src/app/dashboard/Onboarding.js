import React, { useEffect } from "react";
import Header from "./Components/Header";
import DashboardStyle from "./Styles/Dashboard.module.css";
import Onboarding from "./Pages/Onboarding";
import { GetLocalStorage } from "../../utils/functions/GetLocalStorage";
import { useNavigate } from "react-router";
import { URL } from "../../utils/routes";

function Dashboard() {
  const data = GetLocalStorage?.();
  const navigate = useNavigate();


  useEffect(() => {
    if (data?.isOnboarded === true) {
      navigate(URL.Dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.isOnboarded]);

  if (data?.isOnboarded === true) {
    return <>Redirecting...</>;
  }
  return (
    <div className={DashboardStyle.dashboard_main_remodel}>
      <Header className={DashboardStyle.dashboard_header} />
      <Onboarding />
    </div>
  );
}

export default Dashboard;
