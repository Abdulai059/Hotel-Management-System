import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSignOut } from "../authentication/useAuthQueries";
import { Bell, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, profile, preferences, setPreferences } = useAuth();
  const navigate = useNavigate();
  const signOutMutation = useSignOut();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutMutation.mutateAsync();
      navigate("/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setPreferences({ ...preferences, lastVisitedPage: window.location.pathname });
    }
  }, [window.location.pathname]);

  const getUserInitials = () => {
    if (profile?.email) return profile.email.substring(0, 2).toUpperCase();
    return "U";
  };

  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gray-900 shadow-sm">
              <img src="/global-dreams.png" alt="logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-gray-900">Global Dream</h1>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9dc43b]" />
                <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Live</p>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="relative flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>

            <div className="h-5 w-px bg-gray-200" />

            <div className="flex items-center gap-2.5">
              <div className="bg-btn-green flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-gray-800">
                {getUserInitials()}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800">{profile?.email}</p>
                <p className="text-[10px] text-gray-400 capitalize">{profile?.role}</p>
              </div>
            </div>

            <div className="h-5 w-px bg-gray-200" />

            <button
              onClick={handleSignOut}
              disabled={signOutMutation.isPending}
              className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              <LogOut size={14} />
              {signOutMutation.isPending ? "Signing out..." : "Sign Out"}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button className="relative flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100"
            >
              {showMobileMenu ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="border-t border-gray-100 py-3 md:hidden">
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
              <div className="bg-btn-green flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-gray-800">
                {getUserInitials()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-800">{profile?.email}</p>
                <p className="text-xs text-gray-400 capitalize">{profile?.role}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9dc43b]" />
                <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Live</span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={signOutMutation.isPending}
              className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50"
            >
              <LogOut size={15} />
              {signOutMutation.isPending ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
