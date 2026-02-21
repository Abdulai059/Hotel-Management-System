import ReservationsChart from "../charts/ReservationsChart";
import BookingByPlatform from "./BookingByPlatform";
import { useBookingStats } from "./useBookingStats";

export default function BookingStats({ filter }) {
  const { data, isLoading, error } = useBookingStats(filter);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ReservationsChart reservationData={data?.chartData ?? []} />
      </div>
      <div className="lg:col-span-1">
        <BookingByPlatform />
      </div>
    </div>
  );
}
