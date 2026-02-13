import DashedLine from "@/components/ui/DashedLine";
import { Bed, Edit } from "lucide-react";
import { useRef } from "react";
import { format, parseISO } from "date-fns";
import { formatDate } from "@/utils/dateHelpers";

export default function StayDetails({ booking, isEditing, onUpdate }) {
  const checkInInputRef = useRef(null);
  const checkOutInputRef = useRef(null);

  const toNumber = (v) => Number(v) || 0;

  if (!booking) return null;

  const roomRate = toNumber(booking.room_rate_snapshot);
  const TotalRoomRate = roomRate * booking.num_nights;

  const room = booking.rooms;
  const checkIn = formatDate(booking.start_date);
  const checkOut = formatDate(booking.end_date);
  const checkInDay = format(parseISO(booking.start_date), "EEE");
  const checkOutDay = format(parseISO(booking.end_date), "EEE");

  const isReserved = booking.status === "reserved";
  const isCheckedIn = booking.status === "checked-in";
  const isCheckedOut = booking.status === "checked-out";

  const canEditCheckIn = isEditing && isReserved;
  const canEditCheckOut = isEditing && (isReserved || isCheckedIn);

  const handleDateChange = (type, value) => {
    if (!onUpdate) return;

    if (type === "checkIn" && canEditCheckIn) {
      onUpdate({ start_date: value });
    }

    if (type === "checkOut" && canEditCheckOut) {
      onUpdate({ end_date: value });
    }
  };

  return (
    <div className="relative w-full rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-blue-900 uppercase">Stay Details</h3>

      <div className="mb-6 flex items-center justify-between">
        <div
          className={`group relative min-w-32.5 rounded-lg pb-4 text-center shadow-sm ${
            canEditCheckIn ? "cursor-pointer hover:ring-2 hover:ring-blue-400" : ""
          }`}
          onClick={() => canEditCheckIn && checkInInputRef.current?.showPicker()}
        >
          {canEditCheckIn && (
            <div className="absolute top-12 right-2 hidden bg-white p-1 shadow group-hover:block">
              <Edit className="h-4 w-4 text-gray-600" />
            </div>
          )}
          <div className="rounded-t-md bg-red-600 p-2 text-xs font-semibold text-white">{checkInDay}</div>
          <span className="block bg-gray-50 py-2 text-center">
            <div className="pb-2 text-2xl font-bold">{checkIn.day}</div>
            <div className="text-xs">{checkIn.month}</div>
          </span>
          {canEditCheckIn && (
            <input
              ref={checkInInputRef}
              type="date"
              value={booking.start_date}
              onChange={(e) => handleDateChange("checkIn", e.target.value)}
              className="absolute opacity-0"
            />
          )}
        </div>

        <div className="mx-4 flex flex-col items-center">
          <div className="text-xl font-bold text-gray-700">{booking.num_nights}</div>
          <div className="text-xs text-gray-500">Nt</div>
          <DashedLine />
          <div className="mt-2 flex items-center gap-1 text-gray-500">
            <Bed size={16} />
            <span className="text-sm">{booking.num_guests || 1}</span>
          </div>
        </div>

        <div
          className={`group relative min-w-32.5 rounded-lg pb-4 text-center shadow-sm ${
            canEditCheckOut ? "cursor-pointer hover:ring-2 hover:ring-blue-400" : ""
          }`}
          onClick={() => canEditCheckOut && checkOutInputRef.current?.showPicker()}
        >
          {canEditCheckOut && (
            <div className="absolute top-12 right-2 hidden rounded bg-white p-1 shadow group-hover:block">
              <Edit className="h-4 w-4 text-gray-600" />
            </div>
          )}
          <div className="rounded-t-md bg-red-600 p-2 text-xs font-semibold text-white">{checkOutDay}</div>
          <span className="block bg-gray-50 py-2 text-center">
            <div className="pb-2 text-2xl font-bold text-gray-900">{checkOut.day}</div>
            <div className="text-xs">{checkOut.month}</div>
          </span>
          {canEditCheckOut && (
            <input
              ref={checkOutInputRef}
              type="date"
              value={booking.end_date}
              onChange={(e) => handleDateChange("checkOut", e.target.value)}
              className="absolute opacity-0"
            />
          )}
        </div>
      </div>

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
            {room?.room_number || "Not Assigned"}{" "}
            {room?.room_types?.name && <span className="text-rose-500">- {room.room_types.name}</span>}
          </span>
        </div>

        <div className="flex justify-between border-b border-gray-200 py-2">
          <span className="text-gray-500">Total Price</span>
          <span className="font-semibold text-emerald-600">GH₵ {TotalRoomRate}</span>
        </div>

        <div className="flex justify-between border-b border-gray-200 py-2">
          <span className="text-gray-500">Reservation ID</span>
          <span className="text-gray-700">{booking.resId}</span>
        </div>
      </div>

      {!isCheckedOut && (
        <button className="absolute right-4 bottom-4 text-gray-600 hover:text-gray-800">
          <Edit size={18} />
        </button>
      )}
    </div>
  );
}
