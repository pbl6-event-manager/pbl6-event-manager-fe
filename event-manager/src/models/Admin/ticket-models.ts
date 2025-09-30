export interface Ticket {
  name: string;
  price: number;
  quantity: number;
}

export interface TicketListProps {
  tickets: Ticket[];
  addTicket: () => void;
  handleTicketChange: (
    index: number,
    field: keyof Ticket,
    value: string | number
  ) => void;
  removeTicket: (index: number) => void;
}