import type { RouteObject } from "react-router-dom";
import AdminLayout from "../../layouts/Admin/admin-layout";
import AdminUsers from "../../views/Admin/admin-list-account";
import CreateAccountView from "../../views/Admin/admin-create-account-form";
import UpdateAccountView from "../../views/Admin/admin-update-account";
import UserDetail from "../../views/Admin/admin-view-account-details";
import AdminEvents from "../../views/Admin/admin-list-events";
import CreateEventView from "../../views/Admin/admin-create-event-form";
import CategoryManagementView from "../../views/Admin/admin-list-category";
import LoginPage from "../../views/Admin/login";

const adminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "loginAdmin", element: <LoginPage /> },
    { path: "users", element: <AdminUsers /> },
    { path: "users/create", element: <CreateAccountView /> },
    { path: "users/edit", element: <UpdateAccountView /> },
    { path: "users/details", element: <UserDetail /> },
    { path: "events", element: <AdminEvents /> },
    { path: "events/create", element: <CreateEventView /> },
    { path: "events/categories", element: <CategoryManagementView /> },
  ],
};

export default adminRoutes;
