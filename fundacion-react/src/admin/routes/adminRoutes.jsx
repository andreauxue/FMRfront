// src/admin/routes/adminRoutes.jsx

import { Route } from "react-router-dom";

import AdminAuthRoot from "../auth/AdminAuthRoot";
import ProtectedAdminRoute from "../auth/ProtectedAdminRoute";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PlaceholderPage from "../pages/PlaceholderPage";
import SystemStatus from "../pages/SystemStatus";
import ContentPage from "../pages/ContentPage";
import AdminMedicamentos from "../pages/Medicamentos";

export const adminRoutes = (
  <Route
    path="/admin"
    element={<AdminAuthRoot />}
  >
    <Route
      path="login"
      element={<Login />}
    />

    <Route element={<ProtectedAdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />

        <Route
          path="medicamentos"
          element={<AdminMedicamentos />}
        />
        <Route
          path="sistema"
          element={<SystemStatus />}
        />
        
        <Route
          path="configuracion"
          element={
            <PlaceholderPage
              titulo="Configuración"
              descripcion="Ajustes generales del panel."
            />
          }
        />
      </Route>
    </Route>
  </Route>
);