import type { UserModel } from "../models/user-models";
import type { CreateUserDto, ListUserDto } from "../dtos/user-dto";
import type { SignUpDto } from "../models";

export const convertUserModelToListUserDto = (user: UserModel): ListUserDto => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone == null ? "Not Updated" : user.phone,
  avatarUrl: user.avatarUrl,
  roles: user.roles.length === 2 ? "Attendee/Organizer" : "Admin",
  isActive: user.isActive, 
});

export const convertUserDataToSignUpDto = (user: any): SignUpDto => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  password: user.password
});

export const convertUserDataToCreateUserDto = (user: any): CreateUserDto => ({
  phone: user.phone,
  role: user.roles === "Admin" ? "1" : "2,3"
})