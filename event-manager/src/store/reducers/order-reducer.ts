import { DEFAULT_ORDER_STATE, type OrderState } from "../../models/reducer-models/order-reducer-models";
import { GET_ATTENDEE_FAILURE, GET_ATTENDEE_REQUEST, GET_ATTENDEE_SUCCESS, GET_ORDER_BY_CUSTOMER_ID_FAILURE, GET_ORDER_BY_CUSTOMER_ID_REQUEST, GET_ORDER_BY_CUSTOMER_ID_SUCCESS, GET_ORDER_DETAILS_BY_ORDER_ID_FAILURE, GET_ORDER_DETAILS_BY_ORDER_ID_REQUEST, GET_ORDER_DETAILS_BY_ORDER_ID_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS } from "../actions/order-action";

export const orderReducer = (state = DEFAULT_ORDER_STATE, action: any): OrderState => {
    switch (action.type) {
        case GET_ORDER_BY_CUSTOMER_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_ORDER_BY_CUSTOMER_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orderListAdmin: action.payload.orderListAdminDtoList,
                orderModel: action.payload.orderModelList
            }
        case GET_ORDER_BY_CUSTOMER_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_ORDER_DETAILS_BY_ORDER_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_ORDER_DETAILS_BY_ORDER_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        case GET_ORDER_DETAILS_BY_ORDER_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orderList: action.payload.orderListDtoList,
                orderModel: action.payload.orderModelList
            }
        case GET_ORDERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_ATTENDEE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_ATTENDEE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                attenddeeList: action.payload
            }
        case GET_ATTENDEE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
};
