import type { Staff } from "../bean/staff-models"

export interface AssignMemberModalProps {
    availableMembers: Staff[]
    onAssign: (member: Staff) => void
    onClose: () => void
    isLoading?: boolean
}

export interface InviteUserModalProps {
  onClose: () => void
}