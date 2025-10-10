export interface FilterState {
  name: string;
  email: string;
  phone: string;
  role: string;
  sortOrder: "asc" | "desc" | "";
}

export const FILTER_STATE_DEFAULT : FilterState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  sortOrder: "",
}

export function applyUserFilters(users: any[], filters: FilterState) {
  let result = [...users];

  // Lọc theo tên
  if (filters.name) {
    result = result.filter((u) =>
      u.fullName.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  // Lọc theo email
  if (filters.email) {
    result = result.filter((u) =>
      u.email.toLowerCase().includes(filters.email.toLowerCase())
    );
  }

  // Lọc theo số điện thoại
  if (filters.phone) {
    result = result.filter((u) =>
      u.phone.toLowerCase().includes(filters.phone.toLowerCase())
    );
  }

  // Lọc theo vai trò
  if (filters.role) {
    result = result.filter((u) => u.role === filters.role);
  }

  // Sắp xếp theo tên (có thể mở rộng)
  if (filters.sortOrder === "asc" || filters.sortOrder === "desc") {
    result.sort((a, b) => {
      const nameA = a.fullName?.toLowerCase() || "";
      const nameB = b.fullName?.toLowerCase() || "";
      return filters.sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  } else {
    result.sort((a, b) => a.id - b.id);
  }

  return result;
}
