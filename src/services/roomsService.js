import supabase from "./supabase";

export const roomsService = {
  async getAllRooms() {
    const { data: rooms, error: roomsError } = await supabase.from("rooms").select("*").order("room_number");

    if (roomsError) throw new Error(roomsError.message);

    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select(
        `
        *,
        guests (
          full_name,
          email,
          phone
        )
      `,
      )
      .eq("status", "CHECKED_IN");

    if (bookingsError) console.error("Bookings fetch error:", bookingsError);

    const roomsWithGuests = rooms.map((room) => {
      const booking = bookings?.find((b) => b.room_id === room.id);

      const result = {
        id: room.id,
        number: room.room_number,
        type: room.room_type,
        name: room.room_name,
        status: room.status,
        price: room.price_per_night,
        guest: null,
      };

      if (booking?.guests) {
        result.guest = {
          name: booking.guests.full_name || "Unknown Guest",
          email: booking.guests.email,
          phone: booking.guests.phone,
          checkIn: booking.start_date,
          checkOut: booking.end_date,
          nights: booking.num_nights,
        };
      }

      return result;
    });

    return roomsWithGuests;
  },

  async getRoomById(id) {
    const { data, error } = await supabase.from("rooms").select("*").eq("id", id).single();

    if (error) throw new Error(error.message);

    return data;
  },

  async updateRoomStatus(id, status) {
    const { data, error } = await supabase.from("rooms").update({ status }).eq("id", id).select().single();

    if (error) throw new Error(error.message);

    return data;
  },
};
