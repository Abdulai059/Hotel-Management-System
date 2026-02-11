import { useQuery } from "@tanstack/react-query";
import { getOccupancyStats } from "@/services/apiOccupancyStats";

export function useOccupancyStats(year) {
  const currentYear = year || new Date().getFullYear();

  return useQuery({
    queryKey: ["stats", "occupancy", "yearly", currentYear],
    queryFn: () => getOccupancyStats(currentYear),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    enabled: !!currentYear,
  });
}
