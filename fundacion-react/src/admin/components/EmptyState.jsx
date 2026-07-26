import { IconInbox } from "@tabler/icons-react";
import { C, R } from "../theme";

// Una pantalla vacía es una invitación a actuar: describe qué falta y ofrece la
// acción principal cuando existe.
export default function EmptyState({
  icon: Icon = IconInbox,
  titulo = "Aún no hay nada aquí",
  mensaje,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-16 px-6">
      <span
        className="inline-flex items-center justify-center"
        style={{ width: 52, height: 52, borderRadius: R.pill, background: C.secondarySoft, color: C.secondary }}
      >
        <Icon size={26} stroke={1.75} />
      </span>
      <div>
        <div className="font-bold text-base" style={{ color: C.text }}>{titulo}</div>
        {mensaje && <div className="text-sm mt-1 max-w-sm" style={{ color: C.textMid }}>{mensaje}</div>}
      </div>
      {action}
    </div>
  );
}
