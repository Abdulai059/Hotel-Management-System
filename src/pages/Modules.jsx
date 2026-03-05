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
      path: "/app/admin",
      roles: ["admin"],
    },
    {
      title: "Front Desk Module",
      description: "Manages frontdesk operations including guest management and room assignments.",
      color: "green",
      path: "/app/fd",
      roles: ["admin", "frontdesk"],
    },
    {
      title: "Restaurant Module",
      description: "Manages restaurant orders, menus, and dining services for guests.",
      color: "red",
      path: "/app/restaurant",
      roles: ["admin", "restaurant"],
    },
    {
      title: "Purchase Module",
      description: "Tracks hotel purchases, supplier orders, and inventory management.",
      color: "yellow",
      path: "/app/purchase",
      roles: ["admin"],
    },
  ];

  const colorStyles = {
    gray: {
      bg: "bg-[#0D0C22]",
      border: "border-gray-500",
      title: "text-gray-100",
      text: "text-gray-800",
    },
    green: {
      bg: "bg-green-900",
      border: "border-green-500",
      title: "text-green-50",
      text: "text-green-800",
    },
    red: {
      bg: "bg-orange-900",
      border: "border-orange-500",
      title: "text-orange-50",
      text: "text-orange-800",
    },
    yellow: {
      bg: "bg-sky-900",
      border: "border-sky-500",
      title: "text-sky-50",
      text: "text-sky-800",
    },
  };

  return (
    <>
      <Navbar />

      <div className="mx-auto mt-20 max-w-375 px-4 sm:px-4 md:mt-40 lg:px-4">
        <div className="flex flex-col gap-20">
          <div className="rounded-sm bg-white p-5 shadow-sm">
            <div className="mb-5 flex w-full flex-col items-center gap-5 lg:flex-row lg:items-start">
              <div className="relative shrink-0">
                <div className="ring-btn-green h-20 w-20 overflow-hidden rounded-full ring-2 ring-offset-2">
                  <img src={user?.avatar || "/avator.webp"} alt={user?.name} className="h-full w-full object-cover" />
                </div>
                <div className="bg-btn-green absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full shadow-sm">
                  <Shield size={13} className="text-gray-700" />
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center gap-3 lg:items-start">
                <div className="text-center lg:text-left">
                  <p className="text-xs text-gray-400">{getGreeting()}</p>
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name}!</h1>
                  <span className="bg-primary mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700">
                    <Shield size={11} />
                    {profile?.role || "No Role"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                    <img src="/global-dreams.png" alt="logo" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Currently Managing</p>
                    <p className="text-sm font-bold text-gray-900">Global Dream Hotel</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin size={12} />
                  <span>Downtown, New York</span>
                </div>
              </div>

              <div className="hidden flex-col items-end lg:flex">
                <p className="text-[10px] text-gray-400">Today</p>
                <p className="text-sm font-semibold text-gray-800">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="rounded-xl px-4 py-3">
              <p className="text-center text-sm text-gray-700">
                Welcome to your <span className="font-bold">{profile?.role || "No Role"}</span> dashboard!{" "}
                <span className="animate-wave inline-block origin-bottom text-3xl">👋</span> You have access to the
                following modules:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            {modules
              .filter((m) => m.roles.includes(profile?.role))
              .map((module) => {
                const style = colorStyles[module.color] || colorStyles.green;
                return (
                  <div
                    key={module.title}
                    onClick={() => navigate(module.path)}
                    className={`w-full max-w-100 cursor-pointer rounded-sm shadow transition-transform hover:scale-105 sm:basis-[calc(50%-12px)] lg:basis-[calc(25%-18px)]`}
                  >
                    <h2
                      className={`mb-2 p-4 text-lg font-semibold uppercase ${style.bg} ${style.border} ${style.title}`}
                    >
                      {module.title}
                    </h2>
                    <p className={`px-4 py-2 ${style.text}`}>{module.description}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
