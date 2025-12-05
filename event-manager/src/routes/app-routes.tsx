import { Navigate, useRoutes } from "react-router-dom";
import adminRoutes from "./Admin/admin-routes";
import publicRoutes from "./Public/public-routes";
import organizerRoutes from "./Organizer/organizer-route";

export default function AppRoutes() {
  const routes = [
    {
      path: "/",
      element: <Navigate to="/login" replace />
    },
    publicRoutes,
    adminRoutes,
    organizerRoutes
  ];

  return useRoutes(routes);
}
