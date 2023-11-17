import React, { useState } from "react";
import AuthLayout from "./components/layout/AuthLayout";
import ForgotPasswordForm from "./ForgotPassword/ForgotPasswordForm";
import ForgotPasswordSuccess from "./ForgotPassword/ForgotPasswordSuccess";
// import SignUpSuccess from "./SignUp/SignSuccess";

function SignUp() {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <AuthLayout isLogin={true}>
      {success ? (
        <ForgotPasswordSuccess
          email={email}
          success={success}
          setSuccess={setSuccess}
        />
      ) : (
        <ForgotPasswordForm
          setEmail={setEmail}
          success={success}
          setSuccess={setSuccess}
        />
      )}

      {/* <SignUpSuccess /> */}
    </AuthLayout>
  );
}

export default SignUp;
