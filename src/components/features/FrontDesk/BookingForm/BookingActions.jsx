import { printArea } from "@/hooks/printArea";

const groupActions = ["Add to New Group", "Remove from Group", "Add to Group"];

export default function BookingActions() {
  return (
    <div className="w-full border-b border-gray-300 bg-gray-200 px-4 py-3">
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-2 rounded-sm border-2 border-gray-400 p-2 shadow-sm">
          {groupActions.map((label) => (
            <button
              key={label}
              className="rounded border border-gray-400 bg-white px-4 py-1 text-sm text-gray-700 transition hover:bg-gray-100"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => printArea("print-guests")}
          className="rounded bg-yellow-400 px-5 py-1.5 text-sm font-bold text-gray-900 uppercase shadow transition hover:bg-yellow-500"
        >
          PRINT
        </button>

        <div className="flex items-center gap-2 rounded-sm border-2 border-gray-400 p-2 shadow-sm">
          <div className="flex items-center overflow-hidden rounded border border-gray-400 bg-white shadow-sm">
            <button className="px-4 py-1 text-sm text-gray-700 transition hover:bg-gray-100">Excel</button>
            <button className="border-l border-gray-300 px-2 py-1 text-gray-600 transition hover:bg-gray-100">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <button className="rounded border border-gray-400 bg-white px-4 py-1 text-sm text-gray-700 transition hover:bg-gray-100">
            Export
          </button>
        </div>

        <button className="rounded bg-red-600 px-5 py-1.5 text-sm font-bold text-white uppercase shadow transition hover:bg-red-700">
          CLOSE
        </button>
      </div>
    </div>
  );
}
