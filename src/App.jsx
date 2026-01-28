import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Login from "./components/authentication/Login";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/ui/AppLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<HomePage />} />
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
