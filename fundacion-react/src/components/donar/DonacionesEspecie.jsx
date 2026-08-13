// src/public/pages/donar/DonacionesEspecie.jsx
import {
  IconGift,
  IconHeart,
  IconPackage,
  IconPill,
} from "@tabler/icons-react";
import { C, useReveal } from "./tokens";
import SectionLabel from "./SectionLabel";

const ACCEPTS = [
  {
    icon:  IconPill,
    label: "Medicamentos",
    note:  "En buen estado, sin abrir o con fecha vigente",
  },
  {
    icon:  IconPackage,
    label: "Insumos médicos",
    note:  "Jeringas, guantes, material de curación, etc.",
  },
  {
    icon:  IconHeart,
    label: "Artículos de higiene",
    note:  "Jabón, alcohol, mascarillas y similares",
  },
  {
    icon:  IconGift,
    label: "Otros artículos",
    note:  "Contáctanos para verificar si aplica",
  },
];

export default function DonacionesEspecie() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      id="especie"
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
          <SectionLabel>Donaciones en especie</SectionLabel>
          <h2
            style={{
              fontSize:      "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight:    900,
              letterSpacing: "-0.025em",
              lineHeight:    1.15,
              color:         C.text,
              margin:        "0 0 1.5rem",
            }}
          >
            Dona{" "}
            <span style={{ color: C.brand }}>medicamentos,</span>{" "}
            insumos o artículos
          </h2>
          <p style={{ lineHeight: 1.7, color: C.textMid, marginBottom: "1.25rem", fontSize: "1rem" }}>
            Si cuentas con medicamentos en buen estado, insumos médicos, artículos de
            higiene o cualquier otro recurso que pueda beneficiar a nuestros pacientes,
            puedes donarlo en especie.
          </p>
          <p style={{ lineHeight: 1.7, color: C.textMid, marginBottom: "2rem", fontSize: "1rem" }}>
            Contáctanos primero para coordinar la entrega y asegurarnos de que llegue
            a quien más lo necesita de la manera más eficiente.
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
              padding:       "1rem 2rem",
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
            <IconPackage size={16} stroke={2} />
            Coordinar donación en especie
          </a>
        </div>

        {/* ¿Qué aceptamos? */}
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
              padding:      "2rem",
              background:   C.bg,
              border:       `1px solid ${C.border}`,
            }}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: C.text, margin: "0 0 1.5rem" }}>
              ¿Qué podemos recibir?
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {ACCEPTS.map(({ icon: Icon, label, note }, i) => (
                <div
                  key={label}
                  style={{
                    display:       "flex",
                    alignItems:    "flex-start",
                    gap:           14,
                    paddingTop:    i === 0 ? 0 : "1rem",
                    paddingBottom: i === ACCEPTS.length - 1 ? 0 : "1rem",
                    borderBottom:  i === ACCEPTS.length - 1 ? "none" : `1px solid ${C.border}`,
                  }}
                >
                  <div style={{
                    width:          40,
                    height:         40,
                    borderRadius:   "0.75rem",
                    background:     C.brandSoft,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                    color:          C.brand,
                  }}>
                    <Icon size={19} stroke={1.75} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: C.text, marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: C.textMid }}>
                      {note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}