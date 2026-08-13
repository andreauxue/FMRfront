import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { C, SERVICES } from "../../../data/homeData";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { SectionLabel } from "../ui";

export default function Servicios() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} style={{ background: C.bg }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-7xl">

        <div className={`mb-5 transition-all duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel>Servicios</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-black"
              style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: C.text, letterSpacing: "-0.025em" }}>
              Nuestros <span style={{ color: C.brand }}>servicios integrales</span>
            </h2>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: C.textMid }}>
              Enfocados en crear cambio duradero para cada paciente y su familia.
            </p>
          </div>
        </div>

        <div className="w-16 h-1 rounded-full mb-14" style={{ background: C.brand }} />

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <div key={s.title}
              className={`group flex flex-col items-start transition-all duration-500
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 130}ms` }}>

              <div className="w-44 h-44 rounded-full overflow-hidden mb-6 shadow-md"
                style={{ border: `4px solid ${C.brandSoft}` }}>
                <img src={s.img} alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="inline-flex items-center justify-center rounded-xl mb-4"
                style={{ width: 42, height: 42, background: C.brandSoft, color: C.brand }}>
                <s.icon size={21} stroke={1.75} />
              </div>

              <h3 className="font-bold text-xl mb-2" style={{ color: C.text }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.textMid }}>{s.body}</p>

              <Link to={s.href} className="inline-flex items-center gap-1.5 text-sm font-bold"
                style={{ color: C.brand }}>
                Leer más
                <IconArrowRight size={16} stroke={2.25}
                  className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}