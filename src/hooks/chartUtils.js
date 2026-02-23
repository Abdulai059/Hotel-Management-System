import { format, parseISO, isWithinInterval } from "date-fns";

function toChartKey(dateStr) {
  return format(parseISO(dateStr), "dd MMM");
}

function inRange(dateStr, range) {
  if (!range || !dateStr) return true;
  return isWithinInterval(parseISO(dateStr), { start: range.from, end: range.to });
}

export function buildChartData(booked, cancelled, range) {
  const counts = {};

  booked.forEach(({ start_date }) => {
    if (!inRange(start_date, range)) return;
    const key = toChartKey(start_date);
    counts[key] = { date: key, booked: (counts[key]?.booked ?? 0) + 1, cancelled: counts[key]?.cancelled ?? 0 };
  });

  cancelled.forEach(({ start_date }) => {
    if (!inRange(start_date, range)) return;
    const key = toChartKey(start_date);
    counts[key] = { date: key, booked: counts[key]?.booked ?? 0, cancelled: (counts[key]?.cancelled ?? 0) + 1 };
  });

  return Object.values(counts).sort((a, b) => new Date(a.date) - new Date(b.date));
}
