import React from "react";
import BookingPrintPDF from "./InvocePrintPDF";

export default function PrintPDFModal({ booking, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <div className="min-h-screen w-full">
        <BookingPrintPDF booking={booking} onClose={onClose} />
      </div>
    </div>
  );
}
