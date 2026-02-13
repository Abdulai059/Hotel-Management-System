import { formatCurrency } from "@/utils/helpers";
import PaymentButtons from "./PaymentButtons";
import { Trash2 } from "lucide-react";

function FolioList({
  booking,
  guest,
  room,
  roomType,
  selectedGuest,
  setSelectedGuest,
  totalAmount,
  amountPaid,
  totalBalance,
}) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-base font-bold text-blue-900 uppercase sm:mb-6 sm:text-lg">Folio List</h2>

      {/* Mobile Card View */}
      <div className="block space-y-4 md:hidden">
        <div className="rounded-lg bg-gray-50 p-0">
          <p className="mb-3 font-medium text-gray-700">
            Room Type(Room): {roomType.name || "-"} ({room.room_number || "-"})
          </p>

          <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <input
                  type="checkbox"
                  checked={selectedGuest}
                  onChange={(e) => setSelectedGuest(e.target.checked)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2 font-medium text-blue-600">{booking.resId || "-"}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <Trash2 size={16} />
              </button>
            </div>

            <p className="text-sm text-gray-800">{guest.full_name || "-"}</p>

            <div className="space-y-2 border-t border-gray-200 pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-gray-800">{formatCurrency(totalAmount.toFixed(2))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paid:</span>
                <span className="font-medium text-gray-800">{formatCurrency(amountPaid.toFixed(2))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Balance:</span>
                <span className="font-medium text-gray-800">{formatCurrency(totalBalance.toFixed(2))}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-100 p-4 font-semibold">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-800">Total Amount:</span>
              <span className="text-gray-800">{formatCurrency(totalAmount.toFixed(2))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800">Total Paid:</span>
              <span className="text-gray-800">{formatCurrency(amountPaid.toFixed(2))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800">Total Balance:</span>
              <span className="text-gray-800">{formatCurrency(totalBalance.toFixed(2))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-2 py-3 text-left">
                <input type="checkbox" className="h-4 w-4" />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Guest</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">Amount($)</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">Paid</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">Balance</th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="6" className="px-4 py-2 font-medium text-gray-700">
                Room Type(Room): {roomType.name || "-"} ({room.room_number || "-"})
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-2 py-3">
                <input
                  type="checkbox"
                  checked={selectedGuest}
                  onChange={(e) => setSelectedGuest(e.target.checked)}
                  className="h-4 w-4 text-blue-600"
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-600">{booking.resId || "-"}</span>
                  <span className="text-gray-800">{guest.full_name || "-"}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totalAmount.toFixed(2))}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(amountPaid.toFixed(2))}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totalBalance.toFixed(2))}</td>
              <td className="px-2 py-3">
                <button className="text-blue-600 hover:text-blue-700">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
            <tr className="bg-blue-100 font-semibold">
              <td colSpan="2" className="px-4 py-3 text-gray-800">
                Total
              </td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totalAmount.toFixed(2))}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(amountPaid.toFixed(2))}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totalBalance.toFixed(2))}</td>
              <td className="px-2 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <PaymentButtons />
    </div>
  );
}

export default FolioList;
