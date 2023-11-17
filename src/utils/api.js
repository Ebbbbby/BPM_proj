import axios from "axios";
import { GetLocalStorage } from "./functions/GetLocalStorage";
import { errors } from "./redux/errors";
import Logout from "./functions/LogoutFunction";
import { toast } from "react-toastify";

export const api = (service, contentType) => {
  const data = GetLocalStorage();
  const apix = axios.create({
    baseURL: service,
    headers: {
      "Content-Type": contentType || "application/json",
      Authorization: `Bearer ${data?.userToken}`,
    },
  });

  apix?.interceptors?.request?.use(
    async (res) => {
      // console.log(res);
      return res;
    },
    (error) => {}
  );

  apix?.interceptors?.response?.use(
    async (res) => {
      if (!res) return console.log("loading...");

      return res;
    },
    (error) => {
      // console.log(error);
      if (error?.response?.status !== 401) {
        if (error?.response?.data?.statusMessage) {
          toast.error(
            error?.response?.data?.statusMessage || "An error occured!"
          );
          return error?.response;
        } else {
          errors(error);
          return error?.response;
        }
      } else {
        Logout();
        return error?.response;
      }
    }
  );

  return apix;
};
