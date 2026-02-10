import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { UtensilsCrossed, ShoppingBag, Monitor } from "lucide-react";

const ORDERS_DATA = [
  { day: "Mon", orders: 120 },
  { day: "Tue", orders: 140 },
  { day: "Wed", orders: 180 },
  { day: "Thu", orders: 185 },
  { day: "Fri", orders: 160 },
  { day: "Sat", orders: 170 },
  { day: "Sun", orders: 150 },
];

const ORDER_TYPES = [
  { label: "Dine-In", percentage: 45, count: 900, icon: UtensilsCrossed },
  { label: "Takeaway", percentage: 30, count: 600, icon: ShoppingBag },
  { label: "Online", percentage: 25, count: 500, icon: Monitor },
];

function OrdersOverview() {
  return (
    <div className="flex flex-wrap gap-6 py-6">
      <section className="min-w-[300px] flex-1 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <Header title="Orders Overview" filter="This Week" />

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ORDERS_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
              contentStyle={tooltipStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={{ color: "#fff" }}
              formatter={(value) => [`${value} orders`]}
            />
            <Bar
              dataKey="orders"
              fill="#4f46e5"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
              activeBar={{ fill: "#6366f1" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:w-[300px] md:w-[350px]">
        <Header title="Order Types" filter="This Month" />

        <div className="space-y-6">
          {ORDER_TYPES.map(({ label, percentage, count, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <Icon className="h-6 w-6 text-orange-500" />
              </div>

              <div className="flex-1">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{label}</span>
                  <span className="text-gray-500">{percentage}%</span>
                </div>

                <div className="h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-gray-800 transition-all" style={{ width: `${percentage}%` }} />
                </div>
              </div>

              <span className="min-w-[60px] text-right text-lg font-semibold text-gray-800">{count}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Header({ title, filter }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
        {filter} ▼
      </button>
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: "#1f2937",
  border: "none",
  borderRadius: "8px",
  padding: "8px 12px",
  color: "#fff",
};

const tooltipLabelStyle = {
  color: "#fff",
  fontWeight: 600,
};

export default OrdersOverview;
