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
  IconCalendar,
  IconShieldCheck,
  IconWorld,
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

// ─── Hero — editorial, imagen de fondo, sin número protagonista ───────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const rise = (delay = 0) => ({
    transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section className="relative flex items-end overflow-hidden"
      style={{ minHeight: "85vh" }}>

      {/* Imagen de fondo — foto del Esperanza Fest o equipo */}
      <div className="absolute inset-0" style={{
        backgroundImage: "url('/acerca/esperanza1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }} />

      {/* Overlay degradado fuerte abajo, suave arriba */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(10,14,30,0.3) 0%, rgba(10,14,30,0.55) 40%, rgba(10,14,30,0.92) 100%)",
      }} />

      {/* Acento rojo ambiental izquierda */}
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{
        width: "36rem", height: "36rem",
        background: `radial-gradient(circle at 0% 100%, ${C.brand}30 0%, transparent 55%)`,
      }} />

      {/* Contenido — alineado abajo izquierda */}
      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-24 pt-40">
        <div className="max-w-7xl">

          <div style={rise(0)}>
            <SectionLabel light>Nuestra historia</SectionLabel>
          </div>

          <h1 className="font-black leading-none mb-6"
            style={{
              ...rise(120),
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              color: "#fff",
              letterSpacing: "-0.03em",
              maxWidth: "820px",
            }}>
            Una historia de{" "}
            <span style={{ color: C.brand }}>dolor</span>{" "}
            que se convirtió en{" "}
            <span style={{ color: C.brand }}>propósito</span>
          </h1>

          <p className="text-base leading-relaxed mb-10 max-w-xl"
            style={{ ...rise(240), color: "rgba(255,255,255,0.72)" }}>
            Nació de una experiencia personal, de un sueño y de una necesidad.
            Hoy somos el espacio de apoyo, esperanza y acompañamiento que alguna vez faltó.
          </p>

          {/* Cita inline — editorial */}
          <div className="max-w-lg pl-6 mb-10"
            style={{ ...rise(320), borderLeft: `3px solid ${C.brand}` }}>
            <p className="text-lg font-semibold italic leading-relaxed"
              style={{ color: "rgba(255,255,255,0.85)" }}>
              "Nadie debería enfrentar un diagnóstico de leucemia solo.
              Nosotros existimos para que eso no ocurra."
            </p>
            <div className="mt-3 text-xs font-bold tracking-widest uppercase"
              style={{ color: C.brand }}>
              Marco Sanchez · Presidente
            </div>
          </div>

          <div style={rise(400)}>
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

// ─── Misión / tres pilares ─────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: IconPill,
    title: "Gestión Médica",
    body: "Orientación especializada y acceso a medicamentos para que cada paciente reciba el tratamiento que merece.",
  },
  {
    icon: IconHeartHandshake,
    title: "Atención Psicológica",
    body: "Apoyo individual y grupal, con costos accesibles e incluso gratuito, para el paciente y su familia.",
  },
  {
    icon: IconScale,
    title: "Asesoría Jurídica",
    body: "Orientación práctica para proteger los derechos de salud de cada paciente ante cualquier institución.",
  },
];

