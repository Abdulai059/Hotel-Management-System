import { LogIn, LogOut, BedDouble, DoorOpen, DoorClosed, TrendingUp, TrendingDown } from "lucide-react";

function StatCard({ label, value, icon: Icon, change = 0, accent, iconBg, iconColor }) {
  let badgeClasses = "flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold";
  if (change > 5) {
    badgeClasses += " bg-green-100 text-gray-500";
  } else if (change >= 0) {
    badgeClasses += " bg-foregroundyellow  text-gray-500";
  } else {
    badgeClasses += " bg-red-100 text-gray-500";
  }

  const isUp = change >= 0;

  return (
    <div
      className={`flex min-w-[160px] flex-1 flex-col gap-3 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
        accent ? "bg-primary" : "bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500">{label}</p>
        </div>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
          <Icon size={16} strokeWidth={1.8} />
        </div>
      </div>

      <span className="text-3xl font-bold tracking-tight text-gray-900">{value}</span>

      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
        <span className={badgeClasses}>
          {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(change)}%
        </span>
        from last week
      </div>
    </div>
  );
}
export default function Stats({ stats }) {
  const statsData = [
    {
      label: "Check-in",
      timeframe: "Today's",
      value: stats?.todayCheckIns || 0,
      icon: LogIn,
      change: 5.3,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      accent: true,
    },
    {
      label: "Check-out",
      timeframe: "Today's",
      value: stats?.todayCheckOuts || 0,
      icon: LogOut,
      change: -1.06,
      iconBg: "bg-primary",
      iconColor: "text-gray-600",
    },
    {
      label: "In hotel",
      timeframe: "Total",
      value: stats?.totalRooms || 0,
      icon: BedDouble,
      change: 2.4,
      iconBg: "bg-primary",
      iconColor: "text-gray-600",
    },
    {
      label: "Available room",
      timeframe: "Total",
      value: stats?.availableRooms || 0,
      icon: DoorOpen,
      change: 3.56,
      iconBg: "bg-primary",
      iconColor: "text-gray-600",
    },
    // {
    //   label: "Occupied room",
    //   timeframe: "Total",
    //   value: stats?.occupiedRooms || 0,
    //   icon: DoorClosed,
    //   change: -0.8,
    //   iconBg: "bg-primary",
    //   iconColor: "text-gray-600",
    // },
  ];

  return (
    <div className="w-full rounded-lg p-0">
      <div className="flex flex-wrap items-start gap-3">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}
