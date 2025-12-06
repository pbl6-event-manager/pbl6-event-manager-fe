import type { OrderListAdminDto, OrderListDto } from "../../dtos/order-dto";
import type { OrderModel } from "../bean/order-models";

export interface OrderState {
    orderListAdmin: OrderListAdminDto[],
    orderList: OrderListDto[],
    orderModel: OrderModel[]
    isLoading: boolean,
    error: any
}

export const DEFAULT_ORDER_STATE : OrderState = {
    orderList: [],
    orderListAdmin: [],
    orderModel: [],
    isLoading: false,
    error: null
}