import type { VoucherListDto } from "../../dtos/voucher-dto";

export interface VoucherState {
    voucherListDto: VoucherListDto[]
    isLoading: boolean,
    error: any
}

export const DEFAULT_VOUCHER_STATE : VoucherState = {
    voucherListDto: [],
    isLoading: false,
    error: null
}