import { filterRooms } from "@/lib/roomFilters";
import { useMemo } from "react";

export function useFilteredRooms(rooms, status, query) {
  return useMemo(() => filterRooms(rooms, status, query), [rooms, status, query]);
}
