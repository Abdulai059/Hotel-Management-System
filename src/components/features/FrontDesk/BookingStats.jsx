import ReservationsChart from "../charts/ReservationsChart";
import BookingByPlatform from "./BookingByPlatform";
import { useBookings } from "./useBookings";
import { useBookingStats } from "./useBookingStats";

export default function BookingStats({ filter }) {
  const { data, isLoading, error } = useBookingStats(filter);
  const { bookings, count } = useBookings();
  console.log("BookingStats data:", data);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      <ReservationsChart reservationData={data?.chartData ?? []} />
      <BookingByPlatform bookings={bookings} count={count} />
    </div>
  );
}
