import { useCallback, useEffect, useMemo, useState } from "react";
import {
  IconAlertCircle,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconX,
  IconPackage,
  IconLoader2,
  IconAlertTriangle,
} from "@tabler/icons-react";

import MedicineModal from "../components/MedicineModal";
import MedicineRow   from "../components/MedicineRow";
import {
  deleteMedicineRequest,
  getMedicinesRequest,
} from "../services/medicines";

/* ─── Tokens ─────────────────────────────────────────────────────────────────── */
const C = {
  brand:       "#C8384F",
  brandSoft:   "#FAE8EB",
  brandMid:    "#A8293E",
  bg:          "#F0F2F5",
  surface:     "#FFFFFF",
  surfaceAlt:  "#F7F8FA",
  text:        "#111827",
  textMid:     "#4B5563",
  textLight:   "#9CA3AF",
  border:      "#E5E7EB",
  warning:     "#D97706",
  warningSoft: "#FEF3C7",
  error:       "#DC2626",
  errorSoft:   "#FEF2F2",
  success:     "#16A34A",
  successSoft: "#DCFCE7",
};

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function TableHeader({ children, style = {} }) {
  return (
    <th
      style={{
        textAlign:      "left",
        padding:        "0.875rem 1.25rem",
        fontSize:       "0.7rem",
        fontWeight:     800,
        textTransform:  "uppercase",
        letterSpacing:  "0.08em",
        whiteSpace:     "nowrap",
        color:          C.textLight,
        ...style,
      }}
    >
      {children}
    </th>
  );
}

