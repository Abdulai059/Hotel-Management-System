import SummaryRow from "./SummaryRow";

function SummaryPanel({ summary }) {
  const items = [
    { label: "Booking Total", value: summary.bookingTotal },
    { label: "Other Charges", value: summary.otherCharges },
    { label: "Total Tax", value: summary.totalTaxSummary },
    { label: "Total Disc/Allw", value: summary.totalDiscAllw },
  ];

  return (
    <div className="w-full shrink-0 xl:w-80">
      <div className="rounded-2xl bg-gray-50 p-4 shadow-sm ring-1 ring-gray-100">
        <h3 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">Summary</h3>
        <div className="space-y-2 text-sm">
          {items.map(({ label, value }) => (
            <SummaryRow key={label} label={label} value={value} />
          ))}

          <SummaryRow label="Total Amount" value={summary.totalAmount} bold border />
          <SummaryRow label="Total Paid" value={summary.totalPaid} />
          <SummaryRow label="Balance" value={summary.balance} bold border large />

          <div className="flex justify-end pt-2">
            <button className="text-xs font-semibold text-green-600 hover:underline">Currency Converter</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryPanel;
