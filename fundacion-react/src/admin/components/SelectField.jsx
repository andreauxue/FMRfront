import { C, R } from "../theme";

// options: [{ value, label }]
export default function SelectField({
  id,
  label,
  value,
  onChange,
  options = [],
  help,
  error,
  required = false,
  placeholder,
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

      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        aria-required={required}
        className="w-full text-sm px-3.5 py-2.5 outline-none transition-colors bg-white"
        style={{
          border: `1px solid ${error ? C.danger : C.border}`,
          borderRadius: R.md,
          color: value ? C.text : C.textLight,
        }}
        onFocus={(e) => (e.target.style.borderColor = error ? C.danger : C.secondary)}
        onBlur={(e) => (e.target.style.borderColor = error ? C.danger : C.border)}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ color: C.text }}>
            {o.label}
          </option>
        ))}
      </select>

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
