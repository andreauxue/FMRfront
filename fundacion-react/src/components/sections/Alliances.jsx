import { ALLIANCES, COLORS } from "../../data/siteData";
import RevealSection from "../ui/RevealSection";

export default function Alliances() {
  return (
    <section id="alianzas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection className="text-center mb-16">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: COLORS.brand }}
          >
            Colaboración
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mt-3"
            style={{ fontFamily: "'Playfair Display', serif", color: COLORS.secondary }}
          >
            Nuestras alianzas
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Trabajamos junto con aliados estratégicos para ampliar nuestro alcance y brindar ayuda integral.
          </p>
        </RevealSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALLIANCES.map((item, index) => (
            <RevealSection key={item} delay={index * 90}>
              <div className="rounded-3xl border border-gray-100 p-8 text-center shadow-sm bg-[#f8f7f5]">
                <p className="font-bold text-lg" style={{ color: COLORS.secondary }}>
                  {item}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}