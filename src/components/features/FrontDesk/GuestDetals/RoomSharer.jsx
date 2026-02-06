import { useState } from "react";
import { User, Users, Baby, Home, Edit } from "lucide-react";

export default function RoomSharers() {
  const [sharers] = useState([
    {
      id: "P14",
      name: "Shawn Monett",
      checkInDate: "02",
      checkInMonth: "Feb",
      nights: "4 Nt",
      checkOutDate: "06",
      checkOutMonth: "Feb",
      isPrimary: true,
    },
    {
      id: "P15",
      name: "Arthur Sinatra",
      checkInDate: "02",
      checkInMonth: "Feb",
      nights: "4 Nt",
      checkOutDate: "06",
      checkOutMonth: "Feb",
      isPrimary: false,
    },
  ]);

  const adultCount = 2;
  const childCount = 0;
  const infantCount = 0;

  const actions = ["Preferences", "Messages", "Tasks", "Notes"];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Room Sharers</h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User size={20} className="text-blue-600" />
              <span className="font-semibold">{adultCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              <span className="font-semibold">{childCount}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 text-left">
                <th className="px-2 py-2 font-semibold">ID</th>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {sharers.map((sharer, index) => (
                <tr
                  key={sharer.id}
                  className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-yellow-50" : "bg-white"}`}
                >
                  <td className="px-2 py-4">
                    <span className="rounded-full border-2 border-gray-500 px-3 py-1 font-medium">{sharer.id}</span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <User size={18} className="text-blue-600" />
                      <span className="font-medium">{sharer.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <div className="min-w-[50px] rounded-md border-2 border-green-600 px-2 py-1 text-center">
                        <div className="font-bold">{sharer.checkInDate}</div>
                        <div className="text-xs text-green-700">{sharer.checkInMonth}</div>
                      </div>

                      <span className="font-medium text-gray-600">{sharer.nights}</span>

                      <div className="min-w-[50px] rounded-md border-2 border-green-600 px-2 py-1 text-center">
                        <div className="font-bold">{sharer.checkOutDate}</div>
                        <div className="text-xs text-green-700">{sharer.checkOutMonth}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <Home size={22} className="inline-block text-gray-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <Baby size={16} />
          <span>{infantCount} Infant(s)</span>
        </div>
      </div>

      <div className="divide-y rounded-lg border-2 border-gray-300 bg-white">
        <div className="flex items-center justify-between border-gray-500 p-4">
          <span className="text-gray-600">Confirmation</span>
          <button className="font-medium text-blue-600 hover:text-blue-700">Send Confirmation Email</button>
        </div>

        {actions.map((label) => (
          <div
            key={label}
            className="flex cursor-pointer items-center justify-between border-gray-300 p-2 hover:bg-gray-50"
          >
            <span className="text-gray-600">{label}</span>
            <Edit size={18} className="text-gray-500" />
          </div>
        ))}

        <div className="flex items-center justify-between p-4">
          <span className="text-gray-600">Guest Preferences</span>
          <button className="font-medium text-blue-600 hover:text-blue-700">View</button>
        </div>
      </div>
    </div>
  );
}
