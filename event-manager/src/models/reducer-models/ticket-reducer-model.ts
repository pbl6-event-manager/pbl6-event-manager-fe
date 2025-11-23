import type { TicketDto } from "../../dtos/ticket-dto";

export interface TicketsState {
  tickets: TicketDto[];
  currentTicket: TicketDto | null;
  isLoading: boolean;
  error: string | null;
}

export const DEFAULT_TICKET_STATE: TicketsState = {
  tickets: [],
  currentTicket: null,
  isLoading: false,
  error: null,
};