import { checkEmailExist } from "../api/auth-api";
import { updateStatusUserApi, getAllUsersApi, createUserApi } from "../api/user-api";
import { convertUserModelToListUserDto, convertUserDataToSignUpDto, convertUserDataToCreateUserDto } from "../converters/user-converter";
import { mapToUserModel } from "../mappers/user-mapper";
import { addUser } from "../store/actions/Admin/user-action";
import { signupService } from "./auth-service";

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

export const addUserService = async (userData: any) => {
 const signUpDto = convertUserDataToSignUpDto(userData);
 const createUserDto = convertUserDataToCreateUserDto(userData);
 const addUserEmail = userData.email;
 try {
    const res = await checkEmailExist(addUserEmail);
    if(res.data.data) throw new Error("Email already exists");

    await signupService(signUpDto);
    const data = await createUserApi(addUserEmail, createUserDto);
    console.log(data.data);
    return data.data;
 } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
 }
}