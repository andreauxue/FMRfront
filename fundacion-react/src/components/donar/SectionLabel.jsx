// src/components/donar/SectionLabel.jsx
import { IconHeart } from "@tabler/icons-react";
import { C } from "./tokens";

export default function SectionLabel({ children, light = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <IconHeart
        size={14}
        stroke={2}
        style={{ color: light ? "rgba(255,255,255,0.55)" : C.brand, flexShrink: 0 }}
      />
      <span
        style={{
          fontSize:      "0.65rem",
          fontWeight:    800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         light ? "rgba(255,255,255,0.6)" : C.brand,
        }}
      >
        {children}
      </span>
    </div>
  );
}