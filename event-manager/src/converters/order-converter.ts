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

export const convertOrderListToDashboardOrderInfoDto = (orderList: OrderListDto[]) => {
    let totalRevenue = 0;
    let totalAttendee = 0;

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date;
    });

    const weeklyStats = last7Days.map(date => ({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date.toISOString().split('T')[0],
        total: 0,
        paid: 0,
        pending: 0,
        canceled: 0
    }));
    
    orderList.forEach(order => {
        totalRevenue += order.status === "PAID" ? Number.parseFloat(order.total) : 0;
        totalAttendee += order.tickets ? order.tickets.length : 0;

        const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
        const dayStats = weeklyStats.find(day => day.fullDate === orderDate);
        
        if (dayStats) {
            dayStats.total++;
            if (order.status === "PAID") dayStats.paid++;
            else if (order.status === "PENDING") dayStats.pending++;
            else if (order.status === "CANCELED") dayStats.canceled++;
        }
    });

    const orderStats = weeklyStats.map(({ fullDate, ...rest }) => rest);
    
    return {
        totalAttendee,
        totalRevenue,
        orderStats
    };
}
