import { C, R, SHADOW } from "../theme";

// Tarjeta de métrica del panel. `accent` tiñe el icono; por defecto usa el azul
// institucional y se reserva el rojo de marca para lo que exige atención.
export default function StatCard({ icon: Icon, label, value, hint, accent = C.secondary, accentSoft = C.secondarySoft }) {
  return (
    <div
      className="flex items-start gap-4 p-5"
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: R.lg,
        boxShadow: SHADOW.card,
      }}
    >
      {Icon && (
        <span
          className="inline-flex items-center justify-center shrink-0"
          style={{ width: 44, height: 44, borderRadius: R.md, background: accentSoft, color: accent }}
        >
          <Icon size={22} stroke={1.75} />
        </span>
      )}
      <div className="min-w-0">
        <div className="text-2xl font-bold tabular-nums leading-none" style={{ color: C.text }}>
          {value}
        </div>
        <div className="text-sm font-medium mt-1.5" style={{ color: C.textMid }}>
          {label}
        </div>
        {hint && (
          <div className="text-xs mt-1" style={{ color: C.textLight }}>
            {hint}
          </div>
        )}
      </div>
    </div>
  );
}
