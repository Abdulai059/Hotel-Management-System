import { Printer, Mail, MoreVertical } from "lucide-react";
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
  { label: "Balance", right: true },
  { label: "Actions", center: true, noPrint: true },
];

const STATUS_STYLES = {
  "CHECKED OUT": "bg-gray-100 text-gray-700",
  "CHECKED IN": "bg-green-50 text-green-700",
  RESERVED: "bg-blue-50 text-blue-700",
};

const bookings = [
  {
    id: "1",
    group: "",
    resId: "020528",
    guest: { name: "Anastasia Hue", email: "anastasia@example.com" },
    roomNumber: "A204",
    roomType: "Superior Room",
    block: "Block A",
    bookingType: "Walk-in",
    dates: {
      relative: "2 months ago",
      nights: 3,
      checkIn: "05 Feb",
      checkOut: "08 Feb (3N)",
    },
    status: "CHECKED OUT",
    amount: "$1,290.00",
    paid: "$1,290.00",
    balance: "$0.00",
    flags: {
      restaurant: true,
      laundry: false,
    },
  },
  {
    id: "2",
    group: "",
    resId: "020529",
    guest: { name: "Alfred Josh", email: "alfred@gmail.com" },
    roomNumber: "B312",
    roomType: "Standard Room",
    block: "Block B",
    bookingType: "Online",
    dates: {
      relative: "2 months ago",
      nights: 5,
      checkIn: "05 Feb",
      checkOut: "10 Feb (5N)",
    },
    status: "RESERVED",
    amount: "$862.50",
    paid: "$862.50",
    balance: "$0.00",
    flags: {
      restaurant: false,
      laundry: true,
    },
  },
  {
    id: "3",
    group: "",
    resId: "020530",
    guest: { name: "Arthur Sinatra", email: "arthur@gmail.com" },
    roomNumber: "A210",
    roomType: "Deluxe Room",
    block: "Block A",
    bookingType: "Corporate",
    dates: {
      relative: "1 month ago",
      nights: 6,
      checkIn: "05 Feb",
      checkOut: "11 Feb (6N)",
    },
    status: "CHECKED IN",
    amount: "$1,380.00",
    paid: "$1,380.00",
    balance: "$0.00",
    flags: {
      restaurant: false,
      laundry: false,
    },
  },
  {
    id: "4",
    group: "G 02057",
    resId: "",
    guest: { name: "Jean Hoffman", email: "jean@company.com" },
    roomNumber: "",
    roomType: "",
    block: "",
    bookingType: "Corporate",
    dates: {
      relative: "1 month ago",
      nights: 5,
      checkIn: "05 Feb",
      checkOut: "10 Feb (5N)",
    },
    status: "RESERVED",
    amount: "",
    paid: "",
    balance: "",
    flags: {
      restaurant: false,
      laundry: false,
    },
    isGroupHeader: true,
  },
  {
    id: "4.1",
    group: "",
    resId: "020524",
    guest: { name: "Joe Rivers", email: "joe@company.com" },
    roomNumber: "C105",
    roomType: "Standard Room",
    block: "Block C",
    bookingType: "Corporate",
    dates: {
      relative: "1 month ago",
      nights: 5,
      checkIn: "05 Feb",
      checkOut: "10 Feb (5N)",
    },
    status: "RESERVED",
    amount: "$1,150.00",
    paid: "$0.00",
    balance: "$1,150.00",
    flags: {
      restaurant: true,
      laundry: false,
    },
    isSubItem: true,
  },
  {
    id: "5",
    group: "G 02058",
    resId: "",
    guest: { name: "Alfred Josh", email: "alfred@business.com" },
    roomNumber: "",
    roomType: "",
    block: "",
    bookingType: "Corporate",
    dates: {
      relative: "1 month ago",
      nights: 1,
      checkIn: "05 Feb",
      checkOut: "06 Feb (1N)",
    },
    status: "RESERVED",
    amount: "$230.00",
    paid: "$0.00",
    balance: "$230.00",
    flags: {
      restaurant: false,
      laundry: false,
    },
    isGroupHeader: true,
  },
  {
    id: "5.1",
    group: "",
    resId: "020525",
    guest: { name: "Alice Swift", email: "alice@business.com" },
    roomNumber: "A108",
    roomType: "Superior Room",
    block: "Block A",
    bookingType: "Corporate",
    dates: {
      relative: "1 month ago",
      nights: 1,
      checkIn: "05 Feb",
      checkOut: "06 Feb (1N)",
    },
    status: "RESERVED",
    amount: "$230.00",
    paid: "$0.00",
    balance: "$230.00",
    flags: {
      restaurant: false,
      laundry: true,
    },
    isSubItem: true,
  },
  {
    id: "5.2",
    group: "",
    resId: "020526",
    guest: { name: "Jean Hoffman", email: "jean@business.com" },
    roomNumber: "A109",
    roomType: "Superior Room",
    block: "Block A",
    bookingType: "Corporate",
    dates: {
      relative: "1 month ago",
      nights: 1,
      checkIn: "05 Feb",
      checkOut: "06 Feb (1N)",
    },
    status: "RESERVED",
    amount: "$287.50",
    paid: "$0.00",
    balance: "$287.50",
    flags: {
      restaurant: true,
      laundry: false,
    },
    isSubItem: true,
  },
  {
    id: "5.3",
    group: "",
    resId: "020527",
    guest: { name: "Joe Rivers", email: "joe@business.com" },
    roomNumber: "A110",
    roomType: "Superior Room",
    block: "Block A",
    bookingType: "Corporate",
    dates: {
      relative: "1 month ago",
      nights: 1,
      checkIn: "05 Feb",
      checkOut: "06 Feb (1N)",
    },
    status: "RESERVED",
    amount: "$287.50",
    paid: "$0.00",
    balance: "$287.50",
    flags: {
      restaurant: false,
      laundry: true,
    },
    isSubItem: true,
  },
];

