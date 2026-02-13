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
            className="rounded bg-green-500 px-3 py-1.5 text-xs font-bold uppercase shadow hover:bg-green-600"
          >
            Check In
          </button>
          <button
            onClick={onCancel}
            className="rounded bg-red-500 px-3 py-1.5 text-xs font-bold uppercase shadow hover:bg-red-600"
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
          className="rounded bg-blue-500 px-3 py-1.5 text-xs font-bold uppercase shadow hover:bg-blue-600"
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
    <div className="mb-4 flex items-center justify-between rounded-sm bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`rounded px-3 py-1.5 text-xs font-bold uppercase shadow transition ${
            isEditing ? "bg-green-500 hover:bg-green-600" : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <div className="flex items-center gap-2">
          <Bed size={20} />
          <span className="text-lg font-semibold">{room?.room_types?.name || "Not Assigned"}</span>
        </div>

        <span className="text-lg font-semibold">#{room?.room_number || "-"}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-lg font-semibold ${statusColor}`}>{status}</span>

        <span className="text-lg font-semibold text-yellow-300">Res# {booking.resId}</span>

        <div className="flex items-center gap-2">{renderActions()}</div>
      </div>
    </div>
  );
}
