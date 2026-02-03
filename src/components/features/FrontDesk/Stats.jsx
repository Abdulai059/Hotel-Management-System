function Stats() {
    const stats = [
        {
            label: "Check-in",
            timeframe: "Today's",
            value: 23,
            color: "text-indigo-600"
        },
        {
            label: "Check-out",
            timeframe: "Today's",
            value: 13,
            color: "text-indigo-600"
        },
        {
            label: "In hotel",
            timeframe: "Total",
            value: 60,
            color: "text-indigo-600"
        },
        {
            label: "Available room",
            timeframe: "Total",
            value: 10,
            color: "text-indigo-600"
        },
        {
            label: "Occupied room",
            timeframe: "Total",
            value: 90,
            color: "text-indigo-600"
        }
    ];

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-sm text-gray-500 mb-1">{stat.timeframe}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xs text-gray-600 font-medium">{stat.label}</span>
                            <span className={`text-3xl font-semibold ${stat.color}`}>
                                {stat.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;