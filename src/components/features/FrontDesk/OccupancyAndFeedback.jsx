import { useState } from "react";
import { Calendar, ChevronDown, MoreVertical } from "lucide-react";
import { useOccupancyStats } from "./useOccupancyStats";

function OccupancyAndFeedback() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Pass selected year to hook - it will fetch data for that specific year
  const { data: occupancyData, isLoading, error } = useOccupancyStats(selectedYear);

  const feedbackData = [
    { name: "Mark", comment: "Food could be better.", room: "A201" },
    { name: "Christian", comment: "Facilities are not enough for amount paid.", room: "A101" },
    { name: "Alexander", comment: "Room cleaning could be better.", room: "A301" },
  ];

  // Generate last 5 years for dropdown
  const availableYears = Array.from({ length: 7 }, (_, i) => currentYear - i);

  const maxValue =
    occupancyData && occupancyData.length > 0 ? Math.max(...occupancyData.map((item) => item.value)) : 100;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Occupancy Statistics</h2>

          <div className="relative">
            <button
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
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
          <div className="flex h-48 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
              <p className="text-sm text-gray-400">Loading occupancy data for {selectedYear}...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex h-48 items-center justify-center">
            <div className="text-center">
              <p className="mb-2 text-sm text-red-500">Failed to load occupancy data</p>
              <p className="text-xs text-gray-400">{error.message}</p>
            </div>
          </div>
        ) : !occupancyData || occupancyData.length === 0 ? (
          <div className="flex h-48 items-center justify-center">
            <p className="text-sm text-gray-400">No occupancy data available for {selectedYear}</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute top-0 bottom-8 left-0 flex flex-col justify-between text-xs text-gray-400">
              {["100%", "75%", "50%", "25%", "0%"].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className="ml-12 border-l border-gray-200 pl-4">
              <div className="flex h-48 items-end justify-between gap-2">
                {occupancyData.map(({ month, value, year, monthIndex }) => (
                  <div key={`${month}-${year}-${monthIndex}`} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-40 w-full items-end justify-center">
                      <div
                        className="w-5 cursor-pointer rounded-t bg-indigo-600 transition-all hover:bg-indigo-700"
                        style={{ height: `${(value / maxValue) * 100}%` }}
                        title={`${month} ${year}: ${value}% occupancy`}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Customer Feedback</h2>

          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {feedbackData.map(({ name, comment, room }) => (
            <div key={room} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-gray-800">{name}</span>
                <span className="text-sm text-gray-500">{room}</span>
              </div>
              <p className="text-sm text-gray-600">{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OccupancyAndFeedback;
