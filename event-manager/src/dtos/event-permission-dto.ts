import type { PermissionModel } from "../models/bean/permission-models";

export interface EventPermissionDto {
    eventId: number;
    userId: number;
    isOwner: boolean;
    roleStaffId?: number;
    roleStaffName?: string;
    permissions: PermissionModel[];
}

export interface StaffPermissionListDto {
    staffId: number;
    staffName: string;
    staffEmail: string;
    roleStaffId: number;
    roleStaffName: string;
    permissions: PermissionModel[];
}