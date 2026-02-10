import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "@/services/apiBookings";
import { PAGE_SIZE } from "@/lib/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filters = [];

  // Search term
  const searchTerm = searchParams.get("searchTerm");
  if (searchTerm) {
    filters.push({
      field: "searchTerm",
      value: searchTerm,
      method: "search",
    });
  }

  // Status filter
  const status = searchParams.get("status");
  if (status && status !== "all") {
    filters.push({ field: "status", value: status, method: "eq" });
  }

  // ✅ NEW: Date filters based on dateType
  const dateType = searchParams.get("dateType") || "createdOn";
  const createdOnDate = searchParams.get("createdOnDate");
  const checkInDate = searchParams.get("checkInDate");

  if (dateType === "createdOn" && createdOnDate) {
    filters.push({
      field: "created_at",
      value: createdOnDate,
      method: "gte",
    });
  }

  if (dateType === "checkIn" && checkInDate) {
    filters.push({
      field: "start_date",
      value: checkInDate,
      method: "gte",
    });
  }

  // Filter By (Room, Room Type, Block)
  const filterBy = searchParams.get("filterBy");
  const filterByValue = searchParams.get("filterByValue");

  if (filterBy && filterByValue) {
    const filterByMap = {
      room: "rooms.room_number",
      roomType: "rooms.room_type",
      block: "rooms.block",
    };

    const field = filterByMap[filterBy];
    if (field) {
      filters.push({ field, value: `%${filterByValue}%`, method: "ilike" });
    }
  }

  // Group By filter
  const groupBy = searchParams.get("groupBy");
  if (groupBy && groupBy !== "all") {
    if (groupBy === "group") {
      filters.push({ field: "corporate_id", value: null, method: "not.is" });
    } else if (groupBy === "single") {
      filters.push({ field: "corporate_id", value: null, method: "is" });
    }
  }

  // Flags
  const excludeComp = searchParams.get("excludeComp") === "true";
  if (excludeComp) {
    filters.push({ field: "is_complimentary", value: false, method: "eq" });
  }

  const thirdPartyResID = searchParams.get("thirdPartyResID") === "true";
  if (thirdPartyResID) {
    filters.push({ field: "third_party_id", value: null, method: "not.is" });
  }

  const dayUseOnly = searchParams.get("dayUseOnly") === "true";
  if (dayUseOnly) {
    filters.push({ field: "is_day_use", value: true, method: "eq" });
  }

  // SORT BY
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortByMap = {
    startDate: "start_date",
    createdAt: "created_at",
    totalPrice: "total_price",
  };

  const sortBy = {
    field: sortByMap[field] || field,
    direction,
  };

  // PAGINATION
  const page = Number(searchParams.get("page") || 1);

  // QUERY
  const { isLoading, error, data } = useQuery({
    queryKey: ["bookings", filters, sortBy, page],
    queryFn: () => getBookings({ filters, sortBy, page }),
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  // PREFETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page + 1],
      queryFn: () => getBookings({ filters, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page - 1],
      queryFn: () => getBookings({ filters, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, error, bookings, count };
}
