
import { motion, useReducedMotion } from "framer-motion";

import {
  IconArrowUpRight,
  IconBuildingCommunity,
  IconMail,
  IconMap2,
  IconMapPin,
  IconSend,
} from "@tabler/icons-react";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

// ============================================================
// CONFIGURACIÓN
// ============================================================

const C = {
  brand: "#C8384F",
  brandSoft: "#FAE8EB",
  brandDark: "#A02C3E",
  text: "#1A2235",
  textMid: "#4B5563",
  textLight: "#9CA3AF",
  border: "#E5E7EB",
  bg: "#F7F8FA",
  surface: "#FFFFFF",
};

const EASE = [0.22, 1, 0.36, 1];

const ADDRESS =
  "Cda. de Omega 260, Romero de Terreros, Coyoacán, 04310 Ciudad de México, CDMX";

const EMAIL =
  "mejoremosrealidadesfundacion@gmail.com";

const CONTACT_URL =
  "https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b";

const MAP_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const DIRECTIONS_URL =
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;

const EMBED_URL =
  `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

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
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// ============================================================
// ENCABEZADO
// ============================================================

function DirectoryHeading() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={reducedMotion ? undefined : stagger}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      className="max-w-[850px]"
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-8 flex items-center gap-3"
      >
        <span
          className="h-[2px] w-8"
          style={{ backgroundColor: C.brand }}
        />

        <span
          className="
            text-[11px] font-bold
            uppercase tracking-[0.16em]
          "
          style={{ color: C.brand }}
        >
          Directorio institucional
        </span>
      </motion.div>

      <motion.h1
        id="directorio-title"
        variants={fadeUp}
        transition={{ duration: 0.7, ease: EASE }}
        className="
          mb-7
          text-[clamp(3rem,6vw,5.5rem)]
          font-extrabold
          leading-[1.04]
          tracking-[-0.06em]
        "
        style={{ color: C.text }}
      >
        Estamos aquí
        <br />

        <span style={{ color: C.brand }}>
          para acompañarte.
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.7, ease: EASE }}
        className="
          max-w-[650px]
          text-[15px]
          leading-[1.9]
          sm:text-[17px]
        "
        style={{ color: C.textMid }}
      >
        Encuentra nuestra ubicación y conoce los
        medios para comunicarte con Fundación
        Mejoremos Realidades A.C. Estamos
        comprometidos con brindar orientación
        y acompañamiento a quienes lo necesitan.
      </motion.p>
    </motion.div>
  );
}

// ============================================================
// ELEMENTO DE INFORMACIÓN
// ============================================================

function ContactDetail({
  icon: Icon,
  label,
  children,
}) {
  return (
    <div
      className="
        grid grid-cols-[24px_minmax(0,1fr)]
        gap-4
        border-t py-6
      "
      style={{ borderColor: C.border }}
    >
      <Icon
        size={22}
        stroke={1.6}
        className="mt-1"
        style={{ color: C.brand }}
        aria-hidden="true"
      />

      <div className="min-w-0">
        <p
          className="
            mb-3
            text-[11px]
            font-bold uppercase
            tracking-[0.13em]
          "
          style={{ color: C.brand }}
        >
          {label}
        </p>

        {children}
      </div>
    </div>
  );
}

// ============================================================
// INFORMACIÓN DE CONTACTO
// ============================================================

function AddressDetails() {
  return (
    <div className="flex h-full flex-col">
      <div>
        <div
          className="
            mb-7
            flex h-12 w-12
            items-center justify-center
            rounded-md
          "
          style={{
            backgroundColor: C.brandSoft,
            color: C.brand,
          }}
        >
          <IconBuildingCommunity
            size={26}
            stroke={1.5}
            aria-hidden="true"
          />
        </div>

        <p
          className="
            mb-3
            text-[11px]
            font-bold uppercase
            tracking-[0.14em]
          "
          style={{ color: C.brand }}
        >
          Nuestra sede
        </p>

        <h2
          className="
            mb-8
            max-w-[460px]
            text-[clamp(1.7rem,2.8vw,2.5rem)]
            font-bold
            leading-[1.25]
            tracking-[-0.04em]
          "
          style={{ color: C.text }}
        >
          Fundación Mejoremos Realidades A.C.
        </h2>

        {/* Dirección */}
        <ContactDetail
          icon={IconMapPin}
          label="Dirección"
        >
          <address
            className="
              text-[15px]
              not-italic
              leading-[1.9]
              sm:text-[16px]
            "
            style={{ color: C.textMid }}
          >
            Cerrada de Omega 260
            <br />
            Colonia Romero de Terreros
            <br />
            Alcaldía Coyoacán
            <br />
            C.P. 04310
            <br />
            Ciudad de México, CDMX
          </address>
        </ContactDetail>

        {/* Correo */}
        <ContactDetail
          icon={IconMail}
          label="Correo electrónico"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="
              inline-block
              max-w-full
              break-all
              text-[14px]
              font-semibold
              leading-[1.8]
              transition-colors
              hover:underline
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
            "
            style={{
              color: C.text,
              outlineColor: C.brand,
            }}
          >
            {EMAIL}
          </a>

          <p
            className="
              mt-2
              text-[13px]
              leading-[1.7]
            "
            style={{ color: C.textMid }}
          >
            Escríbenos para solicitar información
            sobre nuestros servicios y programas.
          </p>
        </ContactDetail>
      </div>

      {/* Botones */}
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-3">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex min-h-12
              items-center justify-center
              gap-2 rounded-md
              px-6
              text-[14px]
              font-bold text-white
              transition-colors
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
            Cómo llegar

            <IconArrowUpRight
              size={18}
              stroke={1.8}
              aria-hidden="true"
            />
          </a>

          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex min-h-12
              items-center justify-center
              gap-2 rounded-md
              border px-6
              text-[14px]
              font-semibold
              transition-colors
              hover:bg-[#F7F8FA]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
            "
            style={{
              borderColor: C.border,
              color: C.text,
              outlineColor: C.brand,
            }}
          >
            Ver en Maps

            <IconMap2
              size={18}
              stroke={1.8}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAPA
// ============================================================

function LocationMap() {
  return (
    <div
      className="
        relative
        min-h-[380px]
        overflow-hidden
        rounded-md
        border
        bg-[#F0F1F3]
        sm:min-h-[460px]
        lg:min-h-[620px]
      "
      style={{ borderColor: C.border }}
    >
      <iframe
        title="Ubicación de Fundación Mejoremos Realidades A.C."
        src={EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="
          absolute inset-0
          h-full w-full
          border-0
        "
      />
    </div>
  );
}

// ============================================================
// SECCIÓN DE UBICACIÓN
// ============================================================

function DirectoryLocation() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Dirección y ubicación"
      className="
        px-5 pb-16 pt-5
        sm:px-8 sm:pb-20
        lg:px-12 lg:pb-24
        xl:px-16
        2xl:px-20
      "
      style={{ backgroundColor: C.surface }}
    >
      <motion.div
        variants={reducedMotion ? undefined : fadeUp}
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.7,
          ease: EASE,
        }}
        className="
          mx-auto grid w-full
          max-w-[1360px]
          grid-cols-1
          gap-10
          border-t pt-10
          lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]
          lg:gap-16
          lg:pt-14
        "
        style={{ borderColor: C.border }}
      >
        <AddressDetails />
        <LocationMap />
      </motion.div>
    </section>
  );
}

// ============================================================
// SECCIÓN FINAL DE CONTACTO
// ============================================================

function ContactSection() {
  return (
    <section
      className="
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
          mx-auto flex w-full
          max-w-[1360px]
          flex-col
          gap-8
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div className="flex items-start gap-4">
          <IconSend
            size={27}
            stroke={1.5}
            className="mt-1 shrink-0"
            style={{ color: C.brand }}
            aria-hidden="true"
          />

          <div>
            <p
              className="
                mb-3
                text-[11px]
                font-bold uppercase
                tracking-[0.13em]
              "
              style={{ color: C.brand }}
            >
              Estamos para escucharte
            </p>

            <h2
              className="
                mb-3
                text-[clamp(1.6rem,2.6vw,2.3rem)]
                font-bold
                leading-[1.2]
                tracking-[-0.04em]
              "
              style={{ color: C.text }}
            >
              ¿Necesitas orientación?
            </h2>

            <p
              className="
                max-w-[620px]
                text-[14px]
                leading-[1.85]
                sm:text-[15px]
              "
              style={{ color: C.textMid }}
            >
              Si deseas conocer más sobre nuestros
              servicios, programas o formas de
              colaborar, comunícate con nosotros.
              Te recomendamos confirmar la atención
              antes de acudir a nuestras instalaciones.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="
              inline-flex min-h-12
              shrink-0
              items-center justify-center
              gap-2 rounded-md
              px-6
              text-[14px]
              font-bold text-white
              transition-colors
              hover:bg-[#A02C3E]
            "
            style={{
              backgroundColor: C.brand,
            }}
          >
            Enviar correo

            <IconMail
              size={18}
              stroke={1.8}
              aria-hidden="true"
            />
          </a>

          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex min-h-12
              shrink-0
              items-center justify-center
              gap-2 rounded-md
              border px-6
              text-[14px]
              font-semibold
              transition-colors
              hover:bg-white
            "
            style={{
              borderColor: C.border,
              color: C.text,
            }}
          >
            Más información

            <IconArrowUpRight
              size={18}
              stroke={1.8}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PÁGINA PRINCIPAL
// ============================================================

export default function Directorio() {
  return (
    <>
      <Navbar />

      <main>
        {/* Encabezado */}
        <section
          aria-labelledby="directorio-title"
          className="
            px-5 pb-12 pt-32
            sm:px-8 sm:pb-14 sm:pt-36
            lg:px-12 lg:pb-16 lg:pt-44
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
            <DirectoryHeading />
          </div>
        </section>

        {/* Información y mapa */}
        <DirectoryLocation />

        {/* Contacto */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
