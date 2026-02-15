import { Printer, X } from "lucide-react";
import { useState } from "react";
import BookingPrintPDF from "../Payment/InvocePrintPDF";

export default function ExportBarButton({ booking }) {
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };

  const handleClose = () => {
    setShowPrintModal(false);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-3 bg-gray-200 px-4 py-3 sm:flex-row">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 rounded bg-yellow-400 px-4 py-1 text-sm font-semibold hover:bg-yellow-500 sm:w-auto"
        >
          PRINT
        </button>

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
          onClick={handleClose}
          className="flex items-center justify-center rounded bg-red-600 px-4 py-1 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
        >
          BACK
        </button>
      </div>

      {showPrintModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 bg-black">
          <div className="flex h-full items-center justify-center p-4">
            <div className="max-h-full w-full max-w-6xl overflow-y-auto rounded-lg bg-white">
              <BookingPrintPDF booking={booking} onClose={() => setShowPrintModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
