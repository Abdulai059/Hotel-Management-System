import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Coffee, Utensils, Table, FileText, ChevronsLeft, Menu, ShoppingCart } from "lucide-react";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useSidebarState } from "@/hooks/useSidebarState";
import { getTotalCartQuantity } from "./cart/cartSlice";
import { useSelector } from "react-redux";

const links = [
  { label: "Dashboard", path: "", icon: LayoutDashboard },
  { label: "Orders", path: "orders", icon: Coffee },
  { label: "Menu", path: "menu", icon: Utensils },
  { label: "Tables", path: "tables", icon: Table },
  { label: "Reports", path: "reports", icon: FileText },
];

function Logo({ isExpanded }) {
  return (
    <div
      className={`flex items-center gap-2 border-b border-gray-100 px-3 py-4 ${
        isExpanded ? "justify-start" : "justify-center"
      }`}
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
        <span className="text-base font-bold tracking-tight whitespace-nowrap text-gray-900">HMS</span>
      </div>
    </div>
  );
}

function CollapseToggle({ isExpanded, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center bg-gray-50 py-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
    >
      {isExpanded ? (
        <div className="flex w-full pr-3">
          <ChevronsLeft size={18} strokeWidth={2} className="ml-auto" />
        </div>
      ) : (
        <Menu size={18} strokeWidth={2} />
      )}
    </button>
  );
}

function PromoCard() {
  return (
    <div className="m-3 overflow-hidden rounded-2xl bg-[#f0fbe8] p-4">
      <div className="mb-3 flex h-14 items-end justify-center gap-1">
        <div className="h-8 w-4 rounded-t-sm bg-[#c8e06b]" />
        <div className="h-12 w-5 rounded-t-sm bg-gray-800" />
        <div className="relative h-10 w-4 rounded-t-sm bg-[#9dc43b]">
          <div className="absolute -top-1 right-0 left-0 h-1.5 rounded-t-sm bg-red-400" />
        </div>
      </div>
      <h4 className="text-sm leading-snug font-bold text-gray-900">Elevate hospitality standards</h4>
      <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
        Enhanced reporting, faster check-ins, & integrated marketing tools
      </p>
      <button className="mt-3 w-full rounded-xl bg-[#e7f68f] py-2 text-xs font-bold text-gray-800 hover:bg-[#d4e87a]">
        Update now
      </button>
    </div>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useSidebarState("restaurantSidebarExpanded", true);

  return (
    <aside
      className={`flex flex-col border-r border-gray-100 bg-white transition-all duration-300 ${
        isExpanded ? "w-56" : "w-16"
      }`}
    >
      <Logo isExpanded={isExpanded} />
      <CollapseToggle isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-4">
        {links.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={label}
            to={path}
            end={path === ""}
            title={!isExpanded ? label : ""}
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition-all ${
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
                {isExpanded && <span className="flex-1 whitespace-nowrap">{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className={`px-2 pb-3 ${!isExpanded ? "flex justify-center" : ""}`}>
        <button
          onClick={() => navigate("/dashboard")}
          title="Back to dashboard"
          className={`flex items-center gap-2 rounded-lg bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-800 ${
            isExpanded ? "w-full px-3" : "px-2"
          }`}
        >
          <HiArrowLeftEndOnRectangle size={17} className="shrink-0" />
          {isExpanded && <span className="truncate">Back to dashboard</span>}
        </button>
      </div>

      {isExpanded && <PromoCard />}
    </aside>
  );
}

function Header() {
  const { profile } = useAuth();
  const role = profile?.role === "admin" ? "Admin" : "Restaurant Staff";

  const totalQuantity = useSelector(getTotalCartQuantity);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-base font-semibold text-gray-800">
          Welcome to <span className="text-indigo-600">{role}!</span>
        </span>
        <span className="animate-wave inline-block origin-bottom text-2xl">👋</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex cursor-pointer items-center gap-2">
          <div className="relative">
            <ShoppingCart size={22} className="text-gray-700" />

            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {totalQuantity}
            </span>
          </div>
          <span className="ml-2 text-sm text-gray-600">Open cart</span>
        </button>

        <button className="rounded-full border border-gray-300 px-4 py-1 text-sm text-gray-700 hover:bg-gray-100">
          Logout
        </button>
      </div>
    </header>
  );
}

export default function RestaurantLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
