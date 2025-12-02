import { Ticket, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Button } from "../../../components/ui/button";
import { VoucherCard } from "../../../components/Organizer/voucher-card";
import { VoucherSearchFilter } from "../../../components/Organizer/voucher-search-filter";
import useVoucherViewModel from "../../../viewmodels/Organizer/voucher/voucher-view-model";
import { calculateTotalUses } from "../../../utils/Organizer/voucher-utils";

export default function EventDiscountPage() {
    
    const {
        isLoading,
        error,
        filtered,
        q,
        setQ,
        discountType,
        setDiscountType,
        handleDeleteVoucher,
        handleCopyCode,
        handleNavigateToManageVouchers
    } = useVoucherViewModel();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                            <Ticket className="h-6 w-6 text-orange-600" />
                        </div>
                        Discount Vouchers
                    </h1>
                    <p className="text-muted-foreground mt-2">Create and manage discount vouchers for your event</p>
                </div>
                {/* <CreateVoucherModal isLoading={isLoading} onSubmit={createVoucher} /> */}
                <div>
                    <Button
                        variant="secondary"
                        className="bg-[#f05537] hover:bg-[#e04527] text-white cursor-pointer"
                        onClick={handleNavigateToManageVouchers}
                    >
                        Manage Vouchers
                    </Button>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Search and Filter */}
            <VoucherSearchFilter 
                searchTerm={q} 
                discountType={discountType}
                onSearchChange={setQ}
                onTypeChange={setDiscountType}
            />

            {/* Empty State */}
            {!isLoading && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 bg-muted/30 rounded-lg border border-dashed">
                    <Ticket className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-1">No vouchers yet</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                        No found vouchers matching your criteria. Try adjusting your search or filter settings.
                    </p>
                </div>
            )}

            {/* Vouchers Grid */}
            {filtered.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading ? (
                        <>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-56 bg-muted rounded-lg animate-pulse" />
                            ))}
                        </>
                    ) : (
                        filtered.map((voucher) => (
                            <VoucherCard key={voucher.id} voucher={voucher} onDelete={handleDeleteVoucher} onCopy={handleCopyCode} />
                        ))
                    )}
                </div>
            )}

            {/* Summary Stats */}
            {filtered.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Total Vouchers</p>
                        <p className="text-2xl font-bold">{filtered.length}</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Active Vouchers</p>
                        <p className="text-2xl font-bold text-green-600">{filtered.filter((v) => v.status).length}</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Total Uses</p>
                        <p className="text-2xl font-bold">{calculateTotalUses(filtered)}</p>
                    </div>
                </div>
            )}
        </div>
    )
}