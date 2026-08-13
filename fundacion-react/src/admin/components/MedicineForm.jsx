import { useEffect, useRef, useState } from "react";
import {
  IconCheck,
  IconCloudUpload,
  IconLoader2,
  IconPhoto,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import {
  createMedicineRequest,
  getMedicineImageUrl,
  updateMedicineRequest,
  uploadMedicineImageRequest,
} from "../services/medicines";

/* ─── Tokens ─────────────────────────────────────────────────────────────────── */
const C = {
  brand:      "#C8384F",
  brandSoft:  "#FAE8EB",
  bg:         "#F0F2F5",
  surface:    "#FFFFFF",
  surfaceAlt: "#F7F8FA",
  text:       "#111827",
  textMid:    "#4B5563",
  textLight:  "#9CA3AF",
  border:     "#E5E7EB",
  borderFocus:"#C8384F",
  error:      "#DC2626",
  errorSoft:  "#FEF2F2",
  success:    "#16A34A",
  successSoft:"#DCFCE7",
};

/* ─── Valores iniciales ──────────────────────────────────────────────────────── */
function emptyForm() {
  return {
    articleCode: "",
    name:        "",
    description: "",
    area:        "",
    shelf:       "",
    quantity:    "",
    expiresAt:   "",
  };
}

function medicineToForm(medicine) {
  return {
    articleCode: medicine.articleCode ?? "",
    name:        medicine.name        ?? "",
    description: medicine.description ?? "",
    area:        medicine.area        ?? "",
    shelf:       medicine.shelf       ?? "",
    quantity:    medicine.quantity    != null ? String(medicine.quantity) : "",
    expiresAt:   medicine.expiresAt
      ? medicine.expiresAt.slice(0, 10)   // ISO → YYYY-MM-DD
      : "",
  };
}

/* ─── Validación simple ──────────────────────────────────────────────────────── */
function validate(values) {
  const errs = {};
  if (!values.name.trim())               errs.name     = "El nombre es obligatorio.";
  if (!values.articleCode.trim())        errs.articleCode = "El No. de artículo es obligatorio.";
  const qty = Number(values.quantity);
  if (values.quantity === "")            errs.quantity = "La cantidad es obligatoria.";
  else if (!Number.isInteger(qty) || qty < 0)
                                         errs.quantity = "Debe ser un número entero ≥ 0.";
  return errs;
}

/* ─── Sub-componentes de formulario ─────────────────────────────────────────── */

function Label({ htmlFor, required, children }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display:     "block",
        fontSize:    "0.75rem",
        fontWeight:  700,
        color:       C.textMid,
        marginBottom: 6,
        letterSpacing: "0.01em",
      }}
    >
      {children}
      {required && (
        <span style={{ color: C.brand, marginLeft: 3 }}>*</span>
      )}
    </label>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p style={{ fontSize: "0.72rem", color: C.error, marginTop: 5, fontWeight: 600 }}>
      {msg}
    </p>
  );
}

function Input({ id, value, onChange, type = "text", placeholder, hasError, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        display:       "block",
        width:         "100%",
        padding:       "0.6rem 0.875rem",
        borderRadius:  "0.65rem",
        border:        `1.5px solid ${hasError ? C.error : focused ? C.borderFocus : C.border}`,
        boxShadow:     focused ? `0 0 0 3px ${hasError ? C.error : C.brand}18` : "none",
        background:    C.surface,
        color:         C.text,
        fontSize:      "0.875rem",
        outline:       "none",
        transition:    "border-color 150ms, box-shadow 150ms",
        boxSizing:     "border-box",
      }}
      {...rest}
    />
  );
}

function Textarea({ id, value, onChange, placeholder, rows = 3 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        display:      "block",
        width:        "100%",
        padding:      "0.6rem 0.875rem",
        borderRadius: "0.65rem",
        border:       `1.5px solid ${focused ? C.borderFocus : C.border}`,
        boxShadow:    focused ? `0 0 0 3px ${C.brand}18` : "none",
        background:   C.surface,
        color:        C.text,
        fontSize:     "0.875rem",
        outline:      "none",
        resize:       "vertical",
        transition:   "border-color 150ms, box-shadow 150ms",
        boxSizing:    "border-box",
        fontFamily:   "inherit",
      }}
    />
  );
}

