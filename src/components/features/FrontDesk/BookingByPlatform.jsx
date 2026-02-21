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

  return (
    <div className="min-w-70 flex-1 rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Booking by Type</h2>
        <button className="text-gray-400 transition-colors hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {isLoading ? (
        <div className="flex h-[250px] items-center justify-center text-xs text-gray-400">Loading...</div>
      ) : (
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="30%" height={250}>
            <PieChart>
              <Pie
                data={bookingTypes}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                dataKey="value"
                stroke="#fff"
              >
                {bookingTypes.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col gap-1.5">
            {bookingTypes.map(({ name, value, color }) => (
              <div key={name} className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: color, border: "1px solid #e5e7eb" }}
                />
                <span className="w-24 truncate text-xs text-gray-400">{name}</span>
                <span className="text-xs font-semibold text-gray-600">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
