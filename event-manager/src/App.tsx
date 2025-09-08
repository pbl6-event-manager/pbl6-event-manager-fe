import AdminUsers from "./views/Admin/admin-list-account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./views/Admin/admin-create-account-form";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/create" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;

