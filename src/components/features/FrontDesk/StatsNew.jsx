import { Calendar, LogIn, LogOut, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

function StatCard({ label, value, icon: Icon, change, accent }) {
  const isUp = change >= 0;

  return (
    <div
      className={`flex min-w-[160px] flex-1 flex-col gap-3 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
        accent ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium tracking-wide text-gray-400">{label}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/60 text-gray-500">
          <Icon size={16} strokeWidth={1.8} />
        </div>
      </div>

      <span className="text-3xl font-bold tracking-tight text-gray-900">{value}</span>

      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
        <span
          className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold ${
            isUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
          }`}
        >
          {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(change)}%
        </span>
        from last week
      </div>
    </div>
  );
}

export default function StatsCards({ stats }) {
  const statsData = [
    {
      label: "New Bookings",
      value: "840", // hardcoded for now
      icon: Calendar,
      change: 8.7,
      accent: true,
    },
    {
      label: "Check-In",
      value: stats?.todayCheckIns || 0, // dynamic
      icon: LogIn,
      change: 3.56, // you can replace with dynamic later
    },
    {
      label: "Check-Out",
      value: stats?.todayCheckOuts || 0, // dynamic
      icon: LogOut,
      change: -1.06, // you can replace with dynamic later
    },
    {
      label: "Total Revenue",
      value: "$123,980", // hardcoded for now
      icon: DollarSign,
      change: 5.7,
    },
  ];

  return (
    <div className="flex flex-wrap items-start gap-3 p-6">
      {statsData.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
