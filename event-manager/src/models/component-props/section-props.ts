import type { DashboardOrderStatsDto } from "../../dtos/order-dto";
import type { DashboardTicketInfoDto, TicketDto } from "../../dtos/ticket-dto";
import type { EventFormData } from "../form-models/event-form-models";

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
  orderStats?: DashboardOrderStatsDto[]
};

export interface OrderOfAnUserSectionProps {
  customerId: number;
};