import { Outlet } from "react-router-dom";
import { useState } from "react";
import DashboardNav from "../features/FrontDesk/DashboardNav";
import Sidebar from "./Sidebar";
import { useScrollToTop } from "../ui/ ScrollToTop";

export default function FrontDeskLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainRef = useScrollToTop();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNav onMenuOpen={() => setIsMobileMenuOpen(true)} />
        <main ref={mainRef} className="flex-1 overflow-y-auto bg-gray-100 px-4 py-4 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
