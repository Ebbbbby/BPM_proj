import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../utils/routes";
import AuthLayout from "./components/layout/AuthLayout";
import input from "./components/styles/input.module.css";
import { HiChevronRight, HiOutlineKey, HiOutlineUser } from "react-icons/hi";

function Home() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className={input.auth_welcome}>
        <div className={`${input.auth_form} ${input.auth_form_start}`}>
          <h2 className={input.auth_h2}>GO SMART,</h2>
          <h2 className={input.auth_h2}>GO PAPERLESS</h2>
          <p className={input.auth_support_text}>
            Easily access your documents online anytime, almost anywhere.
          </p>

          <div>
            <button
              onClick={() => navigate(URL.Login)}
              className={input.auth_action_nav}
            >
              <HiOutlineKey className={input.auth_action_icons} />
              <div>
                <h5>Already have an account?</h5>
                <p>Login as a registered vendor</p>
              </div>
              <HiChevronRight className={input.auth_action_icons} />
            </button>
            <button
              onClick={() => navigate(URL.SignUp)}
              className={input.auth_action_nav}
            >
              <HiOutlineUser className={input.auth_action_icons} />
              <div>
                <h5>Don’t have an account?</h5>
                <p>Register as a new vendor</p>
              </div>
              <HiChevronRight className={input.auth_action_icons} />
            </button>
          </div>
        </div>
        {/* <h2>
          <Link to={URL.Login}>Login</Link>
          <Link to={URL.Login}>Sign Up</Link>
          <Link to={URL.Email_Verified}>Email Verified</Link>
        </h2> */}
      </div>
    </AuthLayout>
  );
}

export default Home;
