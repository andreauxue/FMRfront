import { Link } from "react-router-dom";
import { IconHeart } from "@tabler/icons-react";
import { C } from "../../../data/homeData";

export function SectionLabel({ children, light = false }) {
  const color = light ? "rgba(255,255,255,0.7)" : C.brand;
  return (
    <div className="flex items-center gap-3 mb-4">
      <span style={{ width: 20, height: 20, color }} className="inline-flex items-center justify-center">
        <IconHeart size={16} stroke={2} />
      </span>
      <span className="text-xs font-bold tracking-widest uppercase" style={{ color }}>
        {children}
      </span>
    </div>
  );
}

export function PrimaryBtn({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full
                 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ background: C.brand, color: "#fff" }}
    >
      {children}
    </Link>
  );
}

export function GhostBtn({ to, children, light = false }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-semibold text-sm px-8 py-4 rounded-full
                 border-2 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        borderColor: light ? "rgba(255,255,255,0.45)" : C.border,
        color:       light ? "#fff" : C.text,
        background:  "transparent",
      }}
    >
      {children}
    </Link>
  );
}