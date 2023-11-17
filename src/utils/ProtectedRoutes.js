import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { URL } from "./routes";
import { GetLocalStorage } from "./functions/GetLocalStorage";

const useAuth = () => {
  const data = GetLocalStorage?.();

  if (data?.userToken !== null) {
    return data;
  }
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  if (isAuth) return <Outlet />;
  return <Navigate to={URL.Home} />;
};

const OnboardedRoutes = () => {
  const isAuth = useAuth();

  return isAuth?.isOnboarded === true ? (
    <Outlet />
  ) : (
    <Navigate to={URL.Onboarding} />
  );
};

const LoggedInRoute = () => {
  const isAuth = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to={URL.Dashboard} />;
};

export { ProtectedRoutes, useAuth, LoggedInRoute, OnboardedRoutes };
