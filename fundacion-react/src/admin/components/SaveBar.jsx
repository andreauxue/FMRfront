import { IconDeviceFloppy, IconLoader2, IconCircleCheck } from "@tabler/icons-react";
import { C, R, SHADOW } from "../theme";

// Barra fija inferior que aparece cuando hay cambios sin guardar.
// `status`: idle | dirty | saving | saved | error
export default function SaveBar({ status = "idle", onSave, onDiscard }) {
  if (status === "idle") return null;

  const config = {
    dirty:  { texto: "Cambios sin guardar",              color: C.warning },
    saving: { texto: "Guardando…",                       color: C.textMid },
    saved:  { texto: "Cambios guardados correctamente",  color: C.success },
    error:  { texto: "No fue posible guardar los cambios", color: C.danger },
  }[status];

  const saving = status === "saving";

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-5 py-3 w-[min(640px,calc(100%-2rem))]"
      role="status"
      aria-live="polite"
      style={{ background: C.surface, borderRadius: R.pill, boxShadow: SHADOW.raised, border: `1px solid ${C.border}` }}
    >
      <span className="flex items-center gap-2 text-sm font-semibold flex-1 min-w-0" style={{ color: config.color }}>
        {saving && <IconLoader2 size={16} stroke={2} className="animate-spin" />}
        {status === "saved" && <IconCircleCheck size={16} stroke={2} />}
        <span className="truncate">{config.texto}</span>
      </span>

      {(status === "dirty" || status === "error") && onDiscard && (
        <button
          type="button"
          onClick={onDiscard}
          className="text-sm font-semibold px-4 py-2 transition-colors shrink-0"
          style={{ color: C.textMid, borderRadius: R.pill }}
        >
          Descartar
        </button>
      )}

      {status !== "saved" && (
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 transition-all shrink-0 disabled:opacity-60"
          style={{ background: C.brand, color: "#fff", borderRadius: R.pill }}
        >
          <IconDeviceFloppy size={16} stroke={2} />
          Guardar cambios
        </button>
      )}
    </div>
  );
}
