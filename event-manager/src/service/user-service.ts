import { updateStatusUserApi, getAllUsersApi } from "../api/user-api";
import { convertUserModelToListUserDto } from "../converters/user-converter";
import { mapToUserModel } from "../mappers/user-mapper";

export const fetchUsersService = async () => {
  const { data } = await getAllUsersApi();
  const users = data.data.map(mapToUserModel);
  const userListDto = users.map(convertUserModelToListUserDto);
  return userListDto;
};

export const updateStatusUserService = async (email: string, isActive: boolean) => {
  const { data } = await updateStatusUserApi(email, isActive);
  const deletedUserModel = mapToUserModel(data.data)
  const deletedListUserDto = convertUserModelToListUserDto(deletedUserModel)
  return deletedListUserDto;
};