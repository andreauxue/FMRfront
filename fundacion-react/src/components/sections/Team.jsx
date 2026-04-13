import { COLORS, TEAM } from "../../data/siteData";
import RevealSection from "../ui/RevealSection";

export default function Team() {
  return (
    <section id="equipo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection className="text-center mb-16">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: COLORS.brand }}
          >
            Las personas detrás
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mt-3"
            style={{ fontFamily: "'Playfair Display', serif", color: COLORS.secondary }}
          >
            Nuestro equipo
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            Profesionistas preocupados y ocupados por el bienestar de los pacientes y sus familias.
          </p>
        </RevealSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, index) => (
            <RevealSection key={member.name} delay={index * 100}>
              <div className="group text-center rounded-3xl p-6 transition-all hover:-translate-y-2 duration-300 hover:shadow-lg border border-gray-100">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: COLORS.secondary }}
                >
                  {member.initials}
                </div>
                <h3 className="font-black text-gray-900">{member.name}</h3>
                <p className="text-sm mt-1" style={{ color: COLORS.brand }}>
                  {member.role}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}