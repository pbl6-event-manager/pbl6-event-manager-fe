import { getAllUsersApi } from "../api/user-api";

export const fetchUsersService = async () => {
  const { data } = await getAllUsersApi();
  return data;
};