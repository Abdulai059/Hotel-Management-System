import { Filter } from "@/components/ui/Filter";
import { SortBy } from "@/components/ui/SortBy";
import { Download, RefreshCw } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "checked-out", label: "Checked out" },
  { value: "checked-in", label: "Checked in" },
  { value: "unconfirmed", label: "Unconfirmed" },
];

const SORT_OPTIONS = [
  { value: "startDate-desc", label: "Date (recent first)" },
  { value: "startDate-asc", label: "Date (earlier first)" },
  { value: "totalPrice-desc", label: "Amount (high first)" },
  { value: "totalPrice-asc", label: "Amount (low first)" },
];

const DATE_TYPES = [
  { value: "createdOn", label: "Created On" },
  { value: "checkIn", label: "Check In" },
];

const FILTER_BY_OPTIONS = [
  { value: "room", label: "Room" },
  { value: "roomType", label: "Room Type" },
  { value: "block", label: "Block" },
];

export default function BookingFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = (key, fallback = "") => searchParams.get(key) ?? fallback;

  const searchTerm = get("searchTerm");
  const dateType = get("dateType", "createdOn");
  const createdOnDate = get("createdOnDate");
  const checkInDate = get("checkInDate");
  const status = get("status", "all");
  const filterBy = get("filterBy");
  const filterByValue = get("filterByValue");
  const sortBy = get("sortBy", "startDate-desc");

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    next.set("page", "1");
    setSearchParams(next);
  };

  const setParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
    });
    next.set("page", "1");
    setSearchParams(next);
  };

  const handleReset = () => setSearchParams({});

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
        <button className="rounded border-b-2 border-blue-700 bg-green-700 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
          FrontDesk
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="rounded bg-gray-700 p-1.5 text-white hover:bg-blue-700"
            title="Reset Filters"
          >
            <RefreshCw size={18} />
          </button>
          <button className="rounded bg-blue-700 p-1.5 text-white hover:bg-blue-800" title="Download">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="bg-chatgreen px-4 py-3 text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          <input
            placeholder="Name/Group/Res ID"
            value={searchTerm}
            onChange={(e) => setParam("searchTerm", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearchParams(searchParams)}
            className="w-full rounded border bg-white px-3 py-1 text-sm sm:w-40"
          />

          <div className="flex w-full flex-col gap-2 rounded px-2 py-1.5 sm:w-auto sm:flex-row">
            <div className="flex gap-2">
              {DATE_TYPES.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="radio" checked={dateType === value} onChange={() => setParam("dateType", value)} />
                  <span className="whitespace-nowrap">{label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="date"
                value={createdOnDate}
                onChange={(e) => setParam("createdOnDate", e.target.value)}
                className="w-full rounded bg-white px-2 py-1 text-sm sm:w-auto"
              />
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setParam("checkInDate", e.target.value)}
                className="w-full rounded bg-white px-2 py-1 text-sm sm:w-auto"
              />
            </div>
          </div>

          <Filter
            filterField="status"
            value={status}
            onChange={(value) => setParam("status", value)}
            options={STATUS_OPTIONS}
          />

          <div className="flex w-full flex-col gap-2 rounded px-2 py-1.5 sm:w-auto sm:flex-row">
            <select
              value={filterBy}
              onChange={(e) => setParams({ filterBy: e.target.value, filterByValue: "" })}
              className="rounded border bg-white px-2 py-1 text-sm"
            >
              <option value="">Filter By</option>
              {FILTER_BY_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <input
              placeholder="e.g. A204"
              value={filterByValue}
              onChange={(e) => setParam("filterByValue", e.target.value)}
              disabled={!filterBy}
              className="w-full rounded border bg-white px-2 py-1 text-sm disabled:bg-gray-100 sm:w-24"
            />
          </div>

          <SortBy value={sortBy} onChange={(value) => setParam("sortBy", value)} options={SORT_OPTIONS} />

          <button
            onClick={() => setSearchParams(searchParams)}
            className="w-full rounded bg-yellow-400 px-4 py-1 text-sm font-semibold sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
