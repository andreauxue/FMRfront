
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { IconHeart } from "@tabler/icons-react";

import { C, IMG, RESOURCES } from "../../../data/homeData";
import { SectionLabel } from "../ui";

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

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
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
// FOTOGRAFÍA
// ============================================================

function CausasImage({ reducedMotion }) {
  return (
    <motion.div
      variants={fadeUp}
      {...revealProps(reducedMotion)}
      className="relative min-w-0 w-full"
    >
      <div
        className="
          group relative
          h-[360px] w-full
          overflow-hidden
          rounded-xl
          bg-white/10
          sm:h-[440px]
          md:h-[540px]
          lg:h-[580px]
        "
      >
        <motion.img
          src={IMG.about}
          alt="Acompañamiento a pacientes y sus familias"
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

        {/* Degradado discreto */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-t
            from-black/20
            via-transparent
            to-transparent
          "
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

// ============================================================
// LISTA DE RECURSOS
// ============================================================

function ResourcesList({ reducedMotion }) {
  return (
    <motion.div
      variants={reducedMotion ? undefined : listVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      className="mt-6 border-t border-white/15"
    >
      {RESOURCES.map(({ icon: Icon, text }) => (
        <motion.div
          key={text}
          variants={reducedMotion ? undefined : fadeUp}
          transition={{
            duration: 0.6,
            ease: EASE,
          }}
          className="
            flex items-start gap-4
            border-b border-white/15
            py-4
          "
        >
          <span
            className="
              flex h-9 w-9
              shrink-0 items-center
              justify-center
              rounded-lg
              bg-white/10
              text-white
            "
          >
            <Icon
              size={19}
              stroke={1.75}
              aria-hidden="true"
            />
          </span>

          <p
            className="
              m-0 pt-1
              text-[14px]
              font-medium
              leading-[1.7]
              text-white/80
              sm:text-[15px]
            "
          >
            {text}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================
// INVITACIÓN A DONAR
// ============================================================

function DonationCallout({ reducedMotion }) {
  return (
    <motion.div
      variants={fadeUp}
      {...revealProps(reducedMotion, 0.2)}
      className="
        mt-6
        flex flex-col
        items-start gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:gap-6
      "
    >
      <div className="flex items-center gap-3">
        <span
          className="
            flex h-10 w-10
            shrink-0 items-center
            justify-center
            rounded-lg
          "
          style={{
            backgroundColor: `${C.brand}30`,
            color: "#FFFFFF",
          }}
        >
          <IconHeart
            size={21}
            stroke={1.8}
            aria-hidden="true"
          />
        </span>

        <div>
          <p className="m-0 text-[14px] font-semibold text-white">
            Apoya a una familia hoy
          </p>

          <p className="m-0 mt-1 text-[12px] leading-relaxed text-white/60">
            Tu apoyo contribuye a nuestra labor de acompañamiento.
          </p>
        </div>
      </div>

      <Link
        to="/donar"
        className="
          inline-flex min-h-11
          shrink-0 items-center
          justify-center
          rounded-lg
          px-6
          text-[13px]
          font-bold text-white
          transition-[opacity,transform]
          duration-200
          hover:-translate-y-0.5
          hover:opacity-90
          motion-reduce:transform-none
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-white
        "
        style={{
          backgroundColor: C.brand,
        }}
      >
        Donar
      </Link>
    </motion.div>
  );
}

// ============================================================
// CONTENIDO
// ============================================================

function CausasContent({ reducedMotion }) {
  return (
    <div className="min-w-0">
      {/* Etiqueta */}
      <motion.div
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.05)}
        className="mb-3"
      >
        <SectionLabel light>
          Lo que hacemos
        </SectionLabel>
      </motion.div>

      {/* Título */}
      <motion.h2
        id="causas-title"
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.1)}
        className="
          mb-4
          max-w-[620px]
          text-[clamp(2rem,3.5vw,3.2rem)]
          font-extrabold
          leading-[1.12]
          tracking-[-0.045em]
          text-white
        "
      >
        Construyendo esperanza,{" "}
        <span style={{ color: C.brand }}>
          generando cambio.
        </span>
      </motion.h2>

      {/* Descripción */}
      <motion.p
        variants={fadeUp}
        {...revealProps(reducedMotion, 0.18)}
        className="
          m-0 max-w-[560px]
          text-[14px]
          leading-[1.8]
          text-white/70
          sm:text-[15px]
        "
      >
        Conectamos a pacientes con leucemia con recursos
        reales, testimonios y una comunidad que entiende
        el camino. La información correcta puede cambiarlo
        todo.
      </motion.p>

      {/* Recursos */}
      <ResourcesList reducedMotion={reducedMotion} />

      {/* Donación */}
      <DonationCallout reducedMotion={reducedMotion} />
    </div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function Causas() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="causas"
      aria-labelledby="causas-title"
      className="
        relative w-full
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{
        backgroundColor: C.text,
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
        <CausasImage reducedMotion={reducedMotion} />

        {/* Información */}
        <CausasContent reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
