import { useState, useEffect } from "react";

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("frontdeskPopupSeen");

      if (!hasSeen) {
        setVisible(true);
        localStorage.setItem("frontdeskPopupSeen", "true");

        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="animate-slide-in fixed right-6 bottom-6 z-50 w-80 rounded-lg bg-white p-4 text-gray-800 shadow-lg dark:bg-gray-800 dark:text-gray-100">
      <div className="flex items-start justify-between">
        <h4 className="text-xl font-semibold">
          Welcome! <span className="animate-wave inline-block text-4xl">👋</span>
        </h4>
        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
      <p className="mt-2 text-sm">Welcome to the Front Desk Admin Panel! Let’s get started.</p>
    </div>
  );
}
