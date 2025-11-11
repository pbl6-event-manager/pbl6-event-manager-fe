import type { PermissionDto } from "../dtos/permission-dto";

export const convertPermissionModelToDto = (permission: any): PermissionDto => ({
    id: permission.id,
    name: permission.name,
    description: permission.description,
    isActive: permission.isActive
});

export const convertRoleStaffPermissionToDto = (permission: any) => ({
    id: permission.id,
    name: permission.name,
});