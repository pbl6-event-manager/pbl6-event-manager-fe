import type { RoleModel } from "./role-models";
import type { ListUserDto } from "../dtos/user-dto";
export interface UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  isActive: boolean;
  roles: RoleModel[];
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  users: ListUserDto[];
  selectedUserEmail: string | null; 
}

export const DEFAULT_USERS_STATE: UserState = {
  users: [],
  selectedUserEmail: null,
};
