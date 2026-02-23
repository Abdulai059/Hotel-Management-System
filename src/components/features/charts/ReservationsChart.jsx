import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useBookingStats } from "../FrontDesk/useBookingStats";
import RangeDropdown from "./RangeDropdown";
import { useChartRange } from "@/hooks/useChartRange";
import { buildChartData } from "@/hooks/chartUtils";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-gray-600">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="capitalize">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const LEGEND = [
  { label: "Booked", color: "bg-green-200" },
  { label: "Cancelled", color: "bg-yellow-200" },
];

export default function ReservationsChart() {
  const { booked, cancelled, isLoading } = useBookingStats();
  const { range, setRange, customRange, setCustomRange, dateRange } = useChartRange("30d");

  const data = buildChartData(booked, cancelled, dateRange);

  return (
    <div className="min-w-[320px] flex-1 rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-700">Reservations</h2>
          <div className="mt-1 flex items-center gap-3">
            {LEGEND.map(({ label, color }) => (
              <span key={label} className="flex items-center gap-1 text-xs text-gray-400">
                <span className={`inline-block h-2.5 w-2.5 rounded-sm ${color}`} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <RangeDropdown selected={range} onSelect={setRange} customRange={customRange} onCustomRange={setCustomRange} />
      </div>

      {isLoading ? (
        <div className="flex h-45 items-center justify-center text-xs text-gray-400">Loading...</div>
      ) : data.length === 0 ? (
        <div className="flex h-45 items-center justify-center text-xs text-gray-400">No data for this period</div>
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} barGap={2} barCategoryGap="30%">
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#aaa" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#aaa" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
            <Bar dataKey="booked" stackId="a" fill="#d5f6e5" radius={[0, 0, 0, 0]} />
            <Bar dataKey="cancelled" stackId="a" fill="#e7f68f" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
