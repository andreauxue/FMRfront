
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

// ============================================================
// PALETA
// ============================================================

const C = {
  brand: "#C8384F",
  brandSoft: "#FAE8EB",
  bg: "#F7F8FA",
  surface: "#FFFFFF",
  text: "#1A2235",
  textMid: "#4B5563",
  border: "#E5E7EB",
};

// ============================================================
// IMÁGENES
// ============================================================

const IMG = {
  heroBg:
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80",
  medica: "/personas/diego2.jpeg",
  juridica:
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80",
  psicologica:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80",
  sugerencias:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",
};

// ============================================================
// ANIMACIONES
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const VIEWPORT = {
  once: true,
  amount: 0.12,
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

function reveal(reducedMotion) {
  return {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: VIEWPORT,
  };
}

// ============================================================
// COMPONENTES COMPARTIDOS
// ============================================================

function SectionLabel({ children, light = false }) {
  return (
    <p
      className="
        mb-3 text-[11px]
        font-bold uppercase
        tracking-[0.14em]
      "
      style={{
        color: light
          ? "rgba(255,255,255,0.72)"
          : C.brand,
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  light = false,
  id,
}) {
  return (
    <h2
      id={id}
      className="
        text-[clamp(2rem,3.6vw,3.25rem)]
        font-extrabold
        leading-[1.12]
        tracking-[-0.045em]
      "
      style={{
        color: light ? "#FFFFFF" : C.text,
      }}
    >
      {children}
    </h2>
  );
}

// ============================================================
// HERO
// ============================================================

const SERVICE_LINKS = [
  { label: "Gestión médica", href: "#medica" },
  { label: "Asesoría jurídica", href: "#juridica" },
  { label: "Apoyo psicológico", href: "#psicologica" },
  { label: "Sugerencias", href: "#sugerencias" },
];

function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-hero-title"
      className="
        relative flex
        min-h-[600px]
        items-end
        overflow-hidden
        sm:min-h-[650px]
        lg:min-h-[700px]
      "
      style={{ backgroundColor: C.text }}
    >
      {/* Fotografía */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : { scale: 1.035 }
        }
        animate={{ scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 1.5,
          ease: EASE,
        }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${IMG.heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />

      {/* Overlay para mantener legibilidad */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,30,0.3) 0%, rgba(10,14,30,0.55) 45%, rgba(10,14,30,0.91) 100%)",
        }}
      />

      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-[1360px]
          px-5 pb-12 pt-32
          sm:px-8 sm:pb-14
          lg:px-12 lg:pb-16
          xl:px-16
          2xl:px-20
        "
      >
        <motion.div
          variants={
            reducedMotion ? undefined : stagger
          }
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          className="max-w-[900px]"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel light>
              Nuestros servicios
            </SectionLabel>
          </motion.div>

          <motion.h1
            id="services-hero-title"
            variants={fadeUp}
            className="
              mb-5
              text-[clamp(2.7rem,6.4vw,5.8rem)]
              font-extrabold
              leading-[1.03]
              tracking-[-0.055em]
              text-white
            "
          >
            Apoyo integral,
            <br />
            <span className="text-[#F08B9A]">
              sin costo alguno.
            </span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="
              mb-7 max-w-[680px]
              border-l-2 pl-5
            "
            style={{ borderColor: C.brand }}
          >
            <blockquote
              className="
                text-[15px]
                font-medium italic
                leading-[1.75]
                text-white/85
                sm:text-[17px]
              "
            >
              “Convertirnos en el apoyo incondicional
              de los pacientes con leucemia nos pone
              un paso más cerca de una vida digna
              y de calidad para ellos.”
            </blockquote>

            <p
              className="
                mt-3 text-[12px]
                font-semibold
                text-white/65
              "
            >
              Marco Sánchez · Presidente de Fundación
              Mejoremos Realidades
            </p>
          </motion.div>

          {/* Navegación interna */}
          <motion.nav
            variants={fadeUp}
            aria-label="Ir a un servicio"
            className="
              flex flex-wrap
              gap-x-6 gap-y-3
            "
          >
            {SERVICE_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="
                  border-b border-white/40
                  pb-1
                  text-[13px]
                  font-semibold
                  text-white/85
                  transition-colors
                  duration-200
                  hover:border-white
                  hover:text-white
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-white
                "
              >
                {label}
              </a>
            ))}
          </motion.nav>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// DATOS DE LOS SERVICIOS
// ============================================================

