import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setSelectedUser, clearSelectedUser } from "../../store/actions/Admin/user-action";
import { useCallback } from "react";

export const useUserDetailViewModel = () => {
  const dispatch = useDispatch();

  const selectedUserEmail = useSelector(
    (state: RootState) => state.userDetail.selectedUserEmail
  );

  const selectUser = useCallback(
    (email: string) => {
      dispatch(setSelectedUser({ email }));
    },
    [dispatch]
  );

  const clearUser = useCallback(() => {
    dispatch(clearSelectedUser());
  }, [dispatch]);

  return {
    selectedUserEmail,
    selectUser,
    clearUser,
  };
};
