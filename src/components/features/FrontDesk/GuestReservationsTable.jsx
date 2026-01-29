import { useState } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import Tag from "@/components/ui/Tag";
import Pagination from "@/components/ui/Pagination";

const reservationsData = [
    { id: "5644", name: "Alexander", room: "A647", totalAmount: 467, amountPaid: 200, status: "unconfirmed" },
    { id: "6112", name: "Pegasus", room: "A456", totalAmount: 645, amountPaid: 250, status: "checked-in" },
    { id: "6141", name: "Martin", room: "A645", totalAmount: 686, amountPaid: 400, status: "checked-out" },
    { id: "6535", name: "Cecil", room: "A684", totalAmount: 8413, amountPaid: 2500, status: "checked-in" },
    { id: "6541", name: "Luke", room: "B464", totalAmount: 841, amountPaid: 400, status: "checked-in" },
    { id: "9846", name: "Yadrin", room: "C648", totalAmount: 684, amountPaid: 300, status: "checked-out" },
    { id: "4921", name: "Kiand", room: "D644", totalAmount: 984, amountPaid: 513, status: "unconfirmed" },
    { id: "4921", name: "Kiand", room: "D644", totalAmount: 984, amountPaid: 513, status: "checked-in" },
    { id: "9841", name: "Turen", room: "B641", totalAmount: 984, amountPaid: 600, status: "checked-out" },
    { id: "9841", name: "Turen", room: "B641", totalAmount: 984, amountPaid: 600, status: "unconfirmed" }
];


const statusToTagName = {
    unconfirmed: "bg-blue-100 text-blue-700",
    "checked-in": "bg-green-100 text-green-700",
    "checked-out": "bg-gray-100 text-gray-700",
};


export default function GuestReservationsTable() {


    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {["Reservation ID", "Name", "Room Number", "Total Amount", "Amount Paid", "Status", ""].map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reservationsData.map((res, i) => {
                            const status = res.status || "unconfirmed";
                            return (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-900">{res.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.room}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${res.totalAmount.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${res.amountPaid.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-xs whitespace-nowrap">
                                        <Tag className={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        <button className="hover:text-gray-600">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
                {reservationsData.map((res, i) => {
                    const status = res.status || "unconfirmed";
                    return (
                        <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 mb-1">{res.id}</div>
                                    <div className="text-sm text-gray-600">{res.name}</div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Room</div>
                                    <div className="text-sm text-gray-900">{res.room}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Status</div>
                                    <Tag className={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Total Amount</div>
                                    <div className="text-sm font-medium text-gray-900">${res.totalAmount.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Amount Paid</div>
                                    <div className="text-sm font-medium text-gray-900">${res.amountPaid.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <Pagination />
        </div>
    );
}
