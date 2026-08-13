import { IconHeart, IconArrowRight } from "@tabler/icons-react";
import { C, AMBASSADORS } from "../../../data/homeData";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { SectionLabel, GhostBtn } from "../ui";

export default function Embajadores() {
  const [ref, visible] = useScrollReveal();
  const ambassador = AMBASSADORS[0];

  return (
    <section ref={ref} style={{ background: C.bg }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-7xl grid md:grid-cols-2 gap-16 items-center">

        {/* Texto */}
        <div className={`transition-all duration-1000
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <SectionLabel>Héroe contra la leucemia</SectionLabel>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: C.text, letterSpacing: "-0.025em" }}>
            Nuestros <span style={{ color: C.brand }}>embajadores</span>
          </h2>
          <p className="leading-relaxed mb-5 text-base" style={{ color: C.textMid }}>
            Contamos con el respaldo de figuras comprometidas con nuestra causa, que
            contribuyen a visibilizar la realidad de los pacientes con leucemia en México
            y a amplificar el alcance de nuestra misión.
          </p>
          <p className="leading-relaxed mb-8 text-base" style={{ color: C.textMid }}>
            Su participación nos permite llegar a más personas, generar alianzas y
            construir una comunidad de apoyo más sólida para quienes más lo necesitan.
          </p>
          <GhostBtn to="/embajadores">
            Conoce más <IconArrowRight size={16} stroke={2.25} />
          </GhostBtn>
        </div>

        {/* Foto protagonista */}
        <div className={`transition-all duration-1000 delay-200
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <div className="relative group">
            <img src={ambassador.img} alt="Embajador Mejoremos Realidades"
              className="w-full h-[480px] object-cover object-top rounded-3xl shadow-lg
                         group-hover:scale-[1.02] transition-transform duration-700" />
            <div className="absolute bottom-6 left-6 rounded-2xl px-5 py-3 flex items-center gap-3"
              style={{ background: C.brand }}>
              <IconHeart size={18} stroke={2} style={{ color: "#fff", flexShrink: 0 }} />
              <div className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.75)" }}>
                Embajador
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}