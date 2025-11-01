import { checkEmailExist } from "../api/auth-api";
import { getOrgOfAnUserApi } from "../api/organizer-api";
import { getAllUsersApi, getUserByEmailApi, updateUserApi } from "../api/user-api";
import { convertOrgModelToListOrgDto } from "../converters/organizer-converter";
import { convertUserModelToListUserDto } from "../converters/user-converter";
import type { ListOrganizerDto } from "../dtos/organizer-dto";
import { mapToOrganizerModel } from "../mappers/organizer-mapper";
import { mapToUserModel } from "../mappers/user-mapper";
import { signupService } from "./auth-service";

export const fetchUsersService = async () => {
  try {
    const { data } = await getAllUsersApi();
    if(data.message === "success") {
      const users = data.data.map(mapToUserModel);
      const userListDto = users.map(convertUserModelToListUserDto);
      return userListDto;
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

export const updateStatusUserService = async (email: string, isActive: boolean) => {
  try {
    const updateStatusUserForm = new FormData();
    updateStatusUserForm.append("isActive", isActive ? "true" : "false");
    const { data } = await updateUserApi(email, updateStatusUserForm);
    if(data.message === "success") {
      const updatedUserModel = mapToUserModel(data.data)
      const updatedListUserDto = convertUserModelToListUserDto(updatedUserModel)
      return updatedListUserDto;
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

export const addUserService = async (userData: any) => {
  const email = userData.get("email") as string;
  const password = userData.get("password") as string;
  const firstName = userData.get("firstName") as string;
  const lastName = userData.get("lastName") as string;
  const phone = userData.get("phone") as string | null;
  const role = userData.get("role") as string;
  const roleIds = role === "Admin" ? "1" : "2";
  const avatar = userData.get("avatar") as File | null;
  const signUpDto = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  }
  const createUserForm = new FormData();
  if(role) createUserForm.append("roleIds", roleIds);
  if(phone) createUserForm.append("phone", phone);
  if(avatar) createUserForm.append("avatar", avatar);
  const addUserEmail = email;
  try {
    const res = await checkEmailExist(addUserEmail);
    if(res.data.data) throw new Error("Email already exists");
    await signupService(signUpDto);
    const data = await updateUserApi(addUserEmail, createUserForm);
    if(data.data.message === "success") {
      const newUserModel = mapToUserModel(data.data.data);
      const newUserDto = convertUserModelToListUserDto(newUserModel);
      return newUserDto;
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}

export const updateUserService = async (userData: any) => {
  const email = userData.get("email") as string;
  const password = userData.get("password") as string;
  const firstName = userData.get("firstName") as string;;
  const lastName = userData.get("lastName") as string;
  const phone = userData.get("phone") as string | null;
  const role = userData.get("role") as string;
  const roleIds = role === "Admin" ? "1" : "2";
  const avatar = userData.get("avatar") as File | null;
  const updateUserForm = new FormData();
  if(firstName) updateUserForm.append("firstName", firstName);
  if(lastName) updateUserForm.append("lastName", lastName);
  if(role) updateUserForm.append("roleIds", roleIds);
  if(phone) updateUserForm.append("phone", phone);
  if(avatar) updateUserForm.append("avatar", avatar);
  if(password) updateUserForm.append("avatar", password);
  try {
    const data = await updateUserApi(email, updateUserForm);
    if(data.data.message === "success") {
      const udpatedUserModel = mapToUserModel(data.data.data);
      const updatedUserDto = convertUserModelToListUserDto(udpatedUserModel);
      return updatedUserDto;
    }
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

export const getUserByEmailService = async (email: any) => {
  try {
    const data = await getUserByEmailApi(email);
    if(data.data.message === "success") {
      const user = mapToUserModel(data.data.data);
      const userDto = convertUserModelToListUserDto(user)
      return userDto;
    } else {
      return null;
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}