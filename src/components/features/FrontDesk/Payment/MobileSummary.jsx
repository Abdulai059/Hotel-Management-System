import { formatCurrency } from "@/utils/helpers";

function MobileSummary({ summary }) {
  return (
    <div className="rounded-2xl bg-gray-900 p-4">
      <h3 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">Transaction Totals</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Total Charges</span>
          <span className="font-semibold text-white">{formatCurrency(summary.totalCharges.toFixed(2))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total Tax</span>
          <span className="font-semibold text-white">{formatCurrency(summary.totalTax.toFixed(2))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total Payment</span>
          <span className="font-bold text-[#e7f68f]">{formatCurrency(summary.totalPayment.toFixed(2))}</span>
        </div>
      </div>
    </div>
  );
}

export default MobileSummary;
