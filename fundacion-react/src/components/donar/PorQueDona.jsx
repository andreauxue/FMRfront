
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { C } from "./tokens";
import SectionLabel from "./SectionLabel";

// ============================================================
// CONFIGURACIÓN
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const VIEWPORT = {
  once: true,
  amount: 0.15,
};

// ============================================================
// DECLARACIÓN INSTITUCIONAL
// ============================================================

function InstitutionalStatement() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={reducedMotion ? undefined : fadeRight}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{
        duration: reducedMotion ? 0 : 0.75,
        delay: reducedMotion ? 0 : 0.12,
        ease: EASE,
      }}
      className="
        relative
        border-l-[3px]
        py-5 pl-7
        sm:py-7 sm:pl-9
        lg:ml-8
      "
      style={{ borderColor: C.brand }}
    >
      <p
        className="
          mb-8
          text-[clamp(1.45rem,2.5vw,2.25rem)]
          font-semibold
          leading-[1.5]
          tracking-[-0.035em]
        "
        style={{ color: C.text }}
      >
        Cada contribución es administrada con
        responsabilidad y transparencia, y
        representa una oportunidad más para
        cambiar vidas.
      </p>

      <div className="flex flex-col gap-1">
        <span
          className="
            text-[11px]
            font-bold uppercase
            tracking-[0.12em]
          "
          style={{ color: C.brand }}
        >
          Nuestro compromiso
        </span>

        <span
          className="
            text-[13px]
            font-medium
          "
          style={{ color: C.textMid }}
        >
          Fundación Mejoremos Realidades A.C.
        </span>
      </div>
    </motion.div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function PorQueDona() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="por-que-dona-title"
      className="
        overflow-hidden
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.surface }}
    >
      <div
        className="
          mx-auto grid
          w-full max-w-[1360px]
          grid-cols-1
          items-center
          gap-12
          lg:grid-cols-2
          lg:gap-16
          xl:gap-24
        "
      >
        {/* Columna izquierda */}
        <motion.div
          variants={reducedMotion ? undefined : fadeLeft}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{
            duration: reducedMotion ? 0 : 0.75,
            ease: EASE,
          }}
          className="min-w-0"
        >
          <SectionLabel>
            Ayuda en nuestra causa
          </SectionLabel>

          <h2
            id="por-que-dona-title"
            className="
              mb-6
              text-[clamp(2.1rem,3.6vw,3.4rem)]
              font-extrabold
              leading-[1.13]
              tracking-[-0.045em]
            "
            style={{ color: C.text }}
          >
            Tu aportación{" "}
            <span style={{ color: C.brand }}>
              construye realidades.
            </span>
          </h2>

          <div
            className="
              max-w-[620px]
              space-y-5
              text-[15px]
              leading-[1.85]
              sm:text-[16px]
            "
            style={{ color: C.textMid }}
          >
            <p>
              Las donaciones económicas hacen
              posible que nuestros programas sigan
              creciendo y lleguen a más personas
              que requieren acompañamiento médico,
              psicológico y social.
            </p>

            <p>
              Con tu aportación, fortalecemos
              nuestras redes de apoyo, adquirimos
              medicamentos, financiamos tratamientos
              y continuamos construyendo proyectos
              que mejoran realidades todos los días.
            </p>

            <p
              className="
                pt-1
                font-semibold
              "
              style={{ color: C.text }}
            >
              Tu apoyo nos impulsa a seguir
              tejiendo esperanza.
            </p>
          </div>
        </motion.div>

        {/* Columna derecha */}
        <InstitutionalStatement />
      </div>
    </section>
  );
}
