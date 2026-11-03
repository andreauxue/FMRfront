
import { Link } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

import { C } from "../../data/homeData";

// ============================================================
// NAVEGACIÓN
// ============================================================

const NAV = [
  { to: "/acerca-de", label: "Acerca de" },
  { to: "/servicios", label: "Servicios" },
  { to: "/equipo", label: "Equipo" },
  { to: "/embajadores", label: "Embajadores" },
  { to: "/alianzas", label: "Alianzas" },
  { to: "/vivo-con-leucemia", label: "Vivo con leucemia" },
];

// ============================================================
// REDES SOCIALES
// ============================================================

const SOCIAL = [
  {
    href: "https://www.facebook.com/110183845151250",
    icon: IconBrandFacebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/fmejoremosrealidades",
    icon: IconBrandInstagram,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/in/mejoremos-realidades-a-c-088026427/",
    icon: IconBrandLinkedin,
    label: "LinkedIn",
  },
];

// ============================================================
// MARCA
// ============================================================

function FooterBrand() {
  return (
    <div className="min-w-0">
      <Link
        to="/"
        aria-label="Mejoremos Realidades, ir al inicio"
        className="
          inline-flex items-center
          transition-opacity duration-200
          hover:opacity-80
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
        "
        style={{ outlineColor: C.brand }}
      >
        <img
          src="/home/4.png"
          alt="Mejoremos Realidades"
          loading="lazy"
          decoding="async"
          className="
            block h-[64px] w-auto
            max-w-[220px]
            object-contain
            sm:h-[72px]
          "
        />
      </Link>

      <p
        className="
          mb-0 mt-3
          max-w-[340px]
          text-[13px]
          leading-[1.75]
          sm:text-[14px]
        "
        style={{ color: C.textMid }}
      >
        Acompañamos a pacientes con leucemia y cáncer
        en México mediante atención médica, asesoría
        jurídica y apoyo emocional.
      </p>
    </div>
  );
}

// ============================================================
// ENLACES
// ============================================================

function FooterNavigation() {
  return (
    <nav
      aria-label="Navegación del pie de página"
      className="min-w-0"
    >
      <h2
        className="
          mb-4 text-[13px]
          font-bold
          tracking-[-0.01em]
        "
        style={{ color: C.text }}
      >
        Explora
      </h2>

      <div
        className="
          grid grid-cols-2
          gap-x-7 gap-y-3
        "
      >
        {NAV.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="
              w-fit text-[13px]
              leading-[1.5]
              transition-colors duration-200
              hover:text-[#C8384F]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
            "
            style={{
              color: C.textMid,
              outlineColor: C.brand,
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// ============================================================
// CONTACTO Y REDES
// ============================================================

function FooterContact() {
  return (
    <div className="min-w-0">
      <h2
        className="
          mb-4 text-[13px]
          font-bold
          tracking-[-0.01em]
        "
        style={{ color: C.text }}
      >
        Contacto
      </h2>

      <a
        href="mailto:mejoremosrealidadesfundacion@gmail.com"
        className="
          inline-flex max-w-full
          items-start gap-2
          text-[13px]
          leading-[1.6]
          transition-colors duration-200
          hover:text-[#C8384F]
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
        "
        style={{
          color: C.textMid,
          outlineColor: C.brand,
          overflowWrap: "anywhere",
        }}
      >
        <IconMail
          size={17}
          stroke={1.75}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />

        mejoremosrealidadesfundacion@gmail.com
      </a>

      <div className="mt-5 flex items-center gap-5">
        {SOCIAL.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="
              inline-flex h-9 w-9
              items-center justify-center
              transition-colors duration-200
              hover:text-[#C8384F]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
            "
            style={{
              color: C.textMid,
              outlineColor: C.brand,
            }}
          >
            <Icon
              size={21}
              stroke={1.7}
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// FOOTER PRINCIPAL
// ============================================================

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t"
      style={{
        backgroundColor: C.surface,
        borderColor: C.border,
      }}
    >
      <div
        className="
          mx-auto w-full
          max-w-[1360px]
          px-5 pt-10 pb-5
          sm:px-8 sm:pt-12
          lg:px-12 lg:pt-14
          xl:px-16
          2xl:px-20
        "
      >
        {/* Contenido principal */}
        <div
          className="
            grid grid-cols-1
            gap-9
            sm:grid-cols-2
            lg:grid-cols-[1.25fr_1fr_1fr]
            lg:gap-12
          "
        >
          <FooterBrand />

          <FooterNavigation />

          <FooterContact />
        </div>

        {/* Línea inferior */}
        <div
          className="
            mt-9 flex
            flex-col gap-2
            border-t pt-5
            sm:mt-10
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
          style={{
            borderColor: C.border,
          }}
        >
          <p
            className="
              m-0 text-[12px]
              leading-[1.6]
            "
            style={{ color: C.textMid }}
          >
            © {year} Mejoremos Realidades A.C.
            Todos los derechos reservados.
          </p>

          <p
            className="
              m-0 text-[12px]
              leading-[1.6]
            "
            style={{ color: C.textMid }}
          >
            México
          </p>
        </div>
      </div>
    </footer>
  );
}
