
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
      staggerChildren: 0.1,
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
          ? "rgba(255,255,255,0.7)"
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

function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="causes-hero-title"
      className="
        relative flex
        min-h-[600px]
        items-end
        overflow-hidden
        sm:min-h-[650px]
        lg:min-h-[720px]
      "
      style={{ backgroundColor: C.text }}
    >
      {/* Fotografía principal */}
      <motion.img
        src="/home/causa.jpg"
        alt="Marco Sánchez entregando medicamentos a pacientes"
        className="
          absolute inset-0
          h-full w-full
          object-cover object-center
        "
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
      />

      {/* Oscurecimiento */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,30,0.25) 0%, rgba(10,14,30,0.5) 45%, rgba(10,14,30,0.91) 100%)",
        }}
      />

      {/* Contenido */}
      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-[1360px]
          px-5 pb-14 pt-32
          sm:px-8 sm:pb-16
          lg:px-12 lg:pb-20
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
          className="max-w-[850px]"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel light>
              Nuestra causa
            </SectionLabel>
          </motion.div>

          <motion.h1
            id="causes-hero-title"
            variants={fadeUp}
            className="
              mb-5
              text-[clamp(2.8rem,6.4vw,5.8rem)]
              font-extrabold
              leading-[1.03]
              tracking-[-0.055em]
              text-white
            "
          >
            La leucemia en México{" "}
            <span className="text-[#F08B9A]">
              no espera.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="
              mb-7 max-w-[620px]
              text-[15px]
              leading-[1.8]
              text-white/85
              sm:text-[17px]
            "
          >
            Miles de personas reciben cada año
            un diagnóstico que cambia su vida
            y la de su familia. Nosotros estamos
            aquí para que no enfrenten ese momento
            solos.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              to="/donar"
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md px-7
                text-[14px] font-bold
                text-white
                transition-colors
                hover:bg-[#A92D42]
              "
              style={{
                backgroundColor: C.brand,
              }}
            >
              Apoya la causa
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// DATOS SOBRE LEUCEMIA
// ============================================================

// IMPORTANTE:
// Estas cifras y sus fuentes proceden del código original.
// Deben verificarse contra publicaciones oficiales antes
// de mostrarse como datos confirmados en producción.

const STATS = [
  {
    num: "~6,000",
    label: "nuevos casos al año",
    note: "INEGI / GLOBOCAN 2022",
  },
  {
    num: "2°",
    label: "cáncer más frecuente en menores de 15 años",
    note: "IMSS / Secretaría de Salud",
  },
  {
    num: "50%",
    label: "de pacientes pediátricos no completa tratamiento",
    note: "Journal of Global Oncology",
  },
  {
    num: "30%",
    label: "de casos sin diagnóstico oportuno en zonas rurales",
    note: "CONACYT / INSP",
  },
];

function DataSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="causes-data-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.text }}
    >
      <div className="mx-auto max-w-[1360px]">
        <motion.div
          variants={fadeUp}
          {...reveal(reducedMotion)}
          className="mb-9 max-w-[780px]"
        >
          <SectionLabel light>
            El contexto
          </SectionLabel>

          <SectionHeading
            id="causes-data-title"
            light
          >
            Lo que enfrentan los pacientes{" "}
            <span className="text-[#F08B9A]">
              en cifras.
            </span>
          </SectionHeading>
        </motion.div>

        <motion.div
          variants={
            reducedMotion ? undefined : stagger
          }
          {...reveal(reducedMotion)}
          className="
            grid grid-cols-1
            border-t border-white/20
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {STATS.map(({ num, label, note }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="
                border-b border-white/20
                py-6
                sm:px-5
                lg:border-b-0
                lg:border-r
                lg:last:border-r-0
                lg:px-6
              "
            >
              <p
                className="
                  mb-3
                  text-[clamp(2.4rem,4vw,3.6rem)]
                  font-extrabold
                  leading-none
                  tracking-[-0.05em]
                "
                style={{ color: "#F08B9A" }}
              >
                {num}
              </p>

              <p
                className="
                  mb-5 max-w-[230px]
                  text-[14px]
                  font-semibold
                  leading-[1.55]
                  text-white
                "
              >
                {label}
              </p>

              <p
                className="
                  text-[11px]
                  leading-[1.6]
                  text-white/50
                "
              >
                Fuente indicada: {note}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// CÓMO AYUDAMOS
// ============================================================

const HOW = [
  {
    number: "01",
    title: "Gestión de medicamentos",
    body:
      "Facilitamos el acceso a medicamentos especializados mediante convenios, gestiones ante instituciones de salud y orientación directa al paciente.",
  },
  {
    number: "02",
    title: "Defensa de derechos",
    body:
      "Acompañamos a pacientes que han visto vulnerado su derecho a la salud: demoras, negativas de cobertura o falta de acceso a tratamiento.",
  },
  {
    number: "03",
    title: "Apoyo emocional",
    body:
      "A través del programa Tejiendo Esperanza, creamos redes de contención entre pacientes y familias, con apoyo psicológico profesional.",
  },
  {
    number: "04",
    title: "Información y detección",
    body:
      "Promovemos la detección temprana y difundimos información confiable sobre tipos de leucemia, síntomas y opciones de tratamiento.",
  },
  {
    number: "05",
    title: "Comunidad y red",
    body:
      "Conectamos a pacientes con otros pacientes, especialistas y organizaciones aliadas que forman una red de apoyo sólida y humana.",
  },
  {
    number: "06",
    title: "Acompañamiento continuo",
    body:
      "Nuestro equipo está presente desde el diagnóstico hasta el seguimiento post-tratamiento, sin dejar a nadie sin respuesta.",
  },
];

function HowWeHelp() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="causes-help-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.surface }}
    >
      <div className="mx-auto max-w-[1360px]">
        <motion.div
          variants={fadeUp}
          {...reveal(reducedMotion)}
          className="
            mb-9 grid
            grid-cols-1
            gap-4
            md:grid-cols-[1.2fr_0.8fr]
            md:items-end
            md:gap-10
          "
        >
          <div>
            <SectionLabel>
              Cómo ayudamos
            </SectionLabel>

            <SectionHeading id="causes-help-title">
              Acompañamiento{" "}
              <span style={{ color: C.brand }}>
                en todas las dimensiones.
              </span>
            </SectionHeading>
          </div>

          <p
            className="
              max-w-[400px]
              text-[14px]
              leading-[1.8]
              sm:text-[15px]
            "
            style={{ color: C.textMid }}
          >
            La leucemia no solo afecta la salud
            física. Por eso nuestro apoyo es
            médico, jurídico y emocional.
          </p>
        </motion.div>

        <motion.div
          variants={
            reducedMotion ? undefined : stagger
          }
          {...reveal(reducedMotion)}
          className="
            grid grid-cols-1
            gap-x-9 gap-y-8
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-12
            lg:gap-y-10
          "
        >
          {HOW.map(({ number, title, body }) => (
            <motion.article
              key={number}
              variants={fadeUp}
              className="border-t-2 pt-5"
              style={{ borderColor: C.brand }}
            >
              <span
                className="
                  mb-5 block
                  text-[12px]
                  font-bold
                  tracking-[0.1em]
                "
                style={{ color: C.brand }}
              >
                {number}
              </span>

              <h3
                className="
                  mb-3 text-[20px]
                  font-bold
                  leading-[1.3]
                  tracking-[-0.025em]
                "
                style={{ color: C.text }}
              >
                {title}
              </h3>

              <p
                className="
                  text-[14px]
                  leading-[1.8]
                  sm:text-[15px]
                "
                style={{ color: C.textMid }}
              >
                {body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// IMPACTO REAL
// ============================================================

function ImpactQuote() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="causes-impact-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.bg }}
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
          md:grid-cols-2
          md:gap-10
          lg:gap-14
        "
      >
        {/* Fotografía */}
        <motion.div
          variants={fadeUp}
          className="
            group overflow-hidden
            rounded-lg
            h-[330px]
            sm:h-[420px]
            md:h-[500px]
            lg:h-[550px]
          "
          style={{ backgroundColor: C.border }}
        >
          <motion.img
            src="/home/dona2.JPG"
            alt="Marco Sánchez entregando medicamentos"
            loading="lazy"
            decoding="async"
            className="
              h-full w-full
              object-cover object-center
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

        {/* Contenido */}
        <motion.div
          variants={fadeUp}
          className="min-w-0"
        >
          <SectionLabel>
            Lo que hacemos hoy
          </SectionLabel>

          <SectionHeading id="causes-impact-title">
            Acción concreta,{" "}
            <span style={{ color: C.brand }}>
              impacto real.
            </span>
          </SectionHeading>

          <p
            className="
              mt-5 text-[14px]
              leading-[1.85]
              sm:text-[15px]
            "
            style={{ color: C.textMid }}
          >
            Desde nuestros inicios hemos gestionado
            medicamentos especializados, brindado
            asesoría jurídica para pacientes con
            cobertura negada y acompañado
            emocionalmente a familias en momentos
            de alta incertidumbre.
          </p>

          <p
            className="
              mt-4 text-[14px]
              leading-[1.85]
              sm:text-[15px]
            "
            style={{ color: C.textMid }}
          >
            Aunque aún estamos construyendo nuestra
            base de casos documentados, cada acción
            que emprendemos es un paso firme hacia
            una red de apoyo más sólida para quienes
            más lo necesitan.
          </p>

          <blockquote
            className="
              mt-6 border-l-2
              pl-5
            "
            style={{ borderColor: C.brand }}
          >
            <p
              className="
                text-[15px]
                font-medium italic
                leading-[1.8]
              "
              style={{ color: C.text }}
            >
              “Cuando un paciente recibe su medicamento
              a tiempo, cuando una familia encuentra
              respuesta a su duda legal, cuando alguien
              siente que no está solo: eso es
              Mejoremos Realidades.”
            </p>

            <footer
              className="
                mt-3 text-[12px]
                font-semibold
              "
              style={{ color: C.brand }}
            >
              Marco Sánchez · Presidente
            </footer>
          </blockquote>

          <Link
            to="/servicios"
            className="
              mt-7 inline-flex
              min-h-11
              items-center justify-center
              rounded-md
              px-6
              text-[13px]
              font-bold
              text-white
              transition-colors
              hover:bg-[#A92D42]
            "
            style={{ backgroundColor: C.brand }}
          >
            Ver nuestros servicios
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================
// PRÓXIMAS CAUSAS
// ============================================================

function ComingCauses() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="coming-causes-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.surface }}
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
          md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]
          md:gap-12
        "
      >
        {/* Introducción */}
        <motion.div variants={fadeUp}>
          <SectionLabel>
            Causas activas
          </SectionLabel>

          <SectionHeading id="coming-causes-title">
            Pronto podrás apoyar{" "}
            <span style={{ color: C.brand }}>
              casos específicos.
            </span>
          </SectionHeading>

          <p
            className="
              mt-5 max-w-[650px]
              text-[14px]
              leading-[1.85]
              sm:text-[15px]
            "
            style={{ color: C.textMid }}
          >
            Estamos preparando el espacio para
            presentar casos reales de pacientes
            que necesitan tu apoyo directo.
          </p>

          <p
            className="
              mt-4 max-w-[650px]
              text-[14px]
              leading-[1.85]
              sm:text-[15px]
            "
            style={{ color: C.textMid }}
          >
            Cada caso contará con información
            sobre la necesidad que buscamos
            atender y el objetivo de recaudación.
            Por ahora, puedes seguir apoyando
            nuestra labor general.
          </p>

          <Link
            to="/donar"
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
              hover:bg-[#A92D42]
            "
            style={{ backgroundColor: C.brand }}
          >
            Apoyar a la fundación
          </Link>
        </motion.div>

        {/* Información de disponibilidad */}
        <motion.div
          variants={fadeUp}
          className="
            border-t-2
            pt-6
          "
          style={{ borderColor: C.brand }}
        >
          <p
            className="
              mb-3 text-[12px]
              font-bold uppercase
              tracking-[0.1em]
            "
            style={{ color: C.brand }}
          >
            Próximamente
          </p>

          <h3
            className="
              mb-4
              text-[clamp(1.5rem,2.5vw,2.2rem)]
              font-bold
              leading-[1.2]
              tracking-[-0.035em]
            "
            style={{ color: C.text }}
          >
            Campañas individuales
            de apoyo a pacientes.
          </h3>

          <p
            className="
              mb-6 text-[14px]
              leading-[1.85]
              sm:text-[15px]
            "
            style={{ color: C.textMid }}
          >
            Todavía no hay casos individuales
            publicados en esta sección. Cuando
            estén disponibles, podrás conocer
            sus necesidades y las formas de
            contribuir.
          </p>

          <a
            href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              border-b pb-1
              text-[13px]
              font-bold
              transition-colors
              hover:text-[#A92D42]
            "
            style={{
              color: C.brand,
              borderColor: C.brand,
            }}
          >
            Contactarnos para recibir información
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
      aria-labelledby="causes-cta-title"
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
              Actúa hoy
            </SectionLabel>
          </motion.div>

          <motion.h2
            id="causes-cta-title"
            variants={fadeUp}
            className="
              text-[clamp(2rem,4vw,3.5rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.045em]
              text-white
            "
          >
            Tu donativo puede{" "}
            <span className="text-white/75">
              cambiar una vida.
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
            Mientras preparamos los casos
            individuales, tu apoyo general nos
            permite seguir operando y llegando
            a más pacientes hoy.
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
              to="/servicios"
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
              Nuestros servicios
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

export default function Causas() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: C.bg }}
    >
      <Navbar />

      <main>
        <Hero />
        <DataSection />
        <HowWeHelp />
        <ImpactQuote />
        <ComingCauses />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
