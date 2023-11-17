import React, { useState, Suspense } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import DashboardStyle from "./Styles/Dashboard.module.css";
import { Outlet } from "react-router";
import PageLoader from "./Components/Loader/Loader";
import { useApprovals } from "./Pages/Vendors/VendorApprovals/useApprovals";

function Dashboard() {
    const [showSidebar, setShowSidebar] = useState(true)

    const toggleSidebar = ()=>setShowSidebar(!showSidebar);

  return (
    <div className={DashboardStyle.dashboard_main}>
      <Header className={DashboardStyle.dashboard_header} toggleSideNav={toggleSidebar} />
      <Sidebar showSidebar={showSidebar} className={`${DashboardStyle.dashboard_sidebar} ${showSidebar ? DashboardStyle.dashboard_sidebar_show : ''}` } />
      <Suspense fallback={<PageLoader />}>
        <div className={DashboardStyle.dashboard_body}>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
}

export default Dashboard;
