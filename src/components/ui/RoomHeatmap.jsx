import { useState } from "react";
import { useRooms } from "../features/FrontDesk/room/useRoomsQuery";
import { FILTER_ALL } from "@/lib/roomFilters";
import { useFilteredRooms } from "@/hooks/useFilteredRooms";
import { Legend } from "../features/FrontDesk/room/Legend";

export default function RoomHeatmap() {
  const [filterStatus, setFilterStatus] = useState(FILTER_ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const { data: rooms, isLoading, error } = useRooms();

  const filteredRooms = useFilteredRooms(rooms || [], filterStatus, searchQuery);
  const sortedRooms = [...filteredRooms].sort((a, b) => parseInt(a.number) - parseInt(b.number));

  const statusColor = {
    AVAILABLE: "bg-emerald-500 hover:bg-emerald-600",
    OCCUPIED: "bg-rose-500 hover:bg-rose-600",
    MAINTENANCE: "bg-amber-500 hover:bg-amber-600",
  };

  if (isLoading) {
    return (
      <div className="mt-4 space-y-4 bg-gradient-to-br from-slate-50 to-slate-100">
        <Legend />

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="aspect-square w-full animate-pulse rounded bg-gray-200" />
            ))}
          </div>

          <div className="mt-6 flex gap-6 border-t border-gray-300 pt-4">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 rounded-lg bg-red-50 p-6 text-center text-red-600">
        <p className="font-semibold">Failed to load rooms</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <Legend />

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15">
          {sortedRooms.map((room) => (
            <div
              key={room.id}
              className="relative"
              onMouseEnter={() => setHoveredRoom(room)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              {hoveredRoom?.id === room.id && <Tooltip room={room} />}

              <button
                type="button"
                className={`relative aspect-square w-full rounded text-xs font-bold text-white shadow transition ${
                  statusColor[room.status] ?? "bg-gray-400"
                }`}
              >
                <span className="absolute inset-0 flex items-center justify-center">{room.number}</span>

                {room.status === "AVAILABLE" && <span className="absolute inset-0 animate-pulse rounded bg-white/10" />}
              </button>
            </div>
          ))}
        </div>

        <Stats rooms={sortedRooms} />
      </div>
    </div>
  );
}

function Tooltip({ room }) {
  return (
    <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded border bg-white px-3 py-2 text-xs whitespace-nowrap shadow-lg">
      <div className="font-bold">Room {room.number}</div>
      {room.name && <div className="text-slate-600">{room.name}</div>}
      {room.type && <div className="text-slate-600">{room.type}</div>}
      <div className="text-slate-500 capitalize">{room.status.toLowerCase().replace("_", " ")}</div>
      {room.guest && (
        <div className="mt-1 border-t pt-1">
          <div className="font-medium text-slate-700">{room.guest.name}</div>
        </div>
      )}
    </div>
  );
}

function Stats({ rooms }) {
  const count = (status) => rooms.filter((r) => r.status === status).length;

  return (
    <div className="mt-6 flex gap-6 border-t border-gray-300 pt-4 text-sm">
      <span>Total: {rooms.length}</span>
      <span className="text-emerald-600">Available: {count("AVAILABLE")}</span>
      <span className="text-rose-600">Occupied: {count("OCCUPIED")}</span>
      <span className="text-amber-600">Maintenance: {count("MAINTENANCE")}</span>
    </div>
  );
}
