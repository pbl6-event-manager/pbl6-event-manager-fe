/**
 * Convert date, time, and timezone (e.g. from input fields)
 * into an ISO 8601 datetime string with timezone offset.
 *
 * Example:
 *  date: "2025-10-31"
 *  time: "14:30"
 *  timezone: "GMT+07:00"
 *  --> "2025-10-31T14:30:00.0+07:00"
 */
export function convertToISODateTime(date: string, time: string, timezone: string): string {
  if (!date || !time || !timezone) {
    console.log("Missing required parameters: date, time, or timezone");
  }

  // Normalize timezone string
  const cleanTimezone = timezone.replace("GMT", "");
  const tzPattern = /^([+-])(\d{2}):(\d{2})$/;
  const match = cleanTimezone.match(tzPattern);

  if (!match) {
    console.log("Invalid timezone format. Expected format: GMT±HH:MM");
  }

  // Ensure time has leading zeros (safe for inputs like "9:5")
  const [hours, minutes] = time.split(":").map(v => v.padStart(2, "0"));
  const isoString = `${date}T${hours}:${minutes}:00.0${cleanTimezone}`;

  return isoString;
}