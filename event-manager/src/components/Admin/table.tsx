import React from "react";
import { Pencil, Trash, RotateCcw, Check, X } from "lucide-react"; 
import { truncateText } from "../../utils/Admin/table-handle";
import type { TableProps } from "../../models/component-props/table-component-props";
import { useTableViewModel } from "../../viewmodels/Admin/component/table-view-model";

const Table: React.FC<TableProps> = ({ columns, data, className, getRowActions, onRowClick }) => {
  const {
    tableRef,
    handleNext,
    handlePrev,
    totalPages,
    currentPage,
    currentData,
    isWrapText
  } = useTableViewModel(data);

  return (
    <div ref={tableRef} className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border border-[var(--border-secondary)] text-sm text-left table-fixed">
        <thead className="bg-[var(--primary-admin)]">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-[var(--border-secondary)] font-medium text-[var(--containertext)]"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row: any, rowIndex: number) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row, rowIndex)}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                } ${onRowClick ? "cursor-pointer hover:bg-gray-100" : ""}`} 
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border-b border-[var(--border-secondary)] text-[var(--defaulttext)] max-w-[200px] truncate"
                    title={row[col.accessor]}
                  >
                    {col.type === "image" ? (
                      <img
                        src={
                          row[col.accessor] && row[col.accessor].trim() !== ""
                            ? row[col.accessor]
                            : "https://i.pravatar.cc/100?img=7"
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : col.type === "action" ? (
                      <div className="flex items-center gap-3">
                        {getRowActions &&
                          getRowActions(row, rowIndex).map((action, i) => {
                            const key = `${action.type ?? "action"}-${i}`;
                            switch (action.type) {
                              case "edit":
                                return (
                                  <button 
                                    key={key} 
                                    type="button"
                                    className="hover:text-blue-500 cursor-pointer" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.onClick?.();
                                    }}>
                                    <Pencil size={18} />
                                  </button>
                                );
                              case "delete":
                                return (
                                  <button 
                                    key={key} 
                                    className="hover:text-red-500 cursor-pointer" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.onClick?.();
                                    }}>
                                    <Trash size={18} />
                                  </button>
                                );
                              case "recover":
                                return (
                                  <button 
                                    key={key} 
                                    className="hover:text-green-500 cursor-pointer" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.onClick?.();
                                    }}>
                                    <RotateCcw size={18} />
                                  </button>
                                );
                              case "accept":
                                return (
                                  <button 
                                    key={key} 
                                    className="hover:text-green-500 cursor-pointer" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.onClick?.();
                                    }}>
                                    <Check size={18} />
                                  </button>
                                );
                              case "reject":
                                return (
                                  <button 
                                    key={key} 
                                    className="hover:text-red-500 cursor-pointer" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.onClick?.();
                                    }}>
                                    <X size={18} />
                                  </button>
                                );
                              default:
                                return null;
                            }
                          })}
                      </div>
                    ) : (
                      truncateText(row[col.accessor], isWrapText ? 50 : 15)
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-4 text-center text-[var(--text-secondary)]"
              >
                Nothing to show
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="sticky bottom-0 left-0 right-0 bg-white py-3 flex items-center justify-center gap-4 text-[var(--defaulttext)] border-t border-[var(--border-secondary)] select-none shadow-sm">
          <span
            onClick={currentPage > 1 ? handlePrev : undefined}
            className={`cursor-pointer ${
              currentPage === 1
                ? "opacity-40 cursor-default"
                : "hover:text-[var(--primary-admin)] transition-colors"
            }`}
          >
            ← Prev
          </span>

          <span>
            Trang <strong>{currentPage}</strong> / {totalPages}
          </span>

          <span
            onClick={currentPage < totalPages ? handleNext : undefined}
            className={`cursor-pointer ${
              currentPage === totalPages
                ? "opacity-40 cursor-default"
                : "hover:text-[var(--primary-admin)] transition-colors"
            }`}
          >
            Next →
          </span>
        </div>
      )}
    </div>
  );
};

export default Table;
