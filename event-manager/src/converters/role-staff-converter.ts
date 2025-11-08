import type { RoleStaffDto } from "../dtos/role-staff-dto";

export const convertToRoleStaffModelToDto = (role: any): RoleStaffDto => ({
    id: role.id,
    name: role.name,
    description: role.description,
    //permissions: role.permissions,
    ownerId: role.ownerId
});