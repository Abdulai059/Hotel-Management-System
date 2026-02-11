import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ActivityAvailability({ stats, isLoading, error }) {
  const roomStatus = [
    { label: "Occupied rooms", value: stats?.occupiedRooms || 0 },
    { label: "Available rooms", value: stats?.availableRooms || 0 },
    { label: "Clean", value: "- " },
    { label: "Dirty", value: " - " },
    { label: "Inspected", value: "-" },
  ];

  // Use occupancy percentage from stats
  const occupancyPercentage = stats?.occupancyPercentage || 0;
  const occupancyData = [
    { name: "Occupied", value: occupancyPercentage },
    { name: "Available", value: 100 - occupancyPercentage },
  ];

  const COLORS = ["#FF007F", "#e5e7eb"];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-800">Room Status</h2>
        <div className="space-y-4">
          {roomStatus.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-semibold text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-800">Room Occupancy</h2>
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:pt-10">
          <div className="relative flex w-full justify-center">
            <ResponsiveContainer width={350} height={110}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={92}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={8}
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-800">{occupancyPercentage}%</span>
              <span className="text-sm text-gray-500">Occupied</span>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Room Breakdown</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="rounded-md bg-sky-50 p-3 text-center">
                <p className="text-gray-500">Total</p>
                <p className="text-lg font-semibold text-gray-800 md:text-2xl">{stats?.totalRooms}</p>
              </div>
              <div className="rounded-md bg-red-50 p-3 text-center">
                <p className="text-gray-500">Occupied</p>
                <p className="text-lg font-semibold text-rose-600 md:text-2xl">{stats?.occupiedRooms}</p>
              </div>
              <div className="rounded-md bg-green-50 p-3 text-center">
                <p className="text-gray-500">Available</p>
                <p className="text-lg font-semibold text-emerald-600 md:text-2xl">{stats?.availableRooms}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
