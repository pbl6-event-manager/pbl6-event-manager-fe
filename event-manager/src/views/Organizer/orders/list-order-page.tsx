import React, { useMemo, useState } from "react";

type Ticket = {
  id: string;
  ticketCode: string;
  type: string;
  seat?: string;
  price: number;
  status: "Used" | "Unused" | "Refunded";
  holderName?: string;
  holderEmail?: string;
};

type Order = {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerEmail: string;
  eventTitle: string;
  orderDate: string;
  qty: number;
  total: number;
  status: "Completed" | "Pending" | "Refunded" | "Cancelled";
  // details loaded when viewing
  tickets?: Ticket[];
};

const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    orderNumber: "ORD-2025-0001",
    buyerName: "Nguyễn Văn A",
    buyerEmail: "a.nguyen@example.com",
    eventTitle: "Summer Music Fest",
    orderDate: "2025-06-12",
    qty: 2,
    total: 120,
    status: "Completed",
  },
  {
    id: "o2",
    orderNumber: "ORD-2025-0002",
    buyerName: "Trần Thị B",
    buyerEmail: "b.tran@example.com",
    eventTitle: "React Conference",
    orderDate: "2025-07-01",
    qty: 1,
    total: 45,
    status: "Pending",
  },
  {
    id: "o3",
    orderNumber: "ORD-2025-0003",
    buyerName: "Lê C",
    buyerEmail: "c.le@example.com",
    eventTitle: "Startup Demo Day",
    orderDate: "2025-05-20",
    qty: 4,
    total: 200,
    status: "Refunded",
  },
  {
    id: "o4",
    orderNumber: "ORD-2025-0004",
    buyerName: "Phạm D",
    buyerEmail: "d.pham@example.com",
    eventTitle: "Design Workshop",
    orderDate: "2025-04-30",
    qty: 1,
    total: 30,
    status: "Cancelled",
  },
  {
    id: "o5",
    orderNumber: "ORD-2025-0005",
    buyerName: "Hoàng E",
    buyerEmail: "e.hoang@example.com",
    eventTitle: "Community Meetup",
    orderDate: "2025-08-10",
    qty: 3,
    total: 75,
    status: "Completed",
  },
];

const statusColor = (s: Order["status"]) => {
  switch (s) {
    case "Completed":
      return "bg-green-50 text-green-800";
    case "Pending":
      return "bg-yellow-50 text-yellow-800";
    case "Refunded":
      return "bg-blue-50 text-blue-800";
    case "Cancelled":
      return "bg-red-50 text-red-800";
    default:
      return "bg-gray-50 text-gray-800";
  }
};

// return mock details (tickets) for an order id
const getMockOrderDetails = (order: Order): Order => {
  // create mock tickets based on qty
  const tickets: Ticket[] = Array.from({ length: Math.max(1, order.qty) }).map((_, idx) => ({
    id: `${order.id}-t${idx + 1}`,
    ticketCode: `${order.orderNumber}-T${idx + 1}`,
    type: idx === 0 ? "General Admission" : "VIP",
    seat: idx % 2 === 0 ? `A${10 + idx}` : undefined,
    price: Math.round(order.total / order.qty),
    status: idx === 0 ? "Unused" : "Used",
    holderName: `${order.buyerName}`,
    holderEmail: order.buyerEmail,
  }));

  return {
    ...order,
    tickets,
  };
};

