import { IconLoader2 } from "@tabler/icons-react";
import { C } from "../theme";

// Estado de carga. `fullscreen` lo centra en toda la ventana (útil al verificar sesión).
export default function LoadingState({ mensaje = "Cargando…", fullscreen = false }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${fullscreen ? "min-h-screen" : "py-16"}`}
      style={{ color: C.textMid }}
    >
      <IconLoader2 size={30} stroke={2} className="animate-spin" style={{ color: C.secondary }} />
      <span className="text-sm font-medium">{mensaje}</span>
    </div>
  );
}
