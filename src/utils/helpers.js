import { formatDistance, parseISO, differenceInDays } from "date-fns";

export function subtractDates(date1, date2) {
  return differenceInDays(parseISO(String(date1)), parseISO(String(date2)));
}

export function formatDistanceFromNow(date) {
  return formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
}

export function getToday(options = {}) {
  const today = new Date();

  if (options.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(value);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function calcMinutesLeft(date) {
  const now = new Date().getTime();
  const target = new Date(date).getTime();
  return Math.round((target - now) / 60000);
}
