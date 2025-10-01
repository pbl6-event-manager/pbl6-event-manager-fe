import React, { useState, useEffect, useRef } from "react";
import DropdownMenu from "./dropdown-menu";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./confirm-dialog";
import { useUserDetailViewModel } from "../../viewmodels/Admin/user-detail-view-model";
import { truncateText } from "../../utils/Admin/table-handle";

interface Column {
  header: string;
  accessor: string;
  type?: "text" | "image" | "action";
}

interface TableProps {
  columns: Column[];
  data: any[];
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const selectedUserEmail = useRef<string>("");
  const { selectUser } = useUserDetailViewModel();
  const handleEdit = (email: string) => {
    navigate("/admin/users/edit", { state: { email } }); 
  };

  const handleDelete = () => {
    console.log(selectedUserEmail.current);
    setOpenDialog(false);
  }

  const handleViewDetail = (email: string) => {
    selectUser(email);
    navigate("/admin/users/details");
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                            setOpenMenuIndex(openMenuIndex === rowIndex ? null : rowIndex)
                          }
                          items={[
                            {
                              label: "Details",
                              onClick: () => handleViewDetail(row.email),
                            },
                            {
                              label: "Update",
                              onClick: () => handleEdit(row.email),
                            },
                            {
                              label: "Delete",
                              onClick: () => {
                                selectedUserEmail.current = row.email;
                                setOpenDialog(true);
                              },
                              danger: true,
                            },
                          ]}
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
      <ConfirmDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Confirm"
          description="Are you sure you want to delete this account?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
        />
    </div>
  );
};

export default Table;
