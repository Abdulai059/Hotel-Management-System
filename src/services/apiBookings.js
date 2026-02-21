import { PAGE_SIZE } from "@/lib/constants";
import supabase from "./supabase";

export async function getBookings({ filters = [], sortBy, page = 1 }) {
  let query = supabase.from("bookings").select(
    `
    id,
    created_at,
    start_date,
    end_date,
    resId,
    num_nights,
    num_guests,
    status,
  room_rate_snapshot,

    guest:guest_id (
      id,
      full_name,
      email,
      phone,
      nationality
    ),

    rooms:room_id (
      id,
      room_name,
      room_number,
      price_per_night,
      status,
      room_types:room_type_id (
        id,
        name,
        base_price
      )
    ),

    corporate:corporate_id (
      id,
      company_name,
      contact_person,
      contact_email,
      group_code 
    ),

    payment:payment_id (
      id,
      amount,
      paid
    )
  `,
    { count: "exact" },
  );

  // APPLY MULTIPLE FILTERS
  filters.forEach((filter) => {
    const method = filter.method || "eq";
    if (typeof query[method] === "function") {
      query = query[method](filter.field, filter.value);
    }
  });

  // SORT
  if (sortBy?.field) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
  }

  // PAGINATION
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      guests(*),
      rooms(
        *,
        room_types:room_type_id (
          id,
          name,
          base_price
        )
      ),
      payments(*),
      corporate_booking(*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching booking:", error);
    throw new Error("Booking not found");
  }

  return data;
}

const BOOKED_STATUSES = ["RESERVED", "CHECKED_IN"];

const BOOKING_TYPE_CONFIG = {
  WALK_IN: { label: "Walk-in", color: "#a3d9a5" },
  ONLINE: { label: "Online", color: "#ffe082" },
  CORPORATE: { label: "Corporate", color: "#c8e6c9" },
};

export async function getBookingStats() {
  const { data, error } = await supabase.from("bookings").select("status, booking_type, start_date");

  if (error) throw new Error(error.message);

  const booked = data.filter((b) => BOOKED_STATUSES.includes(b.status));
  const cancelled = data.filter((b) => b.status === "CANCELLED");

  const typeCounts = data.reduce((acc, { booking_type }) => {
    if (!booking_type) return acc;
    acc[booking_type] = (acc[booking_type] ?? 0) + 1;
    return acc;
  }, {});

  const total = Object.values(typeCounts).reduce((sum, n) => sum + n, 0);

  const bookingTypes = Object.entries(BOOKING_TYPE_CONFIG).map(([key, { label, color }]) => ({
    name: label,
    value: total ? Math.round(((typeCounts[key] ?? 0) / total) * 100) : 0,
    color,
  }));

  return { booked, cancelled, bookingTypes };
}
