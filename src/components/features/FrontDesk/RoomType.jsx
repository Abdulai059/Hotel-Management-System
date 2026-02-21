import { RoomAvailabilityCard } from "./room/RoomAvailabilityCard";
import { RevenueCard } from "./room/RevenueCard";

export default function RoomType({ stats }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      <div className="w-full lg:w-72 lg:shrink-0">
        <RoomAvailabilityCard stats={stats} />
      </div>
      <div className="min-h-64 min-w-0 flex-1">
        <RevenueCard stats={stats} />
      </div>
    </div>
  );
}
