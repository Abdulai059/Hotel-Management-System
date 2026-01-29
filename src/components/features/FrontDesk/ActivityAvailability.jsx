import React from "react";

function ActivityAvailability() {
    const roomStatus = [
        { label: "Occupied rooms", value: 104 },
        { label: "Available rooms", value: 20 },
        { label: "Clean", value: 90 },
        { label: "Dirty", value: 14 },
        { label: "Inspected", value: 60 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Room Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    Room status
                </h2>

                <div className="space-y-4">
                    {roomStatus.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{item.label}</span>
                            <span className="text-sm font-semibold text-gray-800">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floor Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    Floor status
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:pt-10  pt-0 items-center">


                    <div className="flex justify-center">
                        <div className="relative inline-flex items-center justify-center">
                            <svg className="w-48 h-24" viewBox="0 0 200 100">

                                <path
                                    d="M 20 90 A 80 80 0 0 1 180 90"
                                    stroke="#e5e7eb"
                                    strokeWidth="20"
                                    fill="none"
                                    strokeLinecap="round"
                                />

                                <path
                                    d="M 20 90 A 80 80 0 0 1 180 90"
                                    stroke="#4f46e5"
                                    strokeWidth="20"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={`${Math.PI * 80 * 0.8} ${Math.PI * 80}`}
                                />
                            </svg>

                            <div className="absolute bottom-0 flex flex-col items-center">
                                <span className="text-4xl font-bold text-gray-800">80%</span>
                                <span className="text-sm text-gray-500">Completed</span>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col justify-center space-y-4">
                        <h3 className="text-sm font-medium text-gray-700">
                            Room occupancy
                        </h3>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="bg-gray-50 rounded-md p-3 text-center">
                                <p className="text-gray-500">Total</p>
                                <p className="font-semibold text-gray-800 md:text-2xl text-lg">20</p>
                            </div>

                            <div className="bg-red-50 rounded-md p-3 text-center">
                                <p className="text-gray-500">Occupied</p>
                                <p className="font-semibold text-red-600 md:text-2xl text-lg">14</p>
                            </div>

                            <div className="bg-green-50 rounded-md p-3 text-center">
                                <p className="text-gray-500">Available</p>
                                <p className="font-semibold text-green-600 md:text-2xl text-lg">6</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ActivityAvailability;

