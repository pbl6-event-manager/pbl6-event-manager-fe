import type { RolStaffModel } from "../models/bean/role-staff-models";

export const mapToRoleStaffModel = (raw: any) : RolStaffModel => ({
    id: raw.id,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    name: raw.name,
    description: raw.description ?? null,
    ownerId: raw.ownerId,
});