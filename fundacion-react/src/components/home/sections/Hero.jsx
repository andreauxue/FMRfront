
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import {
  IconCheck,
  IconHeartHandshake,
  IconShieldCheck,
} from "@tabler/icons-react";

import { C, IMG } from "../../../data/homeData";
import { SectionLabel, PrimaryBtn } from "../ui";

// ============================================================
// CONFIGURACIÓN DE ANIMACIONES
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

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

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

function getMotionProps(reducedMotion, delay = 0) {
  if (reducedMotion) {
    return {
      initial: false,
      animate: "visible",
    };
  }

  return {
    initial: "hidden",
    animate: "visible",
    transition: {
      duration: 0.75,
      delay,
      ease: EASE,
    },
  };
}

// ============================================================
// BENEFICIOS PRINCIPALES
// ============================================================

const CHECKLIST = [
  {
    icon: IconHeartHandshake,
    text: "Gestión de medicamentos especializados",
  },
  {
    icon: IconShieldCheck,
    text: "Defensa de tus derechos de salud",
  },
];

// ============================================================
// TARJETAS DE BENEFICIOS
// ============================================================

function HeroBenefits({ reducedMotion }) {
  return (
    <motion.div
      className="
        mb-9 grid max-w-[540px]
        grid-cols-1 gap-3
        sm:mb-10 sm:grid-cols-2
      "
      aria-label="Nuestros servicios"
      variants={staggerContainer}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      transition={{
        delayChildren: reducedMotion ? 0 : 0.65,
        staggerChildren: reducedMotion ? 0 : 0.12,
      }}
    >
      {CHECKLIST.map(({ icon: Icon, text }) => (
        <motion.div
          key={text}
          variants={reducedMotion ? fadeIn : fadeUp}
          transition={{
            duration: reducedMotion ? 0 : 0.65,
            ease: EASE,
          }}
          whileHover={
            reducedMotion
              ? undefined
              : {
                  y: -2,
                  transition: {
                    duration: 0.2,
                  },
                }
          }
          className="
            flex items-center gap-3
            rounded-xl
            border border-white/15
            bg-white/[0.07]
            px-4 py-3.5
            backdrop-blur-sm
            transition-colors duration-200
            hover:bg-white/[0.11]
          "
        >
          <span
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
            "
            style={{
              backgroundColor: `${C.brand}28`,
              color: "#FFFFFF",
            }}
          >
            <Icon
              size={19}
              stroke={1.8}
              aria-hidden="true"
            />
          </span>

          <span
            className="
              text-[12px]
              font-medium
              leading-[1.5]
              text-white/90
              sm:text-[13px]
            "
          >
            {text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================
// BOTONES PRINCIPALES
// ============================================================

function HeroActions({ reducedMotion }) {
  return (
    <motion.div
      variants={fadeUp}
      {...getMotionProps(reducedMotion, 0.82)}
      className="
        flex flex-wrap
        items-center gap-4
        sm:gap-5
      "
    >
      {/* Botón principal */}
      <div
        className="
          [&_a]:inline-flex
          [&_a]:min-h-12
          [&_a]:items-center
          [&_a]:justify-center
          [&_a]:rounded-xl
          [&_a]:px-7
          [&_a]:font-bold
          [&_a]:transition-[transform,box-shadow,background-color]
          [&_a]:duration-200
          [&_a:hover]:-translate-y-0.5
          motion-reduce:[&_a]:transform-none
          motion-reduce:[&_a]:transition-none
        "
      >
        <PrimaryBtn to="/donar">
          Dona ahora
        </PrimaryBtn>
      </div>

      {/* Botón secundario */}
      <Link
        to="/acerca-de"
        className="
          group inline-flex
          min-h-12
          items-center gap-3
          rounded-xl
          px-2
          text-[13px]
          font-semibold
          text-white
          transition-colors duration-200
          hover:text-white/75
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-white
        "
      >
        <motion.span
          whileHover={
            reducedMotion
              ? undefined
              : {
                  scale: 1.04,
                  transition: {
                    duration: 0.2,
                  },
                }
          }
          className="
            flex h-11 w-11
            shrink-0
            items-center justify-center
            rounded-xl
            border border-white/30
            bg-white/10
            transition-colors duration-200
            group-hover:bg-white/20
          "
        >
          <IconHeartHandshake
            size={21}
            stroke={1.8}
            aria-hidden="true"
          />
        </motion.span>

        Conocer nuestra labor
      </Link>
    </motion.div>
  );
}

// ============================================================
// IMAGEN Y CAPAS DE FONDO
// ============================================================

function HeroBackground({ reducedMotion }) {
  return (
    <div
      className="
        pointer-events-none
        absolute inset-0 z-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* Imagen principal con zoom inicial sutil */}
      <motion.img
        src={IMG.hero}
        alt=""
        width="1920"
        height="1080"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        initial={
          reducedMotion
            ? false
            : { scale: 1.035 }
        }
        animate={{ scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 1.8,
          ease: EASE,
        }}
        className="
          absolute inset-0
          block h-full w-full
          object-cover
          object-[60%_center]
          sm:object-center
          will-change-transform
        "
      />

      {/* Oscurecimiento horizontal */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              100deg,
              rgba(10,14,30,0.94) 0%,
              rgba(10,14,30,0.86) 35%,
              rgba(10,14,30,0.56) 68%,
              rgba(10,14,30,0.30) 100%
            )
          `,
        }}
      />

      {/* Degradado inferior */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-[#0A0E1E]/65
          via-transparent
          to-[#0A0E1E]/10
        "
      />

      {/* Iluminación ambiental */}
      <div
        className="
          absolute -left-40 -top-40
          h-[520px] w-[520px]
          rounded-full
          opacity-30
          blur-[100px]
        "
        style={{
          backgroundColor: C.brand,
        }}
      />
    </div>
  );
}

// ============================================================
// MENSAJE INSTITUCIONAL
// ============================================================

function HeroTrust({ reducedMotion }) {
  return (
    <motion.div
      variants={fadeUp}
      {...getMotionProps(reducedMotion, 1)}
      className="
        mt-10
        flex max-w-[570px]
        items-center gap-3
        border-t border-white/15
        pt-6
      "
    >
      <span
        className="
          flex h-8 w-8
          shrink-0
          items-center justify-center
          rounded-lg
          bg-white/10
          text-white/80
        "
      >
        <IconCheck
          size={17}
          stroke={2}
          aria-hidden="true"
        />
      </span>

      <p
        className="
          m-0
          text-[12px]
          leading-relaxed
          text-white/60
          sm:text-[13px]
        "
      >
        Trabajamos para que más personas reciban el
        acompañamiento que necesitan.
      </p>
    </motion.div>
  );
}

// ============================================================
// HERO PRINCIPAL
// ============================================================

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="home-hero-title"
      className="
        relative isolate
        flex w-full
        min-h-[680px]
        items-center
        overflow-hidden
        bg-[#0A0E1E]
        sm:min-h-[720px]
        lg:min-h-[760px]
        xl:min-h-[820px]
      "
    >
      {/* Fondo animado */}
      <HeroBackground reducedMotion={reducedMotion} />

      {/* Contenedor principal */}
      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-[1440px]
          px-5 pb-20 pt-32
          sm:px-8 sm:pb-24 sm:pt-36
          lg:px-12 lg:pb-32 lg:pt-40
          xl:px-16
          2xl:px-20
        "
      >
        <div className="max-w-[790px]">
          {/* Etiqueta */}
          <motion.div
            variants={fadeIn}
            {...getMotionProps(reducedMotion, 0.05)}
            className="mb-7"
          >
            <SectionLabel light>
              Bienvenidos a nuestra causa
            </SectionLabel>
          </motion.div>

          {/* Título */}
          <h1
            id="home-hero-title"
            className="
              mb-7
              text-[clamp(3.15rem,7.5vw,7rem)]
              font-black
              leading-[0.99]
              tracking-[-0.055em]
              text-white
            "
          >
            <motion.span
              variants={fadeUp}
              {...getMotionProps(reducedMotion, 0.12)}
              className="block"
              style={{ color: C.brand }}
            >
              Mejoremos
            </motion.span>

            <motion.span
              variants={fadeUp}
              {...getMotionProps(reducedMotion, 0.22)}
              className="block"
            >
              Realidades
            </motion.span>
          </h1>

          {/* Descripción */}
          <motion.p
            variants={fadeUp}
            {...getMotionProps(reducedMotion, 0.38)}
            className="
              mb-8
              max-w-[570px]
              text-[15px]
              leading-[1.85]
              text-white/80
              sm:text-[17px]
              lg:text-[18px]
            "
          >
            Acompañamos a pacientes con leucemia y cáncer en
            México con atención médica, asesoría jurídica y
            apoyo emocional, sin costo alguno.
          </motion.p>

          {/* Beneficios animados */}
          <HeroBenefits reducedMotion={reducedMotion} />

          {/* Acciones */}
          <HeroActions reducedMotion={reducedMotion} />

          {/* Mensaje institucional */}
          <HeroTrust reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
