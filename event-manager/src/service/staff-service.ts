import { assignAndUpdateStaffToOwner, getStaffGroupedByRole, deleteOwnerStaffByEmail } from "../api/owner-staff-api";
import { 
    syncStaffToEvent, 
    getStaffOfEventStaffApi,
    getStaffOfEventAdminApi,
    getStaffForAssignmentGroupedByRole
} from "../api/event-staff-api";
import { convertToOwnerStaffListItem, convertToStaffDto } from "../converters/staff-converter";
import { mapToStaffModel } from "../mappers/staff-mapper";
import { mapToRoleStaffModel } from "../mappers/role-staff-mapper";
import type { OwnerStaffListItem } from "../models/form-models/staff-form-models";
import type { RoleStaffModel } from "../models/bean/role-staff-models";
import type { UserModel } from "../models/bean/user-models";
import type { StaffDto } from "../dtos/staff-dto";

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

export const fetchStaffForAssignmentGroupedByRoleService = async (eventId: number) => {
    const response = await getStaffForAssignmentGroupedByRole(eventId);
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
        if (response.data.message === "success") {
            return response.data.data.assignments;
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to get staff of this event");

    }
}

export const syncStaffsToEventService = async (eventId: number, staffIds: number[]) => {
    try {
        console.log("[StaffService] Syncing staffs to event:", { eventId, staffIds });

        const response = await syncStaffToEvent(eventId, staffIds);
        console.log("[StaffService] Sync response:", response);

        if (response.data.status && response.data.message === "success") {
            return {
                message: response.data.data.message,
                addedStaffIds: response.data.data.addedStaffIds,
                removedStaffIds: response.data.data.removedStaffIds,
                finalStaffIds: response.data.data.finalStaffIds
            };
        } else {
            throw new Error(response.data.message || "Failed to sync staffs to event");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to sync staffs to event");
    }
}


export const fetchAssignedStaffsOfEventByStaffService = async (eventId: number) => {
    const response = await getStaffOfEventStaffApi(eventId);
    const rawData = response?.data;

    if (!rawData.status || !rawData.data) {
        throw new Error(rawData.message || "Failed to fetch assigned staffs");
    }

    const { assignments, staffIds } = rawData.data;
    const allStaffDtos: StaffDto[] = [];
    const allStaffItems: OwnerStaffListItem[] = [];

    for (const assignment of assignments) {
        // Map role staff to Model
        const roleStaffModel: RoleStaffModel = mapToRoleStaffModel(assignment.roleStaff);

        // Map user to UserModel
        const staffModel: UserModel = mapToStaffModel(assignment.user);

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

    return { 
        allStaffItems, 
        allStaffDtos,
        assignedStaffIds: staffIds 
    };
}