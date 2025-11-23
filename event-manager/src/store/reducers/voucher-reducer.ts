import { DEFAULT_VOUCHER_STATE, type VoucherState } from "../../models/reducer-models/voucher-reducer.models";
import { GET_ALL_VOUCHER_FAILURE, GET_ALL_VOUCHER_REQUEST, GET_ALL_VOUCHER_SUCCESS } from "../actions/voucher-action";

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
        default:
            return state;
    }
}
