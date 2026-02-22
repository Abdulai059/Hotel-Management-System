import { Info } from "lucide-react";
import DateDisplay from "./DateDisplay";

function PaymentHeader({ booking, formatDate }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-900 px-4 py-4 text-white">
      <div className="flex items-center gap-8">
        <DateDisplay label="Check-in" date={formatDate(booking.start_date)} />
        <DateDisplay label="Check-out" date={formatDate(booking.end_date)} />
      </div>
      <div className="flex items-center gap-4">
        <Info size={18} className="cursor-pointer text-gray-400 hover:text-[#e7f68f]" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-400">Res ID#</span>
          <span className="font-semibold text-[#e7f68f]">{booking.resId || "—"}</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentHeader;
