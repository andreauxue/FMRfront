import { C, R, SHADOW } from "../theme";
import EmptyState from "./EmptyState";

// Tabla de datos reutilizable.
//
//   columns: [{ key, header, render?, align?, width? }]
//   rows:    array de objetos; cada uno debe tener `id`.
//   render(row) permite celdas personalizadas (badges, botones de acción, etc.).
//
// En pantallas estrechas la tabla se desplaza horizontalmente sin romper el layout.
export default function DataTable({ columns, rows, empty, getRowKey = (r) => r.id }) {
  if (!rows || rows.length === 0) {
    return empty || <EmptyState titulo="Sin resultados" mensaje="No hay registros para mostrar." />;
  }

  return (
    <div
      className="overflow-x-auto"
      style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: R.lg, boxShadow: SHADOW.card }}
    >
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="font-semibold px-4 py-3 whitespace-nowrap"
                style={{
                  color: C.textMid,
                  textAlign: col.align || "left",
                  width: col.width,
                  fontSize: "0.75rem",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              className="transition-colors"
              style={{ borderBottom: `1px solid ${C.border}` }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 align-middle"
                  style={{ color: C.text, textAlign: col.align || "left" }}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
