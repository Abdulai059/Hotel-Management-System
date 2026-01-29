import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Login from "./components/authentication/Login";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/ui/AppLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute";

import FrontDeskLayout from "./components/FrontDesk/FrontDeskLayout";
import Guests from "./components/FrontDesk/ Guests";
import Bookings from "./components/FrontDesk/ Bookings";
import Rooms from "./components/FrontDesk/ Rooms";
import Billing from "./components/FrontDesk/Billing";
import Dashboard from "./components/FrontDesk/Dashboard";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* dashboard home */}
          <Route index element={<HomePage />} />

          {/* modules */}
          <Route path="frontdesk" element={<FrontDeskLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="guests" element={<Guests />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="billing" element={<Billing />} />
          </Route>

        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
