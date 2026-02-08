import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "@/services/apiBookings";
import { PAGE_SIZE } from "@/lib/constants";

export function useBookings() {
  console.log("🧠 useBookings hook running");

  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const status = searchParams.get("status");
  const filter = !status || status === "all" ? null : { field: "status", value: status };

  //  SORT
  const sortByRaw = searchParams.get("sortBy") ?? "start_date-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //  PAGINATION
  const page = Number(searchParams.get("page") || 1);

  //  QUERY
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter?.value ?? "all", sortBy.field, sortBy.direction, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
    keepPreviousData: true,
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  //  PREFETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter?.value ?? "all", sortBy.field, sortBy.direction, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter?.value ?? "all", sortBy.field, sortBy.direction, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, error, bookings, count };
}
