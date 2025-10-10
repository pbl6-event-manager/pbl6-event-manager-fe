import type { RoleModel } from "./role-models";

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