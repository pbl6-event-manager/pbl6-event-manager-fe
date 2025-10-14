import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getUsers, setSelectedUser, clearSelectedUser, updateStatusUser } from "../../store/actions/Admin/user-action";
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {applyUserFilters} from "../../utils/Admin/filter-user";
import {type FilterState} from "../../utils/Admin/filter-user";
import { FILTER_STATE_DEFAULT } from "../../utils/Admin/filter-user";

export const useUserViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.userReducer.users);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  const selectedUserEmail = useSelector(
    (state: RootState) => state.userReducer.selectedUserEmail
  );

  useEffect(() => {
    dispatch<any>(getUsers());
  }, [dispatch]);

  const columns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Avatar", accessor: "avatar", type: "image" as const },
    { header: "Full Name", accessor: "fullName", type: "text" as const },
    { header: "Email", accessor: "email", type: "text" as const },
    { header: "Phone", accessor: "phone", type: "text" as const },
    { header: "Role", accessor: "roles", type: "text" as const },
    { header: "Actions", accessor: "actions", type: "action" as const },
  ];
  
  const [filters, setFilters] = useState<FilterState>(FILTER_STATE_DEFAULT);

  const activeUsers = users.filter((u) => u.isActive);
  const inActiveUsers = users.filter((u) => !u.isActive);
  const filteredActiveUsers = applyUserFilters(activeUsers, filters);
  const filteredInActiveUsers = applyUserFilters(inActiveUsers, filters);


  const selectUser = useCallback(
    (email: string) => {
      dispatch(setSelectedUser({ email }));
    },
    [dispatch]
  );
  
  const clearUser = useCallback(() => {
    dispatch(clearSelectedUser());
  }, [dispatch]);

  const handleViewDetail = (email: string) => {
    selectUser(email);
    navigate("/admin/users/details");
  }

  const handleEdit = (email: string) => {
    navigate("/admin/users/edit", { state: { email } }); 
  };

  const handleDelete = (email: string) => {
    clearUser();
    selectUser(email);
    setOpenDialog(true);
  }

  const confirmDelete = () => {
    if(!selectedUserEmail) {
      setOpenDialog(false);
      return;
    }
    dispatch<any>(updateStatusUser(selectedUserEmail, false))
    setOpenDialog(false);
  };
  
  const handleCreate = () => {
    navigate("/admin/users/create");
  }

  const handleRecover = (email: string) => {
    clearUser();
    selectUser(email);
    setOpenDialog(true);  
  }

  const confirmRecover = () => {
    if(!selectedUserEmail) {
      setOpenDialog(false);
      return;
    }
    dispatch<any>(updateStatusUser(selectedUserEmail, true))
    setOpenDialog(false);
  }
  

  return {
    filteredActiveUsers,
    filteredInActiveUsers, 
    columns,
    users,
    selectedUserEmail,
    openDialog,
    activeTab,
    handleRecover,
    selectUser,
    clearUser,
    handleViewDetail,
    handleEdit,
    handleDelete,
    confirmDelete,
    setOpenDialog,
    handleCreate,
    setFilters,
    setActiveTab,
    confirmRecover
  };
};
