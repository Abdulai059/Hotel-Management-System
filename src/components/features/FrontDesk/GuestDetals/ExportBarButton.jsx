import { useState } from "react";
import BookingPrintPDF from "../Payment/InvocePrintPDF";
import Modal from "@/components/ui/Modal";
import { useMoveBack } from "@/hooks/useMoveBack";

export default function ExportBarButton({ booking, onCloseModal }) {
  const moveBack = useMoveBack();

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-3 bg-gray-200 px-4 py-3 sm:flex-row">
        <Modal>
          <Modal.Open opens="print-invoice">
            <button className="flex items-center justify-center gap-2 rounded bg-yellow-400 px-4 py-1 text-sm font-semibold hover:bg-yellow-500 sm:w-auto">
              PRINT
            </button>
          </Modal.Open>

          <Modal.Window name="print-invoice">
            <BookingPrintPDF booking={booking} />
          </Modal.Window>
        </Modal>

        <div className="w-full items-center overflow-hidden rounded border border-gray-300 bg-white sm:w-auto md:flex">
          <select
            onChange={(e) => handleExport(e.target.value)}
            className="flex-1 border-r border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 focus:outline-none sm:flex-initial"
            defaultValue=""
          >
            <option value="pdf">PDF</option>
            <option value="xlsx">Excel</option>
            <option value="csv">CSV</option>
          </select>

          <button
            onClick={() => handleExport("excel")}
            className="bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Export
          </button>
        </div>

        <button
          onClick={moveBack}
          className="flex items-center justify-center rounded bg-red-600 px-4 py-1 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
        >
          BACK
        </button>
      </div>
    </>
  );
}
