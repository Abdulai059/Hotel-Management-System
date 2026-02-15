import { formatCurrency } from "@/utils/helpers";

function TransactionRow({ transaction, isSelected, onSelect }) {
  return (
    <tr className={`border-b border-gray-200 ${transaction.isPayment ? "bg-yellow-100" : ""}`}>
      <td className="px-2 py-3">
        <input type="checkbox" checked={isSelected} onChange={() => onSelect(transaction.id)} className="h-4 w-4" />
      </td>
      <td className="px-4 py-3 text-gray-700">{transaction.date}</td>
      <td className="px-4 py-3">
        {transaction.folio ? (
          <span className="cursor-pointer text-blue-600 hover:underline">{transaction.description}</span>
        ) : (
          <span className="text-gray-700">{transaction.description}</span>
        )}
      </td>
      <td className="px-4 py-3">
        {transaction.folio && <span className="cursor-pointer text-blue-600 hover:underline">{transaction.folio}</span>}
      </td>
      <td className="px-4 py-3 text-gray-700">{transaction.discAllwnce}</td>
      <td className="px-4 py-3 text-right text-gray-700">
        {transaction.charges ? ` ${formatCurrency(transaction.charges.toFixed(2))}` : ""}
      </td>
      <td className="px-4 py-3 text-right text-gray-700">
        {transaction.tax ? ` ${formatCurrency(transaction.tax.toFixed(2))}` : ""}
      </td>
      <td className="px-4 py-3 text-right text-gray-700">
        {transaction.payment ? ` ${formatCurrency(transaction.payment.toFixed(2))}` : ""}
      </td>
    </tr>
  );
}

export default TransactionRow;
