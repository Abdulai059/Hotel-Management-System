import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

const revenueData = [
  { month: "Dec 2027", value: 180000 },
  { month: "Jan 2028", value: 220000 },
  { month: "Feb 2028", value: 315060 },
  { month: "Mar 2028", value: 270000 },
  { month: "Apr 2028", value: 230000 },
  { month: "May 2028", value: 195000 },
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-yellow-300 px-3 py-2 shadow-lg">
        <p className="text-[10px] font-medium text-gray-700">Total Revenue</p>
        <p className="text-sm font-bold text-gray-900">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export function RevenueCard() {
  const [range, setRange] = useState("Last 6 Months");

  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Revenue</h3>
        <button className="flex items-center gap-1 rounded-lg bg-yellow-300 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition-colors hover:bg-yellow-400">
          {range}
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#86efac" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#86efac" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={(v) => `$${v / 1000}K`}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#86efac", strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4ade80"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#fff", stroke: "#4ade80", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
