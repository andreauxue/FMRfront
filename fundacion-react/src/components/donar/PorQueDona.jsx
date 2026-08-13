// src/public/pages/donar/PorQueDona.jsx
import { C, useReveal } from "./tokens";
import SectionLabel from "./SectionLabel";

export default function PorQueDona() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      style={{ background: C.surface, padding: "7rem 0" }}
      className="px-8 sm:px-14 lg:px-20"
    >
      <div
        style={{ maxWidth: 1280, margin: "0 auto" }}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Texto */}
        <div
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateX(0)" : "translateX(-32px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <SectionLabel>Ayuda en nuestra causa</SectionLabel>
          <h2
            style={{
              fontSize:      "clamp(2rem, 3.5vw, 3rem)",
              fontWeight:    900,
              letterSpacing: "-0.025em",
              lineHeight:    1.15,
              color:         C.text,
              margin:        "0 0 1.5rem",
            }}
          >
            Tu aportación{" "}
            <span style={{ color: C.brand }}>construye realidades</span>
          </h2>
          <p style={{ lineHeight: 1.7, color: C.textMid, marginBottom: "1.25rem", fontSize: "1rem" }}>
            Las donaciones económicas hacen posible que nuestros programas sigan
            creciendo y lleguen a más personas que requieren acompañamiento médico,
            psicológico y social.
          </p>
          <p style={{ lineHeight: 1.7, color: C.textMid, marginBottom: "1.25rem", fontSize: "1rem" }}>
            Con tu aportación, fortalecemos nuestras redes de apoyo, adquirimos
            medicamentos, financiamos tratamientos y continuamos construyendo proyectos
            que mejoran realidades todos los días.
          </p>
          <p style={{ lineHeight: 1.7, color: C.text, fontWeight: 600, fontSize: "1rem", margin: 0 }}>
            Tu apoyo nos impulsa a seguir tejiendo esperanza.
          </p>
        </div>

        {/* Cita visual */}
        <div
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateX(0)" : "translateX(32px)",
            transition: "opacity 1s ease .2s, transform 1s ease .2s",
          }}
        >
          <div
            style={{
              borderRadius: "1.75rem",
              padding:      "2.5rem",
              background:   C.brandSoft,
              position:     "relative",
              overflow:     "hidden",
            }}
          >
            {/* Comilla decorativa */}
            <div
              style={{
                position:   "absolute",
                top:        0,
                right:      0,
                fontSize:   "12rem",
                lineHeight: 1,
                color:      C.brand,
                opacity:    0.07,
                fontWeight: 900,
                transform:  "translate(20%, -20%)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              "
            </div>

            <p
              style={{
                fontSize:   "1.15rem",
                fontWeight: 600,
                fontStyle:  "italic",
                lineHeight: 1.7,
                color:      C.text,
                position:   "relative",
                margin:     "0 0 1.5rem",
              }}
            >
              Cada contribución es administrada con responsabilidad y transparencia,
              y representa una oportunidad más para cambiar vidas.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 2, borderRadius: 99, background: C.brand }} />
              <span style={{
                fontSize:      "0.65rem",
                fontWeight:    800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         C.brand,
              }}>
                Fundación Mejoremos Realidades A.C.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}