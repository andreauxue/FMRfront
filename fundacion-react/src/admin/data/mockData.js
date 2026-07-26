// ─────────────────────────────────────────────────────────────────────────────
// Capa de datos simulados.
//
// Todo el panel consume datos DESDE AQUÍ, nunca incrustados dentro de los
// componentes. Cuando el backend esté listo, reemplaza el cuerpo de cada
// función por una llamada real (fetch / axios) conservando la misma firma;
// los componentes no necesitarán cambios.
//
//   Ejemplo de reemplazo futuro:
//   export async function getDashboardSummary() {
//     const res = await fetch("/api/dashboard/summary");
//     if (!res.ok) throw new Error("No fue posible cargar el panel");
//     return res.json();
//   }
// ─────────────────────────────────────────────────────────────────────────────

// Simula la latencia de red para que los estados "Cargando" sean visibles en desarrollo.
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const _summary = {
  proyectosActivos: 12,
  publicaciones: 34,
  mensajesSinLeer: 5,
  usuariosAdministradores: 4,
  ultimoRespaldo: "2026-07-21T02:00:00-06:00",
  estados: {
    api: "operativo",        // operativo | advertencia | no-disponible
    postgres: "operativo",
    servidorWeb: "operativo",
    general: "operativo",
  },
};

const _actividad = [
  { id: 1, texto: "Se publicó el proyecto “Jornada de donación 2026”", fecha: "2026-07-21T18:10:00-06:00", tipo: "proyecto" },
  { id: 2, texto: "Nuevo mensaje de contacto de Laura Méndez",          fecha: "2026-07-21T16:42:00-06:00", tipo: "mensaje" },
  { id: 3, texto: "Se actualizó la sección “Quiénes somos”",            fecha: "2026-07-21T11:05:00-06:00", tipo: "contenido" },
  { id: 4, texto: "Respaldo automático completado",                     fecha: "2026-07-21T02:00:00-06:00", tipo: "respaldo" },
];

const _alertas = [
  { id: 1, nivel: "warning", texto: "Hay 5 mensajes de contacto sin atender." },
];

// ── API simulada ─────────────────────────────────────────────────────────────

export async function getDashboardSummary() {
  await delay();
  return structuredClone(_summary);
}

export async function getRecentActivity() {
  await delay();
  return structuredClone(_actividad);
}

export async function getAlerts() {
  await delay(300);
  return structuredClone(_alertas);
}

export async function getSystemStatus() {
  await delay();
  return {
    servicios: [
      { nombre: "API",          estado: "operativo" },
      { nombre: "PostgreSQL",   estado: "operativo" },
      { nombre: "Servidor web", estado: "operativo" },
      { nombre: "Contenedores", estado: "advertencia" },
    ],
    ultimoRespaldo: _summary.ultimoRespaldo,
    horaServidor: new Date().toISOString(),
  };
}
