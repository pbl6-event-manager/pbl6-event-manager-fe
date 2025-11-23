import type { VoucherModel } from "../models/bean/voucher-models";

export const mapResponseToVoucherModel = (raw: any): VoucherModel => ({
    id: raw.id,
    code: raw.code,
    name: raw.name,
    description: raw.description,
    discountType: raw.discountType,
    discountValue: raw.discountValue,
    minOrderAmount: raw.minOrderAmount,
    maxDiscountAmount: raw.maxDiscountAmount,
    totalUsageLimit: raw.totalUsageLimit,
    currentUsageCount: raw.currentUsageCount,
    usagePerUser: raw.usagePerUser,
    validFrom: raw.validFrom,
    validTo: raw.validTo,
    status: raw.status,
    eventId: raw.eventId,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt
})