import { getOrdersByCustomerIdService } from "../../service/order-service";
import { store } from "../store";

export const GET_ORDER_BY_CUSTOMER_ID_REQUEST = "GET_ORDER_BY_CUSTOMER_ID_REQUEST";
export const GET_ORDER_BY_CUSTOMER_ID_SUCCESS = "GET_ORDER_BY_CUSTOMER_ID_SUCCESS";
export const GET_ORDER_BY_CUSTOMER_ID_FAILURE = "GET_ORDER_BY_CUSTOMER_ID_FAILURE";
export const GET_ORDER_DETAILS_BY_ORDER_ID_REQUEST = "GET_ORDER_DETAILS_BY_ORDER_ID_REQUEST";
export const GET_ORDER_DETAILS_BY_ORDER_ID_SUCCESS = "GET_ORDER_DETAILS_BY_ORDER_ID_SUCCESS";
export const GET_ORDER_DETAILS_BY_ORDER_ID_FAILURE = "GET_ORDER_DETAILS_BY_ORDER_ID_FAILURE";

export const getOrderByCustomerId = (customerId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_ORDER_BY_CUSTOMER_ID_REQUEST
        })

        const response = await getOrdersByCustomerIdService(customerId);
        if (response === null) {
            dispatch({
                type: GET_ORDER_BY_CUSTOMER_ID_FAILURE,
                payload: "Get order failed",
            });
            return null;
        }

        const orderModelList = response.orderModelList;
        const orderListAdminDtoList = response.orderListAdminDtoList;

        dispatch({
            type: GET_ORDER_BY_CUSTOMER_ID_SUCCESS,
            payload: {
                orderModelList,
                orderListAdminDtoList
            }
        })
    } catch (error: any) {
        dispatch({
            type: GET_ORDER_BY_CUSTOMER_ID_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Get order failed",
        });
        throw error;
    }
}

export const getOrderDetailsByOrderId = (orderId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_ORDER_DETAILS_BY_ORDER_ID_REQUEST
        })

        const orderModelList = store.getState().orderReducer.orderModel;
        const orderModel = orderModelList.filter((o) => o.id === orderId);

        dispatch({
            type: GET_ORDER_DETAILS_BY_ORDER_ID_SUCCESS,
        })

        return orderModel;
    } catch (error: any) {
        dispatch({
            type: GET_ORDER_DETAILS_BY_ORDER_ID_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Get order failed",
        });
        throw error;
    }
}