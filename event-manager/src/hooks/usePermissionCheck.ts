import { useCallback } from "react"
import { toast } from "sonner"
import type { PermissionName } from "../constants/permission"
import { PERMISSION_LABELS } from "../constants/permission"

interface UsePermissionCheckOptions {
    isOwner: boolean
    hasPermission: (name: PermissionName | string) => boolean
    hasAnyPermission: (names: (PermissionName | string)[]) => boolean
    defaultDeniedMessage?: string
}

interface UsePermissionCheckReturn {
    checkAndAllow: (permissionName: PermissionName | string, action?: () => void) => boolean
    checkAnyAndAllow: (permissionNames: (PermissionName | string)[], action?: () => void) => boolean
    showPermissionDenied: (requiredPermission?: string) => void
}

export const usePermissionCheck = ({
    isOwner,
    hasPermission,
    hasAnyPermission,
    defaultDeniedMessage = "You do not have permission to perform this action.",
}: UsePermissionCheckOptions): UsePermissionCheckReturn => {
    const showPermissionDenied = useCallback((requiredPermission?: string) => {
        const permisisonLabel = requiredPermission ? PERMISSION_LABELS[requiredPermission] || requiredPermission : null
        const message = permisisonLabel ?
            `You need the "${permisisonLabel}" permission to perform this action.` :
            defaultDeniedMessage
        toast.error("Permission Denied", {
            description: message,
            duration: 4000,
        })
    }, [defaultDeniedMessage])
    const checkAndAllow = useCallback((permissionName: PermissionName | string, action?: () => void): boolean => {
        // Owner always has permission
        if (isOwner) {
            action?.()
            return true
        }

        // Check if user has the permission
        if (hasPermission(permissionName)) {
            action?.()
            return true
        }

        // Permission denied
        showPermissionDenied(permissionName)
        return false
    }, [isOwner, hasPermission, showPermissionDenied])

    const checkAnyAndAllow = useCallback(
        (permissionNames: (PermissionName | string)[], action?: () => void): boolean => {
            if (isOwner) {
                action?.()
                return true
            }

            if (hasAnyPermission(permissionNames)) {
                action?.()
                return true
            }

            // Show first required permission in the error
            showPermissionDenied(permissionNames[0])
            return false
        },
        [isOwner, hasAnyPermission, showPermissionDenied],
    )
    
    return {
        checkAndAllow,
        checkAnyAndAllow,
        showPermissionDenied,
    }
}