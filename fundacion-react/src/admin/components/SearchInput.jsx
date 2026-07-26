import { IconSearch, IconX } from "@tabler/icons-react";
import { C, R } from "../theme";

export default function SearchInput({ value, onChange, placeholder = "Buscar…", id = "buscar" }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <IconSearch
        size={18}
        stroke={1.75}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: C.textLight }}
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm pl-10 pr-9 py-2.5 outline-none transition-colors"
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: R.pill,
          color: C.text,
        }}
        onFocus={(e) => (e.target.style.borderColor = C.secondary)}
        onBlur={(e) => (e.target.style.borderColor = C.border)}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="absolute right-2.5 top-1/2 -translate-y-1/2"
          style={{ color: C.textLight }}
        >
          <IconX size={16} stroke={2} />
        </button>
      )}
    </div>
  );
}
