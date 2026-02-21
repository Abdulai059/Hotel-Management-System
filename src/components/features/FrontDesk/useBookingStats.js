import { getBookingStats } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useBookingStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookingStats"],
    queryFn: getBookingStats,
  });

  return {
    booked: data?.booked ?? [],
    cancelled: data?.cancelled ?? [],
    bookingTypes: data?.bookingTypes ?? [],
    isLoading,
    error,
  };
}
