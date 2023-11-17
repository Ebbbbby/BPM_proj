import React, { useEffect } from "react";
import Layout from "./Layout.module.css";
import { sidebar } from "../Sidebar/sidebarUrls";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { GetCurrentUserPermissions } from "../../../../utils/redux/Permission/PermissionSlice";
import { useDispatch } from "react-redux";

function RouteLayout({ children, style, className }) {
  const l = useLocation()?.pathname;
  const parent = l?.split("/")?.[2];
  const sub = l?.split("/")?.[3];
  const yp = sidebar()?.find((x) => x?.iconLink === parent);
  const mp = yp?.subLinks?.find((x) => x?.subUrl?.split("/")[1] === sub);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCurrentUserPermissions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yp]);
  return (
    <div className={Layout.Route_Layout}>
      <div className={Layout.Route_Layout_Nav}>
        Dashboard{" "}
        {yp?.iconTag && <NavLink to={yp?.iconLink}>/ {yp?.iconTag}</NavLink>}
        {mp?.sublink && <NavLink to={mp?.subUrl}>/ {mp?.sublink}</NavLink>}
      </div>
      <div
        style={{ ...style }}
        className={`${Layout.Route_Layout_Body} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default RouteLayout;
