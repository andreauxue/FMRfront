import { useState } from "react";
import { IconEdit, IconPackage, IconTrash } from "@tabler/icons-react";
import { getMedicineImageUrl } from "../services/medicines";

const C = {
  brand:       "#C8384F",
  brandSoft:   "#FAE8EB",
  surface:     "#FFFFFF",
  surfaceAlt:  "#F7F8FA",
  text:        "#111827",
  textMid:     "#4B5563",
  textLight:   "#9CA3AF",
  border:      "#E5E7EB",
  success:     "#16A34A",
  successSoft: "#DCFCE7",
  warning:     "#D97706",
  warningSoft: "#FEF3C7",
};

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC",
  }).format(new Date(value));
}

function QuantityBadge({ quantity }) {
  const empty = quantity <= 0;
  const low   = quantity > 0 && quantity <= 5;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
      style={{
        background: empty ? "#FEE2E2" : low ? C.warningSoft : C.successSoft,
        color:      empty ? "#DC2626" : low ? C.warning     : C.success,
      }}
    >
      {quantity}
      {low && !empty && <span className="ml-1 opacity-70">bajo</span>}
    </span>
  );
}

/**
 * MedicineRow
 * Props:
 *   medicine   object
 *   onEdit     (medicine) => void
 *   onDelete   (medicine) => void
 */
export default function MedicineRow({ medicine, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const imageUrl = getMedicineImageUrl(medicine.imageUrl);

  return (
    <tr
      className="border-t transition-colors duration-150"
      style={{
        borderColor: C.border,
        background:  hovered ? C.surfaceAlt : C.surface,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen */}
      <td className="px-5 py-3.5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={medicine.name}
            className="object-cover rounded-xl shadow-sm"
            style={{ width: 44, height: 44 }}
          />
        ) : (
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 44, height: 44, background: C.surfaceAlt, color: C.textLight }}
          >
            <IconPackage size={20} stroke={1.5} />
          </div>
        )}
      </td>

      {/* Código */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <span
          className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg"
          style={{ background: C.surfaceAlt, color: C.textMid }}
        >
          {medicine.articleCode || "—"}
        </span>
      </td>

      {/* Nombre + descripción */}
      <td className="px-5 py-3.5">
        <p className="font-semibold text-sm" style={{ color: C.text }}>{medicine.name}</p>
        {medicine.description && (
          <p className="text-xs mt-0.5 max-w-[200px] truncate" style={{ color: C.textLight }}>
            {medicine.description}
          </p>
        )}
      </td>

      {/* Área */}
      <td className="px-5 py-3.5 text-sm" style={{ color: C.textMid }}>
        {medicine.area || "—"}
      </td>

      {/* Estante */}
      <td className="px-5 py-3.5 text-sm" style={{ color: C.textMid }}>
        {medicine.shelf || "—"}
      </td>

      {/* Cantidad */}
      <td className="px-5 py-3.5">
        <QuantityBadge quantity={medicine.quantity} />
      </td>

      {/* Caducidad */}
      <td className="px-5 py-3.5 whitespace-nowrap text-sm" style={{ color: C.textMid }}>
        {formatDate(medicine.expiresAt)}
      </td>

      {/* Acciones */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(medicine)}
            className="flex items-center justify-center rounded-lg transition-all duration-150"
            title="Editar"
            style={{ width: 34, height: 34, color: C.textMid, background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.surfaceAlt; e.currentTarget.style.color = C.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
          >
            <IconEdit size={16} stroke={2} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(medicine)}
            className="flex items-center justify-center rounded-lg transition-all duration-150"
            title="Eliminar"
            style={{ width: 34, height: 34, color: C.brand, background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.brandSoft; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <IconTrash size={16} stroke={2} />
          </button>
        </div>
      </td>
    </tr>
  );
}