const SERVICES = [
  {
    id: "medica",
    number: "01",
    label: "Gestión médica",
    title: "Te acompañamos en cada paso del proceso",
    image: IMG.medica,
    imageAlt:
      "Gestión médica para pacientes con leucemia",
    paragraphs: [
      "Enfrentar un diagnóstico como la leucemia no solo implica un tratamiento: implica incertidumbre, preguntas, citas, trámites, medicamentos y un sinfín de decisiones. Por eso ofrecemos un servicio de Gestión Médica que te acompaña en cada paso.",
      "Desde orientarte hacia los servicios de salud más adecuados a tu situación, hasta apoyar en el acceso a medicamentos con descuento o convenios especiales. Porque nadie debe enfrentar este proceso solo, ni sentirse excluido por falta de información, recursos o redes.",
    ],
    cta: "¿Necesitas medicamento?",
    ctaHref:
      "https://fmejoremosrealidades.org/donar#53446785-6773-4e8f-add1-9ddc3f613b82",
    reverse: false,
  },
  {
    id: "juridica",
    number: "02",
    label: "Asesoría jurídica",
    title: "Tu salud es un derecho humano",
    image: IMG.juridica,
    imageAlt:
      "Asesoría jurídica en derechos de salud",
    paragraphs: [
      "Cuando tu salud se ve comprometida —por demoras, falta de cobertura o desconocimiento— el acompañamiento legal marca la diferencia. Con nuestra Asesoría Jurídica, ponemos a tu disposición abogados especializados en Derecho Médico y Sanitario para que puedas exigir, con guía experta, lo que por ley te corresponde.",
      "Ya sea orientación sobre acceso a tratamientos, apelaciones o denuncia de vulneraciones, estamos contigo para escuchar, explicar y actuar. Tu lucha médica no es solo clínica: también es social, institucional y legal.",
    ],
    cta: "Cuéntanos tu caso",
    ctaHref:
      "https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b",
    reverse: true,
  },
  {
    id: "psicologica",
    number: "03",
    label: "Apoyo psicológico",
    title: "Tejiendo Esperanza: redes de apoyo emocional",
    image: IMG.psicologica,
    imageAlt:
      "Apoyo psicológico para pacientes con leucemia",
    paragraphs: [
      "Sanar no solo es cuestión de tratamientos, sino también de vínculos, comprensión y acompañamiento. A través del programa Tejiendo Esperanza, creamos redes de apoyo emocional entre pacientes y familiares, fortaleciendo el bienestar mental durante el proceso de tratamiento.",
      "Gracias a convenios con psicólogos y especialistas en salud emocional, brindamos atención profesional personalizada, sesiones de orientación y espacios de contención. Cada encuentro, cada palabra y cada historia compartida se entrelazan para formar una red viva de esperanza y fortaleza.",
    ],
    cta: "¿Necesitas acompañamiento?",
    ctaHref:
      "https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b",
    reverse: false,
  },
];

// ============================================================
// IMAGEN DE SERVICIO
// ============================================================

function ServiceImage({ service, reducedMotion }) {
  return (
    <motion.div
      variants={fadeUp}
      className="
        group relative
        min-w-0 overflow-hidden
        rounded-lg
        h-[330px]
        sm:h-[420px]
        md:h-[480px]
        lg:h-[530px]
        xl:h-[570px]
      "
      style={{ backgroundColor: C.border }}
    >
      <motion.img
        src={service.image}
        alt={service.imageAlt}
        loading="lazy"
        decoding="async"
        className="
          h-full w-full
          object-cover
        "
        whileHover={
          reducedMotion
            ? undefined
            : {
                scale: 1.035,
                transition: {
                  duration: 0.7,
                  ease: EASE,
                },
              }
        }
      />
    </motion.div>
  );
}

// ============================================================
// CONTENIDO DE SERVICIO
// ============================================================

