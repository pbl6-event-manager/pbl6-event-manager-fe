import { FETCH_EVENT_STAFFS_REQUEST, ASSIGN_STAFF_FAILURE, ASSIGN_STAFF_REQUEST, ASSIGN_STAFF_SUCCESS, FETCH_EVENT_STAFFS_FAILED, FETCH_EVENT_STAFFS_SUCCESS, FETCH_ORGANIZER_STAFFS_FAILURE, FETCH_ORGANIZER_STAFFS_REQUEST,FETCH_ORGANIZER_STAFFS_SUCCESS, INVITE_STAFF_FAILED, INVITE_STAFF_REQUEST, INVITE_STAFF_SUCCESS, REMOVE_STAFF_FROM_EVENT_REQUEST, REMOVE_STAFF_FROM_EVENT_FAILURE, REMOVE_STAFF_FROM_EVENT_SUCCESS, REMOVE_STAFF_FROM_OWNER_FAILURE,REMOVE_STAFF_FROM_OWNER_REQUEST,REMOVE_STAFF_FROM_OWNER_SUCCESS, RESET_TEAM_STATE } from "../actions/staff-action";
import { DEFAULT_STAFF_STATE, type StaffsState } from "../../models/reducer-models/staff-reducer-models";

export const staffReducer = (state = DEFAULT_STAFF_STATE, action: any): StaffsState => {
    switch (action.type) {
        case FETCH_EVENT_STAFFS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_EVENT_STAFFS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                eventStaffs: action.payload,
            };
        case FETCH_EVENT_STAFFS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case FETCH_ORGANIZER_STAFFS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_ORGANIZER_STAFFS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                organizerStaffs: action.payload,
                error: null,
            };
        case FETCH_ORGANIZER_STAFFS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case ASSIGN_STAFF_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case ASSIGN_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                eventStaffs: [...state.eventStaffs, action.payload],
                error: null,
            };
        case ASSIGN_STAFF_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case REMOVE_STAFF_FROM_EVENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case REMOVE_STAFF_FROM_EVENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                eventStaffs: state.eventStaffs.filter(staff => staff.id !== action.payload),
                error: null,
            };
        case REMOVE_STAFF_FROM_EVENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
