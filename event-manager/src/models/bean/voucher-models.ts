export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT" | string;
export type VoucherStatus = "ACTIVE" | "EXPIRED" | "INACTIVE" | string;

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
  remainingUsage: number;
  validFrom: string;   
  validTo: string;    
  status: VoucherStatus;
  eventId: number;
  isActive: boolean;
  isValid: boolean;
  isExpired: boolean;
  createdAt: string;   
  updatedAt: string;  
}