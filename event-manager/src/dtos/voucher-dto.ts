export interface VoucherListDto {
    id: number,
    code: string,
    event: number,
    type: string,
    amount: number,
    uses: number,
    expiry: Date,
    status: string,
}