import React from "react";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "@/utils/helpers";

export default function BookingPrintPDF({ booking, onClose }) {
  if (!booking) return null;

  const guest = booking.guests || {};
  const room = booking.rooms || {};
  const roomType = room.room_types || {};
  const payment = booking.payments || {};
  const hotel = booking.hotel || {};

  const toNumber = (v) => Number(v) || 0;

  const roomRate = toNumber(booking.room_rate_snapshot);
  const nights = booking.num_nights || 1;
  const taxRate = toNumber(booking.tax_snapshot);

  const roomTariff = roomRate * nights;
  const roomTax = (roomTariff * taxRate) / 100;
  const addOns = toNumber(payment.addOns);
  const otherCharges = toNumber(payment.otherCharges);
  const otherTax = toNumber(payment.otherTax);
  const discount = toNumber(payment.discount);
  const otherDiscount = toNumber(payment.otherDiscount);
  const amountPaid = toNumber(payment.amount);

  const subTotal = roomTariff + addOns + otherCharges;
  const totalTax = roomTax + otherTax;
  const grossTotal = subTotal + totalTax;
  const totalDiscount = discount + otherDiscount;
  const netTotal = grossTotal - totalDiscount;
  const balance = netTotal - amountPaid;

  const formatDate = (dateString) => {
    try {
      return dateString ? format(parseISO(dateString), "MMM dd, yyyy") : "-";
    } catch {
      return "-";
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice Print</title>
          <style>
            @page { size: A4; margin: 0.5in; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              margin: 0;
              padding: 0;
              height: auto;
              overflow: visible;
              color: black;
              background: white;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .max-w-4xl { max-width: 60rem; margin: 0 auto; }
            .bg-white { background-color: white; }
            .p-8 { padding: 2rem; }
            .text-black { color: black; }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-end { text-align: end; }
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-base { font-size: 1rem; line-height: 1.5rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-normal { font-weight: 400; }
            .uppercase { text-transform: uppercase; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-1 { margin-bottom: 0.25rem; }
            .mt-2 { margin-top: 0.5rem; }
            .pt-1 { padding-top: 0.25rem; }
            .pt-4 { padding-top: 1rem; }
            .pb-2 { padding-bottom: 0.5rem; }
            .pb-8 { padding-bottom: 2rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .leading-relaxed { line-height: 1.625; }
            .border-b { border-bottom-width: 1px; }
            .border-t { border-top-width: 1px; }
            .border-t-2 { border-top-width: 2px; }
            .border-gray-200 { border-color: #e5e7eb; }
            .border-gray-300 { border-color: #d1d5db; }
            .border-gray-400 { border-color: #9ca3af; }
            .text-blue-600 { color: #2563eb; }
            .text-gray-500 { color: #6b7280; }
            .text-gray-700 { color: #374151; }
            .text-gray-800 { color: #1f2937; }
            .text-gray-900 { color: #111827; }
            .text-\[10px\] { font-size: 10px; }
            .ml-16 { margin-left: 4rem; }
            .w-80 { width: 20rem; }
            .w-8 { width: 2rem; }
            .ml-auto { margin-left: auto; }
            .space-y-1 > * + * { margin-top: 0.25rem; }
            .flex { display: flex; }
            .gap-4 { gap: 1rem; }
            .justify-between { justify-content: space-between; }
            .w-full { width: 100%; }
            .border-collapse { border-collapse: collapse; }
            table { width: 100%; border-collapse: collapse; page-break-inside: auto; }
            th, td {
              padding: 0.5rem;
              text-align: left;
              font-size: 0.75rem;
              line-height: 1rem;
              border-bottom: 1px solid #e5e7eb;
            }
            th { font-weight: 600; border-bottom: 1px solid #d1d5db; }
            .avoid-break { page-break-inside: avoid; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            thead { display: table-header-group; }
            @media print {
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; }
              .avoid-break { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="max-w-4xl bg-white p-8 text-black">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const transactions = [];
  let id = 1;

  if (nights <= 10) {
    for (let i = 0; i < nights; i++) {
      const date = new Date(booking.start_date);
      date.setDate(date.getDate() + i);

      transactions.push({
        id: id++,
        date: date.toISOString(),
        description: `Seasonal Rate Room Rent ${roomType.name || "Room"}/R-${room.room_number || ""}`,
        charges: roomRate,
        tax: roomTax / nights,
        payment: 0,
      });
    }
  } else {
    transactions.push({
      id: id++,
      date: booking.start_date,
      description: `Seasonal Rate Room Rent ${roomType.name || "Room"}/R-${room.room_number || ""} (${nights} nights)`,
      charges: roomRate,
      tax: roomTax,
      payment: 0,
    });
  }

  if (amountPaid > 0) {
    transactions.push({
      id: id++,
      date: booking.start_date,
      description: `Paid by ${guest.full_name || "Guest"} with ${payment.payment_method || "Cash"}`,
      charges: 0,
      tax: 0,
      payment: amountPaid,
    });
  }

  return (
    <>
      <style>
        {`
          @media print {
            @page { size: A4; margin: 0.5in; }
            html, body {
              height: auto !important;
              min-height: 100% !important;
              overflow: visible !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body * { visibility: hidden; }
            #print-content, #print-content * { visibility: visible; }
            #print-content {
              position: static !important;
              left: auto !important;
              top: auto !important;
              width: 100% !important;
              height: auto !important;
              min-height: auto !important;
              max-height: none !important;
              overflow: visible !important;
              background: white !important;
              z-index: auto !important;
              transform: none !important;
            }
            .fixed, .inset-0, .bg-black, .bg-opacity-50, .flex.h-full.items-center.justify-center {
              display: none !important;
            }
            .no-print { display: none !important; }
            * { page-break-inside: auto; }
            table { page-break-inside: auto; width: 100% !important; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            thead { display: table-header-group; }
            .avoid-break { page-break-inside: avoid; }
            .mb-6 { page-break-after: auto; }
            .space-y-1 > * { page-break-inside: avoid; }
            .h-screen, .max-h-full { height: auto !important; max-height: none !important; }
          }
        `}
      </style>

      <div className="no-print mb-4 flex items-center justify-end gap-3">
        <button
          onClick={handlePrint}
          className="rounded bg-yellow-400 px-6 py-2 font-semibold text-black hover:bg-yellow-500"
        >
          PRINT
        </button>
        <button onClick={onClose} className="rounded bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700">
          CLOSE
        </button>
      </div>

      <div className="print-container" style={{ minHeight: "auto", height: "auto", maxHeight: "none" }}>
        <div
          id="print-content"
          className="mx-auto max-w-4xl bg-white p-8 text-black"
          style={{ minHeight: "auto", height: "auto", maxHeight: "none" }}
        >
          <div className="avoid-break mb-4 text-end">
            <h1 className="text-xl font-bold">{hotel.name || "Global Dream Hotel"}</h1>
          </div>

          <div className="avoid-break mb-4 text-right text-xs leading-relaxed">
            <p>{hotel.country || "Ghana"}</p>
            <p>
              <span className="font-semibold">Phone:</span>
            </p>
            <p>
              <span className="font-semibold">Email:</span> {hotel.email || "abdulaioismar9080@gmail.com"}
            </p>
            <p>
              <span className="font-semibold">Website:</span>
            </p>
          </div>

          <div className="avoid-break mb-4 text-xs leading-relaxed">
            <p>
              <span>Check-in:</span> {formatDate(booking.start_date)}
            </p>
            <p>
              <span>Check-out:</span> {formatDate(booking.end_date)}
            </p>
            <p>
              <span>Res ID# {booking.resId || "-"}</span>
            </p>
          </div>

          <div className="avoid-break mb-6">
            <h2 className="mb-3 text-base font-bold uppercase">Booking Details</h2>

            <div className="mb-2 text-xs leading-relaxed">
              <div className="mb-1 flex gap-4">
                <span className="text-sm text-blue-600">{guest.full_name || "Mr/Mrs"}</span>
                <span className="font-bold">{booking.resId || "-"}</span>
              </div>
              <p>
                <span className="font-normal">Address:</span>
              </p>
              <p>
                <span className="font-normal">Phone:</span> {guest.phone || "556655"}
                <span className="ml-16 font-normal">Email:</span> {guest.email || "guestmail@hotellogx.co"}
              </p>
            </div>

            <div className="mb-3 text-sm">
              <p className="font-semibold">Created On</p>
              <p className="py-2 text-xs">{formatDate(booking.created_at)}</p>
            </div>

            <div className="mb-3 text-xs">
              <p className="pb-2 text-sm font-semibold">Stay Details</p>
              <p>
                {roomType.name || "Superior Room"} (R-{room.room_number})
              </p>
              <p>
                {formatDate(booking.start_date)} - {formatDate(booking.end_date)} ({nights} Nights)
              </p>
            </div>

            <div className="mb-3 text-xs">
              <p className="py-2 text-sm font-semibold">Room(s)/Person(s)</p>
              <p>Room(s)/2 ({booking.num_guests || 0} Adults)</p>
            </div>

            <div className="text-xs">
              <p className="py-2 text-sm font-semibold">Amount</p>
              <p className="font-bold">{formatCurrency(roomTariff)}</p>
              <p className="text-[10px]">
                ({formatCurrency(grossTotal)} with tax {formatCurrency(totalTax)})
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-3 text-base font-bold uppercase">Invoice Statement</h2>

            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="w-8 py-2 text-center font-semibold">#</th>
                  <th className="px-2 py-2 text-left font-semibold">Date</th>
                  <th className="px-2 py-2 text-left font-semibold">Description - References</th>
                  <th className="px-2 py-2 text-center font-semibold">Folio #</th>
                  <th className="px-2 py-2 text-center font-semibold">Disc/Allwnce</th>
                  <th className="px-2 py-2 text-right font-semibold">Charges</th>
                  <th className="px-2 py-2 text-right font-semibold">Tax</th>
                  <th className="px-2 py-2 text-right font-semibold">Payment</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={txn.id} className="border-b border-gray-200">
                    <td className="py-2 text-center">{index + 1}</td>
                    <td className="px-2 py-2">{formatDate(txn.date)}</td>
                    <td className="px-2 py-2 text-blue-600">{txn.description}</td>
                    <td className="px-2 py-2 text-center">-</td>
                    <td className="px-2 py-2 text-center">-</td>
                    <td className="px-2 py-2 text-right">{txn.charges > 0 ? formatCurrency(txn.charges) : ""}</td>
                    <td className="px-2 py-2 text-right">{txn.tax > 0 ? formatCurrency(txn.tax) : ""}</td>
                    <td className="px-2 py-2 text-right">{txn.payment > 0 ? formatCurrency(txn.payment) : ""}</td>
                  </tr>
                ))}
                <tr className="border-t border-gray-400 font-semibold">
                  <td colSpan="5" className="px-2 py-2 text-center">
                    Total
                  </td>
                  <td className="px-2 py-2 text-right">{formatCurrency(subTotal)}</td>
                  <td className="px-2 py-2 text-right">{formatCurrency(totalTax)}</td>
                  <td className="px-2 py-2 text-right">{formatCurrency(amountPaid)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="avoid-break ml-auto w-80 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Booking Total</span>
                <span className="text-right">{formatCurrency(roomTariff)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Other Charges</span>
                <span className="text-right">{formatCurrency(otherCharges + addOns)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Tax</span>
                <span className="text-right">{formatCurrency(totalTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Disc/Allw</span>
                <span className="text-right">{formatCurrency(totalDiscount)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-1 font-bold">
                <span>Total Amount</span>
                <span className="text-right">{formatCurrency(netTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Paid</span>
                <span className="text-right">{formatCurrency(amountPaid)}</span>
              </div>
              <div className="flex justify-between border-t-2 border-gray-400 pt-1 font-bold">
                <span>Balance</span>
                <span className="text-right">{formatCurrency(balance)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