const Flag = ({ show, label, color }) =>
  show ? <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>{label}</span> : null;

export default function GuestsTable() {
  return (
    <div className="w-full overflow-hidden bg-white shadow-sm">
      <div className="print-guests overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 bg-gray-100">
              {tableHeaders.map((header, idx) => (
                <th
                  key={idx}
                  className={`${
                    !header.noBorder ? "border-r border-gray-300" : ""
                  } px-3 py-3 text-xs font-bold tracking-wide text-gray-700 uppercase ${
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

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className={`border-b border-gray-200 transition ${
                  booking.isGroupHeader
                    ? "bg-amber-100 hover:bg-amber-200"
                    : booking.isSubItem
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-white hover:bg-gray-50"
                }`}
              >
                <td className="border-r border-gray-200 px-2 py-1.5 text-center">
                  {booking.isGroupHeader ? (
                    <input type="radio" name="group" className="h-4 w-4 border-gray-300" />
                  ) : (
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  )}
                </td>

                <td className="border-r border-gray-200 px-3 py-1.5 text-center text-sm font-semibold text-gray-900">
                  {booking.id}
                </td>

                <td className="border-r border-gray-200 px-3 py-1.5 text-sm font-bold text-gray-900">
                  {booking.group}
                </td>

                <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{booking.resId}</td>

                <td className="border-r border-gray-200 px-3 py-1.5">
                  <div className="text-sm font-normal text-gray-900">{booking.guest.name}</div>
                </td>

                <td className="border-r border-gray-200 px-3 py-1.5">
                  <div className="text-sm text-gray-700">
                    {booking.dates.checkIn} - {booking.dates.checkOut}
                  </div>
                </td>

                <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{booking.roomType}</td>

                <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{booking.roomNumber}</td>

                <td className="border-r border-gray-200 px-3 py-1.5 text-sm text-gray-700">{booking.block}</td>

                <td className="border-r border-gray-200 px-3 py-1.5">
                  {!booking.isGroupHeader && (
                    <div className="flex flex-wrap gap-1">
                      {booking.flags.restaurant && <Flag show label="Restaurant" color="bg-green-100 text-green-700" />}
                      {booking.flags.laundry && <Flag show label="Laundry" color="bg-blue-100 text-blue-700" />}
                      {!booking.flags.restaurant && !booking.flags.laundry && (
                        <Flag show label="No Service" color="bg-red-50 text-red-600" />
                      )}
                    </div>
                  )}
                </td>

                <td className="border-r border-gray-200 px-3 py-1.5">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[booking.status]}`}
                  >
                    {booking.status
                      .toLowerCase()
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                </td>

                <td className="border-r border-gray-200 px-3 py-1.5 text-right text-sm font-medium text-gray-900">
                  {booking.amount}
                </td>

                <td className="border-r border-gray-200 px-3 py-1.5 text-right text-sm text-gray-700">
                  {booking.paid}
                </td>

                <td className="border-r border-gray-200 px-3 py-1.5 text-right text-sm font-medium text-gray-900">
                  {booking.balance}
                </td>

                <td className="no-print px-3 py-1.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <button className="text-gray-500 transition hover:text-gray-700" title="Print">
                      <Printer size={16} />
                    </button>
                    <button className="text-gray-500 transition hover:text-gray-700" title="Email">
                      <Mail size={16} />
                    </button>
                    <button className="text-gray-500 transition hover:text-gray-700" title="More options">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-300 bg-gray-50 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Page</span>
          <select className="rounded border border-gray-300 px-2 py-1 text-sm">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <span className="text-sm text-gray-700">of 1</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">View</span>
          <select className="rounded border border-gray-300 px-2 py-1 text-sm">
            <option>50</option>
            <option>100</option>
            <option>200</option>
          </select>
          <span className="text-sm text-gray-700">records per page</span>
        </div>
      </div>
    </div>
  );
}
