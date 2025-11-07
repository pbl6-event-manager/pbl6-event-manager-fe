export interface RoleFormModel {
    id: number, 
    name: string,
    description: string,
    permissions: string[],
    isCustom: boolean
}