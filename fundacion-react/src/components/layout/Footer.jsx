import { COLORS, NAV_LINKS } from "../../data/siteData";

export default function Footer() {
  return (
    <footer className="py-12 text-white" style={{ background: COLORS.secondary }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3
              className="text-2xl font-black"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span style={{ color: COLORS.brand }}>Mejoremos</span> Realidades
            </h3>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">
              Asociación Civil comprometida con los pacientes de leucemia y cáncer en México.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-white/80 text-sm uppercase tracking-widest">
              Navegación
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-white/80 text-sm uppercase tracking-widest">
              Suscríbete
            </h4>
            <p className="text-white/60 text-sm mb-3">
              Recibe noticias sobre eventos y campañas.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@correo.com"
                className="flex-1 px-3 py-2 rounded-xl text-sm bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none"
              />
              <button
                className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: COLORS.brand }}
              >
                OK
              </button>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-white/40 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p>© 2024 Fundación Mejoremos Realidades A.C. Todos los derechos reservados.</p>
          <a href="#" className="hover:text-white/70 transition-colors">
            Aviso de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}