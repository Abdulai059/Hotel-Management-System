

export default function BookingTable() {
    const bookings = [
        {
            id: '176',
            guest: { name: 'Jonas Anderson', email: 'anderson@example.com' },
            dates: { relative: '2 months ago', nights: 16, checkIn: 'Nov 16 2025', checkOut: 'Dec 02 2025' },
            status: 'CHECKED OUT',
            statusColor: 'bg-gray-100 text-gray-700',
            amount: '$5,200.00'
        },
        {
            id: '179',
            guest: { name: 'Mohammed Ali', email: 'mohammedali@yahoo.com' },
            dates: { relative: '2 months ago', nights: 5, checkIn: 'Nov 20 2025', checkOut: 'Nov 25 2025' },
            status: 'CHECKED OUT',
            statusColor: 'bg-gray-100 text-gray-700',
            amount: '$1,800.00'
        },
        {
            id: '189',
            guest: { name: 'Marie Dupont', email: 'marie@gmail.com' },
            dates: { relative: '2 months ago', nights: 7, checkIn: 'Nov 22 2025', checkOut: 'Nov 29 2025' },
            status: 'CHECKED OUT',
            statusColor: 'bg-gray-100 text-gray-700',
            amount: '$5,320.00'
        },
        {
            id: '186',
            guest: { name: 'John Doe', email: 'johndoe@gmail.com' },
            dates: { relative: '2 months ago', nights: 2, checkIn: 'Nov 24 2025', checkOut: 'Nov 26 2025' },
            status: 'CHECKED OUT',
            statusColor: 'bg-gray-100 text-gray-700',
            amount: '$820.00'
        },
        {
            id: '174',
            guest: { name: 'Jonatan Johansson', email: 'jonatan@example.com' },
            dates: { relative: '2 months ago', nights: 10, checkIn: 'Nov 25 2025', checkOut: 'Dec 05 2025' },
            status: 'CHECKED OUT',
            statusColor: 'bg-gray-100 text-gray-700',
            amount: '$2,800.00'
        },
        {
            id: '187',
            guest: { name: 'Fatima Ahmed', email: 'fatima@example.com' },
            dates: { relative: '2 months ago', nights: 3, checkIn: 'Nov 25 2025', checkOut: 'Nov 28 2025' },
            status: 'CHECKED OUT',
            statusColor: 'bg-gray-100 text-gray-700',
            amount: '$1,050.00'
        },
        {
            id: '181',
            guest: { name: 'Li Mei', email: 'li.mei@hotmail.com' },
            dates: { relative: '2 months ago', nights: 3, checkIn: 'Nov 28 2025', checkOut: 'Dec 01 2025' },
            status: 'CHECKED OUT',
            statusColor: 'bg-gray-100 text-gray-700',
            amount: '$1,080.00'
        },
        {
            id: '188',
            guest: { name: 'David Smith', email: 'david@gmail.com' },
            dates: { relative: '2 months ago', nights: 11, checkIn: 'Nov 28 2025', checkOut: 'Dec 09 2025' },
            status: 'UNCONFIRMED',
            statusColor: 'bg-blue-50 text-blue-700',
            amount: '$7,700.00'
        },
        {
            id: '182',
            guest: { name: 'Khadija Ahmed', email: 'khadija@gmail.com' },
            dates: { relative: '2 months ago', nights: 12, checkIn: 'Dec 01 2025', checkOut: 'Dec 13 2025' },
            status: 'CHECKED IN',
            statusColor: 'bg-green-50 text-green-700',
            amount: '$6,120.00'
        },
        {
            id: '190',
            guest: { name: 'Ramesh Patel', email: 'ramesh@gmail.com' },
            dates: { relative: '2 months ago', nights: 3, checkIn: 'Dec 01 2025', checkOut: 'Dec 04 2025' },
            status: 'CHECKED OUT',
            statusColor: 'bg-gray-100 text-gray-700',
            amount: '$2,370.00'
        }
    ];

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">BookingId</th>
                            <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Guest</th>
                            <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Dates</th>
                            <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {bookings.map((booking, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6">
                                    <span className="text-sm font-semibold text-gray-900">{booking.id}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">{booking.guest.name}</span>
                                        <span className="text-xs text-gray-500">{booking.guest.email}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-700">
                                            {booking.dates.relative} → {booking.dates.nights} night stay
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {booking.dates.checkIn} — {booking.dates.checkOut}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${booking.statusColor}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm font-medium text-gray-900">{booking.amount}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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