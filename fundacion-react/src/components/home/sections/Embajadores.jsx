
import { motion, useReducedMotion } from "framer-motion";

import { C, AMBASSADORS } from "../../../data/homeData";
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
    y: 0,
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
// FOTOGRAFÍA DEL EMBAJADOR
// ============================================================

function AmbassadorImage({ ambassador, reducedMotion }) {
  if (!ambassador) return null;

  return (
    <motion.div
      variants={fadeUp}
      {...revealProps(reducedMotion, 0.12)}
      className="relative w-full min-w-0"
    >
      <div
        className="
          group relative
          h-[400px] w-full
          overflow-hidden
          rounded-xl
          bg-[#F2E9EB]
          sm:h-[480px]
          md:h-[540px]
          lg:h-[580px]
          xl:h-[620px]
        "
      >
        <motion.img
          src={ambassador.img}
          alt={ambassador.name || "Embajador de Mejoremos Realidades"}
          loading="lazy"
          decoding="async"
          className="
            absolute inset-0
            block h-full w-full
            object-cover object-top
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

      {/* Identificación editorial debajo de la imagen */}
      {ambassador.name && (
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <p
            className="
              m-0 text-[14px]
              font-semibold
              tracking-[-0.01em]
            "
            style={{ color: C.text }}
          >
            {ambassador.name}
          </p>

          <span
            className="
              shrink-0 text-[11px]
              font-semibold uppercase
              tracking-[0.12em]
            "
            style={{ color: C.brand }}
          >
            Embajador
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================
// CONTENIDO
// ============================================================

function AmbassadorContent({ reducedMotion }) {
  return (
    <div className="min-w-0">
      {/* Etiqueta */}
      <motion.div
        variants={fadeIn}
        {...revealProps(reducedMotion, 0.05)}
        className="mb-3"
      >
        <SectionLabel>
          Héroe contra la leucemia
        </SectionLabel>
      </motion.div>

      {/* Título */}
      <motion.h2
        id="embajadores-title"
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
        Nuestros{" "}
        <span style={{ color: C.brand }}>
          embajadores.
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
        Contamos con el respaldo de figuras comprometidas
        con nuestra causa, que contribuyen a visibilizar
        la realidad de los pacientes con leucemia en México
        y a amplificar el alcance de nuestra misión.
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
        Su participación nos permite llegar a más personas,
        generar alianzas y construir una comunidad de apoyo
        más sólida para quienes más lo necesitan.
      </motion.p>

      {/* Botón */}
      <motion.div
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.32)}
        className="flex items-center"
      >
        <GhostBtn to="/embajadores">
          Conoce más
        </GhostBtn>
      </motion.div>
    </div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function Embajadores() {
  const reducedMotion = useReducedMotion();
  const ambassador = AMBASSADORS?.[0];

  return (
    <section
      id="embajadores"
      aria-labelledby="embajadores-title"
      className="
        relative w-full
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{
        backgroundColor: C.bg,
      }}
    >
      <div
        className="
          mx-auto grid
          w-full max-w-[1360px]
          grid-cols-1
          items-center
          gap-8
          md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
          md:gap-9
          lg:gap-12
          xl:gap-14
        "
      >
        {/* Texto */}
        <AmbassadorContent reducedMotion={reducedMotion} />

        {/* Fotografía protagonista */}
        <AmbassadorImage
          ambassador={ambassador}
          reducedMotion={reducedMotion}
        />
      </div>
    </section>
  );
}
