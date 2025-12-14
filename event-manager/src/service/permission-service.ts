import { addPermissionApi, deletePermissionApi, getAllPermissions, updatePermissionApi } from "../api/permission-api";
import { convertPermissionModelToDto, convertToPermissionListItem } from "../converters/permission-converter";
import { mapToPermissionModel } from "../mappers/permission-mapper";
import type { PermissionListItem } from "../models/form-models/permission-form-models";

export const getAllPermissionsService = async () => {
    try {
        const response = await getAllPermissions();
        const rawList = response?.data?.data ?? [];

        const permissions = Array.isArray(rawList)
            ? rawList.map((raw: any) => mapToPermissionModel(raw)).filter(Boolean)
            : [];
        const permissionDtos = permissions.map((perm: any) => convertPermissionModelToDto(perm)).sort((a: any, b: any) => a.id - b.id);;
        const permissionListItems: PermissionListItem[] = permissionDtos
            .map((dto: any) => convertToPermissionListItem(dto))
            .filter((item): item is PermissionListItem => item != null).sort((a: any, b: any) => a.id - b.id);;
        return { permissionDtos, permissionListItems };
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
};



export const addNewPermissionService = async (permission: any) => {
    try {
        const data = await addPermissionApi(permission);
        if (data.data.message === "success") {
            const newPermission = mapToPermissionModel(data.data.data.permission);
            const newPermissionDtos = convertPermissionModelToDto(newPermission);
            const newPermissionListItems = convertToPermissionListItem(newPermissionDtos);
            return newPermissionListItems;
        } else {
            throw new Error("Unexpected error occurred");
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const updatePermissionService = async (id: number, permission: any) => {
    try {
        const data = await updatePermissionApi(id, permission);
        if (data.data.message === "success") {
            const updatedPermission = mapToPermissionModel(data.data.data.updated);
            const updatedPermissionDtos = convertPermissionModelToDto(updatedPermission);
            const updatedPermissionListItems = convertToPermissionListItem(updatedPermissionDtos);
            return updatedPermissionListItems;
        } else {
            throw new Error("Unexpected error occurred");
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const deletePermissionService = async (id: number) => {
    try {
        const response = await deletePermissionApi(id);
        if (response.data.message === "success") {
            return id;
        } else {
            throw new Error("Unexpected error occurred");
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}