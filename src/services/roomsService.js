import supabase from "./supabase";

export const roomsService = {
  async getAllRooms() {
    try {
      const { data: rooms, error: roomsError } = await supabase
        .from("room_status_view")
        .select("*")
        .order("room_number");

      if (roomsError) throw roomsError;

      return rooms.map((room) => {
        const booking = room.current_booking;

        return {
          id: room.id,
          number: room.room_number,
          type: room.room_type_name || "Standard",
          name: room.room_name,
          status: room.calculated_status,
          price: room.price_per_night,
          basePrice: room.base_price,
          roomTypeId: room.room_type_id,
          activeBookingsCount: room.active_bookings_count,
          nextAvailableDate: room.next_available_date,
          guest: booking
            ? {
                id: booking.id,
                name: booking.guest_full_name || "Unknown Guest",
                email: booking.guest_email,
                phone: booking.guest_phone,
                checkIn: booking.start_date,
                checkOut: booking.end_date,
                status: booking.status,
              }
            : null,
        };
      });
    } catch (viewError) {
      console.warn("SQL view not found, using fallback query:", viewError.message);

      const { data: rooms, error: roomsError } = await supabase
        .from("rooms")
        .select(
          `
          *,
          room_types (
            id,
            name
          )
        `,
        )
        .order("room_number");

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

      if (bookingsError) throw new Error(bookingsError.message);

      return rooms.map((room) => {
        const booking = bookings?.find((b) => b.room_id === room.id);

        return {
          id: room.id,
          number: room.room_number,
          type: room.room_types?.name || "Standard",
          name: room.room_name,
          status: room.status,
          price: room.price_per_night,
          guest: booking?.guests
            ? {
                id: booking.id,
                name: booking.guests.full_name || "Unknown Guest",
                email: booking.guests.email,
                phone: booking.guests.phone,
                checkIn: booking.start_date,
                checkOut: booking.end_date,
                status: booking.status,
              }
            : null,
        };
      });
    }
  },

  async getRoomById(id) {
    const { data, error } = await supabase
      .from("rooms")
      .select(
        `
        *,
        room_types (
          id,
          name
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async updateRoomStatus(id, status) {
    const { data, error } = await supabase.from("rooms").update({ status }).eq("id", id).select().single();

    if (error) throw new Error(error.message);
    return data;
  },
};
