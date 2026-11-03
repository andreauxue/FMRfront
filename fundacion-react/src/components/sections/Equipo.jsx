
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { IconX } from "@tabler/icons-react";

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
// EQUIPO
// ============================================================

const TEAM = [
  {
    name: "Marco Sánchez",
    role: "Presidente",
    img: "/personas/marco.jpeg",
    short:
      "Fundador. Diagnosticado con leucemia mieloide crónica a los 15 años, creó Mejoremos Realidades para que nadie enfrente este camino solo.",
    bio: [
      "Un joven diagnosticado con leucemia mieloide crónica a los 15 años, preocupado por los pacientes con leucemia y sus familias, decidió emprender Fundación Mejoremos Realidades como un lugar en el que las personas se sintieran seguras, fueran orientadas y contaran con una red de apoyo que hiciera del diagnóstico algo más llevadero.",
      "Egresado de la licenciatura en Derecho, cree fervientemente que hay una vida vivible durante y después del diagnóstico, y confía en que sumando esfuerzos se puede hacer mucho por los pacientes.",
      "Mejoremos Realidades, tal como lo comenta, es de y para todos y todas; nació de una necesidad, pero se convirtió en un sueño que transforma vidas.",
    ],
  },
  {
    name: "Danna Martínez",
    role: "Vicepresidenta Ejecutiva",
    img: "/personas/danna.jpg",
    short:
      "Médica egresada con experiencia en atención primaria y proyectos de impacto social. Interesada en fortalecer la educación médica para pacientes y comunidades.",
    bio: [
      "Egresada de la licenciatura en medicina, ha dedicado parte de su proceso de investigación médica a lo relacionado con la leucemia, sus derivados y el cáncer en general.",
      "Es una persona preocupada y ocupada por los demás, empática y solidaria. Considera que los médicos que son el primer contacto con el paciente deben desarrollar su sentido humano para entender que se está tratando con personas y causas que les aquejan en lo que más les importa.",
      "Considera que el diagnóstico es el paso más difícil del proceso, pero Mejoremos Realidades lo hace de tu mano.",
    ],
  },
  {
    name: "María José Martínez",
    role: "Directora Jurídica y de Cumplimiento Normativo",
    img: "/personas/majo.jpg",
    short:
      "Abogada enfocada en Derechos Humanos y el acceso garantizado a la salud para todas las personas.",
    bio: [
      "Licenciada en derecho, sus principales líneas de acción han sido el respeto a los Derechos Humanos y la obligación del Estado Mexicano de garantizar el acceso a ellos para todas y todos.",
      "En Mejoremos Realidades tiene como máximas la transparencia, la rendición de cuentas y el uso adecuado de los recursos en pro de las causas que aquí se siguen.",
      "El Derecho Humano de acceso a los servicios de salud es fundamental para tener una calidad de vida digna y en favor de los menos favorecidos.",
    ],
  },
  {
    name: "Diego Castilla",
    role: "Director Médico y de Programas Institucionales",
    img: "/personas/diego.jpg",
    short:
      "Estudiante de medicina con vocación para generar alianzas que garanticen el bienestar integral de los pacientes.",
    bio: [
      "Estudiante de medicina, con particular interés en generar alianzas que garanticen el bienestar de los pacientes con cáncer y calidad de vida para ellos y sus familias.",
      "Ha dedicado parte de su labor en la medicina a generar contacto de primera mano con los pacientes a fin de canalizarlos a donde su diagnóstico sea tratado integralmente.",
      "Es un hombre con gran sentido de pertenencia a Mejoremos Realidades, pues cree en esta Fundación como un medio para hacer del diagnóstico algo más llevadero. Su sentido de responsabilidad, respeto, compromiso y empatía es claro.",
    ],
  },
  {
    name: "Andrea Amaya",
    role: "Directora de Planeación Técnica y Análisis Estratégico",
    img: "/personas/andrea.jpeg",
    short:
      "Matemática aplicada que impulsa la innovación tecnológica al servicio de la equidad y la salud.",
    bio: [
      "Licenciada en matemáticas aplicadas con un profundo interés en ayudar a las personas a través de la tecnología. Cree firmemente que la innovación solo tiene sentido cuando mejora la vida de los demás y promueve la equidad.",
      "En Mejoremos Realidades impulsa una forma más humana de entender la innovación como Directora de Planeación Técnica y Análisis Estratégico.",
    ],
  },
  {
    name: "Jovita Rodríguez González",
    role: "Directora de Atención Integral y Acompañamiento",
    img: "/personas/jovita.jpeg",
    short:
      "Madre de un paciente con leucemia, lleva la experiencia vivida al corazón del acompañamiento integral.",
    bio: [
      "Como madre de un paciente con leucemia, ha experimentado de primera mano los retos, las incertidumbres y las necesidades que enfrentan las personas diagnosticadas y sus familias. Esta vivencia le ha permitido desarrollar una profunda sensibilidad y un firme compromiso con el acompañamiento integral.",
      "En Fundación Mejoremos Realidades A.C. dirige el área de Atención Integral y Acompañamiento, coordinando acciones orientadas a brindar orientación, apoyo y seguimiento a pacientes y cuidadores.",
      "Su labor refleja el compromiso de la Fundación con un acompañamiento basado en la empatía y la convicción de que ningún paciente ni su familia deben enfrentar la leucemia en soledad.",
    ],
  },
  {
    name: "Gabriela Gómez Cruz",
    role: "Directora de Relaciones Estratégicas y Proyección Institucional",
    img: "/personas/gaby.jpg",
    short:
      "Arquitecta e ingeniera con visión estratégica para posicionar la Fundación y construir alianzas de impacto.",
    bio: [
      "Arquitecta e ingeniera con amplia experiencia en el desarrollo, coordinación y gestión de proyectos, así como en el fortalecimiento de relaciones institucionales.",
      "Al frente de la Dirección de Relaciones Estratégicas y Proyección Institucional, impulsa la imagen institucional de la Fundación, fortalece su presencia ante diversos sectores y consolida alianzas clave.",
      "Su liderazgo amplía el alcance de los programas y fortalece el impacto social, promoviendo iniciativas que beneficien a las personas que viven con leucemia y a sus familias.",
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
    y: 20,
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

// ============================================================
// HERO
// ============================================================

function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="team-hero-title"
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
      {/* Fotografía grupal */}
      <motion.img
        src="/personas/equipo.jpeg"
        alt="Equipo de Fundación Mejoremos Realidades"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-center
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
            "linear-gradient(to bottom, rgba(10,14,30,0.2) 0%, rgba(10,14,30,0.45) 45%, rgba(10,14,30,0.9) 100%)",
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
          <motion.p
            variants={fadeUp}
            className="
              mb-3 text-[11px]
              font-bold uppercase
              tracking-[0.14em]
              text-white/75
            "
          >
            Las personas detrás de la causa
          </motion.p>

          <motion.h1
            id="team-hero-title"
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
            Nuestro{" "}
            <span className="text-[#F08B9A]">
              equipo.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="
              max-w-[610px]
              text-[15px]
              leading-[1.8]
              text-white/85
              sm:text-[17px]
            "
          >
            Médicos, abogados, especialistas y
            personas con experiencia propia, unidos
            por un mismo propósito: que ningún
            paciente con leucemia enfrente solo
            su diagnóstico.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// MODAL DE PERFIL COMPLETO
// ============================================================

function ProfileModal({ member, onClose }) {
  const reducedMotion = useReducedMotion();
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="
        fixed inset-0 z-[100]
        flex items-center
        justify-center
        p-4 sm:p-6
      "
      style={{
        backgroundColor: "rgba(10,14,30,0.78)",
      }}
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
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-role"
        className="
          relative flex
          max-h-[90dvh]
          w-full max-w-[780px]
          flex-col
          overflow-hidden
          rounded-lg
          bg-white
        "
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 16 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 10,
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.3,
          ease: EASE,
        }}
      >
        {/* Botón de cierre */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar perfil"
          className="
            absolute right-4 top-4
            z-10 flex h-10 w-10
            items-center justify-center
            rounded-md bg-white
            text-[#1A2235]
            transition-colors
            hover:bg-[#F3F4F6]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
          "
          style={{ outlineColor: C.brand }}
        >
          <IconX
            size={20}
            stroke={1.8}
            aria-hidden="true"
          />
        </button>

        <div className="overflow-y-auto">
          {/* Fotografía completa */}
          <div
            className="
              flex h-[260px]
              items-center justify-center
              overflow-hidden
              bg-[#F0F0F0]
              sm:h-[360px]
            "
          >
            <img
              src={member.img}
              alt={member.name}
              className="
                h-full w-full
                object-contain
              "
            />
          </div>

          {/* Biografía */}
          <div
            className="
              px-6 py-7
              sm:px-9 sm:py-9
            "
          >
            <p
              id="profile-modal-role"
              className="
                mb-2 text-[12px]
                font-semibold
              "
              style={{ color: C.brand }}
            >
              {member.role}
            </p>

            <h2
              id="profile-modal-title"
              className="
                mb-6
                text-[clamp(1.7rem,3vw,2.5rem)]
                font-extrabold
                leading-[1.15]
                tracking-[-0.04em]
              "
              style={{ color: C.text }}
            >
              {member.name}
            </h2>

            <div className="space-y-4">
              {member.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="
                    text-[14px]
                    leading-[1.85]
                    sm:text-[15px]
                  "
                  style={{ color: C.textMid }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// TARJETA DE INTEGRANTE
// ============================================================

function MemberCard({ member, onSelect }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 20 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        ease: EASE,
      }}
      className="group flex min-w-0 flex-col"
    >
      {/* Fotografía sin recortar */}
      <div
        className="
          flex aspect-[3/4]
          items-center justify-center
          overflow-hidden
          bg-[#F0F0F0]
        "
      >
        <img
          src={member.img}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="
            block h-full w-full
            object-contain
            transition-transform
            duration-700
            group-hover:scale-[1.025]
          "
        />
      </div>

      {/* Información */}
      <div className="flex flex-1 flex-col pt-5">
        <p
          className="
            mb-2 text-[12px]
            font-semibold
            leading-[1.5]
          "
          style={{ color: C.brand }}
        >
          {member.role}
        </p>

        <h3
          className="
            text-[clamp(1.3rem,2vw,1.8rem)]
            font-bold
            leading-[1.2]
            tracking-[-0.035em]
          "
          style={{ color: C.text }}
        >
          {member.name}
        </h3>

        <p
          className="
            mt-3 text-[14px]
            leading-[1.75]
          "
          style={{ color: C.textMid }}
        >
          {member.short}
        </p>

        <button
          type="button"
          onClick={() => onSelect(member)}
          className="
            mt-5 w-fit
            border-b pb-1
            text-[13px]
            font-bold
            transition-colors
            hover:text-[#A92D42]
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
          Conocer su historia
          <span className="sr-only">
            {" "}de {member.name}
          </span>
        </button>
      </div>
    </motion.article>
  );
}

// ============================================================
// LISTADO DEL EQUIPO
// ============================================================

function TeamList({ onSelect }) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="team-list-title"
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
        {/* Encabezado */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease: EASE,
          }}
          className="mb-10 max-w-[750px]"
        >
          <p
            className="
              mb-3 text-[11px]
              font-bold uppercase
              tracking-[0.14em]
            "
            style={{ color: C.brand }}
          >
            Nuestro equipo
          </p>

          <h2
            id="team-list-title"
            className="
              text-[clamp(2rem,3.6vw,3.25rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.045em]
            "
            style={{ color: C.text }}
          >
            Personas comprometidas
            con transformar realidades.
          </h2>
        </motion.div>

        {/* Cuadrícula */}
        <div
          className="
            grid grid-cols-1
            gap-x-7 gap-y-12
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-9
            lg:gap-y-14
          "
        >
          {TEAM.map((member) => (
            <MemberCard
              key={member.name}
              member={member}
              onSelect={onSelect}
            />
          ))}
        </div>
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
      aria-labelledby="team-cta-title"
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
        viewport={{ once: true, amount: 0.15 }}
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
          <motion.p
            variants={fadeUp}
            className="
              mb-3 text-[11px]
              font-bold uppercase
              tracking-[0.14em]
              text-white/70
            "
          >
            Únete a la causa
          </motion.p>

          <motion.h2
            id="team-cta-title"
            variants={fadeUp}
            className="
              text-[clamp(2rem,4vw,3.5rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.045em]
              text-white
            "
          >
            Sé parte de{" "}
            <span className="text-white/75">
              nuestra misión.
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
            Juntos podemos acompañar a más pacientes
            y familias que enfrentan un diagnóstico
            que cambia la vida.
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

export default function Equipo() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: C.bg }}
    >
      <Navbar />

      <main>
        <Hero />

        <TeamList onSelect={setSelectedMember} />

        <CtaBanner />
      </main>

      <Footer />

      <AnimatePresence>
        {selectedMember && (
          <ProfileModal
            key={selectedMember.name}
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
