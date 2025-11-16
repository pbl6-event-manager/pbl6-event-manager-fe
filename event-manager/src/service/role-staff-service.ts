import { getAllRoleStaffs, createNewRoleStaff, deleteRoleStaff, updateRoleStaff } from "../api/role-staff-api";
import { mapToRoleStaffModel, mapToRolePermissionModel } from "../mappers/role-staff-mapper";
import { convertRoleStaffModelToDto, convertRoleStaffFormDataToCreateRequestDto, convertToRoleStaffListItem } from "../converters/role-staff-converter";
import type { RoleStaffListItem } from "../models/form-models/role-staff-form-models";
import type { RolePermissionDto } from "../dtos/role-staff-dto";

export const fetchOwnerRoleStaffsService = async () => {
    const response = await getAllRoleStaffs();
    const rawList = response?.data?.data ?? [];

    const roleStaffDtos = Array.isArray(rawList)
        ? rawList.map((raw: any) => {
            // ✅ Map permissions của TỪNG role
            const permissions = Array.isArray(raw.permissions)
                ? raw.permissions.map((p: any) => mapToRolePermissionModel(p))
                : [];

            return convertRoleStaffModelToDto(mapToRoleStaffModel(raw), permissions);
        })
        : [];
    console.log("Converted RoleStaffDtos:", roleStaffDtos);
    const roleStaffListItems: RoleStaffListItem[] = roleStaffDtos
        .map((dto: any) => convertToRoleStaffListItem(dto))
        .filter((item): item is RoleStaffListItem => item != null);

    return {
        roleStaffDtos,
        roleStaffListItems
    };
};

export const createRoleStaffService = async (formData: any) => {
    try {
        const requestData = convertRoleStaffFormDataToCreateRequestDto(formData);
        const response = await createNewRoleStaff(requestData.name, requestData.description, requestData.permissions);
        const rawData = response?.data?.data;

        if (!rawData) {
            throw new Error("Failed to create role")
        }

        const roleStaffModel = mapToRoleStaffModel(rawData);

        const permissions: RolePermissionDto[] = Array.isArray(rawData.permissions)
            ? rawData.permissions.map((p: any) => mapToRolePermissionModel(p))
            : []
        const roleStaffDto = convertRoleStaffModelToDto(roleStaffModel, permissions);
        return roleStaffDto;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create role")
    }
}

export const deleteRoleStaffService = async (roleStaffId: number) => {
    try {
        await deleteRoleStaff(roleStaffId);
        return true;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete role")
    }
}

export const updateRoleStaffService = async (roleStaffId: number, formData: any) => {
    try {
        const requestData = convertRoleStaffFormDataToCreateRequestDto(formData);
        const response = await updateRoleStaff(
            roleStaffId,
            requestData.name,
            requestData.description,
            requestData.permissions
        );
        const rawData = response?.data?.data;

        if (!rawData) {
            throw new Error("Failed to update role")
        }

        const roleStaffModel = mapToRoleStaffModel(rawData);

        const permissions: RolePermissionDto[] = Array.isArray(rawData.permissions)
            ? rawData.permissions.map((p: any) => mapToRolePermissionModel(p))
            : []
        const roleStaffDto = convertRoleStaffModelToDto(roleStaffModel, permissions);

        return roleStaffDto;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update role")
    }
}