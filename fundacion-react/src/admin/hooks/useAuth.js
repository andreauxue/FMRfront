// ─────────────────────────────────────────────────────────────────────────────
// Autenticación (PROVISIONAL).
//
// Esto NO es una solución final. Es un punto único donde conectar la sesión real
// del backend (cookie httpOnly emitida por Express, verificada en el servidor).
//
// Reemplazo previsto:
//   - `isAuthenticated` debe reflejar una verificación real contra el servidor
//     (por ejemplo GET /api/auth/me), no un valor guardado en el frontend.
//   - NO usar localStorage como única medida de seguridad ni almacenar el token
//     ahí; la fuente de verdad vive en el backend.
//
// Mientras se desarrolla la interfaz, DEV_BYPASS permite ver el panel sin sesión.
// Ponlo en false para ejercitar el flujo de redirección a /admin/login.
// ─────────────────────────────────────────────────────────────────────────────

const DEV_BYPASS = true;

export function useAuth() {
  // TODO(backend): sustituir por el estado real de sesión.
  const isAuthenticated = DEV_BYPASS;
  const user = isAuthenticated
    ? { nombre: "Andrea Amaya", rol: "Administrador", correo: "admin@mejoremosrealidades.org" }
    : null;

  return {
    isAuthenticated,
    isLoading: false,
    user,
    logout: async () => {
      // TODO(backend): POST /api/auth/logout y limpiar la sesión del servidor.
      window.location.assign("/admin/login");
    },
  };
}
