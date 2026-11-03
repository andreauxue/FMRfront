
import { motion, useReducedMotion } from "framer-motion";
import { IconHeartHandshake } from "@tabler/icons-react";

import { C, IMG } from "../../../data/homeData";
import { SectionLabel, GhostBtn } from "../ui";

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
    y: 16,
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

function revealProps(reducedMotion, delay = 0) {
  if (reducedMotion) {
    return {
      initial: false,
    };
  }

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: VIEWPORT,
    transition: {
      duration: 0.65,
      delay,
      ease: EASE,
    },
  };
}

// ============================================================
// DATOS
// ============================================================

const STATS = [
  {
    num: "100%",
    label: "Gratuito para el paciente",
  },
  {
    num: "3",
    label: "Servicios especializados",
  },
];

// ============================================================
// FOTOGRAFÍA
// ============================================================

function AboutImage({ reducedMotion }) {
  return (
    <motion.div
      variants={fadeUp}
      {...revealProps(reducedMotion)}
      className="
        relative w-full min-w-0
        md:h-full
      "
    >
      <div
        className="
          group relative
          h-[360px] w-full
          overflow-hidden
          rounded-xl
          bg-[#F2E9EB]
          sm:h-[440px]
          md:h-full md:min-h-[540px]
          lg:min-h-[580px]
          xl:min-h-[610px]
        "
      >
        {/* Fotografía */}
        <motion.img
          src={IMG.about}
          alt="Acompañamiento a pacientes de la Fundación Mejoremos Realidades"
          loading="lazy"
          decoding="async"
          className="
            absolute inset-0
            block h-full w-full
            object-cover object-center
          "
          whileHover={
            reducedMotion
              ? undefined
              : {
                  scale: 1.035,
                  transition: {
                    duration: 0.8,
                    ease: EASE,
                  },
                }
          }
        />

        {/* Degradado inferior */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-t
            from-black/30
            via-transparent
            to-transparent
          "
          aria-hidden="true"
        />

        {/* Indicador de atención gratuita */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={VIEWPORT}
          transition={{
            duration: reducedMotion ? 0 : 0.55,
            delay: reducedMotion ? 0 : 0.3,
            ease: EASE,
          }}
          className="
            absolute bottom-5 left-5
            flex items-center gap-3
            rounded-lg
            border border-white/25
            bg-white/95
            px-4 py-3
            shadow-sm
            backdrop-blur-sm
            sm:bottom-6 sm:left-6
          "
        >
          <span
            className="
              flex h-10 w-10
              shrink-0 items-center
              justify-center
              rounded-lg
            "
            style={{
              backgroundColor: C.brandSoft,
              color: C.brand,
            }}
          >
            <IconHeartHandshake
              size={21}
              stroke={1.8}
              aria-hidden="true"
            />
          </span>

          <div>
            <p
              className="
                m-0 text-[18px]
                font-extrabold
                leading-none
              "
              style={{ color: C.text }}
            >
              100%
            </p>

            <p
              className="
                mb-0 mt-1
                text-[11px]
                font-medium
                leading-snug
              "
              style={{ color: C.textMid }}
            >
              Atención gratuita
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================
// INDICADORES
// ============================================================

function AboutStats({ reducedMotion }) {
  return (
    <div
      className="
        grid grid-cols-2
        gap-5
        border-y py-5
        sm:gap-7
      "
      style={{
        borderColor: C.border,
      }}
    >
      {STATS.map(({ num, label }, index) => (
        <motion.div
          key={label}
          variants={fadeUp}
          {...revealProps(reducedMotion, index * 0.08)}
          className="min-w-0"
        >
          <div
            className="
              mb-1
              text-[clamp(1.8rem,3vw,2.4rem)]
              font-extrabold
              leading-none
              tracking-[-0.04em]
            "
            style={{ color: C.brand }}
          >
            {num}
          </div>

          <p
            className="
              m-0 max-w-[170px]
              text-[12px]
              font-medium
              leading-[1.5]
              sm:text-[13px]
            "
            style={{ color: C.textMid }}
          >
            {label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================
// CONTENIDO
// ============================================================

function AboutContent({ reducedMotion }) {
  return (
    <div className="min-w-0 py-1">
      {/* Etiqueta */}
      <motion.div
        variants={fadeIn}
        {...revealProps(reducedMotion, 0.05)}
        className="mb-3"
      >
        <SectionLabel>
          Sobre nosotros
        </SectionLabel>
      </motion.div>

      {/* Título */}
      <motion.h2
        id="acerca-de-title"
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.1)}
        className="
          mb-5
          max-w-[610px]
          text-[clamp(2rem,3.5vw,3.2rem)]
          font-extrabold
          leading-[1.12]
          tracking-[-0.045em]
        "
        style={{ color: C.text }}
      >
        Unidos por la compasión,{" "}
        <span style={{ color: C.brand }}>
          cambiando vidas.
        </span>
      </motion.h2>

      {/* Descripción */}
      <div className="max-w-[570px] space-y-4">
        <motion.p
          variants={fadeUp}
          {...revealProps(reducedMotion, 0.18)}
          className="
            m-0 text-[14px]
            leading-[1.8]
            sm:text-[15px]
          "
          style={{ color: C.textMid }}
        >
          Somos una Asociación Civil dedicada a acompañar
          a pacientes con leucemia y cáncer en México.
          Nadie debe enfrentar esta batalla solo, y
          trabajamos cada día para que cada persona
          reciba la atención que merece.
        </motion.p>

        <motion.p
          variants={fadeUp}
          {...revealProps(reducedMotion, 0.25)}
          className="
            m-0 text-[14px]
            leading-[1.8]
            sm:text-[15px]
          "
          style={{ color: C.textMid }}
        >
          Nuestro equipo de médicos, abogados y especialistas
          trabaja de manera multidisciplinaria para facilitar
          el acceso a medicamentos, proteger los derechos
          de los pacientes y brindar acompañamiento emocional
          a sus familias.
        </motion.p>
      </div>

      {/* Estadísticas */}
      <motion.div
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.32)}
        className="my-6"
      >
        <AboutStats reducedMotion={reducedMotion} />
      </motion.div>

      {/* Botón */}
      <motion.div
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.4)}
        className="flex items-center"
      >
        <GhostBtn to="/acerca-de">
          Conoce nuestra historia
        </GhostBtn>
      </motion.div>
    </div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function AcercaDe() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="inicio-contenido"
      aria-labelledby="acerca-de-title"
      className="
        relative w-full
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
      <div
        className="
          mx-auto grid
          w-full max-w-[1360px]
          grid-cols-1
          items-center
          gap-8
          md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]
          md:gap-9
          lg:gap-12
          xl:gap-14
        "
      >
        {/* Fotografía */}
        <AboutImage reducedMotion={reducedMotion} />

        {/* Contenido */}
        <AboutContent reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
