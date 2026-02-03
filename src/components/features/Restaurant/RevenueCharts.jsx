import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Mar", income: 10000, expense: 5000 },
  { month: "Apr", income: 12000, expense: 7000 },
  { month: "May", income: 11000, expense: 6500 },
  { month: "Jun", income: 13000, expense: 7500 },
  { month: "Jul", income: 16580, expense: 6000 },
  { month: "Aug", income: 15000, expense: 8000 },
  { month: "Sep", income: 14000, expense: 7000 },
  { month: "Oct", income: 17000, expense: 6500 },
];

const categoryData = [
  { name: "Seafood", value: 30, color: "#fb923c" },
  { name: "Beverages", value: 25, color: "#fdba74" },
  { name: "Dessert", value: 25, color: "#1f2937" },
  { name: "Pasta", value: 20, color: "#d1d5db" },
];

export default function RevenueCharts() {
  return (
    <div className="flex flex-wrap gap-6 py-6">
      <div className="min-w-[300px] flex-1 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">$184,839</p>
          </div>
          <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50">
            Last 8 Months ▼
          </button>
        </div>

        <div className="mb-3 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
            <span className="text-sm text-gray-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-800"></div>
            <span className="text-sm text-gray-600">Expense</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: "#4f46e5" }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#1f2937"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: "#1f2937" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:w-[300px] md:w-[350px]">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-base font-semibold text-gray-900">Top Categories</h3>
          <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50">
            This Month ▼
          </button>
        </div>

        <div className="mb-4 flex items-center justify-center">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categoryData.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: category.color }}></div>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
              <span className="ml-auto text-sm text-gray-500">{category.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
