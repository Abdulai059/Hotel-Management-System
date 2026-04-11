import { useMemo } from "react";
import { useAvailableRooms } from "@/services/apirooms";

export default function RoomDetailsStep({ formData, onChange, onBack, submitting }) {
  const { rooms = [], loading } = useAvailableRooms();

  // Avoid recalculating every render manually
  const selectedRoom = useMemo(() => {
    return rooms.find((room) => String(room.id) === String(formData.roomId));
  }, [rooms, formData.roomId]);

  // Single source of truth updater
  const updateField = (name, value) => {
    onChange({
      target: { name, value },
    });
  };

  const handleRoomChange = (e) => {
    const roomId = e.target.value;

    const room = rooms.find((r) => String(r.id) === String(roomId));

    updateField("roomId", roomId);

    if (!room) return;

    updateField("roomRateSnapshot", room.room_types?.base_price || "");

    updateField("roomType", room.room_types?.name || "");
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;

    updateField("status", status);

    // Reset dependent fields cleanly
    if (status === "RESERVED") {
      updateField("roomId", "");
      updateField("roomRateSnapshot", "");
      updateField("roomType", "");
    }
  };

  const isRoomSelectionRequired = formData.status === "CHECKED_IN";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-3 flex items-center gap-3">
        <svg className="h-6 w-6 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>

        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Room Details</h2>
      </div>

      <p className="mb-6 text-sm text-gray-600 sm:text-base">Select room and booking preferences</p>

      <div className="space-y-6">
        {/* Status */}
        <div>
          <label className="text-sm font-semibold text-gray-900">
            Booking Status <span className="text-red-500">*</span>
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleStatusChange}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            <option value="">Select status</option>
            <option value="RESERVED">Reserved</option>
            <option value="CHECKED_IN">Check In</option>
          </select>
        </div>

        {/* Room Selection */}
        {isRoomSelectionRequired && (
          <div>
            <label className="text-sm font-semibold text-gray-900">
              Select Room <span className="text-red-500">*</span>
            </label>

            {loading ? (
              <p className="text-sm text-gray-400">Loading available rooms...</p>
            ) : rooms.length === 0 ? (
              <p className="text-sm text-rose-500">No rooms available at the moment.</p>
            ) : (
              <select
                name="roomId"
                value={formData.roomId}
                onChange={handleRoomChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              >
                <option value="">Choose a room</option>

                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    Room {room.room_number} — {room.room_name} ({room.room_types?.name}) - GH₵{" "}
                    {room.room_types?.base_price}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Booking Type */}
        <div>
          <label className="text-sm font-semibold text-gray-900">
            Booking Type <span className="text-red-500">*</span>
          </label>

          <select
            name="bookingType"
            value={formData.bookingType}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            <option value="">Select booking type</option>
            <option value="WALK_IN">Walk-in</option>
            <option value="ONLINE">Online</option>
            <option value="CORPORATE">Corporate</option>
          </select>
        </div>

        {/* Guests */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-gray-900">Number of Adults</label>

            <select
              name="numberOfAdults"
              value={formData.numberOfAdults}
              onChange={onChange}
              className="mt-1 w-full rounded-lg bg-gray-100 px-4 py-3 focus:ring-2 focus:ring-sky-500"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900">Number of Children</label>

            <select
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={onChange}
              className="mt-1 w-full rounded-lg bg-gray-100 px-4 py-3 focus:ring-2 focus:ring-sky-500"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-lg bg-rose-500 px-6 py-3 font-semibold text-white hover:bg-rose-600 sm:w-auto"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={
            submitting || !formData.status || !formData.bookingType || (isRoomSelectionRequired && !formData.roomId)
          }
          className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white disabled:opacity-50 sm:w-auto"
        >
          {submitting ? "Submitting..." : "Complete Booking"}
        </button>
      </div>
    </div>
  );
}
