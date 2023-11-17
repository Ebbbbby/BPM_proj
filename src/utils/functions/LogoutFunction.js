import { URL } from "../routes";

function redirectUser(urlPath, timeout) {
  setTimeout(function () {
    return window.location.replace(urlPath);
  }, timeout);
}

export default function Logout() {
  localStorage?.removeItem("user");
  redirectUser(URL.Home, 1);
}
