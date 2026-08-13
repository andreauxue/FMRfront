// src/public/pages/donar/TransferenciaYCta.jsx
import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconBuildingBank,
  IconCalendarClock,
  IconHeart,
  IconSparkles,
} from "@tabler/icons-react";
import { C, useReveal } from "./tokens";
import SectionLabel from "./SectionLabel";

/* ─── Transferencia próximamente ─────────────────────────────────────────────── */
export function TransferenciaProximamente() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      id="transferencia"
      style={{ background: C.bg, padding: "7rem 0" }}
      className="px-8 sm:px-14 lg:px-20"
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            marginBottom: "3rem",
            opacity:      visible ? 1 : 0,
            transform:    visible ? "translateY(0)" : "translateY(20px)",
            transition:   "opacity .7s ease, transform .7s ease",
          }}
        >
          <SectionLabel>Donación económica</SectionLabel>
          <h2 style={{
            fontSize:      "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight:    900,
            letterSpacing: "-0.025em",
            lineHeight:    1.15,
            color:         C.text,
            margin:        0,
          }}>
            Dona por{" "}
            <span style={{ color: C.brand }}>transferencia bancaria</span>
          </h2>
          <div style={{ width: 56, height: 3, borderRadius: 99, background: C.brand, marginTop: "1.5rem" }} />
        </div>

        {/* Tarjeta */}
        <div
          style={{
            borderRadius: "1.5rem",
            overflow:     "hidden",
            border:       `1px solid ${C.border}`,
            opacity:      visible ? 1 : 0,
            transform:    visible ? "translateY(0)" : "translateY(24px)",
            transition:   "opacity .7s ease .15s, transform .7s ease .15s",
          }}
        >
          {/* Cabecera oscura */}
          <div style={{
            padding:    "1.125rem 1.75rem",
            background: C.text,
            display:    "flex",
            alignItems: "center",
            gap:        10,
          }}>
            <IconBuildingBank size={19} stroke={1.75} style={{ color: C.brand }} />
            <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#fff" }}>
              Datos bancarios
            </span>
          </div>

          {/* Cuerpo */}
          <div style={{
            background: C.surface,
            padding:    "4rem 2.5rem",
            display:    "flex",
            flexWrap:   "wrap",
            alignItems: "center",
            gap:        "2.5rem",
          }}>
            {/* Ícono decorativo */}
            <div style={{
              width:          88,
              height:         88,
              borderRadius:   "1.5rem",
              background:     C.brandSoft,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              flexShrink:     0,
            }}>
              <IconCalendarClock size={40} stroke={1.25} style={{ color: C.brand }} />
            </div>

            <div style={{ flex: 1, minWidth: 240, maxWidth: 520 }}>
              <div style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           6,
                padding:       "4px 14px",
                borderRadius:  "999px",
                background:    C.brandSoft,
                color:         C.brand,
                fontSize:      "0.65rem",
                fontWeight:    800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom:  "1rem",
              }}>
                <IconSparkles size={12} stroke={2} />
                Próximamente
              </div>

              <h3 style={{
                fontSize:      "1.4rem",
                fontWeight:    900,
                letterSpacing: "-0.02em",
                color:         C.text,
                margin:        "0 0 0.75rem",
                lineHeight:    1.2,
              }}>
                Estamos configurando este canal de donación
              </h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: C.textMid, margin: "0 0 1.75rem" }}>
                Pronto podrás realizar tus donativos directamente por transferencia
                bancaria. Mientras tanto, escríbenos y con gusto te orientamos sobre
                cómo apoyar a la Fundación.
              </p>
              <a
                href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           8,
                  fontWeight:    700,
                  fontSize:      "0.875rem",
                  padding:       "0.875rem 1.75rem",
                  borderRadius:  "999px",
                  background:    C.brand,
                  color:         "#fff",
                  textDecoration:"none",
                  transition:    "transform 200ms, box-shadow 200ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(200,56,79,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <IconArrowRight size={16} stroke={2.25} />
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA final ──────────────────────────────────────────────────────────────── */
export function CtaBanner() {
  const [ref, visible] = useReveal();
  const accent = "#F5A623"; // del token C.accent

  return (
    <section
      ref={ref}
      style={{ background: C.brand, padding: "6rem 0" }}
      className="px-8 sm:px-14 lg:px-20"
    >
      <div
        style={{
          maxWidth:   1280,
          margin:     "0 auto",
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity .7s ease, transform .7s ease",
        }}
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <div style={{
            fontSize:      "0.65rem",
            fontWeight:    800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.6)",
            marginBottom:  "0.75rem",
          }}>
            Sé parte del cambio
          </div>
          <h2 style={{
            fontSize:      "clamp(2rem, 5vw, 3rem)",
            fontWeight:    900,
            letterSpacing: "-0.025em",
            lineHeight:    1.15,
            color:         "#fff",
            margin:        0,
          }}>
            Cada acto de generosidad{" "}
            <span style={{ color: accent }}>transforma una vida</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="md:items-end">
          <p style={{
            fontSize:   "1rem",
            lineHeight: 1.7,
            color:      "rgba(255,255,255,0.78)",
            maxWidth:   380,
            margin:     0,
          }}
            className="md:text-right"
          >
            Tu apoyo nos permite acompañar a más pacientes y familias que necesitan
            orientación médica, jurídica y emocional.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              href="#especie"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           8,
                fontWeight:    700,
                fontSize:      "0.9rem",
                padding:       "1rem 2.25rem",
                borderRadius:  "999px",
                background:    "#fff",
                color:         C.brand,
                textDecoration:"none",
                transition:    "transform 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <IconHeart size={17} stroke={2} /> Donar ahora
            </a>
            <Link
              to="/servicios"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           8,
                fontWeight:    600,
                fontSize:      "0.9rem",
                padding:       "1rem 2.25rem",
                borderRadius:  "999px",
                border:        "2px solid rgba(255,255,255,0.45)",
                color:         "#fff",
                textDecoration:"none",
                transition:    "transform 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Nuestros servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}