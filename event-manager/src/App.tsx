import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";
import adminRoutes from "./routes/Admin/admin-routes";
import LoginPage from "./views/Guest/login-page";

function AppRoutes() {
  const routes = useRoutes([adminRoutes]);
  return routes;
}

function App() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}

export default App;

