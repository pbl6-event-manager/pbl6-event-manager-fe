import type { UserModel } from "../models/bean/user-models";

export const mapToStaffModel = (raw: any) : UserModel => ({
    id: raw.id,
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
    phone: raw.phone,
    isActive: true,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
});