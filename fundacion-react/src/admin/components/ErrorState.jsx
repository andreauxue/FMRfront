import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import { C, R } from "../theme";

// Estado de error. El mensaje explica qué pasó y ofrece una acción para reintentar;
// no se disculpa ni es vago sobre la causa.
export default function ErrorState({
  titulo = "No fue posible cargar la información",
  mensaje = "Revisa tu conexión e inténtalo de nuevo.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-16 px-6">
      <span
        className="inline-flex items-center justify-center"
        style={{ width: 52, height: 52, borderRadius: R.pill, background: C.dangerSoft, color: C.danger }}
      >
        <IconAlertTriangle size={26} stroke={1.75} />
      </span>
      <div>
        <div className="font-bold text-base" style={{ color: C.text }}>{titulo}</div>
        <div className="text-sm mt-1 max-w-sm" style={{ color: C.textMid }}>{mensaje}</div>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 mt-1 transition-colors"
          style={{ background: C.secondary, color: "#fff", borderRadius: R.pill }}
        >
          <IconRefresh size={16} stroke={2} />
          Reintentar
        </button>
      )}
    </div>
  );
}
