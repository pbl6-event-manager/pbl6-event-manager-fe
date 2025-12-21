import type { OrderSearchParamsDto } from "../../dtos/order-dto";
import { checkInService, getAllOrdersByEventIdService, getAttendeeService, getOrdersByCustomerIdService, getOrdersService } from "../../service/order-service";
import { store } from "../store";

export const GET_ORDER_BY_CUSTOMER_ID_REQUEST = "GET_ORDER_BY_CUSTOMER_ID_REQUEST";
export const GET_ORDER_BY_CUSTOMER_ID_SUCCESS = "GET_ORDER_BY_CUSTOMER_ID_SUCCESS";
export const GET_ORDER_BY_CUSTOMER_ID_FAILURE = "GET_ORDER_BY_CUSTOMER_ID_FAILURE";
export const GET_ORDER_DETAILS_BY_ORDER_ID_REQUEST = "GET_ORDER_DETAILS_BY_ORDER_ID_REQUEST";
export const GET_ORDER_DETAILS_BY_ORDER_ID_SUCCESS = "GET_ORDER_DETAILS_BY_ORDER_ID_SUCCESS";
export const GET_ORDER_DETAILS_BY_ORDER_ID_FAILURE = "GET_ORDER_DETAILS_BY_ORDER_ID_FAILURE";
export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAILURE = "GET_ORDERS_FAILURE";
export const GET_ATTENDEE_REQUEST = "GET_ATTENDEE_REQUEST";
export const GET_ATTENDEE_SUCCESS = "GET_ATTENDEE_SUCCESS";
export const GET_ATTENDEE_FAILURE = "GET_ATTENDEE_FAILURE";
export const CHECK_IN_REQUEST = "CHECK_IN_REQUEST";
export const CHECK_IN_SUCCESS = "CHECK_IN_SUCCESS";
export const CHECK_IN_FAILURE = "CHECK_IN_FAILURE";

export const getOrderByCustomerId = (customerId: any) => async (dispatch: any) => {
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

export const getOrders = (orderSearchParams: OrderSearchParamsDto, isAdminSite: boolean) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_ORDERS_REQUEST
        })

        const response = await getOrdersService(orderSearchParams, isAdminSite);
        if (response === null) {
            dispatch({
                type: GET_ORDERS_FAILURE,
                payload: "Get order failed",
            });
            return null;
        }

        const orderModelList = response.orderModelList;
        const orderListDtoList = response.orderListDtoList;

        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: {
                orderModelList,
                orderListDtoList
            }
        })

        return orderListDtoList;
    } catch (error: any) {
        dispatch({
            type: GET_ORDERS_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Get order failed",
        });
        throw error;
    }
}

export const getAllOrdersByEventId = (eventId: number, isAdminSite: boolean) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_ORDERS_REQUEST
        })

        const response = await getAllOrdersByEventIdService(eventId, isAdminSite);
        if (response === null) {
            dispatch({
                type: GET_ORDERS_FAILURE,
                payload: "Get order failed",
            });
            return null;
        }

        const orderModelList = response.orderModelList;
        const orderListDtoList = response.orderListDtoList;

        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: {
                orderModelList,
                orderListDtoList
            }
        })

        return orderListDtoList;
    } catch (error: any) {
        dispatch({
            type: GET_ORDERS_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Get order failed",
        });
        throw error;
    }
}

export const getAttendee = (eventId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_ATTENDEE_REQUEST
        })

        const response = await getAttendeeService(eventId);

        if (response === null) {
            dispatch({
                type: GET_ATTENDEE_FAILURE,
                payload: "Get attendee failed",
            });
            return null;
        }

        const attendeeList = response
            .map((attendee: any) => attendee.qrCode === response ? { ...attendee, isCheckin: "true" } : attendee)
            .sort((a: any, b: any) => {
                if (a.orderId !== b.orderId) return a.orderId - b.orderId;
                const nameA = (a.name || "").toString();
                const nameB = (b.name || "").toString();
                const nameCompare = nameA.localeCompare(nameB);
                if (nameCompare !== 0) return nameCompare;
                const qrA = (a.qrCode || "").toString();
                const qrB = (b.qrCode || "").toString();
                return qrA.localeCompare(qrB);
            });

        dispatch({
            type: GET_ATTENDEE_SUCCESS,
            payload: attendeeList
        })

        return attendeeList;
    } catch (error: any) {
        dispatch({
            type: GET_ATTENDEE_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Get attendee failed",
        });
        throw error;
    }
}

export const checkIn = (qrCode: string, eventId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: CHECK_IN_REQUEST
        })

        const response = await checkInService(qrCode, eventId);

        if (response === null) {
            dispatch({
                type: CHECK_IN_FAILURE,
                payload: "Checked in failed",
            });
            return null;
        }

        const attendeeList = store.getState().orderReducer.attenddeeList;
        const updatedAttendeeList = attendeeList
            .map((attendee) => attendee.qrCode === response ? { ...attendee, isCheckin: "true" } : attendee)
            .sort((a: any, b: any) => {
                if (a.orderId !== b.orderId) return a.orderId - b.orderId;
                const nameA = (a.name || "").toString();
                const nameB = (b.name || "").toString();
                const nameCompare = nameA.localeCompare(nameB);
                if (nameCompare !== 0) return nameCompare;
                const qrA = (a.qrCode || "").toString();
                const qrB = (b.qrCode || "").toString();
                return qrA.localeCompare(qrB);
            });

        dispatch({
            type: CHECK_IN_SUCCESS,
            payload: updatedAttendeeList
        })

        return updatedAttendeeList;
    } catch (error: any) {
        dispatch({
            type: CHECK_IN_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Checked in failed",
        });
        throw error;
    }
}
