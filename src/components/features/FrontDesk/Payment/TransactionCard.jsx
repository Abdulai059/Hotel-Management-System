import { formatCurrency } from "@/utils/helpers";

function TransactionCard({ transaction, isSelected, onSelect }) {
  return (
    <div className={`rounded-2xl border border-gray-100 p-4 ${transaction.isPayment ? "bg-primary/40" : "bg-white"}`}>
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(transaction.id)}
            className="h-4 w-4 accent-[#9dc43b]"
          />
          <span className="text-xs font-semibold text-gray-500">{transaction.date}</span>
        </div>
        {transaction.isPayment && (
          <span className="rounded-full bg-[#e7f68f] px-2.5 py-0.5 text-xs font-bold text-gray-700">Payment</span>
        )}
      </div>

      <div className="mb-3">
        <p
          className={`text-sm ${transaction.folio ? "cursor-pointer font-medium text-[#9dc43b] hover:underline" : "text-gray-700"}`}
        >
          {transaction.description}
        </p>
        {transaction.folio && <p className="mt-1 text-xs text-gray-400">Folio: {transaction.folio}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 text-sm">
        {transaction.charges && (
          <div>
            <span className="text-xs text-gray-400">Charges</span>
            <p className="font-semibold text-gray-800">{formatCurrency(transaction.charges.toFixed(2))}</p>
          </div>
        )}
        {transaction.tax && (
          <div>
            <span className="text-xs text-gray-400">Tax</span>
            <p className="font-semibold text-gray-800">{formatCurrency(transaction.tax.toFixed(2))}</p>
          </div>
        )}
        {transaction.payment && (
          <div className="col-span-2">
            <span className="text-xs text-gray-400">Payment</span>
            <p className="font-bold text-[#9dc43b]">{formatCurrency(transaction.payment.toFixed(2))}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionCard;