/* ─── Zona de imagen ─────────────────────────────────────────────────────────── */

function ImageZone({ medicineId, currentImageUrl, onUploaded }) {
  const inputRef    = useRef(null);
  const [dragging, setDragging]   = useState(false);
  const [preview,  setPreview]    = useState(null);
  const [file,     setFile]       = useState(null);
  const [status,   setStatus]     = useState("idle"); // idle | uploading | success | error
  const [errMsg,   setErrMsg]     = useState("");

  const existingUrl = getMedicineImageUrl(currentImageUrl);

  function pickFile(f) {
    if (!f || !f.type.startsWith("image/")) {
      setErrMsg("Solo se aceptan imágenes (JPG, PNG, WEBP…).");
      return;
    }
    setErrMsg("");
    setFile(f);
    setStatus("idle");
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  }

  function onInputChange(e) { pickFile(e.target.files?.[0]); }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  }

  async function upload() {
    if (!file || !medicineId) return;
    setStatus("uploading");
    setErrMsg("");
    try {
      const result = await uploadMedicineImageRequest(medicineId, file);
      setStatus("success");
      setFile(null);
      setPreview(null);
      onUploaded?.(result);
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "Error al subir la imagen.");
    }
  }

  function clear() {
    setFile(null);
    setPreview(null);
    setStatus("idle");
    setErrMsg("");
    if (inputRef.current) inputRef.current.value = "";
  }

  const displaySrc = preview ?? existingUrl;

  return (
    <div>
      <Label>Imagen del medicamento</Label>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border:        `2px dashed ${dragging ? C.brand : C.border}`,
          borderRadius:  "0.875rem",
          background:    dragging ? C.brandSoft : C.surfaceAlt,
          cursor:        "pointer",
          transition:    "border-color 150ms, background 150ms",
          overflow:      "hidden",
          position:      "relative",
          minHeight:     160,
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onInputChange}
          style={{ display: "none" }}
        />

        {displaySrc ? (
          /* Vista previa */
          <div style={{ width: "100%", position: "relative" }}>
            <img
              src={displaySrc}
              alt="Vista previa"
              style={{
                width:      "100%",
                maxHeight:  220,
                objectFit:  "cover",
                display:    "block",
              }}
            />
            {/* Overlay con botón limpiar (solo si hay archivo nuevo pendiente) */}
            {file && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); clear(); }}
                style={{
                  position:  "absolute",
                  top:        8,
                  right:      8,
                  width:      30,
                  height:     30,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.55)",
                  border:     "none",
                  color:      "#fff",
                  cursor:     "pointer",
                  display:    "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconX size={14} stroke={2.5} />
              </button>
            )}
            {/* Etiqueta "imagen actual" si no hay preview nuevo */}
            {!file && existingUrl && (
              <div style={{
                position:   "absolute",
                bottom:     8,
                left:       8,
                background: "rgba(0,0,0,0.5)",
                color:      "#fff",
                fontSize:   "0.7rem",
                fontWeight: 700,
                padding:    "3px 8px",
                borderRadius: "0.4rem",
                letterSpacing: "0.04em",
              }}>
                IMAGEN ACTUAL · clic para cambiar
              </div>
            )}
          </div>
        ) : (
          /* Placeholder */
          <div style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            gap:            10,
            padding:        "2rem 1rem",
            color:          C.textLight,
          }}>
            <IconPhoto size={36} stroke={1.25} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: C.textMid, margin: 0 }}>
                Arrastra una imagen aquí
              </p>
              <p style={{ fontSize: "0.75rem", margin: "4px 0 0", color: C.textLight }}>
                o haz clic para seleccionar · JPG, PNG, WEBP
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error de archivo */}
      {errMsg && (
        <p style={{ fontSize: "0.72rem", color: C.error, marginTop: 6, fontWeight: 600 }}>
          {errMsg}
        </p>
      )}

      {/* Botón subir — solo aparece si hay archivo nuevo y el medicine ya existe */}
      {file && medicineId && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); upload(); }}
          disabled={status === "uploading"}
          style={{
            marginTop:      10,
            display:        "flex",
            alignItems:     "center",
            gap:            6,
            padding:        "0.5rem 1.1rem",
            borderRadius:   "0.65rem",
            border:         "none",
            background:     C.brand,
            color:          "#fff",
            fontSize:       "0.8rem",
            fontWeight:     700,
            cursor:         status === "uploading" ? "not-allowed" : "pointer",
            opacity:        status === "uploading" ? 0.75 : 1,
          }}
        >
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          {status === "uploading"
            ? <IconLoader2 size={14} style={{ animation: "spin 0.8s linear infinite" }} />
            : <IconCloudUpload size={14} stroke={2} />
          }
          {status === "uploading" ? "Subiendo…" : "Subir imagen"}
        </button>
      )}

      {/* Aviso si no hay ID todavía */}
      {file && !medicineId && (
        <p style={{ fontSize: "0.72rem", color: C.textLight, marginTop: 6 }}>
          La imagen se podrá subir después de guardar el medicamento.
        </p>
      )}

      {/* Éxito */}
      {status === "success" && (
        <div style={{
          marginTop:   8,
          display:     "flex",
          alignItems:  "center",
          gap:         6,
          fontSize:    "0.78rem",
          fontWeight:  700,
          color:       C.success,
        }}>
          <IconCheck size={14} stroke={2.5} />
          Imagen actualizada correctamente.
        </div>
      )}
    </div>
  );
}

