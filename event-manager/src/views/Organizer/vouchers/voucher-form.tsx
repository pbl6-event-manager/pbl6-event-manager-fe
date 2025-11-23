import React, { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";
import useVoucherViewModel from "../../../viewmodels/Organizer/voucher/voucher-view-model";
import { TIMEZONES } from "../../../utils/Organizer/timezone-language";
import type { EventSelectionDto } from "../../../dtos/event-dto";

type VoucherType = "Percentage" | "Fixed";

type Props = {
  voucherCode: string;
  setVoucherCode: (s: string) => void;
  formName: string;
  setFormName: (s: string) => void;
  formDesc: string;
  setFormDesc: (s: string) => void;
  formType: VoucherType;
  setFormType: (t: VoucherType) => void;
  formAmount: number;
  setFormAmount: (n: number) => void;
  formMaxUses?: number | undefined;
  setFormMaxUses: (n?: number) => void;
  formExpires?: string | undefined;
  setFormExpires: (s?: string) => void;
  onSave: () => void;
  onBack: () => void;
  loadingEvents?: boolean;
  handleRandomCode: () => void;
  eventSelectionList: EventSelectionDto[]
};

const VoucherForm: React.FC<Props> = ({
  voucherCode,
  setVoucherCode,
  formName,
  setFormName,
  formDesc,
  setFormDesc,
  formType,
  setFormType,
  formAmount,
  setFormAmount,
  formMaxUses,
  setFormMaxUses,
  formExpires,
  setFormExpires,
  handleRandomCode,
  eventSelectionList,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<string | undefined>(undefined);
  const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>();

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
              onChange={(e) => setVoucherCode(String(e.target.value).toUpperCase())}
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
          <Input id="voucher-name" placeholder="Name of the voucher" value={formName} onChange={(e) => setFormName(String(e.target.value))} />
        </div>

        <div className="space-y-3">
          <Label htmlFor="voucher-description">Description *</Label>
          <Textarea id="voucher-description" placeholder="Description of the voucher" value={formDesc} onChange={(e) => setFormDesc(String(e.target.value))} />
        </div>

        <div className="space-y-3">
          <Label htmlFor="apply-event">Apply to event</Label>
          <div className="w-full">
            <Select
              value={selectedEvent}
              onValueChange={(v: any) => setSelectedEvent(v)}
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
            <Select value={formType} onValueChange={(v: any) => setFormType(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fixed">Fixed</SelectItem>
                <SelectItem value="Percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="discount-value">Discount Value *</Label>
            <Input
              id="discount-value"
              className="w-full"
              type="number"
              value={formAmount === undefined ? "" : String(formAmount)}
              onChange={(e) => setFormAmount(Number(e.target.value || 0))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="min-order-amount">Min order amount *</Label>
            <Input id="min-order-amount" type="number" />
          </div>
          {formType === "Percentage" && (
            <div className="space-y-3">
              <Label htmlFor="max-discount-amount">Max discount amount *</Label>
              <Input id="max-discount-amount" type="number" value={formMaxUses ?? ""} onChange={(e) => setFormMaxUses(e.target.value ? Number(e.target.value) : undefined)} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="total-usage-limit">Total usage limit *</Label>
            <Input id="total-usage-limit" type="number" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="usage-per-user">Usage per user *</Label>
            <Input id="usage-per-user" type="number" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="startDate">Start date *</Label>
            <Input id="startDate" type="date" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="startTime">Start time *</Label>
            <Input id="startTime" type="time" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="endDate">End date *</Label>
            <Input id="endDate" type="date" value={formExpires ?? ""} onChange={(e) => setFormExpires(e.target.value || undefined)} />
          </div>
          <div className="space-y-3">
            <Label htmlFor="endTime">End time *</Label>
            <Input id="endTime" type="time" />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="timezone">Time zone</Label>
          <div className="w-full">
            <Select value={selectedTimezone} onValueChange={(v: any) => setSelectedTimezone(v)}>
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
