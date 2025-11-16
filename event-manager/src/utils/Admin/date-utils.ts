export const validateFromTo = (from: string, to: string) => {
  if (from && to) {
    const dateFrom = new Date(from);
    const dateTo = new Date(to);
    if (dateTo < dateFrom) {
      return { data: [], error: "ValidationError" };
    }
  }
  return {data: [], error: null};
}

export const formatMonthLabel = (d: Date) => d.toLocaleString(undefined, { month: "short", year: "2-digit" });

export const lastNMonths = (n: number) => {
  const now = new Date();
  return Array.from({ length: n }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (n - 1 - i), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, label: formatMonthLabel(d), date: d };
  });
};