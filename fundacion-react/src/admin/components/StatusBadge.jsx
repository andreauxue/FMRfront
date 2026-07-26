import {
  IconCircleCheck,
  IconAlertTriangle,
  IconCircleX,
  IconClock,
  IconPointFilled,
} from "@tabler/icons-react";
import { C, R } from "../theme";

// Mapa de estados → estilo + icono + etiqueta por defecto.
// El estado SIEMPRE se comunica con texto e icono, nunca solo con color
// (requisito de accesibilidad).
const MAP = {
  operativo:      { color: C.success, soft: C.successSoft, Icon: IconCircleCheck,   label: "Operativo" },
  publicado:      { color: C.success, soft: C.successSoft, Icon: IconCircleCheck,   label: "Publicado" },
  atendido:       { color: C.success, soft: C.successSoft, Icon: IconCircleCheck,   label: "Atendido" },
  activo:         { color: C.success, soft: C.successSoft, Icon: IconCircleCheck,   label: "Activo" },
  advertencia:    { color: C.warning, soft: C.warningSoft, Icon: IconAlertTriangle, label: "Con advertencias" },
  borrador:       { color: C.warning, soft: C.warningSoft, Icon: IconClock,         label: "Borrador" },
  nuevo:          { color: C.info,    soft: C.infoSoft,    Icon: IconPointFilled,   label: "Nuevo" },
  leido:          { color: C.textMid, soft: C.bg,          Icon: IconPointFilled,   label: "Leído" },
  archivado:      { color: C.textMid, soft: C.bg,          Icon: IconPointFilled,   label: "Archivado" },
  inactivo:       { color: C.textMid, soft: C.bg,          Icon: IconPointFilled,   label: "Inactivo" },
  "no-disponible":{ color: C.danger,  soft: C.dangerSoft,  Icon: IconCircleX,       label: "No disponible" },
};

export default function StatusBadge({ status, label, size = "md" }) {
  const cfg = MAP[status] || MAP.leido;
  const text = label || cfg.label;
  const iconSize = size === "sm" ? 14 : 16;

  return (
    <span
      className="inline-flex items-center gap-1.5 font-semibold whitespace-nowrap"
      style={{
        color: cfg.color,
        background: cfg.soft,
        borderRadius: R.pill,
        padding: size === "sm" ? "2px 8px" : "4px 12px",
        fontSize: size === "sm" ? "0.72rem" : "0.8rem",
      }}
    >
      <cfg.Icon size={iconSize} stroke={2} />
      {text}
    </span>
  );
}
