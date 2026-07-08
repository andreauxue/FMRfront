import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* Contact strip */}
      <section className="bg-[#080808] border-t border-[#1A1A1A] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-[#F21D43] text-xs font-bold tracking-[0.4em] uppercase mb-4">
              Ubicacion
            </div>
            <p className="text-[#999] text-sm leading-relaxed">
              Cerrada de Omega 260
              <br />
              Romero de Terreros
              <br />
              Ciudad de Mexico, CDMX, Mexico
            </p>
          </div>
          <div>
            <div className="text-[#F21D43] text-xs font-bold tracking-[0.4em] uppercase mb-4">
              Contacto
            </div>
            <a
              href="mailto:mejoremosrealidadesfundacion@gmail.com"
              className="text-[#999] text-sm hover:text-white transition-colors block mb-2"
            >
              mejoremosrealidadesfundacion@gmail.com
            </a>
            <p className="text-[#555] text-xs">Previa cita — sera un placer atenderte</p>
          </div>
          <div>
            <div className="text-[#F21D43] text-xs font-bold tracking-[0.4em] uppercase mb-4">
              Redes sociales
            </div>
            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/110183845151250"
                target="_blank"
                rel="noreferrer"
                className="text-[#999] text-sm hover:text-[#F21D43] transition-colors font-medium"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/fmejoremosrealidades"
                target="_blank"
                rel="noreferrer"
                className="text-[#999] text-sm hover:text-[#F21D43] transition-colors font-medium"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="bg-[#050505] border-t border-[#111] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#333] text-xs tracking-widest uppercase">
            Fundacion Mejoremos Realidades A.C.
          </div>
          <div className="text-[#333] text-xs">
            Copyright &copy; 2024 — Todos los derechos reservados
          </div>
          <Link
            to="/acerca-de"
            className="text-[#333] text-xs hover:text-[#F21D43] transition-colors tracking-widest uppercase"
          >
            Aviso de privacidad
          </Link>
        </div>
      </footer>
    </>
  );
}