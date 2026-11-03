
import { Link } from "react-router-dom";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  IconArrowRight,
  IconBuildingBank,
} from "@tabler/icons-react";

import { C } from "./tokens";
import SectionLabel from "./SectionLabel";

// ============================================================
// CONFIGURACIÓN
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const CONTACT_URL =
  "https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b";

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
// ESTADO DE TRANSFERENCIA
// ============================================================

function TransferStatus() {
  return (
    <div
      className="
        flex items-center
        gap-2
      "
    >
      <span
        className="
          h-2 w-2
          rounded-full
        "
        style={{
          backgroundColor: C.brand,
        }}
        aria-hidden="true"
      />

      <span
        className="
          text-[11px]
          font-bold uppercase
          tracking-[0.12em]
        "
        style={{ color: C.brand }}
      >
        Próximamente
      </span>
    </div>
  );
}

// ============================================================
// INFORMACIÓN BANCARIA
// ============================================================

function BankInformation() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={reducedMotion ? undefined : fadeUp}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : 0.1,
        ease: EASE,
      }}
      className="
        grid grid-cols-1
        overflow-hidden
        border
        bg-white
        lg:grid-cols-[0.35fr_0.65fr]
      "
      style={{
        borderColor: C.border,
      }}
    >
      {/* Columna institucional */}
      <div
        className="
          flex flex-col
          justify-between
          gap-8
          px-7 py-8
          sm:px-9 sm:py-10
          lg:min-h-[340px]
        "
        style={{
          backgroundColor: C.text,
        }}
      >
        <div>
          <IconBuildingBank
            size={32}
            stroke={1.25}
            className="mb-6 text-white"
            aria-hidden="true"
          />

          <p
            className="
              mb-2
              text-[11px]
              font-bold uppercase
              tracking-[0.12em]
              text-white/55
            "
          >
            Donación económica
          </p>

          <h3
            className="
              max-w-[280px]
              text-[clamp(1.5rem,2.5vw,2rem)]
              font-bold
              leading-[1.25]
              tracking-[-0.035em]
              text-white
            "
          >
            Datos bancarios
          </h3>
        </div>

        <p
          className="
            max-w-[290px]
            text-[13px]
            leading-[1.75]
            text-white/65
          "
        >
          Estamos preparando una nueva forma
          de contribuir a nuestra causa.
        </p>
      </div>

      {/* Columna informativa */}
      <div
        className="
          flex flex-col
          justify-center
          px-7 py-9
          sm:px-10 sm:py-12
          lg:px-14
        "
      >
        <TransferStatus />

        <h3
          className="
            mb-4 mt-5
            max-w-[570px]
            text-[clamp(1.5rem,2.6vw,2.25rem)]
            font-bold
            leading-[1.25]
            tracking-[-0.035em]
          "
          style={{ color: C.text }}
        >
          Estamos configurando este canal
          de donación.
        </h3>

        <p
          className="
            mb-7
            max-w-[560px]
            text-[14px]
            leading-[1.85]
            sm:text-[15px]
          "
          style={{ color: C.textMid }}
        >
          Pronto podrás realizar tus donativos
          directamente por transferencia bancaria.
          Mientras tanto, escríbenos y con gusto
          te orientamos sobre cómo apoyar
          a la Fundación.
        </p>

        <div>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex min-h-12
              items-center justify-center
              gap-3
              rounded-md
              px-7 py-3
              text-[14px]
              font-bold
              text-white
              transition-colors
              duration-200
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
            Contáctanos

            <IconArrowRight
              size={17}
              stroke={1.8}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// TRANSFERENCIA PRÓXIMAMENTE
// ============================================================

export function TransferenciaProximamente() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="transferencia"
      aria-labelledby="transferencia-title"
      className="
        scroll-mt-24
        overflow-hidden
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
          mx-auto w-full
          max-w-[1360px]
        "
      >
        {/* Encabezado */}
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
            mb-9
            lg:mb-11
          "
        >
          <SectionLabel>
            Donación económica
          </SectionLabel>

          <h2
            id="transferencia-title"
            className="
              max-w-[850px]
              text-[clamp(2.1rem,3.8vw,3.5rem)]
              font-extrabold
              leading-[1.13]
              tracking-[-0.045em]
            "
            style={{ color: C.text }}
          >
            Dona por{" "}
            <span style={{ color: C.brand }}>
              transferencia bancaria.
            </span>
          </h2>
        </motion.div>

        {/* Información */}
        <BankInformation />
      </div>
    </section>
  );
}

// ============================================================
// CTA FINAL
// ============================================================

export function CtaBanner() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="donar-cta-title"
      className="
        overflow-hidden
        px-5 py-14
        sm:px-8 sm:py-16
        lg:px-12 lg:py-20
        xl:px-16
        2xl:px-20
      "
      style={{
        backgroundColor: C.brand,
      }}
    >
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
          mx-auto grid
          w-full max-w-[1360px]
          grid-cols-1
          items-center
          gap-9
          lg:grid-cols-[1.2fr_0.8fr]
          lg:gap-16
        "
      >
        {/* Columna izquierda */}
        <div>
          <p
            className="
              mb-5
              text-[11px]
              font-bold uppercase
              tracking-[0.14em]
              text-white/75
            "
          >
            Sé parte del cambio
          </p>

          <h2
            id="donar-cta-title"
            className="
              max-w-[800px]
              text-[clamp(2.3rem,4.6vw,4.5rem)]
              font-extrabold
              leading-[1.1]
              tracking-[-0.05em]
              text-white
            "
          >
            Cada acto de generosidad{" "}
            <span className="text-white/75">
              transforma una vida.
            </span>
          </h2>
        </div>

        {/* Columna derecha */}
        <div
          className="
            flex flex-col
            items-start
            gap-7
            lg:items-end
          "
        >
          <p
            className="
              max-w-[470px]
              text-[15px]
              leading-[1.85]
              text-white/85
              sm:text-[16px]
              lg:text-right
            "
          >
            Tu apoyo nos permite acompañar a
            más pacientes y familias que
            necesitan orientación médica,
            jurídica y emocional.
          </p>

          {/* Acciones */}
          <div
            className="
              flex flex-wrap
              gap-3
              lg:justify-end
            "
          >
            <a
              href="#especie"
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md
                bg-white
                px-7 py-3
                text-[14px]
                font-bold
                transition-colors
                hover:bg-[#F3F4F6]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white
              "
              style={{ color: C.brand }}
            >
              Donar ahora
            </a>

            <Link
              to="/servicios"
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md
                border border-white/60
                px-7 py-3
                text-[14px]
                font-semibold
                text-white
                transition-colors
                hover:bg-white/10
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white
              "
            >
              Nuestros servicios
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
