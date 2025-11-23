export type DiscountType = "PERCENTAGE" | "FIXED" | string;
export type VoucherStatus = "ACTIVE" | "EXPIRED" | string;

export interface VoucherModel {
  id: number;
  code: string;
  name: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  totalUsageLimit: number;
  currentUsageCount: number;
  usagePerUser: number;
  validFrom: string;   
  validTo: string;    
  status: VoucherStatus;
  eventId: number;
  createdAt: string;   
  updatedAt: string;  
}