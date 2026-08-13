import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
  IconHeart,
  IconArrowRight,
  IconX,
} from "@tabler/icons-react";

const C = {
  brand:     "#C8384F",
  brandSoft: "#FAE8EB",
  secondary: "#3B5BA5",
  accent:    "#F5A623",
  bg:        "#F7F8FA",
  surface:   "#FFFFFF",
  text:      "#1A2235",
  textMid:   "#4B5563",
  textLight: "#9CA3AF",
  border:    "#E5E7EB",
};

const TEAM = [
  {
    name:  "Marco Sánchez",
    role:  "Presidente",
    img:   "/personas/marco.jpeg",
    short: "Fundador. Diagnosticado con leucemia mieloide crónica a los 15 años, creó Mejoremos Realidades para que nadie enfrente este camino solo.",
    bio: [
      "Un joven diagnosticado con leucemia mieloide crónica a los 15 años, preocupado por los pacientes con leucemia y sus familias, decidió emprender Fundación Mejoremos Realidades como un lugar en el que las personas se sintieran seguras, fueran orientadas y contaran con una red de apoyo que hiciera del diagnóstico algo más llevadero.",
      "Egresado de la licenciatura en Derecho, cree fervientemente que hay una vida vivible durante y después del diagnóstico, y confía en que sumando esfuerzos se puede hacer mucho por los pacientes.",
      "Mejoremos Realidades, tal como lo comenta, es de y para todos y todas; nació de una necesidad, pero se convirtió en un sueño que transforma vidas.",
    ],
  },
  {
    name:  "Danna Martínez",
    role:  "Vicepresidenta Ejecutiva",
    img:   "/personas/danna.jpg",
    short: "Médica egresada con experiencia en atención primaria y proyectos de impacto social. Interesada en fortalecer la educación médica para pacientes y comunidades.",
    bio: [
      "Egresada de la licenciatura en medicina, ha dedicado parte de su proceso de investigación médica a lo relacionado con la leucemia, sus derivados y el cáncer en general.",
      "Es una persona preocupada y ocupada por los demás, empática y solidaria. Considera que los médicos que son el primer contacto con el paciente deben desarrollar su sentido humano para entender que se está tratando con personas y causas que les aquejan en lo que más les importa.",
      "Considera que el diagnóstico es el paso más difícil del proceso, pero Mejoremos Realidades lo hace de tu mano.",
    ],
  },
  {
    name:  "María José Martínez",
    role:  "Directora Jurídica y de Cumplimiento Normativo",
    img:   "/personas/majo.jpg",
    short: "Abogada enfocada en Derechos Humanos y el acceso garantizado a la salud para todas las personas.",
    bio: [
      "Licenciada en derecho, sus principales líneas de acción han sido el respeto a los Derechos Humanos y la obligación del Estado Mexicano de garantizar el acceso a ellos para todas y todos.",
      "En Mejoremos Realidades tiene como máximas la transparencia, la rendición de cuentas y el uso adecuado de los recursos en pro de las causas que aquí se siguen.",
      "El Derecho Humano de acceso a los servicios de salud es fundamental para tener una calidad de vida digna y en favor de los menos favorecidos.",
    ],
  },
  {
    name:  "Diego Castilla",
    role:  "Director Médico y de Programas Institucionales",
    img:   "/personas/diego.jpg",
    short: "Estudiante de medicina con vocación para generar alianzas que garanticen el bienestar integral de los pacientes.",
    bio: [
      "Estudiante de medicina, con particular interés en generar alianzas que garanticen el bienestar de los pacientes con cáncer y calidad de vida para ellos y sus familias.",
      "Ha dedicado parte de su labor en la medicina a generar contacto de primera mano con los pacientes a fin de canalizarlos a donde su diagnóstico sea tratado integralmente.",
      "Es un hombre con gran sentido de pertenencia a Mejoremos Realidades, pues cree en esta Fundación como un medio para hacer del diagnóstico algo más llevadero. Su sentido de responsabilidad, respeto, compromiso y empatía es claro.",
    ],
  },
  {
    name:  "Andrea Amaya",
    role:  "Directora de Planeación Técnica y Análisis Estratégico",
    img:   "/personas/andrea.jpeg",
    short: "Matemática aplicada que impulsa la innovación tecnológica al servicio de la equidad y la salud.",
    bio: [
      "Licenciada en matemáticas aplicadas con un profundo interés en ayudar a las personas a través de la tecnología. Cree firmemente que la innovación solo tiene sentido cuando mejora la vida de los demás y promueve la equidad.",
      "En Mejoremos Realidades impulsa una forma más humana de entender la innovación como Directora de Planeación Técnica y Análisis Estratégico.",
    ],
  },
  {
    name:  "Jovita Rodríguez González",
    role:  "Directora de Atención Integral y Acompañamiento",
    img:   "/personas/jovita.jpeg",
    short: "Madre de un paciente con leucemia, lleva la experiencia vivida al corazón del acompañamiento integral.",
    bio: [
      "Como madre de un paciente con leucemia, ha experimentado de primera mano los retos, las incertidumbres y las necesidades que enfrentan las personas diagnosticadas y sus familias. Esta vivencia le ha permitido desarrollar una profunda sensibilidad y un firme compromiso con el acompañamiento integral.",
      "En Fundación Mejoremos Realidades A.C. dirige el área de Atención Integral y Acompañamiento, coordinando acciones orientadas a brindar orientación, apoyo y seguimiento a pacientes y cuidadores.",
      "Su labor refleja el compromiso de la Fundación con un acompañamiento basado en la empatía y la convicción de que ningún paciente ni su familia deben enfrentar la leucemia en soledad.",
    ],
  },
  {
    name:  "Gabriela Gómez Cruz",
    role:  "Directora de Relaciones Estratégicas y Proyección Institucional",
    img:   "/personas/gaby.jpg",
    short: "Arquitecta e ingeniera con visión estratégica para posicionar la Fundación y construir alianzas de impacto.",
    bio: [
      "Arquitecta e ingeniera con amplia experiencia en el desarrollo, coordinación y gestión de proyectos, así como en el fortalecimiento de relaciones institucionales.",
      "Al frente de la Dirección de Relaciones Estratégicas y Proyección Institucional, impulsa la imagen institucional de la Fundación, fortalece su presencia ante diversos sectores y consolida alianzas clave.",
      "Su liderazgo amplía el alcance de los programas y fortalece el impacto social, promoviendo iniciativas que beneficien a las personas que viven con leucemia y a sus familias.",
    ],
  },
];

