import { Card, CardContent } from "../../../components/ui/card"
import { ChevronRight, Percent, Zap } from "lucide-react"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Textarea } from "../../../components/ui/textarea"
import { useVoucherViewModel } from "../../../viewmodels/Organizer/voucher/voucher-view-model"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select"
import React from "react"

export default function CreateVoucherPage() {
    const {
        voucherCode,
        showVoucherForm,
        selectedVoucherType,
        voucherFormData,
        setShowVoucherForm,
        setVoucherFormData,
        setVoucherCode,
        handleVoucherTypeSelect,
        handleRandomCode,
        handleSaveVoucher,
        handleCancel,
    } = useVoucherViewModel()

    return (
        <div className="min-h-screen bg-gray-50 bg-opacity-50 flex flex-col">
            <div className="flex-1 overflow-hidden">
                <div className="container mx-auto px-4 py-8 h-full">
                    {/* Main Content */}
                    <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Create vouchers</h1>
                                <p className="text-muted-foreground">
                                    Choose a voucher type or build a section with multiple voucher types.
                                </p>
                            </div>
                            {!showVoucherForm ? (
                                <div className="space-y-4">
                                    {/* Voucher Ticket Option */}
                                    <Card
                                        className="cursor-pointer hover:border-primary transition-colors"
                                        onClick={() => handleVoucherTypeSelect("percentage")}
                                    >
                                        <CardContent className="flex items-center justify-between p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                                    <Percent className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">Percentage</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Create a voucher that offers a percentage discount on ticket prices.
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </CardContent>
                                    </Card>
                                    {/* Free Ticket Option */}
                                    <Card
                                        className="cursor-pointer hover:border-primary transition-colors"
                                        onClick={() => handleVoucherTypeSelect("fixed")}
                                    >
                                        <CardContent className="flex items-center justify-between p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                                    <Zap className="h-6 w-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">Fixed</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Create a voucher that offers a fixed amount discount on ticket prices.
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </CardContent>
                                    </Card>
                                </div>

                            ) : (
                                <div className="inset-0 z-50 flex items-center justify-center p-4 ">
                                    <div className="p-8 max-w-lg space-y-4 bg-white rounded-lg shadow-lg">
                                        <div className="space-y-3">
                                            <Label htmlFor="voucher-code">Voucher Code *</Label>
                                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                                                <Input
                                                    id="voucher-code"
                                                    className="lg:col-span-3 focus:placeholder:opacity-0"
                                                    placeholder="Enter voucher code"
                                                    value={voucherCode}
                                                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                                                />
                                                <Button
                                                    className="bg-orange-600 hover:bg-orange-700 lg:col-span-1 cursor-pointer shadow-md"
                                                    onClick={handleRandomCode}
                                                >
                                                    Random Code
                                                </Button>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1"></p>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="voucher-name">Voucher Name *</Label>
                                            <Input
                                                id="voucher-name"
                                                placeholder="Name of the voucher"
                                                className="focus:placeholder:opacity-0"
                                            />
                                            <p className="text-xs text-muted-foreground mt-1"></p>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="voucher-description">Description *</Label>
                                            <Textarea
                                                id="voucher-description"
                                                placeholder="Description of the voucher"
                                                className="focus:placeholder:opacity-0"
                                            />
                                            <p className="text-xs text-muted-foreground mt-1"></p>
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-4">
                                            <div className="flex-1 space-y-3">
                                                <Label htmlFor="discount-type">Discount Type *</Label>
                                                <Select value={selectedVoucherType || ""}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="fixed">Fixed</SelectItem>
                                                        <SelectItem value="percentage">Percentage</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex-3 space-y-3">
                                                <Label htmlFor="discount-value">Discount Value *</Label>
                                                <Input id="discount-value" type="number" placeholder="Enter value" />
                                            </div>
                                        </div>


                                        <div className="space-y-3">

                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <Label htmlFor="min-order-amount">Min order amount *</Label>
                                                <Input
                                                    id="min-order-amount"
                                                    type="number"
                                                />
                                            </div>
                                            {selectedVoucherType === "percentage" && (
                                                <div className="space-y-3">
                                                    <Label htmlFor="max-discount-amount">Max discount amount *</Label>
                                                    <Input
                                                        id="max-discount-amount"
                                                        type="number"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <Label htmlFor="total-usage-limit">Total usage limit *</Label>
                                                <Input
                                                    id="total-usage-limit"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="usage-per-user">Usage per user *</Label>
                                                <Input
                                                    id="usage-per-user"
                                                    type="number"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <Label htmlFor="startDate">Start date *</Label>
                                                <Input
                                                    id="startDate"
                                                    type="date"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="startTime">Start time *</Label>
                                                <Input
                                                    id="startTime"
                                                    type="time"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <Label htmlFor="endDate">End date *</Label>
                                                <Input
                                                    id="endDate"
                                                    type="date"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="endTime">End time *</Label>
                                                <Input
                                                    id="endTime"
                                                    type="time"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-10 space-x-2 flex justify-end">
                                            <Button
                                                className="bg-orange-600 hover:bg-orange-700 lg:col-span-1 cursor-pointer shadow-md"
                                            >
                                                Save Voucher
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="cursor-pointer shadow-md"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}