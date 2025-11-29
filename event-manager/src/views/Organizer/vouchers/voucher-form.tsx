import React, { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/select";
import { TIMEZONES } from "../../../utils/Organizer/timezone-language";
import type { VoucherFormProps } from "../../../models/component-props/form-component-props";


const VoucherForm: React.FC<VoucherFormProps> = ({
  voucherCode,
  setVoucherCode,
  formName,
  setFormName,
  formDesc,
  setFormDesc,
  formDiscountType,
  setFormDiscountType,
  formDiscountValue,
  setFormDiscountValue,
  formMinOrderAmount,
  setFormMinOrderAmount,
  formMaxDiscountAmount,
  setFormMaxDiscountAmount,
  formTotalUsageLimit,
  setFormTotalUsageLimit,
  formUsagePerUser,
  setFormUsagePerUser,
  formValidFrom,
  setFormValidFrom,
  formValidTo,
  setFormValidTo,
  formEventId,
  setFormEventId,
  selectedTimezone,
  setSelectedTimezone,
  handleRandomCode,
  eventSelectionList,
}) => {
  return (
    <div className="w-full">
      <div className="space-y-4 max-w-none">
        <div className="space-y-3">
          <Label htmlFor="voucher-code">Voucher Code *</Label>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            <Input
              id="voucher-code"
              className="lg:col-span-3"
              placeholder="Enter voucher code"
              value={voucherCode}
              onChange={(e) =>
                setVoucherCode(String(e.target.value).toUpperCase())
              }
            />
            <Button
              className="bg-orange-600 hover:bg-orange-700 lg:col-span-1"
              onClick={handleRandomCode}
            >
              Random Code
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="voucher-name">Voucher Name *</Label>
          <Input
            id="voucher-name"
            placeholder="Name of the voucher"
            value={formName}
            onChange={(e) => setFormName(String(e.target.value))}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="voucher-description">Description *</Label>
          <Textarea
            id="voucher-description"
            placeholder="Description of the voucher"
            value={formDesc}
            onChange={(e) => setFormDesc(String(e.target.value))}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="apply-event">Apply to event</Label>
          <div className="w-full">
            <Select
              value={formEventId}
              onValueChange={(v: any) => setFormEventId(v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Select event (optional)"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All events</SelectItem>
                {(eventSelectionList || []).map((ev: any) => (
                  <SelectItem key={ev.id} value={ev.id?.toString() ?? ev.id}>
                    {ev.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="discount-type">Discount Type *</Label>
            <Select
              value={formDiscountType}
              onValueChange={(v: any) => setFormDiscountType(v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                <SelectItem value="PERCENTAGE">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="discount-value">Discount Value *</Label>
            <Input
              id="discount-value"
              className="w-full"
              type="number"
              value={
                formDiscountValue === undefined ? "" : String(formDiscountValue)
              }
              onChange={(e) =>
                setFormDiscountValue(Number(e.target.value || 0))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="min-order-amount">Min order amount *</Label>
            <Input
              id="min-order-amount"
              type="number"
              value={formMinOrderAmount ?? ""}
              onChange={(e) =>
                setFormMinOrderAmount(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>
          {formDiscountType === "PERCENTAGE" && (
            <div className="space-y-3">
              <Label htmlFor="max-discount-amount">Max discount amount *</Label>
              <Input
                id="max-discount-amount"
                type="number"
                value={formMaxDiscountAmount ?? ""}
                onChange={(e) =>
                  setFormMaxDiscountAmount(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
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
              value={formTotalUsageLimit ?? ""}
              onChange={(e) =>
                setFormTotalUsageLimit(
                  Number.parseInt(e.target.value) || undefined
                )
              }
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="usage-per-user">Usage per user *</Label>
            <Input
              id="usage-per-user"
              type="number"
              value={formUsagePerUser ?? ""}
              onChange={(e) =>
                setFormUsagePerUser(
                  Number.parseInt(e.target.value) || undefined
                )
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="validFrom">Valid From *</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={formValidFrom ?? ""}
              onChange={(e) => setFormValidFrom(e.target.value || undefined)}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="validTo">Valid To *</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={formValidTo ?? ""}
              onChange={(e) => setFormValidTo(e.target.value || undefined)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="timezone">Time zone</Label>
          <div className="w-full">
            <Select
              value={selectedTimezone}
              onValueChange={(v: any) => setSelectedTimezone(v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent className="max-h-80 overflow-auto">
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherForm;
