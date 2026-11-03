
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  IconArrowUpRight,
  IconBriefcase,
  IconUserHeart,
  IconUsers,
} from "@tabler/icons-react";

import { C } from "./tokens";
import SectionLabel from "./SectionLabel";

// ============================================================
// CONFIGURACIÓN
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const TIPOS = [
  {
    number: "01",
    icon: IconBriefcase,
    tipo: "Empresa aliada",
    description:
      "Organizaciones que suman recursos y compromiso para fortalecer las iniciativas de la Fundación.",
  },
  {
    number: "02",
    icon: IconUsers,
    tipo: "Embajador",
    description:
      "Personas que comparten nuestra causa y ayudan a llevar nuestro mensaje a más comunidades.",
  },
  {
    number: "03",
    icon: IconUserHeart,
    tipo: "Donador individual",
    description:
      "Personas que, a través de sus aportaciones, contribuyen a mejorar la realidad de quienes más lo necesitan.",
  },
];

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

const VIEWPORT = {
  once: true,
  amount: 0.15,
};

// ============================================================
// TIPO DE DONADOR
// ============================================================

function DonorType({
  number,
  icon: Icon,
  tipo,
  description,
  index,
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      variants={reducedMotion ? undefined : fadeUp}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        delay: reducedMotion ? 0 : index * 0.1,
        ease: EASE,
      }}
      className="
        group flex h-full
        flex-col
        border-t pt-6
        sm:pt-7
      "
      style={{ borderColor: C.border }}
    >
      {/* Número e icono */}
      <div
        className="
          mb-8 flex
          items-start
          justify-between
        "
      >
        <span
          className="
            text-[clamp(2.6rem,4vw,3.7rem)]
            font-light
            leading-none
            tracking-[-0.07em]
          "
          style={{ color: C.brand }}
        >
          {number}
        </span>

        <Icon
          size={27}
          stroke={1.35}
          style={{ color: C.brand }}
          aria-hidden="true"
        />
      </div>

      {/* Título */}
      <h3
        className="
          mb-3
          text-[clamp(1.25rem,2vw,1.65rem)]
          font-bold
          leading-[1.3]
          tracking-[-0.035em]
        "
        style={{ color: C.text }}
      >
        {tipo}
      </h3>

      {/* Descripción */}
      <p
        className="
          mb-8
          max-w-[360px]
          text-[14px]
          leading-[1.8]
        "
        style={{ color: C.textMid }}
      >
        {description}
      </p>

      {/* Estado editorial */}
      <div
        className="
          mt-auto flex
          items-center gap-2
          border-t pt-4
        "
        style={{ borderColor: C.border }}
      >
        <span
          className="
            text-[12px]
            font-medium
          "
          style={{ color: C.textMid }}
        >
          Próximamente compartiremos
          sus historias
        </span>
      </div>
    </motion.article>
  );
}

// ============================================================
// ENCABEZADO
// ============================================================

function SectionHeader() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={reducedMotion ? undefined : fadeUp}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        ease: EASE,
      }}
      className="
        mb-10
        lg:mb-14
      "
    >
      <SectionLabel>
        Donadores
      </SectionLabel>

      <div
        className="
          grid grid-cols-1
          items-end gap-6
          lg:grid-cols-2
          lg:gap-16
        "
      >
        {/* Título */}
        <h2
          id="manos-transforman-title"
          className="
            max-w-[650px]
            text-[clamp(2.1rem,3.8vw,3.6rem)]
            font-extrabold
            leading-[1.12]
            tracking-[-0.05em]
          "
          style={{ color: C.text }}
        >
          Manos que{" "}
          <span style={{ color: C.brand }}>
            transforman.
          </span>
        </h2>

        {/* Descripción */}
        <p
          className="
            max-w-[580px]
            text-[15px]
            leading-[1.85]
            sm:text-[16px]
          "
          style={{ color: C.textMid }}
        >
          Detrás de cada donación hay una
          historia de generosidad, compromiso
          y esperanza. Compartiremos los
          relatos de quienes han decidido
          unir su esfuerzo al de la Fundación.
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function ManosTransforman() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="manos-transforman-title"
      className="
        overflow-hidden
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
          mx-auto w-full
          max-w-[1360px]
        "
      >
        {/* Encabezado */}
        <SectionHeader />

        {/* Tipos de donadores */}
        <div
          className="
            grid grid-cols-1
            gap-10
            sm:grid-cols-2
            sm:gap-8
            lg:grid-cols-3
            lg:gap-12
          "
        >
          {TIPOS.map((item, index) => (
            <DonorType
              key={item.number}
              {...item}
              index={index}
            />
          ))}
        </div>

        {/* Cierre */}
        <motion.div
          variants={reducedMotion ? undefined : fadeUp}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{
            duration: reducedMotion ? 0 : 0.65,
            ease: EASE,
          }}
          className="
            mt-12 flex
            flex-col
            items-start
            justify-between
            gap-5
            border-t pt-7
            sm:flex-row
            sm:items-center
            lg:mt-16
          "
          style={{
            borderColor: C.border,
          }}
        >
          <div>
            <p
              className="
                mb-1
                text-[15px]
                font-bold
              "
              style={{ color: C.text }}
            >
              Cada forma de ayudar cuenta.
            </p>

            <p
              className="
                text-[13px]
                leading-[1.7]
              "
              style={{ color: C.textMid }}
            >
              Tu participación también puede
              formar parte de esta historia.
            </p>
          </div>

          <a
            href="#especie"
            className="
              group inline-flex
              min-h-11
              items-center
              gap-2
              border-b-2
              pb-1
              text-[13px]
              font-bold
              transition-colors
              hover:text-[#A02C3E]
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
            Conoce cómo donar

            <IconArrowUpRight
              size={17}
              stroke={1.8}
              aria-hidden="true"
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                motion-reduce:transform-none
              "
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
