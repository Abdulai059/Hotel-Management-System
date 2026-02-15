import { formatCurrency } from "@/utils/helpers";

function MobileSummary({ summary }) {
  return (
    <div className="rounded-lg border-2 border-gray-400 bg-gray-50 p-4">
      <h3 className="mb-3 font-semibold text-gray-800">Transaction Totals</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-700">Total Charges:</span>
          <span className="font-semibold text-gray-800">{formatCurrency(summary.totalCharges.toFixed(2))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Total Tax:</span>
          <span className="font-semibold text-gray-800"> {formatCurrency(summary.totalTax.toFixed(2))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Total Payment:</span>
          <span className="font-semibold text-gray-800"> {formatCurrency(summary.totalPayment.toFixed(2))}</span>
        </div>
      </div>
    </div>
  );
}

export default MobileSummary;
