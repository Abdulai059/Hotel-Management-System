import { useState, useEffect } from "react";

export default function WelcomePopup() {
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
        <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-gray-800 dark:text-gray-100 animate-slide-in z-50">
            <div className="flex justify-between items-start">
                <h4 className="font-semibold  text-xl">Welcome!  <span className="inline-block animate-wave text-4xl">👋</span></h4>
                <button
                    onClick={() => setVisible(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    ✕
                </button>
            </div>
            <p className="text-sm mt-2">
                Welcome to the Front Desk Admin Panel! Let’s get started.
            </p>
        </div>
    );
}
