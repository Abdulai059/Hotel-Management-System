import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import Tables from "./components/Restaurant/Tables";
import RestaurantReports from "./components/Restaurant/RestaurantReports";
import RestaurantLayout from "./components/Restaurant/RestaurantLayout";
import Menu from "./components/Restaurant/Menu";
import Orders from "./components/Restaurant/Orders";
import Bookings from "./components/FrontDesk/Bookings";
import CorporateBookings from "./components/features/FrontDesk/CorporateBookings";
import BookingDetails from "./components/FrontDesk/BookingDetails";
import Payment from "./components/FrontDesk/Payment";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

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
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />

            <Route path="frontdesk" element={<FrontDeskLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="guests" element={<Guests />} />

              {/* ✅ FIXED */}
              <Route path="guests/reservation/:id" element={<BookingDetails />} />

              <Route path="guests/payment" element={<Payment />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="corporate-bookings" element={<CorporateBookings />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="billing" element={<Billing />} />
            </Route>

            <Route path="restaurant" element={<RestaurantLayout />}>
              <Route index element={<RestaurantDashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="menu" element={<Menu />} />
              <Route path="tables" element={<Tables />} />
              <Route path="reports" element={<RestaurantReports />} />
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
          success: {
            duration: 300,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
