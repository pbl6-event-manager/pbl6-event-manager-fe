import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth-action";
import { closeLoadingAlert, showLoadingAlert } from "../../helpers/alert-helpers";

export const useSideBarViewModel = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  const handleLogout = () => {
    setOpenDialog(false);
    dispatch(logout());
    showLoadingAlert();
    window.location.href = ("/login");
    closeLoadingAlert();
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