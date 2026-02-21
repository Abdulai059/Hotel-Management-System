import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MoreHorizontal } from "lucide-react";
import { useBookingStats } from "../FrontDesk/useBookingStats";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-gray-600">{name}</p>
      <p className="text-gray-400">{value}%</p>
    </div>
  );
};

export default function BookingByPlatform() {
  const { bookingTypes, isLoading } = useBookingStats();

  const total = bookingTypes.reduce((sum, t) => sum + t.value, 0);

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Booking by Type</h2>
        <button className="text-gray-400 transition-colors hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center text-xs text-gray-400">Loading...</div>
      ) : (
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-[180px] shrink-0">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={bookingTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {bookingTypes.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-gray-800">{total}%</span>
              <span className="text-[10px] text-gray-400">Total</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.5">
            {bookingTypes.map(({ name, value, color }) => (
              <div key={name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs text-gray-500">{name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${value}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
