/**
 * Convert date, time, and timezone (e.g. from input fields)
 * into an ISO 8601 datetime string with timezone offset.
 *
 * Example:
 *  date: "2025-10-31"
 *  time: "14:30"
 *  timezone: "GMT+07:00" | "+07:00" | undefined
 *  --> "2025-10-31T14:30:00.000+07:00"
 */
export function convertToISODateTime(date: string, time: string, timezone?: string): string {
  // Basic validation
  if (!date || !time) {
    throw new Error("Missing required parameters: date or time")
  }

  // Normalize date format YYYY-MM-DD
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  if (!datePattern.test(date)) {
    throw new Error("Invalid date format. Expected YYYY-MM-DD")
  }

  // Normalize time "HH:MM"
  const timeParts = time.split(":")
  if (timeParts.length < 2) {
    throw new Error("Invalid time format. Expected HH:MM")
  }
  const hours = timeParts[0].padStart(2, "0")
  const minutes = timeParts[1].padStart(2, "0")

  // Resolve timezone offset to format +HH:MM or -HH:MM.
  const resolveTimezoneOffset = (tz?: string): string => {
    if (!tz) {
      // fallback: use local environment offset
      const offsetMin = -new Date().getTimezoneOffset() // minutes ahead of UTC
      const sign = offsetMin >= 0 ? "+" : "-"
      const abs = Math.abs(offsetMin)
      const hh = String(Math.floor(abs / 60)).padStart(2, "0")
      const mm = String(abs % 60).padStart(2, "0")
      return `${sign}${hh}:${mm}`
    }

    let clean = tz.replace(/^GMT/i, "").trim()
    // Accept Z / UTC
    if (clean === "Z" || /^UTC$/i.test(clean)) return "+00:00"
    // Accept +HH:MM or -HH:MM
    if (/^[+-]\d{2}:\d{2}$/.test(clean)) return clean
    // Accept GMT±HH or UTC±HH
    if (/^UTC[+-]\d{1,2}$/.test(clean)) {
      const sign = clean.includes("+") ? "+" : "-"
      const hh = clean.split(sign)[1].padStart(2, "0")
      return `${sign}${hh}:00`
    }
    // Accept +HHMM or -HHMM
    const m = clean.match(/^([+-])(\d{2})(\d{2})$/)
    if (m) return `${m[1]}${m[2]}:${m[3]}`
    throw new Error("Invalid timezone format. Expected GMT±HH:MM or ±HH:MM")
  }

  const tzOffset = resolveTimezoneOffset(timezone)
  const isoString = `${date}T${hours}:${minutes}:00.000${tzOffset}`

  // Validate created ISO
  const check = new Date(isoString)
  if (isNaN(check.getTime())) {
    throw new Error("Produced Invalid Date from inputs")
  }

  return isoString
}

export const fmt = (s?: string | Date | null) =>
  s ? new Date(s).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

export const formatExpiry = (raw: any) => {
  const s =
    raw?.expiresAt ?? raw?.validTo ?? raw?.valid_to ?? raw?.expiry ?? raw;
  if (!s) return { local: "—", gmt: "—" };
  const d = new Date(String(s));
  if (isNaN(d.getTime())) return { local: String(s), gmt: "—" };

  const local = d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  let tzName = "";
  try {
    const parts = new Intl.DateTimeFormat(undefined, {
      timeZoneName: "long",
    }).formatToParts(d);
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    tzName = tzPart ? tzPart.value : "";
  } catch {
    tzName = "";
  }

  const offsetMinutes = -d.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const hh = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(
    2,
    "0"
  );
  const mm = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");
  const gmt = `GMT${sign}${hh}:${mm}`;

  return { local, gmt };
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const formatDateRange = (startDate: string, endDate: string, startTime: string, endTime: string) => {
  if (endDate === "") {
    const formattedStartDate = formatDate(startDate)
    return formattedStartDate
  }
  return `${formatDate(startDate)}, ${startTime} - ${formatDate(endDate)}, ${endTime}`
}