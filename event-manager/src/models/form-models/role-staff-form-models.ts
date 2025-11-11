export interface RoleStaffFormModel {
    id: number, 
    name: string,
    description: string,
    permissions: number[],
    isCustom: boolean
}

export interface RoleStaffListItem {
    id: number,
    name: string,
    description: string,
}

export interface CreateRoleStaffFormData {
    name: string,
    description: string,
    permissionIds: number[],
}

export interface UpdateRoleStaffFormData extends CreateRoleStaffFormData {
    id: number
}