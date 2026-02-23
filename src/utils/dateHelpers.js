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
    year: format(parsed, "yyyy"),
    month: format(parsed, "MMM"),
    full: format(parsed, "MMM dd yyyy"),
  };
}

export function fullformatDate(dateString) {
  if (!dateString) {
    return null;
  }

  const parsedDate = parseISO(dateString);

  return {
    day: format(parsedDate, "dd"),
    month: format(parsedDate, "MMMM"),
    year: format(parsedDate, "yyyy"),
    full: format(parsedDate, "MMMM dd, yyyy"),
  };
}
