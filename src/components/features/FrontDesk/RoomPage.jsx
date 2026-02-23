import { useState } from "react";
import { RoomStatus } from "@/hooks/types";
import { MOCK_ROOMS } from "@/services/mockData";
import RoomCard from "@/components/ui/RoomCard";
import FilterButton from "@/components/ui/FilterButton";
import { Icons } from "@/components/ui/constants";
import { FILTER_ALL } from "@/lib/roomFilters";
import { useFilteredRooms } from "@/hooks/useFilteredRooms";
import { Search } from "lucide-react";
import { Legend } from "./room/Legend";

export default function RoomPage() {
  const rooms = MOCK_ROOMS;
  const [filterStatus, setFilterStatus] = useState(FILTER_ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRooms = useFilteredRooms(rooms, filterStatus, searchQuery);

  const handleReset = () => {
    setFilterStatus(FILTER_ALL);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="mx-auto mt-8 max-w-screen-2xl space-y-8 px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterButton active={filterStatus === FILTER_ALL} onClick={() => setFilterStatus(FILTER_ALL)}>
              All Rooms
            </FilterButton>
            <FilterButton
              active={filterStatus === RoomStatus.AVAILABLE}
              onClick={() => setFilterStatus(RoomStatus.AVAILABLE)}
              color="emerald"
            >
              Available
            </FilterButton>
            <FilterButton
              active={filterStatus === RoomStatus.OCCUPIED}
              onClick={() => setFilterStatus(RoomStatus.OCCUPIED)}
              color="rose"
            >
              Occupied
            </FilterButton>
            <FilterButton
              active={filterStatus === RoomStatus.MAINTENANCE}
              onClick={() => setFilterStatus(RoomStatus.MAINTENANCE)}
              color="amber"
            >
              Service
            </FilterButton>
          </div>

          <div className="flex h-10 w-full max-w-sm items-center gap-2 overflow-hidden rounded-xl border border-gray-200 bg-white px-4 shadow-sm">
            <Search size={16} className="shrink-0 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search by room number or type..."
              className="h-full w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        <Legend />

        {filteredRooms.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <EmptyState onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-white py-24">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-300">
        <Icons.Search />
      </div>
      <h3 className="text-lg font-bold text-gray-800">No Results Found</h3>
      <p className="mt-1 text-sm text-gray-400">No rooms match your current filters.</p>
      <button
        onClick={onReset}
        className="mt-6 rounded-xl bg-[#e7f68f] px-6 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-[#d4e87a]"
      >
        Reset Filters
      </button>
    </div>
  );
}