const OrderDetailModal: React.FC<{
  order: Order;
  onClose: () => void;
}> = ({ order, onClose }) => {
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 overflow-auto" style={{ maxHeight: "85vh" }}>
        <header className="flex items-center justify-between p-6 border-b">
          <div>
            <div className="text-sm text-gray-500">Order</div>
            <div className="text-lg font-semibold">{order.orderNumber}</div>
            <div className="text-xs text-gray-500">{order.orderDate}</div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-lg font-semibold">${order.total.toFixed(2)}</div>
            </div>
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close">
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
              <div className="text-sm text-gray-600">Qty: {order.qty}</div>
              <div className="mt-2">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </section>

          <section>
            <h4 className="font-semibold mb-3">Tickets</h4>
            <div className="bg-gray-50 rounded-md divide-y border">
              {(order.tickets || []).map((t) => {
                const open = expandedTicket === t.id;
                return (
                  <div key={t.id} className="p-4 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{t.type} <span className="text-xs text-gray-500 ml-2">{t.ticketCode}</span></div>
                        <div className="text-xs text-gray-500">{t.seat ? `Seat: ${t.seat}` : "General admission"}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm text-gray-700">${t.price.toFixed(2)}</div>
                        <button
                          type="button"
                          className="text-sm text-indigo-600 hover:underline cursor-pointer"
                          onClick={() => setExpandedTicket(open ? null : t.id)}
                        >
                          {open ? "Hide" : "Details"}
                        </button>
                      </div>
                    </div>

                    {open && (
                      <div className="mt-3 bg-white border rounded p-3 text-sm text-gray-700">
                        <div><strong>Code:</strong> {t.ticketCode}</div>
                        <div><strong>Holder:</strong> {t.holderName} ({t.holderEmail})</div>
                        <div><strong>Status:</strong> {t.status}</div>
                        {t.seat && <div><strong>Seat:</strong> {t.seat}</div>}
                      </div>
                    )}
                  </div>
                );
              })}
              {(!order.tickets || order.tickets.length === 0) && (
                <div className="p-4 text-sm text-gray-500">No tickets found for this order.</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const ListOrderPage: React.FC = () => {
  const [q, setQ] = useState("");
  const [searchBy, setSearchBy] = useState("buyer");
  const [dateRange, setDateRange] = useState("past-3-months");
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter((o) => {
      if (searchBy === "buyer") {
        return o.buyerName.toLowerCase().includes(term) || o.buyerEmail.toLowerCase().includes(term);
      }
      if (searchBy === "order-number") {
        return o.orderNumber.toLowerCase().includes(term);
      }
      return o.buyerName.toLowerCase().includes(term) || o.buyerEmail.toLowerCase().includes(term) || o.orderNumber.toLowerCase().includes(term);
    });
  }, [q, searchBy, orders]);

  const handleView = (id: string) => {
    const o = orders.find((x) => x.id === id);
    if (!o) return;
    // load details (mock)
    const detailed = getMockOrderDetails(o);
    setSelectedOrder(detailed);
  };

  const closeModal = () => setSelectedOrder(null);

  return (
    <div className="p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Order Management</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Manage all orders, including editing buyer info, resending tickets and processing refunds.
            To download a list of orders <a className="text-indigo-600 underline" href="#">Click here</a>.
          </p>
        </header>

        <section className="mb-10">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-7">
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order number, email, or name" className="w-full pl-12 pr-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>
            </div>

            <div className="col-span-2">
              <label className="sr-only">Search by</label>
              <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="w-full py-3 px-4 border rounded-md bg-white">
                <option value="buyer">Buyer</option>
                <option value="order-number">Order number</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div className="col-span-3">
              <label className="sr-only">Date range</label>
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="w-full py-3 px-4 border rounded-md bg-white">
                <option value="past-3-months">Past 3 months</option>
                <option value="past-6-months">Past 6 months</option>
                <option value="past-year">Past year</option>
                <option value="all-time">All time</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button type="button" className="px-6 py-3 bg-[#f05537] text-white rounded-lg cursor-pointer shadow hover:bg-[#e04628]" onClick={() => { console.log("Load all orders (mock)"); alert("Loaded all mock orders"); }}>
              Load all orders
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">For faster results, try applying filters if you have a large number of events. This helps avoid loading delays.</p>
        </section>

        <section className="min-h-[320px]">
          <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-700">
              <div className="col-span-2">Order #</div>
              <div className="col-span-3">Buyer</div>
              <div className="col-span-2">Event</div>
              <div className="col-span-1 text-right">Qty</div>
              <div className="col-span-1 text-right">Total</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {filtered.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">No orders found</div>
            ) : (
              filtered.map((o) => (
                <div key={o.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-2">
                    <div className="font-medium text-sm">{o.orderNumber}</div>
                    <div className="text-xs text-gray-500">{o.orderDate}</div>
                  </div>

                  <div className="col-span-3">
                    <div className="font-medium">{o.buyerName}</div>
                    <div className="text-xs text-gray-500">{o.buyerEmail}</div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-sm font-medium">{o.eventTitle}</div>
                  </div>

                  <div className="col-span-1 text-right">{o.qty}</div>
                  <div className="col-span-1 text-right">${o.total.toFixed(2)}</div>

                  <div className="col-span-2">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusColor(o.status)}`}>{o.status}</span>
                  </div>

                  <div className="col-span-1 flex items-center justify-center gap-2">
                    <button type="button" className="text-sm text-indigo-600 hover:underline cursor-pointer" onClick={() => handleView(o.id)}>View</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={closeModal} />}
    </div>
  );
};

export default ListOrderPage;