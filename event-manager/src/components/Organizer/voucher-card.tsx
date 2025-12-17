import { Copy, Trash2, Calendar, TrendingUp, Lock } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
//import type { VoucherListItem } from "../../../models/discount-models"
import type { VoucherCardProps } from "../../models/component-props/card-component-props"
import { Badge } from "../ui/badge"
import { formatExpiry } from "../../utils/Organizer/date-format"
import { toast } from "sonner"

export function VoucherCard({ voucher, onDelete, onCopy, isDeleting = false, canDelete = false }: VoucherCardProps) {
    const statusColor = voucher.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
    const discountDisplay =
        voucher.type === "PERCENTAGE" ? `${voucher.amount}%` : `$${voucher.amount.toFixed(2)}`
    const handleDeleteWithPermission = () => {
        if (canDelete) {
            onDelete(voucher.id)
        } else {
            toast.error("You don't have permission to delete this voucher.")
        }
    }

    return (
        <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="space-y-4">
                {/* Header with code and status */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold font-mono text-foreground">{voucher.code}</h3>
                            <Badge className={statusColor}>{voucher.status === "ACTIVE" ? "Active" : "Inactive"}</Badge>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">{discountDisplay} off</div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCopy(voucher.code)}
                        className="h-8 w-8 p-0"
                        title="Copy voucher code"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>

                {/* Usage stats */}
                <div className="space-y-2">

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <TrendingUp className="h-4 w-4" />
                            <span>Usage</span>
                        </div>
                        <span className="font-medium">
                            {voucher.uses}
                        </span>
                    </div>
                </div>

                {/* Expiry info */}
                {voucher.expiry && (
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                            {/* Expires in {voucher.expiry && voucher.expiry > 0 ? `${voucher.expiry} days` : "Expired"} */}
                            Expires in {formatExpiry(voucher.expiry).local}
                        </span>
                    </div>
                )}

                {/* Delete button */}
                {canDelete ? (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteWithPermission()}
                        disabled={isDeleting}
                        className="w-full gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                ) : (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteWithPermission()}
                        className="w-full gap-2 bg-gray-400 hover:bg-gray-400 text-gray-200 cursor-not-allowed"
                    >
                        <Lock className="h-4 w-4" />
                        Delete
                    </Button>
                )}
            </div>
        </Card >
    )
}
