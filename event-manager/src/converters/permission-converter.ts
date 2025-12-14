import type { PermissionDto } from "../dtos/permission-dto";
import type { PermissionListItem } from "../models/form-models/permission-form-models";

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

export const convertToPermissionListItem = (dto: any): PermissionListItem | null => {
    try {
        if (!dto || typeof dto !== "object") return null;
        const { id, name, description, isActive } = dto;

        if (isActive !== false) {
            return {
                id,
                name,
                description,
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}