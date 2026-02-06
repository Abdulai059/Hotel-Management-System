import { useState } from "react";
import { RoomStatus } from "@/hooks/types";
import { MOCK_ROOMS } from "@/services/mockData";
import { FILTER_ALL } from "@/lib/roomFilters";
import { useFilteredRooms } from "@/hooks/useFilteredRooms";
import { Search } from "lucide-react";
import { Legend } from "../features/FrontDesk/room/Legend";

export default function RoomHeatmap() {
  const [filterStatus, setFilterStatus] = useState(FILTER_ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const filteredRooms = useFilteredRooms(MOCK_ROOMS, filterStatus, searchQuery);

  const sortedRooms = [...filteredRooms].sort((a, b) => parseInt(a.number) - parseInt(b.number));

  const statusColor = {
    [RoomStatus.AVAILABLE]: "bg-emerald-500 hover:bg-emerald-600",
    [RoomStatus.OCCUPIED]: "bg-rose-500 hover:bg-rose-600",
    [RoomStatus.MAINTENANCE]: "bg-amber-500 hover:bg-amber-600",
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="mt-4 space-y-4">
        <Legend />

        {sortedRooms.length ? (
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

                    {room.status === RoomStatus.AVAILABLE && (
                      <span className="absolute inset-0 animate-pulse rounded bg-white/10" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <Stats rooms={sortedRooms} />
          </div>
        ) : (
          <EmptyState
            onReset={() => {
              setFilterStatus(FILTER_ALL);
              setSearchQuery("");
            }}
          />
        )}
      </main>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded ${color}`} />
      <span className="text-sm text-slate-700">{label}</span>
    </div>
  );
}

function Tooltip({ room }) {
  return (
    <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded border bg-white px-3 py-2 text-xs shadow-lg">
      <div className="font-bold">Room {room.number}</div>
      <div className="text-slate-600">{room.type}</div>
      <div className="text-slate-500 capitalize">{room.status.replace("_", " ")}</div>
      {room.guest && <div className="mt-1 border-t pt-1">{room.guest.name}</div>}
    </div>
  );
}

function Stats({ rooms }) {
  const count = (status) => rooms.filter((r) => r.status === status).length;

  return (
    <div className="mt-6 flex gap-6 border-t border-gray-300 pt-4 text-sm">
      <span>Total: {rooms.length}</span>
      <span className="text-emerald-600">Available: {count(RoomStatus.AVAILABLE)}</span>
      <span className="text-rose-600">Occupied: {count(RoomStatus.OCCUPIED)}</span>
      <span className="text-amber-600">Maintenance: {count(RoomStatus.MAINTENANCE)}</span>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center rounded-lg border-2 border-dashed bg-white py-20">
      <Search className="mb-4 h-12 w-12 text-slate-400" />
      <h3 className="text-xl font-bold">No Results Found</h3>
      <p className="mt-2 text-sm text-slate-500">No rooms match your filters.</p>
      <button
        onClick={onReset}
        className="mt-6 rounded bg-slate-800 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Reset Filters
      </button>
    </div>
  );
}