/* ─── Formulario principal ───────────────────────────────────────────────────── */

/**
 * MedicineForm
 * Props:
 *   medicine   object|null  — null = modo creación
 *   onCancel   () => void
 *   onCreated  () => Promise<void>
 *   onUpdated  () => Promise<void>
 */
export default function MedicineForm({ medicine, onCancel, onCreated, onUpdated }) {
  const isEditing = !!medicine;

  const [values,   setValues]   = useState(() => isEditing ? medicineToForm(medicine) : emptyForm());
  const [errors,   setErrors]   = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverErr,  setServerErr]  = useState("");
  /* Para refrescar la imagen tras upload sin cerrar el modal */
  const [savedId,    setSavedId]    = useState(medicine?.id ?? null);
  const [savedImgUrl, setSavedImgUrl] = useState(medicine?.imageUrl ?? null);

  /* Si el padre cambia de medicamento (raro pero posible) */
  useEffect(() => {
    setValues(isEditing ? medicineToForm(medicine) : emptyForm());
    setErrors({});
    setServerErr("");
    setSavedId(medicine?.id ?? null);
    setSavedImgUrl(medicine?.imageUrl ?? null);
  }, [medicine?.id]);

  function set(field) {
    return (e) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setServerErr("");
    try {
      if (isEditing) {
        await updateMedicineRequest(medicine.id, values);
        await onUpdated?.();
      } else {
        const created = await createMedicineRequest(values);
        setSavedId(created?.id ?? created?.medicine?.id ?? null);
        await onCreated?.();
      }
    } catch (err) {
      setServerErr(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Render ── */
  return (
    <div style={{ padding: "1.5rem" }}>
      {/* Error del servidor */}
      {serverErr && (
        <div style={{
          display:      "flex",
          alignItems:   "center",
          justifyContent: "space-between",
          gap:          12,
          background:   C.errorSoft,
          border:       "1px solid #FCA5A530",
          borderRadius: "0.75rem",
          padding:      "0.75rem 1rem",
          marginBottom: "1.25rem",
          color:        C.error,
          fontSize:     "0.85rem",
          fontWeight:   600,
        }}>
          <span>{serverErr}</span>
          <button
            type="button"
            onClick={() => setServerErr("")}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.error, flexShrink: 0 }}
          >
            <IconX size={15} stroke={2} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* ── Grid de campos ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap:                 "1.25rem",
          marginBottom:        "1.5rem",
        }}>

          {/* No. artículo */}
          <div>
            <Label htmlFor="articleCode" required>No. artículo</Label>
            <Input
              id="articleCode"
              value={values.articleCode}
              onChange={set("articleCode")}
              placeholder="Ej. MED-001"
              hasError={!!errors.articleCode}
            />
            <FieldError msg={errors.articleCode} />
          </div>

          {/* Nombre */}
          <div style={{ gridColumn: "span 2" }}>
            <Label htmlFor="name" required>Nombre del medicamento</Label>
            <Input
              id="name"
              value={values.name}
              onChange={set("name")}
              placeholder="Ej. Paracetamol 500 mg"
              hasError={!!errors.name}
            />
            <FieldError msg={errors.name} />
          </div>

          {/* Área */}
          <div>
            <Label htmlFor="area">Área</Label>
            <Input
              id="area"
              value={values.area}
              onChange={set("area")}
              placeholder="Ej. Urgencias"
            />
          </div>

          {/* Estante */}
          <div>
            <Label htmlFor="shelf">Estante</Label>
            <Input
              id="shelf"
              value={values.shelf}
              onChange={set("shelf")}
              placeholder="Ej. A-3"
            />
          </div>

          {/* Cantidad */}
          <div>
            <Label htmlFor="quantity" required>Cantidad</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              step="1"
              value={values.quantity}
              onChange={set("quantity")}
              placeholder="0"
              hasError={!!errors.quantity}
            />
            <FieldError msg={errors.quantity} />
          </div>

          {/* Caducidad */}
          <div>
            <Label htmlFor="expiresAt">Fecha de caducidad</Label>
            <Input
              id="expiresAt"
              type="date"
              value={values.expiresAt}
              onChange={set("expiresAt")}
            />
          </div>

          {/* Descripción — full width */}
          <div style={{ gridColumn: "1 / -1" }}>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={values.description}
              onChange={set("description")}
              placeholder="Indicaciones, presentación, dosis…"
              rows={3}
            />
          </div>
        </div>

        {/* ── Zona de imagen ── */}
        <div style={{
          borderTop:   `1px solid ${C.border}`,
          paddingTop:  "1.25rem",
          marginBottom:"1.5rem",
        }}>
          <ImageZone
            medicineId={savedId}
            currentImageUrl={savedImgUrl}
            onUploaded={(result) => {
              setSavedImgUrl(result?.imageUrl ?? result?.medicine?.imageUrl ?? savedImgUrl);
            }}
          />
        </div>

        {/* ── Botones ── */}
        <div style={{
          display:        "flex",
          justifyContent: "flex-end",
          gap:            "0.75rem",
        }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            style={{
              padding:      "0.6rem 1.25rem",
              borderRadius: "0.75rem",
              border:       `1.5px solid ${C.border}`,
              background:   C.surface,
              color:        C.textMid,
              fontWeight:   700,
              fontSize:     "0.875rem",
              cursor:       "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.surfaceAlt; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.surface; }}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={submitting}
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          6,
              padding:      "0.6rem 1.4rem",
              borderRadius: "0.75rem",
              border:       "none",
              background:   C.brand,
              color:        "#fff",
              fontWeight:   700,
              fontSize:     "0.875rem",
              cursor:       submitting ? "not-allowed" : "pointer",
              opacity:      submitting ? 0.75 : 1,
              boxShadow:    "0 4px 12px rgba(200,56,79,0.25)",
              transition:   "opacity 150ms",
            }}
          >
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            {submitting
              ? <IconLoader2 size={15} style={{ animation: "spin 0.8s linear infinite" }} />
              : null
            }
            {submitting
              ? "Guardando…"
              : isEditing ? "Guardar cambios" : "Registrar medicamento"
            }
          </button>
        </div>
      </form>
    </div>
  );
}