import { useEffect, useRef } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { C, R, SHADOW } from "../theme";

// Ventana de confirmación explícita (usada antes de eliminar, por ejemplo).
// Cierra con Escape, enfoca el botón de cancelar al abrir y bloquea el scroll.
export default function ConfirmDialog({
  open,
  titulo = "¿Confirmar acción?",
  mensaje,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = false,
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onCancel?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onCancel]);

  if (!open) return null;

  const confirmColor = destructive ? C.danger : C.secondary;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,34,53,0.45)" }}
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-md p-6"
        style={{ background: C.surface, borderRadius: R.lg, boxShadow: SHADOW.raised }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          {destructive && (
            <span
              className="inline-flex items-center justify-center shrink-0"
              style={{ width: 44, height: 44, borderRadius: R.pill, background: C.dangerSoft, color: C.danger }}
            >
              <IconAlertTriangle size={22} stroke={1.75} />
            </span>
          )}
          <div className="min-w-0">
            <h2 id="confirm-title" className="font-bold text-lg" style={{ color: C.text }}>
              {titulo}
            </h2>
            {mensaje && <p className="text-sm mt-1.5" style={{ color: C.textMid }}>{mensaje}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="font-semibold text-sm px-5 py-2.5 transition-colors"
            style={{ background: C.bg, color: C.text, borderRadius: R.pill }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="font-semibold text-sm px-5 py-2.5 transition-colors"
            style={{ background: confirmColor, color: "#fff", borderRadius: R.pill }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
