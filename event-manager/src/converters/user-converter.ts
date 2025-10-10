import type { UserModel } from "../models/user-models";
import type { ListUserDto } from "../dtos/user-dto";

export const convertUserModelToListUserDto = (user: UserModel): ListUserDto => ({
  id: user.id,
  fullName: `${user.firstName} ${user.lastName}`,
  email: user.email,
  phone: user.phone == null ? "Not Updated" : user.phone,
  avatarUrl: user.avatarUrl,
  roles: user.roles.length === 2 ? "Attendee/Organizer" : "Admin",
  isActive: user.isActive, 
});