function useReveal(threshold = 0.08) {
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

// ─── Modal ────────────────────────────────────────────────────────────────────
function ProfileModal({ member, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,14,30,0.82)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: C.surface, maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 overflow-hidden">
          <img src={member.img} alt={member.name}
            className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,14,30,0.9) 0%, rgba(10,14,30,0.2) 60%, transparent 100%)" }} />
          <button onClick={onClose}
            className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-all hover:scale-110"
            style={{ width: 38, height: 38, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", color: "#fff" }}>
            <IconX size={18} stroke={2} />
          </button>
          <div className="absolute bottom-5 left-7">
            <div className="font-black text-2xl" style={{ color: "#fff", letterSpacing: "-0.02em" }}>{member.name}</div>
            <div className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: C.brand }}>{member.role}</div>
          </div>
        </div>
        <div className="p-8 overflow-y-auto space-y-4" style={{ maxHeight: "calc(90vh - 256px)" }}>
          {member.bio.map((p, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: C.textMid }}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero — foto grupal ───────────────────────────────────────────────────────
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
        @keyframes slowzoom { from { transform: scale(1); } to { transform: scale(1.06); } }
        .hero-img { animation: slowzoom 14s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) { .hero-img { animation: none; } }
      `}</style>

      {/* Foto grupal con zoom lento */}
      <div className="absolute inset-0 overflow-hidden">
        <img src="/personas/equipo.jpeg" alt="Equipo Mejoremos Realidades"
          className="hero-img w-full h-full object-cover object-center" />
      </div>

      {/* Overlay — más denso abajo */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(10,14,30,0.2) 0%, rgba(10,14,30,0.55) 45%, rgba(10,14,30,0.94) 100%)",
      }} />
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{
        width: "50rem", height: "30rem",
        background: `radial-gradient(ellipse at 0% 100%, ${C.brand}28 0%, transparent 60%)`,
      }} />

      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-24 pt-40">
        <div className="max-w-7xl">
          <div style={rise(0)}><SectionLabel light>Las personas detrás de la causa</SectionLabel></div>
          <h1 className="font-black leading-none mb-5"
            style={{ ...rise(120), fontSize: "clamp(3rem, 8vw, 7rem)", color: "#fff", letterSpacing: "-0.03em" }}>
            Nuestro <span style={{ color: C.brand }}>equipo</span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl"
            style={{ ...rise(240), color: "rgba(255,255,255,0.68)" }}>
            Médicos, abogados, especialistas y personas con experiencia propia, unidos por
            un mismo propósito: que ningún paciente con leucemia enfrente solo su diagnóstico.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Card de cada miembro — ancho completo ────────────────────────────────────
function MemberRow({ member, index }) {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(null);
  const isEven = index % 2 === 0;

  return (
    <>
      <div
        ref={ref}
        className={`group relative overflow-hidden cursor-pointer transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{
          transitionDelay: `${index * 60}ms`,
          borderBottom: `1px solid ${C.border}`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setSelected(member)}
      >
        {/* Layout: imagen + info, alternado */}
        <div className={`grid md:grid-cols-2 ${isEven ? "" : "md:[direction:rtl]"}`}
          style={{ minHeight: 340 }}>

          {/* Foto */}
          <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover object-top transition-transform duration-700"
              style={{
                transform: hovered ? "scale(1.07)" : "scale(1)",
                minHeight: 340,
              }}
            />
            {/* Overlay foto */}
            <div className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: isEven
                  ? "linear-gradient(to right, transparent 55%, rgba(247,248,250,1) 100%)"
                  : "linear-gradient(to left,  transparent 55%, rgba(247,248,250,1) 100%)",
                opacity: hovered ? 0.6 : 1,
              }} />
            {/* Número de índice decorativo */}
            <div
              className="absolute top-6 transition-all duration-500"
              style={{
                [isEven ? "left" : "right"]: 24,
                opacity: hovered ? 0 : 0.12,
                fontSize: "7rem",
                fontWeight: 900,
                lineHeight: 1,
                color: C.brand,
                letterSpacing: "-0.06em",
                userSelect: "none",
              }}>
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Texto */}
          <div
            className="flex flex-col justify-center px-12 py-12"
            style={{ direction: "ltr", background: hovered ? C.brandSoft : C.bg, transition: "background 0.4s" }}
          >
            {/* Rol */}
            <div className="text-xs font-bold tracking-widest uppercase mb-3 transition-colors duration-300"
              style={{ color: C.brand }}>
              {member.role}
            </div>
            {/* Nombre */}
            <h2
              className="font-black leading-tight mb-4 transition-all duration-300"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                color: C.text,
                letterSpacing: "-0.025em",
                transform: hovered ? "translateX(8px)" : "translateX(0)",
              }}>
              {member.name}
            </h2>
            {/* Short bio */}
            <p className="text-base leading-relaxed mb-6" style={{ color: C.textMid, maxWidth: "38ch" }}>
              {member.short}
            </p>
            {/* CTA */}
            <div className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300"
              style={{
                color: C.brand,
                transform: hovered ? "translateX(6px)" : "translateX(0)",
              }}>
              Ver perfil completo
              <IconArrowRight size={16} stroke={2.25} />
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <ProfileModal member={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaBanner() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="py-24 px-8 sm:px-14 lg:px-20" style={{ background: C.brand }}>
      <div className={`max-w-7xl grid md:grid-cols-2 gap-10 items-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.6)" }}>Únete a la causa</div>
          <h2 className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            Sé parte de{" "}
            <span style={{ color: C.accent }}>nuestra misión</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-base leading-relaxed md:text-right max-w-sm"
            style={{ color: "rgba(255,255,255,0.78)" }}>
            Juntos podemos acompañar a más pacientes y familias que enfrentan un diagnóstico que cambia la vida.
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

export default function Equipo() {
  return (
    <div className="min-h-screen font-sans" style={{ background: C.bg }}>
      <Navbar />
      <Hero />

      {/* Todos en filas de ancho completo */}
      <div style={{ background: C.bg }}>
        {TEAM.map((m, i) => (
          <MemberRow key={m.name} member={m} index={i} />
        ))}
      </div>

      <CtaBanner />
      <Footer />
    </div>
  );
}