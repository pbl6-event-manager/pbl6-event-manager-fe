import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export interface VoucherFilters {
    searchTerm: string
    discountType: "all" | "PERCENTAGE" | "FIXED_AMOUNT"
}

interface VoucherSearchFilterProps {
    searchTerm: string
    discountType: "all" | "PERCENTAGE" | "FIXED_AMOUNT"
    onSearchChange: (term: string) => void
    onTypeChange: (type: "all" | "PERCENTAGE" | "FIXED_AMOUNT") => void
}

export function VoucherSearchFilter({
    searchTerm,
    discountType,
    onSearchChange,
    onTypeChange
}: VoucherSearchFilterProps) {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Input */}
                <div className="space-y-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by code or discount amount..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Discount Type Filter */}
                <div className="space-y-2">
                    <Select 
                        value={discountType} 
                        onValueChange={(value: any) => onTypeChange(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                            <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}