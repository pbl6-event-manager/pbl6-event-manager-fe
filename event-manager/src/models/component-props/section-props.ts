import type { DashboardOrderStatsDto } from "../../dtos/order-dto";
import type { DashboardTicketInfoDto, TicketDto } from "../../dtos/ticket-dto";
import type { EventFormData, MediaFileModel } from "../../models/form-models/event-form-models"
import type { MediaUploadCardHandle } from "../../components/Organizer/media-upload-card"
import type { EventTitleCardHandle } from "../../components/Organizer/event-title-card"
import type { DateLocationCardHandle } from "../../components/Organizer/date-location-card"
import type { OverviewCardHandle } from "../../components/Organizer/overview-card"

export interface EditEventInfoPageProps {
  // Card refs
  mediaCardRef: React.RefObject<MediaUploadCardHandle | null>
  titleCardRef: React.RefObject<EventTitleCardHandle | null>
  dateLocationCardRef: React.RefObject<DateLocationCardHandle | null>
  overviewCardRef: React.RefObject<OverviewCardHandle | null>

  // Input refs
  mediaRef: React.RefObject<HTMLInputElement | null>
  titleRef: React.RefObject<HTMLInputElement | null>
  dateTimeRef: React.RefObject<HTMLInputElement | null>
  locationRef: React.RefObject<HTMLButtonElement | null>
  overviewRef: React.RefObject<HTMLTextAreaElement | null>

  // Data
  eventData: EventFormData
  uploadedMedia: MediaFileModel[]

  // Handlers
  handleUpdateEventData: (data: EventFormData) => void
  setUploadedMedia: (media: MediaFileModel[]) => void
  handleUpdateEvent: () => void
  handleBackClick: () => void

  isOwner?: boolean
  canViewEvent?: boolean
  canEditEvent?: boolean
}

export interface EventTicketSectionProps {
  tickets?: TicketDto[];
};

export interface EventDashboardSectionProps {
  setCurrentSection: (section: string | number) => void;
  eventData: EventFormData;
  getStatusColor: (s: any) => string;
  ticketInfo: DashboardTicketInfoDto | undefined;
  revenueInfo: number | undefined;
  attendeeInfo: number | undefined;
  orderStats?: DashboardOrderStatsDto[];
  canViewEvent: boolean;
  canViewOrder: boolean;
};

export interface EventDiscountPageProps {
    isOwner?: boolean;
    canViewEventVouchers?: boolean;
}

export interface OrderOfAnUserSectionProps {
  customerId: number;
};