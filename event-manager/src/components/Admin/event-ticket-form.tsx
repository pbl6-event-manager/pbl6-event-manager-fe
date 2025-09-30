import React from "react";
import type { TicketListProps } from "../../models/Admin/ticket-models";

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  addTicket,
  handleTicketChange,
  removeTicket,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block font-medium">Tickets</label>
        <button
          type="button"
          onClick={addTicket}
          className="px-3 py-1 bg-[var(--primary-admin)] text-white rounded hover:bg-[var(--primary-hover)]"
        >
          + Add
        </button>
      </div>

      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="grid grid-cols-3 gap-4 items-start mb-4 border p-3 rounded"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              value={ticket.name}
              onChange={(e) => handleTicketChange(index, "name", e.target.value)}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Price</label>
            <input
              type="number"
              value={ticket.price}
              onChange={(e) =>
                handleTicketChange(
                  index,
                  "price",
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Quantity</label>
            <div className="flex">
              <input
                type="number"
                value={ticket.quantity}
                onChange={(e) =>
                  handleTicketChange(
                    index,
                    "quantity",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="border rounded p-2 w-full"
              />
              <button
                type="button"
                onClick={() => removeTicket(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
