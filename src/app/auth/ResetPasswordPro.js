import React, { useState } from "react";
import AuthLayout from "./components/layout/AuthLayout";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
import ResetPasswordSuccess from "./ResetPassword/ResetPasswordSuccess";

function SignUp() {
  const [success, setSuccess] = useState(false);
  return (
    <AuthLayout isLogin={true}>
      {success ? (
        <ResetPasswordSuccess success={success} setSuccess={setSuccess} />
      ) : (
        <ResetPasswordForm success={success} setSuccess={setSuccess} />
      )}
    </AuthLayout>
  );
}

export default SignUp;
