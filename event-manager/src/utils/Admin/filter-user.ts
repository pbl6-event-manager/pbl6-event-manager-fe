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

  if (filters.name) {
    result = result.filter((u) =>
      u.fullName.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  if (filters.email) {
    result = result.filter((u) =>
      u.email.toLowerCase().includes(filters.email.toLowerCase())
    );
  }

  if (filters.phone) {
    result = result.filter((u) =>
      u.phone.toLowerCase().includes(filters.phone.toLowerCase())
    );
  }

  if (filters.role) {
    result = result.filter((u) => u.role === filters.role);
  }

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
