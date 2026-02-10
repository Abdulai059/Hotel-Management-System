import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSignOut } from "../authentication/useAuthQueries";

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

  // Update last visited page
  useEffect(() => {
    if (user) {
      setPreferences({
        ...preferences,
        lastVisitedPage: window.location.pathname,
      });
    }
  }, [window.location.pathname]);

  const getUserInitials = () => {
    if (profile?.email) {
      return profile.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-375 px-4 py-2 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex h-10 w-10 rotate-3 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl sm:h-12 sm:w-12">
              <span className="text-lg font-black sm:text-xl">LS</span>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900 sm:text-2xl">Global Dream</h1>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Hotel Operations Live</p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-4 md:flex">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                {getUserInitials()}
              </div>
              <button
                onClick={handleSignOut}
                disabled={signOutMutation.isPending}
                className="text-sm text-gray-600 underline hover:text-gray-800 disabled:opacity-50"
              >
                {signOutMutation.isPending ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="text-gray-600 hover:text-gray-800">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="border-t border-gray-200 pt-4 pb-3 md:hidden">
            <div className="mb-4 flex items-center gap-3 px-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                {getUserInitials()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{profile?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Hotel Operations Live</p>
            </div>
            <button
              onClick={handleSignOut}
              disabled={signOutMutation.isPending}
              className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              {signOutMutation.isPending ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
