import type React from "react";
import { Badge } from "../ui/badge";
import { Shield, ShieldCheck, ShieldX } from "lucide-react";

interface PermissionBadgeProps {
  isOwner: boolean
  roleStaffName?: string | null
  isLoading?: boolean
  className?: string
  showIcon?: boolean
}


export const PermissionBadge: React.FC<PermissionBadgeProps> = ({
  isOwner,
  roleStaffName,
  isLoading = false,
  className = "",
  showIcon = true,
}) => {
  if (isLoading) {
    return (
      <Badge variant="secondary" className={`animate-pulse ${className}`}>
        <Shield className="h-3 w-3 mr-1" />
        Loading...
      </Badge>
    )
  }

  if (isOwner) {
    return (
      <Badge variant="default" className={`bg-blue-600 hover:bg-blue-700 ${className}`}>
        {showIcon && <ShieldCheck className="h-3 w-3 mr-1" />}
        Owner
      </Badge>
    )
  }

  if (roleStaffName) {
    return (
      <Badge variant="secondary" className={`bg-green-100 text-green-700 ${className}`}>
        {showIcon && <Shield className="h-3 w-3 mr-1" />}
        {roleStaffName}
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className={`bg-gray-100 text-gray-600 ${className}`}>
      {showIcon && <ShieldX className="h-3 w-3 mr-1" />}
      No Access
    </Badge>
  )
}
