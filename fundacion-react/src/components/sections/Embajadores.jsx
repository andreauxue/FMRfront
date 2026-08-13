import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
  IconHeart,
  IconArrowRight,
  IconUsers,
  IconSparkles,
} from "@tabler/icons-react";

const C = {
  brand:     "#C8384F",
  brandSoft: "#FAE8EB",
  secondary: "#3B5BA5",
  secondarySoft: "#EBF0FA",
  accent:    "#F5A623",
  bg:        "#F7F8FA",
  surface:   "#FFFFFF",
  text:      "#1A2235",
  textMid:   "#4B5563",
  textLight: "#9CA3AF",
  border:    "#E5E7EB",
};

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <IconHeart size={15} stroke={2} style={{ color: light ? "rgba(255,255,255,0.6)" : C.brand }} />
      <span className="text-xs font-bold tracking-widest uppercase"
        style={{ color: light ? "rgba(255,255,255,0.65)" : C.brand }}>
        {children}
      </span>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);
  const rise = (delay = 0) => ({
    transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section className="pt-36 pb-24 px-8 sm:px-14 lg:px-20 relative overflow-hidden"
      style={{ background: C.text }}>
      <div className="absolute top-0 left-0 pointer-events-none" style={{
        width: "50rem", height: "50rem",
        background: `radial-gradient(circle at 5% 10%, ${C.brand}25 0%, transparent 55%)`,
      }} />
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{
        width: "30rem", height: "30rem",
        background: `radial-gradient(circle at 90% 90%, ${C.secondary}18 0%, transparent 60%)`,
      }} />

      <div className="max-w-7xl relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div style={rise(0)}><SectionLabel light>Héroes contra la leucemia</SectionLabel></div>
          <h1 className="font-black leading-none mb-6"
            style={{ ...rise(120), fontSize: "clamp(2.8rem, 7vw, 6.5rem)", color: "#fff", letterSpacing: "-0.03em" }}>
            Nuestros{" "}
            <span style={{ color: C.brand }}>embajadores</span>
          </h1>
          <p className="text-base leading-relaxed max-w-lg"
            style={{ ...rise(240), color: "rgba(255,255,255,0.68)" }}>
            Personas comprometidas con nuestra misión que suman su voz, su presencia y
            su convicción para que más familias conozcan el apoyo que ofrecemos.
            Cada embajador es un puente entre la fundación y quienes más lo necesitan.
          </p>
        </div>

        {/* Cita */}
        <div style={rise(180)}>
          <blockquote className="pl-6" style={{ borderLeft: `3px solid ${C.brand}` }}>
            <p className="text-lg font-semibold italic leading-relaxed mb-5"
              style={{ color: "rgba(255,255,255,0.82)" }}>
              "La información, la empatía y la solidaridad pueden transformar vidas.
              Nuestros embajadores son la prueba de ello."
            </p>
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: C.brand }}>
              Marco Sánchez · Presidente
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// ─── Verónica — card protagonista ────────────────────────────────────────────
function VeronicaSection() {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <section ref={ref} style={{ background: C.bg }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-7xl">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel>Embajadora</SectionLabel>
          <h2 className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, letterSpacing: "-0.025em" }}>
            Quien da voz a{" "}
            <span style={{ color: C.brand }}>nuestra misión</span>
          </h2>
        </div>

        {/* Card ancho completo */}
        <div
          className={`group relative rounded-3xl overflow-hidden transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ border: `1px solid ${C.border}`, background: C.surface }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="grid md:grid-cols-2" style={{ minHeight: 480 }}>

            {/* Foto */}
            <div className="relative overflow-hidden" style={{ minHeight: 420 }}>
              <img
                src="/personas/vero.jpeg"
                alt="Verónica Ramírez Durán"
                className="w-full h-full object-cover object-top transition-transform duration-700"
                style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
              />
              {/* Degradado transición foto → texto */}
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(to right, transparent 55%, rgba(255,255,255,1) 100%)",
                  opacity: hovered ? 0.5 : 1,
                }} />
              {/* Etiqueta */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: C.brand }}>
                <IconSparkles size={14} stroke={2} style={{ color: "#fff" }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#fff" }}>
                  Embajadora
                </span>
              </div>
            </div>

            {/* Texto */}
            <div className="flex flex-col justify-center px-12 py-14 transition-colors duration-400"
              style={{ background: hovered ? C.brandSoft : C.surface }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: C.brand }}>Fundación Mejoremos Realidades A.C.</div>

              <h3 className="font-black mb-2 transition-transform duration-300"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  color: C.text,
                  letterSpacing: "-0.025em",
                  transform: hovered ? "translateX(6px)" : "translateX(0)",
                }}>
                Verónica Ramírez Durán
              </h3>

              <div className="w-12 h-1 rounded-full mb-6"
                style={{ background: C.brand }} />

              <p className="text-base leading-relaxed mb-4" style={{ color: C.textMid }}>
                Forma parte de la red de embajadores de Fundación Mejoremos Realidades A.C.,
                sumándose a nuestra misión de brindar esperanza, orientación y acompañamiento
                a pacientes con leucemia, cáncer y otras enfermedades hematológicas.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: C.textMid }}>
                Su compromiso con las causas sociales y su convicción de que la información,
                la empatía y la solidaridad pueden transformar vidas la han llevado a
                colaborar activamente con nuestra fundación, impulsando iniciativas que
                buscan generar conciencia, fortalecer las redes de apoyo y acercar a más
                personas a los servicios que ofrecemos.
              </p>

              <div className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300"
                style={{
                  color: C.brand,
                  transform: hovered ? "translateX(6px)" : "translateX(0)",
                }}>
                <IconHeart size={16} stroke={2} />
                Parte del equipo de impacto social
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ¿Quieres ser embajador? ──────────────────────────────────────────────────
function BecomeAmbassador() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="py-28 px-8 sm:px-14 lg:px-20" style={{ background: C.text }}>
      <div className="max-w-7xl grid md:grid-cols-2 gap-16 items-center">

        {/* Texto */}
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <SectionLabel light>Únete a la red</SectionLabel>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            ¿Quieres ser{" "}
            <span style={{ color: C.brand }}>embajador</span>?
          </h2>
          <p className="leading-relaxed mb-5 text-base" style={{ color: "rgba(255,255,255,0.68)" }}>
            Buscamos personas comprometidas con las causas sociales que quieran sumar
            su voz a nuestra misión. No importa tu profesión ni tu alcance: lo que
            importa es tu convicción de que nadie debe enfrentar la leucemia solo.
          </p>
          <p className="leading-relaxed mb-10 text-base" style={{ color: "rgba(255,255,255,0.68)" }}>
            Como embajador de Mejoremos Realidades participarás en iniciativas de
            concientización, eventos y campañas que acercan nuestros servicios a
            quienes más los necesitan.
          </p>
          <a href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: C.brand, color: "#fff" }}>
            Quiero ser embajador
            <IconArrowRight size={16} stroke={2.25} />
          </a>
        </div>

        {/* Valores del embajador */}
        <div className={`flex flex-col gap-4 transition-all duration-1000 delay-200 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}>
          {[
            {
              icon: IconHeart,
              title: "Empatía y compromiso",
              body: "Creemos en personas que ponen el bienestar de los demás al centro de sus acciones.",
            },
            {
              icon: IconUsers,
              title: "Ampliar el alcance",
              body: "Tu red y tu voz nos permiten llegar a más pacientes que quizás no saben que existe apoyo disponible.",
            },
            {
              icon: IconSparkles,
              title: "Generar conciencia",
              body: "La leucemia sigue siendo poco visible en México. Tu participación ayuda a cambiar eso.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="inline-flex items-center justify-center rounded-xl shrink-0"
                style={{ width: 42, height: 42, background: C.brand, color: "#fff" }}>
                <Icon size={20} stroke={1.75} />
              </div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: "#fff" }}>{title}</div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA final ────────────────────────────────────────────────────────────────
function CtaBanner() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="py-24 px-8 sm:px-14 lg:px-20" style={{ background: C.brand }}>
      <div className={`max-w-7xl grid md:grid-cols-2 gap-10 items-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.6)" }}>Actúa hoy</div>
          <h2 className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            Juntos llegamos{" "}
            <span style={{ color: C.accent }}>más lejos</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-base leading-relaxed md:text-right max-w-sm"
            style={{ color: "rgba(255,255,255,0.78)" }}>
            Tu apoyo, tu voz o tu donativo pueden cambiar la historia de un paciente
            con leucemia y su familia.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/donar"
              className="inline-flex items-center gap-2 font-bold text-sm px-9 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#fff", color: C.brand }}>
              <IconHeart size={18} stroke={2} /> Donar ahora
            </Link>
            <Link to="/servicios"
              className="inline-flex items-center gap-2 font-semibold text-sm px-9 py-4 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "rgba(255,255,255,0.45)", color: "#fff" }}>
              Nuestros servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Embajadores() {
  return (
    <div className="min-h-screen font-sans" style={{ background: C.bg }}>
      <Navbar />
      <Hero />
      <VeronicaSection />
      <BecomeAmbassador />
      <CtaBanner />
      <Footer />
    </div>
  );
}