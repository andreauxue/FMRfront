import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
  IconHeart,
  IconArrowRight,
  IconPill,
  IconScale,
  IconHeartHandshake,
  IconUsers,
  IconChartBar,
  IconAlertCircle,
  IconMicroscope,
  IconClockHeart,
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
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: "80vh" }}>
      <style>{`
        @keyframes slowzoom { from{transform:scale(1)} to{transform:scale(1.06)} }
        .hero-img { animation: slowzoom 16s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) { .hero-img { animation: none; } }
      `}</style>

      {/* Foto — Marco con pacientes */}
      <div className="absolute inset-0 overflow-hidden">
        <img src="/home/causa.jpg" alt="Marco Sánchez entregando medicamentos a pacientes"
          className="hero-img w-full h-full object-cover object-center" />
      </div>
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(10,14,30,0.25) 0%, rgba(10,14,30,0.55) 40%, rgba(10,14,30,0.94) 100%)",
      }} />
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{
        width: "50rem", height: "30rem",
        background: `radial-gradient(ellipse at 0% 100%, ${C.brand}28 0%, transparent 60%)`,
      }} />

      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-24 pt-40">
        <div className="max-w-7xl">
          <div style={rise(0)}><SectionLabel light>Nuestra causa</SectionLabel></div>
          <h1 className="font-black leading-none mb-6"
            style={{ ...rise(120), fontSize: "clamp(2.8rem, 8vw, 7rem)", color: "#fff", letterSpacing: "-0.03em", maxWidth: 800 }}>
            La leucemia en{" "}
            <span style={{ color: C.brand }}>México</span>{" "}
            no espera
          </h1>
          <p className="text-base leading-relaxed max-w-xl mb-10"
            style={{ ...rise(240), color: "rgba(255,255,255,0.72)" }}>
            Miles de personas reciben cada año un diagnóstico que cambia su vida y la de
            su familia. Nosotros estamos aquí para que no enfrenten ese momento solos.
          </p>
          <div style={rise(340)}>
            <Link to="/donar"
              className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: C.brand, color: "#fff" }}>
              <IconHeart size={16} stroke={2} /> Apoya la causa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Datos duros sobre leucemia en México ─────────────────────────────────────
const STATS = [
  {
    num:   "~6,000",
    label: "nuevos casos al año",
    note:  "INEGI / Globocan 2022",
  },
  {
    num:   "2°",
    label: "cáncer más frecuente en menores de 15 años",
    note:  "IMSS / Secretaría de Salud",
  },
  {
    num:   "50%",
    label: "de pacientes pediátricos no completa tratamiento",
    note:  "Journal of Global Oncology",
  },
  {
    num:   "30%",
    label: "de casos sin diagnóstico oportuno en zonas rurales",
    note:  "CONACYT / INSP",
  },
];

