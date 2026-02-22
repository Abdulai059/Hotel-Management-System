import { formatCurrency } from "@/utils/helpers";

function TransactionRow({ transaction, isSelected, onSelect }) {
  return (
    <tr
      className={`border-b border-gray-100 transition-colors hover:bg-gray-50/60 ${transaction.isPayment ? "bg-primary/30" : ""}`}
    >
      <td className="py-3 pl-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(transaction.id)}
          className="h-4 w-4 accent-[#9dc43b]"
        />
      </td>
      <td className="px-4 py-3 text-xs text-gray-500">{transaction.date}</td>
      <td className="px-4 py-3">
        {transaction.folio ? (
          <span className="cursor-pointer font-medium text-green-600 hover:underline">{transaction.description}</span>
        ) : (
          <span className="text-gray-700">{transaction.description}</span>
        )}
      </td>
      <td className="px-4 py-3">
        {transaction.folio && (
          <span className="rounded-full bg-[#e7f68f] px-2.5 py-0.5 text-xs font-bold text-gray-700">
            {transaction.folio}
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-700">{transaction.discAllwnce}</td>
      <td className="px-4 py-3 text-right font-medium text-gray-700">
        {transaction.charges ? formatCurrency(transaction.charges.toFixed(2)) : "-"}
      </td>
      <td className="px-4 py-3 text-right font-medium text-gray-700">
        {transaction.tax ? formatCurrency(transaction.tax.toFixed(2)) : "-"}
      </td>
      <td className="px-4 py-3 text-right font-bold text-gray-700">
        {transaction.payment ? formatCurrency(transaction.payment.toFixed(2)) : "-"}
      </td>
    </tr>
  );
}

export default TransactionRow;
