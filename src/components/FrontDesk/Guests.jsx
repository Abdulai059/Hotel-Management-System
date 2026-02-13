import BookingFilters from "../features/FrontDesk/BookingForm/BookingFilters";
import GuestsTable from "../features/FrontDesk/GuestsTable";
import { useBookings } from "../features/FrontDesk/useBookings";

export default function Guests() {
  const { bookings, count, isLoading, error } = useBookings();

  return (
    <div className="flex flex-col gap-4">
      <BookingFilters />

      <div className="w-full overflow-hidden rounded-md shadow-sm">
        <GuestsTable bookings={bookings} count={count} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}
