import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import type { VoucherDuplicateFormProps } from "../../../models/component-props/form-component-props";

const VoucherDuplicateForm: React.FC<VoucherDuplicateFormProps> = ({
  voucherCode,
  setVoucherCode,
  handleRandomCode,
  duplicateVoucher,
  onCancel,
  loading,
}) => {
  return (
    <div className="space-y-4 p-4">
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
            className="bg-orange-600 hover:bg-orange-700 lg:col-span-1 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleRandomCode();
            }}
          >
            Random Code
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          className="bg-orange-600 hover:bg-orange-700 cursor-pointer"
          disabled={loading}
          onClick={duplicateVoucher}
        >
          {loading ? "Processing..." : "Duplicate"}
        </Button>
      </div>
    </div>
  );
};

export default VoucherDuplicateForm;
