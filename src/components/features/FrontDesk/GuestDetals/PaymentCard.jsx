import { formatCurrency } from "@/utils/helpers";

export default function PaymentCard({ booking, isEditing, onUpdate }) {
  if (!booking) return null;

  const payment = booking.payments || {};

  const toNumber = (v) => Number(v) || 0;

  // Fix: Use num_nights from booking instead of recalculating
  const numNights = toNumber(booking.num_nights);

  // Room charges
  const roomRate = toNumber(booking.room_rate_snapshot);
  const taxRate = toNumber(booking.tax_snapshot);

  const roomTariff = roomRate * numNights;
  const roomTax = (roomTariff * taxRate) / 100;

  // Additional charges
  const addOns = toNumber(payment.addOns);
  const otherCharges = toNumber(payment.otherCharges);
  const otherTax = toNumber(payment.otherTax);

  // Payments and discounts
  const amountPaid = toNumber(payment.amount);
  const discount = toNumber(payment.discount);
  const otherDiscount = toNumber(payment.otherDiscount);

  // Calculations
  const subTotal = roomTariff + addOns + otherCharges;
  const totalTax = roomTax + otherTax;
  const grossTotal = subTotal + totalTax;
  const totalDiscount = discount + otherDiscount;
  const netTotal = grossTotal - totalDiscount;
  const balance = netTotal - amountPaid;

  const editableFields = ["addOns", "otherCharges", "otherTax", "amount", "discount", "otherDiscount"];

  const rows = [
    {
      key: "roomTariff",
      label: "Room Tariff",
      value: roomTariff,
      info: `${numNights} nights × GH₵${roomRate.toFixed(2)}`,
    },
    { key: "roomTax", label: "Room Tax", value: roomTax, info: `${taxRate}% of room tariff` },
    { key: "addOns", label: "Add-ons", value: addOns, editable: true },
    { key: "otherCharges", label: "Other Charges", value: otherCharges, editable: true },
    { key: "otherTax", label: "Other Tax", value: otherTax, editable: true },
  ];

  const deductions = [
    { key: "discount", label: "Discount", value: discount, editable: true },
    { key: "otherDiscount", label: "Other Discount", value: otherDiscount, editable: true },
    { key: "amount", label: "Amount Paid", value: amountPaid, editable: true },
  ];

  const handleChange = (key, value) => {
    if (!editableFields.includes(key)) return;
    onUpdate?.({ [key]: toNumber(value) });
  };

  const renderValue = (key, value) => {
    const editable = isEditing && editableFields.includes(key);

    if (editable) {
      return (
        <input
          type="number"
          step="0.01"
          min="0"
          value={value}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-28 rounded border border-gray-300 bg-gray-50 px-2 py-1 text-right text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      );
    }

    return <span className="font-medium text-gray-900">GH₵ {value.toFixed(2)}</span>;
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-right text-lg font-semibold text-blue-900 uppercase">Payment Details</h3>

      <div className="space-y-2 text-sm">
        {rows.map(({ key, label, value, info }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-600">{label}</span>
              {info && <span className="text-xs text-gray-400">{info}</span>}
            </div>
            {renderValue(key, value)}
          </div>
        ))}
      </div>

      <div className="my-3 border-t border-gray-200 pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Subtotal</span>
          <span className="font-semibold text-gray-900"> {formatCurrency(subTotal.toFixed(2))}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Total Tax</span>
          <span className="font-semibold text-gray-900"> {formatCurrency(totalTax.toFixed(2))}</span>
        </div>
      </div>

      <div className="my-4 border-y border-gray-300 py-3">
        <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
          <span className="text-base font-semibold text-blue-900 uppercase">Gross Total</span>
          <span className="text-xl font-bold text-blue-900"> {formatCurrency(grossTotal.toFixed(2))}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="mb-2 text-xs font-semibold text-gray-500 uppercase">Deductions</div>
        {deductions.map(({ key, label, value }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            {renderValue(key, value)}
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-gray-200 pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Total Deductions</span>
          <span className="font-semibold text-gray-900">{formatCurrency((totalDiscount + amountPaid).toFixed(2))}</span>
        </div>
      </div>

      <div className="my-3 border-t border-gray-200 pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Net Amount (After Discount)</span>
          <span className="font-semibold text-gray-900"> {formatCurrency(netTotal.toFixed(2))}</span>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-600 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-700 uppercase">
            {balance > 0 ? "Amount Due" : balance < 0 ? "Overpaid" : "Fully Paid"}
          </span>
          <span
            className={`text-2xl font-bold ${balance > 0 ? "text-red-600" : balance < 0 ? "text-blue-600" : "text-green-600"}`}
          >
            {formatCurrency(Math.abs(balance).toFixed(2))}
          </span>
        </div>

        <div className="mt-1 text-right text-xs text-gray-500">
          {balance > 0 ? "Outstanding balance" : balance < 0 ? "Credit balance" : "No balance"}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm">
        <span className="text-gray-600">Payment Status</span>
        <span
          className={`font-semibold ${balance <= 0 ? "text-green-600" : balance < netTotal ? "text-amber-600" : "text-red-600"}`}
        >
          {balance <= 0 ? "PAID" : balance < netTotal ? "PARTIAL" : "UNPAID"}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>Payment Method</span>
        <span className="font-medium text-gray-700">{payment.payment_method || "Not specified"}</span>
      </div>
    </div>
  );
}
