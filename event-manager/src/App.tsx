import AdminUsers from "./views/Admin/admin-list-account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccountView from "./views/Admin/admin-create-account-form";
import UpdateAccountView from "./views/Admin/admin-update-account";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/create" element={<CreateAccountView />} />
        <Route path="/admin/users/edit" element={<UpdateAccountView />} />
      </Routes>
    </Router>
  );
}

export default App;

