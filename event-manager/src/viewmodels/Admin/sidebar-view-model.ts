import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth-action";
import { useNavigate } from "react-router-dom";

export const useSideBarViewModel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const handleLogout = () => {
    setOpenDialog(false);
    dispatch(logout());
    navigate("/login");
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return {
    location,
    openDialog,
    setOpenDialog,
    openSubmenu,
    setOpenSubmenu,
    handleLogout,
    toggleSubmenu
  }
}