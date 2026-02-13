import React, { useState } from "react";
import { Info, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "@/utils/helpers";
import PaymentHeader from "./PaymentHeader";
import BookingDetails from "./BookingDetails";
import FolioList from "./FolioList";

export default function PaymentDetails({ booking, isLoading }) {
  const [selectedGuest, setSelectedGuest] = useState(true);

  if (!booking) return null;

  const guest = booking.guests || {};
  const room = booking.rooms || {};
  const roomType = room.room_types || {};
  const payment = booking.payments || {};

  const toNumber = (v) => Number(v) || 0;
  const roomRate = toNumber(booking.room_rate_snapshot);
  const nights = booking.num_nights || 1;

  const roomTariff = roomRate * nights;
  const roomTax = payment.roomTax || 0;
  const addOns = payment.addOns || 0;
  const otherCharges = payment.otherCharges || 0;
  const otherTax = payment.otherTax || 0;
  const discount = payment.discount || 0;
  const otherDiscount = payment.otherDiscount || 0;
  const amountPaid = payment.amount || 0;

  const totalAmount = roomTariff + roomTax + addOns + otherCharges + otherTax;
  const totalBalance = totalAmount - amountPaid - discount - otherDiscount;

  const formatDate = (dateString) => {
    try {
      return dateString ? format(parseISO(dateString), "MMM dd, yyyy") : "-";
    } catch {
      return "-";
    }
  };

  return (
    <div>
      <PaymentHeader booking={booking} formatDate={formatDate} />

      <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-2">
        <BookingDetails
          booking={booking}
          guest={guest}
          room={room}
          roomType={roomType}
          nights={nights}
          roomTariff={roomTariff}
          totalAmount={totalAmount}
          roomTax={roomTax}
          formatDate={formatDate}
        />

        <FolioList
          booking={booking}
          guest={guest}
          room={room}
          roomType={roomType}
          selectedGuest={selectedGuest}
          setSelectedGuest={setSelectedGuest}
          totalAmount={totalAmount}
          amountPaid={amountPaid}
          totalBalance={totalBalance}
        />
      </div>
    </div>
  );
}
