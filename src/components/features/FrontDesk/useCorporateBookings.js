import { getCorporateBookings } from "@/services/getCorporateBookings";
import { useQuery } from "@tanstack/react-query";

export function useCorporateBookings() {
  return useQuery({
    queryKey: ["corporateBookings"],
    queryFn: getCorporateBookings,
  });
}
