export interface RoleStaffFormModel {
    id: number, 
    name: string,
    description: string,
    permissions: string[],
    isCustom: boolean
}

export interface RoleStaffListItem {
    id: number,
    name: string,
    description: string,
}