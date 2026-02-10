import { Filter } from "@/components/ui/Filter";
import { SortBy } from "@/components/ui/SortBy";
import { Download, RefreshCw } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function BookingFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to update search params
  const updateParam = (key, value) => {
    if (!value || value === "" || value === "all") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    searchParams.set("page", "1"); // Reset to page 1
    setSearchParams(searchParams);
  };

  // Helper to update multiple params at once
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

  // Get current values
  const searchTerm = searchParams.get("searchTerm") || "";
  const dateType = searchParams.get("dateType") || "createdOn";
  const createdOnDate = searchParams.get("createdOnDate") || "";
  const checkInDate = searchParams.get("checkInDate") || "";
  const status = searchParams.get("status") || "all";
  const filterBy = searchParams.get("filterBy") || "";
  const filterByValue = searchParams.get("filterByValue") || "";
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const groupBy = searchParams.get("groupBy") || "all";

  // Flags
  const excludeComp = searchParams.get("excludeComp") === "true";
  const thirdPartyResID = searchParams.get("thirdPartyResID") === "true";
  const dayUseOnly = searchParams.get("dayUseOnly") === "true";
  const summary = searchParams.get("summary") === "true";

  const handleSearch = () => {
    // Trigger a manual search (optional, filters update automatically)
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-2">
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

      {/* FILTER BAR */}
      <div className="bg-[#3c76a3] px-4 py-3">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {/* SEARCH */}
          <input
            placeholder="Name/Group/Res ID"
            value={searchTerm}
            onChange={(e) => updateParam("searchTerm", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-40 rounded border bg-white px-3 py-1 text-sm"
          />

          {/* DATE FILTER */}
          <div className="flex gap-2 rounded border-2 border-gray-400 px-2 py-1.5">
            {["createdOn", "checkIn"].map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm text-white">
                <input type="radio" checked={dateType === type} onChange={() => updateParam("dateType", type)} />
                <span>{type === "createdOn" ? "Created On" : "Check In"}</span>
              </label>
            ))}

            <input
              type="date"
              value={createdOnDate}
              onChange={(e) => updateParam("createdOnDate", e.target.value)}
              className="rounded border bg-white px-2 py-1 text-sm"
            />

            <input
              type="date"
              value={checkInDate}
              onChange={(e) => updateParam("checkInDate", e.target.value)}
              className="rounded border bg-white px-2 py-1 text-sm"
            />
          </div>

          {/* STATUS */}
          <Filter
            filterField="status"
            value={status}
            onChange={(value) => updateParam("status", value)}
            options={[
              { value: "all", label: "All" },
              { value: "checked-out", label: "Checked out" },
              { value: "checked-in", label: "Checked in" },
              { value: "unconfirmed", label: "Unconfirmed" },
            ]}
          />

          {/* FILTER BY */}
          <div className="flex gap-2 rounded border-2 border-gray-400 px-2 py-1.5">
            <select
              value={filterBy}
              onChange={(e) => {
                updateMultipleParams({
                  filterBy: e.target.value,
                  filterByValue: "", // Reset value when type changes
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
              className="w-24 rounded border bg-white px-2 py-1 text-sm disabled:bg-gray-100"
            />
          </div>

          {/* SORT */}
          <SortBy
            value={sortBy}
            onChange={(value) => updateParam("sortBy", value)}
            options={[
              { value: "startDate-desc", label: "Date (recent first)" },
              { value: "startDate-asc", label: "Date (earlier first)" },
              { value: "totalPrice-desc", label: "Amount (high first)" },
              { value: "totalPrice-asc", label: "Amount (low first)" },
            ]}
          />

          <button onClick={handleSearch} className="rounded bg-yellow-400 px-4 py-1 text-sm font-semibold">
            Search
          </button>
        </div>

        {/* FLAGS + GROUP */}
        <div className="flex flex-wrap items-center gap-4 text-white">
          {[
            ["excludeComp", "excl. comp.", excludeComp],
            ["thirdPartyResID", "3rd Party ResID", thirdPartyResID],
            ["dayUseOnly", "Show Day Use Only", dayUseOnly],
            ["summary", "Show Summary", summary],
          ].map(([key, label, checked]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => updateParam(key, e.target.checked ? "true" : "")}
              />
              <span>{label}</span>
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
