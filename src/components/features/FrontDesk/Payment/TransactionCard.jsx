import { formatCurrency } from "@/utils/helpers";

function TransactionCard({ transaction, isSelected, onSelect }) {
  return (
    <div className={`rounded-lg border-2 border-gray-200 p-4 ${transaction.isPayment ? "bg-yellow-50" : "bg-white"}`}>
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={isSelected} onChange={() => onSelect(transaction.id)} className="h-4 w-4" />
          <span className="text-sm font-medium text-gray-700">{transaction.date}</span>
        </div>
        {transaction.isPayment && (
          <span className="rounded-full bg-yellow-200 px-2 py-1 text-xs font-semibold text-yellow-800">Payment</span>
        )}
      </div>

      <div className="mb-3">
        <p
          className={`text-sm ${transaction.folio ? "cursor-pointer text-blue-600 hover:underline" : "text-gray-700"}`}
        >
          {transaction.description}
        </p>
        {transaction.folio && (
          <p className="mt-1 cursor-pointer text-xs text-blue-600 hover:underline">Folio: {transaction.folio}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-3 text-sm">
        {transaction.charges && (
          <div>
            <span className="text-gray-600">Charges:</span>
            <p className="font-medium text-gray-800"> {formatCurrency(transaction.charges.toFixed(2))}</p>
          </div>
        )}
        {transaction.tax && (
          <div>
            <span className="text-gray-600">Tax:</span>
            <p className="font-medium text-gray-800"> {formatCurrency(transaction.tax.toFixed(2))}</p>
          </div>
        )}
        {transaction.payment && (
          <div className="col-span-2">
            <span className="text-gray-600">Payment:</span>
            <p className="font-semibold text-green-700"> {formatCurrency(transaction.payment.toFixed(2))}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionCard;
