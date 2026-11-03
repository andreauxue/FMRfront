
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

// ============================================================
// PALETA DE COLORES
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

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
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

const VIEWPORT = {
  once: true,
  amount: 0.15,
};

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

// ============================================================
// HERO
// ============================================================

function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="ambassadors-hero-title"
      className="
        relative overflow-hidden
        px-5 pb-14 pt-36
        sm:px-8 sm:pb-16 sm:pt-40
        lg:px-12 lg:pb-20 lg:pt-44
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.text }}
    >
      <motion.div
        variants={
          reducedMotion ? undefined : stagger
        }
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
        className="
          relative z-10
          mx-auto grid
          w-full max-w-[1360px]
          grid-cols-1
          items-end
          gap-8
          md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]
          md:gap-12
        "
      >
        {/* Título principal */}
        <div>
          <motion.div variants={fadeUp}>
            <SectionLabel light>
              Héroes contra la leucemia
            </SectionLabel>
          </motion.div>

          <motion.h1
            id="ambassadors-hero-title"
            variants={fadeUp}
            className="
              mb-5
              text-[clamp(3rem,6.5vw,6rem)]
              font-extrabold
              leading-[1.04]
              tracking-[-0.055em]
              text-white
            "
          >
            Nuestros{" "}
            <span className="text-[#F08B9A]">
              embajadores.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="
              max-w-[630px]
              text-[15px]
              leading-[1.85]
              text-white/80
              sm:text-[17px]
            "
          >
            Personas comprometidas con nuestra misión
            que suman su voz, su presencia y su
            convicción para que más familias conozcan
            el apoyo que ofrecemos. Cada embajador es
            un puente entre la fundación y quienes
            más lo necesitan.
          </motion.p>
        </div>

        {/* Cita */}
        <motion.blockquote
          variants={fadeUp}
          className="
            border-l-2
            pl-5
            md:mb-2
          "
          style={{
            borderColor: "#F08B9A",
          }}
        >
          <p
            className="
              mb-4
              text-[16px]
              font-medium italic
              leading-[1.8]
              text-white/85
              sm:text-[18px]
            "
          >
            “La información, la empatía y la
            solidaridad pueden transformar vidas.
            Nuestros embajadores son la prueba
            de ello.”
          </p>

          <footer
            className="
              text-[12px]
              font-semibold
              text-[#F08B9A]
            "
          >
            Marco Sánchez · Presidente
          </footer>
        </motion.blockquote>
      </motion.div>
    </section>
  );
}

// ============================================================
// VERÓNICA RAMÍREZ DURÁN
// ============================================================

function VeronicaSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="veronica-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{
        backgroundColor: C.surface,
      }}
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Encabezado */}
        <motion.div
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{
            duration: reducedMotion ? 0 : 0.65,
            ease: EASE,
          }}
          className="mb-9 max-w-[800px]"
        >
          <SectionLabel>
            Embajadora
          </SectionLabel>

          <h2
            className="
              text-[clamp(2rem,3.6vw,3.25rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.045em]
            "
            style={{ color: C.text }}
          >
            Quien da voz a{" "}
            <span style={{ color: C.brand }}>
              nuestra misión.
            </span>
          </h2>
        </motion.div>

        {/* Fotografía y biografía */}
        <motion.div
          variants={
            reducedMotion ? undefined : stagger
          }
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT}
          className="
            grid grid-cols-1
            items-center
            gap-8
            md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
            md:gap-10
            lg:gap-16
          "
        >
          {/* Fotografía completa */}
          <motion.div
            variants={fadeUp}
            className="
              flex min-h-[350px]
              items-center justify-center
              overflow-hidden
              rounded-lg
              bg-[#F0F0F0]
              sm:min-h-[460px]
            "
          >
            <img
              src="/personas/vero.jpeg"
              alt="Verónica Ramírez Durán, embajadora de Fundación Mejoremos Realidades"
              loading="lazy"
              decoding="async"
              className="
                block h-auto
                max-h-[650px]
                w-full
                object-contain
              "
            />
          </motion.div>

          {/* Biografía */}
          <motion.div
            variants={fadeUp}
            className="min-w-0"
          >
            <p
              className="
                mb-3 text-[12px]
                font-semibold
                tracking-[0.02em]
              "
              style={{ color: C.brand }}
            >
              Fundación Mejoremos Realidades A.C.
            </p>

            <h3
              id="veronica-title"
              className="
                mb-6
                text-[clamp(2rem,3.4vw,3.2rem)]
                font-extrabold
                leading-[1.12]
                tracking-[-0.045em]
              "
              style={{ color: C.text }}
            >
              Verónica Ramírez Durán
            </h3>

            <div
              className="
                space-y-4
                text-[14px]
                leading-[1.85]
                sm:text-[15px]
              "
              style={{ color: C.textMid }}
            >
              <p>
                Forma parte de la red de embajadores
                de Fundación Mejoremos Realidades
                A.C., sumándose a nuestra misión de
                brindar esperanza, orientación y
                acompañamiento a pacientes con
                leucemia, cáncer y otras enfermedades
                hematológicas.
              </p>

              <p>
                Su compromiso con las causas sociales
                y su convicción de que la información,
                la empatía y la solidaridad pueden
                transformar vidas la han llevado a
                colaborar activamente con nuestra
                fundación, impulsando iniciativas que
                buscan generar conciencia, fortalecer
                las redes de apoyo y acercar a más
                personas a los servicios que ofrecemos.
              </p>
            </div>

            <div
              className="
                mt-7 border-t pt-5
              "
              style={{ borderColor: C.border }}
            >
              <p
                className="
                  text-[13px]
                  font-semibold
                "
                style={{ color: C.brand }}
              >
                Parte del equipo de impacto social
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// VALORES DE LOS EMBAJADORES
// ============================================================

const VALUES = [
  {
    number: "01",
    title: "Empatía y compromiso",
    body:
      "Creemos en personas que ponen el bienestar de los demás al centro de sus acciones.",
  },
  {
    number: "02",
    title: "Ampliar el alcance",
    body:
      "Tu red y tu voz nos permiten llegar a más pacientes que quizás no saben que existe apoyo disponible.",
  },
  {
    number: "03",
    title: "Generar conciencia",
    body:
      "La leucemia sigue siendo poco visible en México. Tu participación ayuda a cambiar eso.",
  },
];

// ============================================================
// CONVIÉRTETE EN EMBAJADOR
// ============================================================

function BecomeAmbassador() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="become-ambassador-title"
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
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={VIEWPORT}
        className="mx-auto max-w-[1360px]"
      >
        {/* Encabezado */}
        <motion.div
          variants={fadeUp}
          className="
            mb-9 grid
            grid-cols-1
            gap-5
            md:grid-cols-[1.1fr_0.9fr]
            md:items-end
            md:gap-12
          "
        >
          <div>
            <SectionLabel>
              Únete a la red
            </SectionLabel>

            <h2
              id="become-ambassador-title"
              className="
                text-[clamp(2rem,3.6vw,3.25rem)]
                font-extrabold
                leading-[1.12]
                tracking-[-0.045em]
              "
              style={{ color: C.text }}
            >
              ¿Quieres ser{" "}
              <span style={{ color: C.brand }}>
                embajador?
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[450px]
              text-[14px]
              leading-[1.85]
              sm:text-[15px]
            "
            style={{ color: C.textMid }}
          >
            Buscamos personas comprometidas con las
            causas sociales que quieran sumar su voz
            a nuestra misión. No importa tu profesión
            ni tu alcance: lo que importa es tu
            convicción de que nadie debe enfrentar
            la leucemia solo.
          </p>
        </motion.div>

        {/* Valores */}
        <motion.div
          variants={stagger}
          className="
            grid grid-cols-1
            gap-x-9 gap-y-8
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-12
          "
        >
          {VALUES.map(({ number, title, body }) => (
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

        {/* Invitación */}
        <motion.div
          variants={fadeUp}
          className="
            mt-9 flex
            flex-col
            items-start
            gap-5
            border-t pt-7
            md:flex-row
            md:items-center
            md:justify-between
            md:gap-10
          "
          style={{ borderColor: C.border }}
        >
          <p
            className="
              max-w-[750px]
              text-[14px]
              leading-[1.8]
              sm:text-[15px]
            "
            style={{ color: C.textMid }}
          >
            Como embajador de Mejoremos Realidades
            participarás en iniciativas de
            concientización, eventos y campañas que
            acercan nuestros servicios a quienes
            más los necesitan.
          </p>

          <a
            href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex min-h-12
              shrink-0
              items-center justify-center
              rounded-md
              px-7
              text-[14px]
              font-bold
              text-white
              transition-colors
              hover:bg-[#A92D42]
            "
            style={{ backgroundColor: C.brand }}
          >
            Quiero ser embajador
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
      aria-labelledby="ambassadors-cta-title"
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
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={VIEWPORT}
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
            id="ambassadors-cta-title"
            variants={fadeUp}
            className="
              text-[clamp(2rem,4vw,3.5rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.045em]
              text-white
            "
          >
            Juntos llegamos{" "}
            <span className="text-white/75">
              más lejos.
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
            Tu apoyo, tu voz o tu donativo pueden
            cambiar la historia de un paciente
            con leucemia y su familia.
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

export default function Embajadores() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: C.bg }}
    >
      <Navbar />

      <main>
        <Hero />
        <VeronicaSection />
        <BecomeAmbassador />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
