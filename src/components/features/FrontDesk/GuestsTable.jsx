import { Pagination } from "@/components/ui/Pagination";
import { Printer, Mail, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tableHeaders = [
  { label: "", type: "checkbox", center: true, noBorder: false },
  { label: "#", center: true },
  { label: "Group" },
  { label: "Res ID" },
  { label: "Guest Name" },
  { label: "Stay Duration" },
  { label: "Room Type" },
  { label: "Room#" },
  { label: "Block" },
  { label: "Service Flags" },
  { label: "Status" },
  { label: "Amount", right: true },
  { label: "Paid", right: true },
  // { label: "Balance", right: true },
  { label: "Actions", center: true, noPrint: true },
];

const STATUS_STYLES = {
  CHECKED_OUT: "bg-gray-100 text-gray-700",
  CHECKED_IN: "bg-green-50 text-green-700",
  RESERVED: "bg-blue-50 text-blue-700",
  CANCELLED: "bg-red-50 text-red-600",
};

const FLAG_COLORS = {
  restaurant: "bg-green-100 text-green-700",
  laundry: "bg-blue-100 text-blue-700",
  noService: "bg-red-50 text-red-600",
};

const Flag = ({ show, label, color }) =>
  show ? <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>{label}</span> : null;

const formatCurrency = (amount) => (amount !== undefined ? `GH₵ ${amount.toFixed(2)}` : "");

const formatStatus = (status) =>
  status
    ?.replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const TableHeader = ({ headers }) => (
  <thead>
    <tr className="border-b-2 border-gray-300 bg-gray-100">
      {headers.map((header, idx) => (
        <th
          key={idx}
          className={`${!header.noBorder ? "border-r border-gray-300" : ""} px-3 py-3 text-xs font-bold tracking-wide text-gray-700 uppercase ${
            header.center ? "text-center" : header.right ? "text-right" : "text-left"
          } ${header.noPrint ? "no-print" : ""}`}
        >
          {header.type === "checkbox" ? (
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
          ) : (
            header.label
          )}
        </th>
      ))}
    </tr>
  </thead>
);

const ServiceFlags = ({ flags }) => {
  if (!flags) return null;

  const hasService = flags.restaurant || flags.laundry;

  return (
    <div className="flex flex-wrap gap-1">
      {flags.restaurant && <Flag show label="Restaurant" color={FLAG_COLORS.restaurant} />}
      {flags.laundry && <Flag show label="Laundry" color={FLAG_COLORS.laundry} />}
      {!hasService && <Flag show label="No Service" color={FLAG_COLORS.noService} />}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  if (!status) return null;

  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES.CHECKED_OUT}`}
    >
      {formatStatus(status)}
    </span>
  );
};

const ActionButtons = () => (
  <div className="flex items-center justify-center gap-1.5">
    <button
      className="text-gray-500 transition hover:text-gray-700"
      title="Print"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Printer size={16} />
    </button>
    <button
      className="text-gray-500 transition hover:text-gray-700"
      title="Email"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Mail size={16} />
    </button>
    <button
      className="text-gray-500 transition hover:text-gray-700"
      title="More options"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <MoreVertical size={16} />
    </button>
  </div>
);

const TableRow = ({ booking, index, onRowClick }) => {
  const rowClass = booking.corporate ? "bg-amber-50 hover:bg-amber-100" : "bg-white hover:bg-gray-50";
  const handleClick = () => {
    if (onRowClick) onRowClick(booking);
  };

  const room = booking.rooms;

  return (
    <tr className={`cursor-pointer border-b border-gray-200 transition ${rowClass}`} onClick={handleClick}>
      <td className="border-r border-gray-200 px-2 py-1.5 text-center">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" onClick={(e) => e.stopPropagation()} />
      </td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-center text-sm font-semibold text-gray-900">
        {index + 1}
      </td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-sm font-bold text-gray-900">
        {booking.corporate?.group_code || ""}
      </td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{booking.resId}</td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-900">{booking.guest?.full_name || ""}</td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">
        {booking.start_date && booking.end_date ? `${booking.start_date} - ${booking.end_date}` : ""}
      </td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700 uppercase">{room?.room_types?.name}</td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{room?.room_number || ""}</td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{room?.room_name || ""}</td>
      <td className="border-r border-gray-200 px-3 py-1.5">
        <ServiceFlags flags={booking.flags} />
      </td>
      <td className="border-r border-gray-200 px-3 py-1.5">
        <StatusBadge status={booking.status} />
      </td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-right text-sm font-medium text-gray-900">
        {formatCurrency(room?.room_types?.base_price)}
      </td>
      <td className="border-r border-gray-200 px-3 py-1.5 text-right text-sm text-gray-700">
        {room?.room_types?.base_price ? formatCurrency(room?.room_types?.base_price) : ""}
      </td>
      {/* <td className="border-r border-gray-200 px-3 py-1.5 text-right text-sm font-medium text-gray-900">
        {formatCurrency(booking.payment?.balance)}
      </td> */}
      <td className="no-print px-3 py-1.5">
        <ActionButtons />
      </td>
    </tr>
  );
};

const EmptyState = ({ message }) => (
  <div className="flex items-center justify-center py-12">
    <p className="text-sm text-gray-600">{message}</p>
  </div>
);

const ErrorState = () => (
  <div className="flex items-center justify-center py-12">
    <p className="text-sm text-red-600">Error loading bookings</p>
  </div>
);

export default function GuestsTable({ bookings = [], isLoading, error }) {
  const navigate = useNavigate();

  if (isLoading) return <EmptyState message="Loading bookings..." />;
  if (error) return <ErrorState />;
  if (!bookings?.length) return <EmptyState message="No bookings found" />;

  return (
    <div className="w-full overflow-hidden bg-white shadow-sm">
      <div className="print-guests overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader headers={tableHeaders} />
          <tbody>
            {bookings.map((booking, index) => (
              <TableRow
                key={booking.id || index}
                booking={booking}
                index={index}
                onRowClick={(booking) => {
                  navigate(`${booking.id}`);
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}