function Mission() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ background: C.surface }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-7xl">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel>Nuestros comienzos</SectionLabel>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, letterSpacing: "-0.025em" }}>
            Desde el inicio, nuestro objetivo fue{" "}
            <span style={{ color: C.brand }}>claro</span>
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.textMid }}>
            Ayudar a los pacientes a vivir de la mejor manera posible durante y después del
            cáncer. Por eso construimos una fundación sobre tres pilares fundamentales, y
            también nos propusimos ser pioneros en la promoción de avances, la detección
            temprana y el tratamiento de la leucemia en México.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((p, i) => (
            <div key={p.title}
              className={`rounded-3xl p-8 border transition-all duration-500 hover:shadow-md hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms`, borderColor: C.border, background: C.bg }}>
              <div className="inline-flex items-center justify-center rounded-2xl mb-6"
                style={{ width: 52, height: 52, background: C.brandSoft, color: C.brand }}>
                <p.icon size={24} stroke={1.75} />
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: C.text }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.textMid }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Línea de tiempo con imágenes ─────────────────────────────────────────────
const TIMELINE = [
  {
    date:   "Origen",
    icon:   IconHeart,
    title:  "Una historia personal",
    body:   "A los 15 años, nuestro Presidente fue diagnosticado con leucemia mieloide crónica. En medio de ese proceso, enfrentando miedos, tratamientos y la incertidumbre de cada día, se dio cuenta de algo que le dolió profundamente: en México no existían instituciones dedicadas a acompañar de manera integral a los pacientes con leucemia y otros tipos de cáncer. Así, de su propia vivencia y del deseo de hacer que otros no enfrentaran este camino solos, surgió la idea de crear un espacio de apoyo, esperanza y acompañamiento.",
    images: [],
  },
  {
    date:   "Esperanza Fest",
    icon:   IconCalendar,
    title:  "Nuestro primer gran paso",
    body:   "Nuestro primer gran paso como fundación se dio en el Esperanza Fest, un evento que marcaría un antes y un después en nuestra misión. Fue la primera vez que logramos reunir en un mismo espacio a autoridades gubernamentales, representantes de la sociedad civil, actores del sector privado y, lo más importante, a nuestros primeros embajadores: personas comprometidas con la causa de los pacientes con leucemia. Aquella jornada no solo sirvió para dar a conocer nuestra existencia, sino también para construir los primeros puentes de colaboración que hoy siguen sosteniendo nuestra labor. Entre charlas, testimonios y actividades de concientización, sentimos que nuestro sueño comenzaba a tomar forma: una red de apoyo sólida, cercana y humana que pudiera acompañar a quienes enfrentan un diagnóstico que cambia la vida, recordándoles que no están solos.",
    images: [
      "/acerca/esperanza1.jpg",
      "/acerca/esperanza2.jpg",
      "/acerca/esperanza3.jpg",
    ],
  },
  {
    date:   "15 · Nov · 2025",
    icon:   IconShieldCheck,
    title:  "Asociación Civil",
    body:   "Nos constituimos formalmente como A.C., consolidando nuestra estructura legal. Esto nos permitió extender nuestra ayuda a pacientes de distintas regiones de México y de otros países de Latinoamérica, como Perú y Colombia.",
    images: [
      "/acerca/constitucion1.jpg",
      "/acerca/constitucion2.jpg",
    ],
  },
  {
    date:   "Hoy",
    icon:   IconWorld,
    title:  "Trabajando día a día",
    body:   "Cada historia de un paciente que logra continuar su tratamiento, cada sonrisa tras una sesión de apoyo psicológico, y cada familia que siente alivio al encontrar un espacio seguro nos recuerda por qué existimos.",
    images: [],
  },
];

