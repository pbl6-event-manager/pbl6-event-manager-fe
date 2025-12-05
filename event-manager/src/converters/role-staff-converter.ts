import type { RoleStaffDto, CreateRoleStaffRequestDto, RolePermissionDto } from "../dtos/role-staff-dto";
import type { RoleStaffModel } from "../models/bean/role-staff-models";
import type { CreateRoleStaffFormData, RoleStaffListItem } from "../models/form-models/role-staff-form-models";
import { convertRoleStaffPermissionToDto } from "./permission-converter";

export const convertRoleStaffModelToDto = (model: RoleStaffModel, permissions: RolePermissionDto[] ): RoleStaffDto => ({
    id: model.id,
    name: model.name,
    description: model.description,
    permissions: permissions.map((p) => convertRoleStaffPermissionToDto(p)),
    ownerId: model.ownerId
});

// export const convertRoleStaffFormDataToDto = (formData: any) => ({
    
// })

export const convertRoleStaffFormDataToCreateRequestDto = (formData: CreateRoleStaffFormData) : CreateRoleStaffRequestDto => ({
    name: formData.name,
    description: formData.description,
    permissions: formData.permissionIds,
})

export const convertToRoleStaffListItem = (dto: any): RoleStaffListItem | null => {
    try {
        if (!dto || typeof dto !== "object") return null;

        const { id, name, description } = dto;

        return {
            id,
            name,
            description,
        };
    } catch (error) {
        console.error("Error converting to RoleStaffListItem:", error);
        return null;
    }
};