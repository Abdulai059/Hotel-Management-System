import { computeStats } from "@/lib/roomFilters";
import { useMemo } from "react";

export function useRoomStats(rooms) {
  return useMemo(() => computeStats(rooms), [rooms]);
}
