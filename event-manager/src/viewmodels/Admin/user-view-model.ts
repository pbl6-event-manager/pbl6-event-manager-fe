import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getUsers, setSelectedUser, clearSelectedUser, updateStatusUser, addUser, getOrgOfAnUser, updateUser } from "../../store/actions/Admin/user-action";
import { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {applyUserFilters} from "../../utils/Admin/filter-user";
import {type FilterState} from "../../utils/Admin/filter-user";
import { FILTER_STATE_DEFAULT } from "../../utils/Admin/filter-user";
import { closeLoadingAlert, showErrorAlert, showLoadingAlert, showSuccessAlert } from "../../helpers/alert-helpers";

export const useUserViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {users, loading, activeOrganizers, inActiveOrganizers}= useSelector((state: RootState) => state.userReducer);
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const [openRecDialog, setOpenRecDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  const [activeDetailTab, setActiveDetailTab] = useState<"participant" | "active-organizer" | "deleted-organizer">("participant");
  const selectedUserEmail = useSelector(
    (state: RootState) => state.userReducer.selectedUserEmail
  );

  useEffect(() => {
    try {
      dispatch<any>(getUsers());
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to fetch users");
    }
  }, [dispatch]);


  useEffect(() => {
    if ((activeDetailTab === "active-organizer" || activeDetailTab === "deleted-organizer") && selectedUserEmail) {
      const user = users.find((u) => u.email === selectedUserEmail);
      if (user?.id) {
        getOrganizersOfAnUser(user.id);
      }
    }
  }, [activeDetailTab, selectedUserEmail]);


  const columns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Avatar", accessor: "avatarUrl", type: "image" as const },
    { header: "First Name", accessor: "firstName", type: "text" as const },
    { header: "Last Name", accessor: "lastName", type: "text" as const },
    { header: "Email", accessor: "email", type: "text" as const },
    { header: "Phone", accessor: "phone", type: "text" as const },
    { header: "Role", accessor: "roles", type: "text" as const },
    { header: "Actions", accessor: "actions", type: "action" as const },
  ];

  const organizerColumns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Organizer Name", accessor: "name", type: "text" as const },
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

  const getOrganizersOfAnUser = useCallback((id: any) => {
    dispatch<any>(getOrgOfAnUser(id))
  }, [dispatch]);

  const handleViewDetail = (email: string) => {
    selectUser(email);
    const user = users.find((u) => u.email === email);
    if(user) {
      navigate("/admin/users/details", {state: {user}});
    }
  }

  const handleEdit = (email: string) => {
    const user = users.find((u) => u.email === email);
    if(user) {
      navigate("/admin/users/edit", { state: { user } }); 
    }
  };

  const handleDelete = (email: string) => {
    clearUser();
    selectUser(email);
    setOpenDelDialog(true);
  }

  const confirmDelete = async () => {
    if(!selectedUserEmail) {
      setOpenDelDialog(false);
      showErrorAlert("Failed to delete user");
      return;
    }
    try {
      setOpenDelDialog(false);
      showLoadingAlert("Deleting user...");
      await dispatch<any>(updateStatusUser(selectedUserEmail, false))
      closeLoadingAlert();
      await showSuccessAlert("Deleted user successfully");
      clearUser();
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to delete user");
    }
  };
  
  const handleCreate = () => {
    navigate("/admin/users/create");
  }

  const handleRecover = (email: string) => {
    clearUser();
    selectUser(email);
    setOpenRecDialog(true);  
  }

  const confirmRecover = async () => {
    if(!selectedUserEmail) {
      setOpenRecDialog(false);
      showErrorAlert("Failed to recover user");
      return;
    }
    try {
      setOpenRecDialog(false);
      showLoadingAlert("Recovering user...");
      await dispatch<any>(updateStatusUser(selectedUserEmail, true));
      closeLoadingAlert();
      await showSuccessAlert("Recovered user successfully");
      clearUser();
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to recover user");
    }
  }

  const handleUpdate = async (data: any) => {
    try {
      showLoadingAlert("Updating account...");
      await dispatch<any>(updateUser(data));
      closeLoadingAlert();
      await showSuccessAlert("Updated account successfully");
      navigate(-1);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to update account");
    }
  }

  const handleAdd = async (data: any) => {
    try {
      showLoadingAlert("Creating account...");
      await dispatch<any>(addUser(data));
      closeLoadingAlert();
      await showSuccessAlert("Added account successfully");
      navigate(-1);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to add account");
    }
  }
  
  const handleBack = () => {
    navigate(-1);
  }
  

  return {
    filteredActiveUsers,
    filteredInActiveUsers, 
    columns,
    users,
    selectedUserEmail,
    openDelDialog,
    openRecDialog,
    activeTab,
    loading,
    location,
    activeDetailTab,
    organizerColumns,
    activeOrganizers,
    inActiveOrganizers,
    navigate,
    setActiveDetailTab,
    handleRecover,
    selectUser,
    clearUser,
    handleViewDetail,
    handleEdit,
    handleDelete,
    confirmDelete,
    setOpenDelDialog,
    setOpenRecDialog,
    handleCreate,
    setFilters,
    setActiveTab,
    confirmRecover,
    handleBack,
    handleUpdate,
    handleAdd
  };
};
