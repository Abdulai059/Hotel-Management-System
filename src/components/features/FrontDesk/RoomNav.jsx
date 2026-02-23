import StatCard from "@/components/ui/StatCard";
import { Icons } from "@/components/ui/constants";
import { useRoomStats } from "@/hooks/useRoomStats";

export default function RoomNav({ rooms }) {
  const stats = useRoomStats(rooms);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="px-6 py-3">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gray-900 shadow-sm">
              <img src="/global-dreams.png" alt="global dream logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-gray-900">GLOBAL DREAM HOTEL</h1>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9dc43b]" />
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Frontdesk Operations Live
                </p>
              </div>
            </div>
          </div>

          <div className="no-scrollbar flex gap-3 overflow-x-auto py-1 pb-2">
            <StatCard label="Occupancy" value={`${stats.occupancyRate}%`} color="text-rose-500" icon={Icons.Users} />
            <StatCard label="Available" value={stats.available} color="text-[#9dc43b]" icon={Icons.Bed} />
            <StatCard label="Alerts" value={stats.maintenance} color="text-amber-500" icon={Icons.Sparkles} />
          </div>
        </div>
      </div>
    </header>
  );
}
