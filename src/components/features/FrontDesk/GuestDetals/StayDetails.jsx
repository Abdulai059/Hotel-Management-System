import DashedLine from "@/components/ui/DashedLine";
import { Bed, Edit } from "lucide-react";
import { useRef } from "react";
import { format, parseISO } from "date-fns";
import { formatDate } from "@/utils/dateHelpers";

export default function StayDetails({ booking, isEditing, onUpdate }) {
  const checkInInputRef = useRef(null);
  const checkOutInputRef = useRef(null);

  if (!booking) return null;

  // Use your utility function to format dates
  const checkIn = formatDate(booking.start_date);
  const checkOut = formatDate(booking.end_date);

  const handleDateChange = (type, value) => {
    if (onUpdate) {
      if (type === "checkIn") {
        onUpdate({ start_date: value });
      } else {
        onUpdate({ end_date: value });
      }
    }
  };

  // Get day of week for the dates
  const checkInDay = format(parseISO(booking.start_date), "EEE");
  const checkOutDay = format(parseISO(booking.end_date), "EEE");

  return (
    <div className="relative w-full rounded-lg border border-gray-300 bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-blue-900 uppercase">Stay Details</h3>

      <div className="mb-6 flex items-center justify-between">
        {/* Check-in Date */}
        <div
          className={`group relative min-w-32.5 rounded-lg pb-4 text-center shadow-sm ${isEditing ? "cursor-pointer hover:ring-2 hover:ring-blue-400" : ""}`}
          onClick={() => isEditing && checkInInputRef.current?.showPicker()}
        >
          {isEditing && (
            <div className="absolute top-12 right-2 hidden bg-white p-1 shadow group-hover:block">
              <Edit className="h-4 w-4 text-gray-600" />
            </div>
          )}

          <div className="rounded-t-md bg-red-600 p-2 text-xs font-semibold text-white">{checkInDay}</div>

          <span className="block bg-gray-50 py-2 text-center">
            <div className="pb-2 text-2xl font-bold">{checkIn.day}</div>
            <div className="text-xs">{checkIn.month}</div>
          </span>

          {isEditing && (
            <input
              ref={checkInInputRef}
              type="date"
              value={booking.start_date}
              onChange={(e) => handleDateChange("checkIn", e.target.value)}
              className="pointer-events-none absolute opacity-0"
            />
          )}
        </div>

        {/* Nights and Guests */}
        <div className="mx-4 flex flex-col items-center">
          <div className="text-xl font-bold text-gray-700">{booking.num_nights}</div>
          <div className="text-xs text-gray-500">Nt</div>
          <DashedLine />
          <div className="mt-2 flex items-center gap-1 text-gray-500">
            <Bed size={16} />
            <span className="text-sm">{booking.num_guests || 1}</span>
          </div>
        </div>

        {/* Check-out Date */}
        <div
          className={`group relative min-w-32.5 rounded-lg pb-4 text-center shadow-sm ${isEditing ? "cursor-pointer hover:ring-2 hover:ring-blue-400" : ""}`}
          onClick={() => isEditing && checkOutInputRef.current?.showPicker()}
        >
          {isEditing && (
            <div className="absolute top-12 right-2 hidden rounded bg-white p-1 shadow group-hover:block">
              <Edit className="h-4 w-4 text-gray-600" />
            </div>
          )}

          <div className="rounded-t-md bg-red-600 p-2 text-xs font-semibold text-white">{checkOutDay}</div>

          <span className="block bg-gray-50 py-2 text-center">
            <div className="pb-2 text-2xl font-bold text-gray-900">{checkOut.day}</div>
            <div className="text-xs">{checkOut.month}</div>
          </span>

          {isEditing && (
            <input
              ref={checkOutInputRef}
              type="date"
              value={booking.end_date}
              onChange={(e) => handleDateChange("checkOut", e.target.value)}
              className="pointer-events-none absolute opacity-0"
            />
          )}
        </div>
      </div>

      {/* Additional booking details */}
      <div className="space-y-1 pb-8 text-sm">
        <div className="flex justify-between border-b border-gray-200 py-2">
          <span className="text-gray-500">Booking Type</span>
          <span className="text-gray-700">{booking.booking_type}</span>
        </div>

        <div className="flex justify-between border-b border-gray-200 py-2">
          <span className="text-gray-500">Status</span>
          <span className="text-gray-700">{booking.status}</span>
        </div>

        <div className="flex justify-between border-b border-gray-200 py-2">
          <span className="text-gray-500">Room</span>
          <span className="text-gray-700">
            {booking.rooms?.room_number} - {booking.rooms?.room_type}
          </span>
        </div>

        <div className="flex justify-between border-b border-gray-200 py-2">
          <span className="text-gray-500">Total Price</span>
          <span className="text-gray-700">GH₵ {booking.total_price}</span>
        </div>

        <div className="flex justify-between border-b border-gray-200 py-2">
          <span className="text-gray-500">Reservation ID</span>
          <span className="text-gray-700">{booking.resId}</span>
        </div>
      </div>

      <button className="absolute right-4 bottom-4 text-gray-600 hover:text-gray-800">
        <Edit size={18} />
      </button>
    </div>
  );
}
