
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

// ============================================================
// PALETA
// ============================================================

const C = {
  brand: "#C8384F",
  brandSoft: "#FAE8EB",
  bg: "#F7F8FA",
  surface: "#FFFFFF",
  text: "#1A2235",
  textMid: "#4B5563",
  border: "#E5E7EB",
};

// ============================================================
// ANIMACIONES
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const VIEWPORT = {
  once: true,
  amount: 0.12,
};

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
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

function reveal(reducedMotion, delay = 0) {
  if (reducedMotion) {
    return { initial: false };
  }

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: VIEWPORT,
    transition: {
      duration: 0.7,
      delay,
      ease: EASE,
    },
  };
}

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

function SectionHeading({
  children,
  light = false,
  id,
}) {
  return (
    <h2
      id={id}
      className="
        text-[clamp(2rem,3.6vw,3.25rem)]
        font-extrabold
        leading-[1.12]
        tracking-[-0.045em]
      "
      style={{
        color: light ? "#FFFFFF" : C.text,
      }}
    >
      {children}
    </h2>
  );
}

// ============================================================
// HERO
// ============================================================

function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-hero-title"
      className="
        relative flex
        min-h-[640px]
        items-end
        overflow-hidden
        sm:min-h-[680px]
        lg:min-h-[740px]
      "
      style={{ backgroundColor: C.text }}
    >
      {/* Fotografía */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : { scale: 1.035 }
        }
        animate={{ scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 1.6,
          ease: EASE,
        }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('/acerca/esperanza1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />

      {/* Oscurecimiento para legibilidad */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,30,0.28) 0%, rgba(10,14,30,0.48) 45%, rgba(10,14,30,0.9) 100%)",
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
              Nuestra historia
            </SectionLabel>
          </motion.div>

          <motion.h1
            id="about-hero-title"
            variants={fadeUp}
            className="
              mb-5
              text-[clamp(2.7rem,6.4vw,5.8rem)]
              font-extrabold
              leading-[1.03]
              tracking-[-0.055em]
              text-white
            "
          >
            Una historia de dolor
            que se convirtió en{" "}
            <span className="text-[#F08B9A]">
              propósito.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="
              mb-6 max-w-[590px]
              text-[15px]
              leading-[1.8]
              text-white/80
              sm:text-[17px]
            "
          >
            Nació de una experiencia personal,
            de un sueño y de una necesidad.
            Hoy somos el espacio de apoyo,
            esperanza y acompañamiento
            que alguna vez faltó.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="
              mb-7 max-w-[580px]
              border-l-2
              pl-5
            "
            style={{ borderColor: C.brand }}
          >
            <blockquote
              className="
                text-[15px]
                font-medium italic
                leading-[1.7]
                text-white/90
                sm:text-[17px]
              "
            >
              “Nadie debería enfrentar un diagnóstico
              de leucemia solo. Nosotros existimos
              para que eso no ocurra.”
            </blockquote>

            <p
              className="
                mt-3 text-[12px]
                font-semibold
                text-white/65
              "
            >
              Marco Sanchez · Presidente
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link
              to="/donar"
              className="
                inline-flex min-h-12
                items-center justify-center
                rounded-md px-7
                text-[14px] font-bold
                text-white
                transition-colors
                hover:bg-[#A92D42]
              "
              style={{
                backgroundColor: C.brand,
              }}
            >
              Apoya la causa
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// MISIÓN
// ============================================================

const PILLARS = [
  {
    number: "01",
    title: "Gestión Médica",
    body:
      "Orientación especializada y acceso a medicamentos para que cada paciente reciba el tratamiento que merece.",
  },
  {
    number: "02",
    title: "Atención Psicológica",
    body:
      "Apoyo individual y grupal, con costos accesibles e incluso gratuito, para el paciente y su familia.",
  },
  {
    number: "03",
    title: "Asesoría Jurídica",
    body:
      "Orientación práctica para proteger los derechos de salud de cada paciente ante cualquier institución.",
  },
];

function Mission() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="mission-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.surface }}
    >
      <div className="mx-auto max-w-[1360px]">
        <motion.div
          variants={fadeUp}
          {...reveal(reducedMotion)}
          className="mb-8 max-w-[850px]"
        >
          <SectionLabel>
            Nuestros comienzos
          </SectionLabel>

          <SectionHeading id="mission-title">
            Desde el inicio, nuestro objetivo fue{" "}
            <span style={{ color: C.brand }}>
              claro.
            </span>
          </SectionHeading>

          <p
            className="
              mt-4 max-w-[750px]
              text-[15px]
              leading-[1.8]
            "
            style={{ color: C.textMid }}
          >
            Ayudar a los pacientes a vivir de la
            mejor manera posible durante y después
            del cáncer. Por eso construimos una
            fundación sobre tres pilares fundamentales,
            y también nos propusimos ser pioneros
            en la promoción de avances, la detección
            temprana y el tratamiento de la leucemia
            en México.
          </p>
        </motion.div>

        <motion.div
          variants={
            reducedMotion ? undefined : stagger
          }
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT}
          className="
            grid grid-cols-1
            gap-7
            md:grid-cols-3
            lg:gap-10
          "
        >
          {PILLARS.map((pillar) => (
            <motion.article
              key={pillar.number}
              variants={fadeUp}
              className="
                border-t-2 pt-5
              "
              style={{ borderColor: C.brand }}
            >
              <span
                className="
                  mb-5 block
                  text-[12px]
                  font-bold
                  tracking-[0.1em]
                "
                style={{ color: C.brand }}
              >
                {pillar.number}
              </span>

              <h3
                className="
                  mb-3 text-[21px]
                  font-bold
                  tracking-[-0.025em]
                "
                style={{ color: C.text }}
              >
                {pillar.title}
              </h3>

              <p
                className="
                  max-w-[390px]
                  text-[14px]
                  leading-[1.8]
                  sm:text-[15px]
                "
                style={{ color: C.textMid }}
              >
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// CRONOLOGÍA
// ============================================================

const TIMELINE = [
  {
    date: "Origen",
    title: "Una historia personal",
    body:
      "A los 15 años, nuestro Presidente fue diagnosticado con leucemia mieloide crónica. En medio de ese proceso, enfrentando miedos, tratamientos y la incertidumbre de cada día, se dio cuenta de algo que le dolió profundamente: en México no existían instituciones dedicadas a acompañar de manera integral a los pacientes con leucemia y otros tipos de cáncer. Así, de su propia vivencia y del deseo de hacer que otros no enfrentaran este camino solos, surgió la idea de crear un espacio de apoyo, esperanza y acompañamiento.",
    images: [],
  },
  {
    date: "Esperanza Fest",
    title: "Nuestro primer gran paso",
    body:
      "Nuestro primer gran paso como fundación se dio en el Esperanza Fest, un evento que marcaría un antes y un después en nuestra misión. Fue la primera vez que logramos reunir en un mismo espacio a autoridades gubernamentales, representantes de la sociedad civil, actores del sector privado y, lo más importante, a nuestros primeros embajadores: personas comprometidas con la causa de los pacientes con leucemia. Aquella jornada no solo sirvió para dar a conocer nuestra existencia, sino también para construir los primeros puentes de colaboración que hoy siguen sosteniendo nuestra labor. Entre charlas, testimonios y actividades de concientización, sentimos que nuestro sueño comenzaba a tomar forma: una red de apoyo sólida, cercana y humana que pudiera acompañar a quienes enfrentan un diagnóstico que cambia la vida, recordándoles que no están solos.",
    images: [
      "/acerca/esperanza1.jpg",
      "/acerca/esperanza2.jpg",
      "/acerca/esperanza3.jpg",
    ],
  },
  {
    // Confirmar el año con el acta constitutiva.
    date: "15 · Nov · 2025",
    title: "Asociación Civil",
    body:
      "Nos constituimos formalmente como A.C., consolidando nuestra estructura legal. Esto nos permitió extender nuestra ayuda a pacientes de distintas regiones de México y de otros países de Latinoamérica, como Perú y Colombia.",
    images: [
      "/acerca/constitucion1.jpg",
      "/acerca/constitucion2.jpg",
    ],
  },
  {
    date: "Hoy",
    title: "Trabajando día a día",
    body:
      "Cada historia de un paciente que logra continuar su tratamiento, cada sonrisa tras una sesión de apoyo psicológico, y cada familia que siente alivio al encontrar un espacio seguro nos recuerda por qué existimos.",
    images: [],
  },
];

// ============================================================
// GALERÍA DE CADA MOMENTO
// ============================================================

function TimelineGallery({ images, title, reducedMotion }) {
  if (!images.length) return null;

  return (
    <div
      className={`
        grid gap-2.5
        ${images.length === 3
          ? "grid-cols-2"
          : "grid-cols-2"}
      `}
    >
      {images.map((src, index) => (
        <div
          key={src}
          className={`
            group relative
            overflow-hidden
            rounded-lg
            ${
              images.length === 3 && index === 0
                ? "col-span-2 aspect-[16/8]"
                : "aspect-[4/3]"
            }
          `}
          style={{ backgroundColor: C.border }}
        >
          <motion.img
            src={src}
            alt={`${title}, fotografía ${index + 1}`}
            loading="lazy"
            decoding="async"
            className="
              absolute inset-0
              h-full w-full
              object-cover
            "
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.035,
                    transition: {
                      duration: 0.7,
                      ease: EASE,
                    },
                  }
            }
          />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// MOMENTO DE LA CRONOLOGÍA
// ============================================================

function TimelineItem({
  item,
  index,
  reducedMotion,
}) {
  const hasImages = item.images.length > 0;

  return (
    <motion.article
      variants={fadeUp}
      {...reveal(reducedMotion)}
      className="
        grid grid-cols-1
        gap-5
        border-t pt-6
        md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)]
        md:gap-10
        lg:gap-14
      "
      style={{ borderColor: C.border }}
    >
      {/* Fecha y título */}
      <div>
        <p
          className="
            mb-2 text-[12px]
            font-bold uppercase
            tracking-[0.1em]
          "
          style={{ color: C.brand }}
        >
          {item.date}
        </p>

        <h3
          className="
            max-w-[320px]
            text-[clamp(1.35rem,2vw,1.8rem)]
            font-bold
            leading-[1.25]
            tracking-[-0.035em]
          "
          style={{ color: C.text }}
        >
          {item.title}
        </h3>
      </div>

      {/* Historia e imágenes */}
      <div className="min-w-0">
        <p
          className="
            max-w-[780px]
            text-[14px]
            leading-[1.85]
            sm:text-[15px]
          "
          style={{ color: C.textMid }}
        >
          {item.body}
        </p>

        {hasImages && (
          <div className="mt-5">
            <TimelineGallery
              images={item.images}
              title={item.title}
              reducedMotion={reducedMotion}
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ============================================================
// SECCIÓN CRONOLOGÍA
// ============================================================

function Timeline() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="timeline-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.bg }}
    >
      <div className="mx-auto max-w-[1360px]">
        <motion.div
          variants={fadeUp}
          {...reveal(reducedMotion)}
          className="mb-8 max-w-[780px]"
        >
          <SectionLabel>
            El camino recorrido
          </SectionLabel>

          <SectionHeading id="timeline-title">
            De una experiencia personal{" "}
            <span style={{ color: C.brand }}>
              a una fundación.
            </span>
          </SectionHeading>
        </motion.div>

        <div className="flex flex-col gap-9 lg:gap-11">
          {TIMELINE.map((item, index) => (
            <TimelineItem
              key={item.title}
              item={item}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ESTATUS JURÍDICO
// ============================================================

const LEGAL_ITEMS = [
  {
    title: "Asociación Civil constituida",
    detail:
      "Registro formal ante notaría pública.",
    status: "Constituida",
  },
  {
    title: "Alta ante el SAT",
    detail:
      "Cumplimiento de requisitos legales vigentes.",
    status: "Registrada",
  },
  {
    title: "Donataria Autorizada",
    detail:
      "En proceso de obtención de la autorización.",
    status: "En proceso",
  },
];

function LegalStatus() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="legal-title"
      className="
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.text }}
    >
      <div
        className="
          mx-auto grid
          max-w-[1360px]
          grid-cols-1
          gap-9
          md:grid-cols-2
          lg:gap-14
        "
      >
        {/* Información */}
        <motion.div
          variants={fadeUp}
          {...reveal(reducedMotion)}
          className="min-w-0"
        >
          <SectionLabel light>
            Estatus jurídico
          </SectionLabel>

          <SectionHeading id="legal-title" light>
            Transparencia y{" "}
            <span className="text-[#F08B9A]">
              compromiso legal.
            </span>
          </SectionHeading>

          <p
            className="
              mt-5 max-w-[570px]
              text-[14px]
              leading-[1.85]
              text-white/75
              sm:text-[15px]
            "
          >
            En Mejoremos Realidades A.C.
            creemos que la confianza se construye
            con transparencia. Nos constituimos
            formalmente como Asociación Civil para
            brindar certeza jurídica y seguridad
            a nuestros pacientes, donadores,
            aliados y embajadores.
          </p>

          <p
            className="
              mt-4 max-w-[570px]
              text-[14px]
              leading-[1.85]
              text-white/75
              sm:text-[15px]
            "
          >
            Actualmente estamos dados de alta
            ante el SAT y trabajamos activamente
            para obtener la autorización como{" "}
            <strong className="text-white">
              Donataria Autorizada
            </strong>
            , lo que permitirá ofrecer mayores
            beneficios fiscales a quienes confían
            en nuestra labor.
          </p>

          <Link
            to="/aviso-de-privacidad"
            className="
              mt-6 inline-flex
              border-b border-white/60
              pb-1
              text-[13px]
              font-semibold
              text-white
              transition-colors
              hover:border-white
            "
          >
            Consultar Aviso de Privacidad
          </Link>
        </motion.div>

        {/* Estado institucional */}
        <motion.div
          variants={
            reducedMotion ? undefined : stagger
          }
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT}
          className="border-t border-white/20"
        >
          {LEGAL_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="
                grid grid-cols-1
                gap-2
                border-b border-white/20
                py-5
                sm:grid-cols-[1fr_auto]
                sm:items-start
                sm:gap-5
              "
            >
              <div>
                <h3
                  className="
                    mb-1 text-[15px]
                    font-semibold
                    text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-[13px]
                    leading-[1.7]
                    text-white/60
                  "
                >
                  {item.detail}
                </p>
              </div>

              <span
                className="
                  text-[12px]
                  font-semibold
                "
                style={{
                  color:
                    item.status === "En proceso"
                      ? "#F0C9CF"
                      : "#FFFFFF",
                }}
              >
                {item.status}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
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
      aria-labelledby="about-cta-title"
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
              Sé parte del cambio
            </SectionLabel>
          </motion.div>

          <motion.h2
            id="about-cta-title"
            variants={fadeUp}
            className="
              max-w-[700px]
              text-[clamp(2rem,4vw,3.5rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.045em]
              text-white
            "
          >
            Nadie debe enfrentar{" "}
            <span className="text-white/75">
              este camino solo.
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
            Tu apoyo nos permite acompañar
            a más pacientes y sus familias
            en cada etapa del camino.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="
              flex flex-wrap
              gap-3
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
              Ver servicios
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

export default function AcercaDe() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: C.bg }}
    >
      <Navbar />

      <main>
        <Hero />
        <Mission />
        <Timeline />
        <LegalStatus />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
