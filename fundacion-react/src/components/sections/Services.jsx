import { COLORS, SERVICES } from "../../data/siteData";
import RevealSection from "../ui/RevealSection";

export default function Services() {
  return (
    <section id="servicios" className="py-24" style={{ background: "#f8f7f5" }}>
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection className="text-center mb-16">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: COLORS.brand }}
          >
            Lo que ofrecemos
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mt-3"
            style={{ fontFamily: "'Playfair Display', serif", color: COLORS.secondary }}
          >
            Nuestros servicios
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            Apoyo integral para pacientes y sus familias en las áreas que más lo necesitan.
          </p>
        </RevealSection>

        <div className="grid sm:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <RevealSection key={service.title} delay={index * 120}>
              <div className="bg-white rounded-3xl p-8 h-full flex flex-col transition-all hover:-translate-y-2 hover:shadow-xl duration-300 group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform group-hover:scale-110"
                  style={{ background: service.color + "18" }}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-black mb-3" style={{ color: COLORS.secondary }}>
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed flex-1">{service.desc}</p>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-1 mt-6 text-sm font-bold transition-all hover:gap-2"
                  style={{ color: service.color }}
                >
                  Obtener ayuda →
                </a>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}