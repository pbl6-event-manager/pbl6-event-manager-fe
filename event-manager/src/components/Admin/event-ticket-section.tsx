import React, { useState } from "react";
import type { TicketDto } from "../../dtos/ticket-dto";
import { fmt } from "../../utils/Organizer/date-format";
import { fmtPrice } from "../../utils/Admin/price-format";
import type { EventTicketSectionProps } from "../../models/component-props/section-props";

export const EventTicketSection: React.FC<EventTicketSectionProps> = ({tickets}) => {
  const [selectedTicket, setSelectedTicket] = useState<TicketDto | null>();

  return (
    <div>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div
          className="grid gap-4 px-6 py-3 border-b text-sm font-semibold bg-[var(--primary-admin)] text-white"
          style={{ gridTemplateColumns: "1.4fr 1fr 0.8fr 0.8fr 0.6fr" }}
        >
          <div>Ticket</div>
          <div>Type</div>
          <div className="text-right">Price</div>
          <div className="text-center">Available</div>
          <div className="text-center">Sold</div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {tickets?.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No tickets found for this event
            </div>
          ) : (
            tickets?.map((t) => (
              <div
                key={t.id}
                className="grid gap-4 px-6 py-4 border-b items-center cursor-pointer hover:bg-gray-50"
                style={{ gridTemplateColumns: "1.4fr 1fr 0.8fr 0.8fr 0.6fr" }}
                onClick={() => setSelectedTicket(t)}
              >
                <div className="truncate">
                  <div className="font-medium">
                    {t.name ?? "Untitled"}
                  </div>
                  {t.description && (
                    <div className="text-sm text-muted-foreground truncate">
                      {t.description}
                    </div>
                  )}
                </div>
                <div className="truncate">
                  {t.type ?? t.type ?? "General"}
                </div>
                <div className="text-right">{fmtPrice(t.price)}</div>
                <div className="text-center">{t.quantity ?? "—"}</div>
                <div className="text-center">{t.soldQuantity ?? 0}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedTicket(null)}
          />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {selectedTicket.name}
              </h3>
              <button
                className="text-gray-600 cursor-pointer"
                onClick={() => setSelectedTicket(null)}
              >
                ✕
              </button>
            </div>

            {/* details: use three-column grid so labels, colons, values align */}
            <div className="p-4">
              <div
                className="grid gap-y-2 gap-x-4 items-start text-sm"
                style={{ gridTemplateColumns: "100px 1px 1fr" }}
              >
                <div className="font-semibold pr-2">Type</div>
                <div className="flex items-center justify-center font-semibold">:</div>
                <div className="break-words">{selectedTicket.type ?? "—"}</div>

                <div className="font-semibold pr-2">Price</div>
                <div className="flex items-center justify-center">:</div>
                <div>{fmtPrice(selectedTicket.price)}</div>

                <div className="font-semibold pr-2">Quantity</div>
                <div className="flex items-center justify-center">:</div>
                <div>{selectedTicket.quantity ?? "—"}</div>

                <div className="font-semibold pr-2">Sold</div>
                <div className="flex items-center justify-center">:</div>
                <div>{selectedTicket.soldQuantity ?? 0}</div>

                <div className="font-semibold pr-2">Description</div>
                <div className="flex items-center justify-center">:</div>
                <div className="text-muted-foreground">{selectedTicket.description ?? "—"}</div>

                <div className="font-semibold pr-2">Sale start</div>
                <div className="flex items-center justify-center">:</div>
                <div>{fmt(selectedTicket.saleStartDate) ?? "-"}</div>

                <div className="font-semibold pr-2">Sale end</div>
                <div className="flex items-center justify-center">:</div>
                <div>{fmt(selectedTicket.saleEndDate) ?? "-"}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 p-4 border-t ">
              <button
                className="px-4 py-2 border rounded text-white cursor-pointer bg-[var(--primary-admin)]"
                onClick={() => setSelectedTicket(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
