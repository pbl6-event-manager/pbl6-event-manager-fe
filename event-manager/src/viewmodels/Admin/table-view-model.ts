import { useState, useRef, useEffect } from "react";

export function useTableViewModel(data: any) {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // ⚙️ Tính tổng số trang
  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;

  // Nếu data thay đổi (ví dụ sau khi lọc, thêm/xoá), đảm bảo không bị vượt trang
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [data, totalPages, currentPage]);

  // ⚙️ Lấy dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // ⚙️ Xử lý chuyển trang
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };


  return {
    tableRef,
    openMenuIndex,
    currentPage,
    setOpenMenuIndex,
    totalPages,
    startIndex,
    currentData,
    handlePrev,
    handleNext,
    goToPage
  };
}
