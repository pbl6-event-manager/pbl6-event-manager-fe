export const CREATE_A_NEW_TICKET_REQUEST = "CREATE_A_NEW_TICKET_REQUEST";
export const CREATE_A_NEW_TICKET_SUCCESS = "CREATE_A_NEW_TICKET_SUCCESS";
export const CREATE_A_NEW_TICKET_FAILURE = "CREATE_A_NEW_TICKET_FAILURE";

export const GET_TICKETS_BY_EVENT_ID_REQUEST = "GET_TICKETS_BY_EVENT_ID_REQUEST";
export const GET_TICKETS_BY_EVENT_ID_SUCCESS = "GET_TICKETS_BY_EVENT_ID_SUCCESS";
export const GET_TICKETS_BY_EVENT_ID_FAILURE = "GET_TICKETS_BY_EVENT_ID_FAILURE";

export const GET_TICKET_BY_ID_REQUEST = "GET_TICKET_BY_ID_REQUEST";
export const GET_TICKET_BY_ID_SUCCESS = "GET_TICKET_BY_ID_SUCCESS";
export const GET_TICKET_BY_ID_FAILURE = "GET_TICKET_BY_ID_FAILURE";

export const UPDATE_TICKET_BY_ID_REQUEST = "UPDATE_TICKET_BY_ID_REQUEST";
export const UPDATE_TICKET_BY_ID_SUCCESS = "UPDATE_TICKET_BY_ID_SUCCESS";
export const UPDATE_TICKET_BY_ID_FAILURE = "UPDATE_TICKET_BY_ID_FAILURE";

export const DELETE_TICKET_BY_ID_REQUEST = "DELETE_TICKET_BY_ID_REQUEST";
export const DELETE_TICKET_BY_ID_SUCCESS = "DELETE_TICKET_BY_ID_SUCCESS";
export const DELETE_TICKET_BY_ID_FAILURE = "DELETE_TICKET_BY_ID_FAILURE";

import {
    createANewTicketService,
    getTicketsByEventIdService,
    getTicketByIdService,
    updateTicketByIdService,
    deleteTicketByIdService
} from "../../service/ticket-service";
import type { CreateTicketRequestDto } from "../../dtos/ticket-dto";

export const createANewTicketAction = (eventId: number, ticketData: CreateTicketRequestDto) => async (dispatch: any) => {
    try {
        dispatch({
            type: CREATE_A_NEW_TICKET_REQUEST
        })
        console.log("[TicketAction] Creating ticket for event:", eventId);

        const data = await createANewTicketService(eventId, ticketData);
        console.log("[TicketAction] Ticket created successfully:", data);

        dispatch({
            type: CREATE_A_NEW_TICKET_SUCCESS,
            payload: data
        })
        return data;
    } catch (error: any) {
        dispatch({
            type: CREATE_A_NEW_TICKET_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Create a new ticket failed",
        });
        throw error;
    }
}

export const getTicketsByEventIdAction = (eventId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_TICKETS_BY_EVENT_ID_REQUEST
        })
        console.log("[TicketAction] Fetching tickets for event:", eventId);

        const { ticketDtos, ticketListItems } = await getTicketsByEventIdService(eventId);
        console.log("[TicketAction] Tickets fetched successfully:", { ticketDtos, ticketListItems });

        dispatch({
            type: GET_TICKETS_BY_EVENT_ID_SUCCESS,
            payload: ticketDtos
        })
        return ticketListItems;
    } catch (error: any) {
        dispatch({
            type: GET_TICKETS_BY_EVENT_ID_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Get tickets by event ID failed",
        });
        throw error;
    }
}

export const getTicketByIdAction = (eventId: number, ticketId: number) => async (dispatch: any) => {
    try {
        dispatch({ type: GET_TICKET_BY_ID_REQUEST });
        const data = await getTicketByIdService(eventId, ticketId);

        dispatch({
            type: GET_TICKET_BY_ID_SUCCESS,
            payload: data,
        });
        return data;
    } catch (error: any) {
        dispatch({
            type: GET_TICKET_BY_ID_FAILURE,
            payload: error.response?.data?.message || error.message || "Get ticket by id failed",
        });
        throw error;
    }
}

export const updateTicketByIdAction = (eventId: number, ticketId: number, ticketData: CreateTicketRequestDto) => async (dispatch: any) => {
    try {
        dispatch({ type: UPDATE_TICKET_BY_ID_REQUEST });
        const data = await updateTicketByIdService(eventId, ticketId, ticketData);

        dispatch({
            type: UPDATE_TICKET_BY_ID_SUCCESS,
            payload: data,
        });
        return data;
    } catch (error: any) {
        dispatch({
            type: UPDATE_TICKET_BY_ID_FAILURE,
            payload: error.response?.data?.message || error.message || "Update ticket failed",
        });
        throw error;
    }
};

export const deleteTicketByIdAction = (eventId: number, ticketId: number) => async (dispatch: any) => {
    try {
        dispatch({ type: DELETE_TICKET_BY_ID_REQUEST });
        await deleteTicketByIdService(eventId, ticketId);

        dispatch({
            type: DELETE_TICKET_BY_ID_SUCCESS,
            payload: ticketId,
        });
        return ticketId;
    } catch (error: any) {
        dispatch({
            type: DELETE_TICKET_BY_ID_FAILURE,
            payload: error.response?.data?.message || error.message || "Delete ticket failed",
        });
        throw error;
    }
};