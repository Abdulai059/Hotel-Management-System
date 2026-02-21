import { RoomAvailabilityCard } from "./room/RoomAvailabilityCard";
import { RevenueCard } from "./room/RevenueCard";

export default function RoomType({ stats }) {
  return (
    <div className="flex items-stretch gap-4 px-6">
      <div className="w-60 sm:w-94">
        <RoomAvailabilityCard stats={stats} />
      </div>
      <div className="min-w-75 flex-1">
        <RevenueCard stats={stats} />
      </div>
    </div>
  );
}
