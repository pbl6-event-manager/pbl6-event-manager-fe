export interface PermissionApiDto {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string
  isActive: boolean
}

export interface RoleStaffApiDto {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string
  ownerId: number
  permissions: PermissionApiDto[]
}

export interface EventAssignmentApiDto {
  id: number
  createdAt: string
  updatedAt: string
  ownerId: number
  staffId: number
  roleStaffId: number
  roleStaff: RoleStaffApiDto
  permissions: string[] // Array of permission names like ["CREATE_TICKETS", "VIEW_EVENT"]
}