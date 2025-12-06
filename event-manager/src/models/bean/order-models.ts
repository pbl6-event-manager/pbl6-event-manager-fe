import type { TicketInfoDto } from "../../dtos/ticket-dto";

export interface OrderModel {
    id: number,
    createdAt: string,
    updatedAt: string,
    customerId: number,
    customerEmail: string,
    customerFullName: string,
    totalAmount: string,
    totalAmountBeforeVoucher: string,
    eventId: number,
    status: string,
    appliedVoucherCode?: string | null,
    paymentSessionId: string,
    isVerified: boolean,
    orderDetails: TicketInfoDto[],
    customerName: string
}