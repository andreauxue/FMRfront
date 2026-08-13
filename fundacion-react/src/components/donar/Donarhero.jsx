// src/public/pages/donar/DonarHero.jsx
import { useEffect, useState } from "react";
import {
  IconGift,
  IconHeart,
  IconPill,
  IconUsers,
} from "@tabler/icons-react";
import { C } from "./tokens";
import SectionLabel from "./SectionLabel";

const PILLARS = [
  {
    icon: IconPill,
    title: "Medicamentos",
    body: "Adquirimos y entregamos medicamentos especializados a pacientes inscritos.",
  },
  {
    icon: IconUsers,
    title: "Acompañamiento",
    body: "Financiamos programas médicos, psicológicos y jurídicos sin costo para el paciente.",
  },
  {
    icon: IconHeart,
    title: "Transparencia",
    body: "Cada contribución se administra con responsabilidad y rendición de cuentas.",
  },
];

export default function DonarHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const rise = (delay = 0) => ({
    transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    opacity:   mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
  });

  return (
    /*
      La sección es position:relative y ocupa el ancho completo de la ventana.
      No tiene padding horizontal propio — el contenido interno se encarga de eso.
    */
    <section
      style={{
        position:   "relative",
        overflow:   "hidden",
        background: "#fff",
        minHeight:  "90vh",
        display:    "flex",
        alignItems: "stretch",
      }}
    >
      {/* ── Imagen pegada al borde derecho y superior ── */}
      <div
        style={{
          position: "absolute",
          top:      0,
          right:    0,
          /* Ocupa ~42% del ancho de la pantalla */
          width:    "42%",
          height:   "100%",
          zIndex:   0,
        }}
      >
        <img
          src="/home/dona2.JPG"
          alt="Voluntaria de la Fundación Mejoremos Realidades"
          style={{
            width:          "100%",
            height:         "100%",
            objectFit:      "cover",
            objectPosition: "center top",
            display:        "block",
          }}
        />
        {/* Gradiente izquierdo: funde imagen con fondo blanco */}
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.6) 25%, transparent 55%)",
          pointerEvents: "none",
        }} />
        {/* Gradiente inferior: cierra suavemente hacia el blanco */}
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to top, #ffffff 0%, transparent 18%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Contenido — sobre la imagen ── */}
      <div
        style={{
          position:  "relative",
          zIndex:    1,
          width:     "100%",
          maxWidth:  1280,
          margin:    "0 auto",
          padding:   "8rem 2rem 5rem 4rem",
          /* El contenido ocupa ~55% del ancho para no pisar la imagen */
          display:   "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Limitar ancho del texto */}
        <div style={{ maxWidth: 580 }}>

          {/* Eyebrow */}
          <div style={rise(0)}>
            <SectionLabel>Donaciones</SectionLabel>
          </div>

          {/* Título */}
          <h1
            style={{
              ...rise(100),
              fontSize:      "clamp(2.8rem, 5vw, 5rem)",
              fontWeight:    900,
              letterSpacing: "-0.03em",
              lineHeight:    1.05,
              color:         C.text,
              margin:        "0 0 1.25rem",
            }}
          >
            ¡Únete a la red de{" "}
            <span style={{ color: C.brand }}>esperanza</span>!
          </h1>

          {/* Descripción */}
          <p
            style={{
              ...rise(200),
              fontSize:     "1.05rem",
              lineHeight:   1.7,
              color:        C.textMid,
              margin:       "0 0 2.25rem",
            }}
          >
            Cuando donas, tu apoyo cruza fronteras y se convierte en fuerza
            para quien lucha día a día. Cada gesto solidario cambia una historia.
          </p>

          {/* CTAs */}
          <div style={{ ...rise(290), display: "flex", flexWrap: "wrap", gap: 12, marginBottom: "3rem" }}>
            <a
              href="#especie"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           8,
                fontWeight:    700,
                fontSize:      "0.9rem",
                padding:       "0.875rem 1.75rem",
                borderRadius:  "999px",
                background:    C.brand,
                color:         "#fff",
                textDecoration:"none",
                boxShadow:     "0 4px 16px rgba(200,56,79,0.28)",
                transition:    "transform 200ms, box-shadow 200ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(200,56,79,0.38)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(200,56,79,0.28)";
              }}
            >
              <IconGift size={16} stroke={2} />
              Donar en especie
            </a>
            <a
              href="#medicamentos"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           8,
                fontWeight:    600,
                fontSize:      "0.9rem",
                padding:       "0.875rem 1.75rem",
                borderRadius:  "999px",
                border:        `1.5px solid ${C.border}`,
                color:         C.textMid,
                textDecoration:"none",
                transition:    "transform 200ms, border-color 150ms, color 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform   = "translateY(-2px)";
                e.currentTarget.style.borderColor = C.brand;
                e.currentTarget.style.color       = C.brand;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform   = "translateY(0)";
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.color       = C.textMid;
              }}
            >
              <IconPill size={16} stroke={2} />
              Ver medicamentos
            </a>
          </div>

          {/* Divisor */}
          <div style={{ ...rise(370), borderTop: `1px solid ${C.border}`, paddingTop: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {PILLARS.map(({ icon: Icon, title, body }) => (
                <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{
                    width:          34,
                    height:         34,
                    borderRadius:   "0.6rem",
                    background:     C.brandSoft,
                    color:          C.brand,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                  }}>
                    <Icon size={16} stroke={2} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: C.text, marginBottom: 2 }}>
                      {title}
                    </div>
                    <p style={{ fontSize: "0.8rem", lineHeight: 1.55, color: C.textMid, margin: 0 }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Chip flotante sobre la imagen */}
      <div style={{
        position:   "absolute",
        bottom:     "2.5rem",
        right:      "2rem",
        zIndex:     2,
        display:    "inline-flex",
        alignItems: "center",
        gap:        8,
        padding:    "0.55rem 1.1rem",
        borderRadius: "999px",
        background:  "#fff",
        boxShadow:   "0 8px 28px rgba(0,0,0,0.13)",
        fontSize:    "0.78rem",
        fontWeight:  700,
        color:       C.text,
        opacity:     mounted ? 1 : 0,
        transition:  "opacity 1s ease 600ms",
      }}>
        <span style={{
          width:        8,
          height:       8,
          borderRadius: "50%",
          background:   C.brand,
          display:      "inline-block",
          flexShrink:   0,
        }} />
        Cambiando realidades
      </div>
    </section>
  );
}