import { useEffect, useState } from "react";
import { useAvailableRooms } from "@/services/apirooms";

export default function RoomDetailsStep({ formData, onChange, onBack, submitting }) {
  const { rooms, loading } = useAvailableRooms();

  const handleRoomChange = (e) => {
    const roomId = e.target.value;
    const selectedRoom = rooms.find((room) => room.id === roomId);

    onChange({
      target: {
        name: "roomId",
        value: roomId,
      },
    });

    if (selectedRoom?.room_types?.base_price) {
      onChange({
        target: {
          name: "roomRateSnapshot",
          value: selectedRoom.room_types.base_price,
        },
      });
    }
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    onChange({
      target: {
        name: "status",
        value: status,
      },
    });

    // If status is RESERVED, clear room selection
    if (status === "RESERVED") {
      onChange({
        target: {
          name: "roomId",
          value: "",
        },
      });
      onChange({
        target: {
          name: "roomRateSnapshot",
          value: "",
        },
      });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-3">
        <svg className="h-6 w-6 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Room Details</h2>
      </div>

      <p className="mb-6 text-sm text-gray-600 sm:text-base">Select an available room and guest count</p>

      <div className="space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-900">
            Booking Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleStatusChange}
            required
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          >
            <option value="">Select status</option>
            <option value="RESERVED">Reserved</option>
            <option value="CHECKED_IN">Check In</option>
          </select>
        </div>

        {formData.status === "CHECKED_IN" && (
          <div className="flex flex-col gap-1">
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
                required
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
              >
                <option value="">Choose a room</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    Room {room.room_number} — {room.room_name} ({room.room_types?.name}) - GH₵
                    {room.room_types?.base_price}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-900">
            Booking Type <span className="text-red-500">*</span>
          </label>
          <select
            name="bookingType"
            value={formData.bookingType}
            onChange={onChange}
            required
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          >
            <option value="">Select booking type</option>
            <option value="WALK_IN">Walk-in</option>
            <option value="ONLINE">Online</option>
            <option value="CORPORATE">Corporate</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="numberOfAdults" className="mb-2 block text-sm font-semibold text-gray-900">
              Number of Adults
            </label>
            <select
              id="numberOfAdults"
              name="numberOfAdults"
              value={formData.numberOfAdults}
              onChange={onChange}
              className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 ring-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              required
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={`${n}`}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="numberOfChildren" className="mb-2 block text-sm font-semibold text-gray-900">
              Number of Children
            </label>
            <select
              id="numberOfChildren"
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={onChange}
              className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 ring-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={`${n}`}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-lg bg-rose-500 px-6 py-3 font-semibold text-white transition hover:bg-rose-600 sm:w-auto"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={
            submitting ||
            !formData.status ||
            !formData.bookingType ||
            (formData.status === "CHECKED_IN" && !formData.roomId)
          }
          className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50 sm:w-auto"
        >
          {submitting ? "Submitting..." : "Complete Booking"}
        </button>
      </div>
    </div>
  );
}
