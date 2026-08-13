import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
  IconHeart,
  IconArrowRight,
  IconX,
  IconExternalLink,
  IconPhoto,
} from "@tabler/icons-react";

const C = {
  brand:        "#C8384F",
  brandSoft:    "#FAE8EB",
  secondary:    "#3B5BA5",
  secondarySoft:"#EBF0FA",
  accent:       "#F5A623",
  bg:           "#F7F8FA",
  surface:      "#FFFFFF",
  text:         "#1A2235",
  textMid:      "#4B5563",
  textLight:    "#9CA3AF",
  border:       "#E5E7EB",
};

// ─── Alianzas data ─────────────────────────────────────────────────────────────
const ALIANZAS = [
  {
    id:      "casapas",
    logo:    "/alianzas/casapas.png",
    name:    "Casa PAS",
    url:     "https://www.pas.org.mx",
    tag:     "Alianza estratégica",
    tagColor: C.brand,
    summary: "Casa PAS es una organización dedicada al acompañamiento integral de personas vulnerables. Fundación Mejoremos Realidades trabaja de la mano con su equipo para ampliar el alcance de los servicios de apoyo a pacientes con leucemia y sus familias, uniendo fuerzas en favor de quienes más lo necesitan.",
    photos: [
      "/alianzas/pas1.jpg",
      "/alianzas/pas2.jpg",
      "/alianzas/pas3.jpg",
      "/alianzas/pas4.jpg",
      "/alianzas/pas5.jpg",
      "/alianzas/pas6.jpg",
      "/alianzas/pas7.jpg",
      "/alianzas/pas8.jpg",
      "/alianzas/pas9.jpg",
      "/alianzas/pas10.jpg",
    ],
    bg: C.bg,
  },
  {
    id:      "dhilo",
    logo:    "/alianzas/dhilo.jpeg",
    name:    "DHILO MUN",
    url:     "https://www.instagram.com/dhi_lo_",
    tag:     "Modelo de Naciones Unidas",
    tagColor: C.secondary,
    summary: "Fundación Mejoremos Realidades participó en el Modelo de Naciones Unidas organizado por DHILO MUN en la Cámara de Diputados, posicionando la agenda de los derechos de salud de los pacientes con leucemia a nivel institucional. Una colaboración que lleva nuestra voz a los espacios donde se toman decisiones.",
    photos: [
      "/alianzas/Dhilo1.jpg",
      "/alianzas/Dhilo2.jpg",
      "/alianzas/Dhilo3.jpg",
      "/alianzas/Dhilo4.jpg",
      "/alianzas/Dhilo5.jpg",
    ],
    bg: C.surface,
  },
  {
    id:      "casahogar",
    logo:    "/alianzas/logo-casahogar.png",
    name:    "Casa Hogar Sagrado Corazón de Jesús",
    url:     "https://www.casahogarsagradocorazon.org",
    tag:     "Donación · Con DHILO MUN",
    tagColor: C.brand,
    summary: "Junto a DHILO MUN, Fundación Mejoremos Realidades llevó a cabo una jornada de donaciones en Casa Hogar y Estancia Sagrado Corazón de Jesús. Una acción concreta de solidaridad que refleja nuestro compromiso de transformar la realidad de quienes enfrentan situaciones de vulnerabilidad, más allá del diagnóstico.",
    photos: [
      "/alianzas/ninas1.jpg",
      "/alianzas/ninas2.jpg",
      "/alianzas/ninas3.jpg",
      "/alianzas/ninas4.jpg",
    ],
    bg: C.bg,
  },
];

