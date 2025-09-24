export interface EventFilterState {
    title: string;
    description: string;
    location: string;
    status: string;
    sortOrder: "asc" | "desc" | "";
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


  if (filters.status) {
    result = result.filter((u) => u.role === filters.status);
  }


  if (filters.sortOrder) {
    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return filters.sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

  return result;
}