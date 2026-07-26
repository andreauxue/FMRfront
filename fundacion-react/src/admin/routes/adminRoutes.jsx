import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PlaceholderPage from "../pages/PlaceholderPage";
import SystemStatus from "../pages/SystemStatus";
import ContentPage from "../pages/ContentPage";
// Subárbol de rutas del panel. Se importa en App.jsx y se coloca dentro de <Routes>
// junto a las rutas públicas, sin tocarlas.
//
// /admin/login queda FUERA de ProtectedRoute (debe ser accesible sin sesión).
// El resto cuelga de ProtectedRoute → AdminLayout, que aporta barra lateral y cabecera.
export const adminRoutes = (
  <>
    <Route path="/admin/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="contenido" element={<ContentPage />} />
        <Route path="proyectos"     element={<PlaceholderPage titulo="Proyectos" descripcion="Administra los proyectos de la Fundación." />} />
        <Route path="mensajes"      element={<PlaceholderPage titulo="Mensajes" descripcion="Bandeja de mensajes de contacto." />} />
        <Route path="respaldos"     element={<PlaceholderPage titulo="Respaldos" descripcion="Genera y consulta respaldos del sistema." />} />
        <Route path="sistema"       element={<SystemStatus />} />
        <Route path="configuracion" element={<PlaceholderPage titulo="Configuración" descripcion="Ajustes generales del panel." />} />
      </Route>
    </Route>
  </>
);