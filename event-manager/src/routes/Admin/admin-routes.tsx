import type { RouteObject } from "react-router-dom";
import AdminLayout from "../../layouts/Admin/admin-layout";
import AdminUsers from "../../views/Admin/admin-list-account";
import CreateAccountView from "../../views/Admin/admin-create-account-form";
import UpdateAccountView from "../../views/Admin/admin-update-account";

const adminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "users", element: <AdminUsers /> },
    { path: "users/create", element: <CreateAccountView /> },
    { path: "users/edit", element: <UpdateAccountView /> },
  ],
};

export default adminRoutes;
