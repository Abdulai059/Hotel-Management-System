import { parseISO, format } from "date-fns";

/**
 * Formats a date string "YYYY-MM-DD" into day, month, year, and full string
 * @param {string} dateString
 * @returns {object} { day, month, year, full }
 */
export function formatDate(dateString) {
  if (!dateString) return null;

  const parsed = parseISO(dateString);

  return {
    day: format(parsed, "dd"),
    month: format(parsed, "MMM"),
    year: format(parsed, "yyyy"),
    full: format(parsed, "dd MMM yyyy"),
  };
}
