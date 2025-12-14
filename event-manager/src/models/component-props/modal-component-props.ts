import type { OrderListDto } from "../../dtos/order-dto"
import type { OrderModel } from "../bean/order-models"
import type { OwnerStaffListItem } from "../form-models/staff-form-models"

export interface AssignMemberModalProps {
    availableMembers: OwnerStaffListItem[]
    isStaffAssigned: (staffId: number) => boolean
    onToggleStaff: (staffId: number) => void
    onSave: () => void
    onClose: () => void
    isLoading?: boolean
    hasChanges?: boolean
}

export interface OrderDetailsAdminSiteProps {
  open: boolean;
  order?: OrderModel | null;
  loading?: boolean;
  onClose: () => void;
};

export interface OrderDetailsOrgSiteProps {
  order: OrderListDto;
  onClose: () => void;
}

// export interface InviteUserModalProps {
//   onClose: () => void
//}