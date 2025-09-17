// src/routes/PublicRoutes.tsx
import type { RouteObject } from "react-router-dom";
import LoginPage from "../../views/Guest/login-page";
import SignUpPage from "../../views/Guest/signup-page";
import AuthFlow from "../../views/Guest/auth-flow";

const publicRoutes: RouteObject = {
  path: "/",
  children: [
    { path: "login", element: <LoginPage /> },    // /login
    { path: "signup", element: <SignUpPage /> },  // /signup
    { path: "auth-flow", element: <AuthFlow /> }, // /auth-flow
  ],
};

export default publicRoutes;