// ─── Reveal hook ───────────────────────────────────────────────────────────────
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

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ photos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % photos.length);
      if (e.key === "ArrowLeft")  setCurrent((c) => (c - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [photos.length, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(10,14,30,0.95)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>

      {/* Cerrar */}
      <button onClick={onClose}
        className="absolute top-5 right-5 flex items-center justify-center rounded-full z-10"
        style={{ width: 42, height: 42, background: "rgba(255,255,255,0.12)", color: "#fff" }}>
        <IconX size={20} stroke={2} />
      </button>

      {/* Imagen */}
      <div className="relative flex items-center justify-center w-full h-full px-16"
        onClick={(e) => e.stopPropagation()}>
        <img src={photos[current]} alt={`Foto ${current + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />

        {/* Flechas */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((c) => (c - 1 + photos.length) % photos.length)}
              className="absolute left-4 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{ width: 48, height: 48, background: "rgba(255,255,255,0.12)", color: "#fff" }}>
              <IconArrowRight size={20} stroke={2} style={{ transform: "rotate(180deg)" }} />
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % photos.length)}
              className="absolute right-4 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{ width: 48, height: 48, background: "rgba(255,255,255,0.12)", color: "#fff" }}>
              <IconArrowRight size={20} stroke={2} />
            </button>
          </>
        )}

        {/* Contador */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {photos.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: i === current ? C.brand : "rgba(255,255,255,0.35)",
              }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Galería grid ─────────────────────────────────────────────────────────────
function PhotoGrid({ photos, visibleCount = 6 }) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const shown = expanded ? photos : photos.slice(0, visibleCount);
  const remaining = photos.length - visibleCount;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {shown.map((src, i) => {
          const isLast = !expanded && i === visibleCount - 1 && remaining > 0;
          return (
            <div key={src}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ aspectRatio: "4/3" }}
              onClick={() => isLast && !expanded ? setExpanded(true) : setLightbox(i)}>
              <img src={src} alt={`Foto ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-107" />
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(200,56,79,0.35)" }}>
                <IconPhoto size={28} stroke={1.75} style={{ color: "#fff" }} />
              </div>
              {/* "Ver más" encima de la última */}
              {isLast && (
                <div className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: "rgba(10,14,30,0.72)" }}>
                  <span className="text-3xl font-black" style={{ color: "#fff" }}>+{remaining}</span>
                  <span className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>Ver más</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {expanded && photos.length > visibleCount && (
        <button onClick={() => setExpanded(false)}
          className="mt-4 text-xs font-bold tracking-widest uppercase transition-colors"
          style={{ color: C.textLight }}>
          Ver menos ↑
        </button>
      )}

      {lightbox !== null && (
        <Lightbox photos={photos} startIndex={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
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
 
      {/* Foto de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <img src="/alianzas/pas1.jpg" alt="Alianzas Mejoremos Realidades"
          className="hero-img w-full h-full object-cover object-center" />
      </div>
 
      {/* Overlay */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(10,14,30,0.2) 0%, rgba(10,14,30,0.55) 45%, rgba(10,14,30,0.93) 100%)",
      }} />
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{
        width: "50rem", height: "30rem",
        background: `radial-gradient(ellipse at 0% 100%, ${C.brand}28 0%, transparent 60%)`,
      }} />
 
      {/* Contenido — abajo izquierda */}
      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-24 pt-40">
        <div className="max-w-7xl">
          <div style={rise(0)}><SectionLabel light>Red de colaboración</SectionLabel></div>
          <h1 className="font-black leading-none mb-6"
            style={{ ...rise(120), fontSize: "clamp(2.8rem, 8vw, 7rem)", color: "#fff", letterSpacing: "-0.03em", maxWidth: 800 }}>
            Nuestras <span style={{ color: C.brand }}>alianzas</span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl"
            style={{ ...rise(240), color: "rgba(255,255,255,0.72)" }}>
            Creemos que solos llegamos lejos, pero juntos llegamos más lejos. Por eso
            construimos alianzas con organizaciones, instituciones y colectivos que
            comparten nuestra visión de un México más solidario y justo.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Bloque de alianza ────────────────────────────────────────────────────────
function AlianzaBlock({ alianza, index }) {
  const [ref, visible] = useReveal();
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} id={alianza.id} style={{ background: alianza.bg }}
      className="py-28 px-8 sm:px-14 lg:px-20"
      style={{ background: alianza.bg, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl">

        {/* Header alianza */}
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-wrap items-center gap-5 mb-5">
            {/* Logo */}
            <div className="flex items-center justify-center rounded-2xl px-5 py-3 shadow-sm"
              style={{ background: C.surface, border: `1px solid ${C.border}`, height: 64 }}>
              <img src={alianza.logo} alt={alianza.name}
                className="h-10 w-auto object-contain" />
            </div>
            {/* Tag */}
            <span className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full"
              style={{ background: alianza.tagColor === C.brand ? C.brandSoft : C.secondarySoft, color: alianza.tagColor }}>
              {alianza.tag}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <h2 className="font-black leading-tight mb-4"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: C.text, letterSpacing: "-0.025em" }}>
                {alianza.name}
              </h2>
              <p className="text-base leading-relaxed" style={{ color: C.textMid }}>
                {alianza.summary}
              </p>
            </div>
            <div className="flex md:justify-end">
              <a href={alianza.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{ color: alianza.tagColor }}>
                <IconExternalLink size={16} stroke={2} />
                Visitar sitio oficial
              </a>
            </div>
          </div>
        </div>

        {/* Galería */}
        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: C.border }} />
            <span className="text-xs font-bold tracking-widest uppercase"
              style={{ color: C.textLight }}>
              {alianza.photos.length} {alianza.photos.length === 1 ? "foto" : "fotos"}
            </span>
          </div>
          <PhotoGrid
            photos={alianza.photos}
            visibleCount={alianza.photos.length <= 4 ? alianza.photos.length : 6}
          />
        </div>
      </div>
    </section>
  );
}

