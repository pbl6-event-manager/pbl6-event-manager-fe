import type { RouteObject } from "react-router-dom";
import AdminLayout from "../../layouts/Admin/admin-layout";
import AdminUsers from "../../views/Admin/admin-list-account";
import CreateAccountView from "../../views/Admin/admin-create-account-form";
import UpdateAccountView from "../../views/Admin/admin-update-account";
import UserDetail from "../../views/Admin/admin-view-account-details";
import AdminEvents from "../../views/Admin/admin-list-events";

const adminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "users", element: <AdminUsers /> },
    { path: "users/create", element: <CreateAccountView /> },
    { path: "users/edit", element: <UpdateAccountView /> },
    { path: "users/details", element: <UserDetail /> },
    { path: "events", element: <AdminEvents /> },
  ],
};

export default adminRoutes;
