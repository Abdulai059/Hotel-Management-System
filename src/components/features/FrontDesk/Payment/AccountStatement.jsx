import React, { useState, useMemo } from "react";
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
  const roomTariff = booking.room_rate_snapshot || 0;
  const dailyRate = roomTariff / nights;
  const dailyTax = (payment.roomTax || 0) / nights;

  const transactions = useMemo(() => {
    const txns = [];
    let id = 1;

    for (let i = 0; i < nights; i++) {
      const date = new Date(booking.start_date);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

      txns.push({
        id: id++,
        date: formattedDate,
        description: `${booking.booking_type} Rate Room Rent ${roomType.name || "Room"}/${room.room_number || ""}`,
        folio: booking.resId || "",
        discAllwnce: "-",
        charges: dailyRate,
        tax: dailyTax,
        payment: null,
        isPayment: false,
      });
    }

    const amountPaid = payment.amount || 0;
    if (amountPaid > 0) {
      const paymentDate = payment.paid_at
        ? new Date(payment.paid_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
        : new Date(booking.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

      txns.push({
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

    return txns;
  }, [booking, guest, room, roomType, payment, nights, dailyRate, dailyTax]);

  const summary = useMemo(() => {
    const totalCharges = roomTariff + (payment.addOns || 0) + (payment.otherCharges || 0);
    const totalTax = (payment.roomTax || 0) + (payment.otherTax || 0);
    const totalDiscAllw = (payment.discount || 0) + (payment.otherDiscount || 0);
    const totalPaid = payment.amount || 0;
    const totalAmount = totalCharges + totalTax;
    const balance = totalAmount - totalPaid - totalDiscAllw;

    return {
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
  }, [roomTariff, payment]);

  const handleSelectRow = (id) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
  };

  const handleSelectAll = (e) => {
    setSelectedRows(e.target.checked ? transactions.map((t) => t.id) : []);
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-base font-bold text-blue-900 uppercase sm:mb-6 sm:text-lg">Account Statement</h2>

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

        <div className="w-full flex-shrink-0 xl:w-80">
          <SummaryPanel summary={summary} />
        </div>
      </div>
    </div>
  );
}
