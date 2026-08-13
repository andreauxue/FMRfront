import { NavLink } from "react-router-dom";
import {
  IconLogout,
  IconX,
} from "@tabler/icons-react";

import { C, R, ADMIN_NAV } from "../theme";
import { NAV_ICONS } from "../utils/navIcons";
import { useAuth } from "../auth/AuthContext";

export default function AdminSidebar({ open, onClose }) {
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      window.location.assign("/admin/login");
    }
  }

  const content = (
    <div className="flex flex-col h-full" style={{ background: C.navy }}>

      {/* ── Marca con logo ── */}
      <div
        className="flex items-center justify-between gap-3 px-5 shrink-0"
        style={{
          height: 72,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Fundación Mejoremos Realidades"
            style={{
              height: 36,
              width: "auto",
              objectFit: "contain",
              flexShrink: 0,
              // Invierte el logo a blanco si es de color oscuro.
              // Quita este filtro si tu logo ya es blanco o claro.
              filter: "brightness(0) invert(1)",
            }}
          />

          {/* Texto */}
          <div className="min-w-0 leading-tight">
            <div className="text-sm font-bold text-white truncate">
              Mejoremos Realidades
            </div>
            <div
              className="text-[11px] truncate"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Panel administrativo
            </div>
          </div>
        </div>

        {/* Cerrar — solo móvil */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="lg:hidden p-1.5 rounded-lg transition-colors"
          style={{ color: "rgba(255,255,255,0.6)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <IconX size={20} stroke={2} />
        </button>
      </div>

      {/* ── Navegación ── */}
      <nav
        className="flex-1 overflow-y-auto py-3 px-3"
        aria-label="Navegación administrativa"
      >
        <ul className="flex flex-col gap-0.5">
          {ADMIN_NAV.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-150"
                  style={({ isActive }) => ({
                    borderRadius: R.md,
                    color:      isActive ? "#fff" : "rgba(255,255,255,0.68)",
                    background: isActive ? C.brand : "transparent",
                  })}
                  onMouseEnter={(e) => {
                    // Solo si no está activo
                    if (e.currentTarget.style.background === "transparent") {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (e.currentTarget.style.background === "rgba(255,255,255,0.06)") {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {Icon && (
                    <Icon size={19} stroke={1.75} className="shrink-0" />
                  )}
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Cerrar sesión ── */}
      <div
        className="p-3 shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150"
          style={{ color: "rgba(255,255,255,0.68)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.68)"; }}
        >
          <IconLogout size={19} stroke={1.75} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Escritorio — fija */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Móvil — cajón + backdrop */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(26,34,53,0.55)", backdropFilter: "blur(3px)" }}
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}