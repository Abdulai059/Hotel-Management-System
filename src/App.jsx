import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AdminPanel } from "./pages/AdminPanel";
import { AuthProvider } from "./context/AuthContext";

import Unauthorized from "./components/ui/Unauthorized";
import Login from "./components/authentication/Login";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/ui/AppLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import FrontDeskLayout from "./components/FrontDesk/FrontDeskLayout";
import Guests from "./components/FrontDesk/Guests";
import Rooms from "./components/FrontDesk/Rooms";
import Billing from "./components/FrontDesk/Billing";
import Dashboard from "./components/FrontDesk/Dashboard";
import RestaurantDashboard from "./components/Restaurant/RestaurantDashboard";
import RestaurantLayout from "./components/Restaurant/RestaurantLayout";
import Bookings from "./components/FrontDesk/Bookings";
import CorporateBookings from "./components/features/FrontDesk/CorporateBookings";
import Payment from "./components/FrontDesk/Payment";
import Calendar from "./components/FrontDesk/Calendar";
import GuestProfile from "./components/FrontDesk/GuestProfile";
import RoomTypePage from "./components/FrontDesk/RoomTypePage";
import ShiftReportView from "./components/FrontDesk/ShiftReport";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Login />} />

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />} />

              <Route
                path="admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              <Route
                path="fd"
                element={
                  <ProtectedRoute allowedRoles={["admin", "frontdesk"]}>
                    <FrontDeskLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="reservations" element={<Guests />} />
                <Route path="reservation/:id" element={<GuestProfile />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="room-types" element={<RoomTypePage />} />
                <Route path="payment/:id" element={<Payment />} />

                <Route path="report" element={<ShiftReportView />} />

                <Route path="corporate" element={<CorporateBookings />} />
                <Route path="rooms" element={<Rooms />} />
                <Route path="room/:id" element={<GuestProfile />} />
                <Route path="billing" element={<Billing />} />
              </Route>

              <Route
                path="restaurant"
                element={
                  <ProtectedRoute allowedRoles={["admin", "restaurant"]}>
                    <RestaurantLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<RestaurantDashboard />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 300 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
