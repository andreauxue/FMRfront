import { AMBASSADORS, COLORS } from "../../data/siteData";
import RevealSection from "../ui/RevealSection";

export default function Ambassadors() {
  return (
    <section id="embajadores" className="py-24" style={{ background: COLORS.secondary }}>
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection className="text-center mb-16">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: COLORS.accent }}
          >
            Héroes reales
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mt-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nuestros embajadores
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            Son héroes contra la leucemia que contribuyen a mejorar la realidad de los pacientes y sus familias.
          </p>
        </RevealSection>

        <div className="grid sm:grid-cols-3 gap-6">
          {AMBASSADORS.map((ambassador, index) => (
            <RevealSection key={ambassador.name} delay={index * 100}>
              <div
                className="rounded-3xl p-8 text-white transition-all hover:-translate-y-2 duration-300"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black mb-4"
                  style={{ background: COLORS.brand }}
                >
                  {ambassador.initials}
                </div>
                <h3 className="text-xl font-black">{ambassador.name}</h3>
                <p className="mt-1" style={{ color: COLORS.accent }}>
                  {ambassador.role}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}