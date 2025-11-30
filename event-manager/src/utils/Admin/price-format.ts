export const fmtPrice = (v: number | undefined) =>
    typeof v === "number"
        ? new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(v)
        : "—";