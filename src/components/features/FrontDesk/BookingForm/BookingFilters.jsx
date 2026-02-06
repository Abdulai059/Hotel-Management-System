import { Download, RefreshCw, CalendarDays } from "lucide-react";
import { useState } from "react";

export default function BookingFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([{ label: "Alfred Josh", value: "alfred-josh" }]);
  const [createdOnDate, setCreatedOnDate] = useState("Feb 05, 2026");
  const [checkInDate, setCheckInDate] = useState("Feb 05, 2026");
  const [notesFilter, setNotesFilter] = useState("All Notes Title");
  const [statusFilter, setStatusFilter] = useState("Filter By Status");
  const [filterBy, setFilterBy] = useState("Filter By");
  const [sortBy, setSortBy] = useState("Sort By");
  const [groupBy, setGroupBy] = useState("Group");

  const [showExcludeComp, setShowExcludeComp] = useState(false);
  const [show3rdPartyResID, setShow3rdPartyResID] = useState(false);
  const [showWebRefID, setShowWebRefID] = useState(false);
  const [showDayUseOnly, setShowDayUseOnly] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const removeFilter = (value) => {
    setActiveFilters(activeFilters.filter((f) => f.value !== value));
  };

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="px-4 py-2">
        <div className="flex items-center gap-2">
          <button className="rounded border-b-2 border-blue-700 bg-blue-700 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
            FrontDesk
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button className="rounded bg-gray-700 p-1.5 text-white hover:bg-blue-700" title="Refresh">
              <RefreshCw size={18} />
            </button>
            <button className="rounded bg-blue-700 p-1.5 text-white hover:bg-blue-800" title="Download">
              <Download size={18} />
            </button>
            <select className="rounded bg-gray-200 px-3 py-1 text-sm text-black outline-none">
              <option className="bg-white text-black">Month</option>
              <option className="bg-white text-black">Week</option>
              <option className="bg-white text-black">Day</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-green-900 px-4 py-3">
        <div className="mb-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Name/Group/Res ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-40 rounded border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <div className="flex gap-2 rounded-sm border-2 border-gray-400 px-2 py-1.5">
            <label className="flex items-center gap-2 text-sm text-white">
              <input type="radio" name="dateType" className="h-4 w-4" defaultChecked />
              <span>CreatedOn</span>
            </label>

            <label className="flex items-center gap-2 text-sm text-white">
              <input type="radio" name="dateType" className="h-4 w-4" />
              <span>Check In</span>
            </label>

            <div className="relative">
              <input
                type="text"
                value={createdOnDate}
                onChange={(e) => setCreatedOnDate(e.target.value)}
                placeholder="Select date"
                className="w-34 rounded border border-gray-300 bg-white px-3 py-1 pr-9 text-sm text-gray-700 placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <CalendarDays className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500" size={16} />
            </div>

            <div className="relative">
              <input
                type="text"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                placeholder="Select date"
                className="w-34 rounded border border-gray-300 bg-white px-3 py-1 pr-9 text-sm text-gray-700 placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <CalendarDays className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>

          <select
            value={notesFilter}
            onChange={(e) => setNotesFilter(e.target.value)}
            className="w-24 rounded border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>All Notes Title</option>
            <option>With Notes</option>
            <option>Without Notes</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-20 rounded border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Filter By Status</option>
            <option>Checked In</option>
            <option>Checked Out</option>
            <option>Unconfirmed</option>
          </select>

          <div className="flex gap-2 rounded-sm border-2 border-gray-400 px-2 py-1.5">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="rounded border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>Filter By</option>
              <option>Room</option>
              <option>Room Type</option>
              <option>Block</option>
            </select>

            <input
              type="text"
              placeholder="e.g. A204"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-24 rounded border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-24 rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Sort By</option>
            <option>Guest Name</option>
            <option>Check In Date</option>
            <option>Amount</option>
            <option>Room Number</option>
          </select>

          <button className="rounded bg-yellow-400 px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-yellow-500">
            Search
          </button>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
            <input
              type="checkbox"
              checked={showExcludeComp}
              onChange={(e) => setShowExcludeComp(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <span>excl. comp.</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
            <input
              type="checkbox"
              checked={show3rdPartyResID}
              onChange={(e) => setShow3rdPartyResID(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <span>3rd Party ResID</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
            <input
              type="checkbox"
              checked={showDayUseOnly}
              onChange={(e) => setShowDayUseOnly(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <span>Show Day Use Only</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
            <input
              type="checkbox"
              checked={showSummary}
              onChange={(e) => setShowSummary(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <span>Show Summary</span>
          </label>

          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="rounded border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>All</option>
            <option>Group</option>
            <option>Single</option>
          </select>
        </div>
      </div>
    </div>
  );
}
