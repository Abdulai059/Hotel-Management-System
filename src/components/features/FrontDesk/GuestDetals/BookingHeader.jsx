import { Bed } from "lucide-react";

export default function BookingHeader({ booking, isEditing, setIsEditing, onCheckIn, onCheckOut, onCancel }) {
  if (!booking) return null;

  const room = booking.rooms;
  const status = booking.status;

  const renderActions = () => {
    if (status === "RESERVED") {
      return (
        <>
          <button
            onClick={onCheckIn}
            className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-bold uppercase shadow-sm hover:bg-green-600"
          >
            Check In
          </button>
          <button
            onClick={onCancel}
            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold uppercase shadow-sm hover:bg-red-600"
          >
            Cancel
          </button>
        </>
      );
    }

    if (status === "CHECKED_IN") {
      return (
        <button
          onClick={onCheckOut}
          className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-bold uppercase shadow-sm hover:bg-blue-600"
        >
          Check Out
        </button>
      );
    }

    return null;
  };

  const statusColor =
    {
      RESERVED: "text-yellow-300",
      CHECKED_IN: "text-blue-200",
      CHECKED_OUT: "text-green-300",
      CANCELLED: "text-red-300",
    }[status] || "text-white";

  return (
    <div className="mb-4 flex items-center justify-between rounded-xl bg-gray-900 px-6 py-3 text-white">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase shadow-sm transition ${
            isEditing
              ? "bg-[#9dc43b] text-gray-900 hover:bg-[#8ab534]"
              : "bg-[#e7f68f] text-gray-900 hover:bg-[#d4e87a]"
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <div className="flex items-center gap-2 text-gray-200">
          <Bed size={18} />
          <span className="text-base font-semibold">{room?.room_types?.name || "Not Assigned"}</span>
        </div>

        <span className="text-base font-semibold text-gray-300">#{room?.room_number || "—"}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-sm font-bold tracking-wide uppercase ${statusColor}`}>{status}</span>

        <span className="text-sm font-semibold text-[#e7f68f]">Res# {booking.resId}</span>

        <div className="flex items-center gap-2">{renderActions()}</div>
      </div>
    </div>
  );
}
