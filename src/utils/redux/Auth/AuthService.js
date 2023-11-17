import { api } from "../../api";

const auth = () => {
  const identityService = process.env.REACT_APP_BACKEND_IDENTITY_URL;
  const ind_api = api(identityService);

  return {
    Login: function (data) {
      return ind_api.post(`Auth/login`, data);
    },
    ForgotPassword: function (data) {
      return ind_api.post(`Auth/forgotpassword`, data);
    },
    ResetPassword: function (data) {
      const { email, code } = data;
      return ind_api.post(
        `Auth/password-reset/${email}&${code}?Email=${email}&Code=${code}`,
        data
      );
    },
    Signup: function (data) {
      return ind_api.post(`Auth/register`, data);
    },
    CreateInternalUser: function (data) {
      return ind_api.post(`/Auth/internaluser`, data);
    },
    ApproveInternalUser: function (data) {
      return ind_api.post(`/Auth/userapprove`, data);
    },
    DeclineInternalUser: function (data) {
      return ind_api.post(`/Auth/userdecline`, data);
    },
  };
};

export const AuthServices = {
  auth: auth,
};
