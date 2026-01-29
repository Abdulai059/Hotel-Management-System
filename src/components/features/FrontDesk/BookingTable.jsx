const STATUS_STYLES = {
    'CHECKED OUT': 'bg-gray-100 text-gray-700',
    'CHECKED IN': 'bg-green-50 text-green-700',
    UNCONFIRMED: 'bg-blue-50 text-blue-700'
};

const bookings = [
    {
        id: '176',
        guest: { name: 'Jonas Anderson', email: 'anderson@example.com' },
        roomNumber: 'A204',
        bookingType: 'Walk-in',
        dates: {
            relative: '2 months ago',
            nights: 16,
            checkIn: 'Nov 16 2025',
            checkOut: 'Dec 02 2025'
        },
        status: 'CHECKED OUT',
        amount: '$5,200.00',
        flags: {
            restaurant: true,
            laundry: false
        }
    },
    {
        id: '188',
        guest: { name: 'David Smith', email: 'david@gmail.com' },
        roomNumber: 'B312',
        bookingType: 'Online',
        dates: {
            relative: '2 months ago',
            nights: 11,
            checkIn: 'Nov 28 2025',
            checkOut: 'Dec 09 2025'
        },
        status: 'UNCONFIRMED',
        amount: '$7,700.00',
        flags: {
            restaurant: false,
            laundry: true
        }
    },
    {
        id: '189',
        guest: { name: 'Emily Clark', email: 'emily@gmail.com' },
        roomNumber: 'A210',
        bookingType: 'Walk-in',
        dates: {
            relative: '1 month ago',
            nights: 5,
            checkIn: 'Dec 01 2025',
            checkOut: 'Dec 06 2025'
        },
        status: 'CHECKED IN',
        amount: '$3,400.00',
        flags: {
            restaurant: false,
            laundry: false
        }
    }
];

const Flag = ({ show, label, color }) =>
    show ? (
        <span className={`px-3 py-0.5 rounded-full text-xs font-medium ${color}`}>
            {label}
        </span>
    ) : null;

export default function BookingTable() {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Guest</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Room</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Dates</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                            <th className="px-6 py-4 uppercase text-left text-xs font-semibold text-gray-600">services Flags</th>
                            <th className="px-6 py-4 uppercasetext-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{booking.id}</td>

                                <td className="px-6 py-4">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{booking.guest.name}</div>
                                        <div className="text-xs text-gray-500">{booking.guest.email}</div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-700">{booking.roomNumber}</td>

                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">
                                        {booking.dates.relative} · {booking.dates.nights} nights
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {booking.dates.checkIn} — {booking.dates.checkOut}
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium text-gray-700">{booking.bookingType}</span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {booking.flags.restaurant && <Flag show label="Restaurant" color="bg-green-100 text-green-700" />}
                                        {booking.flags.laundry && <Flag show label="Laundry" color="bg-blue-100 text-blue-700" />}
                                        {!booking.flags.restaurant && !booking.flags.laundry && <Flag show label="No Service" color="bg-red-50 text-red-600" />}
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase ${STATUS_STYLES[booking.status]}`}>
                                        {booking.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.amount}</td>

                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
