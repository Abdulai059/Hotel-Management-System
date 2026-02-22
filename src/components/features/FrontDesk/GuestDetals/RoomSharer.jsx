import { User, Users, Baby, Home } from "lucide-react";
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
      <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Guest Information</h2>
          <div className="flex items-center gap-3">
            <div className="bg-primary flex items-center gap-1.5 rounded-xl px-3 py-1.5">
              <User size={14} className="text-emerald-700" />
              <span className="text-xs font-semibold text-emerald-800">
                {adultCount} Adult{adultCount !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-1.5">
              <Users size={14} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-600">
                {childCount} Child{childCount !== 1 ? "ren" : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-2 pb-2 text-left text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Room
                </th>
                <th className="px-4 pb-2 text-left text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Name
                </th>
                <th className="px-4 pb-2 text-left text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Stay
                </th>
                <th className="px-4 pb-2 text-center text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="rounded-xl bg-[#f0fbe8]">
                <td className="px-2 py-4">
                  <span className="rounded-lg bg-[#e7f68f] px-3 py-1 text-xs font-bold text-gray-700">
                    R{booking.rooms?.room_number}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
                      <User size={13} className="text-emerald-700" />
                    </div>
                    <span className="font-medium text-gray-800">{booking.guests?.full_name}</span>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="min-w-[48px] rounded-xl border border-[#9dc43b] bg-white px-2 py-1.5 text-center">
                      <div className="text-sm font-bold text-gray-900">
                        {format(new Date(booking.start_date), "dd")}
                      </div>
                      <div className="text-[10px] font-semibold text-[#9dc43b]">
                        {format(new Date(booking.start_date), "MMM")}
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-500">{booking.num_nights}N</span>
                      <div className="mt-0.5 h-px w-8 bg-[#9dc43b]" />
                    </div>

                    <div className="min-w-[48px] rounded-xl border border-[#9dc43b] bg-white px-2 py-1.5 text-center">
                      <div className="text-sm font-bold text-gray-900">{format(new Date(booking.end_date), "dd")}</div>
                      <div className="text-[10px] font-semibold text-[#9dc43b]">
                        {format(new Date(booking.end_date), "MMM")}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 text-center">
                  <Home size={18} className="inline-block text-[#9dc43b]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-400">
          <Baby size={14} />
          <span>
            {infantCount} Infant{infantCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <EmailSending actions={actions} />
    </div>
  );
}
