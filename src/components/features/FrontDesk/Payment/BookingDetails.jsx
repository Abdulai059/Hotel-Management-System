import { formatCurrency } from "@/utils/helpers";
import InfoField from "./InfoField";
import SummaryField from "./SummaryField";

function BookingDetails({ booking, guest, room, roomType, nights, roomTariff, totalAmount, roomTax, formatDate }) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-base font-bold text-blue-900 uppercase sm:mb-6 sm:text-lg">Booking Details</h2>

      <div className="mb-6">
        <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
          <h3 className="text-base font-semibold text-blue-600 sm:text-lg">{guest.full_name || "-"}</h3>
          <span className="rounded-full border-2 border-gray-800 px-3 py-1 text-xs font-medium sm:text-sm">
            {booking.resId || "-"}
          </span>
        </div>

        <div className="space-y-2 rounded bg-gray-100 p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-4">
            <InfoField label="Address" value={guest.address} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoField label="Phone" value={guest.phone} inline />
            <InfoField label="Email" value={guest.email} inline />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <SummaryField label="Created On" value={formatDate(booking.created_at)} />

        <div>
          <p className="mb-1 font-semibold text-gray-800">Stay Details</p>
          <p className="text-sm text-gray-600">
            {roomType.name || "-"} (R{room.room_number || "-"})
          </p>
          <p className="text-sm text-gray-600">
            {formatDate(booking.start_date)} - {formatDate(booking.end_date)} <br />
            <span className="font-semibold text-emerald-600">({nights} Nights)</span>
          </p>
          <p className="cursor-pointer pt-1 font-medium text-sky-600 hover:underline">
            {booking.booking_type || "-"} GUEST
          </p>
        </div>

        <SummaryField label="Room(s)/Person(s)" value={`Room(s): 1 (${booking.num_guests || 1} Adults)`} />

        <div>
          <p className="mb-1 font-semibold text-gray-800">Amount</p>
          <p className="font-semibold text-gray-800">{formatCurrency(roomTariff.toFixed(2))}</p>
          <p className="text-xs text-gray-500 italic">
            {formatCurrency(totalAmount.toFixed(2))} with tax {formatCurrency(roomTax.toFixed(2))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
