import { useEffect, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import MedicineForm from "./MedicineForm";

const C = {
  brand:      "#C8384F",
  text:       "#111827",
  textLight:  "#9CA3AF",
  border:     "#E5E7EB",
  surface:    "#FFFFFF",
  surfaceAlt: "#F7F8FA",
  overlay:    "rgba(17,24,39,0.45)",
};

/**
 * MedicineModal
 * Props:
 *   open          boolean  — controla visibilidad
 *   medicine      object|null — null = modo creación, objeto = modo edición
 *   onClose       () => void
 *   onCreated     () => Promise<void>
 *   onUpdated     () => Promise<void>
 */
export default function MedicineModal({ open, medicine, onClose, onCreated, onUpdated }) {
  const panelRef = useRef(null);

  /* Cerrar con Escape */
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* Bloquear scroll del body */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Cerrar al hacer clic en el overlay, no en el panel */
  function handleOverlayClick(e) {
    if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
  }

  const isEditing = !!medicine;

  return (
    <>
      {/* ── Overlay animado ── */}
      <div
        onClick={handleOverlayClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          background: C.overlay,
          backdropFilter: "blur(3px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          /* Animación de entrada/salida via CSS transition en opacity + pointer-events */
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 220ms ease",
        }}
      >
        {/* ── Panel ── */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={isEditing ? `Editar ${medicine.name}` : "Registrar medicamento"}
          style={{
            background: C.surface,
            borderRadius: "1.25rem",
            border: `1px solid ${C.border}`,
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
            width: "100%",
            maxWidth: 660,
            maxHeight: "90dvh",
            display: "flex",
            flexDirection: "column",
            transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
            transition: "transform 240ms cubic-bezier(0.34,1.56,0.64,1), opacity 220ms ease",
            opacity: open ? 1 : 0,
          }}
        >
          {/* ── Cabecera ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.125rem 1.5rem 1rem",
              borderBottom: `1px solid ${C.border}`,
              flexShrink: 0,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.brand,
                  marginBottom: 2,
                }}
              >
                {isEditing ? "Editando registro" : "Nuevo registro"}
              </p>
              <h2
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: C.text,
                  margin: 0,
                }}
              >
                {isEditing ? medicine.name : "Registrar medicamento"}
              </h2>
            </div>

            {/* Botón cerrar */}
            <button
              type="button"
              onClick={onClose}
              title="Cerrar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "0.65rem",
                border: "none",
                background: "transparent",
                color: C.textLight,
                cursor: "pointer",
                flexShrink: 0,
                transition: "background 150ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.surfaceAlt; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <IconX size={18} stroke={2} />
            </button>
          </div>

          {/* ── Cuerpo scrollable ── */}
          <div style={{ overflowY: "auto", flexGrow: 1 }}>
            <MedicineForm
              medicine={medicine}
              onCancel={onClose}
              onCreated={async () => { onClose(); await onCreated(); }}
              onUpdated={async () => { onClose(); await onUpdated(); }}
            />
          </div>
        </div>
      </div>
    </>
  );
}