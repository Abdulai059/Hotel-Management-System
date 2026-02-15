import MobileSummary from "./MobileSummary";
import TotalRow from "./TotalRow";
import TransactionCard from "./TransactionCard";
import TransactionRow from "./TransactionRow";

function TransactionTable({ transactions, selectedRows, onSelectAll, onSelectRow, summary }) {
  return (
    <>
      {/* Mobile Card View */}
      <div className="mb-6 block space-y-4 lg:hidden">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            isSelected={selectedRows.includes(transaction.id)}
            onSelect={onSelectRow}
          />
        ))}
        <MobileSummary summary={summary} />
      </div>

      <div className="mb-6 hidden overflow-x-auto lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="px-2 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={onSelectAll}
                  checked={selectedRows.length === transactions.length}
                  className="h-4 w-4"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Description - References</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Folio #</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Disc/Allwnce</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">Charges</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">Tax</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">Payment</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                isSelected={selectedRows.includes(transaction.id)}
                onSelect={onSelectRow}
              />
            ))}
            <TotalRow summary={summary} />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionTable;
