import Pagination from "@/components/ui/Pagination";
import { useState } from "react";

export default function RoomTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 7;

    const rooms = [
        { id: "#001", bedType: "Double bed", floor: "Floor - 1", facilities: "AC, shower, Double bed, towel bathtub, TV", status: "Available", statusColor: "bg-indigo-50 text-indigo-600" },
        { id: "#002", bedType: "Single bed", floor: "Floor - 2", facilities: "AC, shower, Double bed, towel bathtub, TV", status: "Booked", statusColor: "bg-red-50 text-red-600" },
        { id: "#003", bedType: "VIP", floor: "Floor - 1", facilities: "AC, shower, Double bed, towel bathtub, TV", status: "Booked", statusColor: "bg-red-50 text-red-600" },
        { id: "#004", bedType: "VIP", floor: "Floor - 1", facilities: "AC, shower, Double bed, towel bathtub, TV", status: "Reserved", statusColor: "bg-emerald-50 text-emerald-600" },
        { id: "#005", bedType: "Single bed", floor: "Floor - 1", facilities: "AC, shower, Double bed, towel bathtub, TV", status: "Reserved", statusColor: "bg-emerald-50 text-emerald-600" },
        { id: "#006", bedType: "Double bed", floor: "Floor - 2", facilities: "AC, shower, Double bed, towel bathtub, TV", status: "Waitlist", statusColor: "bg-amber-50 text-amber-600" },
        { id: "#007", bedType: "Double bed", floor: "Floor - 3", facilities: "AC, shower, Double bed, towel bathtub, TV", status: "Reserved", statusColor: "bg-emerald-50 text-emerald-600" },
        { id: "#008", bedType: "Single bed", floor: "Floor - 5", facilities: "AC, shower, Double bed, towel bathtub, TV", status: "Blocked", statusColor: "bg-orange-50 text-orange-600" },
    ];

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="w-full bg-white shadow-sm border border-gray-200 rounded-sm">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b bg-gray-50 border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Room</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Bed</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Floor</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Facilities</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{room.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{room.bedType}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{room.floor}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{room.facilities}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${room.statusColor}`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">•••</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y">
                {rooms.map((room) => (
                    <div key={room.id} className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900">{room.id}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${room.statusColor}`}>
                                {room.status}
                            </span>
                        </div>
                        <div className="text-sm text-gray-600">{room.bedType} · {room.floor}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{room.facilities}</div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination />
        </div>
    );
}
