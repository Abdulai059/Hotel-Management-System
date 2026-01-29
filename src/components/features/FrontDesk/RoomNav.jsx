import { useState } from "react";

export default function RoomNav() {
    const [activeFilter, setActiveFilter] = useState("all");

    const filters = [
        { id: "all", label: "All rooms", count: 100 },
        { id: "available", label: "Available", count: 20 },
        { id: "booked", label: "Booked", count: 80 },
    ];

    return (
        <div className="w-full bg-white border-b border-gray-200">
            <div className="px-6 py-5">

                <div className="mb-4 text-sm font-semibold text-gray-500">
                    Rooms
                </div>


                <div className="flex items-center justify-between gap-4">

                    <div className="flex flex-wrap items-center gap-2">
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter.id;

                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-full
                    text-sm font-medium transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                    ${isActive
                                            ? "bg-indigo-600 text-white shadow-sm"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600"
                                        }
                  `}
                                >
                                    <span>{filter.label}</span>
                                    <span
                                        className={`
                      px-2 py-0.5 text-xs rounded-full
                      ${isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-gray-100 text-gray-600"
                                            }
                    `}
                                    >
                                        {filter.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>


                    <button className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
            bg-indigo-600 text-white text-sm font-semibold shadow-sm
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40
            transition"
                    >
                        + Add room
                    </button>
                </div>
            </div>
        </div>
    );
}
