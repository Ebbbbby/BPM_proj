import React from "react";
import Login from "./img/Login.svg";
import auth from "./style/AuthLayout.module.css";

function AuthLayout({ children, isLogin }) {
  return (
    <div className={auth.auth_home}>
      <div
        className={`${auth.auth_img} ${isLogin === true && auth.auth_img_pro}`}
      >
        <div className={auth.smart_bpms}>
          <h2>
            Business <span>Process</span>
          </h2>
          <h2>Management Platform</h2>
        </div>
        {isLogin === true && (
          <div className={auth.smart_name}>
            <h1>
              GO SMART, <br /> GO PAPERLESS
            </h1>
            <p>
              No more shuffling papers, downloading files and storing documents.
              Easily access your documents online anytime, almost anywhere.
            </p>
          </div>
        )}
        {isLogin === true && (
          <img src={Login} alt="login" className={auth.login_img} />
        )}
        <p className={auth.copyright}>© 2022 NLPC PFA.</p>
      </div>
      <div className={auth.children_holder}>
        {children}

        <p className={auth.project_name}>
          BPMP BUSINESS PROCESS MANAGEMENT PLATFORM - VERSION 1.0
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;