function ServiceContent({ service }) {
  return (
    <motion.div
      variants={fadeUp}
      className="min-w-0"
    >
      <div
        className="
          mb-4 flex
          items-center gap-3
        "
      >
        <span
          className="
            text-[12px]
            font-bold
            tracking-[0.08em]
          "
          style={{ color: C.brand }}
        >
          {service.number}
        </span>

        <span
          className="
            h-px w-7
          "
          style={{ backgroundColor: C.border }}
        />

        <span
          className="
            text-[12px]
            font-semibold
          "
          style={{ color: C.textMid }}
        >
          {service.label}
        </span>
      </div>

      <SectionHeading id={`${service.id}-title`}>
        {service.title}
      </SectionHeading>

      <div className="mt-5 space-y-4">
        {service.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="
              text-[14px]
              leading-[1.85]
              sm:text-[15px]
            "
            style={{ color: C.textMid }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <a
        href={service.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-6 inline-flex
          min-h-11
          items-center justify-center
          rounded-md
          px-6
          text-[13px]
          font-bold
          text-white
          transition-colors
          duration-200
          hover:bg-[#A92D42]
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
        "
        style={{
          backgroundColor: C.brand,
          outlineColor: C.brand,
        }}
      >
        {service.cta}
      </a>
    </motion.div>
  );
}

// ============================================================
// BLOQUE DE SERVICIO
// ============================================================

function ServiceBlock({ service, index }) {
  const reducedMotion = useReducedMotion();

  const imageFirst = service.reverse;

  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className="
        scroll-mt-[80px]
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{
        backgroundColor:
          index % 2 === 0 ? C.surface : C.bg,
      }}
    >
      <motion.div
        variants={
          reducedMotion ? undefined : stagger
        }
        {...reveal(reducedMotion)}
        className="
          mx-auto grid
          w-full max-w-[1360px]
          grid-cols-1
          items-center
          gap-7
          md:grid-cols-2
          md:gap-9
          lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]
          lg:gap-12
          xl:gap-14
        "
      >
        <div
          className={
            imageFirst
              ? "order-2 md:order-1"
              : "order-2 md:order-2"
          }
        >
          <ServiceImage
            service={service}
            reducedMotion={reducedMotion}
          />
        </div>

        <div
          className={
            imageFirst
              ? "order-1 md:order-2"
              : "order-1 md:order-1"
          }
        >
          <ServiceContent service={service} />
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================
// SUGERENCIAS
// ============================================================

function Sugerencias() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="sugerencias"
      aria-labelledby="suggestions-title"
      className="
        scroll-mt-[80px]
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.text }}
    >
      <motion.div
        variants={
          reducedMotion ? undefined : stagger
        }
        {...reveal(reducedMotion)}
        className="
          mx-auto grid
          max-w-[1360px]
          grid-cols-1
          items-center
          gap-8
          md:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]
          md:gap-10
          lg:gap-14
        "
      >
        {/* Fotografía */}
        <motion.div
          variants={fadeUp}
          className="
            overflow-hidden
            rounded-lg
            h-[320px]
            sm:h-[390px]
            md:h-[460px]
            lg:h-[500px]
          "
        >
          <motion.img
            src={IMG.sugerencias}
            alt="Comunidad Mejoremos Realidades"
            loading="lazy"
            decoding="async"
            className="
              h-full w-full
              object-cover
            "
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.035,
                    transition: {
                      duration: 0.7,
                      ease: EASE,
                    },
                  }
            }
          />
        </motion.div>

        {/* Texto */}
        <motion.div
          variants={fadeUp}
          className="min-w-0"
        >
          <SectionLabel light>
            Sugerencias y comentarios
          </SectionLabel>

          <SectionHeading
            id="suggestions-title"
            light
          >
            Tu voz{" "}
            <span className="text-[#F08B9A]">
              nos transforma.
            </span>
          </SectionHeading>

          <p
            className="
              mt-5 text-[14px]
              leading-[1.85]
              text-white/75
              sm:text-[15px]
            "
          >
            En Mejoremos Realidades creemos que
            escuchar también transforma. Cada opinión,
            historia o sugerencia que nos compartes
            nos ayuda a crecer, mejorar y seguir
            tejiendo esperanza junto a quienes forman
            parte de esta comunidad.
          </p>

          <p
            className="
              mt-4 text-[14px]
              leading-[1.85]
              text-white/75
              sm:text-[15px]
            "
          >
            Estamos abiertos a tus ideas, dudas y
            comentarios, porque nuestras acciones
            nacen del diálogo y del compromiso con
            las personas que acompañamos. Tu voz
            siempre será tomada en cuenta.
          </p>

          <a
            href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6 inline-flex
              min-h-11
              items-center justify-center
              rounded-md px-6
              text-[13px]
              font-bold
              text-white
              transition-colors
              hover:bg-[#A92D42]
            "
            style={{ backgroundColor: C.brand }}
          >
            Escríbenos
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================
// CTA FINAL
// ============================================================

function CtaBanner() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-cta-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.brand }}
    >
      <motion.div
        variants={
          reducedMotion ? undefined : stagger
        }
        {...reveal(reducedMotion)}
        className="
          mx-auto grid
          max-w-[1360px]
          grid-cols-1
          items-center
          gap-7
          md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]
          md:gap-10
        "
      >
        <div>
          <motion.div variants={fadeUp}>
            <SectionLabel light>
              Sé parte del cambio
            </SectionLabel>
          </motion.div>

          <motion.h2
            id="services-cta-title"
            variants={fadeUp}
            className="
              text-[clamp(2rem,4vw,3.5rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.045em]
              text-white
            "
          >
            Nadie debe enfrentar{" "}
            <span className="text-white/75">
              este camino solo.
            </span>
          </motion.h2>
        </div>

        <div className="md:justify-self-end">
          <motion.p
            variants={fadeUp}
            className="
              mb-5 max-w-[410px]
              text-[14px]
              leading-[1.8]
              text-white/85
              sm:text-[15px]
              md:text-right
            "
          >
            Tu apoyo nos permite acompañar
            a más pacientes y sus familias
            en cada etapa del camino.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="
              flex flex-wrap gap-3
              md:justify-end
            "
          >
            <Link
              to="/donar"
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md bg-white
                px-7 text-[14px]
                font-bold
                transition-colors
                hover:bg-[#F5F5F5]
              "
              style={{ color: C.brand }}
            >
              Donar ahora
            </Link>

            <Link
              to="/acerca-de"
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md
                border border-white/60
                px-7 text-[14px]
                font-semibold
                text-white
                transition-colors
                hover:bg-white/10
              "
            >
              Conocer más
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================
// PÁGINA PRINCIPAL
// ============================================================

export default function Servicios() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: C.bg }}
    >
      <Navbar />

      <main>
        <Hero />

        {SERVICES.map((service, index) => (
          <ServiceBlock
            key={service.id}
            service={service}
            index={index}
          />
        ))}

        <Sugerencias />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
