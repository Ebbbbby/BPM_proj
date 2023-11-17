import jwtDecode from "jwt-decode";

export const GetLocalStorage = (params) => {
  const value = JSON.parse(localStorage.getItem(params || "user"));
  if (value) return value;
  return;
};

export const GetUserId = (params) => {
  const userData = GetLocalStorage();
  const user = jwtDecode(params || userData?.userToken);
  return user;
};

export const UpdateLocalStorage = (name, key, value) => {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? JSON.parse(existing) : {};

  // Add new data to localStorage Array
  existing[key] = value;

  // Save back to localStorage
  localStorage.setItem(name, JSON.stringify(existing));
};
