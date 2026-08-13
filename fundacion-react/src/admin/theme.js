// ─────────────────────────────────────────────────────────────────────────────
// Tokens del panel administrativo.
// Reutiliza la paleta de marca del sitio público (C8384F / 3B5BA5) para que el
// administrador se sienta parte de la misma Fundación, no un panel genérico.
// El azul institucional gobierna el "chrome" (barra lateral, cabecera, navegación)
// y el rojo de marca queda reservado para acciones principales y el estado activo.
// ─────────────────────────────────────────────────────────────────────────────

export const C = {
  brand:         "#C8384F", // rojo de marca — acciones principales, indicador activo
  brandSoft:     "#FAE8EB",
  secondary:     "#3B5BA5", // azul institucional — chrome administrativo
  secondarySoft: "#EBF0FA",
  navy:          "#26355C", // azul profundo — fondo de la barra lateral
  navySoft:      "#33477A",

  bg:        "#F6F7F9", // fondo general del área de contenido
  surface:   "#FFFFFF",
  text:      "#1A2235",
  textMid:   "#4B5563",
  textLight: "#9CA3AF",
  border:    "#E5E7EB",

  // Estados semánticos (texto + icono, nunca solo color)
  success:     "#1E874B",
  successSoft: "#E6F4EC",
  warning:     "#B7791F",
  warningSoft: "#FCF3E3",
  danger:      "#C0392B",
  dangerSoft:  "#FCEBE9",
  info:        "#3B5BA5",
  infoSoft:    "#EBF0FA",
};

// Radios y sombras coherentes con el sitio público (elementos tipo píldora).
export const R = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  pill: "9999px",
};

export const SHADOW = {
  card: "0 1px 2px rgba(26,34,53,0.06), 0 1px 3px rgba(26,34,53,0.04)",
  raised: "0 4px 12px rgba(26,34,53,0.10)",
};

// Definición única de la navegación administrativa.
// `to` alimenta las rutas y `label` la barra lateral.
export const ADMIN_NAV = [
  { to: "/admin",               label: "Panel",              icon: "dashboard", end: true },
  { to: "/admin/medicamentos",  label: "Medicamentos",       icon: "pill" },
  { to: "/admin/sistema",       label: "Estado del sistema", icon: "system" },
  { to: "/admin/configuracion", label: "Configuración",      icon: "settings" },
];