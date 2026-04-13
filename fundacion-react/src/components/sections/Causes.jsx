import { CAUSES, COLORS } from "../../data/siteData";
import RevealSection from "../ui/RevealSection";

export default function Causes() {
  return (
    <section id="causas" className="py-24" style={{ background: "#fffaf5" }}>
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection className="text-center mb-16">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: COLORS.brand }}
          >
            Nuestras causas
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mt-3"
            style={{ fontFamily: "'Playfair Display', serif", color: COLORS.secondary }}
          >
            Áreas donde generamos impacto
          </h2>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {CAUSES.map((cause, index) => (
            <RevealSection key={cause.title} delay={index * 120}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
                <h3 className="text-xl font-black mb-3" style={{ color: COLORS.secondary }}>
                  {cause.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{cause.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}