import { getAllRoleStaffs, createNewRoleStaff, getRoleStaffById } from "../api/role-staff-api";
import { mapToRoleStaffModel, mapToRolePermissionModel } from "../mappers/role-staff-mapper";
import { convertRoleStaffModelToDto, convertRoleStaffFormDataToCreateRequestDto } from "../converters/role-staff-converter";
import type { RoleStaffListItem } from "../models/form-models/role-staff-form-models";
import type { RolePermissionDto } from "../dtos/role-staff-dto";

export const fetchOwnerRoleStaffsService = async () => {
    const response = await getAllRoleStaffs();
    const rawList = response?.data?.data ?? [];

    const roleStaffs = Array.isArray(rawList)
        ? rawList.map((raw: any) => mapToRoleStaffModel(raw)).filter(Boolean)
        : [];
    const permissions = Array.isArray(rawList.permissions)
        ? rawList.permissions.map((p: any) => mapToRolePermissionModel(p))
        : []
    const roleStaffDtos = roleStaffs.map((role: any) => convertRoleStaffModelToDto(role, permissions));
    const roleStaffListItems: RoleStaffListItem[] = roleStaffDtos
        .map((dto: any) => convertToRoleStaffListItem(dto))
        .filter((item): item is RoleStaffListItem => item != null);

    return {
        roleStaffDtos,
        roleStaffListItems
    };
};

const convertToRoleStaffListItem = (dto: any): RoleStaffListItem | null => {
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
        console.error("Error in createRoleService:", error)
        throw new Error(error.response?.data?.message || "Failed to create role")
    }
}