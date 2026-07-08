import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

// ─── Brand palette ────────────────────────────────────────────────────────────
const COLORS = {
  brand: "#F21D44",
  secondary: "#293972",
  accent: "#FFB119",
};

// ─── Real team data ───────────────────────────────────────────────────────────
const TEAM = [
  {
    id: "01",
    name: "Marco Sanchez",
    role: "Presidente",
    area: "Derecho",
    img: "https://img1.wsimg.com/isteam/ip/de14c48c-6392-4155-8907-b87ab2e40fa5/Captura%20de%20pantalla%202024-05-18%20a%20la(s)%2012.23.2.png/:/cr=t:0%25,l:0.69%25,w:98.63%25,h:100%25/rs=w:600,h:800,cg:true",
    shortBio: "Diagnosticado con leucemia mieloide cronica a los 15 anos, fundador de Mejoremos Realidades.",
    fullBio:
      "Un joven diagnosticado con leucemia mieloide cronica a los 15 anos, preocupado por los pacientes con leucemia y sus familias, decidio emprender Fundacion Mejoremos Realidades como un lugar en el que las personas se sintieran seguras, fueran orientadas y contaran con una red de apoyo que hiciera del diagnostico algo mas llevadero. Estudia el ultimo ano de la carrera de Derecho, cree fervientemente que hay una vida vivible durante y despues del diagnostico. Mejoremos Realidades nacio de una necesidad, pero se convirtio en un sueno que transforma vidas.",
    discipline: "Derecho",
  },
  {
    id: "02",
    name: "Danna Martinez",
    role: "Secretaria General",
    area: "Medicina",
    img: "https://img1.wsimg.com/isteam/ip/de14c48c-6392-4155-8907-b87ab2e40fa5/IMG_5646.jpg/:/cr=t:0%25,l:3.42%25,w:93.17%25,h:100%25/rs=w:600,h:800,cg:true",
    shortBio: "Estudiante de medicina con investigacion especializada en leucemia y cancer.",
    fullBio:
      "Mujer estudiante de medicina que ha dedicado parte de su proceso de investigacion medica a aquello relacionado a la leucemia, derivados y cancer en general. Es una persona preocupada y ocupada por los demas, empatica y solidaria. Considera que los medicos que son el primer contacto con el paciente deben tener desarrollado su sentido humano para entender que se esta tratando con personas. Mejoremos Realidades hace del diagnostico algo mas llevadero, de tu mano.",
    discipline: "Medicina",
  },
  {
    id: "03",
    name: "Maria Jose Martinez",
    role: "Tesorera",
    area: "Derecho",
    img: "https://img1.wsimg.com/isteam/ip/de14c48c-6392-4155-8907-b87ab2e40fa5/8ba2053f-c359-44c9-9f98-587da44a46bd.JPG/:/cr=t:0%25,l:4.55%25,w:90.9%25,h:100%25/rs=w:600,h:800,cg:true",
    shortBio: "Proxima abogada con enfoque en Derechos Humanos y acceso a la salud.",
    fullBio:
      "Estudia el ultimo ano de Derecho; sus principales lineas de accion han sido el respeto a los Derechos Humanos y la obligacion del Estado Mexicano de garantizar el acceso a ellos. En Mejoremos Realidades tiene como maximas la transparencia, rendicion de cuentas y el uso adecuado de los recursos. El Derecho Humano de acceso a los servicios de salud es fundamental para tener una calidad de vida digna.",
    discipline: "Derecho",
  },
  {
    id: "04",
    name: "Diego Castilla",
    role: "Director Institucional",
    area: "Medicina",
    img: "https://img1.wsimg.com/isteam/ip/de14c48c-6392-4155-8907-b87ab2e40fa5/Captura%20de%20pantalla%202024-05-20%20a%20la(s)%204.36.18.png/:/cr=t:10.9%25,l:0%25,w:100%25,h:78.21%25/rs=w:600,h:800,cg:true",
    shortBio: "Estudiante de medicina enfocado en alianzas y atencion integral al paciente.",
    fullBio:
      "Estudiante de medicina con particular interes en generar alianzas que garanticen el bienestar de los pacientes con cancer. Ha dedicado parte de su labor a generar contacto de primera mano con los pacientes a fin de canalizarlos a donde su diagnostico sea tratado integralmente. Su responsabilidad, respeto, compromiso y empatia son su sello en Mejoremos Realidades.",
    discipline: "Medicina",
  },
  {
    id: "05",
    name: "Andrea Amaya",
    role: "Directora de Operaciones Tecnologicas",
    area: "Tecnologia",
    img: "https://img1.wsimg.com/isteam/ip/de14c48c-6392-4155-8907-b87ab2e40fa5/PHOTO-2025-10-31-11-32-23.jpg/:/cr=t:0%25,l:2.38%25,w:95.24%25,h:100%25/rs=w:600,h:800,cg:true",
    shortBio: "Licenciada en matematicas aplicadas que impulsa la innovacion con proposito humano.",
    fullBio:
      "Licenciada en matematicas aplicadas con un profundo interes en ayudar a las personas a traves de la tecnologia. Cree firmemente que la innovacion solo tiene sentido cuando mejora la vida de los demas y promueve la equidad, especialmente en los ambitos donde la salud y la esperanza se entrelazan. Impulsa una forma mas humana de entender la innovacion.",
    discipline: "Matematicas Aplicadas",
  },
];

