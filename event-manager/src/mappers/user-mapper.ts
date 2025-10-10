import type { UserModel } from "../models/user-models";
import type { RoleModel } from "../models/role-models";

export const mapToUserModel = (raw: any): UserModel => ({
  id: raw.id,
  email: raw.email,
  firstName: raw.firstName,
  lastName: raw.lastName,
  phone: raw.phone ?? null,
  avatarUrl: raw.avatarUrl ?? null,
  isActive: raw.isActive ?? false,
  roles: (raw.roles || []).map(
    (r: any): RoleModel => ({
      id: r.id,
      name: r.name,
    })
  ),
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
});