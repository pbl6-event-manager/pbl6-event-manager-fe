import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

type RequireRoleProps = {
  role: string | string[];
  children: React.ReactElement;
};

const getUserRole = (state: RootState) => {
  const roles = (state as any)?.authReducer?.user?.roles;
  if (Array.isArray(roles) && roles.length > 0) return roles[0]?.name ?? null;
  return (localStorage.getItem("role") as string) ?? null;
};

const RequireRole: React.FC<RequireRoleProps> = ({ role, children }) => {
  const location = useLocation();
  const userRole = useSelector(getUserRole) as string | null;

  const allowed = Array.isArray(role) ? (userRole != null && role.includes(userRole)) : userRole === role;

  if (allowed) return children;

  if (userRole === "admin") {
    return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
  } else if (userRole === "user") {
    return <Navigate to="/organizer/events/all" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireRole;