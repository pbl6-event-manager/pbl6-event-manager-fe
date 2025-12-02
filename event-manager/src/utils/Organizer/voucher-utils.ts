import type { VoucherListDto } from "../../dtos/voucher-dto"

export const generateRandomCode = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 10; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

export const parseVoucherUses = (uses: string): { used: number; limit: number } => {
    const parts = (uses || "0/0").split("/");
    return {
        used: parseInt(parts[0]) || 0,
        limit: parseInt(parts[1]) || 0
    };
};

export const calculateTotalUses = (vouchers: VoucherListDto[]): string => {
    const totals = vouchers.reduce((acc, voucher) => {
        const { used, limit } = parseVoucherUses(voucher.uses);
        return {
            used: acc.used + used,
            limit: acc.limit + limit
        };
    }, { used: 0, limit: 0 });
    
    return `${totals.used}/${totals.limit}`;
};

export const getUsagePercentage = (uses: string): number => {
    const { used, limit } = parseVoucherUses(uses);
    if (limit === 0) return 0;
    return Math.round((used / limit) * 100);
};

export const isNearLimit = (uses: string, threshold: number = 80): boolean => {
    return getUsagePercentage(uses) >= threshold;
};


export const isFullyUsed = (uses: string): boolean => {
    const { used, limit } = parseVoucherUses(uses);
    return used >= limit && limit > 0;
};