import {
    CREATE_A_NEW_TICKET_REQUEST,
    CREATE_A_NEW_TICKET_SUCCESS,
    CREATE_A_NEW_TICKET_FAILURE,
    GET_TICKETS_BY_EVENT_ID_REQUEST,
    GET_TICKETS_BY_EVENT_ID_SUCCESS,
    GET_TICKETS_BY_EVENT_ID_FAILURE,
    GET_TICKET_BY_ID_REQUEST,
    GET_TICKET_BY_ID_SUCCESS,
    GET_TICKET_BY_ID_FAILURE,
    UPDATE_TICKET_BY_ID_REQUEST,
    UPDATE_TICKET_BY_ID_SUCCESS,
    UPDATE_TICKET_BY_ID_FAILURE,
    DELETE_TICKET_BY_ID_REQUEST,
    DELETE_TICKET_BY_ID_SUCCESS,
    DELETE_TICKET_BY_ID_FAILURE,

} from "../actions/ticket-action"

import { DEFAULT_TICKET_STATE, type TicketsState } from "../../models/reducer-models/ticket-reducer-model";

export const ticketReducer = (state = DEFAULT_TICKET_STATE, action: any): TicketsState => {
    switch (action.type) {
        case CREATE_A_NEW_TICKET_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case CREATE_A_NEW_TICKET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tickets: [...state.tickets, action.payload],
                error: null,
            };
        case CREATE_A_NEW_TICKET_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case GET_TICKETS_BY_EVENT_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case GET_TICKETS_BY_EVENT_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tickets: action.payload,
                error: null,
            };
        case GET_TICKETS_BY_EVENT_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case GET_TICKET_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                currentTicket: null,
                error: null,
            };
        case GET_TICKET_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentTicket: action.payload,
                error: null,
            };
        case GET_TICKET_BY_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case UPDATE_TICKET_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case UPDATE_TICKET_BY_ID_SUCCESS:
            const updated = action.payload;
            const updatedTickets = state.tickets.map((t: any) => (t.id === updated.id ? updated : t));
            return {
                ...state,
                isLoading: false,
                tickets: updatedTickets,
                currentTicket: state.currentTicket?.id === updated.id ? updated : state.currentTicket,
                error: null,
            };
        case UPDATE_TICKET_BY_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case DELETE_TICKET_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case DELETE_TICKET_BY_ID_SUCCESS:
            const deletedId = action.payload;
            return {
                ...state,
                isLoading: false,
                tickets: state.tickets.filter((t: any) => t.id !== deletedId),
                currentTicket: state.currentTicket?.id === deletedId ? null : state.currentTicket,
                error: null,
            };
        case DELETE_TICKET_BY_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}