import { COLORS } from "../../data/siteData";
import RevealSection from "../ui/RevealSection";

export default function About() {
  return (
    <section id="acerca" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: COLORS.brand }}
            >
              Acerca de nosotros
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black mt-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: COLORS.secondary }}
            >
              ¿Qué es Fundación
              <br />
              <span style={{ color: COLORS.brand }}>Mejoremos Realidades?</span>
            </h2>
            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Somos una asociación civil fundada con el propósito de mejorar la calidad de vida
              de las personas que viven con leucemia y cáncer en México.
            </p>
            <p className="text-gray-600 text-lg mt-4 leading-relaxed">
              Trabajamos de manera multidisciplinaria para brindar apoyo integral a los pacientes
              y sus familias.
            </p>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 mt-8 font-bold px-6 py-3 rounded-full transition-all hover:scale-105"
              style={{ background: COLORS.secondary, color: "white" }}
            >
              Conoce nuestros servicios →
            </a>
          </div>

          <div className="relative">
            <div
              className="absolute -top-6 -left-6 w-full h-full rounded-3xl"
              style={{ background: COLORS.accent, opacity: 0.15 }}
            />
            <div
              className="relative rounded-3xl p-8 text-white"
              style={{ background: COLORS.secondary }}
            >
              <div className="text-5xl mb-4">💙</div>
              <h3
                className="text-2xl font-black mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nuestra misión
              </h3>
              <p className="text-white/80 leading-relaxed">
                Garantizar que cada paciente tenga acceso a la atención médica, jurídica y
                psicológica que merece.
              </p>
              <div
                className="mt-6 p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <p className="text-white/60 text-sm italic">
                  "Nadie debe enfrentar el cáncer solo."
                </p>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}