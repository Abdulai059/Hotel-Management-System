function TotalRow({ summary }) {
  return (
    <tr className="border-t-2 border-gray-400 bg-gray-50 font-semibold">
      <td colSpan="3" className="px-4 py-3 text-gray-800">
        Total
      </td>
      <td className="px-4 py-3 text-gray-700">-</td>
      <td className="px-4 py-3"></td>
      <td className="px-4 py-3 text-right text-gray-800">$ {summary.totalCharges.toFixed(2)}</td>
      <td className="px-4 py-3 text-right text-gray-800">$ {summary.totalTax.toFixed(2)}</td>
      <td className="px-4 py-3 text-right text-gray-800">$ {summary.totalPayment.toFixed(2)}</td>
    </tr>
  );
}

export default TotalRow;
