import { checkEmailExist } from "../api/auth-api";
import { getOrgOfAnUserApi } from "../api/organizer-api";
<<<<<<< Updated upstream
import { updateStatusUserApi, getAllUsersApi, createUserApi } from "../api/user-api";
=======
import { getAllUsersApi, getUserByEmailApi, updateUserApi } from "../api/admin-api";
>>>>>>> Stashed changes
import { convertOrgModelToListOrgDto } from "../converters/organizer-converter";
import { convertUserModelToListUserDto, convertUserDataToSignUpDto, convertUserDataToCreateUserDto } from "../converters/user-converter";
import type { ListOrganizerDto } from "../dtos/organizer-dto";
import { mapToOrganizerModel } from "../mappers/organizer-mapper";
import { mapToUserModel } from "../mappers/user-mapper";
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
    return data.data;
 } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
 }
}

export const fetchActiveOrgOfAnUserService = async (userId: any) => {
  try {
    const data = await getOrgOfAnUserApi(userId);
    const organizers = data.data.data.map(mapToOrganizerModel);
    const organizersListDto = organizers.map(convertOrgModelToListOrgDto);
    const activeOrgsListDto = organizersListDto.filter((o : ListOrganizerDto) => o.isActive === true);
    const inActiveOrgsListDto = organizersListDto.filter((o : ListOrganizerDto) => o.isActive === false);
    return {
      organizers,
      activeOrgsListDto,
      inActiveOrgsListDto
    };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}