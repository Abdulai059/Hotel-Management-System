import MobileSummary from "./MobileSummary";
import TotalRow from "./TotalRow";
import TransactionCard from "./TransactionCard";
import TransactionRow from "./TransactionRow";

function TransactionTable({ transactions, selectedRows, onSelectAll, onSelectRow, summary }) {
  return (
    <>
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
            <tr className="border-b border-gray-100">
              <th className="px-2 py-3">
                <input
                  type="checkbox"
                  onChange={onSelectAll}
                  checked={selectedRows.length === transactions.length}
                  className="h-4 w-4 accent-[#9dc43b]"
                />
              </th>
              {["Date", "Description - References", "Folio #", "Disc/Allwnce", "Charges", "Tax", "Payment"].map(
                (header, index) => (
                  <th
                    key={header}
                    className={`px-4 py-3 text-xs font-bold tracking-wide text-gray-400 uppercase ${
                      index >= 4 ? "text-right" : "text-left"
                    }`}
                  >
                    {header}
                  </th>
                ),
              )}
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
