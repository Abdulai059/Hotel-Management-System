import supabase from "./supabase";

export async function getOccupancyStats(year) {
  // Get total rooms
  const { data: rooms, error: roomsError } = await supabase.from("rooms").select("id");

  if (roomsError) {
    throw new Error("Failed to fetch rooms: " + roomsError.message);
  }

  const totalRooms = rooms?.length || 0;

  if (totalRooms === 0) {
    return [];
  }

  // Get bookings for the selected year
  const yearStart = `${year}-01-01`;
  const yearEnd = `${year}-12-31`;

  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("start_date, end_date, status")
    .or(`and(start_date.lte.${yearEnd},end_date.gte.${yearStart})`);

  if (bookingsError) {
    throw new Error("Failed to fetch bookings: " + bookingsError.message);
  }

  // Calculate occupancy for each month of the year
  const monthlyOccupancy = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const monthStart = new Date(year, monthIndex, 1);
    const monthEnd = new Date(year, monthIndex + 1, 0);

    const daysInMonth = monthEnd.getDate();
    let totalRoomNights = 0;

    // Count occupied room-nights for this month
    bookings?.forEach((booking) => {
      const bookingStart = new Date(booking.start_date);
      const bookingEnd = new Date(booking.end_date);

      // Check if booking overlaps with this month
      if (bookingStart <= monthEnd && bookingEnd >= monthStart) {
        const overlapStart = bookingStart > monthStart ? bookingStart : monthStart;
        const overlapEnd = bookingEnd < monthEnd ? bookingEnd : monthEnd;

        const nightsInMonth = Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24)) + 1;
        totalRoomNights += nightsInMonth;
      }
    });

    const possibleRoomNights = totalRooms * daysInMonth;
    const occupancyRate = possibleRoomNights > 0 ? Math.round((totalRoomNights / possibleRoomNights) * 100) : 0;

    monthlyOccupancy.push({
      month: monthNames[monthIndex],
      value: occupancyRate,
      year: year,
      monthIndex: monthIndex,
    });
  }

  return monthlyOccupancy;
}
