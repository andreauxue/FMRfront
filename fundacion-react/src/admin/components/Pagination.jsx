import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { C, R } from "../theme";

// Paginación simple. `page` es 1-based.
export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const btn = (disabled) => ({
    background: disabled ? C.bg : C.surface,
    color: disabled ? C.textLight : C.text,
    border: `1px solid ${C.border}`,
    borderRadius: R.md,
  });

  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <span className="text-sm" style={{ color: C.textMid }}>
        Página {page} de {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Página anterior"
          className="inline-flex items-center justify-center p-2 transition-colors disabled:cursor-not-allowed"
          style={btn(page <= 1)}
        >
          <IconChevronLeft size={18} stroke={2} />
        </button>
        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Página siguiente"
          className="inline-flex items-center justify-center p-2 transition-colors disabled:cursor-not-allowed"
          style={btn(page >= totalPages)}
        >
          <IconChevronRight size={18} stroke={2} />
        </button>
      </div>
    </div>
  );
}
