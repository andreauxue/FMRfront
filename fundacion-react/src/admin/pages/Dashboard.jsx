import { Link } from "react-router-dom";
import {
  IconStack2,
  IconNews,
  IconMail,
  IconUserCog,
  IconDatabaseExport,
  IconServer2,
  IconAlertTriangle,
  IconArrowRight,
  IconPlus,
} from "@tabler/icons-react";

import AdminPageHeader from "../components/AdminPageHeader";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { useAsync } from "../hooks/useAsync";
import { getDashboardSummary, getRecentActivity, getAlerts } from "../data/mockData";
import { fechaHora, tiempoRelativo } from "../utils/format";
import { C, R, SHADOW } from "../theme";

const ACCESOS_RAPIDOS = [
  { to: "/admin/proyectos",     label: "Nuevo proyecto",    icon: IconStack2 },
  { to: "/admin/publicaciones", label: "Nueva publicación", icon: IconNews },
];

export default function Dashboard() {
  const { data: resumen, loading, error, reload } = useAsync(getDashboardSummary);
  const { data: actividad } = useAsync(getRecentActivity);
  const { data: alertas } = useAsync(getAlerts);

  if (loading) return <LoadingState mensaje="Cargando el panel…" />;
  if (error) return <ErrorState onRetry={reload} />;

  return (
    <>
      <AdminPageHeader
        titulo="Panel"
        descripcion="Resumen general del sitio y del estado del sistema."
        actions={
          <Link
            to="/admin/proyectos"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 transition-all"
            style={{ background: C.brand, color: "#fff", borderRadius: R.pill }}
          >
            <IconPlus size={16} stroke={2.25} />
            Nuevo proyecto
          </Link>
        }
      />

      {/* Alertas importantes */}
      {alertas?.length > 0 && (
        <div className="flex flex-col gap-2 mb-6">
          {alertas.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium"
              style={{ background: C.warningSoft, color: C.warning, borderRadius: R.md }}
            >
              <IconAlertTriangle size={18} stroke={2} className="shrink-0" />
              {a.texto}
            </div>
          ))}
        </div>
      )}

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <StatCard icon={IconStack2}   label="Proyectos activos"        value={resumen.proyectosActivos} />
        <StatCard icon={IconNews}     label="Publicaciones"            value={resumen.publicaciones} />
        <StatCard
          icon={IconMail}
          label="Mensajes sin leer"
          value={resumen.mensajesSinLeer}
          accent={C.brand}
          accentSoft={C.brandSoft}
          hint={resumen.mensajesSinLeer > 0 ? "Requieren atención" : undefined}
        />
        <StatCard icon={IconUserCog}  label="Usuarios administradores" value={resumen.usuariosAdministradores} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Actividad reciente */}
        <section className="lg:col-span-2">
          <Card titulo="Actividad reciente">
            {actividad ? (
              <ul className="flex flex-col">
                {actividad.map((item, i) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 py-3"
                    style={{ borderTop: i === 0 ? "none" : `1px solid ${C.border}` }}
                  >
                    <span
                      className="mt-1.5 shrink-0"
                      style={{ width: 8, height: 8, borderRadius: R.pill, background: C.secondary }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm" style={{ color: C.text }}>{item.texto}</p>
                      <p className="text-xs mt-0.5" style={{ color: C.textLight }}>{tiempoRelativo(item.fecha)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <LoadingState mensaje="Cargando actividad…" />
            )}
          </Card>
        </section>

        {/* Columna derecha */}
        <div className="flex flex-col gap-6">
          {/* Estado del sistema */}
          <Card
            titulo="Estado del sistema"
            action={<Link to="/admin/sistema" className="text-xs font-bold inline-flex items-center gap-1" style={{ color: C.secondary }}>Detalle <IconArrowRight size={13} stroke={2.5} /></Link>}
          >
            <ul className="flex flex-col gap-3">
              <EstadoFila icon={IconServer2}        label="API"        status={resumen.estados.api} />
              <EstadoFila icon={IconServer2}        label="PostgreSQL" status={resumen.estados.postgres} />
              <EstadoFila icon={IconServer2}        label="Servidor web" status={resumen.estados.servidorWeb} />
              <EstadoFila icon={IconDatabaseExport} label="Último respaldo" valor={fechaHora(resumen.ultimoRespaldo)} />
            </ul>
          </Card>

          {/* Accesos rápidos */}
          <Card titulo="Accesos rápidos">
            <div className="grid grid-cols-2 gap-2">
              {ACCESOS_RAPIDOS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex flex-col items-start gap-2 p-3 transition-colors"
                  style={{ background: C.bg, borderRadius: R.md, color: C.text }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.secondarySoft)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = C.bg)}
                >
                  <Icon size={20} stroke={1.75} style={{ color: C.secondary }} />
                  <span className="text-xs font-semibold leading-tight">{label}</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

// ── Piezas internas ──────────────────────────────────────────────────────────

function Card({ titulo, action, children }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: R.lg, boxShadow: SHADOW.card }}>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
        <h2 className="text-sm font-bold" style={{ color: C.text }}>{titulo}</h2>
        {action}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function EstadoFila({ icon: Icon, label, status, valor }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-sm" style={{ color: C.textMid }}>
        <Icon size={17} stroke={1.75} style={{ color: C.textLight }} />
        {label}
      </span>
      {status ? <StatusBadge status={status} size="sm" /> : <span className="text-sm font-medium" style={{ color: C.text }}>{valor}</span>}
    </li>
  );
}
