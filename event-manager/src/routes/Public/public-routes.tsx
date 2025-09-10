// src/routes/PublicRoutes.tsx
import type { RouteObject } from "react-router-dom";
import LoginPage from "../../views/Guest/login-page";

const publicRoutes: RouteObject = {
  path: "/",
  children: [
    { path: "login", element: <LoginPage /> },    // /login
  ],
};

export default publicRoutes;
