import type React from "react"
import { forwardRef, useCallback } from "react"
import { toast } from "sonner"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import type { PermissionName } from "../../constants/permission"
import { PERMISSION_LABELS } from "../../constants/permission"

interface PermissionMenuItemProps {
  children: React.ReactNode
  requiredPermission?: PermissionName | string
  requiredPermissions?: (PermissionName | string)[]
  requireAll?: boolean
  isOwner: boolean
  hasPermission: (name: PermissionName | string) => boolean
  hasAnyPermission?: (names: (PermissionName | string)[]) => boolean
  hasAllPermissions?: (names: (PermissionName | string)[]) => boolean
  onClick?: (e: React.MouseEvent) => void
  showToast?: boolean
  customDeniedMessage?: string
  className?: string
  disabled?: boolean
}

export const PermissionMenuItem = forwardRef<HTMLDivElement, PermissionMenuItemProps>(
  (
    {
      children,
      requiredPermission,
      requiredPermissions,
      requireAll = false,
      isOwner,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      onClick,
      showToast = true,
      customDeniedMessage,
      className,
      disabled,
    },
    ref,
  ) => {
    // Check if user has required permissions
    const checkPermissions = useCallback((): boolean => {
      if (isOwner) return true

      if (requiredPermission) {
        return hasPermission(requiredPermission)
      }

      if (requiredPermissions && requiredPermissions.length > 0) {
        if (requireAll) {
          return hasAllPermissions?.(requiredPermissions) ?? requiredPermissions.every((p) => hasPermission(p))
        } else {
          return hasAnyPermission?.(requiredPermissions) ?? requiredPermissions.some((p) => hasPermission(p))
        }
      }

      return true
    }, [
      isOwner,
      requiredPermission,
      requiredPermissions,
      requireAll,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
    ])

    // Show toast for permission denied
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

    // Handle click with permission check
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        const isAllowed = checkPermissions()

        if (!isAllowed) {
          e.preventDefault()
          e.stopPropagation()
          showDeniedToast()
          return
        }

        onClick?.(e)
      },
      [checkPermissions, showDeniedToast, onClick],
    )

    return (
      <DropdownMenuItem ref={ref} onClick={handleClick} className={className} disabled={disabled}>
        {children}
      </DropdownMenuItem>
    )
  },
)

PermissionMenuItem.displayName = "PermissionMenuItem"
