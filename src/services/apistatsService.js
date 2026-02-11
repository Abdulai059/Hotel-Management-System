import supabase from "./supabase";

export const statsService = {
  async getStats() {
    const today = new Date().toISOString().split("T")[0];

    const { data: checkIns, error: checkInError } = await supabase
      .from("bookings")
      .select("*")
      .eq("check_in", today)
      .eq("status", "checked-in");

    const { data: checkOuts, error: checkOutError } = await supabase
      .from("bookings")
      .select("*")
      .eq("check_out", today)
      .eq("status", "checked-out");

    const { data: inHotel, error: inHotelError } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "checked-in");

    const { data: rooms, error: roomsError } = await supabase.from("rooms").select("id, status");

    if (checkInError || checkOutError || inHotelError || roomsError) {
      throw new Error("Failed to fetch stats");
    }

    const availableRooms = rooms?.filter((room) => room.status === "available").length || 0;
    const occupiedRooms = rooms?.filter((room) => room.status === "occupied").length || 0;

    return {
      todayCheckIns: checkIns?.length || 0,
      todayCheckOuts: checkOuts?.length || 0,
      totalInHotel: inHotel?.length || 0,
      availableRooms,
      occupiedRooms,
    };
  },
};
