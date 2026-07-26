import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingState from "../components/LoadingState";

// Protege todo el árbol administrativo. Si no hay sesión, redirige a /admin/login
// conservando el destino original para volver después de iniciar sesión.
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingState mensaje="Verificando tu sesión…" fullscreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
