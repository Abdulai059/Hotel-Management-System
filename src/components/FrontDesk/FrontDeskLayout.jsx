import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  BedDouble,
  Receipt,
  Building2,
  Menu,
  Clock,
  UserCog,
  Youtube,
  Palette,
  Sparkles,
  X,
  ClipboardCheck,
  ChevronsLeft,
  Calendar,
} from "lucide-react";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import DashboardNav from "../features/FrontDesk/DashboardNav";
import { useScrollToTop } from "../ui/ ScrollToTop";
import Sidebar from "./Sidebar";

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
