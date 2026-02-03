import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/frontdesk") {
      const hasSeen = sessionStorage.getItem("frontdeskPopupSeen");

      if (!hasSeen) {
        setVisible(true);
        sessionStorage.setItem("frontdeskPopupSeen", "true");

        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="animate-slide-in fixed right-6 bottom-6 z-50 w-100 rounded-xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to Front Desk! <span className="animate-wave inline-block text-4xl">👋</span>
          </h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            We're glad you're here.{" "}
            <span className="font-semibold text-indigo-500">
              Manage guests, bookings, rooms, <span className="font-normal text-gray-600">and</span> billing{" "}
            </span>{" "}
            all in one place.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-4 font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Close popup"
        >
          ✕
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold text-red-500">Tips:</span>
        <span>Click around to explore your dashboard features!</span>
      </div>
    </div>
  );
}
