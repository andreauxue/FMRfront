
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { C } from "./tokens";
import SectionLabel from "./SectionLabel";

// ============================================================
// DATOS
// ============================================================

const PILLARS = [
  {
    number: "01",
    title: "Medicamentos",
    body:
      "Adquirimos y entregamos medicamentos especializados a pacientes inscritos.",
  },
  {
    number: "02",
    title: "Acompañamiento",
    body:
      "Financiamos programas médicos, psicológicos y jurídicos sin costo para el paciente.",
  },
  {
    number: "03",
    title: "Transparencia",
    body:
      "Cada contribución se administra con responsabilidad y rendición de cuentas.",
  },
];

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
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// ============================================================
// BOTONES
// ============================================================

function HeroActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="#especie"
        className="
          inline-flex min-h-12
          items-center justify-center
          rounded-md px-7
          text-[14px] font-bold
          text-white
          transition-colors duration-200
          hover:bg-[#A02C3E]
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
        "
        style={{
          backgroundColor: C.brand,
          outlineColor: C.brand,
        }}
      >
        Donar en especie
      </a>

      <a
        href="#medicamentos"
        className="
          inline-flex min-h-12
          items-center justify-center
          rounded-md border
          px-7
          text-[14px] font-semibold
          transition-colors duration-200
          hover:bg-[#F7F8FA]
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
        "
        style={{
          borderColor: C.border,
          color: C.text,
          outlineColor: C.brand,
        }}
      >
        Ver medicamentos
      </a>
    </div>
  );
}

// ============================================================
// IMAGEN DEL HERO
// ============================================================

function HeroImage() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="
        relative isolate
        h-[420px] w-full
        overflow-hidden
        bg-[#F0F0F0]
        sm:h-[520px]
        lg:absolute
        lg:inset-y-0
        lg:right-0
        lg:h-full
        lg:w-[43%]
      "
    >
      <motion.img
        src="/home/dona2.JPG"
        alt="Voluntaria de Fundación Mejoremos Realidades"
        width="1000"
        height="1200"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="
          absolute inset-0
          block h-full w-full
          object-cover object-top
        "
        initial={
          reducedMotion
            ? false
            : { scale: 1.04, opacity: 0.8 }
        }
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: reducedMotion ? 0 : 1.2,
          ease: EASE,
        }}
      />

      {/* Transición sutil hacia el contenido */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-y-0 left-0
          hidden w-[25%]
          bg-gradient-to-r
          from-white to-transparent
          lg:block
        "
      />

      {/* Fundido inferior muy ligero */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-t
          from-black/10 via-transparent
          to-transparent
        "
      />
    </div>
  );
}

// ============================================================
// PILAR DE IMPACTO
// ============================================================

function PillarItem({ number, title, body }) {
  return (
    <div
      className="
        grid grid-cols-[28px_1fr]
        gap-3 border-t pt-4
      "
      style={{
        borderColor: C.border,
      }}
    >
      <span
        className="
          pt-0.5
          text-[11px]
          font-bold
          tracking-[0.08em]
        "
        style={{ color: C.brand }}
      >
        {number}
      </span>

      <div>
        <h3
          className="
            mb-1
            text-[14px]
            font-bold
          "
          style={{ color: C.text }}
        >
          {title}
        </h3>

        <p
          className="
            text-[12px]
            leading-[1.7]
            sm:text-[13px]
          "
          style={{ color: C.textMid }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// HERO PRINCIPAL
// ============================================================

export default function DonarHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="donar-hero-title"
      className="
        relative isolate
        w-full overflow-hidden
        bg-white
      "
    >
      {/* Imagen a toda la altura en escritorio */}
      <div className="hidden lg:block">
        <HeroImage />
      </div>

      {/* Contenido */}
      <div
          className="
            relative z-10
            mx-auto w-full
            max-w-[1360px]
            px-5 pb-12 pt-24
            sm:px-8 sm:pb-14 sm:pt-28
            lg:flex
            lg:min-h-[720px]
            lg:items-center
            lg:px-12
            lg:pb-20 lg:pt-32
            xl:min-h-[780px]
            xl:px-16
            xl:pt-36
            2xl:px-20
          "
        >
        <motion.div
          variants={
            reducedMotion ? undefined : stagger
          }
          initial={
            reducedMotion ? false : "hidden"
          }
          animate="visible"
          className="
            w-full
            max-w-[610px]
            lg:w-[57%]
            lg:pr-8
          "
        >
          {/* Etiqueta */}
          <motion.div
            variants={fadeUp}
            className="mb-10"
          >
            <SectionLabel>
              Donaciones
            </SectionLabel>
          </motion.div>

          {/* Título */}
          <motion.h1
            id="donar-hero-title"
            variants={fadeUp}
            className="
              mb-6
              text-[clamp(2.8rem,5vw,4.9rem)]
              font-extrabold
              leading-[1.07]
              tracking-[-0.055em]
            "
            style={{ color: C.text }}
          >
            Tu ayuda puede{" "}
            <span style={{ color: C.brand }}>
              transformar vidas.
            </span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            variants={fadeUp}
            className="
              mb-8
              max-w-[510px]
              text-[15px]
              leading-[1.85]
              sm:text-[16px]
            "
            style={{ color: C.textMid }}
          >
            Cuando donas, tu apoyo se convierte
            en medicamentos, acompañamiento y
            nuevas oportunidades para quienes
            más lo necesitan.
          </motion.p>

          {/* Acciones */}
          <motion.div variants={fadeUp}>
            <HeroActions />
          </motion.div>

          {/* Pilares */}
          <motion.div
            variants={fadeUp}
            className="
              mt-10
              max-w-[540px]
            "
          >
            <div
              className="
                mb-5 h-px w-full
              "
              style={{
                backgroundColor: C.border,
              }}
            />

            <p
              className="
                mb-5
                text-[11px]
                font-bold uppercase
                tracking-[0.12em]
              "
              style={{ color: C.brand }}
            >
              El impacto de tu donación
            </p>

            <div
              className="
                grid grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-1
              "
            >
              {PILLARS.map((pillar) => (
                <PillarItem
                  key={pillar.number}
                  {...pillar}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Imagen debajo del contenido en móvil */}
      <div className="lg:hidden">
        <HeroImage />
      </div>
    </section>
  );
}
