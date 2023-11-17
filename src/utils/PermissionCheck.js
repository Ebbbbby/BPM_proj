import {getMyPermissions} from "./functions/GetMyPermissions";

export default function PermissionCheck  ({permission, children, reason}) {
  return getMyPermissions().includes(permission) ? children : <>{reason}</>;
}