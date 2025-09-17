import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getUsers } from "../../store/actions/Admin/user-action";
import { useEffect } from "react";

export const useUserViewModel = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.userList.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return { users };
};
