import type { PermissionModel } from "../models/bean/permission-models";

export const mapToPermissionModel = (raw: any) : PermissionModel => ({
    id: raw.id,
    createAt: new Date(raw.createAt),
    updateAt: new Date(raw.updateAt),
    name: raw.name,
    description: raw.description ?? null,
    isActive: raw.isActive,
});