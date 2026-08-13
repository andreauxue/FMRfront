import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconCheck, IconPlayerPlay } from "@tabler/icons-react";
import { C, IMG } from "../../../data/homeData";
import { SectionLabel, PrimaryBtn } from "../ui";

const CHECKLIST = [
  "Gestión de medicamentos especializados",
  "Defensa de tus derechos de salud",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const rise = (delay = 0) => ({
    transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms,
                 transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    opacity:   mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
  });

  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: "100vh" }}>
      <style>{`
        @keyframes bob {
          0%,100% { transform: translateY(0);   opacity: .45; }
          50%      { transform: translateY(8px); opacity: 1;   }
        }
        .scroll-bob { animation: bob 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .scroll-bob { animation: none; } }
      `}</style>

      {/* Fondo */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url(${IMG.hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }} />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(105deg,rgba(10,14,30,.88) 0%,rgba(10,14,30,.72) 45%,rgba(10,14,30,.25) 100%)",
      }} />
      <div className="absolute top-0 left-0 pointer-events-none" style={{
        width: "40rem", height: "40rem",
        background: `radial-gradient(circle at 10% 10%,${C.brand}30 0%,transparent 60%)`,
      }} />

      {/* Contenido */}
      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pt-28 pb-32" style={{ maxWidth: "860px" }}>
        <div style={rise(0)}>
          <SectionLabel light>Bienvenidos a nuestra causa</SectionLabel>
        </div>

        <h1 className="font-black leading-none mb-6"
          style={{ ...rise(120), fontSize: "clamp(3rem,8vw,7rem)", color: "#fff", letterSpacing: "-0.025em" }}>
          <span style={{ color: C.brand }}>Mejoremos</span><br />Realidades
        </h1>

        <p className="text-base leading-relaxed mb-8 max-w-lg"
          style={{ ...rise(240), color: "rgba(255,255,255,0.72)" }}>
          Acompañamos a pacientes con leucemia y cáncer en México con atención médica,
          asesoría jurídica y apoyo emocional, sin costo alguno.
        </p>

        <div className="flex flex-col gap-2 mb-10" style={rise(320)}>
          {CHECKLIST.map((txt) => (
            <div key={txt} className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full shrink-0"
                style={{ width: 22, height: 22, background: C.brand, color: "#fff" }}>
                <IconCheck size={13} stroke={3} />
              </span>
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>{txt}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4" style={rise(400)}>
          <PrimaryBtn to="/donar">Dona ahora</PrimaryBtn>
          <Link to="/acerca-de"
            className="inline-flex items-center gap-3 font-semibold text-sm
                       transition-all duration-200 hover:-translate-y-0.5"
            style={{ color: "#fff" }}>
            <span className="inline-flex items-center justify-center rounded-full border-2"
              style={{ width: 46, height: 46, borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>
              <IconPlayerPlay size={18} stroke={2} style={{ marginLeft: 2 }} />
            </span>
            Conocer más
          </Link>
        </div>
      </div>

      <div className="scroll-bob absolute bottom-8 left-20 flex flex-col items-center gap-1 pointer-events-none">
        <div className="w-px h-10" style={{ background: "rgba(255,255,255,0.25)" }} />
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase mt-1"
          style={{ color: "rgba(255,255,255,0.4)" }}>Scroll</span>
      </div>
    </section>
  );
}