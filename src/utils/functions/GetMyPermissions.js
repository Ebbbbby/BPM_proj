import { useState } from "react";
import { GetCurrentUserPermission } from "../redux/Permission/PermissionSlice";
import { GetLocalStorage } from "./GetLocalStorage";
import Logout from "./LogoutFunction";

export function getMyPermissions() {
  let perm = GetLocalStorage("x-u-perm");
  if (perm) return perm;
  return [];
}

export const usePermissions = () => {
  const [userPermissions, setUserPermissions] = useState(getMyPermissions());

  return { userPermissions, setUserPermissions };
};
