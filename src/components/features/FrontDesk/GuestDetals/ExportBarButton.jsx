import BookingPrintPDF from "../Payment/InvocePrintPDF";
import Modal from "@/components/ui/Modal";
import { useMoveBack } from "@/hooks/useMoveBack";

export default function ExportBarButton({ booking }) {
  const moveBack = useMoveBack();

  const handleExport = (format) => {
    // TODO: implement export
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm">
      <Modal>
        <Modal.Open opens="print-invoice">
          <button className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-1.5 text-sm font-bold text-gray-700 hover:bg-yellow-500">
            PRINT
          </button>
        </Modal.Open>
        <Modal.Window name="print-invoice">
          <BookingPrintPDF booking={booking} />
        </Modal.Window>
      </Modal>

      <div className="flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white">
        <select
          onChange={(e) => handleExport(e.target.value)}
          className="border-r border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 focus:outline-none"
          defaultValue="pdf"
        >
          <option value="pdf">PDF</option>
          <option value="xlsx">Excel</option>
          <option value="csv">CSV</option>
        </select>
        <button
          onClick={() => handleExport("excel")}
          className="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Export
        </button>
      </div>

      <button
        onClick={moveBack}
        className="flex items-center justify-center rounded-xl bg-red-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-red-700"
      >
        BACK
      </button>
    </div>
  );
}