// ─── ¿Quieres ser aliado? ─────────────────────────────────────────────────────
function BecomeAlly() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="py-28 px-8 sm:px-14 lg:px-20" style={{ background: C.text }}>
      <div className="max-w-7xl grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <SectionLabel light>Súmate</SectionLabel>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            ¿Tu organización quiere{" "}
            <span style={{ color: C.brand }}>ser aliada</span>?
          </h2>
          <p className="leading-relaxed mb-5 text-base" style={{ color: "rgba(255,255,255,0.68)" }}>
            Buscamos construir puentes con instituciones, empresas, colectivos y
            organizaciones de la sociedad civil que compartan nuestra visión:
            garantizar que cada paciente con leucemia tenga acceso al apoyo que merece.
          </p>
          <p className="leading-relaxed mb-10 text-base" style={{ color: "rgba(255,255,255,0.68)" }}>
            Las alianzas que construimos son de colaboración real — eventos conjuntos,
            donaciones, presencia institucional y redes de apoyo — siempre con el
            paciente al centro.
          </p>
          <a href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: C.brand, color: "#fff" }}>
            Escríbenos <IconArrowRight size={16} stroke={2.25} />
          </a>
        </div>

        {/* Valores de alianza */}
        <div className={`flex flex-col gap-4 transition-all duration-1000 delay-200 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}>
          {[
            { title: "Colaboración real",    body: "No solo firma de convenios. Buscamos alianzas con impacto tangible en la vida de los pacientes." },
            { title: "Visibilidad compartida", body: "Amplificamos mutuamente nuestra presencia institucional ante medios, gobierno y sociedad civil." },
            { title: "Acción concreta",       body: "Donaciones, jornadas, eventos y programas conjuntos que llegan directamente a quienes los necesitan." },
          ].map(({ emoji, title, body }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="text-2xl shrink-0 mt-0.5">{emoji}</div>
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
            Tu apoyo o el de tu organización nos permite seguir construyendo redes
            que transforman la realidad de los pacientes.
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

export default function Alianzas() {
  return (
    <div className="min-h-screen font-sans" style={{ background: C.bg }}>
      <Navbar />
      <Hero />
      {ALIANZAS.map((a, i) => (
        <AlianzaBlock key={a.id} alianza={a} index={i} />
      ))}
      <BecomeAlly />
      <CtaBanner />
      <Footer />
    </div>
  );
}