// ─── Reveal hook ──────────────────────────────────────────────────────────────
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

// ─── Cursor glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const fn = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <div
      className="pointer-events-none fixed z-0 rounded-full"
      style={{
        width: 500,
        height: 500,
        left: pos.x - 250,
        top: pos.y - 250,
        background: `radial-gradient(circle, ${COLORS.secondary}18 0%, transparent 65%)`,
        transition: "left 0.18s ease, top 0.18s ease",
      }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function TeamHero() {
  return (
    <section className="relative min-h-[58vh] flex items-end overflow-hidden pt-20" style={{ background: "#0B0E1A" }}>
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 0, transparent 80px),
                            repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 0, transparent 80px)`,
        }}
      />
      {/* Brand left bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: COLORS.brand }} />
      {/* Secondary glow right */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at right center, ${COLORS.secondary}25 0%, transparent 70%)` }}
      />
      {/* Ghosted large number */}
      <div
        className="absolute right-4 bottom-0 font-black select-none leading-none"
        style={{ fontSize: "clamp(8rem,22vw,20rem)", color: COLORS.brand, opacity: 0.04 }}
      >
        05
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pb-20 w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px" style={{ background: COLORS.accent }} />
          <p className="text-xs font-bold tracking-[0.5em] uppercase" style={{ color: COLORS.accent }}>
            Las personas detras de la causa
          </p>
        </div>
        <h1
          className="font-black text-white leading-[0.88] mb-8"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
        >
          Nuestro
          <br />
          <span style={{ color: COLORS.brand }}>Equipo.</span>
        </h1>
        <div className="flex items-center gap-6">
          <div className="w-14 h-px" style={{ background: COLORS.accent }} />
          <p className="text-sm tracking-widest uppercase font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            5 personas — 1 mision
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Stats strip ──────────────────────────────────────────────────────────────
function TeamStats() {
  const [ref, visible] = useReveal(0.2);
  return (
    <div ref={ref} style={{ background: COLORS.secondary, borderTop: `1px solid ${COLORS.accent}30` }}>
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 divide-x py-10" style={{ divideColor: "rgba(255,255,255,0.1)" }}>
        {[
          { n: "5", label: "Integrantes" },
          { n: "3", label: "Disciplinas" },
          { n: "2019", label: "Desde" },
          { n: "1", label: "Mision" },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`px-8 text-center transition-all duration-700 border-r border-white/10 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="font-black text-4xl mb-1" style={{ color: COLORS.accent }}>{s.n}</div>
            <div className="text-white/50 text-[10px] tracking-[0.3em] uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────
function FilterTabs({ active, onChange }) {
  const tabs = ["Todos", "Derecho", "Medicina", "Tecnologia", "Matematicas Aplicadas"];
  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="text-[10px] tracking-[0.3em] uppercase font-bold px-5 py-2.5 transition-all duration-300"
          style={
            active === t
              ? { background: COLORS.brand, color: "#fff" }
              : { border: `1px solid ${COLORS.secondary}60`, color: "rgba(255,255,255,0.35)" }
          }
          onMouseEnter={e => { if (active !== t) { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; } }}
          onMouseLeave={e => { if (active !== t) { e.currentTarget.style.borderColor = `${COLORS.secondary}60`; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; } }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ─── View toggle ──────────────────────────────────────────────────────────────
function ViewToggle({ mode, onChange }) {
  return (
    <div className="flex gap-1 p-1" style={{ border: `1px solid ${COLORS.secondary}50` }}>
      {[{ key: "featured", label: "Destacado" }, { key: "grid", label: "Cuadricula" }].map((v) => (
        <button
          key={v.key}
          onClick={() => onChange(v.key)}
          className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all duration-200"
          style={mode === v.key ? { background: COLORS.secondary, color: "#fff" } : { color: "rgba(255,255,255,0.3)" }}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────
function MemberCardFeatured({ member, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="grid lg:grid-cols-2 gap-0 border transition-all duration-500"
        style={{ borderColor: hovered ? `${COLORS.accent}40` : `${COLORS.secondary}30`, background: "#0D1020" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className={`relative overflow-hidden h-[460px] ${isEven ? "" : "lg:order-2"}`}>
          <img
            src={member.img}
            alt={member.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ${
              hovered ? "scale-105 grayscale-0" : "grayscale scale-100"
            }`}
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: isEven
                ? `linear-gradient(to right, transparent 40%, #0D1020)`
                : `linear-gradient(to left, transparent 40%, #0D1020)`,
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0D1020 0%, transparent 50%)" }} />

          {/* Ghost number */}
          <div
            className="absolute top-5 left-5 font-black select-none leading-none"
            style={{ fontSize: "6rem", color: "#fff", opacity: 0.05 }}
          >
            {member.id}
          </div>

          {/* Discipline pill */}
          <div className="absolute bottom-5 left-5">
            <span
              className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5"
              style={{ background: COLORS.secondary, color: COLORS.accent }}
            >
              {member.discipline}
            </span>
          </div>

          {/* Gold bottom bar on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-500 origin-left"
            style={{ background: COLORS.accent, transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>

        {/* Content */}
        <div className={`flex flex-col justify-center p-10 lg:p-14 relative ${isEven ? "" : "lg:order-1"}`}>
          {/* Area label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px" style={{ background: COLORS.accent }} />
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: COLORS.accent }}>
              {member.area} — {member.role}
            </p>
          </div>

          {/* Name */}
          <h2
            className="font-black text-white leading-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            {member.name}
          </h2>

          {/* Animated underline */}
          <div
            className="h-1 mb-6 rounded-full transition-all duration-500"
            style={{ background: COLORS.brand, width: hovered ? "80px" : "36px" }}
          />

          {/* Short bio */}
          <p className="text-white/55 text-sm leading-relaxed mb-4">{member.shortBio}</p>

          {/* Full bio accordion */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: bioOpen ? "360px" : "0px" }}
          >
            <p
              className="text-white/40 text-sm leading-relaxed pb-5 pl-4 border-l"
              style={{ borderColor: `${COLORS.secondary}80` }}
            >
              {member.fullBio}
            </p>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setBioOpen(!bioOpen)}
            className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase w-fit mt-2 transition-colors"
            style={{ color: COLORS.brand }}
          >
            {bioOpen ? "Cerrar" : "Leer mas"}
            <span
              className="w-5 h-5 flex items-center justify-center border transition-transform duration-300"
              style={{ borderColor: COLORS.brand, transform: bioOpen ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              <span className="block w-2.5 h-px" style={{ background: COLORS.brand }} />
            </span>
          </button>

          {/* Ghost number corner */}
          <div
            className="absolute bottom-4 right-6 font-black select-none"
            style={{ fontSize: "5rem", color: COLORS.secondary, opacity: 0.3 }}
          >
            {member.id}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grid card ────────────────────────────────────────────────────────────────
function MemberCardGrid({ member, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);

  return (
    <div
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="border transition-all duration-400 h-full flex flex-col"
        style={{
          borderColor: hovered ? `${COLORS.accent}50` : `${COLORS.secondary}30`,
          background: "#0D1020",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative h-72 overflow-hidden flex-shrink-0">
          <img
            src={member.img}
            alt={member.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ${
              hovered ? "scale-108 grayscale-0" : "grayscale scale-100"
            }`}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0D1020 0%, transparent 55%)" }} />

          {/* Number */}
          <div
            className="absolute top-3 right-4 font-black select-none"
            style={{ fontSize: "3.5rem", color: "#fff", opacity: 0.05, lineHeight: 1 }}
          >
            {member.id}
          </div>

          {/* Discipline */}
          <div className="absolute bottom-4 left-4">
            <span
              className="text-[8px] font-bold tracking-[0.3em] uppercase px-3 py-1.5"
              style={{ background: COLORS.secondary, color: COLORS.accent }}
            >
              {member.discipline}
            </span>
          </div>

          {/* Gold bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-400 origin-left"
            style={{ background: COLORS.accent, transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>

        {/* Info */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-px" style={{ background: COLORS.accent }} />
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: COLORS.accent }}>
              {member.role}
            </p>
          </div>
          <h3 className="font-black text-white text-xl leading-tight mb-3">{member.name}</h3>
          <div
            className="h-0.5 mb-4 rounded-full transition-all duration-400"
            style={{ background: COLORS.brand, width: hovered ? "50px" : "24px" }}
          />
          <p className="text-white/45 text-xs leading-relaxed mb-4 flex-1">{member.shortBio}</p>

          {/* Accordion */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: bioOpen ? "280px" : "0px" }}
          >
            <p
              className="text-white/35 text-xs leading-relaxed pb-4 pl-3 border-l"
              style={{ borderColor: `${COLORS.secondary}60` }}
            >
              {member.fullBio}
            </p>
          </div>

          <button
            onClick={() => setBioOpen(!bioOpen)}
            className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.3em] uppercase mt-auto w-fit"
            style={{ color: COLORS.brand }}
          >
            <span
              className="w-4 h-4 flex items-center justify-center border transition-transform duration-300"
              style={{ borderColor: COLORS.brand, transform: bioOpen ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              <span className="w-2 h-px" style={{ background: COLORS.brand, display: "block" }} />
            </span>
            {bioOpen ? "Cerrar" : "Ver mas"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Team grid section ────────────────────────────────────────────────────────
function TeamGrid() {
  const [ref, visible] = useReveal(0.05);
  const [filter, setFilter] = useState("Todos");
  const [viewMode, setViewMode] = useState("featured");

  const filtered =
    filter === "Todos"
      ? TEAM
      : TEAM.filter((m) => m.discipline === filter || m.area === filter);

  return (
    <section ref={ref} className="py-24 px-6" style={{ background: "#0B0E1A" }}>
      <div className="max-w-7xl mx-auto">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <FilterTabs active={filter} onChange={setFilter} />
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>

        {/* Featured */}
        {viewMode === "featured" && (
          <div className="flex flex-col gap-px" style={{ background: `${COLORS.secondary}20` }}>
            {filtered.map((m, i) => (
              <MemberCardFeatured key={m.id} member={m} index={i} visible={visible} />
            ))}
          </div>
        )}

        {/* Grid */}
        {viewMode === "grid" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((m, i) => (
              <MemberCardGrid key={m.id} member={m} index={i} visible={visible} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-sm tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
              Sin resultados para este filtro
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Join CTA ─────────────────────────────────────────────────────────────────
function JoinCTA() {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: COLORS.secondary }}
    >
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 32px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gold top strip */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: COLORS.accent }} />
      {/* Brand bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: COLORS.brand }} />

      <div
        className={`max-w-3xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px" style={{ background: COLORS.accent }} />
          <p className="text-xs font-bold tracking-[0.5em] uppercase" style={{ color: COLORS.accent }}>
            Suma tu talento
          </p>
          <div className="w-8 h-px" style={{ background: COLORS.accent }} />
        </div>

        <h2
          className="font-black text-white leading-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          Forma parte del
          <br />
          <span style={{ color: COLORS.accent }}>cambio.</span>
        </h2>

        <p className="text-white/55 text-base leading-relaxed mb-10 max-w-lg mx-auto">
          Buscamos profesionistas y estudiantes comprometidos con la salud, el derecho y
          el bienestar de quienes mas lo necesitan.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:mejoremosrealidadesfundacion@gmail.com"
            className="font-bold text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 inline-block"
            style={{ background: COLORS.brand, color: "#fff" }}
            onMouseEnter={e => { e.currentTarget.style.background = COLORS.accent; e.currentTarget.style.color = "#0B0E1A"; }}
            onMouseLeave={e => { e.currentTarget.style.background = COLORS.brand; e.currentTarget.style.color = "#fff"; }}
          >
            Contactanos
          </a>
          <Link
            to="/acerca-de"
            className="font-medium text-xs tracking-widest uppercase px-8 py-4 border transition-all duration-300 inline-block text-white"
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
          >
            Conoce la fundacion
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Equipo() {
  return (
    <div className="min-h-screen font-sans relative" style={{ background: "#0B0E1A" }}>
      <CursorGlow />
      <Navbar />
      <TeamHero />
      <TeamStats />
      <TeamGrid />
      <JoinCTA />
      <Footer />
    </div>
  );
}