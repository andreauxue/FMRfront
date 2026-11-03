
import { motion, useReducedMotion } from "framer-motion";

import { C, IMG } from "../../../data/homeData";
import { SectionLabel, GhostBtn } from "../ui";

// ============================================================
// CONFIGURACIÓN DE ANIMACIONES
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
// FOTOGRAFÍA DEL EQUIPO
// ============================================================

function TeamImage({ reducedMotion }) {
  return (
    <motion.div
      variants={fadeUp}
      {...revealProps(reducedMotion)}
      className="relative w-full min-w-0"
    >
      <div
        className="
          group relative
          h-[340px] w-full
          overflow-hidden
          rounded-xl
          bg-[#F2E9EB]
          sm:h-[420px]
          md:h-[480px]
          lg:h-[520px]
          xl:h-[550px]
        "
      >
        <motion.img
          src={IMG.teamPhoto}
          alt="Equipo de la Fundación Mejoremos Realidades"
          loading="lazy"
          decoding="async"
          className="
            absolute inset-0
            block h-full w-full
            object-cover
            object-center
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
      </div>
    </motion.div>
  );
}

// ============================================================
// CONTENIDO
// ============================================================

function TeamContent({ reducedMotion }) {
  return (
    <div className="min-w-0">
      {/* Etiqueta */}
      <motion.div
        variants={fadeIn}
        {...revealProps(reducedMotion, 0.05)}
        className="mb-3"
      >
        <SectionLabel>
          Las personas detrás de la causa
        </SectionLabel>
      </motion.div>

      {/* Título */}
      <motion.h2
        id="equipo-title"
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
        Un equipo comprometido con{" "}
        <span style={{ color: C.brand }}>
          tu bienestar.
        </span>
      </motion.h2>

      {/* Primer párrafo */}
      <motion.p
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.18)}
        className="
          mb-4 max-w-[560px]
          text-[14px]
          leading-[1.8]
          sm:text-[15px]
        "
        style={{ color: C.textMid }}
      >
        Somos un grupo multidisciplinario de médicos,
        abogados, psicólogos y voluntarios unidos por
        un mismo propósito: asegurar que ningún paciente
        con leucemia enfrente solo su diagnóstico.
      </motion.p>

      {/* Segundo párrafo */}
      <motion.p
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.25)}
        className="
          mb-6 max-w-[560px]
          text-[14px]
          leading-[1.8]
          sm:text-[15px]
        "
        style={{ color: C.textMid }}
      >
        Desde la presidencia hasta las operaciones
        tecnológicas, cada integrante aporta su
        experiencia y vocación de servicio para hacer
        de Mejoremos Realidades una asociación sólida,
        humana e integral.
      </motion.p>

      {/* Enlace */}
      <motion.div
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.32)}
        className="flex items-center"
      >
        <GhostBtn to="/equipo">
          Conoce al equipo
        </GhostBtn>
      </motion.div>
    </div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function Equipo() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="equipo"
      aria-labelledby="equipo-title"
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
        {/* Fotografía grupal */}
        <TeamImage reducedMotion={reducedMotion} />

        {/* Información */}
        <TeamContent reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
