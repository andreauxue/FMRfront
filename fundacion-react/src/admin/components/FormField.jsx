import { C, R } from "../theme";

// Campo de texto con etiqueta visible, texto de ayuda y error junto al campo.
// El error se comunica con texto (no solo con color) y se asocia por aria.
export default function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  help,
  error,
  required = false,
  ...rest
}) {
  const describedBy = [help ? `${id}-help` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold" style={{ color: C.text }}>
        {label}
        {required && <span style={{ color: C.danger }} aria-hidden="true"> *</span>}
      </label>

      <input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        aria-required={required}
        className="w-full text-sm px-3.5 py-2.5 outline-none transition-colors"
        style={{
          background: C.surface,
          border: `1px solid ${error ? C.danger : C.border}`,
          borderRadius: R.md,
          color: C.text,
        }}
        onFocus={(e) => (e.target.style.borderColor = error ? C.danger : C.secondary)}
        onBlur={(e) => (e.target.style.borderColor = error ? C.danger : C.border)}
        {...rest}
      />

      {help && !error && (
        <span id={`${id}-help`} className="text-xs" style={{ color: C.textLight }}>
          {help}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="text-xs font-medium" style={{ color: C.danger }}>
          {error}
        </span>
      )}
    </div>
  );
}
