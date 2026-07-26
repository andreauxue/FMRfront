import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconHeart } from "@tabler/icons-react";

// Misma paleta que Home
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
  { to: "/vivo-con-leucemia", label: "Vivo con leucemia" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn(); // estado correcto si la página carga ya scrolleada
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Cierra el menú móvil al navegar
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Cierra con Escape
  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [menuOpen]);

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || menuOpen ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(10px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid ${C.border}` : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 3px rgba(26,34,53,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between h-20">

        {/* Logo */}
        <Link to="/" className="flex items-center group shrink-0">
          <img
            src="/images/logo.png"
            alt="Fundación Mejoremos Realidades"
            className="h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-1">
          {links.map((l) => {
            const active = isActive(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs font-semibold tracking-wide uppercase px-3 py-2 rounded-full transition-colors duration-200"
                style={{
                  color: active ? C.brand : C.textMid,
                  background: active ? C.brandSoft : "transparent",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = C.text; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = C.textMid; }}
              >
                {l.label}
              </Link>
            );
          })}

          <Link
            to="/donaciones"
            className="ml-3 inline-flex items-center gap-1.5 text-xs tracking-wide uppercase font-bold px-5 py-2.5 rounded-full shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            style={{ background: C.brand, color: "#fff" }}
          >
            <IconHeart size={15} stroke={2.25} />
            Donar
          </Link>
        </div>

        {/* Mobile / tablet toggle */}
        <button
          className="xl:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            style={{ background: C.text }}
          />
          <span
            className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            style={{ background: C.text }}
          />
          <span
            className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            style={{ background: C.text }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: C.surface, borderTop: menuOpen ? `1px solid ${C.border}` : "none" }}
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
            to="/donaciones"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 text-sm tracking-wide uppercase font-bold px-5 py-3.5 rounded-full text-center shadow-sm"
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