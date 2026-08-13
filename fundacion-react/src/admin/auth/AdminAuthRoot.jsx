// src/admin/auth/AdminAuthRoot.jsx

import { Outlet } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

export default function AdminAuthRoot() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}