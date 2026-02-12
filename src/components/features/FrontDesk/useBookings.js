import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "@/services/apiBookings";
import { PAGE_SIZE } from "@/lib/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const sortRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortRaw.split("-");
  const sortMap = { startDate: "start_date", createdAt: "created_at", totalPrice: "total_price" };
  const sortBy = { field: sortMap[field] || field, direction };

  const { isLoading, error, data } = useQuery({
    queryKey: ["bookings", sortBy, page],
    queryFn: () => getBookings({ sortBy, page }),
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // Prefetch next page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", sortBy, page + 1],
      queryFn: () => getBookings({ sortBy, page: page + 1 }),
    });
  }

  // Prefetch previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", sortBy, page - 1],
      queryFn: () => getBookings({ sortBy, page: page - 1 }),
    });
  }

  return { isLoading, error, bookings, count };
}
