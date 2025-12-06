import { convertResponseToTicketInfoDto } from "../converters/ticket-converter";
import type { OrderModel } from "../models/bean/order-models";

export const mapResponseToOrderModel = (raw: any) : OrderModel => ({
    id: raw.id,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    customerId: raw.customerId,
    customerEmail: raw.customerEmail,
    customerFullName: raw.customerFullName,
    totalAmount: raw.totalAmount,
    totalAmountBeforeVoucher: raw.totalAmountBeforeVoucher,
    eventId: raw.eventId,
    status: raw.status,
    appliedVoucherCode: raw.appliedVoucherCode,
    paymentSessionId: raw.paymentSessionId,
    isVerified: raw.isVerified,
    orderDetails: raw.orderDetails.map(convertResponseToTicketInfoDto),
    customerName: raw.customerName
});
    
