import { BrowserRouter, Routes, Route, Navigate } from "react-router";

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

export default function App() {
  return (
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
  );
}
