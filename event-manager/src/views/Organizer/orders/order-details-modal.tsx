import type { OrderDetailsOrgSiteProps } from "../../../models/component-props/modal-component-props";
import { fmt } from "../../../utils/Organizer/date-format";

export const OrderDetailModal: React.FC<OrderDetailsOrgSiteProps> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 overflow-auto"
        style={{ maxHeight: "85vh" }}
      >
        <header className="flex items-center justify-between p-6 border-b">
          <div>
            <div className="text-lg font-semibold">Order ID: {order.id} </div>
            <div className="text-xs text-gray-500">{fmt(order.createdAt)}</div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-lg font-semibold">${order.total}</div>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <section className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm text-gray-500">Buyer</h4>
              <div className="font-medium">{order.buyerName}</div>
              <div className="text-sm text-gray-600">{order.buyerEmail}</div>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Event</h4>
              <div className="font-medium">{order.eventTitle}</div>
            </div>
          </section>

          <section>
            <h4 className="font-semibold mb-3">Tickets</h4>
            <div className="bg-gray-50 rounded-md border overflow-x-auto">
              <div className="grid grid-cols-4 gap-4 px-4 py-3 text-xs font-semibold text-gray-600 border-b">
                <div>Ticket ID</div>
                <div>Ticket Name</div>
                <div>Holder Name</div>
                <div>Email</div>
              </div>
              {(order.tickets || []).length === 0 ? (
                <div className="p-4 text-sm text-gray-500">
                  No tickets found for this order.
                </div>
              ) : (
                (order.tickets || []).map((t) => {
                  return (
                    <div
                      key={String(t.ticketId)}
                      className="grid grid-cols-4 gap-4 px-4 py-3 items-center text-sm border-b last:border-b-0"
                    >
                      <div className="text-gray-700 font-medium truncate">
                        {String(t.ticketId)}
                      </div>
                      <div className="truncate">{t.ticketName ?? "-"}</div>
                      <div className="truncate">{t.name ?? "-"}</div>
                      <div className="truncate text-sm text-gray-600">
                        {t.email ?? "-"}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
