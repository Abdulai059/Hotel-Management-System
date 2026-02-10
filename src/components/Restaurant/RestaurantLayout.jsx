import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Coffee, Utensils, Table, FileText } from "lucide-react";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { NavLink, Outlet, useNavigate } from "react-router";

const links = [
  {
    label: "Dashboard",
    path: "/dashboard/restaurant",
    icon: LayoutDashboard,
    module: "restaurant",
  },
  {
    label: "Orders",
    path: "/dashboard/restaurant/orders",
    icon: Coffee,
    module: "restaurant",
  },
  {
    label: "Menu",
    path: "/dashboard/restaurant/menu",
    icon: Utensils,
    module: "restaurant",
  },
  {
    label: "Tables",
    path: "/dashboard/restaurant/tables",
    icon: Table,
    module: "restaurant",
  },
  {
    label: "Reports",
    path: "/dashboard/restaurant/reports",
    icon: FileText,
    module: "restaurant",
  },
];

export default function RestaurantLayout() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="flex w-16 flex-col border-r border-gray-200 bg-white md:w-64">
        <div className="flex h-20 items-center justify-center border-b border-gray-200">
          <span className="font-bold text-indigo-600">HMS</span>
        </div>

        <nav className="flex flex-col justify-center gap-2 px-2 pt-15">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition ${
                  isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              <span className="hidden md:block">{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => navigate("/dashboard")}
          className="mx-auto mt-auto mb-12 w-auto rounded-md bg-indigo-600 px-3 py-2 text-white transition-colors hover:bg-indigo-700 md:w-50"
        >
          <div className="flex items-center justify-center gap-2">
            <HiArrowLeftEndOnRectangle size={20} />
            <span className="hidden truncate text-sm md:inline md:text-base">Back to Dashboard</span>
          </div>
        </button>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-gray-800">
              Welcome to{" "}
              <span className="text-indigo-600">{profile?.role === "admin" ? "Admin" : "Restaurant Staff"}!</span>
            </span>

            <span className="animate-wave inline-block origin-bottom text-2xl">👋</span>
          </div>

          <button className="rounded-full border border-gray-300 px-4 py-1 text-sm text-gray-700 hover:bg-gray-100">
            Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
