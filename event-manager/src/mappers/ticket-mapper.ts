import type { TicketModel } from "../models/bean/ticket-models";

export const mapToTicketModel = (raw: any) : TicketModel => ({
    id: raw.id,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    eventId: raw.eventId,
    name: raw.name,
    type: raw.type,
    price: Number.parseFloat(raw.price),
    quantity: raw.quantity,
    soldQuantity: raw.soldQuantity,
    description: raw.description,
    saleStartDate: new Date(raw.saleStartDate),
    saleEndDate: new Date(raw.saleEndDate),
    isActive: raw.isActive,
});