function DataSection() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="py-24 px-8 sm:px-14 lg:px-20" style={{ background: C.text }}>
      <div className="max-w-7xl">
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel light>El contexto</SectionLabel>
          <h2 className="font-black leading-tight max-w-2xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            Lo que enfrentan los pacientes{" "}
            <span style={{ color: C.brand }}>en números reales</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(({ num, label, note }, i) => (
            <div
              key={label}
              className={`rounded-3xl p-8 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="font-black mb-2"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: C.brand, lineHeight: 1, letterSpacing: "-0.04em" }}>
                {num}
              </div>
              <div className="text-sm font-semibold leading-snug mb-4" style={{ color: "#fff" }}>{label}</div>
              <div className="text-[11px] font-medium tracking-wide pt-4"
                style={{ color: "rgba(255,255,255,0.35)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                Fuente: {note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cómo ayudamos ────────────────────────────────────────────────────────────
const HOW = [
  {
    icon:  IconPill,
    title: "Gestión de medicamentos",
    body:  "Facilitamos el acceso a medicamentos especializados mediante convenios, gestiones ante instituciones de salud y orientación directa al paciente.",
    color: C.brand,
    soft:  C.brandSoft,
  },
  {
    icon:  IconScale,
    title: "Defensa de derechos",
    body:  "Acompañamos a pacientes que han visto vulnerado su derecho a la salud: demoras, negativas de cobertura o falta de acceso a tratamiento.",
    color: C.secondary,
    soft:  C.secondarySoft,
  },
  {
    icon:  IconHeartHandshake,
    title: "Apoyo emocional",
    body:  "A través del programa Tejiendo Esperanza, creamos redes de contención entre pacientes y familias, con apoyo psicológico profesional.",
    color: C.brand,
    soft:  C.brandSoft,
  },
  {
    icon:  IconMicroscope,
    title: "Información y detección",
    body:  "Promovemos la detección temprana y difundimos información confiable sobre tipos de leucemia, síntomas y opciones de tratamiento.",
    color: C.secondary,
    soft:  C.secondarySoft,
  },
  {
    icon:  IconUsers,
    title: "Comunidad y red",
    body:  "Conectamos a pacientes con otros pacientes, especialistas y organizaciones aliadas que forman una red de apoyo sólida y humana.",
    color: C.brand,
    soft:  C.brandSoft,
  },
  {
    icon:  IconClockHeart,
    title: "Acompañamiento continuo",
    body:  "Nuestro equipo está presente desde el diagnóstico hasta el seguimiento post-tratamiento, sin dejar a nadie sin respuesta.",
    color: C.secondary,
    soft:  C.secondarySoft,
  },
];

function HowWeHelp() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ background: C.bg }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-7xl">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel>Cómo ayudamos</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, letterSpacing: "-0.025em" }}>
              Acompañamiento{" "}
              <span style={{ color: C.brand }}>en todas las dimensiones</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: C.textMid }}>
              La leucemia no solo afecta la salud física. Por eso nuestro apoyo es médico,
              jurídico y emocional.
            </p>
          </div>
          <div className="w-16 h-1 rounded-full mt-6" style={{ background: C.brand }} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOW.map(({ icon: Icon, title, body, color, soft }, i) => (
            <div
              key={title}
              className={`group rounded-3xl p-8 border transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 90}ms`, background: C.surface, borderColor: C.border }}
            >
              <div className="inline-flex items-center justify-center rounded-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ width: 52, height: 52, background: soft, color }}>
                <Icon size={24} stroke={1.75} />
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: C.text }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.textMid }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Foto + quote — impacto real ──────────────────────────────────────────────
function ImpactQuote() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ background: C.surface }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-7xl grid md:grid-cols-2 gap-16 items-center">

        {/* Foto */}
        <div className={`relative group rounded-3xl overflow-hidden shadow-lg transition-all duration-1000 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`} style={{ height: 460 }}>
          <img src="/home/dona2.JPG"
            alt="Marco Sánchez entregando medicamentos"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,14,30,0.7) 0%, transparent 55%)" }} />
          {/* Pie de foto */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ color: C.brand }}>En acción</div>
            
          </div>
        </div>

        {/* Texto */}
        <div className={`transition-all duration-1000 delay-150 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}>
          <SectionLabel>Lo que hacemos hoy</SectionLabel>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: C.text, letterSpacing: "-0.025em" }}>
            Acción concreta,{" "}
            <span style={{ color: C.brand }}>impacto real</span>
          </h2>
          <p className="leading-relaxed mb-5 text-base" style={{ color: C.textMid }}>
            Desde nuestros inicios hemos gestionado medicamentos especializados, brindado
            asesoría jurídica para pacientes con cobertura negada y acompañado emocionalmente
            a familias en momentos de alta incertidumbre.
          </p>
          <p className="leading-relaxed mb-8 text-base" style={{ color: C.textMid }}>
            Aunque aún estamos construyendo nuestra base de casos documentados, cada
            acción que emprendemos es un paso firme hacia una red de apoyo más sólida
            para quienes más lo necesitan.
          </p>

          {/* Quote */}
          <blockquote className="pl-6 mb-8" style={{ borderLeft: `3px solid ${C.brand}` }}>
            <p className="text-base font-semibold italic leading-relaxed" style={{ color: C.text }}>
              "Cuando un paciente recibe su medicamento a tiempo, cuando una familia
              encuentra respuesta a su duda legal, cuando alguien siente que no está solo:
              eso es Mejoremos Realidades."
            </p>
            <footer className="mt-3 text-xs font-bold tracking-widest uppercase" style={{ color: C.brand }}>
              Marco Sánchez · Presidente
            </footer>
          </blockquote>

          <Link to="/servicios"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: C.brand, color: "#fff" }}>
            Ver nuestros servicios <IconArrowRight size={16} stroke={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Próximas causas — placeholder abierto ────────────────────────────────────
function ComingCauses() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ background: C.bg }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-7xl">
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel>Causas activas</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, letterSpacing: "-0.025em" }}>
              Pronto podrás apoyar{" "}
              <span style={{ color: C.brand }}>casos específicos</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: C.textMid }}>
              Estamos preparando el espacio para presentar casos reales de pacientes
              que necesitan tu apoyo directo.
            </p>
          </div>
        </div>

        {/* Cards placeholder */}
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-3xl overflow-hidden border transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                borderColor: C.border,
                background: C.surface,
              }}
            >
              {/* Imagen placeholder */}
              <div className="h-52 flex items-center justify-center"
                style={{ background: C.brandSoft }}>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center rounded-full"
                    style={{ width: 60, height: 60, background: "rgba(200,56,79,0.15)", color: C.brand }}>
                    <IconAlertCircle size={28} stroke={1.5} />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: C.brand }}>Próximamente</span>
                </div>
              </div>
              {/* Contenido */}
              <div className="p-7">
                {/* Barra de progreso vacía */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold" style={{ color: C.textLight }}>Meta de recaudación</span>
                  <span className="text-xs font-bold" style={{ color: C.brand }}>— %</span>
                </div>
                <div className="w-full h-1.5 rounded-full mb-5" style={{ background: C.border }}>
                  <div className="h-full rounded-full" style={{ width: "0%", background: C.brand }} />
                </div>
                {/* Texto */}
                <div className="h-4 rounded-full mb-2" style={{ background: C.border, width: "75%" }} />
                <div className="h-4 rounded-full mb-2" style={{ background: C.border, width: "55%" }} />
                <div className="h-4 rounded-full mb-5" style={{ background: C.border, width: "65%" }} />
                <div className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full"
                  style={{ background: C.brandSoft, color: C.brand }}>
                  Caso en preparación
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para notificaciones */}
        <div className={`mt-16 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-700 delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
          style={{ background: C.text }}>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-2"
              style={{ color: C.brand }}>Mantente al tanto</div>
            <h3 className="font-black text-2xl" style={{ color: "#fff", letterSpacing: "-0.02em" }}>
              ¿Quieres saber cuándo{" "}
              <span style={{ color: C.brand }}>haya casos activos</span>?
            </h3>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Contáctanos y te avisamos cuando el primer caso esté disponible para apoyar.
            </p>
          </div>
          <a href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
            target="_blank" rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: C.brand, color: "#fff", whiteSpace: "nowrap" }}>
            Notifícame <IconArrowRight size={16} stroke={2.25} />
          </a>
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
            Tu donativo puede{" "}
            <span style={{ color: C.accent }}>cambiar una vida</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-base leading-relaxed md:text-right max-w-sm"
            style={{ color: "rgba(255,255,255,0.78)" }}>
            Mientras preparamos los casos individuales, tu apoyo general nos permite
            seguir operando y llegando a más pacientes hoy.
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

export default function Causas() {
  return (
    <div className="min-h-screen font-sans" style={{ background: C.bg }}>
      <Navbar />
      <Hero />
      <DataSection />
      <HowWeHelp />
      <ImpactQuote />
      <ComingCauses />
      <CtaBanner />
      <Footer />
    </div>
  );
}