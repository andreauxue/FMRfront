import { NavLink } from "react-router-dom";
import { IconHeartFilled, IconLogout, IconX } from "@tabler/icons-react";
import { C, R } from "../theme";
import { ADMIN_NAV } from "../theme";
import { NAV_ICONS } from "../utils/navIcons";
import { useAuth } from "../hooks/useAuth";

// Barra lateral. En escritorio es fija; en móvil se comporta como cajón (drawer)
// controlado por `open` / `onClose` desde AdminLayout.
export default function AdminSidebar({ open, onClose }) {
  const { logout } = useAuth();

  const content = (
    <div className="flex flex-col h-full" style={{ background: C.navy }}>
      {/* Marca */}
      <div className="flex items-center justify-between gap-2 px-5 h-16 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="inline-flex items-center justify-center shrink-0"
            style={{ width: 34, height: 34, borderRadius: R.md, background: C.brand, color: "#fff" }}
          >
            <IconHeartFilled size={18} />
          </span>
          <div className="min-w-0 leading-tight">
            <div className="text-sm font-bold text-white truncate">Mejoremos Realidades</div>
            <div className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.55)" }}>Panel administrativo</div>
          </div>
        </div>
        {/* Cerrar (solo móvil) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="lg:hidden p-1.5 rounded-md"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          <IconX size={20} stroke={2} />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto py-3 px-3" aria-label="Navegación administrativa">
        <ul className="flex flex-col gap-0.5">
          {ADMIN_NAV.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors"
                  style={({ isActive }) => ({
                    borderRadius: R.md,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.72)",
                    background: isActive ? C.brand : "transparent",
                  })}
                >
                  {Icon && <Icon size={19} stroke={1.75} className="shrink-0" />}
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Cerrar sesión */}
      <div className="p-3 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium transition-colors"
          style={{ borderRadius: R.md, color: "rgba(255,255,255,0.72)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <IconLogout size={19} stroke={1.75} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Escritorio: fija */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">{content}</aside>

      {/* Móvil: cajón + backdrop */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(26,34,53,0.5)" }}
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 shadow-xl">{content}</div>
        </div>
      )}
    </>
  );
}
