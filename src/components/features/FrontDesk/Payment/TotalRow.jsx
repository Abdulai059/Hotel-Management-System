import { formatCurrency } from "@/utils/helpers";

function TotalRow({ summary }) {
  return (
    <tr className="bg-gray-100 font-semibold">
      <td colSpan="3" className="rounded-bl-xl px-4 py-3 text-gray-700">
        Total
      </td>
      <td className="px-4 py-3 text-gray-500">—</td>
      <td className="px-4 py-3" />
      <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(summary.totalCharges.toFixed(2))}</td>
      <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(summary.totalTax.toFixed(2))}</td>
      <td className="rounded-br-xl px-4 py-3 text-right text-gray-800">
        {formatCurrency(summary.totalPayment.toFixed(2))}
      </td>
    </tr>
  );
}

export default TotalRow;
