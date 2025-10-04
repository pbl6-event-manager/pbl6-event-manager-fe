import { getAllUsersApi } from "../../api/Admin/user-api";

export const fetchUsersService = async () => {
  const { data } = await getAllUsersApi();
  return data;
};