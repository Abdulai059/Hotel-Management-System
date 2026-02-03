import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ActivityAvailability() {
  const roomStatus = [
    { label: "Occupied rooms", value: 104 },
    { label: "Available rooms", value: 20 },
    { label: "Clean", value: 90 },
    { label: "Dirty", value: 14 },
    { label: "Inspected", value: 60 },
  ];

  const floorPercentage = 80; // Completed %
  const floorData = [
    { name: "Completed", value: floorPercentage },
    { name: "Remaining", value: 100 - floorPercentage },
  ];

  const COLORS = ["#4f46e5", "#e5e7eb"]; // Indigo and Gray

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
        <h2 className="mb-6 text-lg font-semibold text-gray-800">Floor Status</h2>
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:pt-10">
          <div className="relative flex w-full justify-center">
            <ResponsiveContainer width={350} height={110}>
              <PieChart>
                <Pie
                  data={floorData}
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
                  {floorData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-800">{floorPercentage}%</span>
              <span className="text-sm text-gray-500">Completed</span>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Room Occupancy</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-gray-500">Total</p>
                <p className="text-lg font-semibold text-gray-800 md:text-2xl">20</p>
              </div>
              <div className="rounded-md bg-red-50 p-3 text-center">
                <p className="text-gray-500">Occupied</p>
                <p className="text-lg font-semibold text-red-600 md:text-2xl">14</p>
              </div>
              <div className="rounded-md bg-green-50 p-3 text-center">
                <p className="text-gray-500">Available</p>
                <p className="text-lg font-semibold text-green-600 md:text-2xl">6</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
