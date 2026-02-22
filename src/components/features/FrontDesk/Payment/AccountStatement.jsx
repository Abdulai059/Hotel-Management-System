import React, { useState } from "react";
import TransactionTable from "./TransactionTable";
import SummaryPanel from "./SummaryPanel";
import AccountButtons from "./AccountButtons";

export default function AccountStatement({ booking }) {
  const [selectedRows, setSelectedRows] = useState([]);

  if (!booking) return null;

  const guest = booking.guests || {};
  const room = booking.rooms || {};
  const roomType = room.room_types || {};
  const payment = booking.payments || {};

  const nights = booking.num_nights || 1;
  const dailyRate = booking.room_rate_snapshot || 0;
  const roomTariff = dailyRate * nights;
  const dailyTax = (payment.roomTax || 0) / nights;

  const transactions = [];
  let id = 1;

  if (nights <= 10) {
    for (let i = 0; i < nights; i++) {
      const date = new Date(booking.start_date);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
      transactions.push({
        id: id++,
        date: formattedDate,
        description: `${booking.booking_type} Rate Room Rent ${roomType.name || "Room"}/${room.room_number || ""}`,
        folio: booking.resId || "",
        discAllwnce: "-",
        charges: booking.room_rate_snapshot,
        tax: dailyTax,
        payment: null,
        isPayment: false,
      });
    }
  } else {
    const startDate = new Date(booking.start_date);
    const formattedDate = startDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    transactions.push({
      id: id++,
      date: formattedDate,
      description: `${booking.booking_type} Rate Room Rent ${roomType.name || "Room"}/${room.room_number || ""} (${nights} nights)`,
      folio: booking.resId || "",
      discAllwnce: "-",
      charges: booking.room_rate_snapshot,
      tax: payment.roomTax || 0,
      payment: null,
      isPayment: false,
    });
  }

  const amountPaid = payment.amount || 0;
  if (amountPaid > 0) {
    const paymentDate = payment.paid_at
      ? new Date(payment.paid_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
      : new Date(booking.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

    transactions.push({
      id: id++,
      date: paymentDate,
      description: `Paid by ${guest.full_name || "Guest"} with ${payment.payment_method?.replace("_", " ") || "Payment"}`,
      folio: "",
      discAllwnce: "",
      charges: null,
      tax: "",
      payment: amountPaid,
      isPayment: true,
    });
  }

  const totalCharges = roomTariff + (payment.addOns || 0) + (payment.otherCharges || 0);
  const totalTax = (payment.roomTax || 0) + (payment.otherTax || 0);
  const totalDiscAllw = (payment.discount || 0) + (payment.otherDiscount || 0);
  const totalPaid = payment.amount || 0;
  const totalAmount = totalCharges + totalTax;
  const balance = totalAmount - totalPaid - totalDiscAllw;

  const summary = {
    totalCharges,
    totalTax,
    totalPayment: totalPaid,
    bookingTotal: roomTariff,
    otherCharges: (payment.addOns || 0) + (payment.otherCharges || 0),
    totalTaxSummary: totalTax,
    totalDiscAllw,
    totalAmount,
    totalPaid,
    balance,
  };

  const handleSelectRow = (rowId) => {
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const handleSelectAll = (e) => {
    setSelectedRows(e.target.checked ? transactions.map((t) => t.id) : []);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-700 uppercase sm:mb-6">Account Statement</h2>

      <TransactionTable
        transactions={transactions}
        selectedRows={selectedRows}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        summary={summary}
      />

      <div className="flex w-full flex-col gap-6 xl:flex-row">
        <div className="flex-1">
          <AccountButtons />
        </div>
        <div className="w-full shrink-0 xl:w-80">
          <SummaryPanel summary={summary} />
        </div>
      </div>
    </div>
  );
}
