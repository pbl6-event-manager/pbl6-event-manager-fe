export interface FilterState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  sortOrder: "asc" | "desc" | "";
}

export const FILTER_STATE_DEFAULT : FilterState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  sortOrder: "",
}

export function applyUserFilters(users: any[], filters: FilterState) {
  let result = [...users];

  if (filters.firstName) {
    result = result.filter((u) =>
      u.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
    );
  }

  if (filters.lastName) {
    result = result.filter((u) =>
      u.firstName.toLowerCase().includes(filters.lastName.toLowerCase())
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
    console.log(result[0].roles);
    result = result.filter((u) => u.roles === filters.role);
  }

  if (filters.sortOrder === "asc" || filters.sortOrder === "desc") {
    result.sort((a, b) => {
      const nameA = a.lastName?.toLowerCase() || "";
      const nameB = b.lastName?.toLowerCase() || "";
      return filters.sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  } else {
    result.sort((a, b) => a.id - b.id);
  }

  return result;
}
