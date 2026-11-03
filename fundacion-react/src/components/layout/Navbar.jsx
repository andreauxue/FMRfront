
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ============================================================
// COLORES
// ============================================================

const C = {
  brand: "#C8384F",
  brandSoft: "#FAE8EB",
  bg: "#FAFAFA",
  surface: "#FFFFFF",
  text: "#1A2235",
  textMid: "#4B5563",
  border: "#E5E7EB",
};

const EASE = [0.22, 1, 0.36, 1];

// ============================================================
// NAVEGACIÓN
// ============================================================

const links = [
  { to: "/", label: "Inicio" },
  { to: "/acerca-de", label: "Acerca de" },
  { to: "/servicios", label: "Servicios" },
  { to: "/equipo", label: "Equipo" },
  { to: "/causas", label: "Causas" },
  { to: "/embajadores", label: "Embajadores" },
  { to: "/alianzas", label: "Alianzas" },
  { to: "/directorio", label: "Directorio" },
];

function isActivePath(pathname, to) {
  if (to === "/") return pathname === "/";

  return pathname === to || pathname.startsWith(`${to}/`);
}

// ============================================================
// LOGO
// ============================================================

function NavbarLogo({ transparent }) {
  return (
    <Link
      to="/"
      aria-label="Mejoremos Realidades, ir al inicio"
      className="
        group relative z-10
        flex shrink-0 items-center
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
      "
      style={{ outlineColor: C.brand }}
    >
      <img
        src="/home/4.png"
        alt="Mejoremos Realidades"
        className="
          block h-[52px] w-auto
          max-w-[190px]
          object-contain
          transition-[filter,opacity]
          duration-300
          group-hover:opacity-85
          sm:h-[58px]
          lg:h-[62px]
        "
        style={{
          filter: transparent
            ? "brightness(0) invert(1)"
            : "none",
        }}
      />
    </Link>
  );
}

// ============================================================
// ENLACES DE ESCRITORIO
// ============================================================

function DesktopNavigation({ pathname, transparent }) {
  return (
    <div className="hidden xl:flex items-center gap-6 2xl:gap-7">
      {links.map(({ to, label }) => {
        const active = isActivePath(pathname, to);

        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? "page" : undefined}
            className="
              group relative
              inline-flex h-10
              items-center
              whitespace-nowrap
              text-[13px]
              font-semibold
              tracking-[-0.01em]
              transition-colors
              duration-200
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
            "
            style={{
              color: active
                ? transparent
                  ? "#FFFFFF"
                  : C.brand
                : transparent
                  ? "rgba(255,255,255,0.8)"
                  : C.textMid,
              outlineColor: C.brand,
            }}
          >
            {label}

            {/* Indicador inferior, sin píldoras */}
            <span
              aria-hidden="true"
              className="
                absolute bottom-[3px]
                left-0 h-[2px]
                transition-[width,background-color]
                duration-300
                group-hover:w-full
              "
              style={{
                width: active ? "100%" : "0%",
                backgroundColor: transparent
                  ? "#FFFFFF"
                  : C.brand,
              }}
            />
          </Link>
        );
      })}

      {/* Acción principal */}
      <Link
        to="/donar"
        aria-current={
          isActivePath(pathname, "/donar")
            ? "page"
            : undefined
        }
        className="
          ml-2 inline-flex
          min-h-11
          shrink-0 items-center
          justify-center
          rounded-md
          px-6
          text-[13px]
          font-bold
          text-white
          transition-colors
          duration-200
          hover:bg-[#A92D42]
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
        "
        style={{
          backgroundColor: C.brand,
          outlineColor: C.brand,
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.backgroundColor = "#A92D42";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.backgroundColor = C.brand;
        }}
      >
        Donar
      </Link>
    </div>
  );
}

// ============================================================
// BOTÓN DEL MENÚ MÓVIL
// ============================================================

function MobileMenuButton({ menuOpen, setMenuOpen, transparent }) {
  return (
    <button
      type="button"
      aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={menuOpen}
      aria-controls="navbar-mobile-menu"
      onClick={() => setMenuOpen((current) => !current)}
      className="
        relative z-10
        flex h-11 w-11
        shrink-0
        items-center
        justify-center
        xl:hidden
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
      "
      style={{
        color: transparent ? "#FFFFFF" : C.text,
        outlineColor: C.brand,
      }}
    >
      <span className="relative block h-5 w-6">
        <span
          className="
            absolute left-0 top-[3px]
            block h-[2px] w-6
            rounded-full
            bg-current
            transition-transform
            duration-300
          "
          style={{
            transform: menuOpen
              ? "translateY(6px) rotate(45deg)"
              : "none",
          }}
        />

        <span
          className="
            absolute left-0 top-[9px]
            block h-[2px] w-6
            rounded-full
            bg-current
            transition-opacity
            duration-200
          "
          style={{
            opacity: menuOpen ? 0 : 1,
          }}
        />

        <span
          className="
            absolute left-0 top-[15px]
            block h-[2px] w-6
            rounded-full
            bg-current
            transition-transform
            duration-300
          "
          style={{
            transform: menuOpen
              ? "translateY(-6px) rotate(-45deg)"
              : "none",
          }}
        />
      </span>
    </button>
  );
}

