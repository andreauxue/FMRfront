import { IconArrowRight } from "@tabler/icons-react";
import { C, IMG } from "../../../data/homeData";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { SectionLabel, GhostBtn } from "../ui";

export default function Equipo() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} style={{ background: C.surface }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-7xl grid md:grid-cols-2 gap-16 items-center">

        {/* Foto grupal */}
        <div className={`transition-all duration-1000
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <img src={IMG.teamPhoto} alt="Equipo Mejoremos Realidades"
            className="w-full h-[420px] object-cover rounded-3xl shadow-lg" />
        </div>

        {/* Texto */}
        <div className={`transition-all duration-1000 delay-200
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <SectionLabel>Las personas detrás de la causa</SectionLabel>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: C.text, letterSpacing: "-0.025em" }}>
            Un equipo comprometido con{" "}
            <span style={{ color: C.brand }}>tu bienestar</span>
          </h2>
          <p className="leading-relaxed mb-5 text-base" style={{ color: C.textMid }}>
            Somos un grupo multidisciplinario de médicos, abogados, psicólogos y voluntarios
            unidos por un mismo propósito: asegurar que ningún paciente con leucemia
            enfrente solo su diagnóstico.
          </p>
          <p className="leading-relaxed mb-8 text-base" style={{ color: C.textMid }}>
            Desde la presidencia hasta las operaciones tecnológicas, cada integrante aporta
            su experiencia y vocación de servicio para hacer de Mejoremos Realidades una
            asociación sólida, humana e integral.
          </p>
          <GhostBtn to="/equipo">
            Conoce al equipo <IconArrowRight size={16} stroke={2.25} />
          </GhostBtn>
        </div>
      </div>
    </section>
  );
}