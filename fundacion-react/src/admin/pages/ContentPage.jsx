import { useEffect, useMemo, useRef, useState } from "react";
import {
  IconPhoto,
  IconUpload,
  IconCheck,
  IconAlertCircle,
  IconEye,
  IconEyeOff,
  IconDeviceFloppy,
  IconLoader2,
  IconX,
  IconRefresh,
  IconPlus,
  IconPill,
} from "@tabler/icons-react";
import {
  getMedications,
  createMedication,
  updateMedication,
  uploadMedicationImage,
} from "../services/medicationService";

// ─── Paleta admin ──────────────────────────────────────────────────────────────
const A = {
  bg:         "#F0F2F5",
  surface:    "#FFFFFF",
  surfaceAlt: "#F7F8FA",
  brand:      "#C8384F",
  brandSoft:  "#FAE8EB",
  success:    "#16A34A",
  successSoft:"#DCFCE7",
  warning:    "#D97706",
  warnSoft:   "#FEF3C7",
  text:       "#111827",
  textMid:    "#4B5563",
  textLight:  "#9CA3AF",
  border:     "#E5E7EB",
  radius:     "12px",
};

const EMPTY_FORM = {
  name:        "",
  description: "",
  dosage:      "",
  imageUrl:    "",
  isActive:    true,
};

// ─── Componentes base ─────────────────────────────────────────────────────────
function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor}
      className="block text-xs font-bold tracking-wide uppercase mb-2"
      style={{ color: A.textMid }}>
      {children}{required && <span style={{ color: A.brand }}> *</span>}
    </label>
  );
}

function FieldInput({ id, name, value, onChange, placeholder, maxLength, disabled, required }) {
  return (
    <input
      id={id} name={name} value={value} onChange={onChange}
      placeholder={placeholder} maxLength={maxLength}
      disabled={disabled} required={required}
      className="w-full text-sm px-4 py-3 outline-none transition-all duration-200"
      style={{
        background: disabled ? A.surfaceAlt : A.surface,
        border: `1.5px solid ${A.border}`,
        borderRadius: A.radius,
        color: A.text,
        opacity: disabled ? 0.6 : 1,
      }}
      onFocus={(e) => { e.target.style.borderColor = A.brand; e.target.style.boxShadow = `0 0 0 3px ${A.brand}18`; }}
      onBlur={(e)  => { e.target.style.borderColor = A.border; e.target.style.boxShadow = "none"; }}
    />
  );
}

function FieldTextarea({ id, name, value, onChange, placeholder, rows = 5, disabled }) {
  return (
    <textarea
      id={id} name={name} value={value} onChange={onChange}
      placeholder={placeholder} rows={rows} disabled={disabled}
      className="w-full text-sm px-4 py-3 outline-none transition-all duration-200 resize-y"
      style={{
        background: disabled ? A.surfaceAlt : A.surface,
        border: `1.5px solid ${A.border}`,
        borderRadius: A.radius,
        color: A.text,
        lineHeight: 1.7,
        opacity: disabled ? 0.6 : 1,
        minHeight: 100,
      }}
      onFocus={(e) => { e.target.style.borderColor = A.brand; e.target.style.boxShadow = `0 0 0 3px ${A.brand}18`; }}
      onBlur={(e)  => { e.target.style.borderColor = A.border; e.target.style.boxShadow = "none"; }}
    />
  );
}

// ─── Imagen con drag & drop ────────────────────────────────────────────────────
function ImageField({ previewUrl, selectedImage, onFileChange, disabled }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFileChange(file);
  };

  return (
    <div>
      <Label htmlFor="med-image">Imagen del medicamento</Label>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        className="relative overflow-hidden transition-all duration-200"
        style={{
          border: `2px dashed ${dragging ? A.brand : A.border}`,
          borderRadius: A.radius,
          background: dragging ? A.brandSoft : A.surfaceAlt,
          cursor: disabled ? "not-allowed" : "pointer",
          minHeight: 180,
        }}>
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Vista previa"
              className="w-full object-cover"
              style={{ maxHeight: 240, borderRadius: `calc(${A.radius} - 2px)` }} />
            {!disabled && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-200"
                style={{ background: "rgba(10,14,30,0.55)" }}>
                <IconUpload size={24} stroke={1.75} style={{ color: "#fff" }} />
                <span className="text-sm font-semibold" style={{ color: "#fff" }}>Cambiar imagen</span>
              </div>
            )}
            {selectedImage && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: A.warning, color: "#fff" }}>
                <IconPhoto size={13} stroke={2} /> Sin guardar
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-10 px-6">
            <div className="flex items-center justify-center rounded-2xl"
              style={{ width: 48, height: 48, background: A.brandSoft, color: A.brand }}>
              <IconPhoto size={22} stroke={1.5} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold" style={{ color: A.text }}>Arrastra o haz clic</p>
              <p className="text-xs mt-1" style={{ color: A.textLight }}>JPEG · PNG · WEBP</p>
            </div>
          </div>
        )}
      </div>
      <input ref={inputRef} id="med-image" type="file"
        accept="image/jpeg,image/png,image/webp" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFileChange(f); }} />
    </div>
  );
}

