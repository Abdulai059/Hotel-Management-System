export default function PaymentCard({ bookingData, isEditing, handleInputChange }) {
  const total =
    bookingData.payment.roomTariff +
    bookingData.payment.roomTax +
    bookingData.payment.addOns +
    bookingData.payment.otherCharges +
    bookingData.payment.otherTax;

  const balance =
    total - bookingData.payment.amountPaid - bookingData.payment.discount - bookingData.payment.otherDiscount;

  const rows = [
    { key: "roomTariff", label: "Room Tariff" },
    { key: "roomTax", label: "Room Tax" },
    { key: "addOns", label: "Add-ons" },
    { key: "otherCharges", label: "Other Charges" },
    { key: "otherTax", label: "Other Tax" },
  ];

  const deductions = [
    { key: "amountPaid", label: "Amount Paid" },
    { key: "discount", label: "Discount" },
    { key: "otherDiscount", label: "Other Discount" },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-right text-lg font-semibold tracking-wide text-blue-900 uppercase">
        Payment Details (USD $)
      </h3>

      <div className="space-y-2 text-sm">
        {rows.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            {isEditing ? (
              <input
                type="number"
                step="0.01"
                value={bookingData.payment[key]}
                onChange={(e) => handleInputChange("payment", key, Number(e.target.value))}
                className="w-28 rounded border border-gray-300 bg-gray-50 px-2 py-1 text-right"
              />
            ) : (
              <span className="font-medium text-gray-900">${bookingData.payment[key].toFixed(2)}</span>
            )}
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-dashed pt-3">
        <div className="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-2">
          <span className="text-base font-semibold text-slate-700 uppercase">Total Price</span>
          <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {deductions.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            {isEditing ? (
              <input
                type="number"
                step="0.01"
                value={bookingData.payment[key]}
                onChange={(e) => handleInputChange("payment", key, Number(e.target.value))}
                className="w-28 rounded border border-gray-300 bg-gray-50 px-2 py-1 text-right"
              />
            ) : (
              <span className="font-medium text-gray-900">-${bookingData.payment[key].toFixed(2)}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border-t-2 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-700 uppercase">Amount Due</span>
          <span className={`text-2xl font-bold ${balance > 0 ? "text-red-600" : "text-green-600"}`}>
            ${Math.abs(balance).toFixed(2)}
          </span>
        </div>

        <div className="mt-1 text-right text-xs text-gray-500">
          {balance > 0 ? "Outstanding balance" : "Overpaid / Credit"}
        </div>
      </div>
    </div>
  );
}
