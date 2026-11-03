
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { C } from "../../../data/homeData";

// ============================================================
// CONFIGURACIÓN DE ANIMACIONES
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const VIEWPORT = {
  once: true,
  amount: 0.2,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

// ============================================================
// ENCABEZADO
// ============================================================

function CtaHeading() {
  return (
    <div className="min-w-0">
      <motion.p
        variants={itemVariants}
        className="
          mb-3
          text-[11px]
          font-bold uppercase
          tracking-[0.14em]
          text-white/70
        "
      >
        Sé parte del cambio
      </motion.p>

      <motion.h2
        id="cta-banner-title"
        variants={itemVariants}
        className="
          max-w-[700px]
          text-[clamp(2rem,4vw,3.5rem)]
          font-extrabold
          leading-[1.12]
          tracking-[-0.045em]
          text-white
        "
      >
        Cada acto de generosidad{" "}
        <span className="text-white/75">
          transforma una vida.
        </span>
      </motion.h2>
    </div>
  );
}

// ============================================================
// DESCRIPCIÓN Y ACCIONES
// ============================================================

function CtaActions() {
  return (
    <div
      className="
        flex min-w-0
        flex-col
        items-start
        gap-5
        md:items-end
      "
    >
      <motion.p
        variants={itemVariants}
        className="
          m-0 max-w-[410px]
          text-[14px]
          leading-[1.8]
          text-white/85
          sm:text-[15px]
          md:text-right
        "
      >
        Tu apoyo nos permite llegar a más pacientes y
        familias que necesitan acompañamiento médico,
        jurídico y emocional.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="
          flex flex-wrap
          items-center gap-3
          md:justify-end
        "
      >
        {/* Acción principal */}
        <Link
          to="/donar"
          className="
            inline-flex min-h-12
            items-center justify-center
            rounded-md
            bg-white
            px-7
            text-[14px]
            font-bold
            transition-colors
            duration-200
            hover:bg-[#F5F5F5]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-white
          "
          style={{
            color: C.brand,
          }}
        >
          Donar ahora
        </Link>

        {/* Acción secundaria */}
        <Link
          to="/voluntariado"
          className="
            inline-flex min-h-12
            items-center justify-center
            rounded-md
            border border-white/60
            px-7
            text-[14px]
            font-semibold
            text-white
            transition-colors
            duration-200
            hover:bg-white/10
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-white
          "
        >
          Ser voluntario
        </Link>
      </motion.div>
    </div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function CtaBanner() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="participa"
      aria-labelledby="cta-banner-title"
      className="
        relative w-full
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{
        backgroundColor: C.brand,
      }}
    >
      <motion.div
        variants={
          reducedMotion
            ? undefined
            : containerVariants
        }
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={VIEWPORT}
        className="
          mx-auto grid
          w-full max-w-[1360px]
          grid-cols-1
          items-center
          gap-7
          md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]
          md:gap-10
          lg:gap-14
        "
      >
        {/* Título */}
        <CtaHeading />

        {/* Descripción y botones */}
        <CtaActions />
      </motion.div>
    </section>
  );
}
