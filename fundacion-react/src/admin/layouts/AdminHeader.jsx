import { IconMenu2, IconExternalLink } from "@tabler/icons-react";
import { C, R } from "../theme";
import { useAuth } from "../auth/AuthContext";

// Cabecera administrativa. Incluye el botón que abre la barra lateral en móvil,
// un enlace para ver el sitio público y el usuario en sesión.
export default function AdminHeader({ onMenuClick }) {
  const { user } = useAuth();
  const iniciales = (user?.nombre || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-3 h-16 px-4 sm:px-6"
      style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}
    >
      {/* Abrir menú (móvil) */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Abrir menú"
        className="lg:hidden p-2 -ml-1"
        style={{ color: C.text, borderRadius: R.md }}
      >
        <IconMenu2 size={22} stroke={2} />
      </button>

      <div className="flex-1" />

      {/* Ver sitio público */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 transition-colors"
        style={{ color: C.secondary, background: C.secondarySoft, borderRadius: R.pill }}
      >
        <IconExternalLink size={16} stroke={2} />
        Ver sitio
      </a>

      {/* Usuario */}
      <div className="flex items-center gap-2.5 pl-2">
        <div className="text-right hidden sm:block leading-tight">
          <div className="text-sm font-semibold" style={{ color: C.text }}>{user?.nombre}</div>
          <div className="text-xs" style={{ color: C.textLight }}>{user?.rol}</div>
        </div>
        <span
          className="inline-flex items-center justify-center text-xs font-bold shrink-0"
          style={{ width: 38, height: 38, borderRadius: R.pill, background: C.brandSoft, color: C.brand }}
          aria-hidden="true"
        >
          {iniciales}
        </span>
      </div>
    </header>
  );
}
