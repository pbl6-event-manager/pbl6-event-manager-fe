import type { VoucherListDto } from "../../dtos/voucher-dto";

export interface VoucherState {
    voucherListDto: VoucherListDto[],
    eventVoucherListDto: VoucherListDto[],
    isLoading: boolean,
    error: any
}

export const DEFAULT_VOUCHER_STATE : VoucherState = {
    voucherListDto: [],
    eventVoucherListDto: [],
    isLoading: false,
    error: null
}