import type { VoucherModel } from "../models/bean/voucher-models";

export const mapResponseToVoucherModel = (raw: any): VoucherModel => ({
    id: raw.id,
    code: raw.code ?? "",
    name: raw.name ?? "",
    description: raw.description ?? "",
    discountType: raw.discountType ?? "",
    discountValue: raw.discountValue ?? 0,
    minOrderAmount: raw.minOrderAmount ?? 0,
    maxDiscountAmount: raw.maxDiscountAmount ?? 0,
    totalUsageLimit: raw.totalUsageLimit ?? 0,
    currentUsageCount: raw.currentUsageCount ?? 0,
    usagePerUser: raw.usagePerUser ?? 0,
    remainingUsage: raw.remainingUsage ?? 0,
    validFrom: raw.validFrom ?? "",
    validTo: raw.validTo ?? "",
    status: raw.status ?? "",
    eventId: raw.eventId ?? 0,
    isActive: raw.isActive ?? false,
    isValid: raw.isValid ?? false,
    isExpired: raw.isExpired ?? false,
    createdAt: raw.createdAt ?? "",
    updatedAt: raw.updatedAt ?? ""
})