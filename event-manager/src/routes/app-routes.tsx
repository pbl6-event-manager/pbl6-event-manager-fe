import { useRoutes } from "react-router-dom";
import adminRoutes from "./Admin/admin-routes";
import publicRoutes from "./Public/public-routes";
import organizerRoutes from "./Organizer/organizer-route";

export default function AppRoutes() {
  const routes = [
    publicRoutes,
    adminRoutes,
    organizerRoutes
  ];

  return useRoutes(routes);
}
