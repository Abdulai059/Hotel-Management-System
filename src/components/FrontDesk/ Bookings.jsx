import BookingsNav from "../features/FrontDesk/BookingsNav";
import BookingTable from "../features/FrontDesk/BookingTable";

export default function Bookings() {
  return (
    <div className="flex flex-col gap-6">

      <BookingsNav />

      <div className="w-full">
        <BookingTable />
      </div>
    </div>
  );
}
