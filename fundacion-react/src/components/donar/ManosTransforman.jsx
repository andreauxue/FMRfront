// src/public/pages/donar/ManosTransforman.jsx
import {
  IconBriefcase,
  IconUserHeart,
  IconUsers,
} from "@tabler/icons-react";
import { C, useReveal } from "./tokens";
import SectionLabel from "./SectionLabel";

const TIPOS = [
  { icon: IconBriefcase, tipo: "Empresa aliada" },
  { icon: IconUsers,     tipo: "Embajador" },
  { icon: IconUserHeart, tipo: "Donador individual" },
];

export default function ManosTransforman() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      style={{ background: C.bg, padding: "7rem 0" }}
      className="px-8 sm:px-14 lg:px-20"
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            marginBottom: "3.5rem",
            opacity:      visible ? 1 : 0,
            transform:    visible ? "translateY(0)" : "translateY(20px)",
            transition:   "opacity .7s ease, transform .7s ease",
          }}
        >
          <SectionLabel>Donadores</SectionLabel>
          <h2 style={{
            fontSize:      "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight:    900,
            letterSpacing: "-0.025em",
            lineHeight:    1.15,
            color:         C.text,
            margin:        "0 0 0.75rem",
          }}>
            Manos que{" "}
            <span style={{ color: C.brand }}>transforman</span>
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: C.textMid, maxWidth: 620, margin: 0 }}>
            Detrás de cada donación hay una historia de generosidad, compromiso y
            esperanza. Compartiremos los relatos de quienes han decidido unir su
            esfuerzo al de la Fundación.
          </p>
          <div style={{ width: 56, height: 3, borderRadius: 99, background: C.brand, marginTop: "1.5rem" }} />
        </div>

        {/* Placeholders */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap:                 "1.25rem",
            opacity:             visible ? 1 : 0,
            transform:           visible ? "translateY(0)" : "translateY(24px)",
            transition:          "opacity .7s ease .15s, transform .7s ease .15s",
          }}
        >
          {TIPOS.map(({ icon: Icon, tipo }) => (
            <div
              key={tipo}
              style={{
                borderRadius: "1.5rem",
                padding:      "2rem",
                background:   C.surface,
                border:       `1.5px dashed ${C.border}`,
                display:      "flex",
                flexDirection:"column",
                alignItems:   "center",
                textAlign:    "center",
              }}
            >
              <div style={{
                width:          52,
                height:         52,
                borderRadius:   "1rem",
                background:     C.brandSoft,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                marginBottom:   "1.25rem",
              }}>
                <Icon size={24} stroke={1.5} style={{ color: C.brand }} />
              </div>
              <div style={{
                fontSize:      "0.65rem",
                fontWeight:    800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         C.brand,
                marginBottom:  "0.75rem",
              }}>
                {tipo}
              </div>
              <p style={{ fontSize: "0.85rem", color: C.textLight, margin: 0 }}>
                Próximamente compartiremos su historia aquí.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}