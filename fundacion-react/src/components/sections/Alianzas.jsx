
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import {
  IconArrowLeft,
  IconArrowRight,
  IconX,
  IconExternalLink,
} from "@tabler/icons-react";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

// ============================================================
// PALETA
// ============================================================

const C = {
  brand: "#C8384F",
  brandSoft: "#FAE8EB",
  secondary: "#3B5BA5",
  bg: "#F7F8FA",
  surface: "#FFFFFF",
  text: "#1A2235",
  textMid: "#4B5563",
  border: "#E5E7EB",
};

// ============================================================
// DATOS DE ALIANZAS
// ============================================================

const ALIANZAS = [
  {
    id: "casapas",
    logo: "/alianzas/casapas.png",
    name: "Casa PAS",
    url: "https://www.pas.org.mx",
    tag: "Alianza estratégica",
    summary:
      "Casa PAS es una organización dedicada al acompañamiento integral de personas vulnerables. Fundación Mejoremos Realidades trabaja de la mano con su equipo para ampliar el alcance de los servicios de apoyo a pacientes con leucemia y sus familias, uniendo fuerzas en favor de quienes más lo necesitan.",
    photos: [
      "/alianzas/pas1.jpg",
      "/alianzas/pas2.jpg",
      "/alianzas/pas3.jpg",
      "/alianzas/pas4.jpg",
      "/alianzas/pas5.jpg",
      "/alianzas/pas6.jpg",
      "/alianzas/pas7.jpg",
      "/alianzas/pas8.jpg",
      "/alianzas/pas9.jpg",
      "/alianzas/pas10.jpg",
    ],
  },
  {
    id: "dhilo",
    logo: "/alianzas/dhilo.jpeg",
    name: "DHILO MUN",
    url: "https://www.instagram.com/dhi_lo_",
    tag: "Modelo de Naciones Unidas",
    summary:
      "Fundación Mejoremos Realidades participó en el Modelo de Naciones Unidas organizado por DHILO MUN en la Cámara de Diputados, posicionando la agenda de los derechos de salud de los pacientes con leucemia a nivel institucional. Una colaboración que lleva nuestra voz a los espacios donde se toman decisiones.",
    photos: [
      "/alianzas/Dhilo1.jpg",
      "/alianzas/Dhilo2.jpg",
      "/alianzas/Dhilo3.jpg",
      "/alianzas/Dhilo4.jpg",
      "/alianzas/Dhilo5.jpg",
    ],
  },
  {
    id: "casahogar",
    logo: "/alianzas/logo-casahogar.png",
    name: "Casa Hogar Sagrado Corazón de Jesús",
    url: "https://www.casahogarsagradocorazon.org",
    tag: "Donación · Con DHILO MUN",
    summary:
      "Junto a DHILO MUN, Fundación Mejoremos Realidades llevó a cabo una jornada de donaciones en Casa Hogar y Estancia Sagrado Corazón de Jesús. Una acción concreta de solidaridad que refleja nuestro compromiso de transformar la realidad de quienes enfrentan situaciones de vulnerabilidad, más allá del diagnóstico.",
    photos: [
      "/alianzas/ninas1.jpg",
      "/alianzas/ninas2.jpg",
      "/alianzas/ninas3.jpg",
      "/alianzas/ninas4.jpg",
    ],
  },
];

// ============================================================
// ANIMACIONES
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

const VIEWPORT = {
  once: true,
  amount: 0.12,
};

// ============================================================
// COMPONENTES COMPARTIDOS
// ============================================================

function SectionLabel({ children, light = false }) {
  return (
    <p
      className="
        mb-3 text-[11px]
        font-bold uppercase
        tracking-[0.14em]
      "
      style={{
        color: light
          ? "rgba(255,255,255,0.7)"
          : C.brand,
      }}
    >
      {children}
    </p>
  );
}

// ============================================================
// LIGHTBOX
// ============================================================

