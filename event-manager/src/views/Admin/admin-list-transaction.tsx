import React, { useMemo, useState } from "react";

type Transaction = {
  id: string;
  user: string;
  event: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed" | "refunded";
  paymentMethod: string;
  createdAt: string; // ISO
  reference?: string;
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "T1001", user: "Nguyen Van A", event: "Concert A", amount: 120000, currency: "VND", status: "paid", paymentMethod: "Card", createdAt: "2025-11-25T10:12:00Z", reference: "REF001" },
  { id: "T1002", user: "Tran Thi B", event: "Workshop B", amount: 50000, currency: "VND", status: "pending", paymentMethod: "Momo", createdAt: "2025-11-26T08:30:00Z", reference: "REF002" },
  { id: "T1003", user: "Le Van C", event: "Seminar C", amount: 200000, currency: "VND", status: "failed", paymentMethod: "Card", createdAt: "2025-11-24T15:45:00Z", reference: "REF003" },
  { id: "T1004", user: "Pham Thi D", event: "Concert A", amount: 150000, currency: "VND", status: "paid", paymentMethod: "Cash", createdAt: "2025-11-20T12:00:00Z", reference: "REF004" },
  { id: "T1005", user: "Hoang Van E", event: "Workshop B", amount: 75000, currency: "VND", status: "refunded", paymentMethod: "Card", createdAt: "2025-11-22T09:10:00Z", reference: "REF005" },
  { id: "T1006", user: "Nguyen Thi F", event: "Gala Night", amount: 300000, currency: "VND", status: "paid", paymentMethod: "PayPal", createdAt: "2025-11-27T20:00:00Z", reference: "REF006" },
  { id: "T1007", user: "Do Van G", event: "Seminar C", amount: 90000, currency: "VND", status: "pending", paymentMethod: "Momo", createdAt: "2025-11-28T11:22:00Z", reference: "REF007" },
  { id: "T1008", user: "Tran Van H", event: "Concert A", amount: 110000, currency: "VND", status: "paid", paymentMethod: "Card", createdAt: "2025-11-21T14:33:00Z", reference: "REF008" },
  { id: "T1009", user: "Le Thi I", event: "Gala Night", amount: 250000, currency: "VND", status: "paid", paymentMethod: "Cash", createdAt: "2025-11-23T18:05:00Z", reference: "REF009" },
  { id: "T1010", user: "Vu Van J", event: "Workshop B", amount: 60000, currency: "VND", status: "failed", paymentMethod: "Card", createdAt: "2025-11-29T07:45:00Z", reference: "REF010" },
];

const formatCurrency = (v: number, currency = "VND") =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency }).format(v);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });

const PAGE_SIZE = 5;

const StatusBadge: React.FC<{ status: Transaction["status"] }> = ({ status }) => {
  const map: Record<Transaction["status"], string> = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-blue-100 text-blue-800",
  };
  return <span className={`text-xs px-2 py-1 rounded-full ${map[status]}`}>{status}</span>;
};

const TransactionsView: React.FC = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | Transaction["status"]>("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const start = (page - 1) * PAGE_SIZE;
    const result = MOCK_TRANSACTIONS.filter((t) => {
      const matchQ =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.user.toLowerCase().includes(q) ||
        t.event.toLowerCase().includes(q) ||
        (t.reference || "").toLowerCase().includes(q);
      const matchStatus = !statusFilter || t.status === statusFilter;
      return matchQ && matchStatus;
    });
    return { items: result.slice(start, start + PAGE_SIZE), total: result.length };
  }, [query, statusFilter, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.total / PAGE_SIZE));

  return (
    <div className="p-6 bg-[var(--surface)] text-[var(--defaulttext)] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Transaction Management</h2>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by id, user, event, ref..."
            className="px-3 py-2 rounded border border-[var(--border)] bg-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setPage(1);
            }}
            className="px-3 py-2 rounded border border-[var(--border)] bg-white"
          >
            <option value="">All statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-[var(--surface-muted)] text-left text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Ref</th>
            </tr>
          </thead>
          <tbody>
            {filtered.items.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-[var(--muted)]">
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.items.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{t.id}</td>
                  <td className="px-4 py-3">{t.user}</td>
                  <td className="px-4 py-3">{t.event}</td>
                  <td className="px-4 py-3">{formatCurrency(t.amount, t.currency)}</td>
                  <td className="px-4 py-3">{t.paymentMethod}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-4 py-3">{formatDate(t.createdAt)}</td>
                  <td className="px-4 py-3">{t.reference || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-[var(--muted)]">
          Showing {(page - 1) * PAGE_SIZE + 1} -{" "}
          {Math.min(page * PAGE_SIZE, filtered.total)} of {filtered.total}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >
            Prev
          </button>
          <div className="px-3">{page} / {totalPages}</div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;