import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconHeart } from "@tabler/icons-react";

const C = {
  brand:     "#C8384F",
  brandSoft: "#FAE8EB",
  bg:        "#FAFAFA",
  surface:   "#FFFFFF",
  text:      "#1A2235",
  textMid:   "#4B5563",
  border:    "#E5E7EB",
};

const links = [
  { to: "/",                  label: "Inicio" },
  { to: "/acerca-de",         label: "Acerca de" },
  { to: "/servicios",         label: "Servicios" },
  { to: "/equipo",            label: "Equipo" },
  { to: "/causas",            label: "Causas" },
  { to: "/embajadores",       label: "Embajadores" },
  { to: "/alianzas",          label: "Alianzas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // ¿Estamos en el home?
  const isHome = pathname === "/";

  // Navbar es "transparente" cuando: es home Y no se ha scrolleado Y el menú está cerrado
  const transparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [menuOpen]);

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  // Colores de links según modo
  const linkColor      = (active) => active ? (transparent ? "#fff" : C.brand) : (transparent ? "rgba(255,255,255,0.75)" : C.textMid);
  const linkBg         = (active) => active ? (transparent ? "rgba(255,255,255,0.15)" : C.brandSoft) : "transparent";
  const linkHoverColor = transparent ? "#fff" : C.text;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: transparent
          ? "transparent"
          : menuOpen
            ? C.surface
            : "rgba(255,255,255,0.94)",
        backdropFilter: transparent ? "none" : "blur(12px)",
        WebkitBackdropFilter: transparent ? "none" : "blur(12px)",
        borderBottom: transparent
          ? "1px solid rgba(255,255,255,0.12)"
          : `1px solid ${C.border}`,
        boxShadow: transparent ? "none" : "0 1px 4px rgba(26,34,53,0.07)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-24">

        {/* Logo — más grande */}
        <Link to="/" className="flex items-center group shrink-0">
          <img
            src="/home/4.png"
            alt="Mejoremos Realidades"
            className="w-auto object-contain transition-all duration-300 group-hover:opacity-80"
            style={{
              height: transparent ? "72px" : "56px",
              // Filtro blanco cuando el fondo es oscuro (hero transparente)
              filter: transparent
                ? "brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.25))"
                : "none",
            }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-0.5">
          {links.map((l) => {
            const active = isActive(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className="text-[11px] font-bold tracking-wider uppercase px-3 py-2 rounded-full transition-all duration-200"
                style={{
                  color: linkColor(active),
                  background: linkBg(active),
                  letterSpacing: "0.06em",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = linkHoverColor;
                    e.currentTarget.style.background = transparent
                      ? "rgba(255,255,255,0.12)"
                      : C.brandSoft;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = linkColor(false);
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {l.label}
              </Link>
            );
          })}

          {/* Botón Donar */}
          <Link
            to="/donar"
            className="ml-4 inline-flex items-center gap-1.5 text-[11px] tracking-wider uppercase font-bold px-5 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: transparent ? C.brand : C.brand,
              color: "#fff",
              boxShadow: transparent
                ? "0 4px 16px rgba(200,56,79,0.45)"
                : "0 2px 8px rgba(200,56,79,0.3)",
            }}
          >
            <IconHeart size={14} stroke={2.5} />
            Donar
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="xl:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-[2px] rounded-full transition-all duration-300"
              style={{
                background: transparent ? "#fff" : C.text,
                transform:
                  menuOpen
                    ? i === 0 ? "rotate(45deg) translateY(7px)"
                    : i === 1 ? "scaleX(0)"
                    : "rotate(-45deg) translateY(-7px)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: C.surface,
          borderTop: menuOpen ? `1px solid ${C.border}` : "none",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          {links.map((l) => {
            const active = isActive(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold tracking-wide uppercase px-4 py-3 rounded-xl transition-colors"
                style={{
                  color: active ? C.brand : C.text,
                  background: active ? C.brandSoft : "transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}

          <Link
            to="/donar"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 text-sm tracking-wide uppercase font-bold px-5 py-3.5 rounded-full shadow-md"
            style={{ background: C.brand, color: "#fff" }}
          >
            <IconHeart size={16} stroke={2.25} />
            Donar ahora
          </Link>
        </div>
      </div>
    </nav>
  );
}