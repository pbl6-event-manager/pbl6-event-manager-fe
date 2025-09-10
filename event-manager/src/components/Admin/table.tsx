import React, { useState, useEffect, useRef } from "react";
import DropdownMenu from "./dropdown-menu";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./confirm-dialog";

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
  const handleEdit = (email: string) => {
    navigate("/admin/users/edit", { state: { email } }); 
  };

  const handleDelete = () => {
    console.log(selectedUserEmail.current);
    setOpenDialog(false);
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
      <table className="min-w-full border border-gray-200 text-sm text-left table-fixed">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-gray-200 font-medium text-gray-700"
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
                    className="px-4 py-2 border-b border-gray-200 text-gray-800"
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
                          email={row["email"]}
                          ViewDetail={(email) => console.log(email)}
                          onEdit={handleEdit}
                          onDelete={(email) => {
                            selectedUserEmail.current = email;
                            setOpenDialog(true);
                          }}
                        />
                      </div>
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-4 text-center text-gray-500"
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
          title="Xác nhận"
          description="Bạn có chắc muốn xóa tài khoản này không?"
          confirmText="Xóa"
          cancelText="Hủy"
          onConfirm={handleDelete}
        />
    </div>
  );
};

export default Table;
