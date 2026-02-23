import supabase from "@/services/supabase";
import { useQuery } from "@tanstack/react-query";

export function useStats() {
  return useQuery({
    queryKey: ["stats", "overview"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];

      const [checkIns, checkOuts, allRooms] = await Promise.all([
        supabase.from("bookings").select("*").eq("start_date", today).eq("status", "CHECKED_IN"),
        supabase.from("bookings").select("*").eq("end_date", today).eq("status", "CHECKED_OUT"),
        supabase.from("rooms").select("id, status"),
      ]);

      if (checkIns.error || checkOuts.error || allRooms.error) {
        console.error("Query errors:", {
          checkIns: checkIns.error,
          checkOuts: checkOuts.error,
          allRooms: allRooms.error,
        });
        throw new Error("Failed to fetch stats");
      }

      const totalRooms = allRooms.data?.length || 0;
      const availableRooms = allRooms.data?.filter((room) => room.status === "AVAILABLE").length || 0;
      const occupiedRooms = allRooms.data?.filter((room) => room.status === "OCCUPIED").length || 0;
      const occupiedMaintenance = allRooms.data?.filter((room) => room.status === "MAINTENANCE").length || 0;

      // Calculate occupancy percentage
      const occupancyPercentage = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

      return {
        todayCheckIns: checkIns.data?.length || 0,
        todayCheckOuts: checkOuts.data?.length || 0,
        totalRooms,
        availableRooms,
        occupiedRooms,
        occupiedMaintenance,
        occupancyPercentage,
      };
    },
    refetchInterval: 60000,
  });
}
