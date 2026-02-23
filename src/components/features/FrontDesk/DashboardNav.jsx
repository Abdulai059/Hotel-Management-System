import { Search, Settings, Bell } from "lucide-react";

export default function DashboardNav() {
  return (
    <div className="flex h-14 items-center justify-between border-b border-gray-100 bg-white px-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={14} />
        <input
          type="text"
          placeholder="Search room, guest, book, etc"
          className="w-72 rounded-xl bg-gray-50 py-2 pr-4 pl-9 text-xs text-gray-600 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-gray-200"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <img
            src="https://i.pravatar.cc/32?img=12"
            alt="Jaylon Dorwart"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-xs font-semibold text-gray-800">Jaylon Dorwart</p>
            <p className="text-[10px] text-gray-400">Admin</p>
          </div>
        </div>

        <div className="mx-1 h-6 w-px bg-gray-200" />

        <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
          <Settings size={16} strokeWidth={1.8} />
        </button>

        <button className="relative rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
          <Bell size={16} strokeWidth={1.8} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-400" />
        </button>
      </div>
    </div>
  );
}
