export default function PaymentCard({ booking, isEditing, onUpdate }) {
  if (!booking) return null;

  const payment = booking.payments || {};

  if (!payment || Object.keys(payment).length === 0) return null;

  // Helper function to safely convert null to 0
  const toNumber = (value) => value ?? 0;

  // Calculate total from API fields
  const roomTariff = toNumber(payment.roomTariff);
  const roomTax = toNumber(payment.roomTax);
  const addOns = toNumber(payment.addOns);
  const otherCharges = toNumber(payment.otherCharges);
  const otherTax = toNumber(payment.otherTax);

  const total = roomTariff + roomTax + addOns + otherCharges + otherTax;

  // Calculate deductions
  const amountPaid = toNumber(payment.amount);
  const discount = toNumber(payment.discount);
  const otherDiscount = toNumber(payment.otherDiscount);

  const balance = total - amountPaid - discount - otherDiscount;

  const rows = [
    { key: "roomTariff", label: "Room Tariff", value: roomTariff },
    { key: "roomTax", label: "Room Tax", value: roomTax },
    { key: "addOns", label: "Add-ons", value: addOns },
    { key: "otherCharges", label: "Other Charges", value: otherCharges },
    { key: "otherTax", label: "Other Tax", value: otherTax },
  ];

  const deductions = [
    { key: "amount", label: "Amount Paid", value: amountPaid },
    { key: "discount", label: "Discount", value: discount },
    { key: "otherDiscount", label: "Other Discount", value: otherDiscount },
  ];

  const handleChange = (key, value) => {
    if (onUpdate) {
      onUpdate({ [key]: value });
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-right text-lg font-semibold tracking-wide text-blue-900 uppercase">
        Payment Details (GH₵)
      </h3>

      <div className="space-y-2 text-sm">
        {rows.map(({ key, label, value }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            {isEditing ? (
              <input
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => handleChange(key, Number(e.target.value))}
                className="w-28 rounded border border-gray-300 bg-gray-50 px-2 py-1 text-right"
              />
            ) : (
              <span className="font-medium text-gray-900">GH₵ {value.toFixed(2)}</span>
            )}
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-dashed pt-3">
        <div className="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-2">
          <span className="text-base font-semibold text-slate-700 uppercase">Total Price</span>
          <span className="text-xl font-bold text-slate-900">GH₵ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {deductions.map(({ key, label, value }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            {isEditing ? (
              <input
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => handleChange(key, Number(e.target.value))}
                className="w-28 rounded border border-gray-300 bg-gray-50 px-2 py-1 text-right"
              />
            ) : (
              <span className="font-medium text-gray-900">-GH₵ {value.toFixed(2)}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border-t-2 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-700 uppercase">Amount Due</span>
          <span className={`text-2xl font-bold ${balance > 0 ? "text-red-600" : "text-green-600"}`}>
            GH₵ {Math.abs(balance).toFixed(2)}
          </span>
        </div>

        <div className="mt-1 text-right text-xs text-gray-500">
          {balance > 0 ? "Outstanding balance" : "Overpaid / Credit"}
        </div>
      </div>

      {/* Payment Status Indicator */}
      <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm">
        <span className="text-gray-600">Payment Status</span>
        <span className={`font-semibold ${payment.paid ? "text-green-600" : "text-amber-600"}`}>
          {payment.paid ? "PAID" : "PENDING"}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>Payment Method</span>
        <span className="font-medium text-gray-700">{payment.payment_method}</span>
      </div>
    </div>
  );
}
