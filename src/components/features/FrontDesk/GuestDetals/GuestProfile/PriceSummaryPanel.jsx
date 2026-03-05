import { FieldLabel } from "@/components/ui/FieldLabel";

export function PriceSummaryPanel({ booking }) {
  if (!booking) return null;

  const numNights = Number(booking.num_nights) || 0;
  const roomRate = Number(booking.room_rate_snapshot) || 0;

  const roomAndOffer = roomRate;
  const extras = Number(booking.payments?.addOns) || 0;
  const vat = Number(booking.payments?.roomTax) || 0;
  const cityTax = 49.5;

  const totalPrice = roomAndOffer + extras + vat + cityTax;

  const rows = [
    {
      label: "Room and offer",
      amount: `GH₵ ${roomAndOffer.toFixed(2)}`,
      info: `${numNights} nights × ₵ ${roomRate.toFixed(2)}`,
    },
    {
      label: "Extras",
      amount: `GH₵ ${extras.toFixed(2)}`,
    },
    {
      label: "VAT",
      amount: `GH₵ ${vat.toFixed(2)}`,
    },
    {
      label: "City Tax",
      amount: `GH₵ ${cityTax.toFixed(2)}`,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <p className="text-sm font-semibold text-gray-900">Price Summary</p>
        <span className="rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">Paid</span>
      </div>

      <div className="mb-4 flex flex-col gap-2.5">
        {rows.map(({ label, amount, info }) => (
          <div key={label} className="flex justify-between text-sm text-gray-500">
            <div className="flex flex-col">
              <span className="text-gray-500">{label}</span>
              {info && <span className="mb-1 text-xs text-gray-400">{info}</span>}
            </div>
            <span>{amount}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t border-gray-100 pt-3 text-[15px] font-bold text-gray-900">
        <span>Total Price</span>
        <span>GH₵ {totalPrice.toFixed(2)}</span>
      </div>

      <div className="mt-3">
        <FieldLabel>Notes</FieldLabel>
        <p className="text-xs leading-relaxed text-gray-400">
          Invoice sent to corporate account; payment confirmed by BIG Corporation
        </p>
      </div>
    </div>
  );
}
