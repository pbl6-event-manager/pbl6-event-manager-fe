import { getAllVoucherService } from "../../service/voucher-service";

export const GET_ALL_VOUCHER_REQUEST = "GET_ALL_VOUCHER_REQUEST";
export const GET_ALL_VOUCHER_SUCCESS = "GET_ALL_VOUCHER_SUCCESS";
export const GET_ALL_VOUCHER_FAILURE = "GET_ALL_VOUCHER_FAILURE";

export const getAllVoucher = () => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_ALL_VOUCHER_REQUEST
        })

        const response = await getAllVoucherService();
        
        dispatch({
            type: GET_ALL_VOUCHER_SUCCESS,
            payload: response
        })
    } catch (error: any) {
        dispatch({
            type: GET_ALL_VOUCHER_FAILURE,
            payload: error?.message || "Failed to get all voucher of your accounts"
        })
    }
}