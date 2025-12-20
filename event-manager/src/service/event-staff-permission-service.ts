import { getAllPermissions } from "../api/permission-api";
import { getEventAssignmentApi } from "../api/owner-staff-api";
import { convertPermissionModelToDto } from "../converters/permission-converter";
import { mapToPermissionModel } from "../mappers/permission-mapper";
import type { EventAssignmentApiDto } from "../dtos/event-permisison-dto";

export const getAllPermissionsService = async () => {
    try {
        const response = await getAllPermissions();
        const rawList = response?.data?.data ?? [];

        const permissions = Array.isArray(rawList)
            ? rawList.map((raw: any) => mapToPermissionModel(raw)).filter(Boolean)
            : [];
        const permissionDtos = permissions.map((perm: any) => convertPermissionModelToDto(perm)).sort((a: any, b: any) => a.id - b.id);;

        return { permissionDtos, permissions };
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const getMyEventPermissionService = async (eventId: number) => {
    try {
        const response = await getEventAssignmentApi(eventId);
        if (response.data.status && response.data.message === "success") {
            const assignments: EventAssignmentApiDto[] = response.data.data;
            if (!assignments || assignments.length === 0) {
                return null
            }
            const assignment = assignments[0];
            console.log("Event Assignment Data:", assignment);
            const permissions = (assignment.roleStaff.permissions || []).map((p: any) => ({
                id: p.id,
                name: p.name,
                description: p.description,
                isActive: p.isActive,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt,
            }))
            const responseData = {
                eventId,
                userId: assignment.staffId,
                roleStaffId: assignment.roleStaffId,
                roleStaffName: assignment.roleStaff.name,
                permissions,
            }
            console.log("Event Permission Data:", responseData);
            return responseData;
        } else {
            return null; // Unexpected response format
        }
    } catch (error: any) {
        // 404 = User không có assignment trong event này
        // Đây là trường hợp hợp lệ, không phải error
        if (error.response?.status === 404) {
            console.log("[Permission Service] No assignment found (404) for event:", eventId);
            return null; // Return null, không throw error
        }
        
        // 403 = User không có quyền xem assignment
        if (error.response?.status === 403) {
            console.log("[Permission Service] Forbidden (403) for event:", eventId);
            return null; // Return null, không throw error
        }
        
        // Các lỗi khác (500, network error, etc.) vẫn throw
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}