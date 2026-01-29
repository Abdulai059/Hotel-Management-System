import BookingTable from "../features/FrontDesk/BookingTable";
import BookingTableOperations from "../ui/BookingTableOperations";

export default function Bookings() {
  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full bg-gray-50 border-b border-gray-200 px-4 md:px-6 py-4 gap-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
          All Bookings
        </h3>
        <BookingTableOperations />
      </div>

      <div className="w-full">
        <BookingTable />
      </div>
    </div>
  );
}
