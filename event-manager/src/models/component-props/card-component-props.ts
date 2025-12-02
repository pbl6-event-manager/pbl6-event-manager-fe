import type { ListUserDto } from "../../dtos/user-dto";
import type { VoucherListDto } from "../../dtos/voucher-dto";
import type { EventFormData, GoodToKnowData, MediaFileModel } from "../form-models/event-form-models";
//#region Card Props

export interface UserInformationCardProps {
  user: ListUserDto;
  onEdit: (email: string) => void;
  onChangeStatus: (email: string) => void;
}

export interface EventCardProps {
  eventData: EventFormData
  onUpdate: (data: EventFormData) => void
}

export interface GoodToKnowCardProps {
    data: GoodToKnowData
    onUpdate: (data: GoodToKnowData) => void
}

export interface MediaUploadCardProps {
  uploadedMedia: MediaFileModel[]
  onUpdate: (files: MediaFileModel[]) => void
}

export interface OverviewCardProps {
  description: string
  onUpdate: (description: string) => void
}

export interface EventCategoryCardProps {
    selectedCategoryIds?: number[]
    onCategoryChange?: (categoryIds: number[]) => void
}

export interface EventPreviewCardProps {
    eventData: EventFormData,
    mediaFile?: MediaFileModel[]
}

export interface VoucherCardProps {
  voucher: VoucherListDto
  onDelete: (id: number) => void
  onCopy: (code: string) => void
  isDeleting?: boolean
}
//#endregion