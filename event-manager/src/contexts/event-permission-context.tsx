import type React from "react";
import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import type { Permission, StaffEventPermission, PermissionName } from "../constants/permission";
import { hasPermission, hasAnyPermission, hasAllPermissions, PERMISSIONS } from "../constants/permission";
import { getMyEventPermissionService, getAllPermissionsService } from "../service/event-staff-permission-service";


interface EventPermissionContextType {
  // Current permission state
  eventId: number | null;
  isOwner: boolean;
  isStaff: boolean;
  isLoading: boolean; 
  error: string | null;
  permissions: Permission[];
  allSystemPermissions: Permission[];
  roleStaffName: string | null;

  // Permission check functions
  hasPermission: (permissionName: PermissionName | string) => boolean;
  hasAnyPermission: (permissionNames: (PermissionName | string)[]) => boolean;
  hasAllPermissions: (permissionNames: (PermissionName | string)[]) => boolean;
  canViewEvent: () => boolean;
  canViewEventStaff: () => boolean;
  canViewAttendees: () => boolean;
  canViewOrder: () => boolean;
  canViewEventVouchers: () => boolean;
  canEditEvent: () => boolean;
  canDeleteEvent: () => boolean;
  canPublishEvent: () => boolean;
  canCreateTickets: () => boolean;
  canUpdateTickets: () => boolean;
  canDeleteTickets: () => boolean;
  canAssignStaff: () => boolean
  canCheckInAttendees: () => boolean;
  // Actions
  loadPermissions: (eventId: number, isEventOwner?: boolean) => Promise<void>
  clearPermissions: () => void;
  refreshPermissions: () => Promise<void>;
  loadAllSystemPermissions: () => Promise<void>;
}

const EventPermissionContext = createContext<EventPermissionContextType | undefined>(undefined);

interface EventPermissionProviderProps {
  children: React.ReactNode;
  initialEventId?: number;
  initialIsOwner?: boolean; // Allow passing ownership from parent
}

export const EventPermissionProvider: React.FC<EventPermissionProviderProps> = ({
  children,
  initialEventId,
  initialIsOwner = false,
}) => {
  const [eventId, setEventId] = useState<number | null>(initialEventId ?? null)
  const [isOwner, setIsOwner] = useState<boolean>(initialIsOwner)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [permissionData, setPermissionData] = useState<StaffEventPermission | null>(null)
  const [allSystemPermissions, setAllSystemPermissions] = useState<Permission[]>([])

  const loadAllSystemPermissions = useCallback(async () => {
    try {
      const permissions = (await getAllPermissionsService()).permissions
      setAllSystemPermissions(permissions)
    } catch (err: any) {
      console.error("[EventPermissionContext] Error loading system permissions:", err)
    }
  }, [])

  const loadPermissions = useCallback(
    async (targetEventId: number, isEventOwner = false) => {
      if (!targetEventId) return

      setIsLoading(true)
      setError(null)

      try {
        // If user is owner, they have all permissions - no need to call assignment API
        if (isEventOwner) {
          setEventId(targetEventId)
          setIsOwner(true)
          setPermissionData(null) // Owner doesn't need staff permission data

          // Load all system permissions for owner
          if (allSystemPermissions.length === 0) {
            await loadAllSystemPermissions()
          }
        } else {
          // User is staff - fetch their assignment permissions
          const result = await getMyEventPermissionService(targetEventId)
          setEventId(targetEventId)

          if (result) {
            setPermissionData(result)
            setIsOwner(false)
          } else {
            // No assignment found - might be owner or no access
            // Caller should have provided isEventOwner flag correctly
            setPermissionData(null)
            setIsOwner(false)
          }
        }
      } catch (err: any) {
        console.error("[EventPermissionContext] Error loading permissions:", err)
        setError(err.message || "Failed to load permissions")
        setPermissionData(null)
        setIsOwner(false)
      } finally {
        setIsLoading(false)
      }
    },
    [allSystemPermissions.length, loadAllSystemPermissions],
  )

  // Clear permissions (when leaving event context)
  const clearPermissions = useCallback(() => {
    setEventId(null)
    setPermissionData(null)
    setIsOwner(false)
    setError(null)
  }, [])

  // Refresh current event permissions
  const refreshPermissions = useCallback(async () => {
    if (eventId) {
      await loadPermissions(eventId, isOwner)
    }
  }, [eventId, isOwner, loadPermissions])

  // Load initial permissions if eventId provided
  useEffect(() => {
    if (initialEventId) {
      loadPermissions(initialEventId, initialIsOwner)
    }
  }, [initialEventId, initialIsOwner, loadPermissions])

  const permissions = useMemo(() => {
    if (isOwner) {
      return allSystemPermissions
    }
    return permissionData?.permissions || []
  }, [isOwner, allSystemPermissions, permissionData])

  const roleStaffName = useMemo(() => {
    if (isOwner) return "Owner"
    return permissionData?.roleStaffName || null
  }, [isOwner, permissionData])

  const isStaff = useMemo(() => !isOwner && permissionData !== null, [isOwner, permissionData])

  const checkPermission = useCallback(
    (permissionName: PermissionName | string): boolean => {
      // Owner has all permissions
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

  const canViewEvent = useCallback(() => checkPermission(PERMISSIONS.VIEW_EVENT), [checkPermission])
  const canViewEventStaff = useCallback(() => checkPermission(PERMISSIONS.VIEW_EVENT_STAFF), [checkPermission])
  const canViewAttendees = useCallback(() => checkPermission(PERMISSIONS.VIEW_ATTENDEES), [checkPermission])
  const canViewOrder = useCallback(() => checkPermission(PERMISSIONS.VIEW_ORDER), [checkPermission])
  const canViewEventVouchers = useCallback(() => checkPermission(PERMISSIONS.VIEW_EVENT_VOUCHERS), [checkPermission])
  const canEditEvent = useCallback(() => checkPermission(PERMISSIONS.UPDATE_EVENT), [checkPermission])
  const canDeleteEvent = useCallback(() => checkPermission(PERMISSIONS.DELETE_EVENT), [checkPermission])
  const canPublishEvent = useCallback(() => checkPermission(PERMISSIONS.PUBLISH_EVENT), [checkPermission])
  const canCreateTickets = useCallback(() => checkPermission(PERMISSIONS.CREATE_TICKETS), [checkPermission])
  const canUpdateTickets = useCallback(() => checkPermission(PERMISSIONS.UPDATE_TICKETS), [checkPermission])
  const canDeleteTickets = useCallback(() => checkPermission(PERMISSIONS.DELETE_TICKETS), [checkPermission])
  const canAssignStaff = useCallback(() => checkPermission(PERMISSIONS.ASSIGN_STAFF), [checkPermission])
  const canCheckInAttendees = useCallback(() => checkPermission(PERMISSIONS.CHECK_IN_ATTENDEES), [checkPermission])

  const contextValue: EventPermissionContextType = {
    eventId,
    isOwner,
    isStaff,
    isLoading,
    error,
    permissions,
    allSystemPermissions,
    roleStaffName,
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
    clearPermissions,
    refreshPermissions,
    loadAllSystemPermissions,
  }
  return <EventPermissionContext.Provider value={contextValue}>{children}</EventPermissionContext.Provider>
}

// Hook to use event permission context
export const useEventPermission = (): EventPermissionContextType => {
  const context = useContext(EventPermissionContext)
  if (context === undefined) {
    throw new Error("useEventPermission must be used within an EventPermissionProvider")
  }
  return context
}