// src/public/pages/donar/MedicamentosStock.jsx
import { useState } from "react";
import {
  IconAlertCircle,
  IconArrowRight,
  IconHeart,
  IconLoader2,
  IconPill,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useMedications } from "../../hooks/useMedications";
import { C, useReveal } from "../donar/tokens";
import SectionLabel from "../donar/SectionLabel";

/* ─── Tarjeta de medicamento ─────────────────────────────────────────────────── */
function MedCard({ med, index }) {
  const [imgError, setImgError] = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const [ref, visible] = useReveal();

  const hasImage = med.imageUrl && !imgError;

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     "relative",
        borderRadius: "1.5rem",
        overflow:     "hidden",
        border:       `1px solid ${C.border}`,
        background:   C.surface,
        display:      "flex",
        flexDirection:"column",
        cursor:       "default",
        /* Reveal animation */
        opacity:      visible ? 1 : 0,
        transform:    visible
          ? "translateY(0) scale(1)"
          : "translateY(28px) scale(0.98)",
        transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${index * 70}ms,
                     transform .55s cubic-bezier(.16,1,.3,1) ${index * 70}ms,
                     box-shadow .3s`,
        boxShadow:    hovered
          ? "0 20px 48px rgba(0,0,0,0.13)"
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Imagen / placeholder ── */}
      <div style={{ position: "relative", height: 200, flexShrink: 0 }}>
        {hasImage ? (
          <img
            src={med.imageUrl}
            alt={med.name}
            onError={() => setImgError(true)}
            style={{
              width:      "100%",
              height:     "100%",
              objectFit:  "cover",
              display:    "block",
              transition: "transform 600ms cubic-bezier(.16,1,.3,1)",
              transform:  hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          /* Placeholder con patrón de cápsulas SVG */
          <div style={{
            width:     "100%",
            height:    "100%",
            background:`linear-gradient(135deg, ${C.brandDark} 0%, ${C.brand} 60%, #E8526A 100%)`,
            display:   "flex",
            alignItems:"center",
            justifyContent:"center",
            position:  "relative",
            overflow:  "hidden",
          }}>
            {/* Patrón decorativo de cápsulas */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}
              viewBox="0 0 200 200"
              preserveAspectRatio="xMidYMid slice"
            >
              {[
                [20, 30, 30], [80, 10, -20], [140, 50, 15],
                [10, 90, 45], [60, 70, -30], [120, 100, 10],
                [170, 20, -15],[30, 140, 35],[90, 160, -25],
                [150, 140, 20],[50, 180, 0], [160, 170, 40],
              ].map(([x, y, rot], i) => (
                <rect
                  key={i}
                  x={x} y={y}
                  width={28} height={11}
                  rx={5.5}
                  fill="#fff"
                  transform={`rotate(${rot} ${x + 14} ${y + 5.5})`}
                />
              ))}
            </svg>
            <IconPill size={44} stroke={1.25} style={{ color: "#fff", opacity: 0.7, position: "relative" }} />
          </div>
        )}

        {/* Gradiente sobre imagen para leer el badge */}
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 50%)",
          pointerEvents:"none",
        }} />

        {/* Badge cantidad */}
        <div style={{
          position:      "absolute",
          top:           12,
          right:         12,
          padding:       "4px 10px",
          borderRadius:  "999px",
          fontSize:      "0.7rem",
          fontWeight:    800,
          letterSpacing: "0.04em",
          background:    med.quantity <= 5 ? "rgba(217,119,6,0.92)" : "rgba(22,163,74,0.88)",
          color:         "#fff",
          backdropFilter:"blur(4px)",
        }}>
          {med.quantity <= 0
            ? "Sin stock"
            : med.quantity <= 5
              ? `${med.quantity} disponible${med.quantity !== 1 ? "s" : ""}`
              : "Disponible"}
        </div>

        {/* Badge código */}
        {med.articleCode && (
          <div style={{
            position:      "absolute",
            top:           12,
            left:          12,
            padding:       "4px 10px",
            borderRadius:  "999px",
            fontSize:      "0.65rem",
            fontWeight:    700,
            fontFamily:    "monospace",
            background:    "rgba(0,0,0,0.45)",
            color:         "rgba(255,255,255,0.9)",
            backdropFilter:"blur(4px)",
            letterSpacing: "0.06em",
          }}>
            {med.articleCode}
          </div>
        )}
      </div>

      {/* ── Acento izquierdo animado (firma visual) ── */}
      <div style={{
        position:   "absolute",
        left:       0,
        top:        200,           /* Debajo de la imagen */
        bottom:     0,
        width:      hovered ? 4 : 3,
        background: C.brand,
        transition: "width 250ms ease",
        borderRadius: "0 2px 2px 0",
      }} />

      {/* ── Contenido ── */}
      <div style={{
        flex:    1,
        padding: "1.25rem 1.25rem 1.25rem 1.5rem",
        display: "flex",
        flexDirection:"column",
      }}>
        <h3 style={{
          fontSize:      "1rem",
          fontWeight:    800,
          letterSpacing: "-0.02em",
          color:         C.text,
          margin:        "0 0 0.5rem",
          lineHeight:    1.3,
        }}>
          {med.name}
        </h3>

        {med.description && (
          <p style={{
            fontSize:   "0.82rem",
            lineHeight: 1.6,
            color:      C.textMid,
            margin:     "0 0 1rem",
            flex:       1,
            /* 3 líneas máximo */
            display:           "-webkit-box",
            WebkitLineClamp:   3,
            WebkitBoxOrient:   "vertical",
            overflow:          "hidden",
          }}>
            {med.description}
          </p>
        )}

        {/* CTA */}
        <a
          href="https://fmejoremosrealidades.org/donar#53446785-6773-4e8f-add1-9ddc3f613b82"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            6,
            fontSize:       "0.82rem",
            fontWeight:     700,
            color:          C.brand,
            textDecoration: "none",
            marginTop:      "auto",
            paddingTop:     4,
          }}
        >
          Solicitar
          <IconArrowRight
            size={14}
            stroke={2.25}
            style={{
              transition: "transform 200ms",
              transform:  hovered ? "translateX(4px)" : "translateX(0)",
            }}
          />
        </a>
      </div>
    </article>
  );
}