function Lightbox({
  photos,
  startIndex,
  title,
  onClose,
}) {
  const reducedMotion = useReducedMotion();

  const [current, setCurrent] = useState(startIndex);

  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  const next = () => {
    setCurrent((index) => (index + 1) % photos.length);
  };

  const previous = () => {
    setCurrent(
      (index) =>
        (index - 1 + photos.length) % photos.length
    );
  };

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    const previousFocus =
      document.activeElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        setCurrent(
          (index) => (index + 1) % photos.length
        );
      }

      if (event.key === "ArrowLeft") {
        setCurrent(
          (index) =>
            (index - 1 + photos.length) % photos.length
        );
      }

      if (event.key === "Tab") {
        const focusable =
          dialogRef.current?.querySelectorAll(
            "button:not([disabled]), a[href]"
          );

        if (!focusable?.length) return;

        const first = focusable[0];
        const last =
          focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      previousFocus?.focus?.();
    };
  }, [photos.length, onClose]);

  return (
    <motion.div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-[#0A0E1E]/95
        p-3 sm:p-6
      "
      initial={
        reducedMotion
          ? false
          : { opacity: 0 }
      }
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.2,
      }}
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Galería de ${title}`}
        className="
          relative flex h-full w-full
          max-w-[1400px]
          flex-col
          items-center justify-center
        "
      >
        {/* Cerrar */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar galería"
          className="
            absolute right-0 top-0 z-20
            flex h-11 w-11
            items-center justify-center
            rounded-md
            bg-white/10 text-white
            transition-colors
            hover:bg-white/20
          "
        >
          <IconX size={21} stroke={1.8} />
        </button>

        {/* Imagen sin recortes */}
        <div
          className="
            flex min-h-0 w-full
            flex-1 items-center justify-center
            px-0 py-14
            sm:px-14
          "
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={photos[current]}
              src={photos[current]}
              alt={`${title}, fotografía ${current + 1} de ${photos.length}`}
              className="
                max-h-full max-w-full
                object-contain
              "
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0 }
              }
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.2,
              }}
            />
          </AnimatePresence>
        </div>

        {/* Navegación */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              aria-label="Fotografía anterior"
              className="
                absolute bottom-1 left-0
                flex h-11 w-11
                items-center justify-center
                rounded-md bg-white/10
                text-white
                transition-colors
                hover:bg-white/20
                sm:bottom-auto sm:top-1/2
                sm:-translate-y-1/2
              "
            >
              <IconArrowLeft
                size={20}
                stroke={1.8}
              />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Fotografía siguiente"
              className="
                absolute bottom-1 right-0
                flex h-11 w-11
                items-center justify-center
                rounded-md bg-white/10
                text-white
                transition-colors
                hover:bg-white/20
                sm:bottom-auto sm:top-1/2
                sm:-translate-y-1/2
              "
            >
              <IconArrowRight
                size={20}
                stroke={1.8}
              />
            </button>
          </>
        )}

        {/* Contador */}
        <div
          className="
            absolute bottom-3
            left-1/2 -translate-x-1/2
            text-[12px] font-semibold
            text-white/75
          "
          aria-live="polite"
        >
          {current + 1} / {photos.length}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// GALERÍA DE FOTOGRAFÍAS
// ============================================================

function PhotoGrid({
  photos,
  title,
  visibleCount = 6,
}) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const shown = expanded
    ? photos
    : photos.slice(0, visibleCount);

  const remaining =
    Math.max(photos.length - visibleCount, 0);

  return (
    <>
      <div
        className="
          grid grid-cols-2
          gap-3
          sm:grid-cols-3
          lg:gap-4
        "
      >
        {shown.map((src, index) => {
          const isMoreButton =
            !expanded &&
            remaining > 0 &&
            index === shown.length - 1;

          return (
            <button
              key={src}
              type="button"
              onClick={() => {
                if (isMoreButton) {
                  setExpanded(true);
                } else {
                  setLightbox(index);
                }
              }}
              aria-label={
                isMoreButton
                  ? `Ver ${remaining} fotografías más de ${title}`
                  : `Abrir fotografía ${index + 1} de ${title}`
              }
              className="
                group relative
                flex aspect-[4/3]
                items-center justify-center
                overflow-hidden
                rounded-md
                bg-[#F0F0F0]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-3
              "
              style={{
                outlineColor: C.brand,
              }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="
                  h-full w-full
                  object-contain
                  transition-transform
                  duration-700
                  group-hover:scale-[1.025]
                "
              />

              {isMoreButton && (
                <div
                  className="
                    absolute inset-0
                    flex flex-col
                    items-center justify-center
                    bg-[#0A0E1E]/80
                    text-white
                  "
                >
                  <span
                    className="
                      text-[30px]
                      font-extrabold
                      leading-none
                    "
                  >
                    +{remaining}
                  </span>

                  <span
                    className="
                      mt-2 text-[11px]
                      font-bold uppercase
                      tracking-[0.12em]
                    "
                  >
                    Ver más
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {expanded && remaining > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="
            mt-5 border-b pb-1
            text-[12px]
            font-semibold
          "
          style={{
            color: C.brand,
            borderColor: C.brand,
          }}
        >
          Ver menos
        </button>
      )}

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            key={title}
            photos={photos}
            title={title}
            startIndex={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================
// HERO
// ============================================================

function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="alliances-hero-title"
      className="
        relative flex
        min-h-[600px]
        items-end
        overflow-hidden
        sm:min-h-[650px]
        lg:min-h-[720px]
      "
      style={{ backgroundColor: C.text }}
    >
      {/* Fotografía principal */}
      <motion.img
        src="/alianzas/pas1.jpg"
        alt="Actividades de colaboración de Fundación Mejoremos Realidades"
        className="
          absolute inset-0
          h-full w-full
          object-cover object-center
        "
        initial={
          reducedMotion
            ? false
            : { scale: 1.035 }
        }
        animate={{ scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 1.5,
          ease: EASE,
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,30,0.25) 0%, rgba(10,14,30,0.5) 45%, rgba(10,14,30,0.92) 100%)",
        }}
      />

      {/* Contenido */}
      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-[1360px]
          px-5 pb-14 pt-32
          sm:px-8 sm:pb-16
          lg:px-12 lg:pb-20
          xl:px-16
          2xl:px-20
        "
      >
        <motion.div
          variants={
            reducedMotion ? undefined : stagger
          }
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          className="max-w-[850px]"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel light>
              Red de colaboración
            </SectionLabel>
          </motion.div>

          <motion.h1
            id="alliances-hero-title"
            variants={fadeUp}
            className="
              mb-5
              text-[clamp(3rem,7vw,6.5rem)]
              font-extrabold
              leading-[1.03]
              tracking-[-0.055em]
              text-white
            "
          >
            Nuestras{" "}
            <span className="text-[#F08B9A]">
              alianzas.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="
              max-w-[630px]
              text-[15px]
              leading-[1.85]
              text-white/85
              sm:text-[17px]
            "
          >
            Creemos que solos llegamos lejos,
            pero juntos llegamos más lejos.
            Por eso construimos alianzas con
            organizaciones, instituciones y
            colectivos que comparten nuestra
            visión de un México más solidario
            y justo.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// BLOQUE INDIVIDUAL DE ALIANZA
// ============================================================

function AlianzaBlock({ alianza, index }) {
  const reducedMotion = useReducedMotion();

  const isEven = index % 2 === 0;

  return (
    <section
      id={alianza.id}
      aria-labelledby={`${alianza.id}-title`}
      className="
        scroll-mt-24
        border-b
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{
        backgroundColor:
          isEven ? C.bg : C.surface,
        borderColor: C.border,
      }}
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Información de la alianza */}
        <motion.div
          variants={
            reducedMotion ? undefined : stagger
          }
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT}
          className="
            mb-9 grid
            grid-cols-1
            items-end
            gap-7
            md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]
            md:gap-12
          "
        >
          {/* Logo y nombre */}
          <motion.div variants={fadeUp}>
            <div
              className="
                mb-5 flex
                h-[76px] w-[180px]
                items-center justify-start
              "
            >
              <img
                src={alianza.logo}
                alt={`Logotipo de ${alianza.name}`}
                loading="lazy"
                className="
                  max-h-full max-w-full
                  object-contain
                "
              />
            </div>

            <SectionLabel>
              {alianza.tag}
            </SectionLabel>

            <h2
              id={`${alianza.id}-title`}
              className="
                max-w-[600px]
                text-[clamp(2rem,3.6vw,3.2rem)]
                font-extrabold
                leading-[1.12]
                tracking-[-0.045em]
              "
              style={{ color: C.text }}
            >
              {alianza.name}
            </h2>
          </motion.div>

          {/* Descripción y enlace */}
          <motion.div variants={fadeUp}>
            <p
              className="
                mb-5 text-[14px]
                leading-[1.85]
                sm:text-[15px]
              "
              style={{ color: C.textMid }}
            >
              {alianza.summary}
            </p>

            <a
              href={alianza.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center
                gap-2 border-b pb-1
                text-[13px]
                font-bold
                transition-colors
                hover:text-[#A92D42]
              "
              style={{
                color: C.brand,
                borderColor: C.brand,
              }}
            >
              Visitar sitio oficial
              <IconExternalLink
                size={15}
                stroke={1.8}
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Galería */}
        <motion.div
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{
            duration: reducedMotion ? 0 : 0.65,
            ease: EASE,
          }}
        >
          <div
            className="
              mb-5 flex
              items-center justify-between
              border-t pt-4
            "
            style={{ borderColor: C.border }}
          >
            <p
              className="
                text-[11px]
                font-bold uppercase
                tracking-[0.12em]
              "
              style={{ color: C.textMid }}
            >
              Galería de colaboración
            </p>

            <span
              className="
                text-[12px]
                font-medium
              "
              style={{ color: C.textMid }}
            >
              {alianza.photos.length}{" "}
              {alianza.photos.length === 1
                ? "fotografía"
                : "fotografías"}
            </span>
          </div>

          <PhotoGrid
            photos={alianza.photos}
            title={alianza.name}
            visibleCount={
              alianza.photos.length <= 4
                ? alianza.photos.length
                : 6
            }
          />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// VALORES DE COLABORACIÓN
// ============================================================

const VALUES = [
  {
    number: "01",
    title: "Colaboración real",
    body:
      "No solo firma de convenios. Buscamos alianzas con impacto tangible en la vida de los pacientes.",
  },
  {
    number: "02",
    title: "Visibilidad compartida",
    body:
      "Amplificamos mutuamente nuestra presencia institucional ante medios, gobierno y sociedad civil.",
  },
  {
    number: "03",
    title: "Acción concreta",
    body:
      "Donaciones, jornadas, eventos y programas conjuntos que llegan directamente a quienes los necesitan.",
  },
];

// ============================================================
// CONVIÉRTETE EN ALIADO
// ============================================================

function BecomeAlly() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="become-ally-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.text }}
    >
      <motion.div
        variants={
          reducedMotion ? undefined : stagger
        }
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={VIEWPORT}
        className="mx-auto max-w-[1360px]"
      >
        <motion.div
          variants={fadeUp}
          className="
            mb-9 grid
            grid-cols-1
            gap-5
            md:grid-cols-[1.1fr_0.9fr]
            md:items-end
            md:gap-12
          "
        >
          <div>
            <SectionLabel light>
              Súmate
            </SectionLabel>

            <h2
              id="become-ally-title"
              className="
                text-[clamp(2rem,3.6vw,3.25rem)]
                font-extrabold
                leading-[1.12]
                tracking-[-0.045em]
                text-white
              "
            >
              ¿Tu organización quiere{" "}
              <span className="text-[#F08B9A]">
                ser aliada?
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[480px]
              text-[14px]
              leading-[1.85]
              text-white/75
              sm:text-[15px]
            "
          >
            Buscamos construir puentes con
            instituciones, empresas, colectivos
            y organizaciones de la sociedad civil
            que compartan nuestra visión:
            garantizar que cada paciente con
            leucemia tenga acceso al apoyo
            que merece.
          </p>
        </motion.div>

        {/* Valores */}
        <motion.div
          variants={stagger}
          className="
            grid grid-cols-1
            gap-x-9 gap-y-8
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-12
          "
        >
          {VALUES.map(({ number, title, body }) => (
            <motion.article
              key={number}
              variants={fadeUp}
              className="
                border-t-2 pt-5
              "
              style={{
                borderColor: "#F08B9A",
              }}
            >
              <span
                className="
                  mb-5 block
                  text-[12px]
                  font-bold
                  tracking-[0.1em]
                  text-[#F08B9A]
                "
              >
                {number}
              </span>

              <h3
                className="
                  mb-3 text-[20px]
                  font-bold
                  leading-[1.3]
                  tracking-[-0.025em]
                  text-white
                "
              >
                {title}
              </h3>

              <p
                className="
                  text-[14px]
                  leading-[1.8]
                  text-white/70
                  sm:text-[15px]
                "
              >
                {body}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Invitación */}
        <motion.div
          variants={fadeUp}
          className="
            mt-9 flex
            flex-col
            items-start
            gap-5
            border-t border-white/20
            pt-7
            md:flex-row
            md:items-center
            md:justify-between
            md:gap-10
          "
        >
          <p
            className="
              max-w-[760px]
              text-[14px]
              leading-[1.85]
              text-white/75
              sm:text-[15px]
            "
          >
            Las alianzas que construimos son
            de colaboración real: eventos
            conjuntos, donaciones, presencia
            institucional y redes de apoyo,
            siempre con el paciente al centro.
          </p>

          <a
            href="https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex min-h-12
              shrink-0
              items-center justify-center
              rounded-md bg-white
              px-7
              text-[14px]
              font-bold
              transition-colors
              hover:bg-[#F5F5F5]
            "
            style={{ color: C.text }}
          >
            Escríbenos
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================
// CTA FINAL
// ============================================================

function CtaBanner() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="alliances-cta-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.brand }}
    >
      <motion.div
        variants={
          reducedMotion ? undefined : stagger
        }
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={VIEWPORT}
        className="
          mx-auto grid
          max-w-[1360px]
          grid-cols-1
          items-center
          gap-7
          md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]
          md:gap-10
        "
      >
        <div>
          <motion.div variants={fadeUp}>
            <SectionLabel light>
              Actúa hoy
            </SectionLabel>
          </motion.div>

          <motion.h2
            id="alliances-cta-title"
            variants={fadeUp}
            className="
              text-[clamp(2rem,4vw,3.5rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.045em]
              text-white
            "
          >
            Juntos llegamos{" "}
            <span className="text-white/75">
              más lejos.
            </span>
          </motion.h2>
        </div>

        <div className="md:justify-self-end">
          <motion.p
            variants={fadeUp}
            className="
              mb-5 max-w-[410px]
              text-[14px]
              leading-[1.8]
              text-white/85
              sm:text-[15px]
              md:text-right
            "
          >
            Tu apoyo o el de tu organización
            nos permite seguir construyendo
            redes que transforman la realidad
            de los pacientes.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="
              flex flex-wrap gap-3
              md:justify-end
            "
          >
            <Link
              to="/donar"
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md bg-white
                px-7 text-[14px]
                font-bold
                transition-colors
                hover:bg-[#F5F5F5]
              "
              style={{ color: C.brand }}
            >
              Donar ahora
            </Link>

            <Link
              to="/servicios"
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md
                border border-white/60
                px-7 text-[14px]
                font-semibold
                text-white
                transition-colors
                hover:bg-white/10
              "
            >
              Nuestros servicios
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================
// PÁGINA PRINCIPAL
// ============================================================

export default function Alianzas() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: C.bg }}
    >
      <Navbar />

      <main>
        <Hero />

        {ALIANZAS.map((alianza, index) => (
          <AlianzaBlock
            key={alianza.id}
            alianza={alianza}
            index={index}
          />
        ))}

        <BecomeAlly />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
  