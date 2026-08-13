import { Link } from "react-router-dom";
import { IconHeart } from "@tabler/icons-react";
import { C } from "../../../data/homeData";
import useScrollReveal from "../../../hooks/useScrollReveal";

export default function CtaBanner() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} className="py-24 px-8 sm:px-14 lg:px-20" style={{ background: C.brand }}>
      <div className={`max-w-7xl grid md:grid-cols-2 gap-10 items-center
        transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.6)" }}>
            Sé parte del cambio
          </div>
          <h2 className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem,5vw,3.2rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            Cada acto de generosidad{" "}
            <span style={{ color: C.accent }}>transforma una vida</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-base leading-relaxed md:text-right max-w-sm"
            style={{ color: "rgba(255,255,255,0.78)" }}>
            Tu apoyo nos permite llegar a más pacientes y familias que necesitan
            acompañamiento médico, jurídico y emocional.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/donar"
              className="inline-flex items-center gap-2 font-bold text-sm px-9 py-4 rounded-full
                         transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#fff", color: C.brand }}>
              <IconHeart size={18} stroke={2} /> Donar ahora
            </Link>
            <Link to="/voluntariado"
              className="inline-flex items-center gap-2 font-semibold text-sm px-9 py-4 rounded-full
                         border-2 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "rgba(255,255,255,0.45)", color: "#fff" }}>
              Ser voluntario
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}