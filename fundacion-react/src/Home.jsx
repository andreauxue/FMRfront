import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import {
  IconHeart,
  IconPill,
  IconScale,
  IconBrain,
  IconHeartHandshake,
  IconUsers,
  IconCalendar,
  IconBuildingHospital,
  IconClipboardText,
  IconBook2,
  IconMessageCircle,
  IconVaccine,
  IconArrowRight,
} from "@tabler/icons-react";

// ─── Brand palette (warm, human, healthcare) ──────────────────────────────────
const C = {
  brand:     "#C8384F",   // rojo más suave y humano
  brandSoft: "#FAE8EB",   // rojo muy claro para fondos
  secondary: "#3B5BA5",   // azul profundo
  secondarySoft: "#EBF0FA",
  accent:    "#F5A623",   // dorado cálido
  accentSoft:"#FEF5E7",
  bg:        "#FAFAFA",
  surface:   "#FFFFFF",
  text:      "#1A2235",
  textMid:   "#4B5563",
  textLight: "#9CA3AF",
  border:    "#E5E7EB",
};

// ─── Images (locales) ─────────────────────────────────────────────────────────
// Coloca los archivos en /public/images/ con esta estructura:
//   /public/images/hero.jpg
//   /public/images/nosotros.jpg
//   /public/images/servicios/medica.jpg
//   /public/images/servicios/juridica.jpg
//   /public/images/servicios/psicologica.jpg
//   /public/images/equipo/*.jpg
//   /public/images/embajadores/*.jpg
const IMG = {
  hero:  "/images/hero.jpg",
  about: "/images/nosotros.jpg",
  services: {
    medica:      "/images/servicios/medica.jpg",
    juridica:    "/images/servicios/juridica.jpg",
    psicologica: "/images/servicios/psicologica.jpg",
  },
};

const REAL_TEAM = [
  { name: "Marco Sanchez",       role: "Presidente",                    img: "/images/equipo/marco-sanchez.jpg" },
  { name: "Danna Martinez",      role: "Secretaria General",            img: "/images/equipo/danna-martinez.jpg" },
  { name: "Maria Jose Martinez", role: "Tesorera",                      img: "/images/equipo/maria-jose-martinez.jpg" },
  { name: "Diego Castilla",      role: "Director Institucional",        img: "/images/equipo/diego-castilla.jpg" },
  { name: "Andrea Amaya",        role: "Dir. Operaciones Tecnologicas", img: "/images/equipo/andrea-amaya.jpg" },
];

const AMBASSADORS = [
  { img: "/images/embajadores/embajador-1.jpg" },
  { img: "/images/embajadores/embajador-2.jpg" },
  { img: "/images/embajadores/embajador-3.jpg" },
  { img: "/images/embajadores/embajador-4.jpg" },
];

// ─── Reveal hook ──────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
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

// ─── Icon chip ────────────────────────────────────────────────────────────────
function IconChip({ icon: Icon, size = 22, soft = C.brandSoft, color = C.brand }) {
  return (
    <div
      className="inline-flex items-center justify-center rounded-xl shrink-0"
      style={{ width: 44, height: 44, background: soft, color }}
    >
      <Icon size={size} stroke={1.75} />
    </div>
  );
}

// ─── Stat counter ─────────────────────────────────────────────────────────────
function StatCounter({ end, suffix = "", label, icon: Icon }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 24);
    return () => clearInterval(timer);
  }, [visible, end]);
  return (
    <div ref={ref} className="text-center flex flex-col items-center gap-2">
      <div
        className="flex items-center justify-center rounded-full mb-1"
        style={{ width: 52, height: 52, background: C.surface, color: C.brand }}
      >
        <Icon size={26} stroke={1.75} />
      </div>
      <div
        className="font-bold tabular-nums"
        style={{ color: C.brand, fontSize: "2.8rem", lineHeight: 1 }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium mt-1" style={{ color: C.textMid }}>{label}</div>
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-5 h-0.5 rounded-full" style={{ background: C.brand }} />
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: light ? "rgba(255,255,255,0.7)" : C.brand }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── Buttons ──────────────────────────────────────────────────────────────────
function PrimaryBtn({ to, children, icon: Icon }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
      style={{ background: C.brand, color: "#fff" }}
    >
      {Icon && <Icon size={18} stroke={2} />}
      {children}
    </Link>
  );
}