// ─── Toggle visibilidad ────────────────────────────────────────────────────────
function ActiveToggle({ checked, onChange, disabled }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none"
      style={{ opacity: disabled ? 0.6 : 1 }}>
      <input type="checkbox" name="isActive" checked={checked}
        onChange={onChange} disabled={disabled} className="hidden" />
      <div className="relative transition-colors duration-200"
        style={{ width: 40, height: 22, borderRadius: 99, background: checked ? A.success : A.border }}>
        <div className="absolute top-1 transition-all duration-200"
          style={{ left: checked ? 20 : 2, width: 14, height: 14, borderRadius: "50%",
            background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
      {checked
        ? <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: A.success }}><IconEye size={15} stroke={2} />Visible en el sitio</span>
        : <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: A.textLight }}><IconEyeOff size={15} stroke={2} />Oculto</span>}
    </label>
  );
}

// ─── Pantallas de carga / error ────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: A.bg }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div className="flex flex-col items-center gap-3">
        <IconLoader2 size={34} stroke={1.75} style={{ color: A.brand, animation: "spin 1s linear infinite" }} />
        <p className="text-sm font-semibold" style={{ color: A.textMid }}>Cargando medicamentos…</p>
      </div>
    </div>
  );
}

function ErrorScreen({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: A.bg }}>
      <div className="text-center max-w-sm">
        <div className="flex items-center justify-center rounded-2xl mx-auto mb-4"
          style={{ width: 60, height: 60, background: A.brandSoft, color: A.brand }}>
          <IconAlertCircle size={28} stroke={1.75} />
        </div>
        <h2 className="font-bold text-lg mb-2" style={{ color: A.text }}>No se pudo cargar</h2>
        <p className="text-sm mb-6" style={{ color: A.textMid }}>{message}</p>
        <button onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
          style={{ background: A.brand, color: "#fff" }}>
          <IconRefresh size={16} stroke={2} /> Reintentar
        </button>
      </div>
    </div>
  );
}

