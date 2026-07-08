import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/acerca-de", label: "Acerca de" },
  { to: "/servicios", label: "Servicios" },
  { to: "/equipo", label: "Equipo" },
  { to: "/causas", label: "Causas" },
  { to: "/embajadores", label: "Embajadores" },
  { to: "/alianzas", label: "Alianzas" },
  { to: "/vivo-con-leucemia", label: "Vivo con leucemia" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#1A1A1A]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">

        {/* Logo — solo imagen */}
        <Link to="/" className="flex items-center group">
          <img
            src="/7.png"
            alt="Fundacion Mejoremos Realidades"
            className="h-20 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.slice(0, 6).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[#999] hover:text-white text-xs tracking-widest uppercase transition-colors duration-200 font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/donaciones"
            className="bg-[#F21D43] text-white text-xs tracking-widest uppercase font-bold px-5 py-2.5 hover:bg-white hover:text-[#F21D43] transition-all duration-300"
          >
            Donar
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0D0D0D] border-t border-[#1A1A1A] px-6 py-6 flex flex-col gap-4">
          <img
            src="/5.png"
            alt="Fundacion Mejoremos Realidades"
            className="h-10 w-auto object-contain mb-2"
          />
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="text-[#ccc] text-sm tracking-widest uppercase font-medium hover:text-[#F21D43] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/donaciones"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-[#F21D43] text-white text-xs tracking-widest uppercase font-bold px-5 py-3 text-center"
          >
            Donar ahora
          </Link>
        </div>
      )}
    </nav>
  );
}