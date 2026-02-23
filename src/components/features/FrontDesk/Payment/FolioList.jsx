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
    <div className="rounded-2xl border border-gray-300 bg-white p-4 shadow sm:p-6">
      <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-700 uppercase sm:mb-6">Folio List</h2>

      {/* Mobile */}
      <div className="block space-y-4 md:hidden">
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="mb-3 text-xs font-bold tracking-wide text-gray-400 uppercase">
            {roomType.name || "—"} (R{room.room_number || "—"})
          </p>

          <div className="space-y-3 rounded-xl border border-gray-100 bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedGuest}
                  onChange={(e) => setSelectedGuest(e.target.checked)}
                  className="h-4 w-4 accent-[#9dc43b]"
                />
                <span className="rounded-full bg-[#e7f68f] px-2.5 py-0.5 text-xs font-bold text-gray-700">
                  {booking.resId || "—"}
                </span>
              </div>
              <button className="text-gray-300 transition-colors hover:text-red-500">
                <Trash2 size={15} />
              </button>
            </div>

            <p className="text-sm font-medium text-gray-800">{guest.full_name || "—"}</p>

            <div className="space-y-2 border-t border-gray-100 pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Amount</span>
                <span className="font-semibold text-gray-800">{formatCurrency(totalAmount.toFixed(2))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Paid</span>
                <span className="font-semibold text-gray-800">{formatCurrency(amountPaid.toFixed(2))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Balance</span>
                <span className="font-semibold text-gray-800">{formatCurrency(totalBalance.toFixed(2))}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gray-900 p-4">
          <div className="space-y-2 text-sm font-semibold">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-white">{formatCurrency(totalAmount.toFixed(2))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Paid</span>
              <span className="text-white">{formatCurrency(amountPaid.toFixed(2))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Balance</span>
              <span className="text-[#e7f68f]">{formatCurrency(totalBalance.toFixed(2))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-2 py-3">
                <input type="checkbox" className="h-4 w-4 accent-[#9dc43b]" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold tracking-wide text-gray-400 uppercase">Guest</th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-wide text-gray-400 uppercase">Amount</th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-wide text-gray-400 uppercase">Paid</th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-wide text-gray-400 uppercase">Balance</th>
              <th className="px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="6" className="px-4 py-2 text-xs font-bold tracking-wide text-gray-400 uppercase">
                {roomType.name || "—"} (R{room.room_number || "—"})
              </td>
            </tr>
            <tr className="border-b border-gray-100 hover:bg-gray-50/60">
              <td className="px-2 py-3">
                <input
                  type="checkbox"
                  checked={selectedGuest}
                  onChange={(e) => setSelectedGuest(e.target.checked)}
                  className="h-4 w-4 accent-[#9dc43b]"
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#e7f68f] px-2.5 py-0.5 text-xs font-bold text-gray-700">
                    {booking.resId || "—"}
                  </span>
                  <span className="font-medium text-gray-800">{guest.full_name || "—"}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(totalAmount.toFixed(2))}</td>
              <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(amountPaid.toFixed(2))}</td>
              <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(totalBalance.toFixed(2))}</td>
              <td className="px-2 py-3">
                <button className="text-gray-300 transition-colors hover:text-red-500">
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
            <tr className="bg-primary font-semibold">
              <td colSpan="2" className="rounded-bl-xl px-4 py-3 text-gray-500">
                Total
              </td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totalAmount.toFixed(2))}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(amountPaid.toFixed(2))}</td>
              <td className="px-4 py-3 text-right text-rose-600">{formatCurrency(totalBalance.toFixed(2))}</td>
              <td className="rounded-br-xl px-2 py-3" />
            </tr>
          </tbody>
        </table>
      </div>

      <PaymentButtons />
    </div>
  );
}

export default FolioList;
