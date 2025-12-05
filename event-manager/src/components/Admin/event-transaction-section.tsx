import React, { useMemo, useState } from "react";
import { fmt } from "../../utils/Organizer/date-format";
import { fmtPrice } from "../../utils/Admin/price-format";
import { Eye, RefreshCw, Download } from "lucide-react";

type OrderItem = {
  ticketId: string;
  name: string;
  unitPrice: number;
  qty: number;
};

type OrderDto = {
  id: string;
  buyerName: string;
  buyerEmail?: string;
  buyerPhone?: string;
  items: OrderItem[];
  total: number;
  qty: number;
  paymentMethod: string;
  status: "PAID" | "PENDING" | "CANCELLED" | "REFUNDED";
  purchaseDate: string; // ISO
  note?: string;
};

type Props = {
  eventId?: string;
  orders?: OrderDto[];
};

const STATUS_OPTIONS: Array<{ key: string; label: string }> = [
  { key: "ALL", label: "All" },
  { key: "PAID", label: "Paid" },
  { key: "PENDING", label: "Pending" },
  { key: "REFUNDED", label: "Refunded" },
  { key: "CANCELLED", label: "Cancelled" },
];

const Badge: React.FC<{ status: OrderDto["status"] }> = ({ status }) => {
  const map: Record<string, string> = {
    PAID: "bg-green-50 text-green-800",
    PENDING: "bg-yellow-50 text-yellow-800",
    REFUNDED: "bg-red-50 text-red-800",
    CANCELLED: "bg-gray-50 text-gray-800",
  };
  return (
    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${map[status] || "bg-gray-50 text-gray-800"}`}>
      {status}
    </span>
  );
};

export const EventTransactionSection: React.FC<Props> = ({ eventId, orders = [] }) => {
  const fakeOrders: OrderDto[] = [
    {
      id: "ORD-20251130-001",
      buyerName: "Nguyễn Văn A",
      buyerEmail: "a.nguyen@example.com",
      buyerPhone: "+84 912 345 678",
      items: [{ ticketId: "t1", name: "Early Bird - General Admission", unitPrice: 49, qty: 2 }],
      qty: 2,
      total: 98,
      paymentMethod: "Credit Card",
      status: "PAID",
      purchaseDate: new Date().toISOString(),
      note: "Please allocate aisle seats",
    },
    {
      id: "ORD-20251129-010",
      buyerName: "Trần Thị B",
      buyerEmail: "b.tran@example.com",
      buyerPhone: "+84 901 234 567",
      items: [
        { ticketId: "t2", name: "VIP Pass", unitPrice: 199, qty: 1 },
        { ticketId: "t3", name: "Student Ticket", unitPrice: 19, qty: 1 },
      ],
      qty: 2,
      total: 218,
      paymentMethod: "PayPal",
      status: "PENDING",
      purchaseDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "ORD-20251128-003",
      buyerName: "Công ty XYZ",
      buyerEmail: "orders@xyz.vn",
      buyerPhone: "+84 88 123 4567",
      items: [{ ticketId: "t4", name: "Group Bundle — 5 Tickets", unitPrice: 195, qty: 1 }],
      qty: 5,
      total: 195,
      paymentMethod: "Bank Transfer",
      status: "REFUNDED",
      purchaseDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      note: "Refund processed due to event postponement",
    },
  ];

  const list = orders && orders.length > 0 ? orders : fakeOrders;

  const [selected, setSelected] = useState<OrderDto | null>(null);
  const [query, setQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [pageSize, setPageSize] = useState<number>(10);

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    return list
      .filter((o) => (statusFilter === "ALL" ? true : o.status === statusFilter))
      .filter((o) => {
        if (!q) return true;
        return (
          o.id.toLowerCase().includes(q) ||
          o.buyerName.toLowerCase().includes(q) ||
          (o.buyerEmail || "").toLowerCase().includes(q)
        );
      });
  }, [list, query, statusFilter]);

  // simple pagination
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [page, setPage] = useState(1);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold">Transactions {eventId ? `— ${eventId}` : ""}</div>
          <div className="text-sm text-gray-500">({totalItems})</div>
        </div>

        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search order / buyer / email"
            className="border rounded px-3 py-2 text-sm w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border px-2 py-2 rounded text-sm"
            aria-label="Filter by status"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border px-2 py-2 rounded text-sm"
            aria-label="Page size"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}/page
              </option>
            ))}
          </select>

          <button className="flex items-center gap-2 px-3 py-2 bg-white border rounded text-sm hover:shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        {/* header */}
        <div
          className="sticky top-0 bg-white z-10 grid gap-4 px-6 py-3 border-b text-sm font-semibold text-gray-700"
          style={{ gridTemplateColumns: "1.6fr 1fr 0.6fr 0.8fr 0.9fr 0.6fr 0.5fr" }}
        >
          <div>Order</div>
          <div>Buyer</div>
          <div className="text-right">Qty</div>
          <div className="text-right">Total</div>
          <div className="text-center">Payment</div>
          <div className="text-center">Status</div>
          <div className="text-right">•••</div>
        </div>

        <div className="max-h-[56vh] overflow-y-auto">
          {paged.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">No transactions found</div>
          ) : (
            paged.map((o) => (
              <div
                key={o.id}
                className="grid gap-4 px-6 py-4 border-b items-center hover:bg-gray-50"
                style={{ gridTemplateColumns: "1.6fr 1fr 0.6fr 0.8fr 0.9fr 0.6fr 0.5fr" }}
              >
                <div className="truncate">
                  <div className="font-medium">{o.id}</div>
                  <div className="text-sm text-muted-foreground truncate">{fmt(o.purchaseDate)}</div>
                </div>

                <div className="truncate">
                  <div className="font-medium">{o.buyerName}</div>
                  <div className="text-sm text-muted-foreground truncate">{o.buyerEmail ?? o.buyerPhone}</div>
                </div>

                <div className="text-right">{o.qty}</div>

                <div className="text-right font-semibold">{fmtPrice(o.total)}</div>

                <div className="text-center text-sm">{o.paymentMethod}</div>

                <div className="text-center">
                  <Badge status={o.status} />
                </div>

                <div className="text-right flex items-center justify-end gap-2">
                  <button
                    title="View"
                    onClick={() => setSelected(o)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    title="Refund"
                    onClick={() => {
                      /* demo only: mark refunded locally */
                      o.status = "REFUNDED";
                      setSelected({ ...o });
                    }}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <RefreshCw className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* pagination footer */}
        <div className="px-4 py-3 flex items-center justify-between border-t">
          <div className="text-sm text-gray-600">
            Showing {totalItems === 0 ? 0 : (page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalItems)} of {totalItems}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <div className="text-sm px-2">{page} / {totalPages}</div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Order details modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">{selected.id}</h3>
                <div className="text-sm text-muted-foreground">{fmt(selected.purchaseDate)}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-600 mr-4">Status: <Badge status={selected.status} /></div>
                <button className="text-gray-600" onClick={() => setSelected(null)}>✕</button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground">Buyer</div>
                  <div className="font-medium">{selected.buyerName}</div>
                  <div className="text-sm">{selected.buyerEmail}</div>
                  <div className="text-sm">{selected.buyerPhone}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Payment</div>
                  <div className="font-medium">{selected.paymentMethod}</div>
                  <div className="text-sm">Status: {selected.status}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Totals</div>
                  <div className="font-medium">{fmtPrice(selected.total)}</div>
                  <div className="text-sm">Qty: {selected.qty}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Items</div>
                <div className="border rounded">
                  {selected.items.map((it) => (
                    <div key={it.ticketId} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-sm text-muted-foreground">Unit: {fmtPrice(it.unitPrice)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{it.qty}x</div>
                        <div className="text-sm">{fmtPrice(it.unitPrice * it.qty)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selected.note && (
                <div>
                  <div className="text-sm text-muted-foreground">Note</div>
                  <div className="text-sm">{selected.note}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 p-4 border-t">
              <button className="px-4 py-2 border rounded" onClick={() => setSelected(null)}>Close</button>
              <button
                className="px-4 py-2 bg-[var(--primary-admin)] text-white rounded"
                onClick={() => {
                  /* demo: mark paid */
                  selected.status = "PAID";
                  setSelected({ ...selected });
                }}
              >
                Mark as Paid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTransactionSection;