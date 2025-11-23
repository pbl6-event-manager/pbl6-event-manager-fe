import { assignAndUpdateStaffToOwner, getStaffGroupedByRole, deleteOwnerStaffByEmail } from "../api/owner-staff-api";
import { convertToOwnerStaffListItem, convertToStaffDto } from "../converters/staff-converter";
import { mapToStaffModel } from "../mappers/staff-mapper";
import { mapToRoleStaffModel } from "../mappers/role-staff-mapper";
import type { OwnerStaffListItem } from "../models/form-models/staff-form-models";
import type { RoleStaffModel } from "../models/bean/role-staff-models";
import type { UserModel } from "../models/bean/user-models";
import type { StaffDto } from "../dtos/staff-dto";
import { getStaffOfEventAdminApi } from "../api/event-staff";
import { mapResponseToEventStaffModelAdmin } from "../mappers/event-staff-mapper";
import { convertEventStaffAdminModelToEventStaffAdminDto } from "../converters/event-staff-converter";

export const assignStaffToOwnerService = async (staffEmail: string, roleStaffId: number) => {
    try {
        const requestData = { staffEmail, roleStaffId };
        const response = await assignAndUpdateStaffToOwner(requestData.staffEmail, requestData.roleStaffId);
        const rawData = response?.data;
        if (!rawData) {
            throw new Error("Failed to assign staff");
        }
        const assignment = rawData.data.assignment;
        const roleStaff = assignment.roleStaff;

        const staffDto: StaffDto = {
            id: assignment.id,
            name: staffEmail.split('@')[0],
            email: staffEmail,
            role: roleStaff.name,
        }
        return {
            message: rawData.message,
            staffDto,
            assignmentId: assignment.id
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to assign staff");
    }
}

export const fetchStaffGroupedByRoleService = async () => {
    const response = await getStaffGroupedByRole();
    const rawData = response?.data;

    if (!rawData.status || !rawData.data) {
        throw new Error(rawData.message || "Failed to fetch staffs");
    }
    const groupedData = rawData.data;
    const allStaffDtos: StaffDto[] = [];
    const allStaffItems: OwnerStaffListItem[] = [];
    for (const group of groupedData) {
        //Map role staff to Model
        const roleStaffModel: RoleStaffModel = mapToRoleStaffModel(group.roleStaff);

        for (const rawStaff of group.staffs) {
            //Map raw data to UserModel
            const staffModel: UserModel = mapToStaffModel(rawStaff);
            const staffWithRole = {
                ...staffModel,
                name: `${staffModel.firstName} ${staffModel.lastName}`.trim() || staffModel.email,
                role: roleStaffModel.name,
                roleId: roleStaffModel.id,
            };

            const staffDto: StaffDto = convertToStaffDto(staffWithRole);
            allStaffDtos.push(staffDto);

            const displayItem = convertToOwnerStaffListItem(staffDto);

            if (displayItem) {
                allStaffItems.push(displayItem);
            }
        }
    }
    return { allStaffItems, allStaffDtos };
}

export const removeStaffOfOwnerService = async (staffEmail: string) => {
    try {
        const response = await deleteOwnerStaffByEmail(staffEmail);
        return response.data.message;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to remove staff");
    }
}

export const getStaffOfEventAdminService = async (eventId: number) => {
    try {
        const response = await getStaffOfEventAdminApi(eventId);
        if(response.data.message === "success") {
            return response.data.data.assignments;
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to get staff of this event");
    }
}