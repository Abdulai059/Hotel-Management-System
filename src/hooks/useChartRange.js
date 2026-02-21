import { useState } from "react";
import { subDays, startOfMonth, endOfMonth } from "date-fns";

function getDateRange(rangeValue, customRange) {
  const today = new Date();
  if (rangeValue === "7d") return { from: subDays(today, 7), to: today };
  if (rangeValue === "30d") return { from: subDays(today, 30), to: today };
  if (rangeValue === "month") return { from: startOfMonth(today), to: endOfMonth(today) };
  if (rangeValue === "custom" && customRange.from && customRange.to) return customRange;
  return null;
}

export function useChartRange(defaultRange = "30d") {
  const [range, setRange] = useState(defaultRange);
  const [customRange, setCustomRange] = useState({ from: null, to: null });

  return {
    range,
    setRange,
    customRange,
    setCustomRange,
    dateRange: getDateRange(range, customRange),
  };
}
