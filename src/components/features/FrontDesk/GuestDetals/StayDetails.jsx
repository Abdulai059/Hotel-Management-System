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
  const totalRoomRate = roomRate * booking.num_nights;

  const room = booking.rooms;
  const checkIn = formatDate(booking.start_date);
  const checkOut = formatDate(booking.end_date);
  const checkInDay = format(parseISO(booking.start_date), "EEE");
  const checkOutDay = format(parseISO(booking.end_date), "EEE");

  const status = booking.status?.toLowerCase().replace(/_/g, "-") || "";

  const isReserved = status === "reserved";
  const isCheckedIn = status === "checked-in";
  const isCheckedOut = status === "checked-out";

  const canEditCheckIn = isEditing && isReserved;
  const canEditCheckOut = isEditing && (isReserved || isCheckedIn);

  const handleDateChange = (type, value) => {
    if (!onUpdate) return;
    if (type === "checkIn" && canEditCheckIn) onUpdate({ start_date: value });
    if (type === "checkOut" && canEditCheckOut) onUpdate({ end_date: value });
  };

  // STATUS COLORS — kept as-is per requirement
  const checkInHeaderColor = isCheckedIn || isCheckedOut ? "bg-green-600" : "bg-blue-600";
  const checkOutHeaderColor = isCheckedOut ? "bg-red-600" : isCheckedIn ? "bg-green-600" : "bg-blue-600";

  return (
    <div className="relative w-full rounded-2xl border border-gray-300 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold tracking-widest text-gray-700 uppercase">Stay Details</h3>

      {/* Date cards */}
      <div className="mb-6 flex items-center justify-between">
        <div
          className={`group relative min-w-32 rounded-xl border border-gray-200 pb-3 text-center shadow-sm ${
            canEditCheckIn ? "cursor-pointer hover:ring-2 hover:ring-[#9dc43b]" : ""
          }`}
          onClick={() => canEditCheckIn && checkInInputRef.current?.showPicker()}
        >
          {canEditCheckIn && (
            <div className="absolute top-10 right-1.5 hidden rounded bg-white p-1 shadow group-hover:block">
              <Edit className="h-3.5 w-3.5 text-gray-500" />
            </div>
          )}
          <div className={`rounded-t-xl px-4 py-1.5 text-xs font-semibold text-white ${checkInHeaderColor}`}>
            {checkInDay}
          </div>
          <span className="block bg-gray-50 py-2 text-center">
            <div className="pb-1 text-2xl font-bold text-gray-900">{checkIn.day}</div>
            <div className="text-xs text-gray-400">{checkIn.month}</div>
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

        {/* Nights & guests */}
        <div className="mx-4 flex flex-col items-center gap-1">
          <div className="text-xl font-bold text-gray-800">{booking.num_nights}</div>
          <div className="text-xs text-gray-400">Nt</div>
          <DashedLine />
          <div className="mt-1 flex items-center gap-1 text-gray-400">
            <Bed size={15} />
            <span className="text-sm">{booking.num_guests || 1}</span>
          </div>
        </div>

        <div
          className={`group relative min-w-32 rounded-xl border border-gray-200 pb-3 text-center shadow-sm ${
            canEditCheckOut ? "cursor-pointer hover:ring-2 hover:ring-[#9dc43b]" : ""
          }`}
          onClick={() => canEditCheckOut && checkOutInputRef.current?.showPicker()}
        >
          {canEditCheckOut && (
            <div className="absolute top-10 right-1.5 hidden rounded bg-white p-1 shadow group-hover:block">
              <Edit className="h-3.5 w-3.5 text-gray-500" />
            </div>
          )}
          <div className={`rounded-t-xl px-4 py-1.5 text-xs font-semibold text-white ${checkOutHeaderColor}`}>
            {checkOutDay}
          </div>
          <span className="block bg-gray-50 py-2 text-center">
            <div className="pb-1 text-2xl font-bold text-gray-900">{checkOut.day}</div>
            <div className="text-xs text-gray-400">{checkOut.month}</div>
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

      {/* Details rows — borders kept */}
      <div className="space-y-0 pb-8 text-sm">
        <div className="flex justify-between border-b border-gray-100 py-2.5">
          <span className="text-gray-400">Booking Type</span>
          <span className="font-medium text-gray-700">{booking.booking_type}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 py-2.5">
          <span className="text-gray-400">Status</span>
          <span className="font-semibold text-gray-900 capitalize">{status.replace(/-/g, " ")}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 py-2.5">
          <span className="text-gray-400">Room</span>
          <span className="text-gray-700">
            {room?.room_number || "Not Assigned"}{" "}
            {room?.room_types?.name && <span className="text-rose-500">— {room.room_types.name}</span>}
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-100 py-2.5">
          <span className="text-gray-400">Total Price</span>
          <span className="font-bold text-[#9dc43b]">GH₵ {totalRoomRate.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 py-2.5">
          <span className="text-gray-400">Reservation ID</span>
          <span className="font-medium text-gray-700">{booking.resId}</span>
        </div>
      </div>

      {!isCheckedOut && (
        <button className="absolute right-4 bottom-4 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#e7f68f] hover:text-gray-700">
          <Edit size={16} />
        </button>
      )}
    </div>
  );
}