function SecondaryBtn({ to, children, dark = false }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.4)" : C.border,
        color: dark ? "#fff" : C.text,
        background: "transparent",
      }}
    >
      {children}
    </Link>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "90vh", background: C.bg }}
    >
      {/* Soft color wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${C.brandSoft} 0%, ${C.secondarySoft} 50%, ${C.bg} 100%)`,
        }}
      />

      {/* Hero image — right half, clipped */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
        <img
          src={IMG.hero}
          alt="Paciente con leucemia recibiendo apoyo"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center top" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${C.bg} 0%, transparent 35%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-28 w-full">
        <div className="max-w-xl">
          <SectionLabel>Asociación Civil · Ciudad de México</SectionLabel>

          <h1
            className="font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", color: C.text }}
          >
            Nadie debería{" "}
            <span style={{ color: C.brand }}>enfrentar la leucemia</span>{" "}
            solo.
          </h1>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: C.textMid, maxWidth: "36rem" }}
          >
            Brindamos acompañamiento médico, emocional y jurídico a pacientes
            y familias en México desde 2019.
          </p>

          <div className="flex flex-wrap gap-3">
            <PrimaryBtn to="/donaciones" icon={IconHeart}>Dona ahora</PrimaryBtn>
            <SecondaryBtn to="/servicios">Nuestros servicios</SecondaryBtn>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6 mt-12">
            {[
              { val: "1,200+", label: "Pacientes atendidos" },
              { val: "5 años", label: "De trayectoria" },
              { val: "30+",    label: "Voluntarios activos" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-bold text-xl" style={{ color: C.brand }}>{s.val}</div>
                <div className="text-xs mt-0.5" style={{ color: C.textLight }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
function Ticker() {
  const msg = "Dona y ayúdanos a llegar a quien más lo necesita";
  const repeated = Array(14).fill(msg).join("   ·   ");
  return (
    <div className="py-3 overflow-hidden whitespace-nowrap" style={{ background: C.brand }}>
      <div className="inline-block animate-ticker">
        <span className="text-white/90 font-semibold text-xs tracking-widest uppercase pr-8">{repeated}</span>
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
const PILLARS = [
  { icon: IconPill,  label: "Gestión médica y medicamentos" },
  { icon: IconScale, label: "Asesoría jurídica gratuita" },
  { icon: IconBrain, label: "Apoyo psicológico integral" },
];

function About() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ background: C.surface }} className="py-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* Image */}
        <div className={`relative transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <img
            src={IMG.about}
            alt="Fundación Mejoremos Realidades"
            className="w-full h-[480px] object-cover rounded-2xl shadow-lg"
          />
          {/* Founded badge */}
          <div
            className="absolute -bottom-6 -right-6 w-28 h-28 rounded-2xl shadow-xl flex flex-col items-center justify-center"
            style={{ background: C.surface, border: `3px solid ${C.brandSoft}` }}
          >
            <div className="font-bold text-3xl" style={{ color: C.brand }}>2019</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: C.textLight }}>Fundada</div>
          </div>
        </div>

        {/* Text */}
        <div className={`transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <SectionLabel>Acerca de nosotros</SectionLabel>

          <h2
            className="font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: C.text }}
          >
            ¿Qué es Fundación{" "}
            <span style={{ color: C.brand }}>Mejoremos Realidades</span>?
          </h2>

          <p className="leading-relaxed mb-4 text-base" style={{ color: C.textMid }}>
            Somos una Asociación Civil dedicada a acompañar a pacientes con leucemia y
            cáncer en México. Creemos que nadie debe enfrentar esta batalla solo, y
            trabajamos día a día para que cada persona reciba la atención que merece.
          </p>
          <p className="leading-relaxed mb-8 text-base" style={{ color: C.textMid }}>
            Nuestro equipo de médicos, abogados y especialistas trabaja de manera
            multidisciplinaria para garantizar el acceso a medicamentos, derechos y
            bienestar emocional de los pacientes y sus familias.
          </p>

          {/* Pillars */}
          <div className="flex flex-col gap-3 mb-8">
            {PILLARS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm font-medium" style={{ color: C.text }}>
                <span
                  className="inline-flex items-center justify-center rounded-lg shrink-0"
                  style={{ width: 36, height: 36, background: C.brandSoft, color: C.brand }}
                >
                  <Icon size={19} stroke={1.75} />
                </span>
                {label}
              </div>
            ))}
          </div>

          <SecondaryBtn to="/acerca-de">Conoce más</SecondaryBtn>
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    img: IMG.services.medica,
    icon: IconPill,
    title: "Gestión Médica",
    body: "Te orientamos hacia los servicios médicos correctos, resolvemos dudas sobre tu diagnóstico y gestionamos el acceso a medicamentos especializados.",
    href: "/servicios",
  },
  {
    img: IMG.services.juridica,
    icon: IconScale,
    title: "Asesoría Jurídica",
    body: "Defendemos tu derecho a la salud. Si tus derechos están siendo vulnerados, nuestros abogados te acompañan en cada paso del proceso legal.",
    href: "/servicios",
  },
  {
    img: IMG.services.psicologica,
    icon: IconHeartHandshake,
    title: "Atención Psicológica",
    body: "Nadie debe sentirse solo en este camino. Ofrecemos apoyo emocional, grupos de experiencias y acompañamiento profesional para ti y tu familia.",
    href: "/servicios",
  },
];

function Services() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ background: C.bg }} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className={`mb-14 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel>Lo que hacemos</SectionLabel>
          <h2 className="font-bold mt-2" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)", color: C.text }}>
            Nuestros <span style={{ color: C.brand }}>servicios</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-base leading-relaxed" style={{ color: C.textMid }}>
            Acompañamiento integral para el paciente y su familia en cada etapa del camino.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`group rounded-2xl overflow-hidden shadow-sm border transition-all duration-500 hover:shadow-md hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${i * 120 + 150}ms`,
                background: C.surface,
                borderColor: C.border,
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(255,255,255,0.6), transparent)" }}
                />
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="mb-4">
                  <IconChip icon={s.icon} />
                </div>
                <h3 className="font-bold text-xl mb-2" style={{ color: C.text }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: C.textMid }}>{s.body}</p>
                <Link
                  to={s.href}
                  className="inline-flex items-center gap-1 text-sm font-bold transition-colors"
                  style={{ color: C.brand }}
                >
                  Saber más
                  <IconArrowRight size={16} stroke={2.25} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <section className="py-24 px-6" style={{ background: C.secondarySoft }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { end: 1200, suffix: "+", label: "Pacientes atendidos",      icon: IconUsers },
            { end: 5,    suffix: "",  label: "Años de trayectoria",      icon: IconCalendar },
            { end: 3,    suffix: "",  label: "Servicios especializados", icon: IconBuildingHospital },
            { end: 30,   suffix: "+", label: "Voluntarios activos",      icon: IconHeartHandshake },
          ].map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team preview ─────────────────────────────────────────────────────────────
function Team() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ background: C.surface }} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel>Las personas detrás de la causa</SectionLabel>
            <h2 className="font-bold mt-2" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)", color: C.text }}>
              Nuestro <span style={{ color: C.brand }}>equipo</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: C.textMid }}>
            Médicos, abogados y especialistas comprometidos con el bienestar de los pacientes y sus familias.
          </p>
        </div>

        {/* Grid — full color, warm, no grayscale */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {REAL_TEAM.map((m, i) => (
            <div
              key={m.name}
              className={`group rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms`, borderColor: C.border, background: C.surface }}
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="font-bold text-sm" style={{ color: C.text }}>{m.name}</div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: C.brand }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <SecondaryBtn to="/equipo">Conoce a todo el equipo</SecondaryBtn>
        </div>
      </div>
    </section>
  );
}

// ─── Impact / Patient Resources ───────────────────────────────────────────────
const RESOURCES = [
  { icon: IconClipboardText, text: "Acceso a información sobre tipos de leucemia" },
  { icon: IconBook2,         text: "Guías de vida digna y manuales de derechos" },
  { icon: IconMessageCircle, text: "Red de apoyo emocional con otros pacientes" },
  { icon: IconVaccine,       text: "Orientación para acceder a tratamientos" },
];

function Impact() {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      className="py-28 px-6"
      style={{ background: C.brandSoft }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <SectionLabel>Vivo con leucemia</SectionLabel>
          <h2
            className="font-bold leading-tight mb-5 mt-2"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text }}
          >
            No estás{" "}
            <span style={{ color: C.brand }}>solo.</span>
          </h2>
          <p className="leading-relaxed text-base mb-8 max-w-md" style={{ color: C.textMid }}>
            Conectamos a pacientes con leucemia con recursos, testimonios reales y una
            comunidad que entiende el camino. La información correcta puede cambiarlo todo.
          </p>
          <PrimaryBtn to="/vivo-con-leucemia">Ver recursos para pacientes</PrimaryBtn>
        </div>

        <div className={`transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <div className="flex flex-col gap-4">
            {RESOURCES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-4 rounded-xl p-5 shadow-sm"
                style={{ background: C.surface }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-lg shrink-0"
                  style={{ width: 40, height: 40, background: C.brandSoft, color: C.brand }}
                >
                  <Icon size={21} stroke={1.75} />
                </span>
                <p className="text-sm leading-relaxed font-medium" style={{ color: C.text }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ambassadors ─────────────────────────────────────────────────────────────
function Ambassadors() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ background: C.bg }} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <SectionLabel>Héroes contra la leucemia</SectionLabel>
          <h2 className="font-bold mt-2" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)", color: C.text }}>
            Nuestros <span style={{ color: C.brand }}>embajadores</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: C.textMid }}>
            Héroes que contribuyen a mejorar la realidad de los pacientes desde distintas áreas,
            haciendo de nuestra Fundación una asociación integral y multidisciplinaria.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {AMBASSADORS.map((a, i) => (
            <div
              key={i}
              className={`group rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition-all duration-500 hover:-translate-y-1 ${
                visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${i * 90}ms`, borderColor: C.border }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={a.img}
                  alt={`Embajador ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <div className="text-xs font-bold tracking-wide uppercase" style={{ color: C.brand }}>Embajador</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <SecondaryBtn to="/embajadores">Conoce a todos los embajadores</SecondaryBtn>
        </div>
      </div>
    </section>
  );
}

// ─── Donate CTA ───────────────────────────────────────────────────────────────
function DonateSection() {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: C.secondary }}
    >
      {/* Subtle wave texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 28px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className={`max-w-3xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-block rounded-full px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
          Juntos podemos más
        </div>
        <h2
          className="font-bold text-white leading-tight mb-5"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          Tu apoyo cambia vidas.
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Cada donación nos permite llegar a más pacientes con leucemia que necesitan
          medicamentos, orientación legal y apoyo emocional.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/donaciones"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: "#fff", color: C.brand }}
          >
            <IconHeart size={18} stroke={2} />
            Donar ahora
          </Link>
          <Link
            to="/causas"
            className="font-semibold text-sm px-8 py-4 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
          >
            Ver causas
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen font-sans" style={{ background: C.bg }}>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Services />
      <Stats />
      <Team />
      <Impact />
      <Ambassadors />
      <DonateSection />
      <Footer />
    </div>
  );
}