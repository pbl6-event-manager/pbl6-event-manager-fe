import { getAllPermissions } from "../api/permission-api";
import { convertPermissionModelToDto } from "../converters/permission-converter";
import { mapToPermissionModel } from "../mappers/permission-mapper";
import type { PermissionListItem } from "../models/form-models/permission-form-models";

export const getAllPermissionsService = async () => {
    const response = await getAllPermissions();
    const rawList = response?.data?.data ?? [];

    const permissions = Array.isArray(rawList)
        ? rawList.map((raw: any) => mapToPermissionModel(raw)).filter(Boolean)
        : [];
    const permissionDtos = permissions.map((perm: any) => convertPermissionModelToDto(perm));
    const permissionListItems: PermissionListItem[] = permissionDtos
        .map((dto: any) => convertToPermissionListItem(dto))
        .filter((item): item is PermissionListItem => item != null);
    return { permissionDtos, permissionListItems };
};

const convertToPermissionListItem = (dto: any): PermissionListItem | null => {
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
        console.error("Error converting permission DTO:", error);
        return null;
    }
}