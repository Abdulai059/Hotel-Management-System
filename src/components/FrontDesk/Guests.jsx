import BookingFilters from "../features/FrontDesk/BookingForm/BookingFilters";
import GuestNav from "../features/FrontDesk/GuestNav";
import GuestsTable from "../features/FrontDesk/GuestsTable";

export default function Guests() {
  return (
    <div className="flex flex-col gap-8">
      {/* <GuestNav /> */}
      <BookingFilters />

      <div className="w-full shadow-sm">
        <GuestsTable />
      </div>
    </div>
  );
}
