import type React from "react"
import { useCallback } from "react"
import { toast } from "sonner"
import type { PermissionName } from "../../constants/permission"
import { PERMISSION_LABELS } from "../../constants/permission"

interface PermissionGateProps {
  children: React.ReactNode
  requiredPermission?: PermissionName | string
  requiredPermissions?: (PermissionName | string)[]
  requireAll?: boolean // If true, requires all permissions; if false, requires any
  isOwner: boolean
  hasPermission: (name: PermissionName | string) => boolean
  hasAnyPermission?: (names: (PermissionName | string)[]) => boolean
  hasAllPermissions?: (names: (PermissionName | string)[]) => boolean
  fallback?: React.ReactNode // Optional fallback to render when permission denied
  hideWhenDenied?: boolean // If true, hides children completely when denied
  showToast?: boolean // If true, shows toast on permission denied
  customDeniedMessage?: string
  disabled?: boolean // Additional disabled state
  className?: string
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  requiredPermission,
  requiredPermissions,
  requireAll = false,
  isOwner,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  fallback,
  hideWhenDenied = false,
  showToast = true,
  customDeniedMessage,
  disabled = false,
  className,
}) => {
  // Check if user has required permissions
  const checkPermissions = useCallback((): boolean => {
    // Owner always has permission
    if (isOwner) return true

    // Single permission check
    if (requiredPermission) {
      return hasPermission(requiredPermission)
    }

    // Multiple permissions check
    if (requiredPermissions && requiredPermissions.length > 0) {
      if (requireAll) {
        return hasAllPermissions?.(requiredPermissions) ?? requiredPermissions.every((p) => hasPermission(p))
      } else {
        return hasAnyPermission?.(requiredPermissions) ?? requiredPermissions.some((p) => hasPermission(p))
      }
    }

    // No permissions required
    return true
  }, [isOwner, requiredPermission, requiredPermissions, requireAll, hasPermission, hasAnyPermission, hasAllPermissions])

  const isAllowed = checkPermissions()

  // Show toast notification for permission denied
  const showDeniedToast = useCallback(() => {
    if (!showToast) return

    const permissionName = requiredPermission || requiredPermissions?.[0]
    const permissionLabel = permissionName ? PERMISSION_LABELS[permissionName] || permissionName : null

    const message = customDeniedMessage
      ? customDeniedMessage
      : permissionLabel
        ? `You need "${permissionLabel}" permission to perform this action`
        : "You don't have permission to perform this action"

    toast.error("Permission Denied", {
      description: message,
      duration: 4000,
    })
  }, [showToast, requiredPermission, requiredPermissions, customDeniedMessage])

  // Handle click interception
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !isAllowed) {
        e.preventDefault()
        e.stopPropagation()
        showDeniedToast()
        return false
      }
    },
    [disabled, isAllowed, showDeniedToast],
  )

  // If should hide when denied, return null or fallback
  if (hideWhenDenied && !isAllowed) {
    return fallback ? <>{fallback}</> : null
  }

  // Wrap children with click interceptor
  return (
    <div
      className={className}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && (disabled || !isAllowed)) {
          e.preventDefault()
          e.stopPropagation()
          showDeniedToast()
        }
      }}
      style={{ display: "contents" }} // Preserve layout
    >
      {children}
    </div>
  )
}
