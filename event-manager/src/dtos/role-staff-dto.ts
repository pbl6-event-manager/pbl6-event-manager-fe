export interface RoleStaffDto {
    id: number,
    name: string,
    description: string,
    //permissions: number[],
    ownerId: number
}

export interface CreateRoleStaffRequestDto {
    name: string,
    description: string,
    permissions: number[],
}

export interface CreateRoleStaffResponseDto {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    description: string,
    ownerId: number,
    permissions: {
        id: number,
        createdAt: Date,
        updatedAt: Date,
        name: string,
        description: string
        isActive: boolean
    }[]
}