import React, { useState } from "react";
import AuthLayout from "./components/layout/AuthLayout";
import SignUpForm from "./SignUp/SignUpForm";
import SignUpSuccess from "./SignUp/SignSuccess";

function SignUp() {
  const [success, setSuccess] = useState(false);
  const [savedData, setSavedData] = useState();
  return (
    <AuthLayout>
      {!success ? (
        <SignUpForm
          savedData={savedData}
          setSavedData={setSavedData}
          success={success}
          setSuccess={setSuccess}
        />
      ) : (
        <SignUpSuccess
          savedData={savedData}
          setSavedData={setSavedData}
          success={success}
          setSuccess={setSuccess}
        />
      )}
    </AuthLayout>
  );
}

export default SignUp;
