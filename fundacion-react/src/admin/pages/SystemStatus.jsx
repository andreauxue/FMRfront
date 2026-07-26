import {
  IconRefresh,
  IconServer2,
  IconDatabase,
  IconClock,
  IconStack2,
} from "@tabler/icons-react";

import AdminPageHeader from "../components/AdminPageHeader";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { useAsync } from "../hooks/useAsync";
import { getSystemStatus } from "../data/systemService";
import { fechaHora, fechaCorta } from "../utils/format";
import { C, R, SHADOW } from "../theme";

// Traduce los estados que envía el backend ("active", "connected", "inactive"…)
// al vocabulario de StatusBadge, que ya muestra icono + texto (no solo color).
function normalizarEstado(valor) {
  const v = String(valor || "").toLowerCase();
  if (["active", "connected", "ok", "up", "online", "healthy", "operational", "success"].includes(v)) {
    return { status: "operativo" };
  }
  if (["degraded", "warning", "slow", "partial"].includes(v)) {
    return { status: "advertencia" };
  }
  if (["inactive", "disconnected", "down", "error", "failed", "offline", "stopped"].includes(v)) {
    return { status: "no-disponible" };
  }
  // Valor desconocido: lo marcamos como advertencia y mostramos el texto original.
  return { status: "advertencia", label: valor ? String(valor) : "Desconocido" };
}

export default function SystemStatus() {
  const { data, loading, error, reload } = useAsync(getSystemStatus);

  return (
    <>
      <AdminPageHeader
        titulo="Estado del sistema"
        descripcion="Salud de los servicios e infraestructura en tiempo real."
        actions={
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 transition-colors disabled:opacity-60"
            style={{ background: C.secondarySoft, color: C.secondary, borderRadius: R.pill }}
          >
            <IconRefresh size={16} stroke={2} />
            Actualizar
          </button>
        }
      />

      {loading && <LoadingState mensaje="Consultando el estado del sistema…" />}

      {error && !loading && (
        <ErrorState
          titulo="No fue posible obtener el estado del sistema"
          mensaje="No se pudo contactar a la API. Revisa que el servicio esté en línea e inténtalo de nuevo."
          onRetry={reload}
        />
      )}

      {data && !loading && !error && (
        <>
          {/* Resumen */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-6">
            <StatCard
              icon={IconDatabase}
              label="Base de datos"
              value={data.databaseName || "—"}
            />
            <StatCard
              icon={IconClock}
              label="Hora del servidor"
              value={fechaHora(data.serverTime)}
            />
            <StatCard
              icon={IconStack2}
              label="Servicios monitoreados"
              value={data.services.length}
            />
          </div>

          {/* Componentes principales (desde /api/health) */}
          <Panel titulo="Componentes principales">
            <ul className="flex flex-col">
              <Fila
                icon={IconServer2}
                label="API"
                estado={normalizarEstado(data.api)}
                primero
              />
              <Fila
                icon={IconDatabase}
                label={data.databaseName ? `Base de datos · ${data.databaseName}` : "Base de datos"}
                estado={normalizarEstado(data.database)}
              />
            </ul>
          </Panel>

          {/* Servicios (desde /api/services) */}
          <div className="mt-6">
            <Panel titulo="Servicios">
              {data.services.length === 0 ? (
                <p className="text-sm py-2" style={{ color: C.textMid }}>
                  No hay servicios registrados.
                </p>
              ) : (
                <ul className="flex flex-col">
                  {data.services.map((s, i) => (
                    <Fila
                      key={s.id ?? s.service_name}
                      icon={IconServer2}
                      label={s.service_name}
                      sub={s.created_at ? `Registrado el ${fechaCorta(s.created_at)}` : undefined}
                      estado={normalizarEstado(s.status)}
                      primero={i === 0}
                    />
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </>
      )}
    </>
  );
}

// ── Piezas internas ──────────────────────────────────────────────────────────

function Panel({ titulo, children }) {
  return (
    <section
      style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: R.lg, boxShadow: SHADOW.card }}
    >
      <div className="px-5 py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
        <h2 className="text-sm font-bold" style={{ color: C.text }}>{titulo}</h2>
      </div>
      <div className="px-5 py-1.5">{children}</div>
    </section>
  );
}

function Fila({ icon: Icon, label, sub, estado, primero = false }) {
  return (
    <li
      className="flex items-center justify-between gap-3 py-3.5"
      style={{ borderTop: primero ? "none" : `1px solid ${C.border}` }}
    >
      <span className="flex items-center gap-3 min-w-0">
        <Icon size={19} stroke={1.75} className="shrink-0" style={{ color: C.textLight }} />
        <span className="min-w-0">
          <span className="block text-sm font-medium truncate" style={{ color: C.text }}>{label}</span>
          {sub && <span className="block text-xs mt-0.5" style={{ color: C.textLight }}>{sub}</span>}
        </span>
      </span>
      <StatusBadge status={estado.status} label={estado.label} size="sm" />
    </li>
  );
}