import BookingFilters from "../features/FrontDesk/BookingForm/BookingFilters";
import GuestsTable from "../features/FrontDesk/GuestsTable";
import { useBookings } from "../features/FrontDesk/useBookings";

export default function Guests() {
  const { bookings, count, isLoading, error } = useBookings();

  return (
    <div className="flex flex-col">
      <BookingFilters />

      <div className="w-full shadow-sm">
        <GuestsTable bookings={bookings} count={count} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}

