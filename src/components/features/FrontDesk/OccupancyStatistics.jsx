import { useState } from "react";
import { Calendar, ChevronDown, MoreVertical } from "lucide-react";
import { useOccupancyStats } from "./useOccupancyStats";

function OccupancyStatistics() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const { data: occupancyData, isLoading, error } = useOccupancyStats(selectedYear);

  const availableYears = Array.from({ length: 7 }, (_, i) => currentYear - i);

  const maxValue =
    occupancyData && occupancyData.length > 0 ? Math.max(...occupancyData.map((item) => item.value)) : 100;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-gray-800 sm:text-lg">Occupancy Statistics</h2>

        <div className="relative">
          <button
            onClick={() => setShowYearDropdown(!showYearDropdown)}
            className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 sm:w-auto sm:justify-start"
          >
            <Calendar size={16} />
            {selectedYear}
            <ChevronDown size={16} />
          </button>

          {showYearDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowYearDropdown(false)} />

              <div className="absolute top-full right-0 z-20 mt-1 w-32 rounded-md border border-gray-200 bg-white shadow-lg">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setShowYearDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm first:rounded-t-md last:rounded-b-md hover:bg-gray-50 ${
                      year === selectedYear ? "bg-indigo-50 font-medium text-indigo-600" : "text-gray-700"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {isLoading ? (
        <LoadingState year={selectedYear} />
      ) : error ? (
        <ErrorState error={error} />
      ) : !occupancyData || occupancyData.length === 0 ? (
        <EmptyState year={selectedYear} />
      ) : (
        <OccupancyChart data={occupancyData} maxValue={maxValue} />
      )}
    </div>
  );
}

function LoadingState({ year }) {
  return (
    <div className="flex h-48 items-center justify-center sm:h-64">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
        <p className="text-xs text-gray-400 sm:text-sm">Loading occupancy data for {year}...</p>
      </div>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className="flex h-48 items-center justify-center sm:h-64">
      <div className="text-center">
        <p className="mb-2 text-sm text-red-500">Failed to load occupancy data</p>
        <p className="text-xs text-gray-400">{error.message}</p>
      </div>
    </div>
  );
}

function EmptyState({ year }) {
  return (
    <div className="flex h-48 items-center justify-center sm:h-64">
      <p className="text-xs text-gray-400 sm:text-sm">No occupancy data available for {year}</p>
    </div>
  );
}

function OccupancyChart({ data, maxValue }) {
  return (
    <div className="relative overflow-x-auto">
      <div className="absolute top-0 bottom-8 left-0 hidden flex-col justify-between text-xs text-gray-400 sm:flex">
        {["100%", "75%", "50%", "25%", "0%"].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="border-l border-gray-200 pl-2 sm:ml-12 sm:pl-4">
        <div className="flex h-40 items-end justify-between gap-1 sm:h-48 sm:gap-2">
          {data.map(({ month, value, year, monthIndex }) => (
            <div key={`${month}-${year}-${monthIndex}`} className="flex flex-1 flex-col items-center gap-1 sm:gap-2">
              <div className="flex h-32 w-full items-end justify-center sm:h-40">
                <div
                  className="w-3 cursor-pointer rounded-t bg-indigo-600 transition-all hover:bg-indigo-700 sm:w-5"
                  style={{ height: `${(value / maxValue) * 100}%` }}
                  title={`${month} ${year}: ${value}% occupancy`}
                />
              </div>
              <span className="text-[10px] text-gray-500 sm:text-xs">{month.slice(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Y-axis labels */}
      <div className="mt-2 flex justify-between px-2 text-[10px] text-gray-400 sm:hidden">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

export default OccupancyStatistics;
