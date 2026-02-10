import { User, Users, Baby, Home, Edit } from "lucide-react";
import { format } from "date-fns";
import EmailSending from "../EmailSending";

export default function RoomSharers({ booking }) {
  if (!booking) return null;

  const adultCount = booking.num_guests || 1;
  const childCount = 0;
  const infantCount = 0;

  const actions = ["Preferences", "Messages", "Tasks", "Notes"];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Guest Information</h2>

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
                <th className="px-2 py-2 font-semibold">Room</th>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300 bg-yellow-50">
                <td className="px-2 py-4">
                  <span className="rounded-full border-2 border-gray-500 px-3 py-1 font-medium">
                    R{booking.rooms?.room_number}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-blue-600" />
                    <span className="font-medium">{booking.guests?.full_name}</span>
                  </div>
                </td>

                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="min-w-[50px] rounded-md border-2 border-green-600 px-2 py-1 text-center">
                      <div className="font-bold">{format(new Date(booking.start_date), "dd")}</div>
                      <div className="text-xs text-green-700">{format(new Date(booking.start_date), "MMM")}</div>
                    </div>

                    <span className="font-medium text-gray-600">{booking.num_nights} Nt</span>

                    <div className="min-w-[50px] rounded-md border-2 border-green-600 px-2 py-1 text-center">
                      <div className="font-bold">{format(new Date(booking.end_date), "dd")}</div>
                      <div className="text-xs text-green-700">{format(new Date(booking.end_date), "MMM")}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 text-center">
                  <Home size={22} className="inline-block text-gray-700" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <Baby size={16} />
          <span>{infantCount} Infant(s)</span>
        </div>
      </div>

      <EmailSending actions={actions} />
    </div>
  );
}
