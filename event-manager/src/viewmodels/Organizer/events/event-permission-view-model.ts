import { useCallback, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { usePermission } from "../../../hooks/usePermission"
import { usePermissionCheck } from "../../../hooks/usePermissionCheck"
import { PERMISSIONS, STEP_PERMISSION_MAP, MENU_PERMISSION_MAP } from "../../../constants/permission"

export const useEventPermissionViewModel = () => {
    const { eventId: eventIdParam } = useParams<{ eventId: string }>()
    const eventId = eventIdParam ? parseInt(eventIdParam, 10) : null

    const {
        isOwner,
        isStaff,
        isLoading,
        error,
        permissions,
        roleStaffName,
        // permissionData,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
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
    } = usePermission({ eventId, autoLoad: true })

    // Permission check hook for toast notifications
    const { checkAndAllow, checkAnyAndAllow, showPermissionDenied } = usePermissionCheck({
        isOwner,
        hasPermission,
        hasAnyPermission,
        defaultDeniedMessage: "You don't have permission to perform this action on this event",
    })
    // Reload permissions when eventId changes
    useEffect(() => {
        if (eventId) {
            loadPermissions()
        }
    }, [eventId, loadPermissions])

    // Check if user can access a specific step
    const canAccessStep = useCallback(
        (stepId: number): boolean => {
            if (isOwner) return true

            const requiredPermissions = STEP_PERMISSION_MAP[stepId]
            if (!requiredPermissions || requiredPermissions.length === 0) return true

            return hasAnyPermission(requiredPermissions)
        },
        [isOwner, hasAnyPermission],
    )

    // Check if user can access a specific menu item
    const canAccessMenuItem = useCallback(
        (menuItemId: string): boolean => {
            if (isOwner) return true

            const requiredPermissions = MENU_PERMISSION_MAP[menuItemId]
            if (!requiredPermissions || requiredPermissions.length === 0) return true

            return hasAnyPermission(requiredPermissions)
        },
        [isOwner, hasAnyPermission],
    )

    // Check step permission with toast
    const checkStepPermission = useCallback(
        (stepId: number, action?: () => void): boolean => {
            if (isOwner) {
                action?.()
                return true
            }

            const requiredPermissions = STEP_PERMISSION_MAP[stepId]
            if (!requiredPermissions || requiredPermissions.length === 0) {
                action?.()
                return true
            }

            return checkAnyAndAllow(requiredPermissions, action)
        },
        [isOwner, checkAnyAndAllow],
    )

    // Check menu item permission with toast
    const checkMenuItemPermission = useCallback(
        (menuItemId: string, action?: () => void): boolean => {
            if (isOwner) {
                action?.()
                return true
            }

            const requiredPermissions = MENU_PERMISSION_MAP[menuItemId]
            if (!requiredPermissions || requiredPermissions.length === 0) {
                action?.()
                return true
            }

            return checkAnyAndAllow(requiredPermissions, action)
        },
        [isOwner, checkAnyAndAllow],
    )

    // Get permission info for display
    const permissionInfo = useMemo(() => {
        return {
            isOwner,
            isStaff,
            roleStaffName,
            permissionCount: permissions.length,
            permissionNames: permissions.map((p) => p.name),
        }
    }, [isOwner, isStaff, roleStaffName, permissions])

    return {
        // State
        eventId,
        isOwner,
        isStaff,
        isLoading,
        error,
        permissions,
        roleStaffName,
        permissionInfo,

        // Permission checks (boolean)
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
        canAccessStep,
        canAccessMenuItem,

        // Permission check functions
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,

        // Permission check with toast
        checkAndAllow,
        checkAnyAndAllow,
        checkStepPermission,
        checkMenuItemPermission,
        showPermissionDenied,

        // Actions
        loadPermissions,
        refreshPermissions,

        // Constants for use in components
        PERMISSIONS,
    }
}

