import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";
import adminRoutes from "./routes/Admin/admin-routes";

function AppRoutes() {
  const routes = useRoutes([adminRoutes]);
  return routes;
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