/* ─── Estado de carga ────────────────────────────────────────────────────────── */
function LoadingGrid() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "5rem 0" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <IconLoader2
        size={36}
        stroke={1.75}
        style={{ color: C.brand, animation: "spin 1s linear infinite" }}
      />
      <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", margin: 0 }}>
        Cargando medicamentos…
      </p>
    </div>
  );
}

/* ─── Sección principal ──────────────────────────────────────────────────────── */
export default function MedicamentosStock() {
  const { medications, isLoading, error } = useMedications();
  const [query,  setQuery]  = useState("");
  const [focused, setFocused] = useState(false);
  const [ref, visible] = useReveal();

  const available = medications.filter((m) => m.available);

  const filtered = available.filter((m) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      (m.description || "").toLowerCase().includes(q) ||
      (m.articleCode || "").toLowerCase().includes(q)
    );
  });

  return (
    <section
      ref={ref}
      id="medicamentos"
      style={{ background: C.text, padding: "7rem 0" }}
      className="px-8 sm:px-14 lg:px-20"
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div
          style={{
            marginBottom: "3.5rem",
            opacity:      visible ? 1 : 0,
            transform:    visible ? "translateY(0)" : "translateY(20px)",
            transition:   "opacity .7s ease, transform .7s ease",
          }}
        >
          <SectionLabel light>Catálogo de medicamentos</SectionLabel>

          <div style={{
            display:        "flex",
            flexWrap:       "wrap",
            alignItems:     "flex-end",
            justifyContent: "space-between",
            gap:            "1.5rem",
          }}>
            <div>
              <h2 style={{
                fontSize:      "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight:    900,
                letterSpacing: "-0.025em",
                lineHeight:    1.1,
                color:         "#fff",
                margin:        0,
              }}>
                Medicamentos{" "}
                <span style={{ color: C.brand }}>disponibles</span>{" "}
                para entrega inmediata
              </h2>
              <p style={{
                marginTop:  "0.75rem",
                fontSize:   "0.9rem",
                lineHeight: 1.65,
                color:      "rgba(255,255,255,0.58)",
                maxWidth:   540,
              }}>
                Algunos se entregan de manera gratuita; otros tienen un precio
                especial para pacientes inscritos a la Fundación.
              </p>
            </div>

            {/* Buscador unificado */}
            {!isLoading && !error && available.length > 0 && (
              <div style={{
                display:       "flex",
                alignItems:    "center",
                gap:           8,
                padding:       "0.55rem 1rem",
                borderRadius:  "999px",
                border:        `1.5px solid ${focused ? C.brand : "rgba(255,255,255,0.18)"}`,
                background:    "rgba(255,255,255,0.07)",
                backdropFilter:"blur(8px)",
                transition:    "border-color 150ms, box-shadow 150ms",
                boxShadow:     focused ? `0 0 0 3px ${C.brand}22` : "none",
                minWidth:      220,
              }}>
                <IconSearch size={14} stroke={2} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Buscar…"
                  style={{
                    flex:       1,
                    border:     "none",
                    outline:    "none",
                    background: "transparent",
                    fontSize:   "0.875rem",
                    color:      "#fff",
                    minWidth:   120,
                  }}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", display: "flex", padding: 2 }}
                  >
                    <IconX size={13} stroke={2} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Divisor brand */}
          <div style={{ width: 56, height: 3, borderRadius: 99, background: C.brand, marginTop: "1.5rem" }} />
        </div>

        {/* ── Estados ── */}
        {isLoading && <LoadingGrid />}

        {!isLoading && error && (
          <div style={{
            display:      "flex",
            alignItems:   "flex-start",
            gap:          12,
            padding:      "1.5rem",
            borderRadius: "1rem",
            background:   "rgba(255,255,255,0.06)",
            border:       "1px solid rgba(255,255,255,0.1)",
            maxWidth:     480,
          }}>
            <IconAlertCircle size={18} stroke={1.75} style={{ color: C.brand, flexShrink: 0 }} />
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", margin: 0 }}>{error}</p>
          </div>
        )}

        {/* ── Grid catálogo ── */}
        {!isLoading && !error && (
          <>
            {filtered.length > 0 ? (
              <div style={{
                display:             "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap:                 "1.25rem",
              }}>
                {filtered.map((med, i) => (
                  <MedCard key={med.id} med={med} index={i} />
                ))}
              </div>
            ) : (
              /* Vacío */
              <div style={{ textAlign: "center", padding: "5rem 0" }}>
                <div style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  width:          64,
                  height:         64,
                  borderRadius:   "1.25rem",
                  background:     "rgba(255,255,255,0.07)",
                  marginBottom:   "1rem",
                }}>
                  <IconPill size={30} stroke={1.25} style={{ color: C.brand }} />
                </div>
                <p style={{ fontWeight: 800, fontSize: "1.05rem", color: "#fff", margin: "0 0 6px" }}>
                  {query ? "Sin resultados" : "Sin medicamentos disponibles"}
                </p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.48)", margin: 0, maxWidth: 280, marginInline: "auto" }}>
                  {query
                    ? `No encontramos medicamentos con "${query}".`
                    : "Pronto publicaremos los medicamentos disponibles."}
                </p>
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    style={{
                      marginTop:    "1rem",
                      padding:      "0.5rem 1.25rem",
                      borderRadius: "999px",
                      border:       `1.5px solid ${C.brand}`,
                      background:   "transparent",
                      color:        C.brand,
                      fontWeight:   700,
                      fontSize:     "0.8rem",
                      cursor:       "pointer",
                    }}
                  >
                    Limpiar búsqueda
                  </button>
                )}
              </div>
            )}

            {/* CTA: no encuentras tu medicamento */}
            {available.length > 0 && (
              <div style={{
                marginTop:      "3rem",
                padding:        "2rem 2.5rem",
                borderRadius:   "1.5rem",
                background:     "rgba(255,255,255,0.05)",
                border:         "1px solid rgba(255,255,255,0.1)",
                display:        "flex",
                flexWrap:       "wrap",
                alignItems:     "center",
                justifyContent: "space-between",
                gap:            "1.25rem",
              }}>
                <div>
                  <p style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.brand, margin: "0 0 4px" }}>
                    ¿No encuentras el que necesitas?
                  </p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff", margin: 0 }}>
                    Escríbenos — evaluamos cada caso de manera personalizada.
                  </p>
                </div>
                <a
                  href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:       "inline-flex",
                    alignItems:    "center",
                    gap:           8,
                    padding:       "0.75rem 1.75rem",
                    borderRadius:  "999px",
                    background:    C.brand,
                    color:         "#fff",
                    fontWeight:    700,
                    fontSize:      "0.875rem",
                    textDecoration:"none",
                    whiteSpace:    "nowrap",
                    flexShrink:    0,
                    transition:    "transform 200ms, box-shadow 200ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(200,56,79,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <IconHeart size={15} stroke={2} /> Contactar
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}