import { getAllRoleStaffs } from "../api/role-staff-api";
import { mapToRoleStaffModel } from "../mappers/role-staff-mapper";
import { convertToRoleStaffModelToDto } from "../converters/role-staff-converter";
import type { RoleStaffListItem } from "../models/form-models/role-staff-form-models";

export const fetchOwnerRoleStaffsService = async () => {
    const response = await getAllRoleStaffs();
    const rawList = response?.data?.data ?? [];
    
    const roleStaffs = Array.isArray(rawList)
        ? rawList.map((raw: any) => mapToRoleStaffModel(raw)).filter(Boolean)
        : [];
    const roleStaffDtos = roleStaffs.map((role: any) => convertToRoleStaffModelToDto(role));
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

        const { id, name, description  } = dto;

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
