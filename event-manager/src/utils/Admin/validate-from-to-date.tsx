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