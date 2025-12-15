import type { AttendeeListDto } from "../../dtos/attendee-dto";
import type { OrderListAdminDto, OrderListDto } from "../../dtos/order-dto";
import type { OrderModel } from "../bean/order-models";

export interface OrderState {
    orderListAdmin: OrderListAdminDto[],
    orderList: OrderListDto[],
    orderModel: OrderModel[],
    attenddeeList: AttendeeListDto[],
    isLoading: boolean,
    error: any
}

export const DEFAULT_ORDER_STATE : OrderState = {
    orderList: [],
    orderListAdmin: [],
    orderModel: [],
    attenddeeList: [],
    isLoading: false,
    error: null
}