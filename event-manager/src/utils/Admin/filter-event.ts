export interface EventFilterState {
    title: string;
    description: string;
    location: string;
    status: string;
    sortOrder: "asc" | "desc" | "";
    startDateFrom?: string;
    startDateTo?: string;
    endDateFrom?: string;
    endDateTo?: string;
}


export function applyEventFilters(events: any[], filters: EventFilterState) {
  let result = [...events];

  if (filters.title) {
    result = result.filter((u) =>
      u.title.toLowerCase().includes(filters.title.toLowerCase())
    );
  }


  if (filters.description) {
    result = result.filter((u) =>
      u.description.toLowerCase().includes(filters.description.toLowerCase())
    );
  }


  if (filters.location) {
    result = result.filter((u) =>
      u.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  if (filters.startDateFrom) {
    const from = new Date(filters.startDateFrom);
    result = result.filter((u) => new Date(u.starttime) >= from);
  }

  if (filters.startDateTo) {
    const to = new Date(filters.startDateTo);
    result = result.filter((u) => new Date(u.starttime) <= to);
  }

  // --- Lọc theo End Date ---
  if (filters.endDateFrom) {
    const from = new Date(filters.endDateFrom);
    result = result.filter((u) => new Date(u.endtime) >= from);
  }

  if (filters.endDateTo) {
    const to = new Date(filters.endDateTo);
    result = result.filter((u) => new Date(u.endtime) <= to);
  }


  if (filters.status) {
    result = result.filter((u) => u.status === filters.status);
  }


  if (filters.sortOrder) {
    result.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return filters.sortOrder === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });
  }

  return result;
}