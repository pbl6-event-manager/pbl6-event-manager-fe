import type { RoleModel } from "./role-models";
import type { ListUserDto } from "../dtos/user-dto";
import type { ListOrganizerDto } from "../dtos/organizer-dto";
import type { OrganizerModel } from "./organizer-models";
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
  user: any;
  selectedUserEmail: string | null; 
  loading: boolean;
  error: string | null;
  activeOrganizers: ListOrganizerDto[];
  inActiveOrganizers: ListOrganizerDto[];
  organizers: OrganizerModel[];
}

export const DEFAULT_USERS_STATE: UserState = {
  users: [],
  user: null,
  selectedUserEmail: null,
  loading: false,
  error: null,
  activeOrganizers: [],
  inActiveOrganizers: [],
  organizers: []
};
