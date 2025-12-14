import type { OrderListAdminDto, OrderListDto } from "../dtos/order-dto";
import type { OrderModel } from "../models/bean/order-models";
import { fmt } from "../utils/Organizer/date-format";

export const convertOrderModelToOrderListAdminDto = (raw: OrderModel) : OrderListAdminDto => ({
    id: raw.id,
    eventId: raw.eventId,
    createdAt: fmt(raw.createdAt),
    quantity: raw.orderDetails.length,
    status: raw.status,
    total: raw.totalAmount
})

export const converOrderModelToOrderListDto = (raw: OrderModel) : OrderListDto => ({
    id: raw.id,
    buyerName: raw.customerFullName,
    buyerEmail: raw.customerEmail,
    eventId: raw.eventId,
    createdAt: raw.createdAt,
    quantity: raw.orderDetails.length,
    status: raw.status,
    total: raw.totalAmount,
    tickets: raw.orderDetails
})

