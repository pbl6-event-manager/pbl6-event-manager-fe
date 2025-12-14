import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import AppRoutes from "./routes/app-routes";

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors closeButton />
      <AppRoutes />
    </Router>
  );
}

export default App;

