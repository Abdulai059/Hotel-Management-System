import { Pagination } from "@/components/ui/Pagination";
import TableHeader from "@/components/ui/TableHeader";
import { formatCurrency } from "@/utils/helpers";
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
  { label: "Room Rate", right: true },
  { label: "Amount Due", right: true },
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

const formatStatus = (status) =>
  status
    ?.replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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
  const isEvenRow = index % 2 === 0;
  const isCorporate = booking.corporate;

  const rowClass = isCorporate
    ? "bg-[#f2f2cd] hover:bg-[#f2f2cd]"
    : isEvenRow
      ? "bg-[#F2F2F2] hover:bg-gray-300"
      : "bg-white hover:bg-gray-50";

  const handleClick = () => {
    if (onRowClick) onRowClick(booking);
  };

  const room = booking.rooms;
  const numNights = Number(booking.num_nights) || 0;
  const roomRate = Number(room?.room_types?.base_price) || 0;
  const totalAmount = numNights * roomRate;

  return (
    <>
      <tr
        className={`hidden cursor-pointer border-b border-gray-200 transition lg:table-row ${rowClass} ${isCorporate ? "[&>td]:py-3" : ""}`}
        onClick={handleClick}
      >
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
        <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{room?.room_types?.name}</td>
        <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{room?.room_number || ""}</td>
        <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{room?.room_name || ""}</td>
        <td className="border-r border-gray-200 px-3 py-1.5">
          <ServiceFlags flags={booking.flags} />
        </td>
        <td className="border-r border-gray-200 px-3 py-1.5">
          <StatusBadge status={booking.status} />
        </td>
        <td className="border-r border-gray-200 px-3 py-1.5 text-right text-sm text-gray-700">
          {formatCurrency(roomRate)}
        </td>
        <td className="border-r border-gray-200 px-3 py-1.5 text-right text-sm text-gray-900">
          {formatCurrency(totalAmount)}
        </td>
        <td className="no-print px-3 py-1.5">
          <ActionButtons />
        </td>
      </tr>

      <tr className="lg:hidden">
        <td colSpan="100%" className="p-0">
          <div className={`cursor-pointer border-b border-gray-200 p-4 transition ${rowClass}`} onClick={handleClick}>
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500">#{index + 1}</span>
                    {booking.corporate?.group_code && (
                      <span className="text-sm font-bold text-gray-900">{booking.corporate.group_code}</span>
                    )}
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-gray-900">{booking.guest?.full_name || "N/A"}</h3>
                  <p className="mt-0.5 text-xs text-gray-600">ID: {booking.resId}</p>
                </div>
              </div>
              <StatusBadge status={booking.status} />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Stay Duration</span>
                <span className="text-gray-900">
                  {booking.start_date && booking.end_date ? `${booking.start_date} - ${booking.end_date}` : "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Room</span>
                <span className="text-gray-900">
                  {room?.room_types?.name} - {room?.room_number || "N/A"}
                </span>
              </div>

              {room?.room_name && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Block</span>
                  <span className="text-gray-900">{room.room_name}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Room Rate</span>
                <span className="text-gray-900">{formatCurrency(roomRate)}</span>
              </div>

              <div className="flex justify-between border-t pt-2">
                <span className="font-medium text-gray-900">Total Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            {booking.flags && (
              <div className="mt-3">
                <ServiceFlags flags={booking.flags} />
              </div>
            )}

            <div className="mt-3 flex justify-end border-t pt-3">
              <ActionButtons />
            </div>
          </div>
        </td>
      </tr>
    </>
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
  console.log(bookings);

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

      <div className="lg:hidden">
        <table className="w-full">
          <tbody>
            {bookings.map((booking, index) => (
              <TableRow
                key={booking.id || index}
                booking={booking}
                index={index}
                onRowClick={(booking) => navigate(`${booking.id}`)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}
