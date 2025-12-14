//Definition of permission constants used across the Event Manager application

// Permission name constants
export const PERMISSIONS = {
    VIEW_EVENT: "VIEW_EVENT",
    UPDATE_EVENT: "UPDATE_EVENT",
    DELETE_EVENT: "DELETE_EVENT",
    PUBLISH_EVENT: "PUBLISH_EVENT",
    CREATE_TICKETS: "CREATE_TICKETS",
    UPDATE_TICKETS: "UPDATE_TICKETS",
    DELETE_TICKETS: "DELETE_TICKETS",
    // Future permissions can be added here
    // MANAGE_ATTENDEES: "MANAGE_ATTENDEES",
    // MANAGE_VOUCHERS: "MANAGE_VOUCHERS",
    // VIEW_ANALYTICS: "VIEW_ANALYTICS",
}

export type PermissionName = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

// Permission interface matching database structure
export interface Permission {
  id: number
  name: PermissionName | string
  description: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface StaffEventPermission {
    eventId: number;
    userId: number;
    roleStaffId: number;
    roleStaffName: string;
    permissions: Permission[];
}

// Map permission names to UI-friendly labels
export const PERMISSION_LABELS: Record<string, string> = {
  [PERMISSIONS.VIEW_EVENT]: "View Event",
  [PERMISSIONS.UPDATE_EVENT]: "Update Event",
  [PERMISSIONS.DELETE_EVENT]: "Delete Event",
  [PERMISSIONS.PUBLISH_EVENT]: "Publish Event",
  [PERMISSIONS.CREATE_TICKETS]: "Create Tickets",
  [PERMISSIONS.UPDATE_TICKETS]: "Update Tickets",
  [PERMISSIONS.DELETE_TICKETS]: "Delete Tickets",
}

// Map permissions to event sidebar menu items
export const MENU_PERMISSION_MAP: Record<string, PermissionName[]> = {
  "dashboard": [PERMISSIONS.VIEW_EVENT],
  "team-management": [PERMISSIONS.UPDATE_EVENT, PERMISSIONS.VIEW_EVENT],
  "manage-attendee": [PERMISSIONS.VIEW_EVENT],
  "discount": [PERMISSIONS.UPDATE_EVENT],
}

// Map permissions to event steps
export const STEP_PERMISSION_MAP: Record<number, PermissionName[]> = {
  1: [PERMISSIONS.VIEW_EVENT, PERMISSIONS.UPDATE_EVENT], // Build event page
  2: [PERMISSIONS.CREATE_TICKETS, PERMISSIONS.UPDATE_TICKETS, PERMISSIONS.DELETE_TICKETS], // Add tickets
  3: [PERMISSIONS.PUBLISH_EVENT, PERMISSIONS.VIEW_EVENT], // Publish
}

// Check if user is owner of event (has all permissions)
export const isEventOwner = (permissions: Permission[]): boolean => {
  const requiredPermissions = Object.values(PERMISSIONS)
  const userPermissionNames = permissions.map((p) => p.name)
  return requiredPermissions.every((p) => userPermissionNames.includes(p))
}

// Check if user has specific permission
export const hasPermission = (permissions: Permission[], permissionName: PermissionName | string): boolean => {
  return permissions.some((p) => p.name === permissionName && p.isActive !== false)
}

// Check if user has any of the specified permissions
export const hasAnyPermission = (permissions: Permission[], permissionNames: (PermissionName | string)[]): boolean => {
  return permissionNames.some((name) => hasPermission(permissions, name))
}

// Check if user has all of the specified permissions
export const hasAllPermissions = (permissions: Permission[], permissionNames: (PermissionName | string)[]): boolean => {
  return permissionNames.every((name) => hasPermission(permissions, name))
}