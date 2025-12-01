import type { TicketDto } from "../../dtos/ticket-dto";

export interface EventTicketSectionProps {
  tickets?: TicketDto[];
};

export interface EventDashboardSectionProps {
  setCurrentSection: (section: string | number) => void
}