import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Causas", href: "#causas" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,18,0.95)" : "rgba(10,10,18,0.6)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 group min-w-0">
          {!logoError ? (
            <div className="flex items-center justify-center px-2 py-1">
              <img
                src="/8.png"
                alt="Fundación Mejoremos Realidades"
                className="h-11 md:h-12 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <div className="flex flex-col leading-tight">
              <span className="text-white font-semibold text-sm tracking-widest uppercase">
                Mejoremos Realidades
              </span>
              <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase">
                Fundación
              </span>
            </div>
          )}
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <div className="w-px h-5 bg-white/10 mx-1" />
          </li>

          <li>
            <a
              href="#donaciones"
              className="inline-flex items-center gap-1.5 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "#F21D44",
                boxShadow: "0 4px 18px rgba(242,29,68,0.4)",
              }}
            >
              ❤ Donar
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          type="button"
        >
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none",
            }}
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(10,10,18,0.98)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-base font-medium py-1 border-b border-white/5 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#donaciones"
            className="text-center text-white font-bold py-3 rounded-full mt-2"
            style={{ background: "#F21D44" }}
            onClick={() => setMenuOpen(false)}
          >
            ❤ Donar ahora
          </a>
        </div>
      )}
    </header>
  );
}