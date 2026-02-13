import { Info } from "lucide-react";
import DateDisplay from "./DateDisplay";

function PaymentHeader({ booking, formatDate }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-sky-600 to-sky-700 px-4 py-4 text-white">
      <div className="flex items-center gap-8">
        <DateDisplay label="Check-in" date={formatDate(booking.start_date)} />
        <DateDisplay label="Check-out" date={formatDate(booking.end_date)} />
      </div>
      <div className="flex items-center gap-4">
        <Info size={20} className="cursor-pointer hover:text-yellow-300" />
        <div className="flex items-center gap-2">
          <span className="font-medium">Res ID#</span>
          <span className="font-semibold text-yellow-300">{booking.resId || "-"}</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentHeader;
