import React from "react";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "@/utils/helpers";
import { handlePrintContent } from "@/utils/printHelpers";

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

  const handlePrint = () => handlePrintContent("print-content");

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
    <div className="py-6">
      <div className="no-print mx-4 mb-4 flex items-center justify-end gap-3">
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
              <span className="font-semibold">Phone:</span> 0200000000
            </p>
            <p>
              <span className="font-semibold">Email:</span> {hotel.email || "abdulaioismar9080@gmail.com"}
            </p>
            <p>
              <span className="font-semibold">Website:</span> globaldreamhotel.com
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
                    <td className="px-2 py-2 text-right">{txn.charges > 0 ? formatCurrency(txn.charges) : "-"}</td>
                    <td className="px-2 py-2 text-right">{txn.tax > 0 ? formatCurrency(txn.tax) : "-"}</td>
                    <td className="px-2 py-2 text-right">{txn.payment > 0 ? formatCurrency(txn.payment) : "-"}</td>
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
              <div className="flex justify-between border-t border-gray-300 bg-gray-100 py-4 pt-1 font-bold uppercase">
                <span className="text-base">Total Amount</span>
                <span className="text-right">{formatCurrency(netTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Paid</span>
                <span className="text-right">{formatCurrency(amountPaid)}</span>
              </div>
              <div className="flex justify-between border-t-2 border-gray-400 bg-gray-100 py-4 pt-1 font-bold uppercase">
                <p className="text-base">Balance</p>
                <p className="text-right text-lg text-green-500">{formatCurrency(balance)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
