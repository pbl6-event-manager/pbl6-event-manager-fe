export interface TicketDto {
    id: number;
    eventId: number;
    name: string;
    type: "PAID" | "FREE";
    price: number;
    quantity: number;
    soldQuantity: number;
    description: string;
    saleStartDate: string;
    saleEndDate: string;
}

export interface CreateTicketRequestDto {
    eventId: string;
    name: string;
    type: "PAID" | "FREE";
    price: number;
    quantity: number;
    description: string;
    saleStartDate: string; // ISO datetime string
    saleEndDate: string; // ISO datetime string
}
export interface TicketInfoDto {
    ticketId: number,
    ticketName: string,
    email: string,
    name: string
}

export interface DashboardTicketInfoDto {
    totalTicket: number,
    soldTicket: number,
    paidTicket: number,
    freeTicket: number,
    ticketTypes?: Array<{
        name: string;
        price: number;
        type: "PAID" | "FREE";
        sold: number;
        total: number;
    }>;
}