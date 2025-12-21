export let DEFAULT_FALLBACK_WORDS = 12

export const setDefaultFallbackWords = (n: number) => {
  DEFAULT_FALLBACK_WORDS = Math.max(1, Math.floor(Number(n) || 1));
};

export function splitSummaryDescription(
  input: string,
  opts?: { marker?: string; fallbackWords?: number }
): { summary: string; description: string } {
  const marker = (opts?.marker ?? "|||DESCRIPTION|||").trim();
  const fallbackWords = opts?.fallbackWords ?? DEFAULT_FALLBACK_WORDS;
  if (!input || typeof input !== "string") return { summary: "", description: "" };

  // normalize
  const text = input.replace(/\r\n?/g, "\n").trim();

  // 1) primary marker (case-insensitive)
  const idx = text.toLowerCase().indexOf(marker.toLowerCase());
  if (idx !== -1) {
    const summary = text.slice(0, idx).trim();
    const description = text.slice(idx + marker.length).trim();
    return { summary, description };
  }

  // 2) common headings
  const headingRegex = /\n{1,}\s*(description|details|about)[:\-]\s*/i;
  const headingMatch = text.match(headingRegex);
  if (headingMatch && headingMatch.index !== undefined) {
    const i = headingMatch.index;
    const summary = text.slice(0, i).trim();
    const description = text.slice(i + headingMatch[0].length).trim();
    return { summary, description };
  }

  // 3) split by double newline
  const parts = text.split(/\n\s*\n/);
  if (parts.length >= 2) {
    return { summary: parts[0].trim(), description: parts.slice(1).join("\n\n").trim() };
  }

  // 4) first sentence fallback
  const sentenceMatch = text.match(/^(.+?[\.!?])(\s+|$)([\s\S]*)/);
  if (sentenceMatch) {
    const first = sentenceMatch[1].trim();
    const rest = (sentenceMatch[3] || "").trim();
    if (rest) return { summary: first, description: rest };
    // if only one sentence, fall back to word-split
  }

  // 5) word-count fallback
  const words = text.split(/\s+/);
  if (words.length <= fallbackWords) {
    return { summary: text, description: "" };
  }
  const summary = words.slice(0, fallbackWords).join(" ") + (words.length > fallbackWords ? "…" : "");
  const description = words.slice(fallbackWords).join(" ");
  return { summary: summary.trim(), description: description.trim() };
}
