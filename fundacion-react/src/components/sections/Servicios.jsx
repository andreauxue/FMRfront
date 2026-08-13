import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
  IconHeart,
  IconScale,
  IconPill,
  IconHeartHandshake,
  IconArrowRight,
  IconMessageCircle,
} from "@tabler/icons-react";


// ─── Paleta ────────────────────────────────────────────────────────────────────
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

// ─── Unsplash images por servicio (sin fotos propias) ─────────────────────────
const IMG = {
  heroBg:       "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80", // médico con paciente
  medica:       "/personas/diego2.jpeg",  // medicamentos/lab
  juridica:     "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80",  // abogado/libros
  psicologica:  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80",  // sesión apoyo
  sugerencias:  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",  // comunidad
};

// ─── Reveal hook ───────────────────────────────────────────────────────────────
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

// ─── Section label ─────────────────────────────────────────────────────────────
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
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: "72vh" }}>
      {/* Imagen de fondo */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url(${IMG.heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }} />
      {/* Overlay */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(10,14,30,0.25) 0%, rgba(10,14,30,0.6) 50%, rgba(10,14,30,0.93) 100%)",
      }} />
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{
        width: "40rem", height: "40rem",
        background: `radial-gradient(circle at 0% 100%, ${C.brand}28 0%, transparent 55%)`,
      }} />

      {/* Contenido */}
      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-24 pt-40 max-w-5xl">
        <div style={rise(0)}>
          <SectionLabel light>Nuestros servicios</SectionLabel>
        </div>

        <h1 className="font-black leading-none mb-8"
          style={{ ...rise(120), fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "#fff", letterSpacing: "-0.03em" }}>
          Apoyo <span style={{ color: C.brand }}>integral</span>,<br />
          sin costo alguno
        </h1>

        {/* Cita de Marco */}
        <div className="max-w-2xl pl-6 mb-10"
          style={{ ...rise(240), borderLeft: `3px solid ${C.brand}` }}>
          <p className="text-lg font-semibold italic leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)" }}>
            "Convertirnos en el apoyo incondicional de los pacientes con leucemia nos pone
            un paso más cerca de una vida digna y de calidad para ellos."
          </p>
          <div className="mt-3 text-xs font-bold tracking-widest uppercase"
            style={{ color: C.brand }}>
            Marco Sánchez · Presidente de Fundación Mejoremos Realidades
          </div>
        </div>

        {/* Anclas rápidas */}
        <div className="flex flex-wrap gap-3" style={rise(340)}>
          {[
            { label: "Gestión Médica",     href: "#medica" },
            { label: "Asesoría Jurídica",  href: "#juridica" },
            { label: "Apoyo Psicológico",  href: "#psicologica" },
            { label: "Sugerencias",        href: "#sugerencias" },
          ].map(({ label, href }) => (
            <a key={href} href={href}
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase px-5 py-2.5 rounded-full border transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.08)" }}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bloque de servicio — alterna izquierda/derecha ───────────────────────────
function ServiceBlock({ id, icon: Icon, tag, title, children, imgSrc, imgAlt, cta, ctaHref, reverse = false }) {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} id={id} className="py-28 px-8 sm:px-14 lg:px-20"
      style={{ background: reverse ? C.bg : C.surface }}>
      <div className="max-w-7xl grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Imagen */}
        <div className={`order-2 ${reverse ? "md:order-1" : "md:order-2"} transition-all duration-1000 ${
          visible ? "opacity-100 translate-x-0" : `opacity-0 ${reverse ? "-translate-x-10" : "translate-x-10"}`
        }`}>
          <div className="relative group rounded-3xl overflow-hidden shadow-lg"
            style={{ height: 440 }}>
            <img src={imgSrc} alt={imgAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            {/* Etiqueta flotante */}
            <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: C.brand }}>
              <Icon size={15} stroke={2} style={{ color: "#fff" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#fff" }}>{tag}</span>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className={`order-1 ${reverse ? "md:order-2" : "md:order-1"} transition-all duration-1000 delay-150 ${
          visible ? "opacity-100 translate-x-0" : `opacity-0 ${reverse ? "translate-x-10" : "-translate-x-10"}`
        }`}>
          <div className="inline-flex items-center justify-center rounded-2xl mb-6"
            style={{ width: 56, height: 56, background: C.brandSoft, color: C.brand }}>
            <Icon size={26} stroke={1.75} />
          </div>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: C.text, letterSpacing: "-0.025em" }}>
            {title}
          </h2>
          <div className="space-y-4 mb-8">
            {children}
          </div>
          <a href={ctaHref} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: C.brand, color: "#fff" }}>
            {cta}
            <IconArrowRight size={16} stroke={2.25} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Sugerencias ──────────────────────────────────────────────────────────────
function Sugerencias() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} id="sugerencias" className="py-28 px-8 sm:px-14 lg:px-20"
      style={{ background: C.text }}>
      <div className="max-w-7xl grid md:grid-cols-2 gap-16 items-center">

        {/* Imagen */}
        <div className={`relative group rounded-3xl overflow-hidden shadow-lg transition-all duration-1000 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`} style={{ height: 400 }}>
          <img src={IMG.sugerencias} alt="Comunidad Mejoremos Realidades"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,14,30,0.5) 0%, transparent 60%)" }} />
        </div>

        {/* Texto */}
        <div className={`transition-all duration-1000 delay-150 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}>
          <SectionLabel light>Sugerencias y comentarios</SectionLabel>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            Tu voz{" "}
            <span style={{ color: C.brand }}>nos transforma</span>
          </h2>
          <p className="leading-relaxed mb-4 text-base" style={{ color: "rgba(255,255,255,0.68)" }}>
            En Mejoremos Realidades creemos que escuchar también transforma. Cada opinión,
            historia o sugerencia que nos compartes nos ayuda a crecer, mejorar y seguir
            tejiendo esperanza junto a quienes forman parte de esta comunidad.
          </p>
          <p className="leading-relaxed mb-8 text-base" style={{ color: "rgba(255,255,255,0.68)" }}>
            Estamos abiertos a tus ideas, dudas y comentarios, porque nuestras acciones
            nacen del diálogo y del compromiso con las personas que acompañamos. Tu voz
            siempre será tomada en cuenta.
          </p>
          <a href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: C.brand, color: "#fff" }}>
            <IconMessageCircle size={18} stroke={2} />
            Escríbenos
            <IconArrowRight size={16} stroke={2.25} />
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
            style={{ color: "rgba(255,255,255,0.6)" }}>Sé parte del cambio</div>
          <h2 className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            Nadie debe enfrentar{" "}
            <span style={{ color: C.accent }}>este camino solo</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-base leading-relaxed md:text-right max-w-sm"
            style={{ color: "rgba(255,255,255,0.78)" }}>
            Tu apoyo nos permite acompañar a más pacientes y sus familias en cada etapa del camino.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/donar"
              className="inline-flex items-center gap-2 font-bold text-sm px-9 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#fff", color: C.brand }}>
              <IconHeart size={18} stroke={2} /> Donar ahora
            </Link>
            <Link to="/acerca-de"
              className="inline-flex items-center gap-2 font-semibold text-sm px-9 py-4 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "rgba(255,255,255,0.45)", color: "#fff" }}>
              Conocer más
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Servicios ────────────────────────────────────────────────────────────────
export default function Servicios() {
  return (
    <div className="min-h-screen font-sans" style={{ background: C.bg }}>
      <Navbar />
      <Hero />

      {/* Gestión Médica */}
      <ServiceBlock
        id="medica"
        icon={IconPill}
        tag="Gestión Médica"
        title="Te acompañamos en cada paso del proceso"
        imgSrc={IMG.medica}
        imgAlt="Gestión médica para pacientes con leucemia"
        cta="¿Necesitas medicamento?"
        ctaHref="https://fmejoremosrealidades.org/donar#53446785-6773-4e8f-add1-9ddc3f613b82"
        reverse={false}
      >
        <p className="text-base leading-relaxed" style={{ color: C.textMid }}>
          Enfrentar un diagnóstico como la leucemia no solo implica un tratamiento: implica
          incertidumbre, preguntas, citas, trámites, medicamentos y un sinfín de decisiones.
          Por eso ofrecemos un servicio de Gestión Médica que te acompaña en cada paso.
        </p>
        <p className="text-base leading-relaxed" style={{ color: C.textMid }}>
          Desde orientarte hacia los servicios de salud más adecuados a tu situación, hasta
          apoyar en el acceso a medicamentos con descuento o convenios especiales. Porque
          nadie debe enfrentar este proceso solo, ni sentirse excluido por falta de
          información, recursos o redes.
        </p>
      </ServiceBlock>

      {/* Asesoría Jurídica */}
      <ServiceBlock
        id="juridica"
        icon={IconScale}
        tag="Asesoría Jurídica"
        title="Tu salud es un derecho humano"
        imgSrc={IMG.juridica}
        imgAlt="Asesoría jurídica en derechos de salud"
        cta="Cuéntanos tu caso"
        ctaHref="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
        reverse={true}
      >
        <p className="text-base leading-relaxed" style={{ color: C.textMid }}>
          Cuando tu salud se ve comprometida —por demoras, falta de cobertura o
          desconocimiento— el acompañamiento legal marca la diferencia. Con nuestra
          Asesoría Jurídica, ponemos a tu disposición abogados especializados en Derecho
          Médico y Sanitario para que puedas exigir, con guía experta, lo que por ley
          te corresponde.
        </p>
        <p className="text-base leading-relaxed" style={{ color: C.textMid }}>
          Ya sea orientación sobre acceso a tratamientos, apelaciones o denuncia de
          vulneraciones, estamos contigo para escuchar, explicar y actuar. Tu lucha
          médica no es solo clínica: también es social, institucional y legal.
        </p>
      </ServiceBlock>

      {/* Atención Psicológica */}
      <ServiceBlock
        id="psicologica"
        icon={IconHeartHandshake}
        tag="Apoyo Psicológico"
        title={<>Tejiendo Esperanza:<br />redes de apoyo emocional</>}
        imgSrc={IMG.psicologica}
        imgAlt="Apoyo psicológico para pacientes con leucemia"
        cta="¿Necesitas acompañamiento?"
        ctaHref="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
        reverse={false}
      >
        <p className="text-base leading-relaxed" style={{ color: C.textMid }}>
          Sanar no solo es cuestión de tratamientos, sino también de vínculos, comprensión
          y acompañamiento. A través del programa <strong style={{ color: C.text }}>Tejiendo Esperanza</strong>,
          creamos redes de apoyo emocional entre pacientes y familiares, fortaleciendo el
          bienestar mental durante el proceso de tratamiento.
        </p>
        <p className="text-base leading-relaxed" style={{ color: C.textMid }}>
          Gracias a convenios con psicólogos y especialistas en salud emocional, brindamos
          atención profesional personalizada, sesiones de orientación y espacios de
          contención. Cada encuentro, cada palabra y cada historia compartida se entrelazan
          para formar una red viva de esperanza y fortaleza.
        </p>
      </ServiceBlock>

      <Sugerencias />
      <CtaBanner />
      <Footer />
    </div>
  );
}