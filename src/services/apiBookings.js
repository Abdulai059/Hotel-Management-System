import { PAGE_SIZE } from "@/lib/constants";
import supabase from "./supabase";

const BOOKING_SELECT = `
  id,
  created_at,
  start_date,
  end_date,
  resId,
  num_nights,
  num_guests,
  status,
  room_rate_snapshot,
  guest:guest_id (id, full_name, email, phone, nationality),
  rooms:room_id (
    id, room_name, room_number, status,
    room_types:room_type_id (id, name, base_price)
  ),
  corporate:corporate_id (id, company_name, contact_person, contact_email, group_code),
  payment:payment_id (id, amount, paid)
`;

const BOOKING_DETAIL_SELECT = `
  *,
  guests(*),
  rooms(*, room_types:room_type_id (id, name, base_price)),
  payments(*),
  corporate_booking(*)
`;

const BOOKED_STATUSES = ["RESERVED", "CHECKED_IN"];

const BOOKING_TYPE_CONFIG = {
  WALK_IN: { label: "Walk-in", color: "#a3d9a5" },
  ONLINE: { label: "Online", color: "#ffe082" },
  CORPORATE: { label: "Corporate", color: "#c8e6c9" },
};

export async function getBookings({ filters = [], sortBy, page = 1 }) {
  let query = supabase.from("bookings").select(BOOKING_SELECT, { count: "exact" });

  filters.forEach(({ field, value, method = "eq" }) => {
    if (typeof query[method] === "function") query = query[method](field, value);
  });

  if (sortBy?.field) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
  }

  const from = (page - 1) * PAGE_SIZE;
  query = query.range(from, from + PAGE_SIZE - 1);

  const { data, error, count } = await query;
  if (error) throw new Error("Bookings could not be loaded");

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase.from("bookings").select(BOOKING_DETAIL_SELECT).eq("id", id).single();

  if (error) throw new Error("Booking not found");
  return data;
}

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

async function generateBookingId() {
  const { data: lastBooking } = await supabase
    .from("bookings")
    .select("resId")
    .ilike("resId", "GDH-B%")
    .order("resId", { ascending: false })
    .limit(1)
    .single();

  let nextNumber = 1;
  if (lastBooking?.resId) {
    const lastNumber = parseInt(lastBooking.resId.replace("GDH-B", ""));
    nextNumber = lastNumber + 1;
  }

  return `GDH-B${nextNumber.toString().padStart(5, "0")}`;
}

export async function createBooking(guestData, bookingData) {
  const resId = await generateBookingId();

  const { data: guest, error: guestError } = await supabase.from("guests").insert(guestData).select("id").single();

  if (guestError) {
    console.error("Guest creation error:", guestError);
    throw new Error(`Guest could not be created: ${guestError.message}`);
  }

  const { data, error: bookingError } = await supabase
    .from("bookings")
    .insert({ ...bookingData, guest_id: guest.id, resId })
    .select()
    .single();

  if (bookingError) {
    console.error("Booking creation error:", bookingError);
    throw new Error(`Booking could not be created: ${bookingError.message}`);
  }

  if (bookingData.status === "CHECKED_IN" && bookingData.room_id) {
    const { error: roomUpdateError } = await supabase
      .from("rooms")
      .update({ status: "OCCUPIED" })
      .eq("id", bookingData.room_id);

    if (roomUpdateError) {
      console.error("Room status update error:", roomUpdateError);
      throw new Error(`Room status could not be updated: ${roomUpdateError.message}`);
    }
  }

  return data;
}