// ─── Admin principal ──────────────────────────────────────────────────────────
export default function AdminMedicamentos() {
  const [medications, setMedications]       = useState([]);
  const [selectedId, setSelectedId]         = useState(null);
  const [form, setForm]                     = useState(EMPTY_FORM);
  const [originalForm, setOriginalForm]     = useState(EMPTY_FORM);
  const [selectedImage, setSelectedImage]   = useState(null);
  const [isNew, setIsNew]                   = useState(false);

  const [isLoading, setIsLoading]           = useState(true);
  const [isSaving, setIsSaving]             = useState(false);
  const [loadError, setLoadError]           = useState("");
  const [saveError, setSaveError]           = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isDirty = useMemo(
    () => !!selectedImage || JSON.stringify(form) !== JSON.stringify(originalForm),
    [form, originalForm, selectedImage]
  );

  // Preview URL
  const previewUrl = useMemo(() => {
    if (selectedImage) return URL.createObjectURL(selectedImage);
    return form.imageUrl;
  }, [selectedImage, form.imageUrl]);

  useEffect(() => {
    return () => { if (selectedImage && previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [selectedImage, previewUrl]);

  // Carga inicial
  async function loadMedications() {
    setIsLoading(true);
    setLoadError("");
    try {
      const data = await getMedications();
      setMedications(data);
      if (data.length > 0) selectMedication(data[0]);
      else startNew();
    } catch (err) {
      setLoadError(err.message || "Error al cargar medicamentos");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { loadMedications(); }, []);

  function selectMedication(med) {
    const values = {
      name:        med.name        || "",
      description: med.description || "",
      dosage:      med.dosage      || "",
      imageUrl:    med.image_url   || "",
      isActive:    med.is_active   !== false,
    };
    setSelectedId(med.id);
    setForm(values);
    setOriginalForm(values);
    setSelectedImage(null);
    setIsNew(false);
    setSaveError("");
    setSuccessMessage("");
  }

  function startNew() {
    setSelectedId(null);
    setForm(EMPTY_FORM);
    setOriginalForm(EMPTY_FORM);
    setSelectedImage(null);
    setIsNew(true);
    setSaveError("");
    setSuccessMessage("");
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setSaveError("");
    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim())        { setSaveError("Escribe el nombre del medicamento."); return; }
    if (!form.description.trim()) { setSaveError("Escribe la descripción."); return; }

    setIsSaving(true);
    setSaveError("");
    setSuccessMessage("");

    try {
      let finalImageUrl = form.imageUrl;

      if (selectedImage) {
        const uploadResult = await uploadMedicationImage(selectedImage);
        finalImageUrl = uploadResult.imageUrl;
      }

      const payload = { ...form, imageUrl: finalImageUrl };
      let result;

      if (isNew) {
        result = await createMedication(payload);
        setMedications((prev) => [...prev, result]);
      } else {
        result = await updateMedication(selectedId, payload);
        setMedications((prev) => prev.map((m) => (m.id === selectedId ? result : m)));
      }

      const normalized = {
        name:        result.name        || "",
        description: result.description || "",
        dosage:      result.dosage      || "",
        imageUrl:    result.image_url   || "",
        isActive:    result.is_active   !== false,
      };

      setForm(normalized);
      setOriginalForm(normalized);
      setSelectedId(result.id);
      setSelectedImage(null);
      setIsNew(false);
      setSuccessMessage(isNew ? "Medicamento creado correctamente." : "Los cambios se guardaron correctamente.");
    } catch (err) {
      setSaveError(err.message || "No fue posible guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) return <LoadingScreen />;
  if (loadError)  return <ErrorScreen message={loadError} onRetry={loadMedications} />;

  return (
    <div className="min-h-screen" style={{ background: A.bg }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(10px)", borderColor: A.border }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-lg"
              style={{ width: 28, height: 28, background: A.brandSoft, color: A.brand }}>
              <IconPill size={16} stroke={2} />
            </div>
            <span className="text-sm font-bold" style={{ color: A.text }}>
              Admin · Medicamentos
            </span>
          </div>
          <button onClick={loadMedications} disabled={isSaving}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-all hover:bg-gray-50"
            style={{ border: `1px solid ${A.border}`, color: A.textMid }}>
            <IconRefresh size={13} stroke={2} /> Recargar
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Título */}
        <div className="mb-8">
          <h1 className="font-black text-2xl mb-1"
            style={{ color: A.text, letterSpacing: "-0.02em" }}>
            Medicamentos disponibles
          </h1>
          <p className="text-sm" style={{ color: A.textMid }}>
            Administración de medicamentos publicados en el sitio público — uno por uno.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* ── Panel lateral: lista ── */}
          <nav aria-label="Lista de medicamentos"
            className="rounded-2xl border p-3 self-start sticky top-20"
            style={{ background: A.surface, borderColor: A.border }}>

            {/* Botón nuevo */}
            <button type="button" onClick={startNew}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold mb-3 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: isNew ? A.brandSoft : "transparent",
                color: isNew ? A.brand : A.textMid,
                border: `1.5px dashed ${isNew ? A.brand : A.border}`,
              }}>
              <IconPlus size={16} stroke={2.5} />
              Nuevo medicamento
            </button>

            {medications.length === 0 && !isNew && (
              <p className="text-xs text-center py-4" style={{ color: A.textLight }}>
                No hay medicamentos registrados.
              </p>
            )}

            <ul className="space-y-1">
              {medications.map((med) => {
                const isSelected = med.id === selectedId;
                return (
                  <li key={med.id}>
                    <button type="button" onClick={() => selectMedication(med)}
                      aria-current={isSelected ? "page" : undefined}
                      className="w-full rounded-xl px-4 py-3 text-left transition-all duration-150"
                      style={{
                        background: isSelected ? A.brandSoft : "transparent",
                        color: isSelected ? A.brand : A.text,
                      }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = A.surfaceAlt; }}
                      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}>
                      <span className="block text-sm font-semibold truncate">{med.name || "Sin nombre"}</span>
                      <span className="block text-xs mt-0.5 font-medium"
                        style={{ color: med.is_active ? A.success : A.textLight }}>
                        {med.is_active ? "Visible" : "Oculto"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Formulario principal ── */}
          <form onSubmit={handleSubmit}
            className="rounded-2xl border p-6"
            style={{ background: A.surface, borderColor: A.border }}>

            {/* Header del formulario */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b"
              style={{ borderColor: A.border }}>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-0.5"
                  style={{ color: A.brand }}>
                  {isNew ? "Nuevo medicamento" : "Editando medicamento"}
                </p>
                <h2 className="font-black text-xl"
                  style={{ color: A.text, letterSpacing: "-0.02em" }}>
                  {isNew ? "Crear registro" : (form.name || "Sin nombre")}
                </h2>
              </div>
              {isDirty && !isSaving && (
                <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: A.warnSoft, color: A.warning }}>
                  Cambios sin guardar
                </span>
              )}
            </div>

            <div className="space-y-6">

              {/* Nombre */}
              <div>
                <Label htmlFor="name" required>Nombre del medicamento</Label>
                <FieldInput id="name" name="name" value={form.name}
                  onChange={handleChange} required
                  placeholder="ej. Imatinib 400 mg"
                  disabled={isSaving} />
              </div>

              {/* Descripción */}
              <div>
                <Label htmlFor="description" required>Descripción</Label>
                <FieldTextarea id="description" name="description" value={form.description}
                  onChange={handleChange} rows={5}
                  placeholder="Describe para qué pacientes está disponible, cómo solicitarlo, condiciones de acceso…"
                  disabled={isSaving} />
              </div>

              {/* Dosis / presentación */}
              <div>
                <Label htmlFor="dosage">Dosis / presentación</Label>
                <FieldInput id="dosage" name="dosage" value={form.dosage}
                  onChange={handleChange}
                  placeholder="ej. Tabletas 400 mg · Caja 30 piezas"
                  disabled={isSaving} />
              </div>

              {/* Imagen */}
              <ImageField
                previewUrl={previewUrl}
                selectedImage={selectedImage}
                onFileChange={(file) => { setSelectedImage(file); setSaveError(""); }}
                disabled={isSaving}
              />

              {/* Visibilidad */}
              <div className="flex items-center gap-4 py-4 px-5 rounded-xl"
                style={{ background: A.surfaceAlt, border: `1px solid ${A.border}` }}>
                <ActiveToggle
                  checked={form.isActive}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* Alertas */}
              {saveError && (
                <div className="flex items-start gap-3 rounded-xl px-5 py-4 border"
                  style={{ background: "#FEF2F2", borderColor: "#FCA5A530", color: "#DC2626" }}>
                  <IconAlertCircle size={17} stroke={2} className="shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">{saveError}</span>
                  <button type="button" onClick={() => setSaveError("")} className="ml-auto">
                    <IconX size={15} stroke={2} />
                  </button>
                </div>
              )}

              {successMessage && (
                <div className="flex items-center gap-3 rounded-xl px-5 py-4 border"
                  style={{ background: A.successSoft, borderColor: `${A.success}30`, color: A.success }}>
                  <IconCheck size={17} stroke={2.5} />
                  <span className="text-sm font-semibold">{successMessage}</span>
                  <button type="button" onClick={() => setSuccessMessage("")} className="ml-auto">
                    <IconX size={15} stroke={2} />
                  </button>
                </div>
              )}

              {/* Acciones */}
              <div className="flex justify-end pt-2">
                <button type="submit"
                  disabled={!isDirty || isSaving}
                  className="inline-flex items-center gap-2.5 font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ background: A.brand, color: "#fff", boxShadow: "0 4px 14px rgba(200,56,79,0.25)" }}>
                  {isSaving
                    ? <><IconLoader2 size={17} stroke={2} style={{ animation: "spin 1s linear infinite" }} /> Guardando…</>
                    : <><IconDeviceFloppy size={17} stroke={2} /> {isNew ? "Crear medicamento" : "Guardar cambios"}</>
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}