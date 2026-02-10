import { formatDate } from "@/utils/dateHelpers";
import { Gift, Plus } from "lucide-react";

export default function RatesPackages({ booking }) {
  if (!booking) return null;

  const checkIn = formatDate(booking.start_date);
  const checkOut = formatDate(booking.end_date);

  const roomRate = booking.rooms?.price_per_night || 0;
  const totalPrice = booking.total_price || 0;
  const roomType = booking.rooms?.room_type || "Standard";

  return (
    <div className="rounded-lg bg-[#666666] p-2">
      <h2 className="mb-6 text-xl font-medium text-white">Rates / Packages</h2>

      <div className="rounded-lg bg-[#eef4ff] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="min-w-[60px] rounded-lg border-t-4 border-green-500 px-3 py-2 text-center">
              <div className="text-xl font-bold text-gray-900">{checkIn.day}</div>
              <div className="text-xs text-gray-700">{checkIn.month}</div>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-0.5 w-2 rounded-full bg-gray-300" />
                ))}
              </div>
              <span className="text-sm font-medium">{booking.num_nights}Nt</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-0.5 w-2 rounded-full bg-gray-300" />
                ))}
              </div>
            </div>

            <div className="min-w-[60px] rounded-lg border-t-4 border-green-500 px-3 py-2 text-center">
              <div className="text-xl font-bold text-gray-900">{checkOut.day}</div>
              <div className="text-xs text-gray-700">{checkOut.month}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">GH₵ {totalPrice.toFixed(2)}</div>
            <div className="text-sm font-medium text-blue-600">{roomType} Room</div>
            <div className="text-xs text-gray-600">GH₵ {roomRate}/night</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-700">
          <div className="flex items-center gap-2">
            <Gift size={18} />
            <span className="font-medium">Includes:</span>
            <span className="text-gray-600">
              {booking.payments?.addOns > 0 ? `GH₵ ${booking.payments.addOns}` : "None"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Plus size={18} />
            <span className="font-medium">Add-ons:</span>
            <span className="text-gray-600">
              {booking.payments?.otherCharges > 0 ? `GH₵ ${booking.payments.otherCharges}` : "None"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
