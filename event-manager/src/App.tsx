import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";
import AppRoutes from "./routes/app-routes";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

