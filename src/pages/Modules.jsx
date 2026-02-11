import Navbar from "@/components/ui/Navbar";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Shield } from "lucide-react";
import { useNavigate } from "react-router";

export default function Modules() {
  const navigate = useNavigate();
  const { profile, user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const modules = [
    {
      title: "Admin Panel",
      description: "Manage system-wide settings, users, and permissions.",
      color: "gray",
      path: "/dashboard/admin",
      roles: ["admin"],
    },
    {
      title: "Front Desk Module",
      description: "Handles all front desk operations including guest management and room assignments.",
      color: "green",
      path: "/dashboard/frontdesk",
      roles: ["admin", "frontdesk"],
    },
    {
      title: "Restaurant Module",
      description: "Manages restaurant orders, menus, and dining services for guests.",
      color: "red",
      path: "/dashboard/restaurant",
      roles: ["admin", "restaurant"],
    },
    {
      title: "Purchase Module",
      description: "Tracks hotel purchases, supplier orders, and inventory management.",
      color: "yellow",
      path: "/dashboard/purchase",
      roles: ["admin"],
    },
  ];

  const colorStyles = {
    gray: {
      bg: "bg-gray-100",
      border: "border-gray-500",
      title: "text-gray-700",
      text: "text-gray-800",
    },
    green: {
      bg: "bg-green-100",
      border: "border-green-500",
      title: "text-green-700",
      text: "text-green-800",
    },
    red: {
      bg: "bg-red-100",
      border: "border-red-500",
      title: "text-red-700",
      text: "text-red-800",
    },
    yellow: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      title: "text-yellow-700",
      text: "text-yellow-800",
    },
  };

  return (
    <>
      <Navbar />

      <div className="mx-auto mt-20 max-w-375 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-20">
          <div className="rounded-sm p-8 shadow-md">
            <div className="mb-6 flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start">
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-blue-700 shadow-lg shadow-blue-500/30">
                  <img src={user?.avatar || "/avator.webp"} alt={user?.name} className="h-full w-full object-cover" />
                </div>
                <div className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-900 bg-gradient-to-br from-blue-500 to-indigo-500">
                  <Shield size={16} className="text-white" />
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center gap-4 lg:items-start">
                <div className="text-center lg:text-left">
                  <p className="text-sm font-medium text-gray-900">{getGreeting()},</p>
                  <h1 className="text-4xl font-bold text-gray-900">{user?.name}!</h1>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/20 px-4 py-1.5">
                    <Shield size={14} className="text-indigo-500" />
                    <span className="text-sm font-semibold text-indigo-500">{profile?.role || "No Role"}</span>
                  </div>
                </div>

                <div className="mt-4 flex w-full items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 shadow-md">
                    <img src="/global-dreams.png" alt="logo" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-0.5 text-xs font-medium text-gray-500">Currently Managing</p>
                    <h3 className="text-base font-bold text-gray-900">Global Dream Hotel</h3>
                  </div>
                </div>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>Downtown, New York</span>
                </div>
              </div>

              {/* Today's Date */}
              <div className="hidden flex-col text-right lg:flex">
                <p className="mb-1 text-sm text-gray-900">Today's Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="rounded-sm bg-green-100 p-4">
              <p className="text-center text-sm text-green-900">
                Welcome to your dashboard! You have access to the following modules:
              </p>
            </div>
          </div>

          {/* Modules */}
          <div className="flex flex-wrap gap-6">
            {modules
              .filter((m) => m.roles.includes(profile?.role))
              .map((module) => {
                const style = colorStyles[module.color] || colorStyles.green;
                return (
                  <div
                    key={module.title}
                    onClick={() => navigate(module.path)}
                    className={`min-w-63 flex-1 cursor-pointer ${style.bg} border-l-4 ${style.border} rounded-lg p-6 shadow transition-transform hover:scale-105`}
                  >
                    <h2 className={`mb-2 text-2xl font-bold ${style.title}`}>{module.title}</h2>
                    <p className={`${style.text}`}>{module.description}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
