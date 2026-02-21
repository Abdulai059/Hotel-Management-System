import { MoreHorizontal } from "lucide-react";

export function RoomAvailabilityCard({ stats }) {
  const roomStats = [
    { label: "Occupied", color: "bg-[#d5f6e5]", value: stats?.occupiedRooms || 0 },
    { label: "Maintenance", color: "bg-[#e5e7eb]", value: stats?.occupiedMaintenance || 0 },
    { label: "Available", color: "bg-[#e7f68f]", value: stats?.availableRooms || 0 },
  ];

  const totalRooms = stats?.totalRooms || 0;

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Room Availability</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex h-10 w-full overflow-hidden rounded-lg">
        {roomStats.map((room) => (
          <div
            key={room.label}
            className={`${room.color} transition-all`}
            style={{
              width: totalRooms > 0 ? `${(room.value / totalRooms) * 100}%` : "0%",
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {roomStats.map((room) => (
          <div key={room.label} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className={`h-14 w-1.5 ${room.color}`} />
              <div className="flex flex-col gap-1 px-2">
                <span className="text-xs text-gray-500">{room.label}</span>
                <span className="text-xl font-bold text-gray-800">{room.value}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="h-14 w-1.5 bg-[#f3fcc7]" />
            <div className="flex flex-col gap-1 px-2">
              <span className="text-xs text-gray-500">Total Rooms</span>
              <span className="text-xl font-bold text-gray-800">{totalRooms}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
