import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "./AuthContext";

export default function ProtectedAdminRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("PROTECTED STATE:", {
    user,
    loading,
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}