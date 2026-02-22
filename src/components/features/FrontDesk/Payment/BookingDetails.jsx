import { formatCurrency } from "@/utils/helpers";
import InfoField from "./InfoField";
import SummaryField from "./SummaryField";

function BookingDetails({ booking, guest, room, roomType, nights, roomTariff, totalAmount, roomTax, formatDate }) {
  return (
    <div className="rounded-2xl border border-gray-300 bg-white p-4 shadow sm:p-6">
      <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-700 uppercase sm:mb-6">Booking Details</h2>

      <div className="mb-6">
        <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
          <h3 className="text-base font-bold text-gray-900 sm:text-lg">{guest.full_name || "—"}</h3>
          <span className="rounded-full bg-[#e7f68f] px-3 py-1 text-xs font-bold text-gray-700">
            {booking.resId || "—"}
          </span>
        </div>

        <div className="space-y-2 rounded-xl bg-gray-50 p-3 sm:p-4">
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
          <p className="mb-1 text-xs font-bold tracking-wide text-gray-400 uppercase">Stay Details</p>
          <p className="text-sm font-medium text-gray-700">
            {roomType.name || "—"} (R{room.room_number || "—"})
          </p>
          <p className="text-sm text-gray-500">
            {formatDate(booking.start_date)} – {formatDate(booking.end_date)}
          </p>
          <p className="text-sm font-semibold text-[#9dc43b]">({nights} Nights)</p>
          <p className="cursor-pointer pt-1 text-xs font-semibold tracking-wide text-gray-400 uppercase hover:text-[#9dc43b]">
            {booking.booking_type || "—"} Guest
          </p>
        </div>

        <SummaryField label="Room(s)/Person(s)" value={`Room(s): 1 (${booking.num_guests || 1} Adults)`} />

        <div>
          <p className="mb-1 text-xs font-bold tracking-wide text-gray-400 uppercase">Amount</p>
          <p className="text-base font-bold text-gray-900">{formatCurrency(roomTariff.toFixed(2))}</p>
          <p className="text-xs text-gray-400 italic">
            {formatCurrency(totalAmount.toFixed(2))} with tax {formatCurrency(roomTax.toFixed(2))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
