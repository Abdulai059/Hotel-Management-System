import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";

export const RANGE_OPTIONS = [
  { label: "Custom", value: "custom" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "This Month", value: "month" },
];

export default function RangeDropdown({ selected, onSelect, customRange, onCustomRange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel = RANGE_OPTIONS.find((o) => o.value === selected)?.label;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50"
      >
        {selectedLabel}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 z-10 mt-1.5 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          {RANGE_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => {
                onSelect(value);
                if (value !== "custom") setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-xs transition-colors hover:bg-gray-50 ${
                selected === value ? "font-semibold text-green-600" : "text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}

          {selected === "custom" && (
            <div className="border-t border-gray-100 px-4 py-3">
              <p className="mb-2 text-xs font-medium text-gray-500">Date range</p>
              <div className="flex flex-col gap-1.5">
                <input
                  type="date"
                  value={customRange.from ? format(customRange.from, "yyyy-MM-dd") : ""}
                  onChange={(e) =>
                    onCustomRange((prev) => ({ ...prev, from: e.target.value ? new Date(e.target.value) : null }))
                  }
                  className="w-full rounded border border-gray-200 px-2 py-1 text-xs focus:border-green-400 focus:outline-none"
                />
                <input
                  type="date"
                  value={customRange.to ? format(customRange.to, "yyyy-MM-dd") : ""}
                  onChange={(e) =>
                    onCustomRange((prev) => ({ ...prev, to: e.target.value ? new Date(e.target.value) : null }))
                  }
                  className="w-full rounded border border-gray-200 px-2 py-1 text-xs focus:border-green-400 focus:outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="mt-1 w-full rounded bg-green-600 py-1 text-xs font-semibold text-white hover:bg-green-700"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
