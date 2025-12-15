import type { RouteObject } from "react-router-dom";
import AdminLayout from "../../layouts/Admin/admin-layout";
import AdminUsers from "../../views/Admin/user/page/admin-list-account";
import CreateAccountView from "../../views/Admin/user/page/admin-create-account-form";
import UpdateAccountView from "../../views/Admin/user/page/admin-update-account";
import UserDetail from "../../views/Admin/user/page/admin-view-account-details";
import AdminEvents from "../../views/Admin/event/page/admin-list-events";
//import CreateEventView from "../../views/Admin/admin-create-event-form";
import CategoryManagementView from "../../views/Admin/category/page/admin-list-category";
import PrivateRoute from "../private-routes";
import AdminEventDetailPage from "../../views/Admin/event/page/admin-view-event-details";
import PermissionManagememtView from "../../views/Admin/permission/page/admin-list-permission";
import AdminDashboard from "../../views/Admin/dashboard/page/admin-dashboard";
import RequireRole from "../require-role";

const adminRoutes: RouteObject = {
  path: "/admin",
  element: (
    <RequireRole role="admin">
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    </RequireRole>
  ),
  children: [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "users", element: <AdminUsers /> },
    { path: "users/create", element: <CreateAccountView /> },
    { path: "users/edit", element: <UpdateAccountView /> },
    { path: "users/details", element: <UserDetail /> },
    { path: "events", element: <AdminEvents /> },
    { path: "events/details", element: <AdminEventDetailPage /> },
    { path: "categories", element: <CategoryManagementView /> },
    { path: "permissions", element: <PermissionManagememtView /> },
  ],
};

export default adminRoutes;
