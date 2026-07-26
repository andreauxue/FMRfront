// Formateo de fechas en español (México). Centralizado para mantener consistencia.

const fmtFecha = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit", month: "short", year: "numeric",
});

const fmtFechaHora = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
});

export function fechaCorta(iso) {
  if (!iso) return "—";
  return fmtFecha.format(new Date(iso));
}

export function fechaHora(iso) {
  if (!iso) return "—";
  return fmtFechaHora.format(new Date(iso));
}

// "hace 2 h", "hace 3 días", etc.
export function tiempoRelativo(iso) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "hace instantes";
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  return `hace ${d} ${d === 1 ? "día" : "días"}`;
}
