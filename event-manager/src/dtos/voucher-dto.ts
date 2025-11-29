export interface VoucherListDto {
    id: number,
    code: string,
    event: number,
    amount: number,
    type: string,
    uses: string,
    expiry: Date,
    status: string,
}

export interface CreateVoucherDto {
    code: string,
    name: string,
    description: string,
    discountType: string,
    discountValue: number | undefined,
    minOrderAmount: number | undefined,
    maxDiscountAmount: number | undefined,
    totalUsageLimit: number | undefined,
    usagePerUser: number | undefined,
    validFrom: string | undefined,
    validTo: string | undefined,
    eventId: string | undefined
}