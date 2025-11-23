//Ticket model mapping directly with database
export interface TicketModel {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    eventId: number;
    name: string;
    type: "PAID" | "FREE";
    price: number;
    quantity: number;
    soldQuantity: number;
    description: string;
    saleStartDate: Date;
    saleEndDate: Date;
    isActive: boolean;
}