import moment from "moment";
import { useLocation } from "react-router";
export function redirectUser(urlPath, timeout) {
  setTimeout(function () {
    return window.location.replace(urlPath);
  }, timeout);
}

export const strongPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:])(?=.{8,})"
);

export const FormatDateTime = (value, isDate) => {
  const timeDate = moment(value).format(isDate || "LL");

  return !value ? "" : timeDate;
};

export const removeListData = ({ value, list, setList }) => {
  const v = list?.filter((data, index) => index !== value);
  setList(v);
  return;
};

export const generateFileURL = (file) => {
  if (typeof file === "object") {
    const v = URL?.createObjectURL?.(file);
    return v;
  }

  return null;
};

export const GetSearchParams = (url) => {
  const data = new URLSearchParams(window.location.search).get(url);
  return data;
};

export const GetBaseURL = (url) => {
  const location = useLocation();

  return location;
};

export const getDateFromISO = (date, returnTime) => {
  if (date === null) return "";
  let toUse = new Date(date),
    year = toUse.getFullYear(),
    month = toUse.getMonth() + 1,
    dt = toUse.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
}

export const getTimeFromISO = (date) =>{
  const time = new Date(date);
  return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

export const getNumberWithOrdinal = (n) => {
  if(!n || isNaN(n) ) return;
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
export function Refresh(timeout) {
  setTimeout(function () {
    return window.location.reload();
  }, timeout);
}

export const CreateQueryParams = (params) => {
  const queryString = Object.keys(params)
    .filter((key) => params[key])
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

  return `?${queryString}`;
};
