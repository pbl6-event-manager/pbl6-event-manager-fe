import type { VoucherListDto } from "../dtos/voucher-dto";
import type { VoucherModel } from "../models/bean/voucher-models";

export interface VoucherModelParsed extends Omit<VoucherModel, "validFrom" | "validTo" | "createdAt" | "updatedAt"> {
  validFromDate: Date;
  validToDate: Date;
  createdAtDate: Date;
  updatedAtDate: Date;
}

export const parseVoucher = (v: VoucherModel): VoucherModelParsed => ({
  ...v,
  validFromDate: new Date(v.validFrom),
  validToDate: new Date(v.validTo),
  createdAtDate: new Date(v.createdAt),
  updatedAtDate: new Date(v.updatedAt),
});

export const convertVoucherModelToVoucherListDto = (v: VoucherModel) : VoucherListDto => ({
    id: v.id,
    code: v.code,
    type: v.discountType,
    amount: v.totalUsageLimit,
    uses: v.currentUsageCount,
    expiry: new Date(v.validTo),
    status: v.status,
    event: v.eventId
});