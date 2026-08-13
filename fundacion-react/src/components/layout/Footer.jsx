import { Link } from "react-router-dom";
import {
  IconHeart,
  IconHeartHandshake,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

const C = {
  brand:     "#C8384F",
  brandSoft: "#FAE8EB",
  bg:        "#FAFAFA",
  surface:   "#FFFFFF",
  text:      "#1A2235",
  textMid:   "#4B5563",
  textLight: "#9CA3AF",
  border:    "#E5E7EB",
};

const NAV = [
  { to: "/servicios",         label: "Servicios" },
  { to: "/equipo",            label: "Equipo" },
  { to: "/embajadores",       label: "Embajadores" },
  { to: "/vivo-con-leucemia", label: "Vivo con leucemia" },
  { to: "/donar",             label: "Donar" },
];

const SOCIAL = [
  { href: "https://www.facebook.com/110183845151250",         icon: IconBrandFacebook,  label: "Facebook" },
  { href: "https://www.instagram.com/fmejoremosrealidades",   icon: IconBrandInstagram, label: "Instagram" },
  { href: "https://www.linkedin.com/in/mejoremos-realidades-a-c-088026427/", icon: IconBrandLinkedin, label: "LinkedIn" },
];

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5"
      style={{ width: 40, height: 40, border: `1.5px solid ${C.border}`, color: C.textMid }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = C.brand;
        e.currentTarget.style.borderColor = C.brand;
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.color = C.textMid;
      }}
    >
      <Icon size={18} stroke={1.75} />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>

      {/* Acento de marca */}
      <div className="h-1 w-full" style={{
        background: `linear-gradient(90deg, ${C.brand} 0%, ${C.brandSoft} 60%, transparent 100%)`,
      }} />

      {/* Cuerpo principal */}
      <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 py-14">

        {/* Fila superior — marca + nav + cta */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-10 pb-10"
          style={{ borderBottom: `1px solid ${C.border}` }}>

          {/* Marca */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center justify-center rounded-2xl"
              style={{ width: 42, height: 42, background: C.brandSoft, color: C.brand }}>
              <IconHeartHandshake size={22} stroke={1.75} />
            </span>
            <div className="leading-tight">
              <div className="text-[10px] font-bold tracking-[0.28em] uppercase" style={{ color: C.textLight }}>
                Fundación
              </div>
              <div className="font-bold text-base" style={{ color: C.text }}>
                Mejoremos <span style={{ color: C.brand }}>Realidades</span>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {NAV.map((l) => (
              <Link key={l.to} to={l.to}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: C.textMid }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.brand)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.textMid)}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link to="/donar"
            className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full
                       transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shrink-0"
            style={{ background: C.brand, color: "#fff" }}>
            <IconHeart size={16} stroke={2} /> Dona ahora
          </Link>
        </div>

        {/* Fila inferior — contacto + redes + copyright */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Email */}
          <a href="mailto:mejoremosrealidadesfundacion@gmail.com"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-150"
            style={{ color: C.textMid }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.brand)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.textMid)}>
            <IconMail size={15} stroke={1.75} />
            mejoremosrealidadesfundacion@gmail.com
          </a>

          {/* Redes */}
          <div className="flex items-center gap-2">
            {SOCIAL.map((s) => <SocialIcon key={s.label} {...s} />)}
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: C.textLight }}>
            &copy; {year} Mejoremos Realidades A.C.
          </p>
        </div>
      </div>
    </footer>
  );
}