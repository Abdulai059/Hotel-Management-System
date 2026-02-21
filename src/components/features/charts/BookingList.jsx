import { useState, useRef, useEffect } from "react";

const STATUSES = ["All Status", "Checked-In", "Reserved", "Checked-Out", "Cancelled"];

const COLUMNS = [
  { label: "Booking ID", key: "resId" },
  { label: "Guest Name", key: "guest" },
  { label: "Room Type", key: "roomType" },
  { label: "Room Number", key: "roomNumber" },
  { label: "Duration", key: "duration" },
  { label: "Check-In & Check-Out", key: "checkIn" },
  { label: "Status", key: "status" },
];

const ROOM_TYPE_STYLES = {
  Deluxe: { dot: "bg-yellow-400", badge: "bg-yellow-50 text-yellow-700" },
  Standard: { dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700" },
  Suite: { dot: "bg-violet-400", badge: "bg-violet-50 text-violet-700" },
};

const STATUS_STYLES = {
  "Checked-In": "bg-lime-50 text-lime-700 border border-lime-300",
  Reserved: "bg-blue-50 text-blue-700 border border-blue-200",
  "Checked-Out": "bg-gray-100 text-gray-500 border border-gray-200",
  Cancelled: "bg-red-50 text-red-600 border border-red-200",
};

function RoomTypeBadge({ type }) {
  const styles = ROOM_TYPE_STYLES[type] ?? ROOM_TYPE_STYLES.Standard;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${styles.badge}`}>
      <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
      {type ?? "N/A"}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-lg px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? ""}`}>
      {status}
    </span>
  );
}

function SortIcon({ active, asc }) {
  return (
    <span className={`ml-1 text-xs transition-opacity ${active ? "opacity-100" : "opacity-30"}`}>
      {active ? (asc ? "↑" : "↓") : "⇅"}
    </span>
  );
}

function StatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-sm bg-[#e6f58e] px-4 py-2 text-sm font-semibold text-[#3a4a00] transition-colors hover:bg-[#e6f58e]"
      >
        {value}
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-sm border border-gray-100 bg-white shadow-lg">
          {STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => {
                onChange(status);
                setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-lime-50 ${value === status ? "font-semibold text-lime-700" : "text-gray-700"}`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BookingList({ bookings = [], count }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sort, setSort] = useState({ key: "", asc: true });

  const handleSort = (key) => {
    setSort((prev) => ({ key, asc: prev.key === key ? !prev.asc : true }));
  };

  const filtered = bookings
    .filter((booking) => statusFilter === "All Status" || booking.status === statusFilter)
    .filter((booking) => {
      const query = search.toLowerCase();
      if (!query) return true;
      return (
        booking.resId?.toLowerCase().includes(query) ||
        booking.guest?.full_name?.toLowerCase().includes(query) ||
        booking.status?.toLowerCase().includes(query) ||
        booking.rooms?.room_types?.name?.toLowerCase().includes(query)
      );
    })
    .sort((bookingA, bookingB) => {
      if (!sort.key) return 0;
      const valA = String(bookingA[sort.key] ?? "");
      const valB = String(bookingB[sort.key] ?? "");
      return sort.asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    })
    .slice(0, 10);

  return (
    <div className="px-4">
      <div className="w-full max-w-7xl rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Booking List {count != null && <span className="text-sm text-gray-400">({count})</span>}
          </h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg
                className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search guest, status, etc"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 rounded-sm border border-gray-200 bg-gray-50 py-2 pr-4 pl-9 text-sm transition-colors placeholder:text-gray-400 focus:border-lime-400 focus:bg-white focus:outline-none"
              />
            </div>
            <StatusDropdown value={statusFilter} onChange={setStatusFilter} />
          </div>
        </div>

        <div className="custom-scroll h-70 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-gray-100">
                {COLUMNS.map(({ label, key }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="cursor-pointer px-3 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-400 transition-colors select-none hover:text-gray-600"
                  >
                    {label}
                    <SortIcon active={sort.key === key} asc={sort.asc} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-50 transition-colors last:border-0 hover:bg-lime-50/40"
                  >
                    <td className="px-3 py-4 text-sm font-medium text-gray-500">{booking.resId}</td>
                    <td className="px-3 py-4 text-sm font-medium text-gray-800">{booking.guest?.full_name || "—"}</td>
                    <td className="px-3 py-4">
                      <RoomTypeBadge type={booking.rooms?.room_types?.name} />
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-700">{booking.rooms?.room_number || "—"}</td>
                    <td className="px-3 py-4 text-sm text-gray-600">
                      {booking.num_nights ? `${booking.num_nights} nights` : "—"}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                      {booking.start_date} <span className="mx-1 text-gray-300">—</span> {booking.end_date}
                    </td>
                    <td className="px-3 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