// ============================================================
// MENÚ MÓVIL
// ============================================================

function MobileNavigation({
  pathname,
  menuOpen,
  setMenuOpen,
  reducedMotion,
}) {
  return (
    <AnimatePresence initial={false}>
      {menuOpen && (
        <motion.div
          id="navbar-mobile-menu"
          key="mobile-menu"
          initial={
            reducedMotion
              ? false
              : { height: 0, opacity: 0 }
          }
          animate={{
            height: "auto",
            opacity: 1,
          }}
          exit={
            reducedMotion
              ? { opacity: 0, transition: { duration: 0 } }
              : { height: 0, opacity: 0 }
          }
          transition={{
            duration: reducedMotion ? 0 : 0.3,
            ease: EASE,
          }}
          className="
            overflow-hidden
            border-t
            xl:hidden
          "
          style={{
            backgroundColor: C.surface,
            borderColor: C.border,
          }}
        >
          <div
            className="
              mx-auto
              max-h-[calc(100dvh-72px)]
              max-w-[1360px]
              overflow-y-auto
              px-5 py-3
              sm:px-8
            "
          >
            <div className="flex flex-col">
              {links.map(({ to, label }) => {
                const active = isActivePath(pathname, to);

                return (
                  <Link
                    key={to}
                    to={to}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="
                      flex min-h-[48px]
                      items-center
                      border-b
                      py-3
                      text-[14px]
                      font-semibold
                      transition-colors
                      duration-200
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-[-2px]
                    "
                    style={{
                      color: active ? C.brand : C.text,
                      borderColor: C.border,
                      outlineColor: C.brand,
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            <Link
              to="/donar"
              onClick={() => setMenuOpen(false)}
              className="
                mt-5 mb-3
                flex min-h-12
                w-full items-center
                justify-center
                rounded-md
                px-6
                text-[14px]
                font-bold
                text-white
                transition-colors
                duration-200
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
              "
              style={{
                backgroundColor: C.brand,
                outlineColor: C.brand,
              }}
            >
              Donar ahora
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// NAVBAR PRINCIPAL
// ============================================================

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();

  const navRef = useRef(null);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !menuOpen;

  // ----------------------------------------------------------
  // DETECTAR SCROLL
  // ----------------------------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ----------------------------------------------------------
  // CERRAR MENÚ AL CAMBIAR DE RUTA
  // ----------------------------------------------------------

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ----------------------------------------------------------
  // CERRAR CON ESCAPE
  // ----------------------------------------------------------

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // ----------------------------------------------------------
  // CERRAR AL HACER CLIC FUERA
  // ----------------------------------------------------------

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );
    };
  }, [menuOpen]);

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

  return (
    <nav
      ref={navRef}
      aria-label="Navegación principal"
      className="
        fixed inset-x-0 top-0
        z-50 w-full
        border-b
        transition-[background-color,border-color,box-shadow,backdrop-filter]
        duration-300
      "
      style={{
        backgroundColor: transparent
          ? "transparent"
          : menuOpen
            ? C.surface
            : "rgba(255,255,255,0.96)",

        borderColor: transparent
          ? "rgba(255,255,255,0.15)"
          : C.border,

        backdropFilter: transparent
          ? "none"
          : "blur(8px)",

        WebkitBackdropFilter: transparent
          ? "none"
          : "blur(8px)",

        boxShadow: "none",
      }}
    >
      {/* Barra principal */}
      <div
        className="
          mx-auto flex
          h-[72px] w-full
          max-w-[1360px]
          items-center
          justify-between
          px-5
          sm:px-8
          lg:h-[80px]
          lg:px-12
          xl:px-16
        "
      >
        <NavbarLogo transparent={transparent} />

        <DesktopNavigation
          pathname={pathname}
          transparent={transparent}
        />

        <MobileMenuButton
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          transparent={transparent}
        />
      </div>

      {/* Navegación móvil */}
      <MobileNavigation
        pathname={pathname}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        reducedMotion={reducedMotion}
      />
    </nav>
  );
}
