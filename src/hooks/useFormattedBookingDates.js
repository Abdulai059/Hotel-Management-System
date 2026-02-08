import { useMemo } from "react";
import { format, parseISO } from "date-fns";

export function useFormattedBookingDates(startDate, endDate) {
  return useMemo(() => {
    if (!startDate || !endDate) return null;

    const checkIn = parseISO(startDate);
    const checkOut = parseISO(endDate);

    return {
      checkInDate: format(checkIn, "EEE"), // Thu
      checkInDay: format(checkIn, "dd"), // 05
      checkInMonth: format(checkIn, "MMM yyyy"), // Feb 2026
      checkOutDate: format(checkOut, "EEE"),
      checkOutDay: format(checkOut, "dd"),
      checkOutMonth: format(checkOut, "MMM yyyy"),
    };
  }, [startDate, endDate]);
}
