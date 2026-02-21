import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  BedDouble,
  Building2,
  ClipboardCheck,
  Receipt,
  Youtube,
  Calendar,
  Palette,
  Sparkles,
  Clock,
  UserCog,
  ChevronDown,
  ChevronsLeft,
  Menu,
} from "lucide-react";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useSidebarState } from "@/hooks/useSidebarState";

const links = [
  {
    group: "Overview",
    color: "text-slate-500",
    items: [
      { label: "Dashboard", path: "/dashboard/frontdesk", icon: LayoutDashboard },
      { label: "Guest Lookup", path: "/dashboard/frontdesk/guests", icon: Users },
    ],
  },
  {
    group: "Operations",
    color: "text-emerald-600",
    items: [
      { label: "Bookings", path: "/dashboard/frontdesk/bookings", icon: CalendarCheck },
      { label: "Room Operations", path: "/dashboard/frontdesk/rooms", icon: BedDouble },
      { label: "Corporate Bookings", path: "/dashboard/frontdesk/corporate-bookings", icon: Building2 },
      { label: "Housekeeping Audit", path: "/dashboard/frontdesk/housekeeping-audit", icon: ClipboardCheck },
    ],
  },
  {
    group: "Finance",
    color: "text-blue-600",
    items: [{ label: "Billing & Invoices", path: "/dashboard/frontdesk/billing", icon: Receipt }],
  },
  {
    group: "Resources",
    color: "text-rose-600",
    items: [
      { label: "Help Videos", path: "/dashboard/frontdesk/help-videos", icon: Youtube },
      { label: "Calendar", path: "/dashboard/frontdesk/calendar", icon: Calendar },
      { label: "Room Legends", path: "/dashboard/frontdesk/room-legends", icon: Palette, hasDropdown: true },
      {
        label: "Housekeeping Legends",
        path: "/dashboard/frontdesk/housekeeping-legends",
        icon: Sparkles,
        hasDropdown: true,
      },
      { label: "House Status", path: "/dashboard/frontdesk/house-status", icon: Clock },
      { label: "User Accounts", path: "/dashboard/frontdesk/accounts", icon: UserCog },
    ],
  },
];

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useSidebarState("sidebarExpanded", true);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-100 bg-white transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } ${isExpanded ? "w-56" : "w-16"}`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-2 border-b border-gray-100 px-3 py-4 ${isExpanded ? "justify-start" : "justify-center"}`}
      >
        <div className="grid shrink-0 grid-cols-2 gap-0.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-[#9dc43b]" />
          <div className="h-2.5 w-2.5 rounded-sm bg-[#c8e06b]" />
          <div className="h-2.5 w-2.5 rounded-sm bg-[#c8e06b]" />
          <div className="h-2.5 w-2.5 rounded-sm bg-[#e7f68f]" />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}
        >
          <span className="text-base font-bold tracking-tight whitespace-nowrap text-gray-900">Global DH</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="ml-auto shrink-0 text-gray-400 hover:text-gray-600 lg:hidden"
        >
          ✕
        </button>
      </div>

      {/* Collapse toggle (desktop) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="hidden items-center justify-center bg-gray-50 py-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 lg:flex"
      >
        {isExpanded ? (
          <div className="flex w-full pr-3">
            <ChevronsLeft size={18} strokeWidth={2} className="ml-auto" />
          </div>
        ) : (
          <Menu size={18} strokeWidth={2} />
        )}
      </button>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-2 py-4">
        {links.map(({ group, color, items }, groupIdx) => (
          <div key={group}>
            {isExpanded && (
              <div className="mb-1.5 flex items-center gap-2 px-2">
                <span className={`h-1.5 w-1.5 rounded-full ${color.replace("text-", "bg-")}`} />
                <p className={`text-[10px] font-semibold tracking-wider uppercase ${color}`}>{group}</p>
              </div>
            )}

            <div className="flex flex-col gap-0.5">
              {items.map(({ label, path, icon: Icon, hasDropdown }) => (
                <NavLink
                  key={label}
                  to={path}
                  end={path === "/dashboard/frontdesk"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  title={!isExpanded ? label : ""}
                  className={({ isActive }) =>
                    `group flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition-all duration-150 ${
                      isActive
                        ? "bg-[#e7f68f] font-semibold text-gray-900"
                        : "font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    } ${!isExpanded ? "justify-center" : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={17}
                        strokeWidth={1.8}
                        className={`shrink-0 ${isActive ? "text-gray-800" : "text-gray-400 group-hover:text-gray-600"}`}
                      />
                      {isExpanded && (
                        <>
                          <span className="flex-1 whitespace-nowrap">{label}</span>
                          {hasDropdown && (
                            <ChevronDown size={13} className={isActive ? "text-gray-600" : "text-gray-300"} />
                          )}
                        </>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {groupIdx < links.length - 1 && isExpanded && (
              <div className="mt-4 border-t border-dashed border-gray-200" />
            )}
          </div>
        ))}
      </nav>

      {/* Promo card */}
      {isExpanded && (
        <div className="m-3 overflow-hidden rounded-2xl bg-[#f0fbe8] p-4">
          <div className="mb-3 flex h-14 items-end justify-center gap-1">
            <div className="h-8 w-4 rounded-t-sm bg-[#c8e06b]" />
            <div className="h-12 w-5 rounded-t-sm bg-gray-800" />
            <div className="relative h-10 w-4 rounded-t-sm bg-[#9dc43b]">
              <div className="absolute -top-1 right-0 left-0 h-1.5 rounded-t-sm bg-red-400" />
            </div>
          </div>
          <h4 className="text-sm leading-snug font-bold text-gray-900">Elevate Hospitality Standards</h4>
          <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
            Enhanced Reporting, Faster Check-Ins, & Integrated Marketing Tools
          </p>
          <button className="mt-3 w-full rounded-xl bg-[#e7f68f] py-2 text-xs font-bold text-gray-800 transition-colors hover:bg-[#d4e87a]">
            Update Now
          </button>
        </div>
      )}
    </aside>
  );
}
