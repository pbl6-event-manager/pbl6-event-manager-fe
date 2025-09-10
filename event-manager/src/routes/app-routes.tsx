import { useRoutes } from "react-router-dom";
import adminRoutes from "./Admin/admin-routes";
import publicRoutes from "./Public/public-routes";

export default function AppRoutes() {
  const routes = [
    publicRoutes,
    adminRoutes,
  ];

  return useRoutes(routes);
}
