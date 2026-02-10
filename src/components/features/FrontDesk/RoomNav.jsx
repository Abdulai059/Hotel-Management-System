import StatCard from "@/components/ui/StatCard";
import { Icons } from "@/components/ui/constants";
import { useRoomStats } from "@/hooks/useRoomStats";

export default function RoomNav({ rooms }) {
  const stats = useRoomStats(rooms);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="absolute inset-0 border-b border-slate-200/50 bg-white/70 backdrop-blur-xl" />

      <div className="relative px-6 py-0">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 rotate-3 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl">
              <span className="text-xl font-black">
                <img src="/global-dreams.png" alt="global dream logo" />
              </span>
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">GLOBAL DREAM HOTEL</h1>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  Frontdesk Operations Live
                </p>
              </div>
            </div>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto py-1 pb-2">
            <StatCard label="Occupancy" value={`${stats.occupancyRate}%`} color="text-rose-600" icon={Icons.Users} />
            <StatCard label="Available" value={stats.available} color="text-emerald-600" icon={Icons.Bed} />
            <StatCard label="Alerts" value={stats.maintenance} color="text-amber-600" icon={Icons.Sparkles} />
          </div>
        </div>
      </div>
    </header>
  );
}
