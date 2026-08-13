import { Link } from "react-router-dom";
import { IconHeart } from "@tabler/icons-react";
import { C, IMG, RESOURCES } from "../../../data/homeData";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { SectionLabel } from "../ui";

export default function Causas() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-8 sm:px-14 lg:px-20" style={{ background: C.text }}>
      <div className="max-w-7xl grid md:grid-cols-2 gap-16 items-center">

        {/* Imagen con tarjeta flotante */}
        <div className={`relative transition-all duration-1000
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <img src={IMG.about} alt="Lo que hacemos"
            className="w-full h-[420px] object-cover rounded-3xl shadow-lg" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-5 flex items-center gap-4"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)" }}>
            <div className="inline-flex items-center justify-center rounded-xl shrink-0"
              style={{ width: 48, height: 48, background: C.brandSoft, color: C.brand }}>
              <IconHeart size={24} stroke={1.75} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm" style={{ color: C.text }}>Apoya a una familia hoy</div>
              <div className="text-xs mt-0.5" style={{ color: C.textMid }}>
                Tu donativo cubre medicamentos por un mes
              </div>
            </div>
            <Link to="/donar"
              className="shrink-0 font-bold text-xs px-5 py-2.5 rounded-full"
              style={{ background: C.brand, color: "#fff" }}>
              Donar
            </Link>
          </div>
        </div>

        {/* Lista de recursos */}
        <div className={`transition-all duration-1000 delay-200
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <SectionLabel light>Lo que hacemos</SectionLabel>
          <h2 className="font-black leading-tight mb-5 mt-1"
            style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            Construyendo esperanza,{" "}
            <span style={{ color: C.brand }}>generando cambio</span>
          </h2>
          <p className="leading-relaxed text-base mb-8 max-w-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
            Conectamos a pacientes con leucemia con recursos reales, testimonios y una
            comunidad que entiende el camino. La información correcta puede cambiarlo todo.
          </p>

          <div className="flex flex-col gap-4">
            {RESOURCES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-4 rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="inline-flex items-center justify-center rounded-xl shrink-0 mt-0.5"
                  style={{ width: 38, height: 38, background: C.brand, color: "#fff" }}>
                  <Icon size={19} stroke={1.75} />
                </span>
                <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}