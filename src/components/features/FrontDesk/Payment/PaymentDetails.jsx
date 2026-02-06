import React, { useState } from "react";
import { Info, Trash2 } from "lucide-react";

export default function PaymentDetails() {
  const [selectedGuest, setSelectedGuest] = useState(true);

  const bookingData = {
    reservationId: "020515",
    checkIn: "Feb 02, 2026",
    checkOut: "Feb 06, 2026",
    guestName: "Shawn Monett",
    guestId: "P14",
    address: "",
    phone: "556655",
    email: "guestmail@hotelgix.co",
    createdOn: "Feb 05, 2026",
    roomType: "Superior Room(SUP-137)",
    checkInDate: "Feb 02, 2026",
    checkOutDate: "Feb 06, 2026",
    nights: 4,
    rooms: 2,
    adults: 2,
    rateType: "Seasonal Rate",
    amount: 800.0,
    tax: 120.0,
    totalWithTax: 920.0,
  };

  const folioData = {
    roomType: "Superior Room(SUP-137)",
    guests: [
      {
        id: "P1 33",
        name: "Shawn Monett (P14)",
        amount: 920.0,
        paid: 0.0,
        balance: 920.0,
      },
    ],
    totalAmount: 920.0,
    totalPaid: 0.0,
    totalBalance: 920.0,
  };

  return (
    <div>
      <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-4 text-white">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-medium">Check-in:</span>
            <span className="font-semibold text-yellow-300">{bookingData.checkIn}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Check-out:</span>
            <span className="font-semibold text-yellow-300">{bookingData.checkOut}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Info size={20} className="cursor-pointer hover:text-yellow-300" />
          <div className="flex items-center gap-2">
            <span className="font-medium">Res ID#</span>
            <span className="font-semibold text-yellow-300">{bookingData.reservationId}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-2">
        {/* Booking Details */}
        <div className="rounded-lg border border-gray-300 bg-white p-6">
          <h2 className="mb-6 text-lg font-bold text-blue-900 uppercase">Booking Details</h2>

          <div className="mb-6">
            <div className="mb-4 flex items-center gap-3">
              <h3 className="text-lg font-semibold text-blue-600">{bookingData.guestName}</h3>
              <span className="rounded-full border-2 border-gray-800 px-3 py-1 text-sm font-medium">
                {bookingData.guestId}
              </span>
            </div>

            <div className="space-y-2 rounded bg-gray-100 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Address:</span>
                  <p className="text-gray-800">{bookingData.address || "-"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-4">
                  <span className="inline-block text-sm text-gray-600">Phone:</span>
                  <p className="text-gray-800">{bookingData.phone}</p>
                </div>
                <div className="flex gap-4">
                  <span className="inline-block text-sm text-gray-600">Email:</span>
                  <p className="text-gray-800">{bookingData.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="mb-1 font-semibold text-gray-800">Created On</p>
              <p className="text-sm text-gray-600">{bookingData.createdOn}</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-gray-800">Stay Details</p>
              <p className="text-sm text-gray-600">{bookingData.roomType}</p>
              <p className="text-sm text-gray-600">
                {bookingData.checkInDate}-{bookingData.checkOutDate}({bookingData.nights} Nights)
              </p>
              <p className="cursor-pointer font-medium text-sky-600 hover:underline">{bookingData.rateType}</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-gray-800">Room(s)/Person(s)</p>
              <p className="text-gray-600">
                Room(s):{bookingData.rooms} ({bookingData.adults} Adults)
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-gray-800">Amount</p>
              <p className="font-semibold text-gray-800">$ {bookingData.amount.toFixed(2)}</p>
              <p className="text-xs text-gray-500 italic">
                ($ {bookingData.totalWithTax.toFixed(2)} with tax $ {bookingData.tax.toFixed(2)})
              </p>
            </div>
          </div>
        </div>

        {/* Folio List */}
        <div className="rounded-lg border border-gray-300 bg-white p-6">
          <h2 className="mb-6 text-lg font-bold text-blue-900 uppercase">Folio List</h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="px-2 py-3 text-left">
                    <input type="checkbox" className="h-4 w-4" />
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Guest</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-800">Amount($)</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-800">Paid</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-800">Balance</th>
                  <th className="px-2 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td colSpan="6" className="px-4 py-2 font-medium text-gray-700">
                    Room Type(Room): {folioData.roomType}
                  </td>
                </tr>
                {folioData.guests.map((guest, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-2 py-3">
                      <input
                        type="checkbox"
                        checked={selectedGuest}
                        onChange={(e) => setSelectedGuest(e.target.checked)}
                        className="h-4 w-4 text-blue-600"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-blue-600">{guest.id}</span>
                        <span className="text-gray-800">{guest.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-800">{guest.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-gray-800">-</td>
                    <td className="px-4 py-3 text-right text-gray-800">{guest.balance.toFixed(2)}</td>
                    <td className="px-2 py-3">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-100 font-semibold">
                  <td colSpan="2" className="px-4 py-3 text-gray-800">
                    Total
                  </td>
                  <td className="px-4 py-3 text-right text-gray-800">$ {folioData.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-gray-800">$ {folioData.totalPaid.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-gray-800">$ {folioData.totalBalance.toFixed(2)}</td>
                  <td className="px-2 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button className="rounded border border-gray-300 bg-amber-500 px-4 py-1 text-sm font-medium text-white">
              Email
            </button>

            <button className="rounded border border-gray-300 bg-rose-500 px-4 py-1 text-sm font-medium text-white">
              Lock
            </button>
            <button className="rounded border border-gray-300 bg-green-500 px-4 py-1 text-sm font-medium text-white">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
