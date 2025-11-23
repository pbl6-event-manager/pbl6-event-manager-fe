import type { TicketDto } from "../../dtos/ticket-dto";

export const isTicketOnSale = (dto: TicketDto): boolean => {
    const now = new Date();
    const saleStart = new Date(dto.saleStartDate);
    const saleEnd = new Date(dto.saleEndDate);
    
    // Check if current time is within sales period
    const isWithinSalesPeriod = now >= saleStart && now <= saleEnd;
    
    // Check if tickets are still available
    const hasAvailableTickets = dto.soldQuantity < dto.quantity;
    
    return isWithinSalesPeriod && hasAvailableTickets;
}