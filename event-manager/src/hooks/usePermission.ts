import { useCallback, useEffect, useState } from "react"
import type { Permission, PermissionName, StaffEventPermission } from "../constants/permission"
import { hasPermission, hasAnyPermission, hasAllPermissions, PERMISSIONS } from "../constants/permission"
import { getMyEventPermissionService } from "../service/event-staff-permission-service"

interface UsePermissionOptions {
    eventId: number | null
    autoLoad?: boolean
}

interface UsePermissionReturn {
    //state
    isOwner: boolean
    isStaff: boolean
    isLoading: boolean
    error: string | null
    permissions: Permission[]
    roleStaffName: string | null
    permissionData: StaffEventPermission | null

    // Permission check
    hasPermission: (permissionName: PermissionName | string) => boolean
    hasAnyPermission: (permissionNames: (PermissionName | string)[]) => boolean
    hasAllPermissions: (permissionNames: (PermissionName | string)[]) => boolean
    canViewEvent: boolean
    canViewEventStaff: boolean
    canViewAttendees: boolean
    canViewOrder: boolean
    canViewEventVouchers: boolean
    canEditEvent: boolean
    canDeleteEvent: boolean
    canPublishEvent: boolean
    canCreateTickets: boolean
    canUpdateTickets: boolean
    canDeleteTickets: boolean
    canAssignStaff: boolean
    canCheckInAttendees: boolean

    //Actions
    loadPermissions: () => Promise<void>
    refreshPermissions: () => Promise<void>
}

export const usePermission = ({ eventId, autoLoad = true }: UsePermissionOptions): UsePermissionReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [permissionData, setPermissionData] = useState<StaffEventPermission | null>(null)

    const loadPermissions = useCallback(async () => {
    if (!eventId) return

    setIsLoading(true)
    setError(null)

    try {
        const result = await getMyEventPermissionService(eventId)
        
        // result = null có nghĩa:
        // - User không có assignment (404)
        // - User không có quyền xem (403)  
        // - No assignments found
        // Đây KHÔNG phải là error, chỉ là user không có quyền
        setPermissionData(result)
        
        console.log("[usePermission] Permission data loaded:", result)
        
    } catch (err: any) {
        // Chỉ những lỗi thực sự (500, network, etc.) mới vào đây
        console.error("[usePermission] Error loading permissions:", err)
        setError(err.message || "Failed to load permissions")
        setPermissionData(null)
    } finally {
        setIsLoading(false)
    }
}, [eventId])

    const refreshPermissions = useCallback(async () => {
        await loadPermissions()
    }, [loadPermissions])

    // Auto-load permissions when eventId changes
    useEffect(() => {
        if (autoLoad && eventId) {
            loadPermissions()
        }
    }, [autoLoad, eventId, loadPermissions])

    // Derived state
    const isOwner = permissionData?.roleStaffName === "Owner"
    const isStaff = !isOwner && permissionData !== null
    const permissions = permissionData?.permissions || []
    const roleStaffName = permissionData?.roleStaffName || null

    // Permission check functions
    const checkPermission = useCallback(
        (permissionName: PermissionName | string): boolean => {
            if (isOwner) return true
            return hasPermission(permissions, permissionName)
        },
        [isOwner, permissions],
    )
    const checkAnyPermission = useCallback(
        (permissionNames: (PermissionName | string)[]): boolean => {
            if (isOwner) return true
            return hasAnyPermission(permissions, permissionNames)
        },
        [isOwner, permissions],
    )
    const checkAllPermissions = useCallback(
        (permissionNames: (PermissionName | string)[]): boolean => {
            if (isOwner) return true
            return hasAllPermissions(permissions, permissionNames)
        },
        [isOwner, permissions],
    )

    // Pre-computed permission checks
    const canViewEvent = isOwner || hasPermission(permissions, PERMISSIONS.VIEW_EVENT)
    const canViewEventStaff = isOwner || hasPermission(permissions, PERMISSIONS.VIEW_EVENT_STAFF)
    const canViewAttendees = isOwner || hasPermission(permissions, PERMISSIONS.VIEW_ATTENDEES)
    const canViewOrder = isOwner || hasPermission(permissions, PERMISSIONS.VIEW_ORDER)
    const canViewEventVouchers = isOwner || hasPermission(permissions, PERMISSIONS.VIEW_EVENT_VOUCHERS)
    const canEditEvent = isOwner || hasPermission(permissions, PERMISSIONS.UPDATE_EVENT)
    const canDeleteEvent = isOwner || hasPermission(permissions, PERMISSIONS.DELETE_EVENT)
    const canPublishEvent = isOwner || hasPermission(permissions, PERMISSIONS.PUBLISH_EVENT)
    const canCreateTickets = isOwner || hasPermission(permissions, PERMISSIONS.CREATE_TICKETS)
    const canUpdateTickets = isOwner || hasPermission(permissions, PERMISSIONS.UPDATE_TICKETS)
    const canDeleteTickets = isOwner || hasPermission(permissions, PERMISSIONS.DELETE_TICKETS)
    const canAssignStaff = isOwner || hasPermission(permissions, PERMISSIONS.ASSIGN_STAFF)
    const canCheckInAttendees = isOwner || hasPermission(permissions, PERMISSIONS.CHECK_IN_ATTENDEES)

    return {
        isOwner,
        isStaff,
        isLoading,
        error,
        permissions,
        roleStaffName,
        permissionData,
        hasPermission: checkPermission,
        hasAnyPermission: checkAnyPermission,
        hasAllPermissions: checkAllPermissions,
        canViewEvent,
        canViewEventStaff,
        canViewAttendees,
        canViewOrder,
        canViewEventVouchers,
        canEditEvent,
        canDeleteEvent,
        canPublishEvent,
        canCreateTickets,
        canUpdateTickets,
        canDeleteTickets,
        canAssignStaff,
        canCheckInAttendees,
        loadPermissions,
        refreshPermissions,
    }
}