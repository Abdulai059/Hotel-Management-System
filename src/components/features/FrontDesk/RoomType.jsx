import { MoreVertical } from "lucide-react";

function RoomType() {
  const rooms = [
    { dealCount: 2, name: "Single sharing", occupied: 2, total: 30, price: 568 },
    { dealCount: 2, name: "Double sharing", occupied: 2, total: 35, price: 1068 },
    { dealCount: null, name: "Triple sharing", occupied: 2, total: 25, price: 1568 },
    { dealCount: null, name: "VIP Suit", occupied: 4, total: 10, price: 2568 },
  ];

  const getOccupancyColor = (occupied, total) => {
    const ratio = occupied / total;
    if (ratio >= 0.7) return "text-rose-600";
    if (ratio >= 0.4) return "text-amber-600";
    return "text-sky-600";
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">Rooms</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="relative rounded-lg border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-md"
          >
            {room.dealCount && (
              <span className="absolute top-3 left-3 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                {room.dealCount} Deals
              </span>
            )}

            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <MoreVertical size={18} />
            </button>

            <div className="mt-8">
              <h3 className="mb-2 font-medium text-gray-700">{room.name}</h3>

              <div className="mb-3 flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${getOccupancyColor(room.occupied, room.total)}`}>
                  {room.occupied}
                </span>
                <span className="text-lg text-gray-400">/{room.total}</span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-xl font-semibold text-violet-600">${room.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomType;
