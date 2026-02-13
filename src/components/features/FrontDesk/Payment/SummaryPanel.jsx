import SummaryRow from "./SummaryRow";

function SummaryPanel({ summary }) {
  const items = [
    { label: "Booking Total", value: summary.bookingTotal },
    { label: "Other Charges", value: summary.otherCharges },
    { label: "Total Tax", value: summary.totalTaxSummary },
    { label: "Total Disc/Allw", value: summary.totalDiscAllw },
  ];

  return (
    <div className="w-full flex-shrink-0 xl:w-80">
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-800 sm:text-base">Summary</h3>
        <div className="space-y-2 text-sm">
          {items.map(({ label, value }) => (
            <SummaryRow key={label} label={label} value={value} />
          ))}

          <SummaryRow label="Total Amount" value={summary.totalAmount} bold border />
          <SummaryRow label="Total Paid" value={summary.totalPaid} />
          <SummaryRow label="Balance" value={summary.balance} bold border large />

          <div className="flex justify-end pt-2">
            <button className="text-xs font-medium text-sky-700 hover:underline sm:text-sm">Currency Converter</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryPanel;
