import type { RoleStaffModel } from "../models/bean/role-staff-models";
import type { RolePermissionDto } from "../dtos/role-staff-dto";

export const mapToRoleStaffModel = (raw: any) : RoleStaffModel => ({
    id: raw.id,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    name: raw.name,
    description: raw.description ?? null,
    ownerId: raw.ownerId,
});

export const mapToRolePermissionModel = (raw: any): RolePermissionDto => ({
  id: raw.id,
  name: raw.name,
})