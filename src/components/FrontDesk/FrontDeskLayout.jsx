import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  BedDouble,
  Receipt,
  Building2,
  Menu,
  Clock,
  UserCog,
  Youtube,
  Palette,
  Sparkles,
  ClipboardCheck,
  ChevronsLeft,
} from "lucide-react";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useState } from "react";
const links = [
  {
    group: "Overview",
    color: "text-slate-500",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard/frontdesk",
        icon: LayoutDashboard,
      },
      {
        label: "Guest Lookup",
        path: "/dashboard/frontdesk/guests",
        icon: Users,
      },
    ],
  },

  {
    group: "Operations",
    color: "text-emerald-600",
    items: [
      {
        label: "Bookings",
        path: "/dashboard/frontdesk/bookings",
        icon: CalendarCheck,
      },
      {
        label: "Room Operations",
        path: "/dashboard/frontdesk/rooms",
        icon: BedDouble,
      },
      {
        label: "Corporate Bookings",
        path: "/dashboard/frontdesk/corporate-bookings",
        icon: Building2,
      },
      {
        label: "Housekeeping Audit",
        path: "",
        icon: ClipboardCheck,
      },
    ],
  },

  {
    group: "Finance",
    color: "text-blue-600",
    items: [
      {
        label: "Billing & Invoices",
        path: "/dashboard/frontdesk/billing",
        icon: Receipt,
      },
    ],
  },

  {
    group: "Resources",
    color: "text-rose-600",
    items: [
      {
        label: "Help Videos",
        path: "/dashboard/frontdesk/help-videos",
        icon: Youtube,
      },
      {
        label: "Room Legends",
        path: "/dashboard/frontdesk/room-legends",
        icon: Palette,
        hasDropdown: true,
      },
      {
        label: "Housekeeping Legends",
        path: "/dashboard/frontdesk/housekeeping-legends",
        icon: Sparkles,
        hasDropdown: true,
      },
      {
        label: "House Status",
        path: "/dashboard/frontdesk/house-status",
        icon: Clock,
      },
      {
        label: "User Accounts",
        path: "/dashboard/frontdesk/accounts",
        icon: UserCog,
      },
    ],
  },
];

export default function FrontDeskLayout() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${isExpanded ? "w-64" : "w-16"}`}
      >
        <div className="flex items-center gap-4 bg-amber-100 p-2 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 rotate-3 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl">
            <img src="/global-dreams.png" alt="global dream logo" />
          </div>

          {isExpanded && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-black tracking-tight text-slate-900">GLOBAL DREAM HOTEL</h1>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <p className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase">Frontdesk Live</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-0 flex items-center justify-center bg-[#444444] p-2 font-bold text-gray-100 transition-colors"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <div className="flex w-full">
              <ChevronsLeft strokeWidth={2.5} size={28} className="ml-auto" />
            </div>
          ) : (
            <Menu strokeWidth={2.5} size={22} />
          )}
        </button>

        <nav className="mt-6 flex flex-1 flex-col gap-6 overflow-y-auto px-2 pb-12">
          {links.map(({ group, color, items }, index) => (
            <div key={group}>
              {isExpanded && (
                <div className="mb-2 flex items-center gap-2 px-4">
                  <span className={`h-2 w-2 rounded-full ${color.replace("text-", "bg-")}`} />
                  <p className={`text-xs font-semibold tracking-wider uppercase ${color}`}>{group}</p>
                </div>
              )}

              <div className="flex flex-col gap-1">
                {items.map(({ label, path, icon: Icon, badge, hasDropdown }) => (
                  <NavLink
                    key={label}
                    to={path}
                    className={({ isActive }) =>
                      `relative flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-600 before:absolute before:top-1/2 before:left-0 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-r before:bg-amber-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      } ${!isExpanded ? "justify-center" : ""}`
                    }
                    title={!isExpanded ? label : ""}
                  >
                    <Icon size={18} className="shrink-0" />
                    {isExpanded && (
                      <>
                        <span className="flex-1">{label}</span>
                        {badge && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                            {badge}
                          </span>
                        )}
                        {hasDropdown && (
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              {isExpanded && index !== links.length - 1 && group && (
                <div className="my-4 border-t border-dashed border-gray-300" />
              )}
            </div>
          ))}
        </nav>

        <button
          onClick={() => navigate("/dashboard")}
          className={`mx-auto mb-6 rounded-md bg-emerald-500 px-3 py-3 text-white transition-colors hover:bg-emerald-600 ${isExpanded ? "w-50" : ""}`}
        >
          <div className="flex items-center justify-center gap-2">
            <HiArrowLeftEndOnRectangle size={20} className="shrink-0" />
            {isExpanded && <span className="text-sm">Back to Dashboard</span>}
          </div>
        </button>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-gray-800">
              Welcome to <span className="text-red-600">Frontdesk</span>
            </span>
            <span className="animate-wave inline-block origin-bottom text-2xl">👋</span>
          </div>

          <button className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:shadow-sm">
            Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-100 px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