/* ─── Stat chip del encabezado ───────────────────────────────────────────────── */
function StatChip({ label, value, accent }) {
  return (
    <div style={{
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "flex-start",
      padding:        "0.6rem 1rem",
      borderRadius:   "0.75rem",
      background:     accent + "12",
      border:         `1px solid ${accent}22`,
      minWidth:       80,
    }}>
      <span style={{ fontSize: "1.35rem", fontWeight: 900, color: accent, lineHeight: 1, letterSpacing: "-0.03em" }}>
        {value}
      </span>
      <span style={{ fontSize: "0.68rem", fontWeight: 600, color: C.textLight, marginTop: 3, letterSpacing: "0.03em" }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Loading ────────────────────────────────────────────────────────────────── */
function LoadingScreen() {
  return (
    <div style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 0", background: C.bg }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <IconLoader2 size={32} stroke={1.75} style={{ color: C.brand, animation: "spin 1s linear infinite" }} />
        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: C.textMid, margin: 0 }}>
          Cargando medicamentos…
        </p>
      </div>
    </div>
  );
}

/* ─── Modal confirmar eliminar ───────────────────────────────────────────────── */
function DeleteConfirmModal({ medicine, onConfirm, onCancel, loading }) {
  useEffect(() => {
    if (!medicine) return;
    const onKey = (e) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [medicine, onCancel]);

  const open = !!medicine;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         60,
        background:     "rgba(17,24,39,0.5)",
        backdropFilter: "blur(4px)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "1.5rem",
        opacity:        open ? 1 : 0,
        pointerEvents:  open ? "auto" : "none",
        transition:     "opacity 200ms ease",
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        style={{
          background:    C.surface,
          borderRadius:  "1.5rem",
          border:        `1px solid ${C.border}`,
          boxShadow:     "0 32px 80px rgba(0,0,0,0.22)",
          width:         "100%",
          maxWidth:      400,
          padding:       "2rem",
          transform:     open ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)",
          transition:    "transform 220ms cubic-bezier(0.34,1.4,0.64,1)",
        }}
      >
        {/* Ícono */}
        <div style={{
          width:          48,
          height:         48,
          borderRadius:   "0.875rem",
          background:     C.errorSoft,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          marginBottom:   "1.25rem",
        }}>
          <IconAlertTriangle size={24} stroke={2} style={{ color: C.error }} />
        </div>

        <h3 style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", color: C.text, margin: "0 0 0.5rem" }}>
          ¿Ocultar medicamento?
        </h3>
        <p style={{ fontSize: "0.875rem", color: C.textMid, margin: "0 0 1.75rem", lineHeight: 1.6 }}>
          <strong style={{ color: C.text, fontWeight: 700 }}>{medicine?.name}</strong> dejará de
          aparecer en el inventario. Se puede restaurar desde la base de datos.
        </p>

        <div style={{ display: "flex", gap: "0.625rem", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{
              padding:      "0.6rem 1.25rem",
              borderRadius: "0.75rem",
              border:       `1.5px solid ${C.border}`,
              background:   C.surface,
              color:        C.textMid,
              fontWeight:   700,
              fontSize:     "0.85rem",
              cursor:       "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.surfaceAlt; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.surface; }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          6,
              padding:      "0.6rem 1.25rem",
              borderRadius: "0.75rem",
              border:       "none",
              background:   C.error,
              color:        "#fff",
              fontWeight:   700,
              fontSize:     "0.85rem",
              cursor:       loading ? "not-allowed" : "pointer",
              opacity:      loading ? 0.7 : 1,
            }}
          >
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            {loading && <IconLoader2 size={14} style={{ animation: "spin 0.8s linear infinite" }} />}
            Ocultar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Página principal ───────────────────────────────────────────────────────── */
export default function AdminMedicamentos() {
  const [medicines,       setMedicines]       = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState("");
  const [search,          setSearch]          = useState("");
  const [modalOpen,       setModalOpen]       = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [deletingMedicine,setDeletingMedicine]= useState(null);
  const [deleteLoading,   setDeleteLoading]   = useState(false);
  const [searchFocused,   setSearchFocused]   = useState(false);

  const loadMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMedicinesRequest();
      setMedicines(Array.isArray(data) ? data : data.medicines ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible cargar los medicamentos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMedicines(); }, [loadMedicines]);

  /* Stats derivados */
  const stats = useMemo(() => ({
    total:   medicines.length,
    low:     medicines.filter((m) => m.quantity > 0 && m.quantity <= 5).length,
    empty:   medicines.filter((m) => m.quantity <= 0).length,
  }), [medicines]);

  const filteredMedicines = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return medicines;
    return medicines.filter((m) =>
      [m.articleCode, m.name, m.description, m.area, m.shelf]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [medicines, search]);

  function openCreate()       { setEditingMedicine(null); setModalOpen(true); }
  function openEdit(medicine) { setEditingMedicine(medicine); setModalOpen(true); }
  function closeModal()       { setModalOpen(false); setEditingMedicine(null); }
  function requestDelete(m)   { setDeletingMedicine(m); }
  function cancelDelete()     { setDeletingMedicine(null); }

  async function confirmDelete() {
    if (!deletingMedicine) return;
    try {
      setDeleteLoading(true);
      await deleteMedicineRequest(deletingMedicine.id);
      setDeletingMedicine(null);
      await loadMedicines();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible eliminar el medicamento.");
      setDeletingMedicine(null);
    } finally {
      setDeleteLoading(false);
    }
  }

  if (loading) return <LoadingScreen />;

  return (
    <div style={{ minHeight: "100%", background: C.bg }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* ══════════════════════════════════════════
            ENCABEZADO — banda con stats integrados
            ══════════════════════════════════════════ */}
        <div style={{
          background:    C.surface,
          borderRadius:  "1.25rem",
          border:        `1px solid ${C.border}`,
          padding:       "1.5rem 1.75rem",
          marginBottom:  "1.25rem",
          display:       "flex",
          flexWrap:      "wrap",
          alignItems:    "center",
          gap:           "1.25rem",
          justifyContent:"space-between",
        }}>
          {/* Título + stats */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              {/* Eyebrow */}
              <p style={{
                fontSize:      "0.65rem",
                fontWeight:    800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         C.brand,
                margin:        "0 0 4px",
              }}>
                Inventario
              </p>
              <h1 style={{
                fontSize:      "1.6rem",
                fontWeight:    900,
                letterSpacing: "-0.03em",
                color:         C.text,
                margin:        0,
                lineHeight:    1,
              }}>
                Medicamentos
              </h1>
            </div>

            {/* Separador vertical */}
            <div style={{ width: 1, height: 40, background: C.border, flexShrink: 0 }} />

            {/* Chips */}
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
              <StatChip label="en inventario" value={stats.total}  accent={C.brand} />
              {stats.low   > 0 && <StatChip label="stock bajo"    value={stats.low}   accent={C.warning} />}
              {stats.empty > 0 && <StatChip label="sin stock"     value={stats.empty} accent={C.error}   />}
            </div>
          </div>

          {/* Botón crear */}
          <button
            type="button"
            onClick={openCreate}
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           7,
              padding:       "0.7rem 1.375rem",
              borderRadius:  "0.875rem",
              border:        "none",
              background:    C.brand,
              color:         "#fff",
              fontSize:      "0.875rem",
              fontWeight:    800,
              cursor:        "pointer",
              boxShadow:     "0 4px 14px rgba(200,56,79,0.3)",
              transition:    "transform 150ms, box-shadow 150ms",
              flexShrink:    0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform  = "translateY(-1px)";
              e.currentTarget.style.boxShadow  = "0 6px 18px rgba(200,56,79,0.38)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform  = "translateY(0)";
              e.currentTarget.style.boxShadow  = "0 4px 14px rgba(200,56,79,0.3)";
            }}
          >
            <IconPlus size={16} stroke={2.75} />
            Registrar medicamento
          </button>
        </div>

        {/* ── Error ── */}
        {error && (
          <div style={{
            display:       "flex",
            alignItems:    "center",
            justifyContent:"space-between",
            gap:           12,
            background:    C.errorSoft,
            border:        `1px solid ${C.error}28`,
            borderRadius:  "0.875rem",
            padding:       "0.875rem 1.125rem",
            marginBottom:  "1.25rem",
            color:         C.error,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <IconAlertCircle size={16} stroke={2} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{error}</span>
            </div>
            <button
              onClick={() => setError("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: C.error, display:"flex" }}
            >
              <IconX size={15} stroke={2} />
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════
            BARRA DE BÚSQUEDA
            ══════════════════════════════════════════ */}
        <div style={{
          background:    C.surface,
          borderRadius:  "1rem",
          border:        `1.5px solid ${searchFocused ? C.brand : C.border}`,
          boxShadow:     searchFocused ? `0 0 0 3px ${C.brand}16` : "none",
          padding:       "0.5rem 0.75rem",
          marginBottom:  "1rem",
          display:       "flex",
          alignItems:    "center",
          gap:           "0.5rem",
          transition:    "border-color 150ms, box-shadow 150ms",
        }}>
          <IconSearch size={16} stroke={2} style={{ color: C.textLight, flexShrink: 0 }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Buscar por nombre, código, área o estante…"
            style={{
              flex:       1,
              border:     "none",
              outline:    "none",
              background: "transparent",
              fontSize:   "0.875rem",
              color:      C.text,
              padding:    "0.35rem 0",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: C.textLight, display:"flex", padding: 4 }}
            >
              <IconX size={14} stroke={2} />
            </button>
          )}
          {/* Separador */}
          <div style={{ width: 1, height: 20, background: C.border }} />
          <button
            type="button"
            onClick={loadMedicines}
            title="Recargar"
            style={{
              display:       "flex",
              alignItems:    "center",
              justifyContent:"center",
              width:          34,
              height:         34,
              borderRadius:   "0.6rem",
              border:         "none",
              background:     "transparent",
              color:          C.textLight,
              cursor:         "pointer",
              transition:     "background 150ms, color 150ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.surfaceAlt; e.currentTarget.style.color = C.textMid; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textLight; }}
          >
            <IconRefresh size={15} stroke={2} />
          </button>
        </div>

        {/* ══════════════════════════════════════════
            TABLA
            ══════════════════════════════════════════ */}
        <div style={{
          background:    C.surface,
          borderRadius:  "1.25rem",
          border:        `1px solid ${C.border}`,
          overflow:      "hidden",
          boxShadow:     "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          {filteredMedicines.length === 0 ? (
            /* ── Estado vacío ── */
            <div style={{ padding: "6rem 1rem", textAlign: "center" }}>
              <div style={{
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
                width:          64,
                height:         64,
                borderRadius:   "1.25rem",
                background:     C.surfaceAlt,
                marginBottom:   "1rem",
              }}>
                <IconPackage size={28} stroke={1.25} style={{ color: C.textLight }} />
              </div>
              <p style={{ fontSize: "1rem", fontWeight: 800, color: C.text, margin: "0 0 6px" }}>
                {search ? "Sin resultados" : "Sin medicamentos"}
              </p>
              <p style={{ fontSize: "0.85rem", color: C.textLight, margin: "0 auto 1.5rem", maxWidth: 280 }}>
                {search
                  ? `Ningún medicamento coincide con "${search}".`
                  : "Registra el primer medicamento del inventario."}
              </p>
              {!search && (
                <button
                  type="button"
                  onClick={openCreate}
                  style={{
                    display:      "inline-flex",
                    alignItems:   "center",
                    gap:          6,
                    padding:      "0.6rem 1.25rem",
                    borderRadius: "0.75rem",
                    border:       "none",
                    background:   C.brand,
                    color:        "#fff",
                    fontSize:     "0.875rem",
                    fontWeight:   700,
                    cursor:       "pointer",
                  }}
                >
                  <IconPlus size={15} stroke={2.5} />
                  Registrar ahora
                </button>
              )}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ background: C.surfaceAlt, borderBottom: `1px solid ${C.border}` }}>
                    <TableHeader>Imagen</TableHeader>
                    <TableHeader>No. artículo</TableHeader>
                    <TableHeader>Medicamento</TableHeader>
                    <TableHeader>Área</TableHeader>
                    <TableHeader>Estante</TableHeader>
                    <TableHeader>Cantidad</TableHeader>
                    <TableHeader>Caducidad</TableHeader>
                    <TableHeader style={{ textAlign: "right" }}>Acciones</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedicines.map((medicine) => (
                    <MedicineRow
                      key={medicine.id}
                      medicine={medicine}
                      onEdit={openEdit}
                      onDelete={requestDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pie de tabla */}
          {filteredMedicines.length > 0 && (
            <div style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              padding:        "0.875rem 1.25rem",
              borderTop:      `1px solid ${C.border}`,
              background:     C.surfaceAlt,
            }}>
              <p style={{ fontSize: "0.75rem", color: C.textLight, margin: 0 }}>
                {filteredMedicines.length === medicines.length
                  ? `${medicines.length} medicamento${medicines.length !== 1 ? "s" : ""} en total`
                  : `${filteredMedicines.length} de ${medicines.length} medicamentos`}
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    fontSize:   "0.75rem",
                    fontWeight: 700,
                    color:      C.brand,
                    background: "none",
                    border:     "none",
                    cursor:     "pointer",
                    padding:    0,
                  }}
                >
                  Limpiar filtro
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ── Modales ── */}
      <MedicineModal
        open={modalOpen}
        medicine={editingMedicine}
        onClose={closeModal}
        onCreated={loadMedicines}
        onUpdated={loadMedicines}
      />
      <DeleteConfirmModal
        medicine={deletingMedicine}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleteLoading}
      />
    </div>
  );
}