import { DEFAULT_VOUCHER_STATE, type VoucherState } from "../../models/reducer-models/voucher-reducer.models";
import { CREATE_NEW_VOUCHER_FAILURE, CREATE_NEW_VOUCHER_REQUEST, CREATE_NEW_VOUCHER_SUCCESS, DELETE_VOUCHER_FAILURE, DELETE_VOUCHER_REQUEST, DELETE_VOUCHER_SUCCESS, DUPLICATE_VOUCHER_FAILURE, DUPLICATE_VOUCHER_REQUEST, DUPLICATE_VOUCHER_SUCCESS, GET_ALL_VOUCHER_FAILURE, GET_ALL_VOUCHER_REQUEST, GET_ALL_VOUCHER_SUCCESS, GET_VOUCHER_BY_ID_FAILURE, GET_VOUCHER_BY_ID_REQUEST, GET_VOUCHER_BY_ID_SUCCESS, UPDATE_VOUCHER_FAILURE, UPDATE_VOUCHER_REQUEST, UPDATE_VOUCHER_SUCCESS } from "../actions/voucher-action";

export const voucherReducer = (state = DEFAULT_VOUCHER_STATE, action: any): VoucherState => {
    switch (action.type) {
        case GET_ALL_VOUCHER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_ALL_VOUCHER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                voucherListDto: action.payload
            }
        case GET_ALL_VOUCHER_FAILURE:
            return {
                ...state,
                isLoading: true,
                error: action.payloads
            }
        case CREATE_NEW_VOUCHER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case CREATE_NEW_VOUCHER_SUCCESS:
             return {
                ...state,
                isLoading: false,
                voucherListDto: action.payload
            }
        case CREATE_NEW_VOUCHER_FAILURE:
            return {
                ...state,
                isLoading: true,
                error: action.payload
            }
        case DUPLICATE_VOUCHER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case DUPLICATE_VOUCHER_SUCCESS:
             return {
                ...state,
                isLoading: false,
                voucherListDto: action.payload
            }
        case DUPLICATE_VOUCHER_FAILURE:
            return {
                ...state,
                isLoading: true,
                error: action.payload
            }
        case UPDATE_VOUCHER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case UPDATE_VOUCHER_SUCCESS:
             return {
                ...state,
                isLoading: false,
                voucherListDto: action.payload
            }
        case UPDATE_VOUCHER_FAILURE:
            return {
                ...state,
                isLoading: true,
                error: action.payload
            }  
        case GET_VOUCHER_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_VOUCHER_BY_ID_SUCCESS:
             return {
                ...state,
                isLoading: false,
                error: null
            }
        case GET_VOUCHER_BY_ID_FAILURE:
            return {
                ...state,
                isLoading: true,
                error: action.payload
            }
        case DELETE_VOUCHER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case DELETE_VOUCHER_SUCCESS:
             return {
                ...state,
                isLoading: false,
                voucherListDto: action.payload
            }
        case DELETE_VOUCHER_FAILURE:
            return {
                ...state,
                isLoading: true,
                error: action.payload
            }
        default:
            return state;
    }
}
