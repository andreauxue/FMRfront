
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

const CONTACT_URL =
  "https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b";

const ACCEPTS = [
  {
    number: "01",
    label: "Medicamentos",
    note:
      "En buen estado, sin abrir y con fecha de caducidad vigente.",
  },
  {
    number: "02",
    label: "Insumos médicos",
    note:
      "Jeringas, guantes, material de curación y otros insumos.",
  },
  {
    number: "03",
    label: "Artículos de higiene",
    note:
      "Jabón, alcohol, mascarillas y productos similares.",
  },
  {
    number: "04",
    label: "Otros artículos",
    note:
      "Contáctanos para verificar si podemos recibirlos.",
  },
];

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
// ARTÍCULO ACEPTADO
// ============================================================

function AcceptedItem({ number, label, note }) {
  return (
    <div
      className="
        grid grid-cols-[40px_1fr]
        gap-4 border-t
        py-5
        sm:grid-cols-[52px_1fr]
        sm:gap-5
      "
      style={{ borderColor: C.border }}
    >
      {/* Número */}
      <span
        className="
          pt-0.5
          text-[13px]
          font-bold
          tracking-[0.05em]
        "
        style={{ color: C.brand }}
      >
        {number}
      </span>

      {/* Información */}
      <div>
        <h4
          className="
            mb-1.5
            text-[16px]
            font-bold
            tracking-[-0.02em]
          "
          style={{ color: C.text }}
        >
          {label}
        </h4>

        <p
          className="
            max-w-[430px]
            text-[13px]
            leading-[1.75]
            sm:text-[14px]
          "
          style={{ color: C.textMid }}
        >
          {note}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// LISTA DE DONACIONES
// ============================================================

function AcceptedDonations() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={reducedMotion ? undefined : fadeRight}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{
        duration: reducedMotion ? 0 : 0.75,
        delay: reducedMotion ? 0 : 0.1,
        ease: EASE,
      }}
      className="min-w-0"
    >
      {/* Encabezado */}
      <div className="mb-6">
        <p
          className="
            mb-3
            text-[11px]
            font-bold uppercase
            tracking-[0.12em]
          "
          style={{ color: C.brand }}
        >
          Donaciones que recibimos
        </p>

        <h3
          className="
            text-[clamp(1.5rem,2.3vw,2rem)]
            font-bold
            leading-[1.25]
            tracking-[-0.035em]
          "
          style={{ color: C.text }}
        >
          ¿Qué podemos recibir?
        </h3>
      </div>

      {/* Lista */}
      <div>
        {ACCEPTS.map((item) => (
          <AcceptedItem
            key={item.number}
            {...item}
          />
        ))}
      </div>

      {/* Nota */}
      <p
        className="
          mt-4
          max-w-[520px]
          text-[12px]
          leading-[1.75]
          sm:text-[13px]
        "
        style={{ color: C.textMid }}
      >
        La recepción de artículos está sujeta a
        las necesidades actuales de la Fundación
        y a la revisión de sus condiciones.
      </p>
    </motion.div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function DonacionesEspecie() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="especie"
      aria-labelledby="donaciones-especie-title"
      className="
        scroll-mt-24
        overflow-hidden
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.bg }}
    >
      <div
        className="
          mx-auto grid
          w-full max-w-[1360px]
          grid-cols-1
          items-start
          gap-12
          lg:grid-cols-2
          lg:items-center
          lg:gap-16
          xl:gap-24
        "
      >
        {/* ==================================================
            COLUMNA IZQUIERDA
        ================================================== */}

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
            Donaciones en especie
          </SectionLabel>

          <h2
            id="donaciones-especie-title"
            className="
              mb-6
              max-w-[650px]
              text-[clamp(2.1rem,3.6vw,3.4rem)]
              font-extrabold
              leading-[1.13]
              tracking-[-0.045em]
            "
            style={{ color: C.text }}
          >
            Dona{" "}
            <span style={{ color: C.brand }}>
              medicamentos,
            </span>{" "}
            insumos o artículos.
          </h2>

          {/* Descripción */}
          <div
            className="
              max-w-[610px]
              space-y-5
              text-[15px]
              leading-[1.85]
              sm:text-[16px]
            "
            style={{ color: C.textMid }}
          >
            <p>
              Si cuentas con medicamentos en buen
              estado, insumos médicos, artículos
              de higiene o cualquier otro recurso
              que pueda beneficiar a nuestros
              pacientes, puedes donarlo en especie.
            </p>

            <p>
              Contáctanos primero para coordinar
              la entrega y asegurarnos de que
              llegue a quien más lo necesita
              de la manera más eficiente.
            </p>
          </div>

          {/* Botón */}
          <div className="mt-8">
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md
                px-7 py-3
                text-center
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
              Coordinar donación en especie
            </a>
          </div>
        </motion.div>

        {/* ==================================================
            COLUMNA DERECHA
        ================================================== */}

        <AcceptedDonations />
      </div>
    </section>
  );
}
