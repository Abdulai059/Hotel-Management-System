import { Filter } from "@/components/ui/Filter";
import { SortBy } from "@/components/ui/SortBy";
import { Download, RefreshCw } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function BookingFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParam = (key, value) => {
    if (!value || value === "" || value === "all") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const updateMultipleParams = (updates) => {
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "" || value === "all") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const searchTerm = searchParams.get("searchTerm") || "";
  const dateType = searchParams.get("dateType") || "createdOn";
  const createdOnDate = searchParams.get("createdOnDate") || "";
  const checkInDate = searchParams.get("checkInDate") || "";
  const status = searchParams.get("status") || "all";
  const filterBy = searchParams.get("filterBy") || "";
  const filterByValue = searchParams.get("filterByValue") || "";
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const groupBy = searchParams.get("groupBy") || "all";

  const excludeComp = searchParams.get("excludeComp") === "true";
  const thirdPartyResID = searchParams.get("thirdPartyResID") === "true";
  const dayUseOnly = searchParams.get("dayUseOnly") === "true";
  const summary = searchParams.get("summary") === "true";

  const handleSearch = () => {
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "checked-out", label: "Checked out" },
    { value: "checked-in", label: "Checked in" },
    { value: "unconfirmed", label: "Unconfirmed" },
  ];

  const sortOptions = [
    { value: "startDate-desc", label: "Date (recent first)" },
    { value: "startDate-asc", label: "Date (earlier first)" },
    { value: "totalPrice-desc", label: "Amount (high first)" },
    { value: "totalPrice-asc", label: "Amount (low first)" },
  ];

  const checkboxFilters = [
    { key: "excludeComp", label: "excl. comp.", checked: excludeComp },
    { key: "thirdPartyResID", label: "3rd Party ResID", checked: thirdPartyResID },
    { key: "dayUseOnly", label: "Show Day Use Only", checked: dayUseOnly },
    { key: "summary", label: "Show Summary", checked: summary },
  ];

  return (
    <div className="w-full border-b border-gray-200 bg-white">
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

      <div className="bg-[#3c76a3] px-4 py-3">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <input
            placeholder="Name/Group/Res ID"
            value={searchTerm}
            onChange={(e) => updateParam("searchTerm", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full rounded border bg-white px-3 py-1 text-sm sm:w-40"
          />

          <div className="flex w-full flex-col gap-2 rounded border-2 border-gray-400 px-2 py-1.5 sm:w-auto sm:flex-row">
            <div className="flex gap-2">
              {["createdOn", "checkIn"].map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-white">
                  <input type="radio" checked={dateType === type} onChange={() => updateParam("dateType", type)} />
                  <span className="whitespace-nowrap">{type === "createdOn" ? "Created On" : "Check In"}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="date"
                value={createdOnDate}
                onChange={(e) => updateParam("createdOnDate", e.target.value)}
                className="w-full rounded border bg-white px-2 py-1 text-sm sm:w-auto"
              />

              <input
                type="date"
                value={checkInDate}
                onChange={(e) => updateParam("checkInDate", e.target.value)}
                className="w-full rounded border bg-white px-2 py-1 text-sm sm:w-auto"
              />
            </div>
          </div>

          <Filter
            filterField="status"
            value={status}
            onChange={(value) => updateParam("status", value)}
            options={statusOptions}
          />

          <div className="flex w-full flex-col gap-2 rounded border-2 border-gray-400 px-2 py-1.5 sm:w-auto sm:flex-row">
            <select
              value={filterBy}
              onChange={(e) => {
                updateMultipleParams({
                  filterBy: e.target.value,
                  filterByValue: "",
                });
              }}
              className="rounded border bg-white px-2 py-1 text-sm"
            >
              <option value="">Filter By</option>
              <option value="room">Room</option>
              <option value="roomType">Room Type</option>
              <option value="block">Block</option>
            </select>

            <input
              placeholder="e.g. A204"
              value={filterByValue}
              onChange={(e) => updateParam("filterByValue", e.target.value)}
              disabled={!filterBy}
              className="w-full rounded border bg-white px-2 py-1 text-sm disabled:bg-gray-100 sm:w-24"
            />
          </div>

          <SortBy value={sortBy} onChange={(value) => updateParam("sortBy", value)} options={sortOptions} />

          <button
            onClick={handleSearch}
            className="w-full rounded bg-yellow-400 px-4 py-1 text-sm font-semibold sm:w-auto"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-white">
          {checkboxFilters.map(({ key, label, checked }) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => updateParam(key, e.target.checked ? "true" : "")}
              />
              <span className="whitespace-nowrap">{label}</span>
            </label>
          ))}

          <select
            value={groupBy}
            onChange={(e) => updateParam("groupBy", e.target.value)}
            className="rounded border bg-white px-3 py-1 text-sm text-black"
          >
            <option value="all">All</option>
            <option value="group">Group</option>
            <option value="single">Single</option>
          </select>
        </div>
      </div>
    </div>
  );
}
