import { C } from "../theme";

// Encabezado de cada vista: título, descripción opcional y una zona de acciones
// (por ejemplo el botón "Nuevo proyecto").
export default function AdminPageHeader({ titulo, descripcion, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="font-bold" style={{ fontSize: "1.5rem", color: C.text }}>
          {titulo}
        </h1>
        {descripcion && (
          <p className="text-sm mt-1" style={{ color: C.textMid }}>
            {descripcion}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
