import React from "react";
import { fmt } from "../../../../utils/Organizer/date-format";
import type { OrderDetailsAdminSiteProps } from "../../../../models/component-props/modal-component-props";

const OrderDetailModal: React.FC<OrderDetailsAdminSiteProps> = ({
  open,
  order,
  loading,
  onClose,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            Order Detail
          </h3>
          <button
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-auto">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : order ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 pb-1">Customer</div>
                  <div className="font-medium pb-1">
                    {order.customerFullName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.customerEmail}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 pb-1">Created</div>
                  <div className="font-medium pb-1">
                    {fmt(order.createdAt)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Status:{" "}
                    <span className="font-semibold">{order.status}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Total</div>
                  <div className="font-medium">
                    {order.totalAmount}$
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Voucher</div>
                  <div className="font-medium">
                    {order.appliedVoucherCode ?? "-"}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Tickets</h4>
                <div className="bg-gray-50 rounded border">
                  <div className="grid grid-cols-3 gap-2 px-4 py-2 text-xs font-semibold text-gray-600 border-b bg-[var(--primary-admin)] text-white">
                    <div>ID</div>
                    <div className="text-center">Ticket</div>
                    <div className="text-right">Attendee</div>
                  </div>

                  {(order.orderDetails || []).map((t: any, idx: number) => (
                    <div
                      key={idx}
                      className="grid grid-cols-3 gap-2 px-4 py-3 items-center border-b last:border-b-0 text-sm"
                    >
                      <div className="truncate">
                        {t.ticketId}
                      </div>
                      <div className="text-center">
                        {t.ticketName}
                      </div>
                      <div className="text-right">
                        {t.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <button
                  className="px-4 py-2 rounded text-white cursor-pointer bg-[var(--primary-admin)] hover:bg-[var(--primary-hover)]"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-sm text-gray-500 py-8">
              No order selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
