import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useTableViewModel(data: any) {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [data, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const location = useLocation();
  const path = location.pathname.toLocaleLowerCase();

  const Paths = ["/admin/categories", "/admin/permissions", "/admin/users"];
  const isWrapText = Paths.some((p) => path === p || path.startsWith(p + "/") || path.includes(p));

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
    goToPage,
    isWrapText
  };
}
