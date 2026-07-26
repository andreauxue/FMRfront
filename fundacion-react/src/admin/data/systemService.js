// ─────────────────────────────────────────────────────────────────────────────
// Servicio de estado del sistema.
//
// Único punto que habla con el backend para esta vista. Usa rutas relativas
// (/api/...) para funcionar detrás del proxy inverso sin configurar hosts.
// Sin datos simulados: si el backend falla, el error se propaga a la vista.
// ─────────────────────────────────────────────────────────────────────────────

async function getJSON(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`El servidor respondió ${res.status} al consultar ${url}.`);
  }
  const data = await res.json();
  if (data?.status && data.status !== "success") {
    throw new Error(`La respuesta de ${url} no fue exitosa.`);
  }
  return data;
}

export function getHealth() {
  return getJSON("/api/health");
}

export function getServices() {
  return getJSON("/api/services");
}

// Consulta ambos endpoints en paralelo y entrega un objeto único para la vista.
// Un fallo en cualquiera de los dos hace fallar la carga (y activa "Reintentar").
export async function getSystemStatus() {
  const [health, servicesRes] = await Promise.all([getHealth(), getServices()]);
  return {
    api: health?.api ?? "unknown",
    database: health?.database ?? "unknown",
    databaseName: health?.databaseName ?? null,
    serverTime: health?.serverTime ?? null,
    services: Array.isArray(servicesRes?.services) ? servicesRes.services : [],
  };
}