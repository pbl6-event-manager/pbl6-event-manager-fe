import React from "react";
import { useOrderViewModel } from "../../../viewmodels/Organizer/orders/order-view-model";
import type { SEARCH_BY_ENUM, SEARCH_TIME_ENUM } from "../../../dtos/order-dto";
import { fmt } from "../../../utils/Organizer/date-format";
import { OrderDetailModal } from "./order-details-modal";

const ListOrderPage: React.FC = () => {
  const {
    orders = [],
    eventList = [],
    q,
    setQ,
    eventSearch,
    setEventSearch,
    searchBy,
    setSearchBy,
    dateRange,
    setDateRange,
    statusColor,
    statusText,
    onLoadClick,
    closeModal,
    handleView,
    selectedOrder,
    currentPage,
    pageSize,
    pagedOrders,
    setCurrentPage,
    setPageSize,
    totalItems,
    totalPages
  } = useOrderViewModel();

  return (
    <div className="p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            Order Management
          </h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Manage and track all orders for the events you have created. Use the filters above to search by event, time range, or buyer information, then click “Load all orders” to load the matching list.
          </p>
        </header>

        <section className="mb-10">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5">
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search order number, email, or name"
                  className="w-full pl-12 pr-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

            <div className="col-span-3">
              <label className="sr-only">Events</label>
              <select
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                className="w-full py-3 px-4 border rounded-md bg-white"
              >
                <option value="all">All events</option>
                {eventList.map((ev: any) => (
                  <option key={ev.id} value={String(ev.id)}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="sr-only">Search by</label>
              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value as SEARCH_BY_ENUM)}
                className="w-full py-3 px-4 border rounded-md bg-white"
              >
                <option value="BUYER">Buyer</option>
                <option value="ORDER_ID">Order ID</option>
                <option value="EMAIL">Email</option>
                <option value="--">--</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="sr-only">Date range</label>
              <select
                value={dateRange}
                onChange={(e) =>
                  setDateRange(e.target.value as SEARCH_TIME_ENUM)
                }
                className="w-full py-3 px-4 border rounded-md bg-white"
              >
                <option value="LAST_24_HOURS">Last 24 hours</option>
                <option value="LAST_7_DAYS">Last 7 days</option>
                <option value="LAST_30_DAYS">Last 30 days</option>
                <option value="THIS_MONTH">This month</option>
                <option value="LAST_MONTH">Last month</option>
                <option value="THIS_YEAR">This year</option>
                <option value="LAST_YEAR">Last year</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="button"
              className="px-6 py-3 bg-[#f05537] text-white rounded-lg cursor-pointer shadow hover:bg-[#e04628]"
              onClick={onLoadClick}
            >
              Load all orders
            </button>
          </div>
        </section>

        <section className="min-h-[320px]">
          <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
            {orders.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No orders found
              </div>
            ) : (
              <>
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-700">
                  <div className="col-span-2">Order #</div>
                  <div className="col-span-3">Buyer</div>
                  <div className="col-span-2">Event</div>
                  <div className="col-span-1 text-center">Quantity</div>
                  <div className="col-span-1 text-center">Total</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>

                {pagedOrders.map((o: any) => (
                  <div
                    key={o.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-2">
                      <div className="font-medium text-sm">{o.id}</div>
                      <div className="text-xs text-gray-500">
                        {fmt(o.createdAt)}
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className="font-medium">{o.buyerName}</div>
                      <div className="text-xs text-gray-500">
                        {o.buyerEmail}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="text-sm font-medium">{o.eventTitle}</div>
                    </div>

                    <div className="col-span-1 text-center">{o.quantity}</div>
                    <div className="col-span-1 text-center">${o.total}</div>

                    <div className="col-span-2 text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                          o.status
                        )}`}
                      >
                        {statusText(o.status)}
                      </span>
                    </div>

                    <div className="col-span-1 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        className="text-sm text-indigo-600 hover:underline cursor-pointer"
                        onClick={() => handleView(o.id)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between px-2">
                  <div className="text-sm text-gray-600">
                    Showing {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{" "}
                    {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      {[5, 10, 20, 50].map((s) => (
                        <option key={s} value={s}>
                          {s} / page
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-1">
                      <button
                        className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        aria-label="Previous page"
                      >
                        Prev
                      </button>

                      <div className="flex items-center gap-1 px-2">
                        {Array.from({ length: totalPages }).map((_, i) => {
                          const page = i + 1;
                          if (
                            totalPages > 9 &&
                            Math.abs(page - currentPage) > 3 &&
                            page !== 1 &&
                            page !== totalPages
                          ) {
                            if (page === 2 && currentPage > 5)
                              return (
                                <span key={page} className="px-2">
                                  ...
                                </span>
                              );
                            if (page === totalPages - 1 && currentPage < totalPages - 4)
                              return (
                                <span key={page} className="px-2">
                                  ...
                                </span>
                              );
                            return null;
                          }
                          return (
                            <button
                              key={page}
                              className={`px-2 py-1 rounded cursor-pointer ${
                                page === currentPage ? "bg-gray-200" : "hover:bg-gray-100"
                              }`}
                              onClick={() => setCurrentPage(page)}
                              aria-label={`Go to page ${page}`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        aria-label="Next page"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
        </section>
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
};

export default ListOrderPage;
