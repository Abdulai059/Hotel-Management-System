function Stats() {
  const stats = [
    {
      label: "Check-in",
      timeframe: "Today's",
      value: 23,
      color: "text-sky-600",
    },
    {
      label: "Check-out",
      timeframe: "Today's",
      value: 13,
      color: "text-amber-600",
    },
    {
      label: "In hotel",
      timeframe: "Total",
      value: 60,
      color: "text-emerald-600",
    },
    {
      label: "Available room",
      timeframe: "Total",
      value: 10,
      color: "text-violet-600",
    },
    {
      label: "Occupied room",
      timeframe: "Total",
      value: 90,
      color: "text-rose-600",
    },
  ];

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">Overview</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <span className="mb-1 text-sm text-gray-500">{stat.timeframe}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium text-gray-600">{stat.label}</span>
              <span className={`text-3xl font-semibold ${stat.color}`}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
