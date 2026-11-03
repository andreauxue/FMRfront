
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { C, SERVICES } from "../../../data/homeData";
import { SectionLabel } from "../ui";

// ============================================================
// ANIMACIONES
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const VIEWPORT = {
  once: true,
  amount: 0.12,
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
// TARJETA DE SERVICIO
// ============================================================

function ServiceCard({ service, index, reducedMotion }) {
  const { title, body, img, href } = service;

  return (
    <motion.article
      variants={reducedMotion ? undefined : itemVariants}
      className="group flex h-full min-w-0 flex-col"
    >
      {/* Fotografía */}
      <Link
        to={href}
        aria-label={`Conocer el servicio de ${title}`}
        className="
          relative mb-5 block
          aspect-[4/3] w-full
          overflow-hidden rounded-xl
          bg-[#F1E9EB]
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
        "
        style={{ outlineColor: C.brand }}
      >
        <motion.img
          src={img}
          alt={title}
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
                    duration: 0.65,
                    ease: EASE,
                  },
                }
          }
        />
      </Link>

      {/* Número editorial */}
      <div className="mb-3 flex items-center gap-3">
        <span
          className="
            text-[11px] font-bold
            tracking-[0.12em]
          "
          style={{ color: C.brand }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className="h-px w-8"
          style={{ backgroundColor: C.border }}
          aria-hidden="true"
        />
      </div>

      {/* Título */}
      <h3
        className="
          mb-2
          text-[clamp(1.2rem,2vw,1.5rem)]
          font-bold
          leading-[1.25]
          tracking-[-0.035em]
        "
        style={{ color: C.text }}
      >
        {title}
      </h3>

      {/* Descripción */}
      <p
        className="
          mb-4 max-w-[390px]
          flex-1 text-[14px]
          leading-[1.75]
          sm:text-[15px]
        "
        style={{ color: C.textMid }}
      >
        {body}
      </p>

      {/* Enlace */}
      <Link
        to={href}
        className="
          inline-flex w-fit
          items-center border-b
          pb-1 text-[13px]
          font-bold
          transition-colors duration-200
          hover:opacity-75
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
        "
        style={{
          color: C.brand,
          borderColor: C.brand,
          outlineColor: C.brand,
        }}
      >
        Conocer el servicio
      </Link>
    </motion.article>
  );
}

// ============================================================
// ENCABEZADO
// ============================================================

function ServicesHeader({ reducedMotion }) {
  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 16 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        ease: EASE,
      }}
      className="mb-8 lg:mb-10"
    >
      <div className="mb-3">
        <SectionLabel>Servicios</SectionLabel>
      </div>

      <div
        className="
          flex flex-col gap-3
          md:flex-row
          md:items-end
          md:justify-between
          md:gap-10
        "
      >
        <h2
          id="servicios-title"
          className="
            max-w-[680px]
            text-[clamp(2rem,3.7vw,3.2rem)]
            font-extrabold
            leading-[1.12]
            tracking-[-0.045em]
          "
          style={{ color: C.text }}
        >
          Nuestros{" "}
          <span style={{ color: C.brand }}>
            servicios integrales.
          </span>
        </h2>

        <p
          className="
            max-w-[360px]
            text-[14px]
            leading-[1.75]
            sm:text-[15px]
          "
          style={{ color: C.textMid }}
        >
          Acompañamiento especializado para atender las
          necesidades médicas, emocionales y jurídicas
          de cada paciente y su familia.
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function Servicios() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="
        relative w-full
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.bg }}
    >
      <div className="mx-auto w-full max-w-[1360px]">
        {/* Encabezado */}
        <ServicesHeader reducedMotion={reducedMotion} />

        {/* Cuadrícula de servicios */}
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
            grid grid-cols-1
            gap-x-7 gap-y-9
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-8
          "
        >
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.href || service.title}
              service={service}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
