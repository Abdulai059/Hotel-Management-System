import { useState } from "react";
import { RoomStatus } from "@/hooks/types";
import { MOCK_ROOMS } from "@/services/mockData";
import RoomCard from "@/components/ui/RoomCard";
import FilterButton from "@/components/ui/FilterButton";
import { Icons } from "@/components/ui/constants";

import { FILTER_ALL } from "@/lib/roomFilters";
import { useFilteredRooms } from "@/hooks/useFilteredRooms";
import { Search } from "lucide-react";
import { Legend } from "recharts";

export default function RoomPage() {
  const rooms = MOCK_ROOMS;

  const [filterStatus, setFilterStatus] = useState(FILTER_ALL);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = useFilteredRooms(rooms, filterStatus, searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      <main className="max-w-8xl mx-auto mt-10 space-y-10 px-6">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap justify-center gap-3">
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

          <div className="flex h-[40px] w-92 max-w-md items-center gap-2 overflow-hidden rounded-full border border-gray-500/30 bg-white pl-4 shadow-sm">
            <Search size={22} className="text-gray-500" />

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search by room number or type..."
              className="h-full w-full bg-transparent text-sm text-gray-500 placeholder-gray-500 outline-none"
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

function EmptyState({ onReset }) {
  return (
    <div className="rounded-sm border-2 border-dashed border-slate-100 bg-white py-32 shadow-inner">
      <div className="mb-6 rounded-full bg-slate-50 p-8 text-slate-200">
        <Icons.Search />
      </div>
      <h3 className="text-2xl font-black text-slate-800">No Results Found</h3>
      <p className="mt-1 font-medium text-slate-400">No rooms match your current filters.</p>
      <button
        onClick={onReset}
        className="mt-8 rounded-2xl bg-slate-100 px-8 py-3 font-bold text-slate-600 hover:bg-slate-200"
      >
        Reset Dashboard
      </button>
    </div>
  );
}