function Timeline() {
  const [ref, visible] = useReveal(0.05);
  return (
    <section ref={ref} style={{ background: C.bg }} className="py-28 px-8 sm:px-14 lg:px-20">
      <div className="max-w-5xl">

        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel>El camino recorrido</SectionLabel>
          <h2 className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, letterSpacing: "-0.025em" }}>
            De una experiencia personal{" "}
            <span style={{ color: C.brand }}>a una fundación</span>
          </h2>
        </div>

        <div className="flex flex-col gap-20">
          {TIMELINE.map((item, i) => {
            const isLast = i === TIMELINE.length - 1;
            const hasImages = item.images.length > 0;
            return (
              <div
                key={item.title}
                className={`transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 160 + 150}ms` }}
              >
                {/* Header del momento */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center rounded-full shadow-sm shrink-0"
                    style={{
                      width: 48, height: 48,
                      background: isLast ? C.brand : C.surface,
                      border: `2px solid ${isLast ? C.brand : C.border}`,
                    }}>
                    <item.icon size={20} stroke={1.75}
                      style={{ color: isLast ? "#fff" : C.brand }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase"
                      style={{ color: C.brand }}>{item.date}</div>
                    <h3 className="font-black text-xl leading-tight mt-0.5"
                      style={{ color: C.text, letterSpacing: "-0.02em" }}>{item.title}</h3>
                  </div>
                </div>

                {/* Contenido: texto + imágenes */}
                {hasImages ? (
                  <div className="grid md:grid-cols-2 gap-8 items-start pl-16">
                    {/* Texto */}
                    <p className="text-base leading-relaxed" style={{ color: C.textMid }}>
                      {item.body}
                    </p>
                    {/* Galería de fotos */}
                    <div className={`grid gap-3 ${item.images.length === 3 ? "grid-cols-2" : "grid-cols-2"}`}>
                      {item.images.map((src, j) => (
                        <div
                          key={j}
                          className={`overflow-hidden rounded-2xl shadow-sm ${
                            item.images.length === 3 && j === 0 ? "col-span-2" : ""
                          }`}
                          style={{ aspectRatio: item.images.length === 3 && j === 0 ? "16/7" : "4/3" }}
                        >
                          <img src={src} alt={`${item.title} ${j + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="pl-16">
                    <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.textMid }}>
                      {item.body}
                    </p>
                  </div>
                )}

                {/* Separador — excepto el último */}
                {!isLast && (
                  <div className="mt-16 ml-6 w-px h-8" style={{ background: C.border }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Estatus jurídico ─────────────────────────────────────────────────────────
function LegalStatus() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="py-28 px-8 sm:px-14 lg:px-20" style={{ background: C.text }}>
      <div className="max-w-7xl grid md:grid-cols-2 gap-16 items-start">

        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <SectionLabel light>Estatus jurídico</SectionLabel>
          <h2 className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#fff", letterSpacing: "-0.025em" }}>
            Transparencia y{" "}
            <span style={{ color: C.brand }}>compromiso legal</span>
          </h2>
          <p className="leading-relaxed mb-5 text-base" style={{ color: "rgba(255,255,255,0.68)" }}>
            En Mejoremos Realidades A.C. creemos que la confianza se construye con
            transparencia. Nos constituimos formalmente como Asociación Civil en noviembre
            de 2024 para brindar certeza jurídica y seguridad a nuestros pacientes,
            donadores, aliados y embajadores.
          </p>
          <p className="leading-relaxed mb-10 text-base" style={{ color: "rgba(255,255,255,0.68)" }}>
            Actualmente estamos dados de alta ante el SAT y trabajamos activamente para
            obtener la autorización como{" "}
            <strong style={{ color: "#fff" }}>Donataria Autorizada</strong>, lo que
            permitirá ofrecer mayores beneficios fiscales a quienes confían en nuestra labor.
          </p>

          <Link
            to="/aviso-de-privacidad"
            className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{ color: C.brand }}
          >
            <IconShieldCheck size={18} stroke={2} />
            Consultar Aviso de Privacidad
            <IconArrowRight size={15} stroke={2.25} />
          </Link>
        </div>

        <div className={`flex flex-col gap-4 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          {[
            {
              icon: IconShieldCheck,
              label: "Asociación Civil constituida",
              sub:   "Noviembre 2025 · Registro formal ante notaría pública",
              done:  true,
            },
            {
              icon: IconScale,
              label: "Alta ante el SAT",
              sub:   "Cumplimiento de requisitos legales vigentes",
              done:  true,
            },
            {
              icon: IconHeart,
              label: "Donataria Autorizada",
              sub:   "En proceso de obtención — beneficios fiscales para donadores",
              done:  false,
            },
          ].map(({ icon: Icon, label, sub, done }) => (
            <div key={label}
              className="flex items-start gap-4 rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="inline-flex items-center justify-center rounded-xl shrink-0"
                style={{ width: 44, height: 44, background: done ? C.brand : "rgba(255,255,255,0.08)", color: done ? "#fff" : "rgba(255,255,255,0.4)" }}>
                <Icon size={20} stroke={1.75} />
              </div>
              <div>
                <div className="font-bold text-sm mb-0.5" style={{ color: done ? "#fff" : "rgba(255,255,255,0.5)" }}>
                  {label}
                  {done && (
                    <span className="ml-2 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{ background: C.brand, color: "#fff" }}>✓ Activo</span>
                  )}
                  {!done && (
                    <span className="ml-2 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(245,166,35,0.2)", color: C.accent }}>En proceso</span>
                  )}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{sub}</div>
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
            <Link to="/servicios"
              className="inline-flex items-center gap-2 font-semibold text-sm px-9 py-4 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "rgba(255,255,255,0.45)", color: "#fff" }}>
              Ver servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AcercaDe ─────────────────────────────────────────────────────────────────
export default function AcercaDe() {
  return (
    <div className="min-h-screen font-sans" style={{ background: C.bg }}>
      <Navbar />
      <Hero />
      <Mission />
      <Timeline />
      <LegalStatus />
      <CtaBanner />
      <Footer />
    </div>
  );
}