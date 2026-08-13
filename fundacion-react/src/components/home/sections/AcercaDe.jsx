import { IconHeartHandshake, IconArrowRight } from "@tabler/icons-react";
import { C, IMG } from "../../../data/homeData";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { SectionLabel, GhostBtn } from "../ui";

const STATS = [
  { num: "100%", label: "Gratuito para el paciente" },
  { num: "3",    label: "Servicios especializados" },
];

export default function AcercaDe() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} style={{ background: C.surface }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-7xl grid md:grid-cols-2 gap-20 items-center">

        {/* Imágenes */}
        <div className={`relative transition-all duration-1000
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <img src={IMG.about} alt="Paciente atendido"
            className="w-full h-[420px] object-cover rounded-3xl shadow-lg" />
          <div className="absolute -bottom-6 right-0 rounded-2xl shadow-xl px-6 py-5 flex flex-col items-center"
            style={{ background: C.brand, minWidth: 130 }}>
            <IconHeartHandshake size={26} stroke={1.75} style={{ color: "#fff", marginBottom: 4 }} />
            <div className="font-black text-2xl" style={{ color: "#fff", lineHeight: 1 }}>100%</div>
            <div className="text-[11px] font-semibold text-center mt-1" style={{ color: "rgba(255,255,255,0.78)" }}>
              Gratuito<br />para el paciente
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className={`transition-all duration-1000 delay-200
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <SectionLabel>Sobre nosotros</SectionLabel>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: C.text, letterSpacing: "-0.025em" }}>
            Unidos por la compasión,{" "}
            <span style={{ color: C.brand }}>cambiando vidas</span>
          </h2>
          <p className="leading-relaxed mb-5 text-base" style={{ color: C.textMid }}>
            Somos una Asociación Civil dedicada a acompañar a pacientes con leucemia y
            cáncer en México. Nadie debe enfrentar esta batalla solo, y trabajamos cada
            día para que cada persona reciba la atención que merece.
          </p>
          <p className="leading-relaxed mb-8 text-base" style={{ color: C.textMid }}>
            Nuestro equipo de médicos, abogados y especialistas trabaja de manera
            multidisciplinaria garantizando acceso a medicamentos, derechos y bienestar
            emocional para los pacientes y sus familias.
          </p>

          <div className="flex gap-8 mb-8 pb-8" style={{ borderBottom: `1px solid ${C.border}` }}>
            {STATS.map(({ num, label }) => (
              <div key={label}>
                <div className="font-black text-3xl" style={{ color: C.brand, letterSpacing: "-0.03em" }}>{num}</div>
                <div className="text-xs mt-1 font-semibold" style={{ color: C.textMid }}>{label}</div>
              </div>
            ))}
          </div>

          <GhostBtn to="/acerca-de">
            Conoce más <IconArrowRight size={16} stroke={2.25} />
          </GhostBtn>
        </div>
      </div>
    </section>
  );
}