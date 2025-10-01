import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getUsers, setSelectedUser, clearSelectedUser } from "../../store/actions/Admin/user-action";
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUserViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.userList.users);
  const [openDialog, setOpenDialog] = useState(false);
  const selectedUserEmail = useSelector(
    (state: RootState) => state.userDetail.selectedUserEmail
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  
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
    console.log(selectedUserEmail);
    setOpenDialog(false);
  };
  
  const handleCreate = () => {
    navigate("/admin/users/create");
  }
  

  return { 
    users,
    selectedUserEmail,
    openDialog,
    selectUser,
    clearUser,
    handleViewDetail,
    handleEdit,
    handleDelete,
    confirmDelete,
    setOpenDialog,
    handleCreate
  };
};
