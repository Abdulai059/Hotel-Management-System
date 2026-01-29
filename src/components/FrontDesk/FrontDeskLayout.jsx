import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    BedDouble,
    Receipt,
} from "lucide-react";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { NavLink, Outlet, useNavigate } from "react-router";
import Button from "../ui/Button";


const links = [
    {
        label: "Dashboard",
        path: "/dashboard/frontdesk",
        icon: LayoutDashboard,
    },
    {
        label: "Guests",
        path: "/dashboard/frontdesk/guests",
        icon: Users,
    },
    {
        label: "Bookings",
        path: "/dashboard/frontdesk/bookings",
        icon: CalendarCheck,
    },
    {
        label: "Rooms",
        path: "/dashboard/frontdesk/rooms",
        icon: BedDouble,
    },
    {
        label: "Billing",
        path: "/dashboard/frontdesk/billing",
        icon: Receipt,
    },
];

export default function FrontDeskLayout() {
    const navigate = useNavigate();


    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="h-20 flex items-center justify-center border-b border-gray-200">
                    <span className="font-bold text-indigo-600">HMS</span>
                </div>

                <nav className="flex flex-col pt-15 justify-center gap-2 px-2">
                    {links.map(({ label, path, icon: Icon }) => (
                        <NavLink
                            key={label}
                            to={path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
          ${isActive
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-600 hover:bg-gray-100"
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
                    className="mt-auto mb-12 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm"
                >
                    <div className="flex items-center gap-2 px-4 py-2">
                        <HiArrowLeftEndOnRectangle size={20} />
                        Back to Dashboard
                    </div>
                </button>


            </aside>


            <div className="flex flex-col flex-1">
                <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    <span className="font-semibold text-gray-700">
                        Welcome to Front Desk Admin Panel
                        <span className="inline-block animate-wave text-3xl pl-4">👋</span>
                    </span>

                    <button className="text-sm px-4 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">
                        Logout
                    </button>
                </header>



                <main className="flex-1 px-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
