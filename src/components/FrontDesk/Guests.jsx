import BookingFilters from "../features/FrontDesk/BookingForm/BookingFilters";
import ExportBarButton from "../features/FrontDesk/GuestDetals/ExportBarButton";
import GuestsTable from "../features/FrontDesk/GuestsTable";
import { useBookings } from "../features/FrontDesk/useBookings";

export default function Guests() {
  const { bookings, count, isLoading, error } = useBookings();

  return (
    <div className="flex-1">
      <BookingFilters />

      <div className="w-full overflow-hidden rounded-md shadow-sm">
        <GuestsTable bookings={bookings} count={count} isLoading={isLoading} error={error} />
      </div>

      <div className="bottom-0 z-10 mt-25">
        <ExportBarButton />
      </div>
    </div>
  );
}
