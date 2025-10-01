import React from "react";
import DropdownMenu from "./dropdown-menu";
import { truncateText } from "../../utils/Admin/table-handle";
import type { TableProps } from "../../models/Admin/table-models";
import { useTableViewModel } from "../../viewmodels/Admin/table-view-model";


const Table: React.FC<TableProps> = ({ columns, data, className, getRowActions }) => {
  const { tableRef, openMenuIndex, setOpenMenuIndex } = useTableViewModel();
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
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
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
                      <div className="">
                        <DropdownMenu
                          isOpen={openMenuIndex === rowIndex}
                          onToggle={() =>
                            setOpenMenuIndex(
                              openMenuIndex === rowIndex ? null : rowIndex
                            )
                          }
                          items={getRowActions ? getRowActions(row, rowIndex) : []}
                        />
                      </div>
                    ) : (
                      truncateText(row[col.accessor], 30)
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
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
